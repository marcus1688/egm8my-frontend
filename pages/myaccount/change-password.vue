<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg">
          {{ $t("change_password") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("update_password_desc") }}
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-4">
        <!-- Left Column - Form (2/3 width) -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Password Form -->
          <form
            @submit.prevent="changePassword"
            class="bg-[#241017] border border-[#3b1c23] rounded-lg p-6 max-lg:p-4 space-y-5 max-lg:space-y-4"
          >
            <div class="flex items-center gap-3 pb-4 border-b border-[#3b1c23]">
              <div
                class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center shadow-lg shadow-[#ff3344]/30"
              >
                <Icon icon="mdi:lock-reset" class="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 class="text-base font-bold text-[#f0eaea]">
                  {{ $t("change_password") }}
                </h2>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("enter_password_details") }}
                </p>
              </div>
            </div>

            <!-- Current Password -->
            <div>
              <label
                for="currentPassword"
                class="block text-sm font-semibold text-[#f0eaea] mb-2"
              >
                {{ $t("current_password") }}
              </label>
              <div class="relative">
                <div
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a]"
                >
                  <Icon icon="mdi:lock" class="w-5 h-5" />
                </div>
                <input
                  :type="showCurrentPassword ? 'text' : 'password'"
                  id="currentPassword"
                  v-model="currentPassword"
                  class="w-full pl-11 pr-11 py-3 rounded-lg border border-[#3b1c23] bg-[#15090e] text-[#f0eaea] text-sm placeholder-[#b37a7a] focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/20 outline-none transition-all"
                  :placeholder="$t('enter_current_password')"
                />
                <button
                  type="button"
                  @click="showCurrentPassword = !showCurrentPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] hover:text-[#ff3344] transition-colors"
                >
                  <Icon
                    :icon="showCurrentPassword ? 'mdi:eye-off' : 'mdi:eye'"
                    class="w-5 h-5"
                  />
                </button>
              </div>
            </div>

            <!-- New Password -->
            <div>
              <label
                for="newPassword"
                class="block text-sm font-semibold text-[#f0eaea] mb-2"
              >
                {{ $t("new_password") }}
              </label>
              <div class="relative">
                <div
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a]"
                >
                  <Icon icon="mdi:lock-plus" class="w-5 h-5" />
                </div>
                <input
                  :type="showNewPassword ? 'text' : 'password'"
                  id="newPassword"
                  v-model="newPassword"
                  class="w-full pl-11 pr-11 py-3 rounded-lg border border-[#3b1c23] bg-[#15090e] text-[#f0eaea] text-sm placeholder-[#b37a7a] focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/20 outline-none transition-all"
                  :placeholder="$t('enter_new_password')"
                />
                <button
                  type="button"
                  @click="showNewPassword = !showNewPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] hover:text-[#ff3344] transition-colors"
                >
                  <Icon
                    :icon="showNewPassword ? 'mdi:eye-off' : 'mdi:eye'"
                    class="w-5 h-5"
                  />
                </button>
              </div>

              <!-- Password Strength Indicator -->
              <div v-if="newPassword" class="mt-3">
                <div class="flex items-center gap-3">
                  <div
                    class="h-2 flex-grow rounded-full bg-[#15090e] border border-[#3b1c23] overflow-hidden"
                  >
                    <div
                      class="h-full transition-all duration-300 rounded-full"
                      :class="[
                        passwordStrength === 'weak' ? 'w-1/4 bg-red-500' : '',
                        passwordStrength === 'medium'
                          ? 'w-2/4 bg-yellow-500'
                          : '',
                        passwordStrength === 'strong'
                          ? 'w-3/4 bg-green-500'
                          : '',
                        passwordStrength === 'very-strong'
                          ? 'w-full bg-green-600'
                          : '',
                      ]"
                    ></div>
                  </div>
                  <span
                    class="text-xs font-bold whitespace-nowrap"
                    :class="[
                      passwordStrength === 'weak' ? 'text-red-400' : '',
                      passwordStrength === 'medium' ? 'text-yellow-400' : '',
                      passwordStrength === 'strong' ? 'text-green-400' : '',
                      passwordStrength === 'very-strong'
                        ? 'text-green-400'
                        : '',
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
                class="block text-sm font-semibold text-[#f0eaea] mb-2"
              >
                {{ $t("confirm_new_password") }}
              </label>
              <div class="relative">
                <div
                  class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a]"
                >
                  <Icon icon="mdi:lock-check" class="w-5 h-5" />
                </div>
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  class="w-full pl-11 pr-11 py-3 rounded-lg border bg-[#15090e] text-[#f0eaea] text-sm placeholder-[#b37a7a] outline-none transition-all"
                  :class="{
                    'border-[#3b1c23] focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/20':
                      !(confirmPassword && confirmPassword !== newPassword),
                    'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20':
                      confirmPassword && confirmPassword !== newPassword,
                  }"
                  :placeholder="$t('confirm_password_placeholder')"
                />
                <button
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] hover:text-[#ff3344] transition-colors"
                >
                  <Icon
                    :icon="showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'"
                    class="w-5 h-5"
                  />
                </button>
              </div>
              <p
                v-if="confirmPassword && confirmPassword !== newPassword"
                class="mt-2 text-xs text-red-400 flex items-center gap-1"
              >
                <Icon icon="mdi:alert-circle" class="w-3.5 h-3.5" />
                {{ $t("passwords_not_match") }}
              </p>
              <p
                v-else-if="confirmPassword && confirmPassword === newPassword"
                class="mt-2 text-xs text-green-400 flex items-center gap-1"
              >
                <Icon icon="mdi:check-circle" class="w-3.5 h-3.5" />
                {{ $t("passwords_match") }}
              </p>
            </div>

            <!-- Submit Button -->
            <div class="pt-2">
              <button
                type="submit"
                :disabled="isButtonDisabled || buttonLoading"
                class="w-full py-3.5 bg-[#ff3344] text-white text-sm font-bold rounded-xl hover:bg-[#cc2a3a] transition-all focus:outline-none focus:ring-2 focus:ring-[#ff3344]/50 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-[#ff3344]/30 flex items-center justify-center gap-2"
              >
                <Icon
                  v-if="!buttonLoading"
                  icon="mdi:shield-lock"
                  class="w-5 h-5"
                />
                <Icon
                  v-if="buttonLoading"
                  icon="mdi:loading"
                  class="w-5 h-5 animate-spin"
                />
                <span>{{
                  buttonLoading ? $t("processing") : $t("update_password")
                }}</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Right Column - Info (1/3 width) -->
        <div class="space-y-4">
          <!-- Password Requirements -->
          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-lg p-5 max-lg:p-4"
          >
            <div class="flex items-center gap-2 mb-4">
              <div
                class="w-8 h-8 rounded-lg bg-[#ff3344]/10 flex items-center justify-center"
              >
                <Icon icon="mdi:information" class="w-4 h-4 text-[#ff3344]" />
              </div>
              <h3 class="text-sm font-semibold text-[#ff3344]">
                {{ $t("password_requirements") }}
              </h3>
            </div>
            <ul class="text-xs text-[#f0eaea] space-y-2">
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  class="w-4 h-4 text-[#ff3344] flex-shrink-0 mt-0.5"
                />
                <span>{{ $t("at_least_8_chars") }}</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  class="w-4 h-4 text-[#ff3344] flex-shrink-0 mt-0.5"
                />
                <span>{{ $t("include_uppercase") }}</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  class="w-4 h-4 text-[#ff3344] flex-shrink-0 mt-0.5"
                />
                <span>{{ $t("include_lowercase") }}</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  class="w-4 h-4 text-[#ff3344] flex-shrink-0 mt-0.5"
                />
                <span>{{ $t("include_number") }}</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:check-circle"
                  class="w-4 h-4 text-[#ff3344] flex-shrink-0 mt-0.5"
                />
                <span>{{ $t("include_special_char") }}</span>
              </li>
            </ul>
          </div>

          <!-- Security Tips -->
          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-lg p-5 max-lg:p-4"
          >
            <div class="flex items-center gap-2 mb-4">
              <div
                class="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center"
              >
                <Icon icon="mdi:shield-check" class="w-4 h-4 text-amber-400" />
              </div>
              <h3 class="text-sm font-semibold text-amber-400">
                {{ $t("security_tips") }}
              </h3>
            </div>
            <ul class="text-xs text-[#f0eaea] space-y-2">
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:shield-star"
                  class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                />
                <span>{{ $t("use_unique_password") }}</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:shield-star"
                  class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                />
                <span>{{ $t("never_share_password") }}</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:shield-star"
                  class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                />
                <span>{{ $t("use_password_manager") }}</span>
              </li>
              <li class="flex items-start gap-2">
                <Icon
                  icon="mdi:shield-star"
                  class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                />
                <span>{{ $t("change_regularly") }}</span>
              </li>
            </ul>
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
