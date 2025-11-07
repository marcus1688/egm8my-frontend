<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg">
          {{ $t("commission") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("track_earnings") }}
        </p>
      </div>

      <PageLoading v-if="isPageLoading" />

      <div v-else class="space-y-4">
        <!-- Distribution Schedule Notice -->
        <div class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <div class="flex gap-3">
            <Icon
              icon="mdi:information"
              class="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5"
            />
            <div>
              <h4 class="font-semibold text-blue-400 mb-1 text-sm">
                {{ $t("weekly_distribution_schedule") }}
              </h4>
              <p class="text-xs text-[#f0eaea]">
                {{ $t("distribution_schedule_description") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Time Filter Bar -->
        <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
          <div class="flex items-center gap-3 max-lg:flex-col">
            <div class="flex gap-2 overflow-x-auto pb-1 flex-1 max-lg:w-full">
              <button
                v-for="filter in timeFilters"
                :key="filter.value"
                @click="selectedTime = filter.value"
                :class="[
                  'px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all',
                  selectedTime === filter.value
                    ? 'bg-[#ff3344] text-white'
                    : 'bg-[#15090e] text-[#b37a7a] border border-[#3b1c23] lg:hover:bg-[#241017]',
                ]"
              >
                {{ filter.label }}
              </button>
            </div>
            <div
              class="flex items-center gap-2 text-sm text-[#b37a7a] max-lg:w-full max-lg:justify-between"
            >
              <span
                >{{ $t("showing") }} {{ filteredReports.length }}
                {{ $t("records") }}</span
              >
            </div>
          </div>
        </div>

        <!-- Commission List -->
        <div class="space-y-2">
          <!-- Desktop: Table View -->
          <div
            class="hidden md:block bg-[#241017] border border-[#3b1c23] rounded-lg overflow-hidden"
          >
            <table class="w-full">
              <thead>
                <tr class="bg-[#15090e] border-b border-[#3b1c23]">
                  <th
                    class="px-4 py-3 text-left text-xs font-semibold text-[#f0eaea] uppercase"
                  >
                    {{ $t("date") }}
                  </th>
                  <th
                    class="px-4 py-3 text-left text-xs font-semibold text-[#f0eaea] uppercase"
                  >
                    {{ $t("formula") }}
                  </th>
                  <th
                    class="px-4 py-3 text-right text-xs font-semibold text-[#f0eaea] uppercase"
                  >
                    {{ $t("deposit") }}
                  </th>
                  <th
                    class="px-4 py-3 text-right text-xs font-semibold text-[#f0eaea] uppercase"
                  >
                    {{ $t("withdraw") }}
                  </th>
                  <th
                    class="px-4 py-3 text-right text-xs font-semibold text-[#f0eaea] uppercase"
                  >
                    {{ $t("bonus") }}
                  </th>
                  <th
                    class="px-4 py-3 text-right text-xs font-semibold text-[#f0eaea] uppercase"
                  >
                    {{ $t("winlose") }}
                  </th>
                  <th
                    class="px-4 py-3 text-right text-xs font-semibold text-[#f0eaea] uppercase"
                  >
                    {{ $t("commission") }}
                  </th>
                  <th
                    class="px-4 py-3 text-center text-xs font-semibold text-[#f0eaea] uppercase"
                  >
                    {{ $t("status") }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(report, index) in paginatedReports"
                  :key="index"
                  class="border-b border-[#3b1c23] lg:hover:bg-[#15090e]/30 transition-colors"
                >
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center"
                      >
                        <Icon icon="mdi:calendar" class="w-5 h-5 text-white" />
                      </div>
                      <span class="text-sm font-medium text-[#f0eaea]">
                        {{ formatDate(report.createdAt) }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <button
                      @click="() => openFormulaModal(report)"
                      class="inline-flex items-center px-2.5 py-1 bg-[#ff3344]/10 border border-[#ff3344]/30 rounded text-xs font-medium text-[#ff3344] lg:hover:bg-[#ff3344]/20 transition-all"
                    >
                      {{ $t("view") }}
                    </button>
                  </td>
                  <td class="px-4 py-4 text-right text-sm text-[#f0eaea]">
                    {{ formatNumber(report.totalDeposit || 0) }}
                  </td>
                  <td class="px-4 py-4 text-right text-sm text-[#f0eaea]">
                    {{ formatNumber(report.totalWithdraw || 0) }}
                  </td>
                  <td class="px-4 py-4 text-right text-sm text-[#f0eaea]">
                    {{ formatNumber(report.totalBonus || 0) }}
                  </td>
                  <td class="px-4 py-4 text-right text-sm text-[#f0eaea]">
                    {{ formatNumber(report.totalWinLoss || 0) }}
                  </td>
                  <td class="px-4 py-4 text-right">
                    <span
                      class="text-sm font-semibold"
                      :class="
                        (report.commissionAmount || 0) > 0
                          ? 'text-green-400'
                          : (report.commissionAmount || 0) < 0
                          ? 'text-red-400'
                          : 'text-[#f0eaea]'
                      "
                    >
                      {{ formatNumber(report.commissionAmount) }}
                    </span>
                  </td>
                  <td class="px-4 py-4">
                    <div class="flex justify-center">
                      <div class="flex items-center gap-2">
                        <div
                          class="w-2 h-2 rounded-full"
                          :class="
                            report.status === 'approved'
                              ? 'bg-green-400'
                              : report.status === 'pending'
                              ? 'bg-amber-400'
                              : 'bg-red-400'
                          "
                        ></div>
                        <span
                          class="text-sm"
                          :class="
                            report.status === 'approved'
                              ? 'text-green-400'
                              : report.status === 'pending'
                              ? 'text-amber-400'
                              : 'text-red-400'
                          "
                        >
                          {{ getLocalizedStatus(report.status) }}
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile: Card View -->
          <div class="md:hidden space-y-2">
            <div
              v-for="(report, index) in paginatedReports"
              :key="index"
              class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center"
                  >
                    <Icon icon="mdi:calendar" class="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-[#f0eaea] mb-1">
                      {{ formatDate(report.createdAt) }}
                    </p>
                    <button
                      @click="() => openFormulaModal(report)"
                      class="inline-flex items-center px-2 py-0.5 bg-[#ff3344]/10 border border-[#ff3344]/30 rounded text-xs text-[#ff3344]"
                    >
                      {{ $t("view_formula") }}
                    </button>
                  </div>
                </div>
                <div class="flex items-center gap-1.5">
                  <div
                    class="w-2 h-2 rounded-full"
                    :class="
                      report.status === 'approved'
                        ? 'bg-green-400'
                        : report.status === 'pending'
                        ? 'bg-amber-400'
                        : 'bg-red-400'
                    "
                  ></div>
                  <span
                    class="text-xs"
                    :class="
                      report.status === 'approved'
                        ? 'text-green-400'
                        : report.status === 'pending'
                        ? 'text-amber-400'
                        : 'text-red-400'
                    "
                  >
                    {{ getLocalizedStatus(report.status) }}
                  </span>
                </div>
              </div>

              <div
                class="grid grid-cols-2 gap-3 pt-3 border-t border-[#3b1c23]"
              >
                <div>
                  <p class="text-xs text-[#b37a7a] mb-0.5">
                    {{ $t("deposit") }}
                  </p>
                  <p class="text-sm text-[#f0eaea] font-medium">
                    {{ formatNumber(report.totalDeposit || 0) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-[#b37a7a] mb-0.5">
                    {{ $t("withdraw") }}
                  </p>
                  <p class="text-sm text-[#f0eaea] font-medium">
                    {{ formatNumber(report.totalWithdraw || 0) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-[#b37a7a] mb-0.5">{{ $t("bonus") }}</p>
                  <p class="text-sm text-[#f0eaea] font-medium">
                    {{ formatNumber(report.totalBonus || 0) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-[#b37a7a] mb-0.5">
                    {{ $t("winlose") }}
                  </p>
                  <p class="text-sm text-[#f0eaea] font-medium">
                    {{ formatNumber(report.totalWinLoss || 0) }}
                  </p>
                </div>
              </div>

              <div
                class="mt-3 pt-3 border-t border-[#3b1c23] flex justify-between items-center"
              >
                <span class="text-xs text-[#b37a7a]">{{
                  $t("commission")
                }}</span>
                <span
                  class="text-base font-bold"
                  :class="
                    (report.commissionAmount || 0) > 0
                      ? 'text-green-400'
                      : (report.commissionAmount || 0) < 0
                      ? 'text-red-400'
                      : 'text-[#f0eaea]'
                  "
                >
                  {{ formatNumber(report.commissionAmount) }}
                </span>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="filteredReports.length === 0"
            class="bg-[#241017] border border-[#3b1c23] rounded-lg py-16"
          >
            <div class="flex flex-col items-center">
              <div
                class="w-20 h-20 rounded-full bg-[#ff3344]/10 flex items-center justify-center mb-4"
              >
                <Icon
                  icon="mdi:cash-multiple"
                  class="w-10 h-10 text-[#ff3344]"
                />
              </div>
              <h3 class="text-[#f0eaea] font-bold mb-2 text-base">
                {{ $t("no_commission_data") }}
              </h3>
              <p class="text-[#b37a7a] text-sm mb-6 text-center max-w-sm px-4">
                {{ $t("no_earnings_yet") }}
              </p>
              <button
                @click="$router.push(localePath('/myaccount/referral'))"
                class="flex items-center gap-2 px-6 py-3 bg-[#ff3344] text-white rounded-lg font-semibold lg:hover:bg-[#cc2a3a] transition-all text-sm"
              >
                <Icon icon="mdi:share-variant" class="w-5 h-5" />
                {{ $t("share_referral_code") }}
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div
          v-if="filteredReports.length > 0"
          class="flex justify-between items-center gap-4 max-lg:flex-col"
        >
          <div class="text-[#b37a7a] text-sm">
            {{ $t("page") }} {{ currentPage }} {{ $t("of") }} {{ totalPages }}
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="currentPage = 1"
              :disabled="currentPage === 1"
              class="w-9 h-9 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:bg-[#241017] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-double-left" class="w-5 h-5" />
            </button>

            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="w-9 h-9 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:bg-[#241017] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-left" class="w-5 h-5" />
            </button>

            <div class="flex gap-1">
              <button
                v-for="page in displayedPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'w-9 h-9 rounded-lg font-semibold text-sm transition-all',
                  currentPage === page
                    ? 'bg-[#ff3344] text-white'
                    : 'bg-[#15090e] text-[#b37a7a] border border-[#3b1c23] lg:hover:bg-[#241017]',
                ]"
              >
                {{ page }}
              </button>
            </div>

            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="w-9 h-9 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:bg-[#241017] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-right" class="w-5 h-5" />
            </button>

            <button
              @click="currentPage = totalPages"
              :disabled="currentPage === totalPages"
              class="w-9 h-9 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] lg:hover:bg-[#241017] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Icon icon="mdi:chevron-double-right" class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Formula Modal -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showFormulaModal"
          class="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          @click="showFormulaModal = false"
        >
          <div
            class="bg-[#1A0D13] border border-[#3b1c23] rounded-lg w-full max-w-lg overflow-hidden"
            @click.stop
            :class="showFormulaModal ? 'animate-popupIn' : ''"
          >
            <!-- Header -->
            <div
              class="p-4 border-b border-[#3b1c23] flex items-center justify-between"
            >
              <h3
                class="font-semibold text-[#f0eaea] text-base flex items-center gap-2"
              >
                <Icon icon="mdi:calculator" class="w-5 h-5 text-[#ff3344]" />
                {{ $t("commission_formula") }}
              </h3>
              <button
                @click="showFormulaModal = false"
                class="w-8 h-8 rounded-lg bg-[#241017] border border-[#3b1c23] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all"
              >
                <Icon icon="mdi:close" class="w-5 h-5" />
              </button>
            </div>

            <!-- Content -->
            <div class="p-4 max-h-[60vh] overflow-y-auto">
              <div class="bg-[#15090e] border border-[#3b1c23] rounded-lg p-4">
                <pre
                  class="text-[#f0eaea] text-sm whitespace-pre-wrap font-mono"
                  >{{ selectedFormula }}</pre
                >
              </div>
            </div>

            <!-- Footer -->
            <div class="p-4 border-t border-[#3b1c23]">
              <button
                @click="showFormulaModal = false"
                class="w-full py-2.5 bg-[#ff3344] text-white rounded-lg font-medium lg:hover:bg-[#cc2a3a] transition-all text-sm"
              >
                {{ $t("close") }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </UserAccountLayout>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";
import moment from "moment-timezone";
import { formatNumber } from "~/utils/formatNumber";

const { checkAuth } = useAuthCheck();
await checkAuth();
const localePath = useLocalePath();
const isPageLoading = ref(true);
const reports = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showFormulaModal = ref(false);
const selectedFormula = ref("");
const { get } = useApiEndpoint();
const selectedTime = ref("All");

const timeFilters = [
  { value: "All", label: $t("all") },
  { value: "Today", label: $t("today") },
  { value: "Yesterday", label: $t("yesterday") },
  { value: "Last 7 Days", label: $t("last_7_days") },
  { value: "Last 30 Days", label: $t("last_30_days") },
  { value: "Last Month", label: $t("last_month") },
];

const getLocalizedStatus = (status) => {
  const statusTranslations = {
    approved: { en: "Approved", zh: "已批准", ms: "Diluluskan" },
    pending: { en: "Pending", zh: "待處理", ms: "Menunggu" },
    rejected: { en: "Rejected", zh: "已拒絕", ms: "Ditolak" },
  };
  const lowerStatus = status.toLowerCase();
  return statusTranslations[lowerStatus]?.[$locale.value] || status;
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
  selectedFormula.value =
    $locale.value === "zh" ? report.formulazh : report.formula;
  showFormulaModal.value = true;
};

const fetchReports = async () => {
  try {
    const { data } = await get("agent-commission-report");
    if (data.success) {
      reports.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching commission reports:", error);
  }
};

const formatDate = (date) => {
  if (!date) return "-";
  return moment(date).tz("Asia/Kuala_Lumpur").format("DD/MM/YYYY");
};

watch(selectedTime, () => {
  currentPage.value = 1;
});

onMounted(async () => {
  try {
    await fetchReports();
  } finally {
    isPageLoading.value = false;
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

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
</style>
