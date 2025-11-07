<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg">
          {{ $t("downline") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("track_and_manage") }}
        </p>
      </div>

      <div class="space-y-4">
        <!-- Stats Overview Card -->
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-lg p-5 max-lg:p-4"
        >
          <h3
            class="font-semibold text-[#f0eaea] mb-4 text-sm flex items-center gap-2"
          >
            <Icon icon="mdi:chart-box" class="w-5 h-5 text-[#ff3344]" />
            {{ $t("team_overview") }}
          </h3>

          <div class="grid grid-cols-3 gap-4 max-lg:gap-3">
            <div class="text-center">
              <div
                class="text-3xl font-bold text-[#ff3344] mb-1 max-lg:text-2xl"
              >
                {{ statsData?.all?.registeredUsers || 0 }}
              </div>
              <div class="text-xs text-[#b37a7a]">{{ $t("total") }}</div>
            </div>
            <div class="text-center border-x border-[#3b1c23]">
              <div
                class="text-3xl font-bold text-green-400 mb-1 max-lg:text-2xl"
              >
                {{ statsData?.direct?.registeredUsers || 0 }}
              </div>
              <div class="text-xs text-[#b37a7a]">{{ $t("direct") }}</div>
            </div>
            <div class="text-center">
              <div
                class="text-3xl font-bold text-purple-400 mb-1 max-lg:text-2xl"
              >
                {{ statsData?.indirect?.registeredUsers || 0 }}
              </div>
              <div class="text-xs text-[#b37a7a]">{{ $t("indirect") }}</div>
            </div>
          </div>
        </div>

        <!-- Search & Filter Bar -->
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
                class="w-full bg-[#15090e] text-[#f0eaea] pl-10 pr-4 py-2.5 rounded-lg border border-[#3b1c23] focus:border-[#ff3344] focus:outline-none transition-colors placeholder-[#b37a7a] text-sm"
              />
            </div>
            <div
              class="flex items-center gap-2 text-sm text-[#b37a7a] max-lg:w-full max-lg:justify-between"
            >
              <span
                >{{ $t("showing") }} {{ filteredDownlines.length }}
                {{ $t("members") }}</span
              >
            </div>
          </div>
        </div>

        <!-- Members List -->
        <div class="space-y-2">
          <!-- Desktop: Table View -->
          <div
            class="hidden md:block bg-[#241017] border border-[#3b1c23] rounded-lg overflow-hidden"
          >
            <table class="w-full">
              <thead>
                <tr class="bg-[#15090e] border-b border-[#3b1c23]">
                  <th
                    v-for="header in tableHeaders"
                    :key="header.key"
                    @click="handleSort(header.key)"
                    class="px-4 py-3 text-left text-xs font-semibold text-[#f0eaea] uppercase cursor-pointer lg:hover:bg-[#241017] transition-colors"
                  >
                    <div class="flex items-center gap-2">
                      {{ header.label }}
                      <Icon
                        v-if="header.sortable"
                        :icon="
                          sortConfig.key === header.key
                            ? sortConfig.direction === 'asc'
                              ? 'mdi:arrow-up'
                              : 'mdi:arrow-down'
                            : 'mdi:unfold-more-horizontal'
                        "
                        class="w-4 h-4 text-[#b37a7a]"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="member in paginatedDownlines"
                  :key="member._id"
                  class="border-b border-[#3b1c23] lg:hover:bg-[#15090e]/30 transition-colors"
                >
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                      <div
                        class="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center text-white font-bold text-sm"
                      >
                        {{ member.username.substring(0, 2).toUpperCase() }}
                      </div>
                      <span
                        class="text-sm font-semibold text-[#f0eaea] uppercase"
                      >
                        {{ member.username }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <span
                      class="inline-flex items-center px-2.5 py-1 bg-[#ff3344]/10 border border-[#ff3344]/30 rounded text-xs font-medium text-[#ff3344]"
                    >
                      {{ member.viplevel }}
                    </span>
                  </td>
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-2">
                      <div
                        class="w-2 h-2 rounded-full"
                        :class="member.status ? 'bg-green-400' : 'bg-red-400'"
                      ></div>
                      <span
                        class="text-sm"
                        :class="
                          member.status ? 'text-green-400' : 'text-red-400'
                        "
                      >
                        {{ member.status ? $t("active") : $t("inactive") }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-4 text-sm text-[#b37a7a]">
                    {{ formatDate(member.lastdepositdate) }}
                  </td>
                  <td class="px-4 py-4 text-sm text-[#b37a7a]">
                    {{ formatDate(member.createdAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile: Card View -->
          <div class="md:hidden space-y-2">
            <div
              v-for="member in paginatedDownlines"
              :key="member._id"
              class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4"
            >
              <div class="flex items-start justify-between mb-3">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center text-white font-bold"
                  >
                    {{ member.username.substring(0, 2).toUpperCase() }}
                  </div>
                  <div>
                    <p
                      class="text-sm font-semibold text-[#f0eaea] uppercase mb-1"
                    >
                      {{ member.username }}
                    </p>
                    <span
                      class="inline-flex items-center px-2 py-0.5 bg-[#ff3344]/10 border border-[#ff3344]/30 rounded text-xs text-[#ff3344]"
                    >
                      {{ member.viplevel }}
                    </span>
                  </div>
                </div>
                <div class="flex items-center gap-1.5">
                  <div
                    class="w-2 h-2 rounded-full"
                    :class="member.status ? 'bg-green-400' : 'bg-red-400'"
                  ></div>
                  <span
                    class="text-xs"
                    :class="member.status ? 'text-green-400' : 'text-red-400'"
                  >
                    {{ member.status ? $t("active") : $t("inactive") }}
                  </span>
                </div>
              </div>
              <div
                class="grid grid-cols-2 gap-3 pt-3 border-t border-[#3b1c23]"
              >
                <div>
                  <p class="text-xs text-[#b37a7a] mb-0.5">
                    {{ $t("last_deposit") }}
                  </p>
                  <p class="text-sm text-[#f0eaea]">
                    {{ formatDate(member.lastdepositdate) }}
                  </p>
                </div>
                <div>
                  <p class="text-xs text-[#b37a7a] mb-0.5">
                    {{ $t("joined") }}
                  </p>
                  <p class="text-sm text-[#f0eaea]">
                    {{ formatDate(member.createdAt) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="paginatedDownlines.length === 0"
            class="bg-[#241017] border border-[#3b1c23] rounded-lg py-16"
          >
            <div class="flex flex-col items-center">
              <div
                class="w-20 h-20 rounded-full bg-[#ff3344]/10 flex items-center justify-center mb-4"
              >
                <Icon
                  icon="mdi:account-group-outline"
                  class="w-10 h-10 text-[#ff3344]"
                />
              </div>
              <h3 class="text-[#f0eaea] font-bold mb-2 text-base">
                {{ $t("no_downline_found") }}
              </h3>
              <p class="text-[#b37a7a] text-sm mb-6 text-center max-w-sm px-4">
                {{ $t("start_sharing") }}
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
          v-if="paginatedDownlines.length > 0"
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
