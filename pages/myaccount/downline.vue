<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg max-sm:text-base">
          {{ $t("downline") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("track_and_manage") }}
        </p>
      </div>

      <div class="space-y-4">
        <!-- <div
          class="bg-[#241017] border border-[#3b1c23] rounded-lg p-5 max-lg:p-4 max-sm:px-2"
        >
          <div class="flex items-center justify-between mb-4 max-lg:mb-3">
            <h3
              class="font-semibold text-[#f0eaea] text-base max-lg:text-sm flex items-center gap-2"
            >
              <Icon
                icon="mdi:chart-box"
                class="w-6 h-6 max-lg:w-5 max-lg:h-5 text-[#ff3344]"
              />
              {{ $t("team_overview") }}
            </h3>
          </div>

          <div
            class="grid grid-cols-3 gap-4 max-sm:gap-2 max-lg:gap-3 max-[400px]:gap-1"
          >
            <div
              class="bg-[#15090e] border max-[500px]:items-center max-[500px]:flex max-[500px]:flex-col border-[#3b1c23] rounded-lg p-4 max-lg:p-3 hover:border-[#ff3344]/50 transition-colors"
            >
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 max-[500px]:hidden h-10 max-lg:w-9 max-lg:h-9 max-[500px]:w-8 max-[500px]:h-8 rounded-lg bg-[#ff3344]/10 flex items-center justify-center flex-shrink-0"
                >
                  <Icon
                    icon="mdi:account-group"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-[#ff3344]"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div
                    class="text-2xl max-lg:text-xl max-[500px]:text-lg font-bold text-[#ff3344]"
                  >
                    {{ statsData?.all?.registeredUsers || 0 }}
                  </div>
                </div>
              </div>
              <div
                class="text-xs text-[#b37a7a] uppercase tracking-wide font-medium"
              >
                {{ $t("total") }}
              </div>
            </div>

            <div
              class="bg-[#15090e] border border-[#3b1c23] rounded-lg p-4 max-lg:p-3 hover:border-green-500/50 transition-colors"
            >
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 h-10 max-lg:w-9 max-lg:h-9 max-[500px]:w-8 max-[500px]:h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0"
                >
                  <Icon
                    icon="mdi:account-multiple-check"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-green-400"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div
                    class="text-2xl max-lg:text-xl max-[500px]:text-lg font-bold text-green-400"
                  >
                    {{ statsData?.direct?.registeredUsers || 0 }}
                  </div>
                </div>
              </div>
              <div
                class="text-xs text-[#b37a7a] uppercase tracking-wide font-medium"
              >
                {{ $t("direct") }}
              </div>
            </div>

            <div
              class="bg-[#15090e] border border-[#3b1c23] rounded-lg p-4 max-lg:p-3 hover:border-purple-500/50 transition-colors"
            >
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="w-10 h-10 max-lg:w-9 max-lg:h-9 max-[500px]:w-8 max-[500px]:h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0"
                >
                  <Icon
                    icon="mdi:account-network"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-purple-400"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <div
                    class="text-2xl max-lg:text-xl max-[500px]:text-lg font-bold text-purple-400"
                  >
                    {{ statsData?.indirect?.registeredUsers || 0 }}
                  </div>
                </div>
              </div>
              <div
                class="text-xs text-[#b37a7a] uppercase tracking-wide font-medium"
              >
                {{ $t("indirect") }}
              </div>
            </div>
          </div>
        </div> -->

        <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
          <div class="flex items-center gap-3 max-lg:flex-col">
            <div class="relative flex-1 max-lg:w-full">
              <Icon
                icon="mdi:magnify"
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] w-5 h-5"
              />
              <input
                v-model="searchQuery"
                type="text"
                :placeholder="$t('search_by_username')"
                class="w-full bg-[#15090e] text-[#f0eaea] pl-10 pr-10 py-2.5 rounded-lg border border-[#3b1c23] focus:border-[#ff3344] focus:outline-none transition-colors placeholder-[#b37a7a] text-base max-sm:text-sm max-[370px]:text-xs"
              />
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] hover:text-[#ff3344] transition-colors"
              >
                <Icon icon="mdi:close-circle" class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div class="space-y-2">
          <div class="border border-[#3b1c23] rounded-lg overflow-hidden">
            <div class="overflow-x-auto scrollbar-thin">
              <table class="w-full">
                <thead>
                  <tr class="border-b bg-[#15090e] border-[#3b1c23]">
                    <th
                      v-for="header in tableHeaders"
                      :key="header.key"
                      @click="handleSort(header.key)"
                      :class="[
                        'px-4 py-4 text-left text-[0.8rem] max-lg:text-xs font-bold text-[#f0eaea] uppercase tracking-wider transition-all max-lg:px-3 max-lg:py-3',
                        header.sortable
                          ? 'cursor-pointer hover:bg-[#241017]/50'
                          : '',
                      ]"
                    >
                      <div class="flex items-center gap-2 whitespace-nowrap">
                        <span>{{ header.label }}</span>
                        <Icon
                          v-if="header.sortable"
                          :icon="
                            sortConfig.key === header.key
                              ? sortConfig.direction === 'asc'
                                ? 'mdi:arrow-up'
                                : 'mdi:arrow-down'
                              : 'mdi:unfold-more-horizontal'
                          "
                          class="w-4 h-4 text-[#ff3344] max-lg:w-3 max-lg:h-3"
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="member in paginatedDownlines"
                    :key="member._id"
                    class="group border-b border-[#3b1c23] last:border-b-0 hover:bg-gradient-to-r hover:from-[#ff3344]/5 hover:to-transparent transition-all duration-300"
                  >
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div class="flex items-center gap-3 max-lg:gap-2">
                        <div class="relative flex-shrink-0">
                          <div
                            class="w-11 h-11 max-lg:w-9 max-lg:h-9 rounded-xl bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center text-white font-bold text-sm max-lg:text-xs"
                          >
                            {{ member.username.substring(0, 2).toUpperCase() }}
                          </div>
                        </div>
                        <div class="min-w-0">
                          <span
                            class="text-sm max-lg:text-xs font-bold text-[#f0eaea] uppercase block truncate"
                          >
                            {{ member.username }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <span
                        class="inline-flex items-center gap-1 px-2.5 py-1 max-lg:px-2 max-lg:py-0.5 bg-gradient-to-r from-[#ff3344]/10 to-[#ff3344]/20 border border-[#ff3344]/40 rounded-lg text-xs max-lg:text-[10px] font-bold text-[#ff3344] shadow-sm whitespace-nowrap"
                      >
                        <Icon
                          icon="mdi:crown"
                          class="w-3 h-3 max-lg:w-2.5 max-lg:h-2.5"
                        />
                        {{ member.viplevel }}
                      </span>
                    </td>

                    <!-- Status Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div class="flex items-center gap-2 max-lg:gap-1.5">
                        <div class="relative">
                          <div
                            class="w-2 h-2 max-lg:w-1.5 max-lg:h-1.5 rounded-full"
                            :class="
                              member.status ? 'bg-green-400' : 'bg-gray-500'
                            "
                          ></div>
                          <div
                            class="w-2 h-2 max-lg:w-1.5 max-lg:h-1.5 rounded-full absolute top-0 left-0 animate-ping"
                            :class="
                              member.status ? 'bg-green-400' : 'bg-gray-500'
                            "
                            v-if="member.status"
                          ></div>
                        </div>
                        <span
                          class="text-sm max-lg:text-xs font-semibold whitespace-nowrap"
                          :class="
                            member.status ? 'text-green-400' : 'text-gray-400'
                          "
                        >
                          {{ member.status ? $t("active") : $t("inactive") }}
                        </span>
                      </div>
                    </td>

                    <!-- Last Deposit Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div class="flex items-center gap-2 max-lg:gap-1.5">
                        <Icon
                          icon="mdi:cash-clock"
                          class="w-4 h-4 max-lg:w-3 max-lg:h-3 text-[#ff3344] flex-shrink-0"
                        />
                        <span
                          class="text-sm max-lg:text-xs font-medium text-[#f0eaea] whitespace-nowrap"
                          >{{ formatDate(member.lastdepositdate) }}</span
                        >
                      </div>
                    </td>

                    <!-- Register Date Column -->
                    <td class="px-4 py-5 max-lg:px-3 max-lg:py-4">
                      <div class="flex items-center gap-2 max-lg:gap-1.5">
                        <Icon
                          icon="mdi:calendar-check"
                          class="w-4 h-4 max-lg:w-3 max-lg:h-3 text-green-400 flex-shrink-0"
                        />
                        <span
                          class="text-sm max-lg:text-xs font-medium text-[#f0eaea] whitespace-nowrap"
                          >{{ formatDate(member.createdAt) }}</span
                        >
                      </div>
                    </td>
                  </tr>

                  <!-- Empty State Row -->
                  <tr v-if="paginatedDownlines.length === 0">
                    <td colspan="5" class="px-4 py-16 max-lg:py-12">
                      <div class="flex flex-col items-center">
                        <div
                          class="w-20 h-20 max-lg:w-16 max-lg:h-16 rounded-2xl bg-[#ff3344]/10 flex items-center justify-center mb-5 max-lg:mb-4"
                        >
                          <Icon
                            icon="mdi:account-group-outline"
                            class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-[#ff3344]"
                          />
                        </div>
                        <h3
                          class="text-[#f0eaea] font-bold mb-2 text-base max-lg:text-sm"
                        >
                          {{ $t("no_downline_found") }}
                        </h3>
                        <p
                          class="text-[#b37a7a] text-sm max-lg:text-xs mb-6 max-lg:mb-5 text-center max-w-sm px-4"
                        >
                          {{ $t("start_sharing") }}
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

        <div v-if="paginatedDownlines.length > 0">
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

              <!-- Previous Page -->
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

              <!-- Page Numbers - Desktop: Show 5, Mobile: Show 3 -->
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

              <!-- Page Numbers - Mobile: Show 3 pages only -->
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

              <!-- Next Page -->
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

              <!-- Last Page -->
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

const localePath = useLocalePath();
const pageLoading = useState("pageLoading");
const statsData = ref(null);
const searchQuery = ref("");
const downlines = ref(null);
const currentPage = ref(1);
const itemsPerPage = ref(10);
const isLoading = ref(false);

const tableHeaders = [
  { key: "username", label: $t("member"), sortable: true },
  { key: "vip", label: $t("vip"), sortable: false },
  { key: "status", label: $t("status"), sortable: false },
  { key: "lastdepositdate", label: $t("last_deposit_date"), sortable: true },
  { key: "createdAt", label: $t("register_date"), sortable: true },
];

const sortConfig = ref({
  key: "username",
  direction: "asc",
});

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

  // If on first page
  if (currentPage.value === 1) {
    return [1, 2, 3];
  }

  // If on last page
  if (currentPage.value === totalPages.value) {
    return [totalPages.value - 2, totalPages.value - 1, totalPages.value];
  }

  // Middle pages
  return [currentPage.value - 1, currentPage.value, currentPage.value + 1];
});

