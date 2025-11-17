<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <div class="mb-6 max-lg:mb-2">
        <h1 class="text-lg font-bold">{{ $t("transaction_history") }}</h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("view_track_transactions") }}
        </p>
      </div>

      <div>
        <!-- Transaction Type Selection -->
        <div class="mb-6 max-lg:mb-2">
          <label class="block text-sm font-medium text-[#f0eaea] mb-2">
            {{ $t("transaction_type") }}
          </label>
          <div class="flex gap-2 overflow-x-auto pb-2">
            <button
              v-for="type in transactionTypes"
              :key="type.key"
              @click="selectedType = type.key"
              :class="[
                'py-2 px-4 rounded-lg text-center text-sm font-medium whitespace-nowrap transition-colors',
                selectedType === type.key
                  ? 'bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white shadow-lg shadow-red-500/20 border-transparent'
                  : 'bg-[#15090e]/50 text-[#b37a7a] lg:hover:bg-[#15090e]/70 border border-[#3b1c23]',
              ]"
            >
              {{ type.en }}
            </button>
          </div>
        </div>

        <!-- Transaction Time Selection -->
        <div class="mb-6 max-lg:mb-2">
          <label class="block text-sm font-medium text-[#f0eaea] mb-2">
            {{ $t("transaction_time") }}
          </label>
          <div class="flex gap-2 overflow-x-auto pb-2">
            <button
              v-for="time in transactionTimes"
              :key="time.key"
              @click="selectedTime = time.key"
              :class="[
                'py-2 px-4 rounded-lg text-center text-sm font-medium whitespace-nowrap transition-colors',
                selectedTime === time.key
                  ? 'bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white shadow-lg shadow-red-500/20 border-transparent'
                  : 'bg-[#15090e]/50 text-[#b37a7a] lg:hover:bg-[#15090e]/70 border border-[#3b1c23]',
              ]"
            >
              {{ time.en }}
            </button>
          </div>
        </div>

        <!-- Note -->
        <p
          class="text-sm text-[#b37a7a] my-4 italic max-lg:text-xs max-lg:my-2"
        >
          {{ $t("transactions_local_time") }}
        </p>

        <!-- Transaction Table -->
        <div
          class="bg-[#15090e]/50 rounded-xl border border-[#3b1c23] overflow-hidden shadow-lg shadow-red-500/20 mb-6 max-lg:mb-2"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-center max-lg:text-nowrap">
              <thead>
                <tr class="bg-[#241017]/80 border-b border-[#3b1c23]">
                  <th
                    class="py-3 px-4 text-sm font-medium text-[#b37a7a] uppercase max-lg:text-xs"
                  >
                    {{ $t("date") }}
                  </th>
                  <th
                    class="py-3 px-4 text-sm font-medium text-[#b37a7a] uppercase max-lg:text-xs"
                  >
                    {{ $t("type") }}
                  </th>
                  <th
                    class="py-3 px-4 text-sm font-medium text-[#b37a7a] uppercase max-lg:text-xs"
                  >
                    {{ $t("amount") }}
                  </th>
                  <th
                    class="py-3 px-4 text-sm font-medium text-[#b37a7a] uppercase max-lg:text-xs"
                  >
                    {{ $t("status") }}
                  </th>
                  <th
                    class="py-3 px-4 text-sm font-medium text-[#b37a7a] uppercase max-lg:text-xs"
                  >
                    {{ $t("remark") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(transaction, index) in paginatedTransactions"
                  :key="transaction.id"
                  :class="[
                    'border-b border-[#3b1c23] lg:hover:bg-[#ff3344]/10 transition-colors',
                    index % 2 === 0 ? 'bg-[#15090e]/30' : 'bg-[#15090e]/50',
                  ]"
                >
                  <td class="py-3 px-4 text-sm text-[#f0eaea] max-lg:text-xs">
                    {{ formatDate(transaction.createdAt) }}
                  </td>
                  <td
                    class="py-3 px-4 text-sm font-medium uppercase max-lg:text-xs"
                  >
                    <span
                      class="px-2 py-1 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-500/20 text-green-400':
                          transaction.transactiontype === 'deposit',
                        'bg-red-500/20 text-red-400':
                          transaction.transactiontype === 'withdraw',
                        'bg-purple-500/20 text-purple-400':
                          transaction.transactiontype === 'bonus',
                        'bg-blue-500/20 text-blue-400':
                          transaction.transactiontype === 'commission',
                        'bg-orange-500/20 text-orange-400':
                          transaction.transactiontype === 'rescue',
                        'bg-[#b37a7a]/20 text-[#b37a7a]': ![
                          'deposit',
                          'withdraw',
                          'bonus',
                          'commission',
                          'rescue',
                        ].includes(transaction.transactiontype),
                      }"
                    >
                      {{
                        getLocalizedTransactionType(transaction.transactiontype)
                      }}
                    </span>
                  </td>
                  <td
                    class="py-3 px-4 text-sm max-lg:text-xs"
                    :class="{
                      'text-green-400 font-medium':
                        parseFloat(transaction.amount) > 0,
                      'text-red-400 font-medium':
                        parseFloat(transaction.amount) < 0,
                      'text-[#f0eaea]': parseFloat(transaction.amount) === 0,
                    }"
                  >
                    ${{ parseFloat(transaction.amount).toFixed(2) }}
                  </td>
                  <td class="py-3 px-4 text-sm uppercase max-lg:text-xs">
                    <span
                      class="px-2 py-1 rounded-full text-xs font-medium"
                      :class="{
                        'bg-green-500/20 text-green-400':
                          transaction.status === 'approved',
                        'bg-red-500/20 text-red-400':
                          transaction.status === 'rejected',
                        'bg-[#b37a7a]/20 text-[#b37a7a]':
                          transaction.status === 'cancel',
                        'bg-amber-500/20 text-amber-400':
                          transaction.status === 'pending',
                      }"
                    >
                      {{ getLocalizedStatus(transaction.status) }}
                    </span>
                  </td>
                  <td
                    class="py-3 px-4 text-sm text-[#f0eaea] uppercase max-lg:text-xs"
                  >
                    {{
                      $i18n.locale === "zh"
                        ? transaction?.promotionnameCN ||
                          transaction?.promotionnameEN ||
                          "-"
                        : transaction?.promotionnameEN || "-"
                    }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- No Data Available State -->
        <div v-if="filteredTransactions.length === 0" class="py-16">
          <div class="flex flex-col items-center">
            <div
              class="w-20 h-20 bg-[#ff3344]/20 rounded-full flex items-center justify-center mb-4"
            >
              <Icon icon="mdi:receipt" class="w-10 h-10 text-[#ff3344]" />
            </div>
            <h3 class="text-[#f0eaea] font-medium mb-1">
              {{ $t("no_transactions_found") }}
            </h3>
            <p class="text-[#b37a7a] text-sm mb-4">
              {{ $t("no_transactions_matching") }}
            </p>
            <button
              @click="resetFilters"
              class="px-4 py-2 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white rounded-lg lg:hover:brightness-110 transition-all"
            >
              {{ $t("reset_filters") }}
            </button>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredTransactions.length > 0"
          class="flex justify-between items-center gap-4 px-2 max-lg:flex-col max-lg:items-end"
        >
          <div class="text-[#b37a7a] text-sm max-lg:hidden">
            {{
              $t("showing_entries", {
                start: getStartEntry(),
                end: getEndEntry(),
                total: filteredTransactions.length,
              })
            }}
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="px-3 py-2 rounded-lg border border-[#3b1c23] bg-[#15090e]/50 text-[#b37a7a] shadow-sm transition-colors lg:hover:bg-[#15090e]/70 disabled:bg-[#15090e]/30 disabled:text-[#b37a7a]/50 disabled:cursor-not-allowed"
            >
              <Icon icon="ooui:previous-ltr" class="w-4 h-4" />
            </button>

            <span
              v-for="page in displayedPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'w-8 h-8 flex items-center justify-center rounded-lg font-medium cursor-pointer text-sm max-lg:text-xs',
                currentPage === page
                  ? 'bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white'
                  : 'bg-[#15090e]/50 text-[#b37a7a] border border-[#3b1c23] lg:hover:bg-[#15090e]/70',
              ]"
            >
              {{ page }}
            </span>

            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 rounded-lg border border-[#3b1c23] bg-[#15090e]/50 text-[#b37a7a] shadow-sm transition-colors lg:hover:bg-[#15090e]/70 disabled:bg-[#15090e]/30 disabled:text-[#b37a7a]/50 disabled:cursor-not-allowed"
            >
              <Icon icon="ooui:next-ltr" class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </UserAccountLayout>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";
import moment from "moment-timezone";

const { checkAuth } = useAuthCheck();
await checkAuth();
const pageLoading = useState("pageLoading");
const { get } = useApiEndpoint();
const userwalletlog = ref([]);

const formatDate = (date) => {
  if (!date) return "-";
  return moment(date).tz("Asia/Kuala_Lumpur").format("DD/MM/YYYY");
};

const transactionTypes = [
  { key: "All", en: $t("all"), zh: "全部" },
  { key: "Deposit", en: $t("deposit"), zh: "存款" },
  { key: "Withdraw", en: $t("withdraw"), zh: "提款" },
  { key: "Bonus", en: $t("bonus"), zh: "优惠" },
  { key: "Transfer", en: $t("transfer"), zh: "转账" },
  { key: "Rebate", en: $t("rebate"), zh: "返水" },
  { key: "Rescue", en: $t("rescue"), zh: "复活分" },
  { key: "Commission", en: $t("commission"), zh: "佣金" },
];

const transactionTimes = [
  { key: "All", en: $t("all"), zh: "全部" },
  { key: "Today", en: $t("today"), zh: "今天" },
  { key: "Yesterday", en: $t("yesterday"), zh: "昨天" },
  { key: "Last 7 Days", en: $t("last_7_days"), zh: "最近7天" },
  { key: "Last 30 Days", en: $t("last_30_days"), zh: "最近30天" },
  { key: "Last Month", en: $t("last_month"), zh: "上个月" },
];

const selectedType = ref("All");
const selectedTime = ref("All");

const typeMapping = {
  Deposit: "deposit",
  Withdraw: "withdraw",
  Bonus: "bonus",
  Rebate: "rebate",
  Commission: "commission",
  Rescue: "rescue",
};

const displayedPages = computed(() => {
  if (totalPages.value <= 5) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }

  if (currentPage.value <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage.value >= totalPages.value - 2) {
    return [
      totalPages.value - 4,
      totalPages.value - 3,
      totalPages.value - 2,
      totalPages.value - 1,
      totalPages.value,
    ];
  }

  return [
    currentPage.value - 2,
    currentPage.value - 1,
    currentPage.value,
    currentPage.value + 1,
    currentPage.value + 2,
  ];
});

