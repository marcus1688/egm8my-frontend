<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-lg font-bold max-lg:text-base">
          {{ $t("change_password") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("update_password_desc") }}
        </p>
      </div>

      <div>
        <div
          class="bg-[#ff3344]/10 border border-[#ff3344]/30 rounded-lg p-4 max-lg:p-3 mb-6 max-lg:mb-4"
        >
          <div class="flex items-start gap-3 max-lg:gap-2">
            <div class="flex-shrink-0 mt-0.5">
              <Icon
                icon="mdi:information"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-[#ff3344]"
              />
            </div>
            <div>
              <h3 class="text-sm max-lg:text-xs font-medium text-[#ff3344]">
                {{ $t("password_requirements") }}
              </h3>
              <ul
                class="mt-1 text-xs max-lg:text-[10px] text-[#f0eaea] space-y-1 max-lg:space-y-0.5"
              >
                <li>• {{ $t("at_least_8_chars") }}</li>
                <li>• {{ $t("include_uppercase") }}</li>
                <li>• {{ $t("include_lowercase") }}</li>
                <li>• {{ $t("include_number") }}</li>
                <li>• {{ $t("include_special_char") }}</li>
              </ul>
            </div>
          </div>
        </div>

        <form
          @submit.prevent="changePassword"
          class="space-y-4 max-lg:space-y-3"
        >
          <!-- Current Password -->
          <div>
            <label
              for="currentPassword"
              class="block text-sm max-lg:text-xs font-medium text-[#f0eaea] mb-1"
            >
              {{ $t("current_password") }}
            </label>
            <div class="relative">
              <input
                :type="showCurrentPassword ? 'text' : 'password'"
                id="currentPassword"
                v-model="currentPassword"
                class="w-full p-3 max-lg:p-2.5 max-lg:text-sm pr-10 rounded-lg border border-[#3b1c23] bg-[#15090e]/50 text-[#f0eaea] placeholder-[#b37a7a] focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/50 outline-none transition"
                :placeholder="$t('enter_current_password')"
              />
              <button
                type="button"
                @click="showCurrentPassword = !showCurrentPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] lg:hover:text-[#f0eaea] transition-colors"
              >
                <Icon
                  :icon="showCurrentPassword ? 'mdi:eye-off' : 'mdi:eye'"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
              </button>
            </div>
          </div>

          <!-- New Password -->
          <div>
            <label
              for="newPassword"
              class="block text-sm max-lg:text-xs font-medium text-[#f0eaea] mb-1"
            >
              {{ $t("new_password") }}
            </label>
            <div class="relative">
              <input
                :type="showNewPassword ? 'text' : 'password'"
                id="newPassword"
                v-model="newPassword"
                class="w-full p-3 max-lg:p-2.5 max-lg:text-sm pr-10 rounded-lg border border-[#3b1c23] bg-[#15090e]/50 text-[#f0eaea] placeholder-[#b37a7a] focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/50 outline-none transition"
                :placeholder="$t('enter_new_password')"
              />
              <button
                type="button"
                @click="showNewPassword = !showNewPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] lg:hover:text-[#f0eaea] transition-colors"
              >
                <Icon
                  :icon="showNewPassword ? 'mdi:eye-off' : 'mdi:eye'"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
              </button>
            </div>
            <!-- Password Strength Indicator -->
            <div v-if="newPassword" class="mt-2 max-lg:mt-1.5">
              <div class="flex items-center gap-2">
                <div
                  class="h-1.5 max-lg:h-1 flex-grow rounded-full bg-[#3b1c23] overflow-hidden"
                >
                  <div
                    class="h-full transition-all duration-300"
                    :class="[
                      passwordStrength === 'weak' ? 'w-1/4 bg-red-500' : '',
                      passwordStrength === 'medium'
                        ? 'w-2/4 bg-yellow-500'
                        : '',
                      passwordStrength === 'strong' ? 'w-3/4 bg-green-500' : '',
                      passwordStrength === 'very-strong'
                        ? 'w-full bg-green-600'
                        : '',
                    ]"
                  ></div>
                </div>
                <span
                  class="text-xs max-lg:text-[10px] font-medium"
                  :class="[
                    passwordStrength === 'weak' ? 'text-red-400' : '',
                    passwordStrength === 'medium' ? 'text-yellow-400' : '',
                    passwordStrength === 'strong' ? 'text-green-400' : '',
                    passwordStrength === 'very-strong' ? 'text-green-400' : '',
                  ]"
                >
                  {{ passwordStrengthText }}
                </span>
              </div>
            </div>
          </div>

          <!-- Confirm New Password -->
          <div>
            <label
              for="confirmPassword"
              class="block text-sm max-lg:text-xs font-medium text-[#f0eaea] mb-1"
            >
              {{ $t("confirm_new_password") }}
            </label>
            <div class="relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirmPassword"
                v-model="confirmPassword"
                class="w-full p-3 max-lg:p-2.5 max-lg:text-sm pr-10 rounded-lg border bg-[#15090e]/50 text-[#f0eaea] placeholder-[#b37a7a] outline-none transition"
                :class="{
                  'border-[#3b1c23] focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/50':
                    !(confirmPassword && confirmPassword !== newPassword),
                  'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/50':
                    confirmPassword && confirmPassword !== newPassword,
                }"
                :placeholder="$t('confirm_password_placeholder')"
              />
              <button
                type="button"
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] lg:hover:text-[#f0eaea] transition-colors"
              >
                <Icon
                  :icon="showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
              </button>
            </div>
            <p
              v-if="confirmPassword && confirmPassword !== newPassword"
              class="mt-1 text-xs max-lg:text-[10px] text-red-400"
            >
              {{ $t("passwords_not_match") }}
            </p>
          </div>

          <div class="pt-4 max-lg:pt-2">
            <button
              type="submit"
              :disabled="isButtonDisabled || buttonLoading"
              class="w-full py-3 max-lg:py-2.5 max-lg:text-sm bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white rounded-lg lg:hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-[#ff3344]/50 focus:ring-offset-2 focus:ring-offset-[#241017] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <span v-if="!buttonLoading">{{ $t("update_password") }}</span>
              <div v-else class="flex items-center gap-2">
                <Icon
                  icon="mdi:loading"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4 animate-spin"
                />
                {{ $t("processing") }}...
              </div>
            </button>
          </div>
        </form>

        <div class="mt-8 max-lg:mt-6">
          <div
            class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 max-lg:p-3"
          >
            <div class="flex gap-3 max-lg:gap-2">
              <div
                class="w-8 h-8 max-lg:w-7 max-lg:h-7 bg-amber-500/20 rounded-full flex-shrink-0 flex items-center justify-center"
              >
                <Icon
                  icon="mdi:shield-lock"
                  class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5 text-amber-400"
                />
              </div>

              <div>
                <h3 class="font-medium text-amber-400 mb-1 max-lg:text-sm">
                  {{ $t("security_tips") }}
                </h3>
                <ul
                  class="text-sm max-lg:text-xs text-[#f0eaea] space-y-2 max-lg:space-y-1"
                >
                  <li>• {{ $t("use_unique_password") }}</li>
                  <li>• {{ $t("never_share_password") }}</li>
                  <li>• {{ $t("use_password_manager") }}</li>
                  <li>• {{ $t("change_regularly") }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Alerts
        :title="alertTitle"
        :message="alertMessage"
        :isVisible="alertVisible"
        :type="alertType"
        @close="alertVisible = false"
      />
    </Teleport>
  </UserAccountLayout>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";

const currentPassword = ref("");
const newPassword = ref("");
const confirmPassword = ref("");
const buttonLoading = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const { alertVisible, alertTitle, alertMessage, alertType, showAlert } =
  useAlert();

const passwordStrength = computed(() => {
  const password = newPassword.value;
  if (!password) return "";
  if (password.length < 8) return "weak";
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
    password
  );
  const complexity = [
    hasUppercase,
    hasLowercase,
    hasNumbers,
    hasSpecialChars,
  ].filter(Boolean).length;
  if (complexity === 4 && password.length >= 12) return "very-strong";
  if (complexity >= 3) return "strong";
  if (complexity >= 2) return "medium";
  return "weak";
});

const passwordStrengthText = computed(() => {
  switch (passwordStrength.value) {
    case "weak":
      return $t("password_weak");
    case "medium":
      return $t("password_medium");
    case "strong":
      return $t("password_strong");
    case "very-strong":
      return $t("password_very_strong");
    default:
      return "";
  }
});

const isButtonDisabled = computed(() => {
  return (
    !currentPassword.value ||
    !newPassword.value ||
    !confirmPassword.value ||
    newPassword.value !== confirmPassword.value ||
    passwordStrength.value === "weak"
  );
});

async function changePassword() {
  if (isButtonDisabled.value) return;
  buttonLoading.value = true;
  try {
    const { post } = useApiEndpoint();
    const { data } = await post("changepassword", {
      oldPassword: currentPassword.value,
      newPassword: newPassword.value,
      confirmPassword: confirmPassword.value,
    });
    if (data.success) {
      showAlert($t("alert_success"), $t("password_updated"), "success");
      currentPassword.value = "";
      newPassword.value = "";
      confirmPassword.value = "";
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Change password error:", error);
    if (error.response?.status === 401) {
      showAlert($t("alert_error"), $t("incorrect_password"), "error");
    } else {
      showAlert(
        "Error",
        error.response?.data?.message?.en || "Network error occurred",
        "error"
      );
    }
  } finally {
    buttonLoading.value = false;
  }
}
</script>
