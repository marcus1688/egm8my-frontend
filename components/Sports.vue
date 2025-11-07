<template>
  <ClientOnly>
    <div v-if="matches.length > 0" class="py-4 containerWid max-lg:py-2">
      <!-- Header Section -->
      <div class="my-4">
        <div class="flex items-center justify-between mb-1">
          <h2
            class="text-2xl font-bold text-[#f0eaea] max-xl:text-xl max-md:text-base"
          >
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

      <!-- Desktop Grid -->
      <div class="hidden lg:grid grid-cols-3 gap-4">
        <div
          v-for="match in matches"
          :key="match.fixtureId"
          class="bg-[#241017] rounded-xl shadow-lg overflow-hidden border border-[#3b1c23] transition-all duration-300"
        >
          <div
            class="bg-gradient-to-r from-[#15090e] to-[#1a0a0f] px-4 py-2.5 border-b border-[#3b1c23]"
          >
            <div class="flex justify-between items-center">
              <div class="flex items-center text-xs text-[#b37a7a]">
                <Icon icon="mdi:stadium" class="mr-1.5 text-sm" />
                <span class="font-medium">{{
                  match.venue?.name || $t("tbd")
                }}</span>
              </div>
              <div class="text-xs text-[#b37a7a] font-medium">
                {{ match.venue?.city || "" }}
              </div>
            </div>
          </div>

          <div class="p-4 max-lg:p-3">
            <!-- Live Status Badge -->
            <div
              v-if="match.status.short !== 'NS'"
              class="flex justify-center mb-4"
            >
              <div
                class="bg-gradient-to-r from-[#ff3344] to-[#cc2a3a] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-[#ff3344]/30"
              >
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
                  ></span>
                  <span
                    class="relative inline-flex rounded-full h-2 w-2 bg-white"
                  ></span>
                </span>
                <span v-if="['1H', '2H', 'ET'].includes(match.status.short)">
                  {{ match.status.elapsed
                  }}{{ match.status.extra ? `+${match.status.extra}` : ""
                  }}<span class="blink">'</span>
                </span>
                <span v-else>{{ match.status.short }}</span>
              </div>
            </div>

            <!-- Teams Grid -->
            <div class="grid grid-cols-12 gap-2 items-start">
              <!-- Home Team Column -->
              <div class="col-span-5 flex flex-col items-center">
                <div
                  class="w-20 h-20 flex items-center justify-center p-2 rounded-xl bg-[#1A0D13] mb-1"
                >
                  <img
                    :src="match.teams.home.logo"
                    :alt="match.teams.home.name"
                    class="w-full h-full object-contain"
                    onerror="this.src='https://placehold.co/80/e2e8f0/475569?text=Team'"
                  />
                </div>
                <p
                  class="font-semibold text-[#f0eaea] text-sm text-center line-clamp-2 leading-tight h-10 flex items-center justify-center"
                >
                  {{ match.teams.home.name }}
                </p>
              </div>

              <!-- VS or Score Column -->
              <div class="col-span-2 flex flex-col items-center justify-center">
                <div
                  v-if="match.status.short !== 'NS'"
                  class="bg-gradient-to-br from-[#1A0D13] to-[#15090e] px-4 py-3 rounded-xl shadow-md border border-[#3b1c23]"
                >
                  <div class="flex flex-col items-center justify-center gap-1">
                    <span class="text-2xl font-bold text-[#f0eaea]">{{
                      match.goals.home ?? 0
                    }}</span>
                    <span class="text-xs text-[#ff3344] font-bold">:</span>
                    <span class="text-2xl font-bold text-[#f0eaea]">{{
                      match.goals.away ?? 0
                    }}</span>
                  </div>
                </div>
                <div v-else class="w-14 mt-6">
                  <img
                    src="/images/VS Image/VS 3.png"
                    alt="VS"
                    class="w-full"
                  />
                </div>
              </div>

              <!-- Away Team Column -->
              <div class="col-span-5 flex flex-col items-center">
                <div
                  class="w-20 h-20 flex items-center justify-center p-2 rounded-xl bg-[#1A0D13] mb-1"
                >
                  <img
                    :src="match.teams.away.logo"
                    :alt="match.teams.away.name"
                    class="w-full h-full object-contain"
                    onerror="this.src='https://placehold.co/80/e2e8f0/475569?text=Team'"
                  />
                </div>
                <p
                  class="font-semibold text-[#f0eaea] text-sm text-center line-clamp-2 leading-tight h-10 flex items-center justify-center"
                >
                  {{ match.teams.away.name }}
                </p>
              </div>
            </div>

            <!-- Date/Time -->
            <div
              class="text-xs text-center text-[#b37a7a] pt-4 mt-4 border-t border-[#3b1c23] flex items-center justify-center gap-2"
            >
              <Icon icon="mdi:calendar-clock" class="text-sm text-[#ff3344]" />
              <span class="font-medium">{{ formatDate(match.date) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mobile/Tablet Swiper -->
      <div class="lg:hidden relative">
        <swiper
          :modules="[Autoplay, Navigation]"
          :slidesPerView="1"
          :spaceBetween="16"
          :loop="true"
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
          class="matches-swiper"
        >
          <swiper-slide v-for="match in matches" :key="match.fixtureId">
            <div
              class="bg-[#241017] rounded-xl shadow-lg overflow-hidden border border-[#3b1c23] h-full"
            >
              <!-- Match Header -->
              <div
                class="bg-gradient-to-r from-[#15090e] to-[#1a0a0f] px-4 py-2.5 border-b border-[#3b1c23]"
              >
                <div class="flex justify-between items-center">
                  <div class="flex items-center text-xs text-[#b37a7a]">
                    <Icon icon="mdi:stadium" class="mr-1.5 text-sm" />
                    <span class="font-medium">{{
                      match.venue?.name || $t("tbd")
                    }}</span>
                  </div>
                  <div class="text-xs text-[#b37a7a] font-medium">
                    {{ match.venue?.city || "" }}
                  </div>
                </div>
              </div>

              <!-- Match Content -->
              <div class="p-4">
                <!-- Live Status Badge -->
                <div
                  v-if="match.status.short !== 'NS'"
                  class="flex justify-center mb-3"
                >
                  <div
                    class="bg-gradient-to-r from-[#ff3344] to-[#cc2a3a] text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1"
                  >
                    <span class="relative flex h-1.5 w-1.5">
                      <span
                        class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
                      ></span>
                      <span
                        class="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"
                      ></span>
                    </span>
                    <span
                      v-if="['1H', '2H', 'ET'].includes(match.status.short)"
                    >
                      {{ match.status.elapsed
                      }}{{ match.status.extra ? `+${match.status.extra}` : ""
                      }}<span class="blink">'</span>
                    </span>
                    <span v-else>{{ match.status.short }}</span>
                  </div>
                </div>

                <!-- Teams Grid -->
                <div class="grid grid-cols-12 gap-2 items-start">
                  <!-- Home Team Column -->
                  <div class="col-span-5 flex flex-col items-center">
                    <div
                      class="w-14 h-14 flex items-center justify-center p-2 rounded-xl bg-[#1A0D13] mb-2"
                    >
                      <img
                        :src="match.teams.home.logo"
                        :alt="match.teams.home.name"
                        class="w-full h-full object-contain"
                        onerror="this.src='https://placehold.co/80/e2e8f0/475569?text=Team'"
                      />
                    </div>
                    <p
                      class="font-semibold text-[#f0eaea] text-xs text-center line-clamp-2 leading-tight h-9 flex items-center justify-center"
                    >
                      {{ match.teams.home.name }}
                    </p>
                  </div>

                  <!-- VS or Score Column -->
                  <div
                    class="col-span-2 flex flex-col items-center justify-center"
                  >
                    <div
                      v-if="match.status.short !== 'NS'"
                      class="bg-gradient-to-br from-[#1A0D13] to-[#15090e] px-2 py-2 rounded-lg shadow-md border border-[#3b1c23]"
                    >
                      <div
                        class="flex flex-col items-center justify-center gap-1"
                      >
                        <span class="text-base font-bold text-[#f0eaea]">{{
                          match.goals.home ?? 0
                        }}</span>
                        <span class="text-[10px] text-[#ff3344] font-bold"
                          >:</span
                        >
                        <span class="text-base font-bold text-[#f0eaea]">{{
                          match.goals.away ?? 0
                        }}</span>
                      </div>
                    </div>
                    <div v-else class="w-10 mt-4">
                      <img
                        src="/images/VS Image/VS 3.png"
                        alt="VS"
                        class="w-full"
                      />
                    </div>
                  </div>

                  <!-- Away Team Column -->
                  <div class="col-span-5 flex flex-col items-center">
                    <div
                      class="w-14 h-14 flex items-center justify-center p-2 rounded-xl bg-[#1A0D13] mb-2"
                    >
                      <img
                        :src="match.teams.away.logo"
                        :alt="match.teams.away.name"
                        class="w-full h-full object-contain"
                        onerror="this.src='https://placehold.co/80/e2e8f0/475569?text=Team'"
                      />
                    </div>
                    <p
                      class="font-semibold text-[#f0eaea] text-xs text-center line-clamp-2 leading-tight h-9 flex items-center justify-center"
                    >
                      {{ match.teams.away.name }}
                    </p>
                  </div>
                </div>

                <!-- Date/Time -->
                <div
                  class="text-xs text-center text-[#b37a7a] pt-3 mt-3 border-t border-[#3b1c23] flex items-center justify-center gap-1.5"
                >
                  <Icon
                    icon="mdi:calendar-clock"
                    class="text-sm text-[#ff3344]"
                  />
                  <span class="font-medium">{{ formatDate(match.date) }}</span>
                </div>
              </div>
            </div>
          </swiper-slide>
        </swiper>
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
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}
</style>
