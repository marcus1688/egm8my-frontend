<template>
  <ClientOnly>
    <div v-if="matches.length > 0" class="py-4 containerWid max-lg:py-2">
      <div class="my-4">
        <div class="flex items-center justify-between mb-1">
          <h2 class="text-2xl font-bold text-[#f0eaea] max-lg:text-xl">
            {{ $t("football_matches") }}
          </h2>
        </div>

        <div class="flex items-center gap-3">
          <p class="text-sm text-[#b37a7a] max-lg:text-xs">
            {{ $t("football_matches_subtitle") }}
          </p>
          <div
            class="flex-1 h-px bg-gradient-to-r from-[#3b1c23] to-transparent"
          ></div>
        </div>
      </div>

      <div>
        <!-- Desktop Grid (lg and above) -->
        <div class="hidden lg:grid grid-cols-3 gap-4">
          <div
            v-for="match in matches"
            :key="match.fixtureId"
            class="bg-[#241017] rounded-xl shadow-sm overflow-hidden border border-[#3b1c23] lg:hover:shadow-md lg:hover:border-[#4e252d] transition-all"
          >
            <div class="bg-[#15090e] px-4 py-2 border-b border-[#3b1c23]">
              <div class="flex justify-between items-center">
                <div class="flex items-center text-sm text-[#f0eaea]">
                  <Icon icon="mdi:stadium" class="mr-1 text-[#b37a7a]" />
                  <span>{{ match.venue?.name || $t("tbd") }}</span>
                </div>
                <div class="text-xs text-[#f0eaea]">
                  {{ match.venue?.city || "" }}
                </div>
              </div>
            </div>

            <div class="p-4 max-lg:p-3">
              <div class="flex items-center justify-between">
                <!-- 主队 -->
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
                    class="font-medium text-[#f0eaea] line-clamp-2 max-lg:text-xs h-10 flex items-center justify-center"
                  >
                    {{ match.teams.home.name }}
                  </p>
                </div>

                <div class="w-2/12 flex flex-col items-center justify-center">
                  <div
                    v-if="match.status.short !== 'NS'"
                    class="bg-[#2a0f14]/50 text-[#f0eaea] px-2 py-0.5 rounded-full text-xs font-medium mb-2 flex items-center gap-1 border border-[#3b1c23]"
                  >
                    <span class="relative flex h-2 w-2">
                      <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff3344] opacity-75"
                      ></span>
                      <span
                        class="relative inline-flex rounded-full h-2 w-2 bg-[#ff3344]"
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
                    class="bg-[#15090e] px-4 py-2 rounded-lg shadow-sm border border-[#3b1c23]"
                  >
                    <div class="flex items-center justify-center gap-2">
                      <span class="text-xl font-bold text-[#f0eaea]">{{
                        match.goals.home ?? 0
                      }}</span>
                      <span class="text-sm text-[#b37a7a]">-</span>
                      <span class="text-xl font-bold text-[#f0eaea]">{{
                        match.goals.away ?? 0
                      }}</span>
                    </div>
                  </div>
                  <div v-else class="text-xl font-bold text-[#b37a7a]">vs</div>
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
                    class="font-medium text-[#f0eaea] line-clamp-2 max-lg:text-xs h-10 flex items-center justify-center"
                  >
                    {{ match.teams.away.name }}
                  </p>
                </div>
              </div>

              <div
                class="text-xs text-center text-[#f0eaea] mt-4 pt-3 border-t border-[#3b1c23] max-lg:mt-2"
              >
                {{ formatDate(match.date) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Mobile/Tablet Swiper (below lg) -->
        <div class="lg:hidden relative">
          <swiper
            :modules="[Autoplay, Navigation, Pagination]"
            :slidesPerView="1"
            :spaceBetween="16"
            :loop="false"
            :pagination="{
              clickable: true,
            }"
            :autoplay="false"
            :navigation="{
              nextEl: '.match-button-next',
              prevEl: '.match-button-prev',
            }"
            :breakpoints="{
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
            }"
            class="matches-swiper pb-10"
          >
            <swiper-slide v-for="match in matches" :key="match.fixtureId">
              <div
                class="bg-[#241017] rounded-xl shadow-sm overflow-hidden border border-[#3b1c23] h-full"
              >
                <div class="bg-[#15090e] px-4 py-2 border-b border-[#3b1c23]">
                  <div class="flex justify-between items-center">
                    <div class="flex items-center text-sm text-[#f0eaea]">
                      <Icon icon="mdi:stadium" class="mr-1 text-[#b37a7a]" />
                      <span>{{ match.venue?.name || $t("tbd") }}</span>
                    </div>
                    <div class="text-xs text-[#f0eaea]">
                      {{ match.venue?.city || "" }}
                    </div>
                  </div>
                </div>

                <div class="p-4 max-lg:p-3">
                  <div class="flex items-center justify-between">
                    <!-- 主队 -->
                    <div
                      class="w-5/12 flex flex-col items-center text-center px-2"
                    >
                      <div
                        class="w-16 h-16 flex items-center justify-center mb-2"
                      >
                        <img
                          :src="match.teams.home.logo"
                          :alt="match.teams.home.name"
                          class="max-w-full max-h-full object-contain"
                          onerror="this.src='https://placehold.co/80/e2e8f0/475569?text=Team'"
                        />
                      </div>
                      <p
                        class="font-medium text-[#f0eaea] line-clamp-2 max-lg:text-xs h-10 flex items-center justify-center"
                      >
                        {{ match.teams.home.name }}
                      </p>
                    </div>

                    <div
                      class="w-2/12 flex flex-col items-center justify-center"
                    >
                      <div
                        v-if="match.status.short !== 'NS'"
                        class="bg-[#2a0f14]/50 text-[#f0eaea] px-2 py-0.5 rounded-full text-xs font-medium mb-2 flex items-center gap-1 border border-[#3b1c23]"
                      >
                        <span class="relative flex h-2 w-2">
                          <span
                            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff3344] opacity-75"
                          ></span>
                          <span
                            class="relative inline-flex rounded-full h-2 w-2 bg-[#ff3344]"
                          ></span>
                        </span>
                        <span
                          v-if="['1H', '2H', 'ET'].includes(match.status.short)"
                        >
                          {{ match.status.elapsed
                          }}{{
                            match.status.extra ? `+${match.status.extra}` : ""
                          }}<span class="blink">'</span>
                        </span>
                        <span v-else>
                          {{ match.status.short }}
                        </span>
                      </div>

                      <div
                        v-if="match.status.short !== 'NS'"
                        class="bg-[#15090e] px-4 py-2 rounded-lg shadow-sm border border-[#3b1c23]"
                      >
                        <div class="flex items-center justify-center gap-2">
                          <span class="text-xl font-bold text-[#f0eaea]">{{
                            match.goals.home ?? 0
                          }}</span>
                          <span class="text-sm text-[#b37a7a]">-</span>
                          <span class="text-xl font-bold text-[#f0eaea]">{{
                            match.goals.away ?? 0
                          }}</span>
                        </div>
                      </div>
                      <div v-else class="text-xl font-bold text-[#b37a7a]">
                        vs
                      </div>
                    </div>

                    <div
                      class="w-5/12 flex flex-col items-center text-center px-2"
                    >
                      <div
                        class="w-16 h-16 flex items-center justify-center mb-2"
                      >
                        <img
                          :src="match.teams.away.logo"
                          :alt="match.teams.away.name"
                          class="max-w-full max-h-full object-contain"
                          onerror="this.src='https://placehold.co/80/e2e8f0/475569?text=Team'"
                        />
                      </div>
                      <p
                        class="font-medium text-[#f0eaea] line-clamp-2 max-lg:text-xs h-10 flex items-center justify-center"
                      >
                        {{ match.teams.away.name }}
                      </p>
                    </div>
                  </div>

                  <div
                    class="text-xs text-center text-[#f0eaea] mt-4 pt-3 border-t border-[#3b1c23] max-lg:mt-2"
                  >
                    {{ formatDate(match.date) }}
                  </div>
                </div>
              </div>
            </swiper-slide>
          </swiper>

          <!-- Navigation Buttons -->
          <button
            class="match-button-prev max-md:hidden absolute top-1/2 -left-12 z-10 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#ff3344] transition-all duration-300 lg:hover:scale-110 lg:hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          >
            <i class="bi bi-chevron-left text-xl font-bold"></i>
          </button>
          <button
            class="match-button-next max-md:hidden absolute top-1/2 -right-12 z-10 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center text-[#ff3344] transition-all duration-300 lg:hover:scale-110 lg:hover:shadow-[0_0_20px_rgba(255,255,255,0.5)]"
          >
            <i class="bi bi-chevron-right text-xl font-bold"></i>
          </button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

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

/* Mobile Pagination */
@media (max-width: 1023px) {
  :deep(.matches-swiper .swiper-pagination) {
    bottom: 12px;
    display: flex;
    justify-content: center;
    gap: 6px;
  }

  :deep(.matches-swiper .swiper-pagination-bullet) {
    width: 8px;
    height: 8px;
    background: rgba(179, 122, 122, 0.5);
    opacity: 1;
    transition: all 0.3s;
    border-radius: 50%;
  }

  :deep(.matches-swiper .swiper-pagination-bullet-active) {
    background: #ff3344;
    width: 24px;
    border-radius: 4px;
  }
}

/* Desktop - Hide Pagination */
@media (min-width: 1024px) {
  :deep(.matches-swiper .swiper-pagination) {
    display: none;
  }
}
</style>
