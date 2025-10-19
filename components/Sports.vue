<template>
  <ClientOnly>
    <div class="bg-slate-50 py-4 px-4 sm:px-6 lg:px-8">
      <div
        class="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center max-lg:mb-2"
      >
        <div>
          <h2
            class="text-2xl font-bold text-gray-900 flex items-center max-lg:text-lg"
          >
            <Icon icon="mdi:soccer" class="mr-2 text-blue-600" />
            {{ $t("football_matches") }}
          </h2>
          <p class="text-sm text-gray-500 mt-1 max-lg:text-xs">
            {{ $t("football_matches_subtitle") }}
          </p>
        </div>

        <!-- <div class="mt-4 sm:mt-0 flex items-center">
          <span v-if="isLoading" class="text-blue-600 flex items-center">
            <Icon icon="mdi:loading" class="animate-spin mr-2" />
            Loading...
          </span>
          <span v-else-if="lastUpdated" class="text-sm text-gray-500">
            Updated: {{ formatDateTime(lastUpdated) }}
          </span>
          <button
            @click="fetchPremierLeagueData"
            class="ml-2 p-2 text-blue-600 rounded-full lg:hover:bg-blue-50"
            :disabled="isLoading"
          >
            <Icon icon="mdi:refresh" :class="{ 'animate-spin': isLoading }" />
          </button>
        </div> -->
      </div>

      <div
        v-if="isLoading && !matches.length"
        class="bg-white rounded-xl shadow-sm p-8 text-center"
      >
        <div
          class="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4"
        >
          <Icon icon="mdi:loading" class="text-3xl animate-spin" />
        </div>
        <h3 class="text-lg font-medium text-gray-800 mb-2">
          {{ $t("loading") }}
        </h3>
        <p class="text-gray-500">{{ $t("fetching_match_data") }}...</p>
      </div>

      <div
        v-else-if="error"
        class="bg-white rounded-xl shadow-sm p-8 text-center"
      >
        <div
          class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-4"
        >
          <Icon icon="mdi:alert" class="text-3xl" />
        </div>
        <h3 class="text-lg font-medium text-gray-800 mb-2">
          {{ $t("failed_to_fetch_data") }}
        </h3>
        <p class="text-gray-500">{{ error }}</p>
        <button
          @click="fetchPremierLeagueData"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg lg:hover:bg-blue-700 transition-colors"
        >
          {{ $t("try_again") }}
        </button>
      </div>

      <div v-else-if="matches.length > 0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="match in matches"
            :key="match.fixtureId"
            class="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 lg:hover:shadow-md transition-shadow"
          >
            <div class="bg-gray-50 px-4 py-2 border-b border-gray-100">
              <div class="flex justify-between items-center">
                <div class="flex items-center text-sm text-gray-600">
                  <Icon icon="mdi:stadium" class="mr-1 text-blue-500" />
                  <span>{{ match.venue?.name || $t("tbd") }}</span>
                </div>
                <div class="text-xs text-gray-500">
                  {{ match.venue?.city || "" }}
                </div>
              </div>
            </div>

            <div class="p-4 max-lg:p-3">
              <div class="flex items-center justify-between">
                <div class="w-5/12 flex flex-col items-center text-center px-2">
                  <div class="w-16 h-16 flex items-center justify-center mb-2">
                    <img
                      :src="match.teams.home.logo"
                      :alt="match.teams.home.name"
                      class="max-w-full max-h-full object-contain"
                      onerror="this.src='https://placehold.co/80/e2e8f0/475569?text=Team'"
                    />
                  </div>
                  <p
                    class="font-medium text-gray-800 line-clamp-2 max-lg:text-xs"
                  >
                    {{ match.teams.home.name }}
                  </p>
                </div>

                <div class="w-2/12 flex flex-col items-center justify-center">
                  <div
                    v-if="match.status.short !== 'NS'"
                    class="bg-red-100 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium mb-2 flex items-center gap-1"
                  >
                    <span class="relative flex h-2 w-2">
                      <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
                      ></span>
                      <span
                        class="relative inline-flex rounded-full h-2 w-2 bg-red-600"
                      ></span>
                    </span>
                    <span
                      v-if="['1H', '2H', 'ET'].includes(match.status.short)"
                    >
                      {{ match.status.elapsed
                      }}{{ match.status.extra ? `+${match.status.extra}` : ""
                      }}<span class="blink">'</span>
                    </span>
                    <span v-else>
                      {{ match.status.short }}
                    </span>
                  </div>

                  <div
                    v-if="match.status.short !== 'NS'"
                    class="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"
                  >
                    <div class="flex items-center justify-center gap-2">
                      <span class="text-xl font-bold text-gray-900">{{
                        match.goals.home ?? 0
                      }}</span>
                      <span class="text-sm text-gray-300">-</span>
                      <span class="text-xl font-bold text-gray-900">{{
                        match.goals.away ?? 0
                      }}</span>
                    </div>
                  </div>
                  <div v-else class="text-xl font-bold text-gray-300">vs</div>
                </div>

                <div class="w-5/12 flex flex-col items-center text-center px-2">
                  <div class="w-16 h-16 flex items-center justify-center mb-2">
                    <img
                      :src="match.teams.away.logo"
                      :alt="match.teams.away.name"
                      class="max-w-full max-h-full object-contain"
                      onerror="this.src='https://placehold.co/80/e2e8f0/475569?text=Team'"
                    />
                  </div>
                  <p
                    class="font-medium text-gray-800 line-clamp-2 max-lg:text-xs"
                  >
                    {{ match.teams.away.name }}
                  </p>
                </div>
              </div>

              <div
                class="text-xs text-center text-gray-500 mt-4 pt-3 border-t border-gray-100 max-lg:mt-2"
              >
                {{ formatDate(match.date) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="bg-white rounded-xl shadow-sm p-8 text-center">
        <div
          class="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4"
        >
          <Icon icon="mdi:calendar" class="text-3xl" />
        </div>
        <h3 class="text-lg font-medium text-gray-800 mb-2">
          {{ $t("no_upcoming_matches") }}
        </h3>
        <p class="text-gray-500">
          {{ $t("no_matches_scheduled") }}
        </p>
        <button
          @click="fetchPremierLeagueData"
          class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg lg:hover:bg-blue-700 transition-colors"
        >
          {{ $t("refresh") }}
        </button>
      </div>

      <!-- <div
        v-if="refreshInterval > 0"
        class="mt-4 text-center text-sm text-gray-500 flex items-center justify-center gap-2"
      >
        <Icon icon="mdi:clock-outline" />
        Live matches are automatically refreshed every
        {{ refreshInterval }} seconds
      </div> -->
    </div>
  </ClientOnly>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const pageLoading = useState("pageLoading");
const { get } = useApiEndpoint();
const matches = ref([]);
const isLoading = ref(true);
const error = ref(null);
const lastUpdated = ref(null);
const refreshInterval = ref(0);
let refreshTimer = null;

const fetchPremierLeagueData = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const { data } = await get("premier-league");
    if (data.success) {
      matches.value = data.data || [];
      lastUpdated.value = data.lastUpdated || new Date().toISOString();
    } else {
      throw new Error(data.message || "Failed to fetch Premier League data");
    }
  } catch (err) {
    error.value = err.message || "An error occurred while fetching match data";
    console.error("Error fetching Premier League data:", err);
  } finally {
    isLoading.value = false;
  }
};

const autoRefreshData = async () => {
  try {
    const { data } = await get("premier-league");
    if (data.success) {
      matches.value = data.data || [];
      lastUpdated.value = data.lastUpdated || new Date().toISOString();
    }
  } catch (err) {
    console.error("Error during auto-refresh:", err);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date
    .toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

onMounted(async () => {
  try {
    await fetchPremierLeagueData();
    const hasLiveMatches = matches.value.some((match) => match.isInplay);
    if (hasLiveMatches) {
      refreshTimer = setInterval(() => {
        fetchPremierLeagueData();
      }, 15 * 1000);
    }
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
  }
});
</script>

<style scoped>
.blink {
  animation: blink 1s linear infinite;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
