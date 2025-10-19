<template>
  <UserAccountLayout>
    <div class="bg-white text-gray-800 rounded-lg">
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-lg font-bold max-lg:text-base">{{ $t("downline") }}</h1>
        <p class="text-gray-500 text-sm max-lg:text-xs">
          {{ $t("track_and_manage") }}
        </p>
      </div>

      <div>
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-4 max-lg:gap-3 mb-6 max-lg:mb-4"
        >
          <div
            class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5 max-lg:p-4 border border-blue-200 shadow-sm"
          >
            <div class="flex items-center justify-between mb-2 max-lg:mb-1.5">
              <div class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ statsData?.all?.registeredUsers || 0 }}
              </div>
              <div
                class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-blue-600 rounded-full flex items-center justify-center"
              >
                <Icon
                  icon="mingcute:user-add-fill"
                  class="w-6 h-6 max-lg:w-5 max-lg:h-5 text-white"
                />
              </div>
            </div>
            <div class="text-blue-600 font-medium max-lg:text-sm">
              {{ $t("total_downlines") }}
            </div>
          </div>

          <div
            class="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-5 max-lg:p-4 border border-green-200 shadow-sm"
          >
            <div class="flex items-center justify-between mb-2 max-lg:mb-1.5">
              <div class="text-2xl max-lg:text-xl font-bold text-gray-800">
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
            <div class="text-green-600 font-medium max-lg:text-sm">
              {{ $t("direct_downlines") }}
            </div>
          </div>

          <div
            class="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-5 max-lg:p-4 border border-indigo-200 shadow-sm"
          >
            <div class="flex items-center justify-between mb-2 max-lg:mb-1.5">
              <div class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ statsData?.indirect?.registeredUsers || 0 }}
              </div>
              <div
                class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-indigo-600 rounded-full flex items-center justify-center"
              >
                <Icon
                  icon="fluent:people-team-20-filled"
                  class="w-6 h-6 max-lg:w-5 max-lg:h-5 text-white"
                />
              </div>
            </div>
            <div class="text-indigo-600 font-medium max-lg:text-sm">
              {{ $t("indirect_downlines") }}
            </div>
          </div>
        </div>

        <div class="relative flex-grow max-w-md mb-6 max-lg:mb-4">
          <Icon
            icon="mdi:search"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 max-lg:w-4 max-lg:h-4"
          />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('search_by_username')"
            class="w-full bg-white text-gray-800 pl-10 max-lg:pl-9 pr-4 max-lg:pr-3 py-2 max-lg:py-1.5 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 max-lg:text-sm"
          />
        </div>

        <div
          class="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm mb-6 max-lg:mb-4"
        >
          <div class="overflow-x-auto">
            <table class="w-full text-center text-nowrap">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th
                    v-for="header in tableHeaders"
                    :key="header.key"
                    @click="handleSort(header.key)"
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-xs max-lg:text-[10px] font-medium text-gray-600 uppercase cursor-pointer lg:hover:bg-gray-100"
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
                    'border-b border-gray-200 lg:hover:bg-blue-50 transition-colors text-xs max-lg:text-[10px]',
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
                  ]"
                >
                  <td
                    class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-gray-800 uppercase"
                  >
                    {{ member.username }}
                  </td>
                  <td class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-gray-700">
                    {{ member.viplevel }}
                  </td>
                  <!-- <td class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-gray-700">
                    {{ member.totalturnover }}
                  </td> -->
                  <td class="px-4 max-lg:px-3 py-3 max-lg:py-2.5">
                    <span
                      class="px-2 max-lg:px-1.5 py-1 max-lg:py-0.5 rounded-full text-xs max-lg:text-[10px] font-medium"
                      :class="
                        member.status
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      "
                    >
                      {{ member.status ? $t("active") : $t("inactive") }}
                    </span>
                  </td>
                  <td class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-gray-700">
                    {{ formatDate(member.lastdepositdate) }}
                  </td>
                  <td class="px-4 max-lg:px-3 py-3 max-lg:py-2.5 text-gray-700">
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
                class="w-20 h-20 max-lg:w-16 max-lg:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 max-lg:mb-3"
              >
                <Icon
                  icon="mdi:account-group"
                  class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-gray-400"
                />
              </div>
              <h3 class="text-gray-500 font-medium mb-1 max-lg:text-sm">
                {{ $t("no_downline_found") }}
              </h3>
              <p
                class="text-gray-400 text-sm max-lg:text-xs mb-6 max-lg:mb-4 max-lg:px-4 text-center"
              >
                {{ $t("start_sharing") }}
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

        <!-- Pagination -->
        <div
          v-if="paginatedDownlines.length > 0"
          class="flex justify-between items-center gap-4 px-2 max-lg:flex-col max-lg:items-end"
        >
          <div class="text-gray-500 text-sm max-lg:text-xs max-lg:hidden">
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
