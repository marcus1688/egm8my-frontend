<template>
  <UserAccountLayout>
    <div class="bg-white text-gray-800 rounded-lg">
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-lg font-bold">{{ $t("rebate") }}</h1>
        <p class="text-gray-500 text-sm max-lg:text-xs">
          {{ $t("claim_rebate_description") }}
        </p>
      </div>
      <PageLoading v-if="isLoading || claimButtonLoading" />
      <div class="space-y-6 max-lg:space-y-4">
        <div
          class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 max-lg:p-4 border border-blue-100 relative overflow-hidden"
        >
          <div class="absolute right-0 bottom-0 opacity-10">
            <Icon icon="mdi:gift-outline" class="w-32 h-32 text-blue-500" />
          </div>

          <div class="relative z-10">
            <div
              class="flex flex-col md:flex-row gap-6 items-center justify-between"
            >
              <div>
                <h3 class="text-xl font-bold text-gray-800 mb-2">
                  {{ $t("rebate_rewards_ready") }}
                </h3>
                <p class="text-gray-600 mb-2 max-w-2xl max-lg:text-sm">
                  {{ $t("rebate_rewards_based") }}
                </p>
                <p class="text-sm text-blue-600 mb-0">
                  <Icon
                    icon="mdi:information-outline"
                    class="inline-block mr-1"
                  />
                  {{ $t("valid_turnover_info") }}
                </p>
              </div>

              <div class="flex-shrink-0">
                <LoadingButton
                  :loading="claimButtonLoading"
                  @click="claimRebate"
                  class="w-full md:w-auto px-8 py-3 max-lg:px-6 max-lg:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 lg:hover:from-blue-700 lg:hover:to-indigo-700 text-white font-medium rounded-lg transition-all shadow-md lg:hover:shadow-lg"
                >
                  <div class="flex items-center justify-center gap-2">
                    <Icon
                      v-if="!claimButtonLoading"
                      icon="mdi:cash-refund"
                      class="w-5 h-5"
                    />
                    <span class="font-bold max-lg:text-sm uppercase">{{
                      $t("claim_my_rebate")
                    }}</span>
                  </div>
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div
            class="bg-teal-50 border border-teal-100 rounded-lg p-4 flex items-start gap-3"
          >
            <div
              class="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-600 flex-shrink-0"
            >
              <Icon icon="mdi:clock-alert" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-medium text-gray-800 mb-1">
                {{ $t("time_limit") }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ $t("time_limit_description") }}
              </p>
            </div>
          </div>

          <div
            class="bg-purple-50 border border-purple-100 rounded-lg p-4 flex items-start gap-3"
          >
            <div
              class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0"
            >
              <Icon icon="mdi:cash-refund" class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-medium text-gray-800 mb-1">
                {{ $t("no_turnover") }}
              </h3>
              <p class="text-sm text-gray-600">
                {{ $t("no_turnover_description") }}
              </p>
            </div>
          </div>
        </div>

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
              {{ $t("games_not_qualify") }}
            </p>
          </div>
        </div>

        <div
          class="bg-gray-50 rounded-lg p-6 max-lg:p-4 border border-gray-100"
        >
          <h3
            class="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2"
          >
            <Icon icon="mdi:information" class="text-blue-600" />
            {{ $t("rebate_rates_vip") }}
          </h3>

          <div class="space-y-4">
            <div class="overflow-x-auto">
              <table
                class="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <thead>
                  <tr class="bg-gray-100 text-gray-700">
                    <th class="py-2 px-4 text-left text-sm font-medium">
                      {{ $t("game_type") }}
                    </th>
                    <th
                      v-for="level in settingsData.vipLevels"
                      :key="level.name"
                      class="py-2 px-4 text-center text-sm font-medium"
                    >
                      {{ level.name }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                  <tr>
                    <td class="py-2 px-4 text-sm text-gray-700">
                      {{ $t("slots") }}
                    </td>
                    <td
                      v-for="level in settingsData.vipLevels"
                      :key="`slots-${level.name}`"
                      class="py-2 px-4 text-sm text-gray-700 text-center"
                    >
                      {{
                        level.benefits && level.benefits["Rebate Slot"]
                          ? formatNumber(
                              level.benefits["Rebate Slot"],
                              "Rebate Slot"
                            ) + "%"
                          : "-"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 text-sm text-gray-700">
                      {{ $t("live_casino") }}
                    </td>
                    <td
                      v-for="level in settingsData.vipLevels"
                      :key="`live-${level.name}`"
                      class="py-2 px-4 text-sm text-gray-700 text-center"
                    >
                      {{
                        level.benefits && level.benefits["Rebate Live Casino"]
                          ? formatNumber(
                              level.benefits["Rebate Live Casino"],
                              "Rebate Live Casino"
                            ) + "%"
                          : "-"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="py-2 px-4 text-sm text-gray-700">
                      {{ $t("sports_esports") }}
                    </td>
                    <td
                      v-for="level in settingsData.vipLevels"
                      :key="`sports-${level.name}`"
                      class="py-2 px-4 text-sm text-gray-700 text-center"
                    >
                      {{
                        level.benefits &&
                        level.benefits["Rebate Sports & Esports"]
                          ? formatNumber(
                              level.benefits["Rebate Sports & Esports"],
                              "Rebate Sports & Esports"
                            ) + "%"
                          : "-"
                      }}
                    </td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="py-2 px-4 text-sm text-gray-700">
                      {{ $t("lottery") }}
                    </td>
                    <td
                      v-for="level in settingsData.vipLevels"
                      :key="`lottery-${level.name}`"
                      class="py-2 px-4 text-sm text-gray-400 text-center italic"
                    >
                      N/A
                    </td>
                  </tr>
                  <tr class="bg-gray-50">
                    <td class="py-2 px-4 text-sm text-gray-700">
                      {{ $t("fishing_games") }}
                    </td>
                    <td
                      v-for="level in settingsData.vipLevels"
                      :key="`fishing-${level.name}`"
                      class="py-2 px-4 text-sm text-gray-400 text-center italic"
                    >
                      N/A
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="flex flex-col gap-2">
              <div class="text-sm text-gray-500 italic">
                {{ $t("rebate_rates_note") }}
              </div>
              <div class="text-sm text-gray-500">
                <span class="font-medium">{{ $t("your_current_vip") }}: </span>
                <span class="font-bold text-blue-600">{{
                  userData?.viplevel || "Bronze"
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg p-6 max-lg:p-4 border border-gray-200">
          <h3 class="text-lg font-medium text-gray-800 mb-4">
            {{ $t("how_rebates_work") }}
          </h3>

          <div class="space-y-4">
            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
              >
                1
              </div>
              <div>
                <h4 class="font-medium text-gray-700">
                  {{ $t("play_eligible_games") }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ $t("play_eligible_description") }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
              >
                2
              </div>
              <div>
                <h4 class="font-medium text-gray-700">
                  {{ $t("automatic_calculation") }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ $t("automatic_calculation_description") }}
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center flex-shrink-0 font-bold text-sm"
              >
                3
              </div>
              <div>
                <h4 class="font-medium text-gray-700">
                  {{ $t("claim_your_rewards") }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ $t("claim_rewards_description") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center mt-2">
          <LoadingButton
            :loading="claimButtonLoading"
            @click="claimRebate"
            class="px-8 py-3 max-lg:px-6 max-lg:py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 lg:hover:from-blue-700 lg:hover:to-indigo-700 text-white font-medium rounded-lg transition-all shadow-md lg:hover:shadow-lg"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon
                v-if="!claimButtonLoading"
                icon="mdi:cash-refund"
                class="w-5 h-5"
              />
              <span class="font-bold max-lg:text-sm uppercase">{{
                $t("claim_my_rebate_now")
              }}</span>
            </div>
          </LoadingButton>
        </div>
      </div>
    </div>
  </UserAccountLayout>
</template>

<script setup>
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";
import { Icon } from "@iconify/vue";

const settingsData = ref({
  tableTitle: "VIP Exclusive Benefits",
  rowHeaders: [],
  vipLevels: [],
  terms: {
    en: "",
    zh: "",
  },
});
const isLoading = ref(true);
const claimButtonLoading = ref(false);
const lastClaimedDate = ref(null);
const userData = useState("userData");
const { get, post } = useApiEndpoint();
const { showAlert } = useAlert();

const formatNumber = (value, rowName) => {
  if (!value) return "";
  if (
    typeof value === "string" &&
    (value.toLowerCase() === "no" || value.toLowerCase() === "yes")
  ) {
    return value.toUpperCase();
  }
  const number = parseFloat(value);
  if (isNaN(number)) {
    return value;
  }
  if (rowName === "Withdraw Limit" || rowName === "Total Deposit") {
    return number.toLocaleString("en-US", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  } else {
    return number.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }
};

const fetchSettings = async () => {
  try {
    const { data } = await get("vipsettings");
    if (data?.success) {
      settingsData.value = data.data[0];
    }
  } catch (error) {
    console.error("Error fetching VIP settings:", error);
  }
};

const claimRebate = async () => {
  claimButtonLoading.value = true;
  try {
    const { data } = await post("user/claimrebate");
    console.log(data);
    if (data.success) {
      showAlert($t("alert_success"), $t("rebate_claim_success"), "success");
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Error claiming rebate:", error);
    showAlert(
      "Error",
      error.response?.data?.message || "Network error. Please try again.",
      "error"
    );
  } finally {
    claimButtonLoading.value = false;
  }
};

onMounted(async () => {
  await fetchSettings();
  isLoading.value = false;
});
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes ping {
  75%,
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
