<template>
  <UserAccountLayout>
    <!-- Active Games Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showActiveGamesModal"
          class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
          @click.self="showActiveGamesModal = false"
        >
          <div
            class="bg-[#1A0D13] border border-[#3b1c23] rounded-lg w-full max-w-md overflow-hidden"
            :class="showActiveGamesModal ? 'animate-popupIn' : ''"
          >
            <!-- Header -->
            <div
              class="p-4 border-b border-[#3b1c23] flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center"
                >
                  <Icon icon="mdi:alert-circle" class="w-6 h-6 text-red-400" />
                </div>
                <h3 class="font-semibold text-[#f0eaea] text-base">
                  {{ $t("withdrawal_blocked") }}
                </h3>
              </div>
              <button
                @click="showActiveGamesModal = false"
                class="w-8 h-8 rounded-lg bg-[#241017] border border-[#3b1c23] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all"
              >
                <Icon icon="mdi:close" class="w-5 h-5" />
              </button>
            </div>

            <!-- Content -->
            <div class="p-4">
              <p class="text-sm text-[#b37a7a] mb-4">
                {{ $t("complete_games_before_withdrawal_mandatory") }}
              </p>

              <!-- Active Games List -->
              <div class="space-y-2 max-h-60 overflow-y-auto scrollbar-thin">
                <div
                  v-for="game in activeGames"
                  :key="game.betId"
                  class="p-3 rounded-lg bg-[#241017] border border-[#3b1c23] flex items-center gap-3"
                >
                  <div
                    class="w-2 h-2 bg-[#ff3344] rounded-full animate-pulse"
                  ></div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-[#f0eaea] text-sm truncate">
                      {{ game.gameName }}
                    </p>
                  </div>
                  <div
                    class="w-8 h-8 rounded-lg bg-[#ff3344]/10 flex items-center justify-center"
                  >
                    <Icon
                      icon="mdi:gamepad-variant"
                      class="w-4 h-4 text-[#ff3344]"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer -->
            <div class="p-4 border-t border-[#3b1c23]">
              <button
                @click="showActiveGamesModal = false"
                class="w-full py-2.5 bg-[#ff3344] text-white rounded-lg font-medium lg:hover:bg-[#cc2a3a] transition-all text-sm"
              >
                {{ $t("understood") }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Turnover Progress Bar -->
    <Teleport to="body">
      <TurnoverProgressBar
        :turnoverDetails="turnoverData"
        v-if="turnoverData"
        @close="turnoverData = null"
      />
    </Teleport>

    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <div class="flex justify-between items-start gap-3">
          <div class="flex-1">
            <h1 class="text-xl font-bold mb-1 max-lg:text-lg">
              {{ $t("withdraw") }}
            </h1>
            <p class="text-[#b37a7a] text-sm max-lg:text-xs">
              {{ $t("request_withdrawal") }}
            </p>
          </div>
          <button
            type="button"
            @click="checkTurnoverRequirements"
            :disabled="turnoverCheckLoading"
            class="flex items-center gap-2 bg-[#241017] border border-[#3b1c23] text-[#f0eaea] font-medium py-2.5 px-4 rounded-lg lg:hover:border-[#ff3344]/50 transition-all text-sm disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap max-lg:py-2 max-lg:px-3 max-lg:text-xs"
          >
            <Icon
              :icon="
                turnoverCheckLoading ? 'mdi:loading' : 'mdi:clipboard-check'
              "
              class="w-4 h-4"
              :class="{ 'animate-spin': turnoverCheckLoading }"
            />
            <span class="max-lg:hidden">{{
              $t("check_turnover_requirements")
            }}</span>
            <span class="lg:hidden">{{ $t("check") }}</span>
          </button>
        </div>
      </div>

      <!-- Withdraw Form -->
      <div class="space-y-4">
        <!-- Available Balance Card -->
        <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg bg-[#ff3344]/10 flex items-center justify-center"
              >
                <Icon icon="mdi:wallet" class="w-5 h-5 text-[#ff3344]" />
              </div>
              <div>
                <p class="text-xs text-[#b37a7a] mb-0.5">
                  {{ $t("available_balance") }}
                </p>
                <p class="text-xl font-bold text-[#ff3344]">
                  MYR {{ userData?.wallet?.toFixed(2) || "0.00" }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Withdrawal Amount -->
        <div>
          <label class="block font-semibold mb-2 text-base">
            {{ $t("withdrawal_amount") }}
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
            >
              <span class="text-[#b37a7a] text-sm font-medium">MYR</span>
            </div>
            <input
              v-model="withdrawAmount"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              class="w-full pl-16 pr-4 py-3 bg-[#241017] text-[#f0eaea] rounded-lg placeholder-[#b37a7a] border border-[#3b1c23] focus:border-[#ff3344] focus:outline-none transition-colors text-base max-lg:pl-14 max-lg:py-2.5 max-lg:text-sm"
            />
          </div>
        </div>

        <!-- Bank Account Selection -->
        <div v-if="userData?.bankAccounts?.length">
          <label class="block font-semibold mb-2 text-base">
            {{ $t("withdraw_to") }}
          </label>
          <div class="space-y-2">
            <button
              v-for="bank in userData.bankAccounts"
              :key="bank._id"
              type="button"
              @click="selectedBankId = bank._id"
              :class="[
                'w-full p-3 rounded-lg flex items-center gap-3 transition-all border text-left',
                selectedBankId === bank._id
                  ? 'bg-[#ff3344]/10 border-[#ff3344]'
                  : 'bg-[#241017] border-[#3b1c23] lg:hover:border-[#ff3344]/50',
              ]"
            >
              <div
                class="w-10 h-10 rounded-lg bg-[#15090e] border border-[#3b1c23] flex items-center justify-center"
              >
                <Icon icon="mdi:bank" class="w-5 h-5 text-[#ff3344]" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-[#f0eaea] text-sm mb-0.5">
                  {{ bank.bankname }}
                </p>
                <p class="text-xs text-[#b37a7a] font-mono">
                  {{ formatBankNumber(bank.banknumber) }}
                </p>
              </div>
              <div
                class="w-5 h-5 rounded-full border-2 flex items-center justify-center"
                :class="
                  selectedBankId === bank._id
                    ? 'border-[#ff3344]'
                    : 'border-[#3b1c23]'
                "
              >
                <div
                  v-if="selectedBankId === bank._id"
                  class="w-3 h-3 rounded-full bg-[#ff3344]"
                ></div>
              </div>
            </button>
          </div>
        </div>

        <!-- No Bank Account Warning -->
        <div
          v-else
          class="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4"
        >
          <div class="flex gap-3">
            <Icon
              icon="mdi:alert"
              class="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5"
            />
            <div class="flex-1">
              <h4 class="font-semibold text-amber-400 mb-1 text-sm">
                {{ $t("no_bank_account_found") }}
              </h4>
              <p class="text-[#f0eaea] text-sm mb-3">
                {{ $t("add_bank_account_message") }}
              </p>
              <NuxtLinkLocale
                to="/myaccount/bankaccount"
                class="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg lg:hover:bg-amber-500/30 transition-all text-sm font-medium"
              >
                <Icon icon="mdi:plus" class="w-4 h-4" />
                {{ $t("add_bank_account") }}
              </NuxtLinkLocale>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <LoadingButton
          :loading="withdrawButtonLoading"
          @click="submitWithdraw"
          :disabled="!userData?.bankAccounts?.length"
          class="w-full py-3 bg-[#ff3344] text-white rounded-lg font-semibold lg:hover:bg-[#cc2a3a] transition-all text-base disabled:opacity-50 disabled:cursor-not-allowed max-lg:py-2.5 max-lg:text-sm"
        >
          {{ $t("request_withdrawal_button") }}
        </LoadingButton>

        <!-- Withdrawal Information -->
        <div class="border border-[#3b1c23] rounded-lg p-4">
          <h3
            class="font-semibold text-[#f0eaea] mb-3 text-base flex items-center gap-2"
          >
            <Icon icon="mdi:information" class="w-5 h-5 text-[#ff3344]" />
            {{ $t("withdrawal_information") }}
          </h3>
          <ul class="space-y-3">
            <li class="flex gap-3">
              <Icon
                icon="mdi:clock-outline"
                class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("processing_time") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("processing_time_desc") }}
                </p>
              </div>
            </li>
            <li class="flex gap-3">
              <Icon
                icon="mdi:cash"
                class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("minimum_withdrawal") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("minimum_withdrawal_desc") }}
                </p>
              </div>
            </li>
            <li class="flex gap-3">
              <Icon
                icon="mdi:bank"
                class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("bank_account") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("bank_account_desc") }}
                </p>
              </div>
            </li>
            <li class="flex gap-3">
              <Icon
                icon="mdi:shield-check"
                class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("verification") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("verification_desc") }}
                </p>
              </div>
            </li>
            <li class="flex gap-3">
              <Icon
                icon="mdi:alert-circle"
                class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
              />
              <div>
                <h4 class="font-medium text-[#f0eaea] text-sm mb-0.5">
                  {{ $t("betting_rules") }}
                </h4>
                <p class="text-xs text-[#b37a7a]">
                  {{ $t("betting_rules_desc") }}
                </p>
              </div>
            </li>
          </ul>
        </div>

        <!-- Need Help -->
        <div class="border-t border-[#3b1c23] pt-4">
          <h3 class="font-semibold text-[#f0eaea] mb-2 text-sm">
            {{ $t("need_help") }}?
          </h3>
          <p class="text-[#b37a7a] text-sm mb-3">
            {{ $t("withdrawal_questions") }}
          </p>
          <button
            type="button"
            @click="navigateToHome"
            class="flex items-center gap-2 text-[#ff3344] lg:hover:text-[#cc2a3a] transition-all text-sm font-medium"
          >
            <Icon icon="mdi:arrow-left" class="w-4 h-4" />
            {{ $t("return_homepage") }}
          </button>
        </div>
      </div>
    </div>
  </UserAccountLayout>
</template>

<script setup>
import { useRouter } from "vue-router";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";
import { Icon } from "@iconify/vue";

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

    if (activeGamesResponse.data.activeGames.length > 0) {
      activeGames.value = activeGamesResponse.data.activeGames;
      showActiveGamesModal.value = true;
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
        response.data.message[$locale.value] || $t("withdrawal_success"),
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
    console.error("Error fetching user data:", error);
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

<style scoped>
/* Fade transition for modal overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Popup animation for modal */
@keyframes popupIn {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-popupIn {
  animation: popupIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Custom scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #15090e;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #3b1c23;
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #ff3344;
}
</style>
