<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg max-sm:text-base">
          {{ $t("checkin_bonus") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("checkin_bonus_description") }}
        </p>
      </div>

      <PageLoading v-if="isLoading" />

      <div v-else class="space-y-4">
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
        >
          <div class="px-5 pt-5 border-b border-[#3b1c23]">
            <div class="flex items-center justify-between gap-4 mb-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-11 h-11 max-lg:w-10 max-md:hidden max-lg:h-10 rounded-xl bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center shadow-lg shadow-[#ff3344]/30"
                >
                  <Icon
                    icon="mdi:calendar-check"
                    class="w-6 h-6 text-white max-lg:w-5 max-lg:h-5"
                  />
                </div>
                <div>
                  <h3
                    class="font-bold text-[#f0eaea] text-base max-lg:text-sm mb-0.5"
                  >
                    {{ $t("checkin_bonus_ready") }}
                  </h3>
                  <p class="text-sm max-sm:text-xs text-[#b37a7a]">
                    {{ $t("checkin_bonus_reward") }}
                  </p>
                </div>
              </div>
            </div>

            <LoadingButton
              :loading="claimButtonLoading"
              @click="claimCheckinBonus"
              class="w-full py-3 bg-[#ff3344] lg:hover:bg-[#cc2a3a] rounded-lg text-base font-semibold text-white transition-all mb-6 max-lg:py-2.5 max-lg:text-sm max-lg:mb-4"
            >
              <div class="flex items-center justify-center gap-2">
                <span>{{ $t("claim_checkin_bonus") }}</span>
              </div>
            </LoadingButton>
          </div>

          <!-- Requirements Grid -->
          <div
            class="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#3b1c23]"
          >
            <div class="p-4">
              <div class="flex items-start gap-3">
                <div
                  class="w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-lg bg-[#ff3344]/10 flex items-center justify-center flex-shrink-0"
                >
                  <Icon
                    icon="mdi:numeric-7-circle"
                    class="w-5 h-5 max-sm:w-4 max-sm:h-4 text-[#ff3344]"
                  />
                </div>
                <div>
                  <h4
                    class="font-semibold text-[#f0eaea] mb-1 max-sm:text-sm max-[370px]:text-xs text-[0.9rem]"
                  >
                    {{ $t("seven_day_requirement") }}
                  </h4>
                  <p
                    class="text-sm max-lg:text-xs text-[#b37a7a] leading-relaxed"
                  >
                    {{ $t("seven_day_requirement_description") }}
                  </p>
                </div>
              </div>
            </div>

            <div class="p-4">
              <div class="flex items-start gap-3">
                <div
                  class="w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-lg bg-[#ff3344]/10 flex items-center justify-center flex-shrink-0"
                >
                  <Icon
                    icon="mdi:cash-multiple"
                    class="w-5 h-5 max-sm:w-4 max-sm:h-4 text-[#ff3344]"
                  />
                </div>
                <div>
                  <h4
                    class="font-semibold text-[#f0eaea] mb-1 max-sm:text-sm max-[370px]:text-xs text-[0.9rem]"
                  >
                    {{ $t("bonus_amount") }}
                  </h4>
                  <p
                    class="text-sm max-lg:text-xs text-[#b37a7a] leading-relaxed"
                  >
                    {{ $t("bonus_amount_description") }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Important Notice -->
          <div class="p-4 bg-amber-500/5 border-t border-amber-500/20">
            <div class="flex gap-3">
              <Icon
                icon="mdi:alert-circle"
                class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 class="font-semibold text-amber-400 mb-1 text-sm">
                  {{ $t("important_notice") }}
                </h4>
                <p class="text-xs text-[#f0eaea] leading-relaxed">
                  {{ $t("checkin_terms_notice") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- How It Works -->
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
        >
          <div class="p-4 border-b border-[#3b1c23]">
            <h3
              class="font-bold text-[#f0eaea] text-base max-lg:text-sm flex items-center gap-2"
            >
              {{ $t("how_checkin_works") }}
            </h3>
          </div>

          <div class="p-4 space-y-4">
            <div class="flex gap-2">
              <div
                class="w-5 h-5 rounded-full bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg shadow-[#ff3344]/30"
              >
                1
              </div>
              <div class="flex-1">
                <h4
                  class="font-semibold text-[#f0eaea] max-sm:text-sm max-[370px]:text-xs text-[0.9rem] mb-0.5"
                >
                  {{ $t("make_deposits") }}
                </h4>
                <p
                  class="text-sm max-lg:text-xs text-[#b37a7a] leading-relaxed"
                >
                  {{ $t("make_deposits_description") }}
                </p>
              </div>
            </div>

            <div class="flex gap-2">
              <div
                class="w-5 h-5 rounded-full bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg shadow-[#ff3344]/30"
              >
                2
              </div>
              <div class="flex-1">
                <h4
                  class="font-semibold text-[#f0eaea] max-sm:text-sm max-[370px]:text-xs text-[0.9rem] mb-0.5"
                >
                  {{ $t("maintain_streak") }}
                </h4>
                <p
                  class="text-sm max-lg:text-xs text-[#b37a7a] leading-relaxed"
                >
                  {{ $t("maintain_streak_description") }}
                </p>
              </div>
            </div>

            <div class="flex gap-2">
              <div
                class="w-5 h-5 rounded-full bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg shadow-[#ff3344]/30"
              >
                3
              </div>
              <div class="flex-1">
                <h4
                  class="font-semibold text-[#f0eaea] max-sm:text-sm max-[370px]:text-xs text-[0.9rem] mb-0.5"
                >
                  {{ $t("claim_bonus") }}
                </h4>
                <p
                  class="text-sm max-lg:text-xs text-[#b37a7a] leading-relaxed"
                >
                  {{ $t("claim_bonus_description") }}
                </p>
              </div>
            </div>

            <div class="flex gap-2">
              <div
                class="w-5 h-5 rounded-full bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] text-white flex items-center justify-center flex-shrink-0 text-xs font-bold shadow-lg shadow-[#ff3344]/30"
              >
                4
              </div>
              <div class="flex-1">
                <h4
                  class="font-semibold text-[#f0eaea] max-sm:text-sm max-[370px]:text-xs text-[0.9rem] mb-0.5"
                >
                  {{ $t("continue_earning") }}
                </h4>
                <p
                  class="text-sm max-lg:text-xs text-[#b37a7a] leading-relaxed"
                >
                  {{ $t("continue_earning_description") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Terms & Conditions -->
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
        >
          <div class="p-4 border-b border-[#3b1c23]">
            <h3
              class="font-bold text-[#f0eaea] text-base max-lg:text-sm flex items-center gap-2"
            >
              {{ $t("terms_conditions") }}
            </h3>
          </div>

          <div class="p-4">
            <ul class="space-y-2.5 text-sm max-lg:text-xs text-[#b37a7a]">
              <li class="flex gap-2">
                <Icon
                  icon="mdi:check-circle"
                  class="w-4 h-4 flex-shrink-0 mt-0.5 text-[#ff3344]"
                />
                <span class="leading-relaxed">{{ $t("term_1") }}</span>
              </li>
              <li class="flex gap-2">
                <Icon
                  icon="mdi:check-circle"
                  class="w-4 h-4 flex-shrink-0 mt-0.5 text-[#ff3344]"
                />
                <span class="leading-relaxed">{{ $t("term_2") }}</span>
              </li>
              <li class="flex gap-2">
                <Icon
                  icon="mdi:check-circle"
                  class="w-4 h-4 flex-shrink-0 mt-0.5 text-[#ff3344]"
                />
                <span class="leading-relaxed">{{ $t("term_3") }}</span>
              </li>
              <li class="flex gap-2">
                <Icon
                  icon="mdi:check-circle"
                  class="w-4 h-4 flex-shrink-0 mt-0.5 text-[#ff3344]"
                />
                <span class="leading-relaxed">{{ $t("term_4") }}</span>
              </li>
            </ul>
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
