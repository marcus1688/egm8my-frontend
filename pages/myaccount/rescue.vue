<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-lg font-bold max-lg:text-base">
          {{ $t("rescue_bonus") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("rescue_bonus_description") }}
        </p>
      </div>
      <PageLoading v-if="isLoading || claimButtonLoading" />
      <div class="space-y-6 max-lg:space-y-4">
        <div
          class="bg-gradient-to-r from-red-500/10 to-orange-500/20 rounded-xl p-6 max-lg:p-4 border border-red-500/30 relative overflow-hidden shadow-lg shadow-red-500/10"
        >
          <div class="absolute right-0 bottom-0 opacity-10">
            <Icon icon="mdi:life-buoy" class="w-32 h-32 text-red-400" />
          </div>

          <div class="relative z-10">
            <div
              class="flex flex-col md:flex-row gap-6 items-center justify-between"
            >
              <div>
                <h3 class="text-xl font-bold text-[#f0eaea] mb-2">
                  {{ $t("rescue_bonus_ready") }}
                </h3>
                <p class="text-[#b37a7a] mb-2 max-w-2xl max-lg:text-sm">
                  {{ $t("rescue_bonus_help") }}
                </p>
                <p class="text-sm text-red-400 mb-0">
                  <Icon
                    icon="mdi:information-outline"
                    class="inline-block mr-1"
                  />
                  {{ $t("rescue_bonus_eligibility") }}
                </p>
              </div>

              <div class="flex-shrink-0">
                <LoadingButton
                  :loading="claimButtonLoading"
                  @click="claimRescueBonus"
                  class="w-full md:w-auto px-8 py-3 max-lg:px-6 max-lg:py-2.5 bg-gradient-to-r from-red-600 to-orange-600 lg:hover:brightness-110 text-white font-medium rounded-lg transition-all shadow-lg shadow-red-500/20 lg:hover:shadow-red-500/30"
                >
                  <div class="flex items-center justify-center gap-2">
                    <Icon icon="mdi:hand-heart" class="w-5 h-5" />
                    <span class="font-bold max-lg:text-sm uppercase">{{
                      $t("claim_rescue_bonus")
                    }}</span>
                  </div>
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div
            class="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 flex items-start gap-3"
          >
            <div
              class="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0"
            >
              <Icon icon="mdi:clock-alert" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-medium text-[#f0eaea] mb-1">
                {{ $t("eligibility_check") }}
              </h3>
              <p class="text-sm text-[#b37a7a]">
                {{ $t("rescue_eligibility_description") }}
              </p>
            </div>
          </div>
          <div
            class="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4 flex items-start gap-3"
          >
            <div
              class="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 flex-shrink-0"
            >
              <Icon icon="mdi:gift-outline" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-medium text-[#f0eaea] mb-1">
                {{ $t("instant_credit") }}
              </h3>
              <p class="text-sm text-[#b37a7a]">
                {{ $t("instant_credit_description") }}
              </p>
            </div>
          </div>
        </div>
        <div
          class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 flex items-start gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0"
          >
            <Icon icon="mdi:information" class="w-5 h-5" />
          </div>
          <div>
            <h3 class="font-medium text-[#f0eaea] mb-1">
              {{ $t("terms_conditions") }}
            </h3>
            <p class="text-sm text-[#b37a7a]">
              {{ $t("rescue_terms_description") }}
            </p>
          </div>
        </div>
        <div
          class="bg-[#15090e]/50 rounded-xl p-6 max-lg:p-4 border border-[#3b1c23] shadow-lg shadow-red-500/10"
        >
          <h3 class="text-lg font-medium text-[#f0eaea] mb-4">
            {{ $t("how_rescue_works") }}
          </h3>

          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
              >
                1
              </div>
              <div>
                <h4 class="font-medium text-[#f0eaea]">
                  {{ $t("check_eligibility") }}
                </h4>
                <p class="text-sm text-[#b37a7a]">
                  {{ $t("check_eligibility_description") }}
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
              >
                2
              </div>
              <div>
                <h4 class="font-medium text-[#f0eaea]">
                  {{ $t("automatic_rescue_calculation") }}
                </h4>
                <p class="text-sm text-[#b37a7a]">
                  {{ $t("rescue_calculation_description") }}
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
              >
                3
              </div>
              <div>
                <h4 class="font-medium text-[#f0eaea]">
                  {{ $t("claim_instantly") }}
                </h4>
                <p class="text-sm text-[#b37a7a]">
                  {{ $t("claim_instantly_description") }}
                </p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-gradient-to-r from-red-600 to-orange-600 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
              >
                4
              </div>
              <div>
                <h4 class="font-medium text-[#f0eaea]">
                  {{ $t("start_playing") }}
                </h4>
                <p class="text-sm text-[#b37a7a]">
                  {{ $t("start_playing_description") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserAccountLayout>
</template>

<script setup>
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";
import { Icon } from "@iconify/vue";

const isLoading = ref(false);
const claimButtonLoading = ref(false);
const userData = useState("userData");
const { get, post } = useApiEndpoint();
const { alertVisible, alertTitle, alertMessage, alertType, showAlert } =
  useAlert();

const fetchUserData = async () => {
  try {
    const { data } = await get("userdata");
    if (data.success) {
      userData.value = data.user;
    }
  } catch (error) {
    console.error("Error fetching helps:", error);
  }
};

const claimRescueBonus = async () => {
  claimButtonLoading.value = true;
  try {
    const { data } = await post("user/claim-rescue-bonus");
    if (data.success) {
      showAlert(
        $t("alert_success"),
        data.message[$locale.value] || data.message.en,
        "success"
      );
      await fetchUserData();
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Error claiming rescue bonus:", error);
    showAlert(
      "Error",
      error.response?.data?.message?.en || "Network error. Please try again.",
      "error"
    );
  } finally {
    claimButtonLoading.value = false;
  }
};
</script>

<style scoped></style>
