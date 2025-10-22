<template>
  <div
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 max-lg:px-4"
    @click.self="emitClose"
  >
    <div
      class="bg-[#1A0D13] border border-[#3b1c23] text-[#f0eaea] rounded-xl w-1/3 p-6 shadow-2xl shadow-[#ff3344]/20 transform transition-transform scale-95 max-lg:w-full"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex justify-between items-center mb-4 border-b border-[#3b1c23] pb-3"
      >
        <h2 class="text-xl font-semibold text-[#f0eaea]">
          {{ $t("transfer_funds") }}
        </h2>
        <button
          @click="emitClose"
          class="text-[#b37a7a] lg:hover:text-[#ff3344] transition-colors"
        >
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div>

      <div class="bg-[#241017]/60 border border-[#3b1c23] p-4 rounded-lg mb-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344]"
            >
              <i class="bi bi-wallet2"></i>
            </div>
            <div>
              <p class="text-sm text-[#b37a7a]">{{ $t("game_balance") }}</p>
              <div class="flex items-center">
                <p class="font-medium text-[#f0eaea]" v-if="!isBalanceLoading">
                  {{ gameBalance || "0.00" }}
                </p>
                <div
                  v-else
                  class="w-4 h-4 border-2 border-[#ff3344] border-t-transparent rounded-full animate-spin ml-1"
                ></div>
              </div>
            </div>
          </div>
          <button
            @click="refreshBalance"
            class="text-[#ff3344] lg:hover:text-[#c21b3a] p-1 transition-colors"
            :disabled="isBalanceLoading"
          >
            <i
              class="bi"
              :class="[
                isBalanceLoading
                  ? 'bi-arrow-repeat animate-spin'
                  : 'bi-arrow-clockwise',
              ]"
            ></i>
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-[#f0eaea] mb-2">
            {{ $t("transfer_in") }}
          </label>
          <div class="relative flex">
            <input
              type="number"
              v-model="transferInAmount"
              placeholder="0.00"
              min="0"
              step="0.01"
              class="w-full p-3 rounded-l-lg border border-[#3b1c23] bg-[#241017]/60 text-[#f0eaea] placeholder-[#b37a7a] focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/50 outline-none transition"
            />
            <button
              @click="transferIn"
              :disabled="
                isTransferInLoading ||
                !transferInAmount ||
                parseFloat(transferInAmount) <= 0
              "
              class="bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white px-4 py-2 rounded-r-lg lg:hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px] shadow-lg shadow-[#ff3344]/30"
            >
              <span v-if="!isTransferInLoading">{{ $t("transfer") }}</span>
              <div
                v-else
                class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
            </button>
          </div>
          <p class="text-xs text-[#b37a7a] mt-1">
            {{ $t("transfer_in_description") }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-[#f0eaea] mb-2">
            {{ $t("transfer_out") }}
          </label>
          <div class="relative flex">
            <input
              type="number"
              v-model="transferOutAmount"
              placeholder="0.00"
              min="0"
              step="0.01"
              class="w-full p-3 rounded-l-lg border border-[#3b1c23] bg-[#241017]/60 text-[#f0eaea] placeholder-[#b37a7a] focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/50 outline-none transition"
            />
            <button
              @click="transferOut"
              :disabled="
                isTransferOutLoading ||
                !transferOutAmount ||
                parseFloat(transferOutAmount) <= 0
              "
              class="bg-gradient-to-r from-green-600 to-green-500 text-white px-4 py-2 rounded-r-lg lg:hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px] shadow-lg"
            >
              <span v-if="!isTransferOutLoading">{{ $t("transfer") }}</span>
              <div
                v-else
                class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
            </button>
          </div>
          <p class="text-xs text-[#b37a7a] mt-1">
            {{ $t("transfer_out_description") }}
          </p>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button
          @click="emitClose"
          class="px-4 py-2 bg-[#241017]/60 text-[#f0eaea] rounded-lg lg:hover:bg-[#3b1c23] transition border border-[#3b1c23]"
        >
          {{ $t("close") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  gameInfo: {
    type: Object,
    required: true,
  },
  currentBalance: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["close", "balanceUpdated"]);
const gameBalance = ref(props.currentBalance);
const transferInAmount = ref("");
const transferOutAmount = ref("");
const isBalanceLoading = ref(false);
const isTransferInLoading = ref(false);
const isTransferOutLoading = ref(false);
const gameName = computed(() => props.gameInfo?.name || "Game");
const { post } = useApiEndpoint();
const { showAlert } = useAlert();

function emitClose() {
  emit("close");
}

async function refreshBalance() {
  if (!props.gameInfo || !props.gameInfo.balanceAPI) {
    showAlert($t("alert_error"), $t("balance_api_unavailable"), "error");
    return;
  }
  isBalanceLoading.value = true;
  try {
    const { data } = await post(props.gameInfo.balanceAPI);
    if (data.success) {
      gameBalance.value = data.balance || "0.00";
    } else {
      throw new Error(data.message || "Failed to fetch balance");
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
  } finally {
    isBalanceLoading.value = false;
  }
}

async function transferIn() {
  if (!props.gameInfo || !props.gameInfo.transferInAPI) {
    showAlert($t("alert_info"), $t("transfer_in_api_unavailable"), "error");
    return;
  }
  if (!transferInAmount.value || parseFloat(transferInAmount.value) <= 0) {
    showAlert($t("alert_info"), $t("valid_amount"), "error");
    return;
  }
  isTransferInLoading.value = true;
  try {
    const { data } = await post(props.gameInfo.transferInAPI, {
      transferAmount: parseFloat(transferInAmount.value),
    });
    if (data.success) {
      showAlert($t("alert_success"), $t("transfer_in_successful"), "success");
      transferInAmount.value = "";
      await refreshBalance();
      emit("balanceUpdated");
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Error transferring in:", error);
    showAlert(
      $t("alert_error"),
      error.message || $t("failed_transfer_in"),
      "error"
    );
  } finally {
    isTransferInLoading.value = false;
  }
}

async function transferOut() {
  if (!props.gameInfo || !props.gameInfo.transferOutAPI) {
    showAlert($t("alert_info"), $t("transfer_out_api_unavailable"), "error");
    return;
  }
  if (!transferOutAmount.value || parseFloat(transferOutAmount.value) <= 0) {
    showAlert($t("alert_success"), $t("valid_amount"), "error");
    return;
  }
  isTransferOutLoading.value = true;
  try {
    const { data } = await post(props.gameInfo.transferOutAPI, {
      transferAmount: parseFloat(transferOutAmount.value),
    });
    if (data.success) {
      showAlert($t("alert_success"), $t("transfer_out_successful"), "success");
      transferOutAmount.value = "";
      await refreshBalance();
      emit("balanceUpdated");
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Error transferring out:", error);
    showAlert(
      $t("alert_error"),
      error.message || $t("failed_transfer_out"),
      "error"
    );
  } finally {
    isTransferOutLoading.value = false;
  }
}

onMounted(() => {
  refreshBalance();
});
</script>

<style scoped>
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