const filteredTransactions = computed(() => {
  if (!userwalletlog.value) return [];

  const timeFiltered = userwalletlog.value.filter((transaction) => {
    if (selectedTime.value === "All") return true;
    return isTransactionInTimeRange(transaction.createdAt);
  });

  if (selectedType.value === "All") {
    return timeFiltered;
  }

  const backendType = typeMapping[selectedType.value];

  return timeFiltered.filter((transaction) => {
    return transaction.transactiontype === backendType;
  });
});

function isTransactionInTimeRange(transactionDate) {
  const today = moment().tz("Asia/Kuala_Lumpur");
  const date = moment(transactionDate).tz("Asia/Kuala_Lumpur");

  switch (selectedTime.value) {
    case "Today":
      return date.isSame(today, "day");
    case "Yesterday": {
      const yesterday = moment().tz("Asia/Kuala_Lumpur").subtract(1, "day");
      return date.isSame(yesterday, "day");
    }
    case "Last 7 Days": {
      const sevenDaysAgo = moment().tz("Asia/Kuala_Lumpur").subtract(7, "days");
      return (
        date.isSameOrAfter(sevenDaysAgo, "day") &&
        date.isSameOrBefore(today, "day")
      );
    }
    case "Last 30 Days": {
      const thirtyDaysAgo = moment()
        .tz("Asia/Kuala_Lumpur")
        .subtract(30, "days");
      return (
        date.isSameOrAfter(thirtyDaysAgo, "day") &&
        date.isSameOrBefore(today, "day")
      );
    }
    case "Last Month": {
      const lastMonth = moment().tz("Asia/Kuala_Lumpur").subtract(1, "month");
      return date.isSame(lastMonth, "month");
    }
    default:
      return true;
  }
}

