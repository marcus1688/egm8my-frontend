<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg">
          {{ $t("checkin_bonus") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("checkin_bonus_description") }}
        </p>
      </div>

      <PageLoading v-if="isLoading" />

      <div v-else class="space-y-4">
        <!-- Main Claim Card -->
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-lg p-5 max-lg:p-4"
        >
          <div class="flex items-center justify-between gap-4 mb-4">
            <div class="flex items-center gap-3">
              <div
                class="w-12 h-12 rounded-lg bg-[#ff3344]/10 flex items-center justify-center"
              >
                <Icon
                  icon="mdi:calendar-check"
                  class="w-6 h-6 text-[#ff3344]"
                />
              </div>
              <div>
                <h3 class="font-bold text-[#f0eaea] text-base mb-0.5">
                  {{ $t("checkin_bonus_ready") }}
                </h3>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("checkin_bonus_reward") }}
                </p>
              </div>
            </div>
          </div>

          <LoadingButton
            :loading="claimButtonLoading"
            @click="claimCheckinBonus"
            class="w-full py-3 bg-[#ff3344] text-white rounded-lg font-semibold lg:hover:bg-[#cc2a3a] transition-all text-sm max-lg:py-2.5"
          >
            <div class="flex items-center justify-center gap-2">
              <Icon
                v-if="!claimButtonLoading"
                icon="mdi:calendar-check"
                class="w-5 h-5"
              />
              <span>{{ $t("claim_checkin_bonus") }}</span>
            </div>
          </LoadingButton>
        </div>

        <!-- Requirements -->
        <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
          <h3
            class="font-semibold text-[#f0eaea] mb-3 text-sm flex items-center gap-2"
          >
            <Icon icon="mdi:clipboard-check" class="w-5 h-5 text-[#ff3344]" />
            {{ $t("requirements") }}
          </h3>
          <div class="space-y-3">
            <div class="flex gap-3">
              <Icon
                icon="mdi:numeric-7-circle"
                class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("seven_day_requirement") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("seven_day_requirement_description") }}
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <Icon
                icon="mdi:cash-multiple"
                class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("bonus_amount") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("bonus_amount_description") }}
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <Icon
                icon="mdi:calendar-sync"
                class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("consecutive_days") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("consecutive_deposit_requirement") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Important Notice -->
        <div class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <div class="flex gap-3">
            <Icon
              icon="mdi:alert-circle"
              class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
            />
            <div>
              <h4 class="font-semibold text-amber-400 mb-1 text-sm">
                {{ $t("important_notice") }}
              </h4>
              <p class="text-xs text-[#f0eaea]">
                {{ $t("checkin_terms_notice") }}
              </p>
            </div>
          </div>
        </div>

        <!-- How It Works -->
        <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
          <h3
            class="font-semibold text-[#f0eaea] mb-3 text-sm flex items-center gap-2"
          >
            <Icon icon="mdi:help-circle" class="w-5 h-5 text-[#ff3344]" />
            {{ $t("how_checkin_works") }}
          </h3>

          <div class="space-y-3">
            <div class="flex gap-3">
              <div
                class="w-6 h-6 rounded-full bg-[#ff3344] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold"
              >
                1
              </div>
              <div>
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("make_deposits") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("make_deposits_description") }}
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
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("maintain_streak") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("maintain_streak_description") }}
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
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("claim_bonus") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("claim_bonus_description") }}
                </p>
              </div>
            </div>

            <div class="flex gap-3">
              <div
                class="w-6 h-6 rounded-full bg-[#ff3344] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold"
              >
                4
              </div>
              <div>
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("continue_earning") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("continue_earning_description") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Terms & Conditions -->
        <div class="border border-[#3b1c23] rounded-lg p-4">
          <h3
            class="font-semibold text-[#f0eaea] mb-3 text-sm flex items-center gap-2"
          >
            <Icon icon="mdi:file-document" class="w-5 h-5 text-[#ff3344]" />
            {{ $t("terms_conditions") }}
          </h3>
          <ul class="space-y-2 text-xs text-[#b37a7a]">
            <li class="flex gap-2">
              <Icon
                icon="mdi:circle-small"
                class="w-4 h-4 flex-shrink-0 mt-0.5"
              />
              <span>{{ $t("term_1") }}</span>
            </li>
            <li class="flex gap-2">
              <Icon
                icon="mdi:circle-small"
                class="w-4 h-4 flex-shrink-0 mt-0.5"
              />
              <span>{{ $t("term_2") }}</span>
            </li>
            <li class="flex gap-2">
              <Icon
                icon="mdi:circle-small"
                class="w-4 h-4 flex-shrink-0 mt-0.5"
              />
              <span>{{ $t("term_3") }}</span>
            </li>
            <li class="flex gap-2">
              <Icon
                icon="mdi:circle-small"
                class="w-4 h-4 flex-shrink-0 mt-0.5"
              />
              <span>{{ $t("term_4") }}</span>
            </li>
          </ul>
        </div>

        <!-- Bottom Action -->
        <LoadingButton
          :loading="claimButtonLoading"
          @click="claimCheckinBonus"
          class="w-full py-3 bg-[#ff3344] text-white rounded-lg font-semibold lg:hover:bg-[#cc2a3a] transition-all text-sm max-lg:py-2.5"
        >
          <div class="flex items-center justify-center gap-2">
            <Icon
              v-if="!claimButtonLoading"
              icon="mdi:calendar-check"
              class="w-5 h-5"
            />
            <span>{{ $t("claim_checkin_bonus") }}</span>
          </div>
        </LoadingButton>
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
