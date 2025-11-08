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
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-lg p-5 max-lg:p-4 space-y-4"
        >
          <div>
            <div class="flex gap-2.5">
              <div>
                <h4
                  class="font-semibold text-blue-400 mb-0.5 text-base max-lg:text-sm s"
                >
                  {{ $t("weekly_distribution_schedule") }}
                </h4>
                <p
                  class="text-[0.9rem] max-sm:text-sm max-[370px]:text-xs text-[#b37a7a] leading-relaxed"
                >
                  {{ $t("distribution_schedule_description") }}
                </p>
              </div>
            </div>
          </div>

          <div class="border-t border-[#3b1c23]"></div>

          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <label
                class="text-base max-lg:text-sm font-semibold text-[#f0eaea] flex items-center gap-2"
              >
                {{ $t("time_period") }}
              </label>
            </div>
            <div class="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
              <button
                v-for="filter in timeFilters"
                :key="filter.value"
                @click="selectedTime = filter.value"
                :class="[
                  'px-4 py-2 max-lg:px-3 max-lg:py-1.5 rounded-lg text-sm max-lg:text-xs font-medium whitespace-nowrap transition-colour',
                  selectedTime === filter.value
                    ? 'bg-[#ff3344] text-white shadow-lg shadow-[#ff3344]/30'
                    : 'bg-[#15090e] text-[#b37a7a] border border-[#3b1c23] hover:border-[#ff3344] hover:text-[#ff3344]',
                ]"
              >
                {{ filter.label }}
              </button>
            </div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="border border-[#3b1c23] rounded-lg overflow-hidden">
            <div class="overflow-x-auto scrollbar-thin">
              <table class="w-full min-w-[800px]">
                <thead>
                  <tr
                    class="border-b bg-gradient-to-r from-[#15090e] via-[#1a0d13] to-[#15090e] border-[#3b1c23]"
                  >
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-left text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div class="flex items-center gap-2 whitespace-nowrap">
                        {{ $t("date") }}
                      </div>
                    </th>
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-left text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div class="flex items-center gap-2 whitespace-nowrap">
                        {{ $t("formula") }}
                      </div>
                    </th>
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-right text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div
                        class="flex items-center justify-end gap-2 whitespace-nowrap"
                      >
                        {{ $t("deposit") }}
                      </div>
                    </th>
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-right text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div
                        class="flex items-center justify-end gap-2 whitespace-nowrap"
                      >
                        {{ $t("withdraw") }}
                      </div>
                    </th>
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-right text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div
                        class="flex items-center justify-end gap-2 whitespace-nowrap"
                      >
                        {{ $t("bonus") }}
                      </div>
                    </th>
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-right text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div
                        class="flex items-center justify-end gap-2 whitespace-nowrap"
                      >
                        {{ $t("winlose") }}
                      </div>
                    </th>
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-right text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div
                        class="flex items-center justify-end gap-2 whitespace-nowrap"
                      >
                        {{ $t("commission") }}
                      </div>
                    </th>
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-center text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div
                        class="flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        {{ $t("status") }}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(report, index) in paginatedReports"
                    :key="index"
                    class="group border-b border-[#3b1c23] last:border-b-0 hover:bg-gradient-to-r hover:from-[#ff3344]/5 hover:to-transparent transition-all duration-300"
                  >
                    <!-- Date Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div class="flex items-center gap-3 max-lg:gap-2">
                        <div class="relative flex-shrink-0">
                          <div
                            class="w-11 h-11 max-lg:w-9 max-lg:h-9 rounded-xl bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center text-white font-bold text-sm max-lg:text-xs shadow-lg shadow-[#ff3344]/30 group-hover:scale-110 transition-transform"
                          >
                            <Icon
                              icon="mdi:calendar"
                              class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                            />
                          </div>
                        </div>
                        <div class="min-w-0">
                          <span
                            class="text-sm max-lg:text-xs font-bold text-[#f0eaea] block truncate"
                          >
                            {{ formatDate(report.createdAt) }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <!-- Formula Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <button
                        @click="() => openFormulaModal(report)"
                        class="inline-flex items-center gap-1 px-2.5 py-1 max-lg:px-2 max-lg:py-0.5 bg-gradient-to-r from-[#ff3344]/10 to-[#ff3344]/20 border border-[#ff3344]/40 rounded-lg text-xs max-lg:text-[10px] font-bold text-[#ff3344] shadow-sm whitespace-nowrap hover:shadow-md transition-all"
                      >
                        <Icon
                          icon="mdi:calculator"
                          class="w-3 h-3 max-lg:w-2.5 max-lg:h-2.5"
                        />
                        {{ $t("view") }}
                      </button>
                    </td>

                    <!-- Deposit Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div
                        class="flex items-center justify-end gap-2 max-lg:gap-1.5"
                      >
                        <Icon
                          icon="mdi:arrow-down-circle"
                          class="w-4 h-4 max-lg:w-3 max-lg:h-3 text-green-400 flex-shrink-0"
                        />
                        <span
                          class="text-sm max-lg:text-xs font-medium text-[#f0eaea] whitespace-nowrap"
                        >
                          {{ formatNumber(report.totalDeposit || 0) }}
                        </span>
                      </div>
                    </td>

                    <!-- Withdraw Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div
                        class="flex items-center justify-end gap-2 max-lg:gap-1.5"
                      >
                        <Icon
                          icon="mdi:arrow-up-circle"
                          class="w-4 h-4 max-lg:w-3 max-lg:h-3 text-red-400 flex-shrink-0"
                        />
                        <span
                          class="text-sm max-lg:text-xs font-medium text-[#f0eaea] whitespace-nowrap"
                        >
                          {{ formatNumber(report.totalWithdraw || 0) }}
                        </span>
                      </div>
                    </td>

                    <!-- Bonus Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div
                        class="flex items-center justify-end gap-2 max-lg:gap-1.5"
                      >
                        <Icon
                          icon="mdi:gift"
                          class="w-4 h-4 max-lg:w-3 max-lg:h-3 text-purple-400 flex-shrink-0"
                        />
                        <span
                          class="text-sm max-lg:text-xs font-medium text-[#f0eaea] whitespace-nowrap"
                        >
                          {{ formatNumber(report.totalBonus || 0) }}
                        </span>
                      </div>
                    </td>

                    <!-- Win/Loss Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div
                        class="flex items-center justify-end gap-2 max-lg:gap-1.5"
                      >
                        <Icon
                          icon="mdi:chart-line"
                          class="w-4 h-4 max-lg:w-3 max-lg:h-3 text-blue-400 flex-shrink-0"
                        />
                        <span
                          class="text-sm max-lg:text-xs font-medium text-[#f0eaea] whitespace-nowrap"
                        >
                          {{ formatNumber(report.totalWinLoss || 0) }}
                        </span>
                      </div>
                    </td>

                    <!-- Commission Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div
                        class="flex items-center justify-end gap-2 max-lg:gap-1.5"
                      >
                        <Icon
                          icon="mdi:cash-multiple"
                          class="w-4 h-4 max-lg:w-3 max-lg:h-3 text-[#ff3344] flex-shrink-0"
                        />
                        <span
                          class="text-sm max-lg:text-xs font-bold whitespace-nowrap"
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
                    </td>

                    <!-- Status Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div class="flex justify-center">
                        <div
                          class="inline-flex items-center gap-2 max-lg:gap-1.5 px-3 py-1.5 max-lg:px-2.5 max-lg:py-1 rounded-lg"
                          :class="
                            report.status === 'approved'
                              ? 'bg-green-500/10'
                              : report.status === 'pending'
                              ? 'bg-amber-500/10'
                              : 'bg-red-500/10'
                          "
                        >
                          <div
                            class="relative flex items-center justify-center"
                          >
                            <div
                              class="w-2 h-2 max-lg:w-1.5 max-lg:h-1.5 rounded-full"
                              :class="
                                report.status === 'approved'
                                  ? 'bg-green-400'
                                  : report.status === 'pending'
                                  ? 'bg-amber-400'
                                  : 'bg-red-400'
                              "
                            ></div>
                            <div
                              v-if="report.status === 'approved'"
                              class="absolute w-2 h-2 max-lg:w-1.5 max-lg:h-1.5 rounded-full animate-ping"
                              :class="
                                report.status === 'approved'
                                  ? 'bg-green-400'
                                  : report.status === 'pending'
                                  ? 'bg-amber-400'
                                  : 'bg-red-400'
                              "
                            ></div>
                          </div>
                          <span
                            class="text-xs max-lg:text-[11px] font-bold uppercase tracking-wide whitespace-nowrap"
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

                  <!-- Empty State Row -->
                  <tr v-if="filteredReports.length === 0">
                    <td colspan="8" class="px-4 py-16 max-lg:py-12">
                      <div class="flex flex-col items-center">
                        <div
                          class="w-20 h-20 max-lg:w-16 max-lg:h-16 rounded-2xl bg-[#ff3344]/10 flex items-center justify-center mb-5 max-lg:mb-4"
                        >
                          <Icon
                            icon="mdi:cash-multiple"
                            class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-[#ff3344]"
                          />
                        </div>
                        <h3
                          class="text-[#f0eaea] font-bold mb-2 text-base max-lg:text-sm"
                        >
                          {{ $t("no_commission_data") }}
                        </h3>
                        <p
                          class="text-[#b37a7a] text-sm max-lg:text-xs mb-6 max-lg:mb-5 text-center max-w-sm px-4"
                        >
                          {{ $t("no_earnings_yet") }}
                        </p>
                        <button
                          @click="
                            $router.push(localePath('/myaccount/referral'))
                          "
                          class="flex items-center gap-2 px-6 py-3 max-lg:px-5 max-lg:py-2.5 bg-[#ff3344] text-white rounded-xl font-semibold hover:bg-[#cc2a3a] transition-all text-sm max-lg:text-xs shadow-lg shadow-[#ff3344]/30"
                        >
                          <Icon
                            icon="mdi:share-variant"
                            class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                          />
                          {{ $t("share_referral_code") }}
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="filteredReports.length > 0">
          <div
            class="flex justify-between items-center gap-4 max-lg:flex-col max-lg:gap-3"
          >
            <div
              class="flex items-center gap-3 max-lg:order-2 max-lg:w-full max-lg:justify-center"
            >
              <div class="px-3 py-1.5">
                <span class="text-sm max-lg:text-xs text-[#b37a7a] font-medium">
                  {{ $t("page") }}
                  <span class="text-[#ff3344] font-bold mx-1">{{
                    currentPage
                  }}</span>
                  {{ $t("of") }}
                  <span class="text-[#f0eaea] font-bold mx-1">{{
                    totalPages
                  }}</span>
                </span>
              </div>
            </div>

            <div class="flex items-center gap-2 max-lg:gap-1.5 max-lg:order-1">
              <button
                @click="currentPage = 1"
                :disabled="currentPage === 1"
                class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] hover:text-[#ff3344] hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
              >
                <Icon
                  icon="mdi:chevron-double-left"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
              </button>

              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] hover:text-[#ff3344] hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
              >
                <Icon
                  icon="mdi:chevron-left"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
              </button>

              <div class="hidden lg:flex gap-1.5">
                <button
                  v-for="page in displayedPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'w-9 h-9 rounded-lg font-bold text-sm transition-all',
                    currentPage === page
                      ? 'bg-[#ff3344] text-white shadow-lg shadow-[#ff3344]/30'
                      : 'bg-[#15090e] text-[#b37a7a] border border-[#3b1c23] hover:text-[#ff3344] hover:border-[#ff3344]',
                  ]"
                >
                  {{ page }}
                </button>
              </div>

              <div class="flex lg:hidden gap-1">
                <button
                  v-for="page in mobileDisplayedPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    'w-8 h-8 rounded-lg font-bold text-xs transition-all',
                    currentPage === page
                      ? 'bg-[#ff3344] text-white shadow-lg shadow-[#ff3344]/30'
                      : 'bg-[#15090e] text-[#b37a7a] border border-[#3b1c23]',
                  ]"
                >
                  {{ page }}
                </button>
              </div>

              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] hover:text-[#ff3344] hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
              >
                <Icon
                  icon="mdi:chevron-right"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
              </button>

              <button
                @click="currentPage = totalPages"
                :disabled="currentPage === totalPages"
                class="w-9 h-9 max-lg:w-8 max-lg:h-8 rounded-lg border border-[#3b1c23] bg-[#15090e] flex items-center justify-center text-[#b37a7a] hover:text-[#ff3344] hover:border-[#ff3344] transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-[#b37a7a] disabled:hover:border-[#3b1c23]"
              >
                <Icon
                  icon="mdi:chevron-double-right"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                />
              </button>
            </div>
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
            class="bg-[#1A0D13] border border-[#3b1c23] rounded-xl w-full max-w-lg overflow-hidden shadow-2xl"
            @click.stop
            :class="showFormulaModal ? 'animate-popupIn' : ''"
          >
            <!-- Header -->
            <div
              class="p-5 border-b border-[#3b1c23] bg-gradient-to-r from-[#241017] to-[#1a0d13]"
            >
              <div class="flex items-center justify-between">
                <h3
                  class="font-bold text-[#f0eaea] text-base flex items-center gap-3"
                >
                  <div
                    class="w-10 h-10 rounded-lg bg-[#ff3344]/20 flex items-center justify-center"
                  >
                    <Icon
                      icon="mdi:calculator"
                      class="w-5 h-5 text-[#ff3344]"
                    />
                  </div>
                  {{ $t("commission_formula") }}
                </h3>
                <button
                  @click="showFormulaModal = false"
                  class="w-9 h-9 rounded-lg bg-[#241017] border border-[#3b1c23] flex items-center justify-center text-[#b37a7a] hover:text-[#ff3344] hover:border-[#ff3344] transition-all"
                >
                  <Icon icon="mdi:close" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="p-5 max-h-[60vh] overflow-y-auto scrollbar-thin">
              <div class="bg-[#15090e] border border-[#3b1c23] rounded-lg p-4">
                <pre
                  class="text-[#f0eaea] text-sm whitespace-pre-wrap font-mono leading-relaxed"
                  >{{ selectedFormula }}</pre
                >
              </div>
            </div>

            <!-- Footer -->
            <div
              class="p-5 border-t border-[#3b1c23] bg-gradient-to-r from-[#241017] to-[#1a0d13]"
            >
              <button
                @click="showFormulaModal = false"
                class="w-full py-3 bg-[#ff3344] text-white rounded-lg font-bold hover:bg-[#cc2a3a] transition-all text-sm shadow-lg shadow-[#ff3344]/30"
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

const mobileDisplayedPages = computed(() => {
  if (totalPages.value <= 3) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }

  if (currentPage.value === 1) {
    return [1, 2, 3];
  }

  if (currentPage.value === totalPages.value) {
    return [totalPages.value - 2, totalPages.value - 1, totalPages.value];
  }

  return [currentPage.value - 1, currentPage.value, currentPage.value + 1];
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
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #15090e;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #3b1c23;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #ff3344;
}

.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #3b1c23 #15090e;
}

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
