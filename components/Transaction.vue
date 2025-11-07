<template>
  <section class="py-4 containerWid max-lg:py-2">
    <div class="my-4">
      <div class="my-4">
        <div class="flex items-center justify-between mb-1">
          <h2
            class="text-2xl font-bold text-[#f0eaea] max-xl:text-xl max-md:text-base"
          >
            {{ $t("live_transactions") }}
          </h2>
          <div
            class="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#ff3344] to-[#cc2a3a] text-white text-xs max-sm:text-[0.7rem] rounded-full font-bold shadow-lg shadow-[#ff3344]/30"
          >
            <span class="relative flex h-2 w-2 max-sm:w-1 max-sm:h-1">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 max-sm:w-1 max-sm:h-1 bg-white"
              ></span>
            </span>
            {{ $t("live") }}
          </div>
        </div>
        <div class="flex items-center gap-3">
          <p class="text-sm text-[#b37a7a] max-lg:text-xs">
            {{ $t("real_time_transaction_updates") }}
          </p>
          <div
            class="flex-1 h-px bg-gradient-to-r from-[#3b1c23] to-transparent"
          ></div>
        </div>
      </div>

      <!-- Transactions Container -->
      <div
        class="bg-[#241017] rounded-xl border border-[#3b1c23] overflow-hidden shadow-lg"
      >
        <div
          class="grid grid-cols-2 bg-gradient-to-r from-[#15090e] to-[#1a0a0f] border-b border-[#3b1c23]"
        >
          <div class="p-4 border-r border-[#3b1c23] max-lg:p-3">
            <div class="flex items-center gap-2">
              <i
                class="bi bi-arrow-down-circle text-[#4ade80] text-lg max-lg:text-base max-[500px]:text-sm"
              ></i>
              <span
                class="font-semibold text-[#f0eaea] max-lg:text-sm max-[500px]:text-xs"
                >{{ $t("deposit") }}</span
              >
            </div>
          </div>
          <div class="p-4 max-lg:p-3">
            <div class="flex items-center gap-2">
              <i
                class="bi bi-arrow-up-circle text-[#ff3344] text-lg max-lg:text-base max-[500px]:text-sm"
              ></i>
              <span
                class="font-semibold text-[#f0eaea] max-lg:text-sm max-[500px]:text-xs"
                >{{ $t("withdraw") }}</span
              >
            </div>
          </div>
        </div>

        <!-- Transaction Rows -->
        <div class="divide-y divide-[#3b1c23]">
          <div
            v-for="(transaction, index) in transactions"
            :key="index"
            class="grid grid-cols-2 lg:hover:bg-[#1A0D13] transition-colors"
          >
            <!-- Deposit Column -->
            <div class="p-4 border-r border-[#3b1c23] max-lg:p-3">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                  <div
                    class="w-8 h-8 bg-[#1A0D13] max-[500px]:hidden rounded-full flex items-center justify-center flex-shrink-0 border border-[#3b1c23]"
                  >
                    <i class="bi bi-person-fill text-[#4ade80] text-xs"></i>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div
                      class="font-medium text-[#f0eaea] truncate max-lg:text-sm max-[500px]:text-xs"
                    >
                      {{ maskUsername(transaction.depositUsername) }}
                    </div>
                    <div class="text-xs text-[#b37a7a] max-lg:text-[10px]">
                      {{ formatTime(transaction.depositTime) }}
                    </div>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <div
                    class="font-bold text-[#4ade80] max-lg:text-sm max-[500px]:text-xs"
                  >
                    +{{ transaction.depositAmount.toFixed(2) }}
                  </div>
                  <div class="text-[10px] text-[#b37a7a]">MYR</div>
                </div>
              </div>
            </div>

            <!-- Withdraw Column -->
            <div class="p-4 max-lg:p-3">
              <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2 min-w-0 flex-1">
                  <div
                    class="w-8 h-8 bg-[#1A0D13] max-[500px]:hidden rounded-full flex items-center justify-center flex-shrink-0 border border-[#3b1c23]"
                  >
                    <i class="bi bi-person-fill text-[#ff3344] text-xs"></i>
                  </div>
                  <div class="min-w-0 flex-1">
                    <div
                      class="font-medium text-[#f0eaea] truncate max-lg:text-sm max-[500px]:text-xs"
                    >
                      {{ maskUsername(transaction.withdrawUsername) }}
                    </div>
                    <div class="text-xs text-[#b37a7a] max-lg:text-[10px]">
                      {{ formatTime(transaction.withdrawTime) }}
                    </div>
                  </div>
                </div>
                <div class="text-right flex-shrink-0">
                  <div
                    class="font-bold text-[#ff3344] max-lg:text-sm max-[500px]:text-xs"
                  >
                    -{{ transaction.withdrawAmount.toFixed(2) }}
                  </div>
                  <div class="text-[10px] text-[#b37a7a]">MYR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { get } = useApiEndpoint();

const transactions = ref([]);
const MAX_TRANSACTIONS = 5;

function formatTime(timeStr) {
  if (!timeStr) return "-";
  const time = new Date(timeStr);
  const now = new Date();
  const diff = Math.floor((now - time) / 60000);
  if ($locale.value === "zh") {
    if (diff < 1) return "刚刚";
    if (diff < 60) return `${diff} 分钟前`;
    const hours = Math.floor(diff / 60);
    return `${hours} 小时前`;
  } else if ($locale.value === "ms") {
    if (diff < 1) return "Baru sekarang";
    if (diff < 60) return `${diff} minit yang lalu`;
    const hours = Math.floor(diff / 60);
    return `${hours} jam yang lalu`;
  } else {
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff} min ago`;
    const hours = Math.floor(diff / 60);
    return `${hours} hr ago`;
  }
}

function maskUsername(username) {
  if (!username) return "-";
  if (username.length <= 2) {
    return username.charAt(0) + "*";
  } else if (username.length === 3) {
    return username.substring(0, 2) + "*";
  } else if (username.length === 4) {
    return username.substring(0, 2) + "**";
  } else {
    const firstPart = username.substring(0, 2);
    const lastPart = username.substring(username.length - 2);
    return `${firstPart}***${lastPart}`;
  }
}

async function fetchTransactions() {
  try {
    const { data } = await get("transactions/list");
    if (data.success) {
      const deposits = data.data.deposits || [];
      const withdraws = data.data.withdraws || [];
      const combined = [];
      for (let i = 0; i < MAX_TRANSACTIONS; i++) {
        combined.push({
          depositUsername: deposits[i]?.username || "",
          depositAmount: deposits[i]?.amount || 0,
          depositTime: deposits[i]?.time || null,
          withdrawUsername: withdraws[i]?.username || "",
          withdrawAmount: withdraws[i]?.amount || 0,
          withdrawTime: withdraws[i]?.time || null,
        });
      }

      transactions.value = combined;
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
}

onMounted(async () => {
  await fetchTransactions();
  setInterval(async () => {
    await fetchTransactions();
  }, 30000);
});
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
