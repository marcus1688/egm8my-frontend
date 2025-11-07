<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg">
          {{ $t("rebate") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("claim_rebate_description") }}
        </p>
      </div>

      <PageLoading v-if="isLoading" />

      <div v-else class="space-y-4">
        <!-- Claim Rebate Card -->
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-lg p-5 max-lg:p-4"
        >
          <div class="flex items-center justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-lg bg-[#ff3344]/10 flex items-center justify-center"
              >
                <Icon icon="mdi:gift" class="w-6 h-6 text-[#ff3344]" />
              </div>
              <div>
                <h3 class="font-bold text-[#f0eaea] text-base mb-0.5">
                  {{ $t("rebate_rewards_ready") }}
                </h3>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("rebate_rewards_based") }}
                </p>
              </div>
            </div>
          </div>

          <LoadingButton
            :loading="claimButtonLoading"
            @click="claimRebate"
            class="w-full py-3 bg-[#ff3344] text-white rounded-lg font-semibold lg:hover:bg-[#cc2a3a] transition-all text-sm max-lg:py-2.5"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon
                v-if="!claimButtonLoading"
                icon="mdi:cash-refund"
                class="w-5 h-5"
              />
              <span class="uppercase">{{ $t("claim_my_rebate") }}</span>
            </div>
          </LoadingButton>
        </div>

        <!-- Info Cards -->
        <div class="grid md:grid-cols-2 gap-3">
          <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
            <div class="flex gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-[#ff3344]/10 flex items-center justify-center flex-shrink-0"
              >
                <Icon icon="mdi:clock-alert" class="w-5 h-5 text-[#ff3344]" />
              </div>
              <div>
                <h4 class="font-semibold text-[#f0eaea] mb-1 text-sm">
                  {{ $t("time_limit") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("time_limit_description") }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
            <div class="flex gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-[#ff3344]/10 flex items-center justify-center flex-shrink-0"
              >
                <Icon icon="mdi:cash-refund" class="w-5 h-5 text-[#ff3344]" />
              </div>
              <div>
                <h4 class="font-semibold text-[#f0eaea] mb-1 text-sm">
                  {{ $t("no_turnover") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("no_turnover_description") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Notice -->
        <div class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <div class="flex gap-3">
            <Icon
              icon="mdi:information"
              class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
            />
            <div>
              <h4 class="font-semibold text-amber-400 mb-1 text-sm">
                {{ $t("important_notice") }}
              </h4>
              <p class="text-xs text-[#f0eaea]">
                {{ $t("games_not_qualify") }}
              </p>
              <p class="text-xs text-[#b37a7a] mt-1">
                <Icon
                  icon="mdi:information-outline"
                  class="inline-block mr-1"
                />
                {{ $t("valid_turnover_info") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Your Current VIP -->
        <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-[#ff3344]/10 flex items-center justify-center"
              >
                <Icon icon="mdi:crown" class="w-5 h-5 text-[#ff3344]" />
              </div>
              <div>
                <p class="text-xs text-[#b37a7a] mb-0.5">
                  {{ $t("your_current_vip") }}
                </p>
                <p class="text-base font-bold text-[#ff3344]">
                  {{ userData?.viplevel || "Bronze" }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Rebate Rates Table -->
        <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
          <h3
            class="font-bold text-[#f0eaea] mb-3 text-base flex items-center gap-2"
          >
            <Icon icon="mdi:table" class="text-[#ff3344]" />
            {{ $t("rebate_rates_vip") }}
          </h3>

          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-[#3b1c23]">
                  <th
                    class="py-2 px-3 text-left text-xs font-semibold text-[#f0eaea]"
                  >
                    {{ $t("game_type") }}
                  </th>
                  <th
                    v-for="level in settingsData.vipLevels"
                    :key="level.name"
                    class="py-2 px-3 text-center text-xs font-semibold text-[#f0eaea]"
                  >
                    {{ level.name }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b border-[#3b1c23]">
                  <td class="py-2 px-3 text-xs text-[#f0eaea]">
                    {{ $t("slots") }}
                  </td>
                  <td
                    v-for="level in settingsData.vipLevels"
                    :key="`slots-${level.name}`"
                    class="py-2 px-3 text-xs text-[#b37a7a] text-center"
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
                <tr class="border-b border-[#3b1c23]">
                  <td class="py-2 px-3 text-xs text-[#f0eaea]">
                    {{ $t("live_casino") }}
                  </td>
                  <td
                    v-for="level in settingsData.vipLevels"
                    :key="`live-${level.name}`"
                    class="py-2 px-3 text-xs text-[#b37a7a] text-center"
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
                <tr class="border-b border-[#3b1c23]">
                  <td class="py-2 px-3 text-xs text-[#f0eaea]">
                    {{ $t("sports_esports") }}
                  </td>
                  <td
                    v-for="level in settingsData.vipLevels"
                    :key="`sports-${level.name}`"
                    class="py-2 px-3 text-xs text-[#b37a7a] text-center"
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
                <tr class="border-b border-[#3b1c23]">
                  <td class="py-2 px-3 text-xs text-[#f0eaea]">
                    {{ $t("lottery") }}
                  </td>
                  <td
                    v-for="level in settingsData.vipLevels"
                    :key="`lottery-${level.name}`"
                    class="py-2 px-3 text-xs text-[#b37a7a] text-center italic"
                  >
                    N/A
                  </td>
                </tr>
                <tr>
                  <td class="py-2 px-3 text-xs text-[#f0eaea]">
                    {{ $t("fishing_games") }}
                  </td>
                  <td
                    v-for="level in settingsData.vipLevels"
                    :key="`fishing-${level.name}`"
                    class="py-2 px-3 text-xs text-[#b37a7a] text-center italic"
                  >
                    N/A
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="text-xs text-[#b37a7a] italic mt-3">
            {{ $t("rebate_rates_note") }}
          </p>
        </div>

        <!-- How Rebates Work -->
        <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
          <h3
            class="font-bold text-[#f0eaea] mb-3 text-base flex items-center gap-2"
          >
            <Icon icon="mdi:help-circle" class="text-[#ff3344]" />
            {{ $t("how_rebates_work") }}
          </h3>

          <div class="space-y-3">
            <div class="flex gap-3">
              <div
                class="w-6 h-6 rounded-full bg-[#ff3344] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold"
              >
                1
              </div>
              <div>
                <h4 class="font-semibold text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("play_eligible_games") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("play_eligible_description") }}
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <div
                class="w-6 h-6 rounded-full bg-[#ff3344] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold"
              >
                2
              </div>
              <div>
                <h4 class="font-semibold text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("automatic_calculation") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("automatic_calculation_description") }}
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <div
                class="w-6 h-6 rounded-full bg-[#ff3344] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold"
              >
                3
              </div>
              <div>
                <h4 class="font-semibold text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("claim_your_rewards") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("claim_rewards_description") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Claim Button -->
        <div class="pt-2">
          <LoadingButton
            :loading="claimButtonLoading"
            @click="claimRebate"
            class="w-full py-3 bg-[#ff3344] text-white rounded-lg font-semibold lg:hover:bg-[#cc2a3a] transition-all text-sm max-lg:py-2.5"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon
                v-if="!claimButtonLoading"
                icon="mdi:cash-refund"
                class="w-5 h-5"
              />
              <span class="uppercase">{{ $t("claim_my_rebate_now") }}</span>
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
