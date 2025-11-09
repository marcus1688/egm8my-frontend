<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg max-sm:text-base">
          {{ $t("change_password") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("update_password_desc") }}
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2">
          <form
            @submit.prevent="changePassword"
            class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
          >
            <div
              class="p-4 bg-gradient-to-r from-[#ff3344]/5 to-transparent border-b border-[#3b1c23]"
            >
              <h3 class="font-bold text-[#f0eaea] text-base max-lg:text-sm">
                {{ $t("change_password") }}
              </h3>
            </div>

            <div class="p-5 max-lg:p-4 space-y-4">
              <div>
                <label
                  for="currentPassword"
                  class="block text-xs font-semibold text-[#b37a7a] mb-2 uppercase tracking-wide"
                >
                  {{ $t("current_password") }}
                </label>
                <div class="relative">
                  <input
                    :type="showCurrentPassword ? 'text' : 'password'"
                    id="currentPassword"
                    v-model="currentPassword"
                    class="w-full px-4 py-3 pr-11 rounded-lg border border-[#3b1c23] bg-[#15090e] text-[#f0eaea] text-[0.9rem] max-sm:text-sm max-[370px]:text-xs placeholder-[#b37a7a] focus:border-[#ff3344] focus:outline-none transition-all"
                    :placeholder="$t('enter_current_password')"
                  />
                  <button
                    type="button"
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] lg:hover:text-[#ff3344] transition-colors"
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
                  class="block text-xs font-semibold text-[#b37a7a] mb-2 uppercase tracking-wide"
                >
                  {{ $t("new_password") }}
                </label>
                <div class="relative">
                  <input
                    :type="showNewPassword ? 'text' : 'password'"
                    id="newPassword"
                    v-model="newPassword"
                    class="w-full px-4 py-3 pr-11 rounded-lg border border-[#3b1c23] bg-[#15090e] text-[#f0eaea] text-[0.9rem] max-sm:text-sm max-[370px]:text-xs placeholder-[#b37a7a] focus:border-[#ff3344] focus:outline-none transition-all"
                    :placeholder="$t('enter_new_password')"
                  />
                  <button
                    type="button"
                    @click="showNewPassword = !showNewPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] lg:hover:text-[#ff3344] transition-colors"
                  >
                    <Icon
                      :icon="showNewPassword ? 'mdi:eye-off' : 'mdi:eye'"
                      class="w-5 h-5"
                    />
                  </button>
                </div>

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

              <div>
                <label
                  for="confirmPassword"
                  class="block text-xs font-semibold text-[#b37a7a] mb-2 uppercase tracking-wide"
                >
                  {{ $t("confirm_new_password") }}
                </label>
                <div class="relative">
                  <input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    class="w-full px-4 py-3 pr-11 rounded-lg border bg-[#15090e] text-[#f0eaea] text-[0.9rem] max-sm:text-sm max-[370px]:text-xs placeholder-[#b37a7a] outline-none transition-all"
                    :class="{
                      'border-[#3b1c23] focus:border-[#ff3344]': !(
                        confirmPassword && confirmPassword !== newPassword
                      ),
                      'border-red-500 focus:border-red-500':
                        confirmPassword && confirmPassword !== newPassword,
                    }"
                    :placeholder="$t('confirm_password_placeholder')"
                  />
                  <button
                    type="button"
                    @click="showConfirmPassword = !showConfirmPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] lg:hover:text-[#ff3344] transition-colors"
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
            </div>

            <div class="p-4 border-t border-[#3b1c23]">
              <button
                type="submit"
                :disabled="isButtonDisabled || buttonLoading"
                class="w-full py-3 bg-[#ff3344] text-white max-lg:text-sm max-[370px]:text-xs font-semibold rounded-lg lg:hover:bg-[#cc2a3a] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Icon
                  v-if="!buttonLoading"
                  icon="mdi:shield-lock"
                  class="w-5 h-5 max-[370px]:w-4 max-[370px]:h-4"
                />
                <Icon
                  v-if="buttonLoading"
                  icon="mdi:loading"
                  class="w-5 h-5 animate-spin max-[370px]:w-4 max-[370px]:h-4"
                />
                <span>{{
                  buttonLoading ? $t("processing") : $t("update_password")
                }}</span>
              </button>
            </div>
          </form>
        </div>

        <div class="space-y-4">
          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
          >
            <div
              class="p-4 bg-gradient-to-r from-[#ff3344]/5 to-transparent border-b border-[#3b1c23]"
            >
              <h3 class="text-sm font-bold text-[#f0eaea]">
                {{ $t("password_requirements") }}
              </h3>
            </div>
            <div class="p-4">
              <ul class="text-xs text-[#f0eaea] space-y-2.5">
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
          </div>

          <!-- Security Tips -->
          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
          >
            <div
              class="p-4 bg-gradient-to-r from-amber-500/5 to-transparent border-b border-[#3b1c23]"
            >
              <h3 class="text-sm font-bold text-amber-400">
                {{ $t("security_tips") }}
              </h3>
            </div>
            <div class="p-4">
              <ul class="text-xs text-[#f0eaea] space-y-2.5">
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
