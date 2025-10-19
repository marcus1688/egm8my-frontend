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
        <h2 class="text-xl font-semibold">{{ $t("change_email_address") }}</h2>
        <button @click="emitClose" class="text-gray-500 lg:hover:text-gray-700">
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t("new_email_address") }}
          </label>
          <input
            type="email"
            v-model="newEmail"
            :placeholder="$t('enter_new_email')"
            class="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition max-lg:p-2"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t("confirm_email_address") }}
          </label>
          <input
            type="email"
            v-model="confirmEmail"
            :placeholder="$t('confirm_new_email')"
            class="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition max-lg:p-2"
            :class="{ 'border-red-500': showEmailMismatch }"
          />
          <p v-if="showEmailMismatch" class="text-red-500 text-xs mt-1">
            {{ $t("email_mismatch") }}
          </p>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button
          @click="emitClose"
          class="px-4 py-2 mr-2 bg-gray-100 text-gray-800 rounded-md lg:hover:bg-gray-200 transition border border-gray-300"
        >
          {{ $t("cancel") }}
        </button>
        <LoadingButton
          :loading="emailButtonLoading"
          @click="saveEmail"
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

const emailButtonLoading = ref(false);
const emit = defineEmits(["close"]);
const newEmail = ref("");
const confirmEmail = ref("");

const { showAlert } = useAlert();

const showEmailMismatch = computed(() => {
  return confirmEmail.value && newEmail.value !== confirmEmail.value;
});

function emitClose() {
  emit("close");
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

async function saveEmail() {
  if (!newEmail.value || !confirmEmail.value) {
    showAlert($t("alert_info"), $t("fill_all_fields"), "info");
    return;
  }

  if (newEmail.value !== confirmEmail.value) {
    showAlert($t("alert_info"), $t("email_mismatch"), "error");
    return;
  }

  if (!validateEmail(newEmail.value)) {
    showAlert($t("alert_info"), $t("valid_email"), "error");
    return;
  }

  emailButtonLoading.value = true;
  try {
    const { post, get } = useApiEndpoint();
    const { data } = await post("updateSocialMedia", {
      email: newEmail.value,
    });

    if (data.success) {
      const { data: newData } = await get("userdata");
      if (newData.success) {
        useState("userData").value = newData.user;
      }
      showAlert($t("alert_success"), $t("email_updated"), "success");
      emit("close");
    } else {
      showAlert($t("alert_info"), data.message.en, "info");
    }
  } catch (error) {
    console.error("Save email error:", error);
    showAlert(
      $t("alert_error"),
      error.response?.data?.message?.en || $t("network_error"),
      "error"
    );
  } finally {
    emailButtonLoading.value = false;
  }
}
</script>
