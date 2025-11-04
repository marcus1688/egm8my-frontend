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
            {{ $t("change_email_address") }}
          </h2>
          <button
            @click="emitClose"
            class="text-[#b37a7a] lg:hover:text-[#ff3344] transition-colors"
          >
            <Icon icon="mdi:close" class="w-5 h-5" />
          </button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-[#f0eaea] mb-2">
              {{ $t("new_email_address") }}
            </label>
            <input
              type="email"
              v-model="newEmail"
              :placeholder="$t('enter_new_email')"
              class="w-full p-3 max-lg:p-2 rounded-lg border border-[#3b1c23] bg-[#241017]/60 text-[#f0eaea] placeholder-[#b37a7a] focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/50 outline-none transition"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-[#f0eaea] mb-2">
              {{ $t("confirm_email_address") }}
            </label>
            <input
              type="email"
              v-model="confirmEmail"
              :placeholder="$t('confirm_new_email')"
              class="w-full p-3 max-lg:p-2 rounded-lg border bg-[#241017]/60 text-[#f0eaea] placeholder-[#b37a7a] focus:ring-2 focus:ring-[#ff3344]/50 outline-none transition"
              :class="
                showEmailMismatch
                  ? 'border-[#ff3344] focus:border-[#ff3344]'
                  : 'border-[#3b1c23] focus:border-[#ff3344]'
              "
            />
            <p v-if="showEmailMismatch" class="text-[#ff3344] text-xs mt-1">
              {{ $t("email_mismatch") }}
            </p>
          </div>
        </div>
        <div class="flex justify-end mt-6 gap-2">
          <button
            @click="emitClose"
            class="px-4 py-2 bg-[#241017]/60 text-[#f0eaea] rounded-lg lg:hover:bg-[#3b1c23] transition border border-[#3b1c23]"
          >
            {{ $t("cancel") }}
          </button>
          <LoadingButton
            :loading="emailButtonLoading"
            @click="saveEmail"
            class="px-4 py-2 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white rounded-lg lg:hover:brightness-110 transition shadow-lg shadow-[#ff3344]/30"
          >
            {{ $t("save") }}
          </LoadingButton>
        </div>
      </div>
    </div>
  </Teleport>
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
      showAlert($t("alert_info"), data.message[$locale.value], "info");
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
