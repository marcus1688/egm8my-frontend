<template>
  <UserAccountLayout>
    <div
      v-if="showActiveGamesModal"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-3 md:p-4"
      @click="closeModalOnOutsideClick"
    >
      <div
        class="bg-[#241017]/95 backdrop-blur-sm rounded-2xl w-full max-w-sm md:max-w-md mx-auto shadow-2xl shadow-red-500/20 max-h-[30rem] overflow-auto transform transition-all duration-300 scale-100 border border-[#3b1c23]"
      >
        <div class="p-4 md:p-6 text-center border-b border-[#3b1c23]">
          <div
            class="w-14 h-14 bg-[#ff3344]/20 rounded-full flex items-center justify-center mx-auto mb-3"
          >
            <i class="bi bi-exclamation-triangle text-[#ff3344] text-xl"></i>
          </div>
          <h3 class="text-lg font-bold text-[#f0eaea] mb-1">
            {{ $t("withdrawal_blocked") }}
          </h3>
          <p class="text-xs md:text-sm text-[#b37a7a] leading-relaxed px-2">
            {{ $t("complete_games_before_withdrawal_mandatory") }}
          </p>
        </div>

        <div class="px-4 py-4 md:px-6">
          <div class="mb-3 md:mb-4">
            <p class="text-xs md:text-sm font-medium text-[#f0eaea] mb-3">
              {{ $t("incomplete_games") }} ({{ activeGames.length }})
            </p>
          </div>

          <div
            class="space-y-2 md:space-y-3 max-h-48 md:max-h-60 overflow-y-auto"
          >
            <div
              v-for="game in activeGames"
              :key="game.betId"
              class="bg-[#ff3344]/10 rounded-xl p-3 md:p-4 flex items-center justify-between border-l-4 border-[#ff3344]"
            >
              <div class="flex-1 min-w-0">
                <div class="flex items-center mb-1">
                  <div
                    class="w-2 h-2 bg-[#ff3344] rounded-full mr-2 animate-pulse"
                  ></div>
                  <p
                    class="font-semibold text-[#f0eaea] text-xs md:text-sm truncate"
                  >
                    {{ game.gameName }}
                  </p>
                </div>
              </div>

              <div class="flex-shrink-0 ml-3">
                <div
                  class="w-8 h-8 md:w-10 md:h-10 bg-[#ff3344] rounded-full flex items-center justify-center"
                >
                  <i
                    class="bi bi-controller text-white text-sm md:text-base"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="p-4 md:p-6 border-t border-[#3b1c23] bg-[#15090e]/50 rounded-b-2xl"
        >
          <div class="text-center mb-4">
            <p class="text-xs md:text-sm text-[#b37a7a] mb-2">
              {{ $t("complete_games_instruction") }}
            </p>
          </div>

          <button
            @click="showActiveGamesModal = false"
            class="w-full py-3 md:py-3.5 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] lg:hover:brightness-110 text-white font-semibold rounded-xl transition-all duration-200 text-sm"
          >
            <i class="bi bi-check-circle mr-2"></i>
            {{ $t("understood") }}
          </button>
        </div>
      </div>
    </div>
    <div class="text-[#f0eaea]">
      <div class="mb-6 max-lg:mb-4">
        <div class="flex justify-between items-center">
          <h1 class="text-lg font-bold text-[#f0eaea] max-lg:text-base">
            {{ $t("withdraw") }}
          </h1>
          <button
            type="button"
            @click="checkTurnoverRequirements"
            :disabled="turnoverCheckLoading"
            class="flex items-center justify-center bg-gradient-to-r from-[#a1122d] to-[#c21b3a] lg:hover:brightness-110 text-white font-medium py-2.5 px-4 max-lg:py-2 max-lg:px-3 rounded-lg transition shadow-lg shadow-red-500/20 disabled:opacity-60 disabled:cursor-not-allowed text-sm max-lg:text-xs whitespace-nowrap ml-4 max-lg:ml-2"
          >
            <span v-if="!turnoverCheckLoading" class="flex items-center">
              <i
                class="bi bi-clipboard-check mr-2 max-lg:mr-1 max-lg:text-xs"
              ></i>
              {{ $t("check_turnover_requirements") }}
            </span>
            <span v-else class="flex items-center">
              <i
                class="bi bi-arrow-repeat animate-spin mr-2 max-lg:mr-1 max-lg:text-xs"
              ></i>
              {{ $t("checking") }}...
            </span>
          </button>
        </div>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("request_withdrawal") }}
        </p>
      </div>

      <!-- Main Content -->
      <div class="flex flex-col gap-8 max-lg:gap-6">
        <div class="md:col-span-7">
          <div>
            <form
              @submit.prevent="submitWithdraw"
              class="space-y-6 max-lg:space-y-4"
            >
              <div>
                <label
                  for="withdrawAmount"
                  class="block text-sm max-lg:text-xs font-medium text-[#f0eaea] mb-1"
                >
                  {{ $t("withdrawal_amount") }}
                </label>
                <div class="relative">
                  <div
                    class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                  >
                    <span class="text-[#b37a7a] text-lg max-lg:text-base"
                      >MYR</span
                    >
                  </div>
                  <input
                    id="withdrawAmount"
                    v-model="withdrawAmount"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    class="pl-16 max-lg:pl-14 block w-full rounded-lg border border-[#3b1c23] py-3 max-lg:py-2.5 px-4 max-lg:px-3 bg-[#241017]/50 text-[#f0eaea] placeholder-[#b37a7a] focus:outline-none focus:ring-2 focus:ring-[#ff3344]/50 focus:border-[#ff3344] transition max-lg:text-sm"
                  />
                </div>
              </div>

              <div
                v-if="userData?.bankAccounts?.length"
                class="space-y-3 max-lg:space-y-2"
              >
                <label
                  class="block text-sm max-lg:text-xs font-medium text-[#f0eaea] mb-1"
                >
                  {{ $t("withdraw_to") }}:
                </label>
                <div class="space-y-2">
                  <div
                    v-for="bank in userData.bankAccounts"
                    :key="bank._id"
                    class="bg-[#241017]/50 rounded-lg p-4 max-lg:p-3 border border-[#3b1c23] flex justify-between items-center cursor-pointer lg:hover:border-[#ff3344]/50 lg:hover:bg-[#15090e]/70 transition"
                    :class="{
                      'border-[#ff3344] shadow-lg shadow-red-500/20 bg-[#ff3344]/10':
                        selectedBankId === bank._id,
                    }"
                    @click="selectedBankId = bank._id"
                  >
                    <div class="flex items-center">
                      <div
                        class="w-10 h-10 max-lg:w-8 max-lg:h-8 rounded-full bg-[#ff3344]/20 flex items-center justify-center mr-3 max-lg:mr-2"
                      >
                        <i class="bi bi-bank text-[#ff3344] max-lg:text-sm"></i>
                      </div>
                      <div>
                        <p class="font-medium text-[#f0eaea] max-lg:text-sm">
                          {{ bank.bankname }}
                        </p>
                        <p
                          class="text-sm max-lg:text-xs text-[#b37a7a] font-mono"
                        >
                          {{ formatBankNumber(bank.banknumber) }}
                        </p>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <!-- Radio button styled indicator -->
                      <div
                        class="w-5 h-5 max-lg:w-4 max-lg:h-4 rounded-full border-2 flex items-center justify-center mr-2"
                        :class="
                          selectedBankId === bank._id
                            ? 'border-[#ff3344]'
                            : 'border-[#3b1c23]'
                        "
                      >
                        <div
                          v-if="selectedBankId === bank._id"
                          class="w-3 h-3 max-lg:w-2 max-lg:h-2 rounded-full bg-[#ff3344]"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- No Bank Account Warning -->
              <div
                v-else
                class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 max-lg:p-3 flex items-start"
              >
                <i
                  class="bi bi-exclamation-triangle text-amber-400 text-lg max-lg:text-base mr-3 max-lg:mr-2 mt-0.5"
                ></i>
                <div>
                  <h4 class="font-medium text-amber-400 max-lg:text-sm">
                    {{ $t("no_bank_account_found") }}
                  </h4>
                  <p class="text-[#f0eaea] text-sm max-lg:text-xs mt-1">
                    {{ $t("add_bank_account_message") }}
                  </p>
                  <div class="mt-3 max-lg:mt-2">
                    <NuxtLinkLocale
                      to="/myaccount/bankaccount"
                      class="text-sm max-lg:text-xs px-4 max-lg:px-3 py-2 max-lg:py-1.5 bg-amber-500/20 lg:hover:bg-amber-500/30 text-amber-400 rounded-md transition inline-block"
                    >
                      {{ $t("add_bank_account_message") }}
                    </NuxtLinkLocale>
                  </div>
                </div>
              </div>

              <div
                class="bg-[#ff3344]/10 rounded-lg p-4 max-lg:p-3 border border-[#ff3344]/30"
              >
                <div class="flex justify-between items-center">
                  <span class="text-[#f0eaea] max-lg:text-sm"
                    >{{ $t("available_balance") }}:</span
                  >
                  <span
                    class="font-semibold text-[#ff3344] text-lg max-lg:text-base"
                  >
                    ${{ userData?.wallet?.toFixed(2) || "0.00" }}
                  </span>
                </div>
              </div>

              <div class="pt-2">
                <LoadingButton
                  type="submit"
                  :disabled="
                    withdrawButtonLoading || !userData?.bankAccounts?.length
                  "
                  class="w-full flex justify-center items-center bg-gradient-to-r from-[#a1122d] to-[#c21b3a] lg:hover:brightness-110 text-white font-medium py-3 max-lg:py-2.5 px-4 max-lg:px-3 rounded-lg transition shadow-lg shadow-red-500/20 disabled:opacity-60 disabled:cursor-not-allowed max-lg:text-sm"
                >
                  <span v-if="!withdrawButtonLoading">{{
                    $t("request_withdrawal_button")
                  }}</span>
                  <span v-else class="flex items-center">
                    <i class="bi bi-arrow-repeat animate-spin mr-2"></i>
                    {{ $t("processing") }}...
                  </span>
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>

        <div class="md:col-span-5">
          <div
            class="bg-[#15090e]/50 rounded-xl p-6 max-lg:p-4 border border-[#3b1c23] shadow-lg shadow-red-500/20 space-y-6 max-lg:space-y-4"
          >
            <div>
              <h3
                class="text-lg max-lg:text-base font-semibold text-[#f0eaea] mb-3 max-lg:mb-2"
              >
                {{ $t("withdrawal_information") }}
              </h3>

              <ul class="space-y-4 max-lg:space-y-3">
                <li class="flex items-start">
                  <i
                    class="bi bi-clock text-[#ff3344] mr-3 max-lg:mr-2 mt-1"
                  ></i>
                  <div>
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-sm">
                      {{ $t("withdrawal_information") }}
                    </h4>
                    <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                      {{ $t("processing_time_desc") }}
                    </p>
                  </div>
                </li>

                <li class="flex items-start">
                  <i
                    class="bi bi-cash-stack text-[#ff3344] mr-3 max-lg:mr-2 mt-1"
                  ></i>
                  <div>
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-sm">
                      {{ $t("minimum_withdrawal") }}
                    </h4>
                    <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                      {{ $t("minimum_withdrawal_desc") }}
                    </p>
                  </div>
                </li>

                <li class="flex items-start">
                  <i
                    class="bi bi-bank text-[#ff3344] mr-3 max-lg:mr-2 mt-1"
                  ></i>
                  <div>
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-sm">
                      {{ $t("bank_account") }}
                    </h4>
                    <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                      {{ $t("bank_account_desc") }}
                    </p>
                  </div>
                </li>

                <li class="flex items-start">
                  <i
                    class="bi bi-shield-check text-[#ff3344] mr-3 max-lg:mr-2 mt-1"
                  ></i>
                  <div>
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-sm">
                      {{ $t("verification") }}
                    </h4>
                    <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                      {{ $t("verification_desc") }}
                    </p>
                  </div>
                </li>
                <li class="flex items-start">
                  <i
                    class="bi bi-exclamation-triangle text-[#ff3344] mr-3 max-lg:mr-2 mt-1"
                  ></i>
                  <div>
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-sm">
                      {{ $t("betting_rules") }}
                    </h4>
                    <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                      {{ $t("betting_rules_desc") }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div class="pt-2">
              <div class="border-t border-[#3b1c23] pt-4 max-lg:pt-3">
                <h3
                  class="text-lg max-lg:text-base font-semibold text-[#f0eaea] mb-3 max-lg:mb-2"
                >
                  {{ $t("need_help") }}?
                </h3>
                <p class="text-[#b37a7a] max-lg:text-sm mb-3 max-lg:mb-2">
                  {{ $t("withdrawal_questions") }}
                </p>
                <button
                  type="button"
                  @click="navigateToHome"
                  class="flex items-center text-[#ff3344] lg:hover:text-[#c21b3a] transition max-lg:text-sm"
                >
                  <i class="bi bi-arrow-left mr-2"></i>
                  {{ $t("return_homepage") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TurnoverProgressBar
        :turnoverDetails="turnoverData"
        v-if="turnoverData"
        @close="turnoverData = null"
      />
    </div>
  </UserAccountLayout>
</template>

<script setup>
import { useRouter } from "vue-router";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";

const turnoverCheckLoading = ref(false);
const turnoverData = ref(null);
const { post, get } = useApiEndpoint();
const selectedBankId = ref("");
const router = useRouter();
const localePath = useLocalePath();
const userData = useState("userData");
const withdrawAmount = ref("");
const withdrawButtonLoading = ref(false);
const { alertVisible, alertTitle, alertMessage, alertType, showAlert } =
  useAlert();

function formatBankNumber(number) {
  if (!number) return "";
  const maskLength = Math.max(0, number.length - 4);
  return "*".repeat(maskLength) + number.slice(-4);
}

const resetForm = () => {
  withdrawAmount.value = "";
};

const navigateToHome = () => {
  router.push(localePath("/"));
};

const showActiveGamesModal = ref(false);
const activeGames = ref([]);

const closeModalOnOutsideClick = (event) => {
  if (event.target === event.currentTarget) {
    showActiveGamesModal.value = false;
  }
};

const submitWithdraw = async () => {
  if (!userData.value?.bankAccounts?.length) {
    showAlert($t("alert_info"), $t("add_bank_first"), "info");
    return;
  }

  if (!withdrawAmount.value || parseFloat(withdrawAmount.value) <= 0) {
    showAlert($t("alert_info"), $t("enter_valid_amount"), "info");
    return;
  }

  if (!selectedBankId.value) {
    showAlert($t("alert_info"), $t("select_bank_account"), "info");
    return;
  }

  withdrawButtonLoading.value = true;
  try {
    const activeGamesResponse = await post("games/active-games");

    if (!activeGamesResponse.data.success) {
      showAlert($t("alert_error"), $t("failed_to_check_active_games"), "error");
      return;
    }

    // If there are active games, show modal and STOP withdrawals
    if (activeGamesResponse.data.activeGames.length > 0) {
      activeGames.value = activeGamesResponse.data.activeGames;
      showActiveGamesModal.value = true;
      // showAlert(
      //   $t("warning"),
      //   $t("withdrawal_blocked_active_games"),
      //   "warning"
      // );
      return;
    }

    const amount = parseFloat(withdrawAmount.value);
    const response = await post("withdraw", {
      withdrawAmount: amount,
      userbankid: selectedBankId.value,
    });
    if (response.data.success) {
      showAlert(
        $t("alert_success"),
        response.data.message.en || $t("withdrawal_success"),
        "success"
      );
      fetchUserData();
      resetForm();
    } else {
      if (response.data.turnoverDetails) {
        turnoverData.value = response.data.turnoverDetails;
      } else {
        showAlert(
          $t("alert_info"),
          response.data.message[$locale.value] || response.data.message.en,
          "info"
        );
      }
    }
  } catch (error) {
    console.error("Error during withdraw:", error);
    showAlert(
      "Error",
      error.response?.data?.message?.en ||
        "Network error. Please try again later.",
      "error"
    );
  } finally {
    withdrawButtonLoading.value = false;
  }
};

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

const checkTurnoverRequirements = async () => {
  turnoverCheckLoading.value = true;
  try {
    const response = await get("user/turnover-check");
    if (response.data.success) {
      showAlert(
        $t("alert_info"),
        response.data.message[$locale.value] || response.data.message.en,
        "info"
      );
    } else {
      turnoverData.value = response.data.turnoverDetails || response.data;
    }
  } catch (error) {
    console.error("Error checking turnover requirements:", error);
    showAlert(
      $t("alert_error"),
      error.response?.data?.message?.en ||
        "Failed to check turnover requirements. Please try again later.",
      "error"
    );
  } finally {
    turnoverCheckLoading.value = false;
  }
};

onMounted(async () => {
  if (userData.value?.bankAccounts?.length > 0) {
    selectedBankId.value = userData.value.bankAccounts[0]._id;
  }
});
</script>

<style scoped></style>
