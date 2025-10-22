<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] max-lg:px-4"
      @click.self="emitClose"
    >
      <div
        class="bg-[#1A0D13] border border-[#3b1c23] text-[#f0eaea] rounded-xl w-1/3 p-6 shadow-2xl shadow-[#ff3344]/20 transform transition-transform scale-95 max-lg:w-full max-lg:p-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="flex justify-between items-center mb-4 border-b border-[#3b1c23] pb-3"
        >
          <h2 class="text-xl font-semibold text-[#f0eaea]">
            {{ $t("change_birthday") }}
          </h2>
          <button
            @click="emitClose"
            class="text-[#b37a7a] lg:hover:text-[#ff3344] transition-colors"
          >
            <Icon icon="mdi:close" class="w-5 h-5" />
          </button>
        </div>
        <div class="space-y-2">
          <label class="block text-sm font-medium text-[#f0eaea] mb-2">
            {{ $t("date_of_birth") }}
          </label>
          <VueDatePicker
            v-model="newDob"
            required
            :enable-time-picker="false"
            :format="format"
            :max-date="maxDate"
            :min-date="minDate"
            :auto-apply="true"
            :placeholder="$t('select_date_of_birth')"
            :input-class-name="'w-full border border-[#3b1c23] rounded-lg bg-[#241017]/60 text-[#f0eaea] outline-none focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/50 p-3 max-lg:p-2 placeholder-[#b37a7a]'"
            autocomplete="new-password"
            default-view="year"
            :year-range="[1900, new Date().getFullYear() - 18]"
            :flow="['year', 'calendar']"
            dark
          />
          <span class="text-[#ff3344] text-xs"> {{ $t("must_be_18") }}</span>
        </div>
        <div class="flex justify-end mt-6 gap-2">
          <button
            @click="emitClose"
            class="px-4 py-2 bg-[#241017]/60 text-[#f0eaea] rounded-lg lg:hover:bg-[#3b1c23] transition border border-[#3b1c23]"
          >
            {{ $t("cancel") }}
          </button>
          <LoadingButton
            :loading="buttonLoading"
            @click="saveBirthday"
            class="px-4 py-2 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white rounded-lg lg:hover:brightness-110 transition shadow-lg shadow-[#ff3344]/30"
          >
            {{ $t("save") }}
          </LoadingButton>
        </div>
      </div>
    </div></Teleport
  >
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
    const { data } = await post("updateDOB", {
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
