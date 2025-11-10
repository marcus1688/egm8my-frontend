<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-lg font-bold max-lg:text-base">{{ $t("downline") }}</h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("track_and_manage") }}
        </p>
      </div>

      <div>
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 max-lg:gap-3 mb-6 max-lg:mb-4"
        >
          <div
            class="bg-gradient-to-r from-[#ff3344]/10 to-[#ff3344]/20 rounded-lg p-5 max-lg:p-4 border border-[#ff3344]/30 shadow-lg shadow-red-500/10"
          >
            <div class="flex items-center justify-between mb-2 max-lg:mb-1.5">
              <div class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ statsData?.all?.registeredUsers || 0 }}
              </div>
              <div
                class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-[#ff3344] rounded-full flex items-center justify-center"
              >
                <Icon
                  icon="mingcute:user-add-fill"
                  class="w-6 h-6 max-lg:w-5 max-lg:h-5 text-white"
                />
              </div>
            </div>
            <div class="text-[#ff3344] font-medium max-lg:text-sm">
              {{ $t("total_downlines") }}
            </div>
          </div>

          <div
            class="bg-gradient-to-r from-green-500/10 to-green-500/20 rounded-lg p-5 max-lg:p-4 border border-green-500/30 shadow-lg shadow-green-500/10"
          >
            <div class="flex items-center justify-between mb-2 max-lg:mb-1.5">
              <div class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ statsData?.direct?.registeredUsers || 0 }}
              </div>
              <div
                class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-green-600 rounded-full flex items-center justify-center"
              >
                <Icon
                  icon="mdi:user-check"
                  class="w-6 h-6 max-lg:w-5 max-lg:h-5 text-white"
                />
              </div>
            </div>
            <div class="text-green-400 font-medium max-lg:text-sm">
              {{ $t("direct_downlines") }}
            </div>
          </div>

          <div
            class="bg-gradient-to-r from-purple-500/10 to-purple-500/20 rounded-lg p-5 max-lg:p-4 border border-purple-500/30 shadow-lg shadow-purple-500/10"
          >
            <div class="flex items-center justify-between mb-2 max-lg:mb-1.5">
              <div class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ statsData?.indirect?.registeredUsers || 0 }}
              </div>
              <div
                class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-purple-600 rounded-full flex items-center justify-center"
              >
                <Icon
                  icon="fluent:people-team-20-filled"
                  class="w-6 h-6 max-lg:w-5 max-lg:h-5 text-white"
                />
              </div>
            </div>
            <div class="text-purple-400 font-medium max-lg:text-sm">
              {{ $t("indirect_downlines") }}
            </div>
          </div>
        </div>

        <div class="relative flex-grow max-w-md mb-6 max-lg:mb-4">
          <Icon
            icon="mdi:search"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] max-lg:w-4 max-lg:h-4"
          />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('search_by_username')"
            class="w-full bg-[#15090e]/50 text-[#f0eaea] pl-10 max-lg:pl-9 pr-4 max-lg:pr-3 py-2 max-lg:py-1.5 rounded-lg border border-[#3b1c23] focus:border-[#ff3344] focus:outline-none focus:ring-2 focus:ring-[#ff3344]/50 placeholder-[#b37a7a] max-lg:text-sm"
          />
        </div>

        <div
          class="bg-[#15090e]/50 rounded-xl border border-[#3b1c23] overflow-hidden shadow-lg shadow-red-500/20 mb-6 max-lg:mb-4"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-center text-nowrap">
              <thead>
                <tr class="bg-[#241017]/80 border-b border-[#3b1c23]">
                  <th
                    v-for="header in tableHeaders"
                    :key="header.key"
                    @click="handleSort(header.key)"
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-xs max-lg:text-[10px] font-medium text-[#b37a7a] uppercase cursor-pointer lg:hover:bg-[#15090e]/50 transition-colors"
                  >
                    <div class="flex items-center justify-center gap-1">
                      {{ header.label }}
                      <div v-if="header.sortable">
                        <Icon
                          :icon="
                            sortConfig.key === header.key
                              ? sortConfig.direction === 'asc'
                                ? 'material-symbols:arrow-upward'
                                : 'material-symbols:arrow-downward'
                              : 'material-symbols:unfold-more'
                          "
                          class="w-4 h-4 max-lg:w-3 max-lg:h-3"
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(member, index) in paginatedDownlines"
                  :key="member._id"
                  :class="[
                    'border-b border-[#3b1c23] lg:hover:bg-[#ff3344]/10 transition-colors text-xs max-lg:text-[10px]',
                    index % 2 === 0 ? 'bg-[#15090e]/30' : 'bg-[#15090e]/50',
                  ]"
                >
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-[#f0eaea] uppercase font-medium"
                  >
                    {{ member.username }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-[#b37a7a]"
                  >
                    {{ member.viplevel }}
                  </td>
                  <!-- <td class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-[#b37a7a]">
                    {{ member.totalturnover }}
                  </td> -->
                  <td class="px-4 max-lg:px-3 py-3 max-lg:py-2.5">
                    <span
                      class="px-2 max-lg:px-1.5 py-1 max-lg:py-0.5 rounded-full text-xs max-lg:text-[10px] font-medium"
                      :class="
                        member.status
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      "
                    >
                      {{ member.status ? $t("active") : $t("inactive") }}
                    </span>
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-[#b37a7a]"
                  >
                    {{ formatDate(member.lastdepositdate) }}
                  </td>
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-[#b37a7a]"
                  >
                    {{ formatDate(member.createdAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            v-if="paginatedDownlines.length === 0"
            class="py-16 max-lg:py-12"
          >
            <div class="flex flex-col items-center">
              <div
                class="w-20 h-20 max-lg:w-16 max-lg:h-16 bg-[#ff3344]/20 rounded-full flex items-center justify-center mb-4 max-lg:mb-3"
              >
                <Icon
                  icon="mdi:account-group"
                  class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-[#ff3344]"
                />
              </div>
              <h3 class="text-[#f0eaea] font-medium mb-1 max-lg:text-sm">
                {{ $t("no_downline_found") }}
              </h3>
              <p
                class="text-[#b37a7a] text-sm max-lg:text-xs mb-6 max-lg:mb-4 max-lg:px-4 text-center"
              >
                {{ $t("start_sharing") }}
              </p>
              <button
                @click="$router.push('/myaccount/referral')"
                class="px-6 max-lg:px-4 py-2 max-lg:py-1.5 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white rounded-lg lg:hover:brightness-110 transition-all flex items-center gap-2 max-lg:text-sm"
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

        <!-- Pagination -->
        <div
          v-if="paginatedDownlines.length > 0"
          class="flex justify-between items-center gap-4 px-2 max-lg:flex-col max-lg:items-end"
        >
          <div class="text-[#b37a7a] text-sm max-lg:text-xs max-lg:hidden">
            {{
              $t("showing_entries", {
                start: paginationStart + 1,
                end: paginationEnd,
                total: filteredDownlines.length,
              })
            }}
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="px-3 max-lg:px-2 py-2 max-lg:py-1.5 rounded-lg border border-[#3b1c23] bg-[#15090e]/50 text-[#b37a7a] shadow-sm transition-colors lg:hover:bg-[#15090e]/70 disabled:bg-[#15090e]/30 disabled:text-[#b37a7a]/50 disabled:cursor-not-allowed"
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
                'w-8 h-8 max-lg:w-7 max-lg:h-7 flex items-center justify-center rounded-lg font-medium cursor-pointer text-sm max-lg:text-xs',
                currentPage === page
                  ? 'bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white'
                  : 'bg-[#15090e]/50 text-[#b37a7a] border border-[#3b1c23] lg:hover:bg-[#15090e]/70',
              ]"
            >
              {{ page }}
            </span>

            <button
              @click="currentPage++"
              :disabled="currentPage === totalPages"
              class="px-3 max-lg:px-2 py-2 max-lg:py-1.5 rounded-lg border border-[#3b1c23] bg-[#15090e]/50 text-[#b37a7a] shadow-sm transition-colors lg:hover:bg-[#15090e]/70 disabled:bg-[#15090e]/30 disabled:text-[#b37a7a]/50 disabled:cursor-not-allowed"
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
  </UserAccountLayout>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";
import moment from "moment-timezone";

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
  // { key: "totalturnover", label: "Total Turnover", sortable: true },
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
      downlines.value = data.data.downlines;
    }
  } catch (error) {
    console.error("Error fetching downlines:", error);
  } finally {
    isLoading.value = false;
  }
};

const filteredDownlines = computed(() => {
  if (!downlines.value) return [];

  // Only use direct downlines
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
