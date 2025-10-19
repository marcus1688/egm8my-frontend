<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] max-lg:px-4"
    @click.self="emitClose"
  >
    <div
      class="bg-white text-gray-800 rounded-lg w-1/3 p-6 shadow-lg transform transition-transform scale-95 max-lg:w-full max-lg:p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex justify-between items-center mb-4 border-b border-gray-200 pb-2"
      >
        <h2 class="text-xl font-semibold">{{ $t("change_birthday") }}</h2>
        <button @click="emitClose" class="text-gray-500 lg:hover:text-gray-700">
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div>
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t("date_of_birth") }}</label
        >
        <VueDatePicker
          v-model="newDob"
          required
          :enable-time-picker="false"
          :format="format"
          :max-date="maxDate"
          :min-date="minDate"
          :auto-apply="true"
          :placeholder="$t('select_date_of_birth')"
          :input-class-name="'w-full border border-gray-300 rounded-lg bg-white text-gray-800 outline-none focus:border-blue-600 p-3 max-lg:p-2'"
          autocomplete="new-password"
          default-view="year"
          :year-range="[1900, new Date().getFullYear() - 18]"
          :flow="['year', 'calendar']"
        />
        <span class="text-red-500 text-xs"> {{ $t("must_be_18") }}</span>
      </div>
      <div class="flex justify-end mt-6">
        <button
          @click="emitClose"
          class="px-4 py-2 mr-2 bg-gray-100 text-gray-800 rounded-md lg:hover:bg-gray-200 transition border border-gray-300"
        >
          {{ $t("cancel") }}
        </button>
        <LoadingButton
          :loading="buttonLoading"
          @click="saveBirthday"
          class="px-4 py-2 bg-blue-600 text-white rounded-md lg:hover:bg-blue-700 transition"
        >
          {{ $t("save") }}
        </LoadingButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const buttonLoading = ref(false);
const emit = defineEmits(["close", "save"]);
const newDob = ref("");

const { showAlert } = useAlert();

const format = (date) => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const maxDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date;
});

const minDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 120);
  return date;
});

function emitClose() {
  emit("close");
}

async function saveBirthday() {
  if (!newDob.value) return;
  const today = new Date();
  const birthDate = new Date(newDob.value);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18) {
    showAlert($t("alert_info"), $t("must_be_18"), "info");
    return;
  }

  buttonLoading.value = true;
  try {
    const { post, get } = useApiEndpoint();
    const { data } = await post("updateSocialMedia", {
      dob: format(new Date(newDob.value)),
    });

    if (data.success) {
      const { data: newData } = await get("userdata");
      if (newData.success) {
        useState("userData").value = newData.user;
      }
      showAlert($t("alert_success"), data.message.en, "success");
      emit("save", format(new Date(newDob.value)));
      emit("close");
    } else {
      showAlert("Info", data.message.en, "info");
    }
  } catch (error) {
    console.error("Save Birthday error:", error);
    showAlert(
      $t("alert_error"),
      error.response?.data?.message?.en || "Network error",
      "error"
    );
  } finally {
    buttonLoading.value = false;
  }
}
</script>

<style scoped>
.dp__theme_light {
  --dp-background-color: #ffffff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #2563eb;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-lg:hover: #2563eb;
  --dp-border-color-focus: #2563eb;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(37 99 235 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}
</style>
