<template>
  <section class="py-4">
    <div class="mx-auto containerWid">
      <div class="rounded-lg overflow-hidden shadow-md border border-[#3b1c23]">
        <div
          class="bg-gradient-to-r from-[#a1122d] to-[#c21b3a] p-3 flex justify-between items-center"
        >
          <h3 class="text-[#f0eaea] font-bold flex items-center">
            <i class="bi bi-graph-up-arrow mr-2"></i>
            {{ $t("live_transactions") }}
          </h3>
          <div
            class="flex items-center gap-1 px-2 py-0.5 bg-[#ff3344] text-white uppercase text-xs rounded-full font-medium animate-pulse"
          >
            {{ $t("live") }}
            <span class="h-2 w-2 bg-white rounded-full opacity-75"></span>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="text-sm">
                <th
                  class="p-2 text-left border-r border-b border-[#3b1c23] bg-[#241017] text-[#f0eaea] font-medium w-1/2"
                  colspan="2"
                >
                  {{ $t("deposit") }}
                </th>
                <th
                  class="p-2 text-left border-b border-[#3b1c23] bg-[#15090e] text-[#f0eaea] font-medium w-1/2"
                  colspan="2"
                >
                  {{ $t("withdraw") }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(transaction, index) in transactions"
                :key="index"
                class="text-sm lg:hover:bg-[#2a0f14] transition-colors"
                :class="index % 2 === 0 ? 'bg-[#1a0c0f]' : 'bg-[#1f0e13]'"
              >
                <td
                  class="p-2 border-r border-b border-[#3b1c23] max-lg:w-[30%]"
                >
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 bg-[#241017] rounded-full flex items-center justify-center text-[#ff3344] mr-2 max-lg:hidden border border-[#3b1c23]"
                    >
                      <i class="bi bi-person-fill"></i>
                    </div>
                    <div>
                      <div class="font-medium text-[#f0eaea]">
                        {{ maskUsername(transaction.depositUsername) }}
                      </div>
                      <div class="text-xs text-[#b37a7a]">
                        {{ formatTime(transaction.depositTime) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  class="p-2 border-r border-b border-[#3b1c23] text-right max-lg:w-[20%]"
                >
                  <span class="font-bold text-[#4ade80] max-lg:text-xs"
                    >+ MYR {{ transaction.depositAmount.toFixed(2) }}</span
                  >
                </td>
                <td
                  class="p-2 border-r border-b border-[#3b1c23] max-lg:w-[30%]"
                >
                  <div class="flex items-center">
                    <div
                      class="w-8 h-8 bg-[#15090e] rounded-full flex items-center justify-center text-[#ff3344] mr-2 max-lg:hidden border border-[#3b1c23]"
                    >
                      <i class="bi bi-person-fill"></i>
                    </div>
                    <div>
                      <div class="font-medium text-[#f0eaea]">
                        {{ maskUsername(transaction.withdrawUsername) }}
                      </div>
                      <div class="text-xs text-[#b37a7a]">
                        {{ formatTime(transaction.withdrawTime) }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  class="p-2 border-b border-[#3b1c23] text-right max-lg:w-[20%]"
                >
                  <span class="font-bold text-[#ff3344] max-lg:text-xs"
                    >- MYR {{ transaction.withdrawAmount.toFixed(2) }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
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
