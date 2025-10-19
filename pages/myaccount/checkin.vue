<template>
  <UserAccountLayout>
    <div class="bg-white text-gray-800 rounded-lg">
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-lg font-bold max-lg:text-base">
          {{ $t("checkin_bonus") }}
        </h1>
        <p class="text-gray-500 text-sm max-lg:text-xs">
          {{ $t("checkin_bonus_description") }}
        </p>
      </div>

      <PageLoading v-if="isLoading || claimButtonLoading" />

      <div class="space-y-6 max-lg:space-y-4">
        <!-- Main Action Card -->
        <div
          class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6 max-lg:p-4 border border-green-100 relative overflow-hidden"
        >
          <div class="absolute right-0 bottom-0 opacity-10">
            <Icon icon="mdi:calendar-check" class="w-32 h-32 text-green-500" />
          </div>

          <div class="relative z-10">
            <div
              class="flex flex-col md:flex-row gap-6 items-center justify-between"
            >
              <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">
                  {{ $t("checkin_bonus_ready") }}
                </h3>
                <p class="text-gray-600 mb-2 max-w-2xl max-lg:text-sm">
                  {{ $t("checkin_bonus_reward") }}
                </p>
                <p class="text-sm text-green-600 mb-0">
                  <Icon
                    icon="mdi:information-outline"
                    class="inline-block mr-1"
                  />
                  {{ $t("consecutive_deposit_requirement") }}
                </p>
              </div>

              <div class="flex-shrink-0">
                <LoadingButton
                  :loading="claimButtonLoading"
                  @click="claimCheckinBonus"
                  class="w-full md:w-auto px-8 py-3 max-lg:px-6 max-lg:py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 lg:hover:from-green-700 lg:hover:to-emerald-700 text-white font-medium rounded-lg transition-all shadow-md lg:hover:shadow-lg"
                >
                  <div class="flex items-center justify-center gap-2">
                    <Icon
                      v-if="!claimButtonLoading"
                      icon="mdi:calendar-check"
                      class="w-5 h-5"
                    />
                    <span class="font-bold max-lg:text-sm uppercase">{{
                      $t("claim_checkin_bonus")
                    }}</span>
                  </div>
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Cards Grid -->
        <div class="grid md:grid-cols-2 gap-4">
          <div
            class="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start gap-3"
          >
            <div
              class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0"
            >
              <Icon icon="mdi:numeric-7-circle" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-medium text-gray-800 mb-1">
                {{ $t("seven_day_requirement") }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ $t("seven_day_requirement_description") }}
              </p>
            </div>
          </div>

          <div
            class="bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-start gap-3"
          >
            <div
              class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0"
            >
              <Icon icon="mdi:cash-multiple" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-medium text-gray-800 mb-1">
                {{ $t("bonus_amount") }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ $t("bonus_amount_description") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Important Notice -->
        <div
          class="bg-amber-50 border border-amber-100 rounded-lg p-4 flex items-start gap-3"
        >
          <div
            class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0"
          >
            <Icon icon="mdi:information" class="w-5 h-5" />
          </div>
          <div>
            <h3 class="font-medium text-gray-800 mb-1">
              {{ $t("important_notice") }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ $t("checkin_terms_notice") }}
            </p>
          </div>
        </div>

        <!-- How It Works Section -->
        <div class="bg-white rounded-lg p-6 max-lg:p-4 border border-gray-200">
          <h3 class="text-lg font-medium text-gray-800 mb-4">
            {{ $t("how_checkin_works") }}
          </h3>

          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
              >
                1
              </div>
              <div>
                <h4 class="font-medium text-gray-700">
                  {{ $t("make_deposits") }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ $t("make_deposits_description") }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
              >
                2
              </div>
              <div>
                <h4 class="font-medium text-gray-700">
                  {{ $t("maintain_streak") }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ $t("maintain_streak_description") }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
              >
                3
              </div>
              <div>
                <h4 class="font-medium text-gray-700">
                  {{ $t("claim_bonus") }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ $t("claim_bonus_description") }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
              >
                4
              </div>
              <div>
                <h4 class="font-medium text-gray-700">
                  {{ $t("continue_earning") }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ $t("continue_earning_description") }}
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
const { showAlert } = useAlert();

const fetchUserData = async () => {
  try {
    const { data } = await get("userdata");
    if (data.success) {
      userData.value = data.user;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const claimCheckinBonus = async () => {
  claimButtonLoading.value = true;
  try {
    const { data } = await post("submit-checkin-bonus");
    if (data.success) {
      showAlert(
        $t("alert_success"),
        $t("checkin_bonus_claimed_success"),
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
    console.error("Error claiming checkin bonus:", error);
    showAlert(
      $t("alert_error"),
      error.response?.data?.message?.[$locale.value] ||
        error.response?.data?.message?.en ||
        $t("network_error"),
      "error"
    );
  } finally {
    claimButtonLoading.value = false;
  }
};

onMounted(async () => {
  await fetchUserData();
  isLoading.value = false;
});
</script>

<style scoped></style>
