<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg">
          {{ $t("transaction_history") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("view_track_transactions") }}
        </p>
      </div>

      <div class="space-y-4">
        <!-- Transaction Type Selection -->
        <!-- Filters Card -->
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-lg p-5 max-lg:p-4 space-y-4"
        >
          <!-- Transaction Type -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <label
                class="text-sm font-semibold text-[#f0eaea] flex items-center gap-2"
              >
                <Icon icon="mdi:shape" class="w-4 h-4 text-[#ff3344]" />
                {{ $t("transaction_type") }}
              </label>
            </div>
            <div class="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
              <button
                v-for="type in transactionTypes"
                :key="type.key"
                @click="selectedType = type.key"
                :class="[
                  'px-4 py-2 max-lg:px-3 max-lg:py-1.5 rounded-lg text-sm max-lg:text-xs font-medium whitespace-nowrap transition-all',
                  selectedType === type.key
                    ? 'bg-[#ff3344] text-white shadow-lg shadow-[#ff3344]/30'
                    : 'bg-[#15090e] text-[#b37a7a] border border-[#3b1c23] hover:border-[#ff3344] hover:text-[#ff3344]',
                ]"
              >
                {{ type.en }}
              </button>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-[#3b1c23]"></div>

          <!-- Transaction Time -->
          <div>
            <div class="flex items-center justify-between mb-3">
              <label
                class="text-sm font-semibold text-[#f0eaea] flex items-center gap-2"
              >
                <Icon icon="mdi:clock-outline" class="w-4 h-4 text-[#ff3344]" />
                {{ $t("transaction_time") }}
              </label>
              <button
                v-if="selectedType !== 'All' || selectedTime !== 'All'"
                @click="resetFilters"
                class="flex items-center gap-2 px-4 py-2 max-lg:px-3 max-lg:py-1.5 bg-[#15090e] text-[#b37a7a] rounded-lg text-sm max-lg:text-xs font-medium hover:text-[#ff3344] hover:border-[#ff3344] border border-[#3b1c23] transition-all"
              >
                <Icon
                  icon="mdi:refresh"
                  class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
                />
                <span>{{ $t("reset_filters") }}</span>
              </button>
            </div>
            <div class="flex gap-2 overflow-x-auto scrollbar-thin pb-1">
              <button
                v-for="time in transactionTimes"
                :key="time.key"
                @click="selectedTime = time.key"
                :class="[
                  'px-4 py-2 max-lg:px-3 max-lg:py-1.5 rounded-lg text-sm max-lg:text-xs font-medium whitespace-nowrap transition-all',
                  selectedTime === time.key
                    ? 'bg-[#ff3344] text-white shadow-lg shadow-[#ff3344]/30'
                    : 'bg-[#15090e] text-[#b37a7a] border border-[#3b1c23] hover:border-[#ff3344] hover:text-[#ff3344]',
                ]"
              >
                {{ time.en }}
              </button>
            </div>
          </div>

          <!-- Divider -->
          <div class="border-t border-[#3b1c23]"></div>

          <!-- Info & Results -->
          <div
            class="flex items-center justify-between gap-4 max-lg:flex-col max-lg:items-start"
          >
            <!-- Info Notice -->
            <div class="flex items-center gap-2.5">
              <div
                class="w-8 h-8 max-lg:w-7 max-lg:h-7 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0"
              >
                <Icon
                  icon="mdi:information"
                  class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5 text-blue-400"
                />
              </div>
              <p class="text-xs text-[#b37a7a]">
                {{ $t("transactions_local_time") }}
              </p>
            </div>

            <!-- Results Counter -->
            <div
              class="flex items-center gap-2 px-4 py-2 max-lg:px-3 max-lg:py-1.5 bg-[#15090e] border border-[#3b1c23] rounded-lg"
            >
              <Icon icon="mdi:filter-check" class="w-4 h-4 text-[#ff3344]" />
              <span class="text-sm max-lg:text-xs text-[#b37a7a] font-medium">
                {{ $t("showing") }}
                <span class="text-[#ff3344] font-bold mx-1">{{
                  filteredTransactions.length
                }}</span>
                {{ $t("results") }}
              </span>
            </div>
          </div>
        </div>

        <!-- Transaction Table -->
        <div class="space-y-2">
          <div class="border border-[#3b1c23] rounded-lg overflow-hidden">
            <div class="overflow-x-auto scrollbar-thin">
              <table class="w-full min-w-[800px]">
                <thead>
                  <tr
                    class="border-b bg-gradient-to-r from-[#15090e] via-[#1a0d13] to-[#15090e] border-[#3b1c23]"
                  >
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-left text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div class="flex items-center gap-2 whitespace-nowrap">
                        {{ $t("date") }}
                      </div>
                    </th>
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-left text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div class="flex items-center gap-2 whitespace-nowrap">
                        {{ $t("type") }}
                      </div>
                    </th>
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-right text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div
                        class="flex items-center justify-end gap-2 whitespace-nowrap"
                      >
                        {{ $t("amount") }}
                      </div>
                    </th>
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-center text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div
                        class="flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        {{ $t("status") }}
                      </div>
                    </th>
                    <th
                      class="px-4 py-4 max-lg:px-3 max-lg:py-3 text-left text-xs font-bold text-[#f0eaea] uppercase tracking-wider"
                    >
                      <div class="flex items-center gap-2 whitespace-nowrap">
                        {{ $t("remark") }}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="transaction in paginatedTransactions"
                    :key="transaction.id"
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
                            {{ formatDate(transaction.createdAt) }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <!-- Type Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <span
                        class="inline-flex items-center gap-1 px-2.5 py-1 max-lg:px-2 max-lg:py-0.5 rounded-lg text-xs max-lg:text-[10px] font-bold shadow-sm whitespace-nowrap"
                        :class="{
                          'bg-green-500/10 text-green-400 border border-green-500/30':
                            transaction.transactiontype === 'deposit',
                          'bg-red-500/10 text-red-400 border border-red-500/30':
                            transaction.transactiontype === 'withdraw',
                          'bg-purple-500/10 text-purple-400 border border-purple-500/30':
                            transaction.transactiontype === 'bonus',
                          'bg-blue-500/10 text-blue-400 border border-blue-500/30':
                            transaction.transactiontype === 'commission',
                          'bg-orange-500/10 text-orange-400 border border-orange-500/30':
                            transaction.transactiontype === 'rescue',
                          'bg-[#b37a7a]/10 text-[#b37a7a] border border-[#b37a7a]/30':
                            ![
                              'deposit',
                              'withdraw',
                              'bonus',
                              'commission',
                              'rescue',
                            ].includes(transaction.transactiontype),
                        }"
                      >
                        {{
                          getLocalizedTransactionType(
                            transaction.transactiontype
                          )
                        }}
                      </span>
                    </td>

                    <!-- Amount Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div
                        class="flex items-center justify-end gap-2 max-lg:gap-1.5"
                      >
                        <Icon
                          :icon="
                            parseFloat(transaction.amount) > 0
                              ? 'mdi:arrow-up-circle'
                              : parseFloat(transaction.amount) < 0
                              ? 'mdi:arrow-down-circle'
                              : 'mdi:minus-circle'
                          "
                          class="w-4 h-4 max-lg:w-3 max-lg:h-3 flex-shrink-0"
                          :class="{
                            'text-green-400':
                              parseFloat(transaction.amount) > 0,
                            'text-red-400': parseFloat(transaction.amount) < 0,
                            'text-[#b37a7a]':
                              parseFloat(transaction.amount) === 0,
                          }"
                        />
                        <span
                          class="text-sm max-lg:text-xs font-bold whitespace-nowrap"
                          :class="{
                            'text-green-400':
                              parseFloat(transaction.amount) > 0,
                            'text-red-400': parseFloat(transaction.amount) < 0,
                            'text-[#f0eaea]':
                              parseFloat(transaction.amount) === 0,
                          }"
                        >
                          ${{ parseFloat(transaction.amount).toFixed(2) }}
                        </span>
                      </div>
                    </td>

                    <!-- Status Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div class="flex justify-center">
                        <div
                          class="inline-flex items-center gap-2 max-lg:gap-1.5 px-3 py-1.5 max-lg:px-2.5 max-lg:py-1 rounded-lg"
                          :class="{
                            'bg-green-500/10':
                              transaction.status === 'approved',
                            'bg-red-500/10': transaction.status === 'rejected',
                            'bg-[#b37a7a]/10': transaction.status === 'cancel',
                            'bg-amber-500/10': transaction.status === 'pending',
                          }"
                        >
                          <div
                            class="relative flex items-center justify-center"
                          >
                            <div
                              class="w-2 h-2 max-lg:w-1.5 max-lg:h-1.5 rounded-full"
                              :class="{
                                'bg-green-400':
                                  transaction.status === 'approved',
                                'bg-red-400': transaction.status === 'rejected',
                                'bg-[#b37a7a]': transaction.status === 'cancel',
                                'bg-amber-400':
                                  transaction.status === 'pending',
                              }"
                            ></div>
                            <div
                              v-if="transaction.status === 'approved'"
                              class="absolute w-2 h-2 max-lg:w-1.5 max-lg:h-1.5 rounded-full animate-ping"
                              :class="{
                                'bg-green-400':
                                  transaction.status === 'approved',
                              }"
                            ></div>
                          </div>
                          <span
                            class="text-xs max-lg:text-[11px] font-bold uppercase tracking-wide whitespace-nowrap"
                            :class="{
                              'text-green-400':
                                transaction.status === 'approved',
                              'text-red-400': transaction.status === 'rejected',
                              'text-[#b37a7a]': transaction.status === 'cancel',
                              'text-amber-400':
                                transaction.status === 'pending',
                            }"
                          >
                            {{ getLocalizedStatus(transaction.status) }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <!-- Remark Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div class="flex items-center gap-2 max-lg:gap-1.5">
                        <Icon
                          icon="mdi:note-text"
                          class="w-4 h-4 max-lg:w-3 max-lg:h-3 text-[#b37a7a] flex-shrink-0"
                        />
                        <span
                          class="text-sm max-lg:text-xs font-medium text-[#f0eaea] whitespace-nowrap"
                        >
                          {{ transaction.promotionnameEN || "-" }}
                        </span>
                      </div>
                    </td>
                  </tr>

                  <!-- Empty State Row -->
                  <tr v-if="filteredTransactions.length === 0">
                    <td colspan="5" class="px-4 py-16 max-lg:py-12">
                      <div class="flex flex-col items-center">
                        <div
                          class="w-20 h-20 max-lg:w-16 max-lg:h-16 rounded-2xl bg-[#ff3344]/10 flex items-center justify-center mb-5 max-lg:mb-4"
                        >
                          <Icon
                            icon="mdi:receipt"
                            class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-[#ff3344]"
                          />
                        </div>
                        <h3
                          class="text-[#f0eaea] font-bold mb-2 text-base max-lg:text-sm"
                        >
                          {{ $t("no_transactions_found") }}
                        </h3>
                        <p
                          class="text-[#b37a7a] text-sm max-lg:text-xs mb-6 max-lg:mb-5 text-center max-w-sm px-4"
                        >
                          {{ $t("no_transactions_matching") }}
                        </p>
                        <button
                          @click="resetFilters"
                          class="flex items-center gap-2 px-6 py-3 max-lg:px-5 max-lg:py-2.5 bg-[#ff3344] text-white rounded-xl font-semibold hover:bg-[#cc2a3a] transition-all text-sm max-lg:text-xs shadow-lg shadow-[#ff3344]/30"
                        >
                          <Icon
                            icon="mdi:refresh"
                            class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                          />
                          {{ $t("reset_filters") }}
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
        <div
          v-if="filteredTransactions.length > 0"
          class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4 max-lg:p-3"
        >
          <div
            class="flex justify-between items-center gap-4 max-lg:flex-col max-lg:gap-3"
          >
            <!-- Page Info -->
            <div
              class="flex items-center gap-3 max-lg:order-2 max-lg:w-full max-lg:justify-center"
            >
              <div
                class="px-3 py-1.5 bg-[#15090e] border border-[#3b1c23] rounded-lg"
              >
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
              <div
                class="px-3 py-1.5 bg-[#15090e] border border-[#3b1c23] rounded-lg"
              >
                <span class="text-sm max-lg:text-xs text-[#b37a7a] font-medium">
                  {{ getStartEntry() }}-{{ getEndEntry() }} {{ $t("of") }}
                  <span class="text-[#f0eaea] font-bold mx-1">{{
                    filteredTransactions.length
                  }}</span>
                </span>
              </div>
            </div>

            <!-- Pagination Controls -->
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
                @click="prevPage"
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
                @click="nextPage"
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
</style>
