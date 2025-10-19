<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 max-lg:px-4"
    @click.self="emitClose"
  >
    <div
      class="bg-white text-gray-800 rounded-lg w-1/3 p-6 shadow-lg transform transition-transform scale-95 max-lg:w-full"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="flex justify-between items-center mb-4 border-b border-gray-200 pb-2"
      >
        <h2 class="text-xl font-semibold">
          {{ $t("transfer_funds") }}
        </h2>
        <button @click="emitClose" class="text-gray-500 lg:hover:text-gray-700">
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg mb-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div
              class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
            >
              <i class="bi bi-wallet2"></i>
            </div>
            <div>
              <p class="text-sm text-gray-500">{{ $t("game_balance") }}</p>
              <div class="flex items-center">
                <p class="font-medium text-gray-800" v-if="!isBalanceLoading">
                  {{ gameBalance || "0.00" }}
                </p>
                <div
                  v-else
                  class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin ml-1"
                ></div>
              </div>
            </div>
          </div>
          <button
            @click="refreshBalance"
            class="text-blue-500 lg:hover:text-blue-700 p-1"
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
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t("transfer_in") }}
          </label>
          <div class="relative flex">
            <input
              type="number"
              v-model="transferInAmount"
              placeholder="0.00"
              min="0"
              step="0.01"
              class="w-full p-3 rounded-l-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
            <button
              @click="transferIn"
              :disabled="
                isTransferInLoading ||
                !transferInAmount ||
                parseFloat(transferInAmount) <= 0
              "
              class="bg-blue-600 text-white px-4 py-2 rounded-r-lg lg:hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]"
            >
              <span v-if="!isTransferInLoading">{{ $t("transfer") }}</span>
              <div
                v-else
                class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            {{ $t("transfer_in_description") }}
          </p>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t("transfer_out") }}
          </label>
          <div class="relative flex">
            <input
              type="number"
              v-model="transferOutAmount"
              placeholder="0.00"
              min="0"
              step="0.01"
              class="w-full p-3 rounded-l-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
            />
            <button
              @click="transferOut"
              :disabled="
                isTransferOutLoading ||
                !transferOutAmount ||
                parseFloat(transferOutAmount) <= 0
              "
              class="bg-green-600 text-white px-4 py-2 rounded-r-lg lg:hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[80px]"
            >
              <span v-if="!isTransferOutLoading">{{ $t("transfer") }}</span>
              <div
                v-else
                class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              ></div>
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            {{ $t("transfer_out_description") }}
          </p>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button
          @click="emitClose"
          class="px-4 py-2 bg-gray-100 text-gray-800 rounded-md lg:hover:bg-gray-200 transition border border-gray-300"
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
