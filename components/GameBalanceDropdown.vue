<template>
  <div class="relative z-[999]">
    <div
      class="lg:hidden fixed flex items-center justify-center inset-0 bg-black/80 backdrop-blur-sm z-40"
      @click="emitClose"
    ></div>
    <div
      class="absolute right-0 top-full max-[325px]:w-[17.5rem] max-[315px]:w-[16.5rem] w-72 bg-[#1A0D13] border border-[#3b1c23] rounded-lg shadow-2xl shadow-[#ff3344]/20 z-50 py-2 max-lg:right-[-20%]"
    >
      <div class="px-4 py-2 border-b border-[#3b1c23]">
        <div class="flex justify-between items-center">
          <h4 class="font-medium text-[#f0eaea]">{{ $t("game_balances") }}</h4>
          <div class="flex items-center gap-1 text-xs">
            <button
              v-if="!isLoading"
              @click="refreshAllBalances"
              class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center gap-0.5 text-xs transition-colors"
              :disabled="isLoading"
            >
              <i class="bi bi-arrow-counterclockwise"></i>
              {{ $t("restore") }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="isLoading" class="px-4 py-8">
        <div class="flex flex-col items-center justify-center">
          <div class="relative w-12 h-12 mb-4">
            <div
              class="absolute inset-0 border-2 border-[#3b1c23] rounded-full"
            ></div>
            <div
              class="absolute inset-0 border-t-2 border-r-2 border-[#ff3344] rounded-full animate-spin-slow"
            ></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="w-6 h-6 bg-gradient-to-br from-[#a1122d] to-[#c21b3a] rounded-full pulse-effect"
              ></div>
            </div>
          </div>
          <p class="text-[#f0eaea] font-medium mb-1">
            {{ $t("loading_balances") }}
          </p>
          <p class="text-xs text-[#b37a7a]">
            {{ $t("wait_fetch_balances") }}
          </p>
        </div>
      </div>

      <div
        v-if="!isLoading"
        class="max-h-[300px] overflow-y-auto scrollbar-thin"
      >
        <div
          class="px-4 py-3 lg:hover:bg-[#241017]/60 transition-colors bg-[#241017]/40"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-[#ff3344]/20 rounded-full flex items-center justify-center"
              >
                <i class="bi bi-cash-stack text-[#ff3344]"></i>
              </div>
              <div>
                <p class="text-sm font-medium text-[#f0eaea]">
                  {{ $t("main_wallet") }}
                </p>
                <p class="text-xs text-[#b37a7a]">{{ $t("main_balance") }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium text-[#ff3344]">{{
                formatNumber(userData.wallet)
              }}</span>
              <i
                @click.stop="fetchUserData()"
                class="bi bi-arrow-clockwise text-[#ff3344] cursor-pointer lg:hover:text-[#c21b3a] transition-colors"
              ></i>
            </div>
          </div>
        </div>
        <div
          v-for="game in gameBalances"
          :key="game.game"
          class="px-4 py-2.5 lg:hover:bg-[#241017]/60 transition-colors"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <div
                class="w-8 h-8 bg-[#241017]/60 border border-[#3b1c23] rounded-full flex items-center justify-center"
              >
                <span class="font-medium text-xs text-[#f0eaea]">{{
                  game.game.substring(0, 2)
                }}</span>
              </div>
              <div>
                <p class="text-sm font-medium text-[#f0eaea]">
                  {{ game.game }}
                </p>
                <p class="text-xs text-[#b37a7a]">{{ $t("game_balance") }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="font-medium text-[#f0eaea]"
                :class="{ 'text-[#b37a7a]': game.isRefreshing }"
              >
                {{ formatNumber(game.balance) }}
              </span>
              <button
                @click="fetchAllGameBalances()"
                class="text-[#ff3344] lg:hover:text-[#c21b3a] transition-colors"
                :disabled="game.isRefreshing || isLoading"
              >
                <i
                  class="bi"
                  :class="
                    game.isRefreshing
                      ? 'bi-arrow-repeat animate-spin'
                      : 'bi-arrow-clockwise'
                  "
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!isLoading" class="px-4 py-2 border-t border-[#3b1c23] mt-1">
        <div class="flex justify-between items-center">
          <span class="text-xs font-medium text-[#b37a7a]">{{
            $t("total_balance")
          }}</span>
          <span class="font-medium text-[#ff3344]">{{
            formatNumber(totalBalance)
          }}</span>
        </div>
      </div>

      <div v-if="!isLoading" class="lg:hidden px-4 py-2">
        <button
          @click="emitClose"
          class="w-full py-2 bg-[#241017]/60 text-[#f0eaea] rounded-lg lg:hover:bg-[#3b1c23] transition border border-[#3b1c23]"
        >
          {{ $t("close") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"]);
const userData = useState("userData");
const { showAlert } = useAlert();
const { get, post } = useApiEndpoint();
const gameBalances = ref([]);
let gameTotalBalances = ref(0);
const isLoading = ref(false);
const dropdownTimer = ref(null);
const mouseOverDropdown = ref(false);
const totalBalance = computed(() => {
  let total = userData.value.wallet || 0;
  gameBalances.value.forEach((game) => {
    total += parseFloat(game.balance || 0);
  });
  return total;
});
function emitClose() {
  emit("close");
}

const fetchAllGameBalances = async () => {
  isLoading.value = true;
  try {
    const { data } = await post("game/checkallgamebalance");
    if (data.success) {
      gameBalances.value = data.games.map((item) => ({
        ...item,
        isRefreshing: false,
      }));
      gameTotalBalances = data.totalBalance;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  } catch (error) {
    console.error("Error fetching game balances:", error);
  } finally {
    isLoading.value = false;
  }
};

const refreshAllBalances = async () => {
  isLoading.value = true;
  try {
    const { data } = await post("game/transferout/all");
    if (data.success) {
      await fetchAllGameBalances();
      await fetchUserData();
    }
  } catch (error) {
    console.error("Error restoring balances:", error);
    showAlert($t("alert_error"), $t("failed_restore_balances"), "error");
  } finally {
    isLoading.value = false;
  }
};

const fetchUserData = async () => {
  isLoading.value = true;
  try {
    const { data } = await get("userdata");
    if (data.success) {
      userData.value = data.user;
    }
  } catch (error) {
    console.error("Error fetching helps:", error);
  } finally {
    isLoading.value = false;
  }
};

const formatNumber = (value) => {
  if (!value && value !== 0) return "0.00";
  return parseFloat(value).toFixed(2);
};

onMounted(async () => {
  try {
    await fetchAllGameBalances();
    await fetchUserData();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});
</script>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #241017;
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #ff3344;
  border-radius: 4px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #c21b3a;
}

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

@keyframes spin-slow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 1.5s linear infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
}

.pulse-effect {
  animation: pulse 1.5s ease-in-out infinite;
}
</style>
