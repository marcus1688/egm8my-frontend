<template>
  <UserAccountLayout>
    <div class="bg-white text-gray-800 rounded-lg">
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-lg font-bold max-lg:text-base">
          {{ $t("position_taking") }}
        </h1>
        <p class="text-gray-500 text-sm max-lg:text-xs">
          {{ $t("track_earnings") }}
        </p>
      </div>

      <div>
        <div
          class="mb-6 max-lg:mb-4 p-4 max-lg:p-3 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <div class="flex items-start gap-3 max-lg:gap-2">
            <div
              class="w-10 h-10 max-lg:w-8 max-lg:h-8 bg-blue-100 rounded-full flex-shrink-0 flex items-center justify-center"
            >
              <Icon
                icon="mdi:chart-timeline-variant"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-blue-600"
              />
            </div>

            <div>
              <h3 class="font-medium text-blue-700 mb-1 max-lg:text-sm">
                {{ $t("your_position_taking") }}
              </h3>
              <p class="text-blue-600 text-sm max-lg:text-xs">
                {{ $t("current_position_rate_1") }}
                <span class="font-bold"
                  >{{ userData?.positionTaking || "0" }}%</span
                >
                {{ $t("current_position_rate_2") }}
              </p>
              <p class="text-blue-600 text-sm max-lg:text-xs mt-1">
                {{ $t("earnings_calculated") }}
              </p>
            </div>
          </div>
        </div>

        <div class="mb-6 max-lg:mb-4">
          <div class="flex gap-3 max-lg:gap-2 overflow-x-auto pb-2 max-lg:pb-2">
            <button
              @click="selectedTime = 'All'"
              :class="[
                'py-2 max-lg:py-1.5 px-4 max-lg:px-3 rounded-md text-center transition-colors',
                selectedTime === 'All'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 lg:hover:bg-gray-200',
              ]"
            >
              <p class="whitespace-nowrap font-medium text-sm max-lg:text-xs">
                {{ $t("all") }}
              </p>
            </button>

            <button
              @click="selectedTime = 'Today'"
              :class="[
                'py-2 max-lg:py-1.5 px-4 max-lg:px-3 rounded-md text-center transition-colors',
                selectedTime === 'Today'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 lg:hover:bg-gray-200',
              ]"
            >
              <p class="whitespace-nowrap font-medium text-sm max-lg:text-xs">
                {{ $t("today") }}
              </p>
            </button>

            <button
              @click="selectedTime = 'Yesterday'"
              :class="[
                'py-2 max-lg:py-1.5 px-4 max-lg:px-3 rounded-md text-center transition-colors',
                selectedTime === 'Yesterday'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 lg:hover:bg-gray-200',
              ]"
            >
              <p class="whitespace-nowrap font-medium text-sm max-lg:text-xs">
                {{ $t("yesterday") }}
              </p>
            </button>

            <button
              @click="selectedTime = 'Last 7 Days'"
              :class="[
                'py-2 max-lg:py-1.5 px-4 max-lg:px-3 rounded-md text-center transition-colors',
                selectedTime === 'Last 7 Days'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 lg:hover:bg-gray-200',
              ]"
            >
              <p class="whitespace-nowrap font-medium text-sm max-lg:text-xs">
                {{ $t("last_7_days") }}
              </p>
            </button>

            <button
              @click="selectedTime = 'Last 30 Days'"
              :class="[
                'py-2 max-lg:py-1.5 px-4 max-lg:px-3 rounded-md text-center transition-colors',
                selectedTime === 'Last 30 Days'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 lg:hover:bg-gray-200',
              ]"
            >
              <p class="whitespace-nowrap font-medium text-sm max-lg:text-xs">
                {{ $t("last_30_days") }}
              </p>
            </button>

            <button
              @click="selectedTime = 'Last Month'"
              :class="[
                'py-2 max-lg:py-1.5 px-4 max-lg:px-3 rounded-md text-center transition-colors',
                selectedTime === 'Last Month'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 lg:hover:bg-gray-200',
              ]"
            >
              <p class="whitespace-nowrap font-medium text-sm max-lg:text-xs">
                {{ $t("last_month") }}
              </p>
            </button>
          </div>
        </div>

        <div
          class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm mb-6 max-lg:mb-4"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-center">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200 text-nowrap">
                  <th
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-xs max-lg:text-[10px] font-medium text-gray-600 uppercase"
                  >
                    {{ $t("date") }}
                  </th>
                  <th
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-xs max-lg:text-[10px] font-medium text-gray-600 uppercase"
                  >
                    {{ $t("total_deposit") }}
                  </th>
                  <th
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-xs max-lg:text-[10px] font-medium text-gray-600 uppercase"
                  >
                    {{ $t("total_withdraw") }}
                  </th>
                  <th
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-xs max-lg:text-[10px] font-medium text-gray-600 uppercase"
                  >
                    {{ $t("total_bonus") }}
                  </th>
                  <th
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-xs max-lg:text-[10px] font-medium text-gray-600 uppercase"
                  >
                    {{ $t("net_winloss") }}
                  </th>
                  <th
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-xs max-lg:text-[10px] font-medium text-gray-600 uppercase"
                  >
                    {{ $t("position_taking_rate") }}
                  </th>
                  <th
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-xs max-lg:text-[10px] font-medium text-gray-600 uppercase"
                  >
                    {{ $t("commission") }}
                  </th>
                  <th
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-xs max-lg:text-[10px] font-medium text-gray-600 uppercase"
                  >
                    {{ $t("status") }}
                  </th>
                  <th
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-xs max-lg:text-[10px] font-medium text-gray-600 uppercase"
                  >
                    {{ $t("formula") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(report, index) in paginatedReports"
                  :key="index"
                  :class="[
                    'border-b border-gray-200 lg:hover:bg-blue-50 transition-colors',
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                  ]"
                >
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs text-gray-700"
                  >
                    {{ formatDate(report.createdAt) }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs text-gray-700"
                  >
                    ${{ formatAmount(report.totalDeposit) }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs text-gray-700"
                  >
                    ${{ formatAmount(report.totalWithdraw) }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs text-gray-700"
                  >
                    ${{ formatAmount(report.totalBonus) }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs font-medium"
                    :class="
                      parseFloat(report.netWinlose) >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    "
                  >
                    ${{ formatAmount(report.netWinlose) }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs font-medium text-gray-700"
                  >
                    {{ report.positionTaking }}%
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs font-bold"
                    :class="
                      parseFloat(calculateCommission(report)) >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    "
                  >
                    ${{ formatAmount(calculateCommission(report)) }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs"
                  >
                    <span
                      class="px-2 max-lg:px-1.5 py-1 max-lg:py-0.5 rounded-full text-xs max-lg:text-[10px] font-medium"
                      :class="
                        report.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      "
                    >
                      {{
                        report.status === "paid" ? $t("paid") : $t("pending")
                      }}
                    </span>
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs"
                  >
                    <button
                      @click="() => openFormulaModal(report)"
                      class="px-3 max-lg:px-2 py-1.5 max-lg:py-1 text-xs max-lg:text-[10px] bg-blue-600 text-white lg:hover:bg-blue-700 rounded-md transition-colors"
                    >
                      {{ $t("view") }}
                    </button>
                  </td>
                </tr>
                <tr
                  v-if="filteredReports.length > 0"
                  class="bg-gray-100 border-t-2 border-gray-300 font-medium"
                >
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs text-gray-800"
                  >
                    {{ $t("total") }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs text-gray-800"
                  >
                    ${{ calculateTotal("totalDeposit") }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs text-gray-800"
                  >
                    ${{ calculateTotal("totalWithdraw") }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs text-gray-800"
                  >
                    ${{ calculateTotal("totalBonus") }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs font-medium"
                    :class="
                      parseFloat(calculateNetWinloseTotal()) >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    "
                  >
                    ${{ calculateNetWinloseTotal() }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs text-gray-800"
                  >
                    -
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs font-bold"
                    :class="
                      parseFloat(calculateCommissionTotal()) >= 0
                        ? 'text-green-600'
                        : 'text-red-600'
                    "
                  >
                    ${{ calculateCommissionTotal() }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs text-gray-800"
                  >
                    -
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2 text-sm max-lg:text-xs text-gray-800"
                  >
                    -
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-if="filteredReports.length === 0" class="py-16 max-lg:py-12">
            <div class="flex flex-col items-center">
              <div
                class="w-20 h-20 max-lg:w-16 max-lg:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 max-lg:mb-3"
              >
                <Icon
                  icon="mdi:chart-timeline-variant"
                  class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-gray-400"
                />
              </div>
              <h3 class="text-gray-500 font-medium mb-1 max-lg:text-sm">
                {{ $t("no_position_taking_data") }}
              </h3>
              <p
                class="text-gray-400 text-sm max-lg:text-xs mb-6 max-lg:mb-4 max-lg:text-center max-lg:px-4"
              >
                {{ $t("no_earnings_yet") }}
              </p>
              <button
                @click="$router.push('/myaccount/referral')"
                class="px-6 max-lg:px-4 py-2 max-lg:py-1.5 bg-blue-600 text-white rounded-lg lg:hover:bg-blue-700 transition-colors flex items-center gap-2 max-lg:text-sm"
              >
                <Icon
                  icon="mdi:share-variant"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
                {{ $t("share_referral_code") }}
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="filteredReports.length > 0"
          class="flex justify-between items-center gap-4 px-2 max-lg:flex-col max-lg:items-end"
        >
          <div class="text-gray-500 text-sm max-lg:text-xs max-lg:hidden">
            {{
              $t("showing_entries", {
                start: (currentPage - 1) * itemsPerPage + 1,
                end: Math.min(
                  currentPage * itemsPerPage,
                  filteredReports.length
                ),
                total: filteredReports.length,
              })
            }}
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 max-lg:px-2 py-2 max-lg:py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition-colors lg:hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <Icon
                icon="ooui:previous-ltr"
                class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
              />
            </button>

            <span
              v-for="page in displayedPages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'w-8 h-8 max-lg:w-7 max-lg:h-7 flex items-center justify-center rounded-md font-medium cursor-pointer text-sm max-lg:text-xs',
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 border border-gray-300 lg:hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </span>

            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-3 max-lg:px-2 py-2 max-lg:py-1.5 rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm transition-colors lg:hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <Icon
                icon="ooui:next-ltr"
                class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showFormulaModal"
      class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
      @click="showFormulaModal = false"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 p-6 max-lg:p-4"
        @click.stop
      >
        <div class="flex justify-between items-center mb-4 max-lg:mb-3">
          <h3 class="text-lg max-lg:text-base font-bold text-gray-800">
            {{ $t("position_taking_formula") }}
          </h3>
          <button
            @click="showFormulaModal = false"
            class="text-gray-500 lg:hover:text-gray-700"
          >
            <Icon icon="mdi:close" class="w-5 h-5 max-lg:w-4 max-lg:h-4" />
          </button>
        </div>
        <div
          class="bg-gray-50 p-4 max-lg:p-3 rounded-md border border-gray-200 max-h-96 overflow-y-auto"
        >
          <pre
            class="text-gray-700 whitespace-pre-wrap text-sm max-lg:text-xs font-mono"
            >{{ selectedFormula }}</pre
          >
        </div>
        <div class="mt-6 max-lg:mt-4 flex justify-end">
          <button
            @click="showFormulaModal = false"
            class="px-4 max-lg:px-3 py-2 max-lg:py-1.5 bg-blue-600 text-white rounded-md lg:hover:bg-blue-700 transition-colors max-lg:text-sm"
          >
            {{ $t("close") }}
          </button>
        </div>
      </div>
    </div>
  </UserAccountLayout>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";
import moment from "moment-timezone";

const pageLoading = useState("pageLoading");
const reports = ref([]);
const userData = useState("userData");
const currentPage = ref(1);
const itemsPerPage = ref(5);
const showFormulaModal = ref(false);
const selectedFormula = ref("");
const { get } = useApiEndpoint();

const selectedTime = ref("All");

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

const filteredReports = computed(() => {
  return reports.value.filter((report) =>
    isTransactionInTimeRange(report.createdAt)
  );
});

const paginatedReports = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredReports.value.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(filteredReports.value.length / itemsPerPage.value)
);

const openFormulaModal = (report) => {
  selectedFormula.value = report.formula;
  showFormulaModal.value = true;
};

const fetchReports = async () => {
  try {
    const { data } = await get("agent-pt-report");
    if (data.success) {
      reports.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching position taking reports:", error);
  }
};

const formatDate = (date) => {
  if (!date) return "-";
  return moment(date).tz("Asia/Kuala_Lumpur").format("DD/MM/YYYY");
};

const formatAmount = (value) => {
  if (!value && value !== 0) return "0.00";
  const number = parseFloat(value);
  if (isNaN(number)) return "0.00";
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const calculateCommission = (report) => {
  const netWinlose = parseFloat(report.netWinlose);
  const positionTaking = parseFloat(report.positionTaking) / 100;
  const commission = netWinlose * positionTaking;
  return formatAmount(commission);
};

const calculateTotal = (field) => {
  if (filteredReports.value.length === 0) return "0.00";
  const total = filteredReports.value.reduce((sum, report) => {
    return sum + parseFloat(report[field] || 0);
  }, 0);
  return formatAmount(total);
};

const calculateNetWinloseTotal = () => {
  if (filteredReports.value.length === 0) return "0.00";
  const total = filteredReports.value.reduce((sum, report) => {
    return sum + parseFloat(report.netWinlose || 0);
  }, 0);
  return formatAmount(total);
};

const calculateCommissionTotal = () => {
  if (filteredReports.value.length === 0) return "0.00";
  const total = filteredReports.value.reduce((sum, report) => {
    const netWinlose = parseFloat(report.netWinlose || 0);
    const positionTaking = parseFloat(report.positionTaking || 0) / 100;
    return sum + netWinlose * positionTaking;
  }, 0);
  return formatAmount(total);
};

watch(selectedTime, () => {
  currentPage.value = 1;
});

onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchReports();
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});
</script>