const currentPage = ref(1);
const itemsPerPage = ref(10);

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTransactions.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredTransactions.value.length / itemsPerPage.value)
);

function resetFilters() {
  selectedType.value = "All";
  selectedTime.value = "All";
  currentPage.value = 1;
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function getStartEntry() {
  return (currentPage.value - 1) * itemsPerPage.value + 1;
}

function getEndEntry() {
  return Math.min(
    currentPage.value * itemsPerPage.value,
    filteredTransactions.value.length
  );
}

const fetchUserWalletLog = async () => {
  try {
    const { data } = await get("userwalletlog");
    if (data.success) {
      userwalletlog.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching wallet log:", error);
  }
};

const getLocalizedStatus = (status) => {
  if (status === "approved") {
    return $t("approved");
  } else if (status === "rejected" || status === "REJECTED") {
    return $t("rejected");
  } else if (status === "cancel") {
    return $t("cancelled");
  } else if (status === "pending") {
    return $t("pending");
  }
  return status.toUpperCase();
};

const getLocalizedTransactionType = (transactiontype) => {
  if (transactiontype === "deposit") {
    return $t("deposit").toUpperCase();
  } else if (transactiontype === "withdraw") {
    return $t("withdraw").toUpperCase();
  } else if (transactiontype === "bonus") {
    return $t("bonus").toUpperCase();
  } else if (transactiontype === "commission") {
    return $t("commission").toUpperCase();
  } else if (transactiontype === "rescue") {
    return $t("rescue").toUpperCase();
  }
  return transactiontype.toUpperCase();
};

watch([selectedType, selectedTime], () => {
  currentPage.value = 1;
});

onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchUserWalletLog();
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});
</script>