const fetchTeamStats = async () => {
  try {
    isLoading.value = true;
    const { get } = useApiEndpoint();
    const { data } = await get("team-stats");
    if (data.success) {
      statsData.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching team stats:", error);
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (date) => {
  if (!date) return "-";
  return moment(date).tz("Asia/Kuala_Lumpur").format("DD/MM/YYYY");
};

const handleSort = (key) => {
  const header = tableHeaders.find((h) => h.key === key);
  if (!header || !header.sortable) return;

  if (sortConfig.value.key === key) {
    sortConfig.value.direction =
      sortConfig.value.direction === "asc" ? "desc" : "asc";
  } else {
    sortConfig.value.key = key;
    sortConfig.value.direction = "asc";
  }
};

const fetchDownlines = async () => {
  try {
    isLoading.value = true;
    const { get } = useApiEndpoint();
    const { data } = await get("get-downlines");
    if (data.success) {
      // Duplicate the data 10 times for pagination testing
      const originalData = data.data.downlines.direct || [];
      const duplicatedData = [];

      for (let i = 0; i < 50; i++) {
        originalData.forEach((member, index) => {
          duplicatedData.push({
            ...member,
            _id: `${member._id}_${i}_${index}`, // Unique ID for each duplicated item
            username: `${member.username}${i > 0 ? i : ""}`, // Add number to username except first iteration
          });
        });
      }

      downlines.value = { direct: duplicatedData };
    }
  } catch (error) {
    console.error("Error fetching downlines:", error);
  } finally {
    isLoading.value = false;
  }
};

const filteredDownlines = computed(() => {
  if (!downlines.value) return [];

  let filtered = [...(downlines.value.direct || [])];

  if (searchQuery.value) {
    filtered = filtered.filter((member) =>
      member.username.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  filtered.sort((a, b) => {
    let aVal = a[sortConfig.value.key];
    let bVal = b[sortConfig.value.key];
    if (
      sortConfig.value.key === "lastdepositdate" ||
      sortConfig.value.key === "createdAt"
    ) {
      aVal = aVal ? new Date(aVal).getTime() : 0;
      bVal = bVal ? new Date(bVal).getTime() : 0;
    }
    const direction = sortConfig.value.direction === "asc" ? 1 : -1;
    if (aVal === bVal) return 0;
    return aVal > bVal ? direction : -direction;
  });

  return filtered;
});

const totalPages = computed(() =>
  Math.ceil(filteredDownlines.value.length / itemsPerPage.value)
);

const paginationStart = computed(
  () => (currentPage.value - 1) * itemsPerPage.value
);

const paginationEnd = computed(() =>
  Math.min(
    paginationStart.value + itemsPerPage.value,
    filteredDownlines.value.length
  )
);

const paginatedDownlines = computed(() => {
  return filteredDownlines.value.slice(
    paginationStart.value,
    paginationEnd.value
  );
});

watch([searchQuery], () => {
  currentPage.value = 1;
});

onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchDownlines();
    await fetchTeamStats();
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

/* Firefox scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #3b1c23 #15090e;
}
</style>
