<template>
  <section class="pb-6 bg-white">
    <div class="mx-auto containerWid">
      <div class="rounded-lg overflow-hidden shadow-md border border-gray-200">
        <div
          class="bg-gradient-to-r from-blue-600 to-indigo-700 p-3 flex justify-between items-center"
        >
          <div class="flex items-center gap-2">
            <i class="bi bi-trophy text-yellow-300"></i>
            <h3 class="text-white font-bold">
              {{ $t("weekly_turnover_leaderboard") }}
            </h3>
          </div>
          <div
            class="bg-blue-500 text-white text-xs rounded-lg px-3 py-1 font-medium max-lg:hidden"
          >
            {{ formatDatePeriod(metadata.startDate, metadata.endDate) }}
          </div>
        </div>

        <div
          class="lg:hidden bg-gray-50 border-b border-gray-200 p-2 text-center"
        >
          <div class="text-indigo-700 text-xs font-medium inline-block">
            {{ formatDatePeriod(metadata.startDate, metadata.endDate) }}
          </div>
        </div>

        <div class="overflow-hidden">
          <div
            v-if="isLoading"
            class="py-16 flex flex-col items-center justify-center"
          >
            <div
              class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"
            ></div>
            <p class="text-gray-500">{{ $t("loading") }}...</p>
          </div>

          <div v-else-if="error" class="py-16 text-center">
            <div
              class="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center text-red-500 mb-4"
            >
              <i class="bi bi-exclamation-triangle text-2xl"></i>
            </div>
            <h4 class="text-xl font-medium text-gray-800 mb-2">
              {{ $t("error") }}
            </h4>
            <p class="text-gray-600 max-w-md mx-auto">{{ error }}</p>
            <button
              @click="fetchLeaderboardData"
              class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg lg:hover:bg-blue-600 transition-colors"
            >
              {{ $t("try_again") }}
            </button>
          </div>

          <div v-else-if="!leaderboardData.length" class="py-16 text-center">
            <div
              class="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-500 mb-4"
            >
              <i class="bi bi-info-circle text-2xl"></i>
            </div>
            <h4 class="text-xl font-medium text-gray-800 mb-2">
              {{ $t("no_data_available") }}
            </h4>
            <p class="text-gray-600 max-w-md mx-auto">
              {{ $t("no_data_message") }}
            </p>
          </div>

          <div v-else>
            <div class="grid grid-cols-1 divide-y divide-gray-100">
              <div
                v-for="(user, index) in leaderboardData"
                :key="user.username"
              >
                <div
                  :class="[
                    'p-4 flex items-center gap-3 transition-colors',
                    index < 3
                      ? 'bg-gradient-to-r'
                      : index % 2 === 0
                      ? 'bg-white'
                      : 'bg-gray-50',
                    index === 0 ? 'from-amber-50 to-amber-100' : '',
                    index === 1 ? 'from-slate-50 to-slate-100' : '',
                    index === 2 ? 'from-orange-50 to-orange-100' : '',
                    'lg:hover:bg-blue-50',
                  ]"
                >
                  <div
                    :class="[
                      'flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shadow-sm',
                      index === 0
                        ? 'bg-gradient-to-br from-amber-400 to-amber-600'
                        : '',
                      index === 1
                        ? 'bg-gradient-to-br from-slate-400 to-slate-600'
                        : '',
                      index === 2
                        ? 'bg-gradient-to-br from-orange-400 to-orange-600'
                        : '',
                      index > 2
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                        : '',
                    ]"
                  >
                    <span v-if="index > 2">{{ index + 1 }}</span>
                    <i
                      v-else-if="index === 0"
                      class="bi bi-trophy-fill text-yellow-200"
                    ></i>
                    <i
                      v-else-if="index === 1"
                      class="bi bi-trophy text-white"
                    ></i>
                    <i
                      v-else-if="index === 2"
                      class="bi bi-award text-white"
                    ></i>
                  </div>
                  <div class="flex-grow min-w-0">
                    <div class="font-medium text-gray-800 truncate">
                      {{ maskUsername(user.username) }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ $t("player_id") }}
                    </div>
                  </div>
                  <div class="text-right flex-shrink-0">
                    <div class="font-bold text-blue-600">
                      MYR {{ formatNumber(user.totalValidTurnover) }}
                    </div>
                    <div class="text-xs text-gray-500">
                      {{ $t("valid_turnover") }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-gray-50 border-t border-gray-200 p-3 text-center">
              <div
                class="text-sm text-gray-500 flex items-center justify-center gap-2 max-lg:text-xs"
              >
                <i class="bi bi-info-circle"></i>
                <span>{{ $t("leaderboard_update_message") }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const pageLoading = useState("pageLoading");
const { post, get } = useApiEndpoint();
const isLoading = ref(true);
const error = ref(null);
const leaderboardData = ref([]);
const metadata = ref({
  startDate: "",
  endDate: "",
  daysIncluded: [],
  totalUsers: 0,
});

const mockData = {
  success: true,
  metadata: {
    startDate: "2025-05-12",
    endDate: "2025-05-18",
    daysIncluded: [
      "2025-05-12",
      "2025-05-13",
      "2025-05-14",
      "2025-05-15",
      "2025-05-16",
      "2025-05-17",
      "2025-05-18",
    ],
    totalUsers: 20,
  },
  data: [
    { username: "Malaysia888", totalValidTurnover: 58750.25 },
    { username: "GoldenDragon", totalValidTurnover: 42680.5 },
    { username: "LuckyTiger", totalValidTurnover: 35920.75 },
    { username: "WinnerKL", totalValidTurnover: 29475.0 },
    { username: "Fortune888", totalValidTurnover: 24320.5 },
    { username: "RoyalPlayer", totalValidTurnover: 18650.25 },
    { username: "LuckyMY", totalValidTurnover: 15780.0 },
    { username: "VIPGamer", totalValidTurnover: 12450.75 },
    { username: "MasterBet", totalValidTurnover: 9875.5 },
    { username: "DragonWin", totalValidTurnover: 7680.25 },
    { username: "LuckyDragon", totalValidTurnover: 6890.5 },
    { username: "FortuneKing", totalValidTurnover: 5980.75 },
    { username: "BigWinner", totalValidTurnover: 5120.0 },
    { username: "GoldenLion", totalValidTurnover: 4750.25 },
    { username: "TopBettor", totalValidTurnover: 4380.5 },
    { username: "RichPlayer", totalValidTurnover: 3920.75 },
    { username: "VIPKing", totalValidTurnover: 3650.0 },
    { username: "MasterWin", totalValidTurnover: 3250.5 },
    { username: "DragonPro", totalValidTurnover: 2890.75 },
    { username: "LuckyWinner", totalValidTurnover: 2580.25 },
  ],
};

const formatDatePeriod = (start, end) => {
  if (!start || !end) return "";
  const startDate = new Date(start);
  const endDate = new Date(end);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const startMonth = monthNames[startDate.getMonth()];
  const endMonth = monthNames[endDate.getMonth()];
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const year = endDate.getFullYear();
  if (startDate.getMonth() === endDate.getMonth()) {
    return `${startMonth} ${startDay} - ${endDay}, ${year}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
};

const formatNumber = (value) => {
  if (!value && value !== 0) return "0.00";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const maskUsername = (username) => {
  if (!username || username.length <= 3) return username;
  const firstPart = username.substring(0, 3);
  const maskLength = username.length - 3;
  const mask = "*".repeat(maskLength);
  return `${firstPart}${mask}`;
};

const fetchLeaderboardData = async () => {
  isLoading.value = true;
  error.value = null;
  try {
    const { data } = await get("weeklyturnover");
    if (data && data.success && data.data && data.data.length > 0) {
      leaderboardData.value = data.data.slice(0, 20);
      if (data.metadata) {
        metadata.value = data.metadata;
      } else {
        metadata.value = {
          startDate: "",
          endDate: "",
          daysIncluded: [],
          totalUsers: data.data.length,
        };
      }
    } else {
      console.log("Using mock data since API returned no data");
      leaderboardData.value = mockData.data;
      metadata.value = mockData.metadata;
    }
  } catch (err) {
    console.error("Error fetching leaderboard data:", err);
    error.value = err.message || $t("failed_fetch_leaderboard");
    leaderboardData.value = mockData.data;
    metadata.value = mockData.metadata;
    error.value = null;
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  try {
    await fetchLeaderboardData();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
