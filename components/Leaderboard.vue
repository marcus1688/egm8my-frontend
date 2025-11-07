<template>
  <section
    v-if="leaderboardData.length > 0"
    class="py-4 max-lg:hidden containerWid max-lg:py-2"
  >
    <!-- Header Section -->
    <div class="my-4">
      <div class="flex items-center justify-between mb-1">
        <h2
          class="text-2xl font-bold text-[#f0eaea] max-xl:text-xl max-md:text-base"
        >
          {{ $t("weekly_turnover_leaderboard") }}
        </h2>
        <div
          class="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-[#ff3344] to-[#cc2a3a] text-white text-xs rounded-full font-bold shadow-lg shadow-[#ff3344]/30 max-lg:text-[10px] max-lg:px-2 max-lg:py-1"
        >
          <i class="bi bi-calendar-week"></i>
          <span>{{
            formatDatePeriod(metadata.startDate, metadata.endDate)
          }}</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <p class="text-sm text-[#b37a7a] max-lg:text-xs">
          {{ $t("top_players_weekly_rankings") }}
        </p>
        <div
          class="flex-1 h-px bg-gradient-to-r from-[#3b1c23] to-transparent"
        ></div>
      </div>
    </div>

    <div
      class="bg-[#241017] rounded-xl border border-[#3b1c23] overflow-hidden shadow-lg"
    >
      <div>
        <div class="overflow-y-auto max-h-[600px] leaderboard-scroll">
          <div
            v-for="(user, index) in leaderboardData"
            :key="user.username"
            :class="[
              'px-6 py-4 flex items-center gap-4 transition-colors max-lg:px-4 max-lg:py-3 max-lg:gap-3',
              index % 2 === 0 ? 'bg-[#1A0D13]' : 'bg-[#241017]',
              'lg:hover:bg-[#1f0e13]',
            ]"
          >
            <div
              :class="[
                'w-10 h-10 max-sm:w-8 max-sm:h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 max-lg:w-9 max-lg:h-9 max-lg:text-sm  max-sm:text-xs',
                index === 0 ? 'bg-[#fbbf24] text-white' : '',
                index === 1 ? 'bg-[#e5e7eb] text-[#1a1a1a]' : '',
                index === 2 ? 'bg-[#fb923c] text-white' : '',
                index > 2
                  ? 'bg-[#15090e] text-[#f0eaea] border border-[#3b1c23]'
                  : '',
              ]"
            >
              <i v-if="index === 0" class="bi bi-trophy-fill"></i>
              <i v-else-if="index === 1" class="bi bi-trophy-fill"></i>
              <i v-else-if="index === 2" class="bi bi-trophy-fill"></i>
              <span v-else>{{ index + 1 }}</span>
            </div>

            <div class="flex items-center gap-3 min-w-0 flex-1">
              <div class="min-w-0 flex-1">
                <div
                  class="font-semibold text-[#f0eaea] truncate max-lg:text-sm max-sm:text-xs"
                >
                  {{ maskUsername(user.username) }}
                </div>
                <div class="text-xs text-[#b37a7a] max-lg:text-[10px]">
                  {{ $t("player_id") }}
                </div>
              </div>
            </div>

            <div class="text-right flex-shrink-0">
              <div
                :class="[
                  'font-bold text-lg max-lg:text-base max-sm:text-sm',
                  index === 0 ? 'text-[#fbbf24]' : '',
                  index === 1 ? 'text-[#e5e7eb]' : '',
                  index === 2 ? 'text-[#fb923c]' : '',
                  index > 2 ? 'text-[#4ade80]' : '',
                ]"
              >
                {{ formatNumber(user.totalValidTurnover) }}
              </div>
              <div class="text-xs text-[#b37a7a] max-lg:text-[10px]">MYR</div>
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-[#15090e] to-[#1a0a0f] border-t border-[#3b1c23] px-6 py-4 max-lg:px-4 max-lg:py-3"
        >
          <div
            class="flex items-center justify-center gap-2 text-xs text-[#b37a7a] max-lg:text-[10px]"
          >
            <i class="bi bi-info-circle text-[#ff3344]"></i>
            <span>{{ $t("leaderboard_update_message") }}</span>
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

/* Custom Scrollbar */
.leaderboard-scroll::-webkit-scrollbar {
  width: 8px;
}

.leaderboard-scroll::-webkit-scrollbar-track {
  background: #15090e;
  border-radius: 10px;
}

.leaderboard-scroll::-webkit-scrollbar-thumb {
  background: #3b1c23;
  border-radius: 10px;
}

.leaderboard-scroll::-webkit-scrollbar-thumb:hover {
  background: #ff3344;
}

/* Firefox */
.leaderboard-scroll {
  scrollbar-width: thin;
  scrollbar-color: #3b1c23 #15090e;
}
</style>
