<template>
  <ClientOnly>
    <Alerts
      :title="alertTitle"
      :message="alertMessage"
      :isVisible="alertVisible"
      :type="alertType"
      @close="alertVisible = false"
    />
    <PageLoading v-if="pageLoading" />
    <div class="bg-slate-50">
      <section class="relative max-lg:max-w-[100vw]">
        <NuxtImg
          src="/images/banner/fishing_banner.png"
          alt="Fishing"
          class="w-full h-auto lg:block hidden"
        />
        <NuxtImg
          src="/images/banner/fishing_banner_mobile.png"
          alt="Fishing"
          class="w-full h-auto lg:hidden block"
        />
      </section>

      <section
        class="py-4 px-16 max-lg:p-4 bg-slate-50 border-t border-slate-100"
      >
        <div>
          <div class="flex justify-between items-center">
            <div>
              <h2 class="homeMainTxt3 font-bold text-gray-900">
                {{ $t("fishing") }}
              </h2>
              <p class="text-gray-500 mt-1 titletext">
                {{ $t("choose_gaming_providers") }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Fishing Kiosks-->
      <section
        class="py-4 px-8 bg-white border-t border-b border-slate-100 shadow-sm max-lg:py-2 max-lg:px-3"
      >
        <div
          class="flex flex-wrap gap-4 justify-center max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:justify-start max-lg:scrollbar-hide max-lg:-mx-2 max-lg:px-2 max-lg:pb-1"
        >
          <div
            v-for="provider in fishingKiosks"
            :key="provider._id"
            @click="selectGame(provider)"
            class="relative cursor-pointer group max-lg:flex-none"
          >
            <div
              class="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 max-lg:px-3 max-lg:py-1.5"
              :class="
                currentKiosk?._id === provider._id
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-white lg:hover:bg-slate-50 border-2 border-transparent'
              "
            >
              <div
                class="w-12 h-12 flex items-center justify-center mb-1 max-lg:w-10 max-lg:h-10"
              >
                <img
                  :src="provider.logo"
                  :alt="provider.name"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
              <span
                class="text-sm font-medium max-lg:text-xs max-lg:whitespace-nowrap"
                :class="
                  currentKiosk?._id === provider._id
                    ? 'text-blue-600'
                    : 'text-gray-600'
                "
              >
                {{ provider.name }}
              </span>
              <div
                v-if="provider.isHotGame"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded shadow-sm max-lg:text-[10px] max-lg:px-1 max-lg:py-0 max-lg:top-0 max-lg:right-0 max-lg:z-10"
              >
                {{ $t("hot") }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Game List -->
      <section
        v-if="currentKiosk && !currentKiosk.isManualGame"
        class="py-10 px-16 max-xl:px-8 max-lg:px-4 max-lg:py-4 bg-slate-50"
      >
        <div>
          <div
            class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 max-lg:mb-4 max-lg:gap-3"
          >
            <div>
              <h2 class="text-2xl font-bold text-gray-900 max-lg:text-base">
                {{ currentKiosk.name }} {{ $t("games") }}
              </h2>
              <p class="text-gray-500 mt-1 max-lg:text-xs">
                {{
                  $t("showing_games", {
                    shown: paginatedGames.length,
                    total: filteredGameList.length,
                  })
                }}
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div class="relative flex-grow">
                <input
                  type="text"
                  v-model="searchTerm"
                  :placeholder="$t('search_games')"
                  class="w-full px-5 py-3 max-lg:py-2 rounded-lg bg-white border border-slate-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 shadow-sm"
                />
                <i
                  class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                ></i>
              </div>
            </div>
          </div>
          <div
            v-if="paginatedGames.length > 0"
            class="grid grid-cols-8 max-2xl:grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2 gap-5"
          >
            <div
              v-for="game in paginatedGames"
              :key="game.GameCode"
              @click="
                launchGame({
                  ...currentKiosk,
                  gameCode: game.GameCode,
                  gameType: game.GameType,
                })
              "
              class="bg-white rounded-xl overflow-hidden cursor-pointer shadow-sm transition-all duration-300 group"
            >
              <div class="relative overflow-hidden">
                <div
                  class="w-full aspect-square flex items-center justify-center bg-gray-100"
                >
                  <img
                    :src="
                      ($i18n.locale === 'zh' && game.GameImageZH) ||
                      ($i18n.locale === 'ms' && game.GameImageMS) ||
                      game.GameImage ||
                      `https://placehold.co/300x300/e2e8f0/475569?text=${encodeURIComponent(
                        getLocalizedGameName(game)
                      )}`
                    "
                    :alt="getLocalizedGameName(game)"
                    class="max-w-full max-h-full object-contain transition-transform duration-200"
                    @error="handleImageError(game)"
                  />
                  <div
                    class="max-lg:hidden absolute inset-0 bg-black/30 opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
                  >
                    <button
                      class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg transform scale-90 lg:group-hover:scale-100 lg:group-hover:brightness-110 transition-all duration-300"
                    >
                      <Icon
                        icon="mdi:lightning-bolt"
                        class="text-white text-base"
                      />
                      <p class="max-2xl:text-xs">{{ $t("play_now") }}</p>
                    </button>
                  </div>
                  <div
                    v-if="game.Hot"
                    class="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xs font-semibold px-2 py-0.5 rounded-bl-lg rounded-tr-lg shadow-lg flex items-center gap-1 z-10"
                  >
                    <Icon icon="mdi:star" class="text-yellow-300" />
                    {{ $t("top") }}
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-100">
                <div class="p-2 pt-3 text-center">
                  <h4
                    class="text-sm max-md:text-xs font-medium text-gray-800 break-words hyphens-auto"
                  >
                    {{ getLocalizedGameName(game) }}
                  </h4>
                </div>

                <!-- RTP row - only shows if RTP exists -->
                <div v-if="game.RTP" class="px-2 pb-2.5 flex justify-center">
                  <div class="flex items-center justify-center gap-2">
                    <div class="h-0.5 w-4 bg-gray-200 rounded-full"></div>
                    <div
                      class="flex items-center bg-gray-100 rounded-full px-2 py-0.5"
                    >
                      <span
                        class="text-xs font-medium text-amber-600 flex items-center gap-1"
                      >
                        <Icon
                          icon="mdi:trophy"
                          class="text-amber-500 text-2xs"
                        />
                        {{ game.RTP }}
                      </span>
                    </div>
                    <div class="h-0.5 w-4 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Games Found  -->
          <div v-else class="text-center py-20 bg-white rounded-xl shadow-sm">
            <div
              class="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6"
            >
              <i class="bi bi-search text-4xl"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-700 mb-3">
              {{ $t("no_games_found") }}
            </h3>
            <p class="text-gray-500 max-w-lg mx-auto">
              {{ $t("no_games_message") }}
            </p>
            <button
              @click="searchTerm = ''"
              class="mt-6 px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium lg:hover:bg-blue-600 transition-colors"
            >
              {{ $t("clear_search") }}
            </button>
          </div>
          <!-- Pagination -->
          <div
            v-if="filteredGameList.length > gamesPerPage"
            class="flex justify-center mt-4"
          >
            <div class="inline-flex rounded-lg shadow-sm">
              <button
                @click="currentPage > 1 && currentPage--"
                :disabled="currentPage === 1"
                class="px-4 py-2.5 border border-slate-200 rounded-l-lg text-gray-600 lg:hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="bi bi-chevron-left"></i>
              </button>

              <div
                class="px-6 py-2.5 border-t border-b border-slate-200 text-gray-700 flex items-center"
              >
                <span class="font-medium">{{ currentPage }}</span>
                <span class="mx-1">/</span>
                <span>{{ totalPages }}</span>
              </div>

              <button
                @click="currentPage < totalPages && currentPage++"
                :disabled="currentPage === totalPages"
                class="px-4 py-2.5 border border-slate-200 rounded-r-lg text-gray-600 lg:hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Game Promo Cards -->
      <GamePromoCards />
    </div>
  </ClientOnly>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const { launchGame, alertVisible, alertTitle, alertMessage, alertType } =
  useGameLauncher();
const fishingKiosks = useState("fishingKiosks");
const searchQuery = ref("");
const sortOption = ref("popular");
const currentPage = ref(1);
const itemsPerPage = ref(24);
const gamesPerPage = ref(24);
const searchTerm = ref("");
const { post } = useApiEndpoint();
const isAnimating = ref(false);
const gameList = ref([]);
const currentKiosk = ref(0);
const sliderWrapper = ref(null);
const sliderContent = ref(null);
const currentOffset = ref(0);
const currentIndex = ref(0);
const visibleItems = ref(5);
const pageLoading = ref(false);

watch([searchQuery, sortOption], () => {
  currentPage.value = 1;
});

const hasGameListKiosks = computed(() =>
  fishingKiosks.value.filter((kiosk) => kiosk.gameListLink)
);

const regularKiosks = computed(() =>
  fishingKiosks.value.filter((kiosk) => !kiosk.gameListLink)
);

const filteredGameList = computed(() => {
  if (!searchTerm.value) return gameList.value;
  const searchLower = searchTerm.value.toLowerCase();
  return gameList.value.filter((game) => {
    const nameToSearch =
      $locale.value === "zh" && game.GameNameZH
        ? game.GameNameZH
        : game.GameNameEN;
    return nameToSearch.toLowerCase().includes(searchLower);
  });
});

const paginatedGames = computed(() => {
  const validGames = filteredGameList.value.filter(
    (game) => game.GameImage && !hasImageError(game)
  );
  const start = (currentPage.value - 1) * gamesPerPage.value;
  const end = start + gamesPerPage.value;
  return validGames.slice(start, end);
});

const totalPages = computed(() => {
  const validGames = filteredGameList.value.filter(
    (game) => game.GameImage && !hasImageError(game)
  );
  return Math.ceil(validGames.length / gamesPerPage.value);
});

const selectGame = async (game) => {
  if (currentKiosk.value?._id === game._id) return;
  pageLoading.value = true;
  currentKiosk.value = game;
  try {
    if (game.gameListLink) {
      await fetchGameList(game.gameListLink);
    }
  } catch (error) {
    console.error("Error selecting gameError selecting game:", error);
  } finally {
    pageLoading.value = false;
    scrollToSelectedProvider();
  }
};

async function fetchGameList(link) {
  try {
    const requestBody = {
      gameLang: $locale.value === "zh" ? "zh" : "en",
    };
    const { data } = await post(link, requestBody);
    if (data.success) {
      gameList.value = data.gamelist.filter(
        (game) => game.GameType === "Fishing"
      );
    }
  } catch (error) {
    console.error("Error fetching game list:", error);
  }
}

const failedImages = ref(new Set());

const hasImageError = (game) => {
  return failedImages.value.has(game.GameCode);
};

const handleImageError = (game) => {
  failedImages.value.add(game.GameCode);
};

const getLocalizedGameName = (game) => {
  if ($locale.value === "zh" && game.GameNameZH) {
    return game.GameNameZH;
  }
  if ($locale.value === "ms" && game.GameNameMS) {
    return game.GameNameMS;
  }
  return game.GameNameEN;
};

const fallback = (name) =>
  `https://placehold.co/264x328/2563eb/FFFFFF/png?text=${encodeURIComponent(
    name
  )}`;

onMounted(async () => {
  pageLoading.value = true;
  try {
    const selectedFishingProvider = useState("selectedFishingProvider").value;
    if (selectedFishingProvider) {
      currentKiosk.value = selectedFishingProvider;
      if (selectedFishingProvider.gameListLink) {
        await fetchGameList(selectedFishingProvider.gameListLink);
      }
    } else if (hasGameListKiosks.value?.length > 0 && !currentKiosk.value) {
      currentKiosk.value = hasGameListKiosks.value[0];
      if (hasGameListKiosks.value[0].gameListLink) {
        await fetchGameList(hasGameListKiosks.value[0].gameListLink);
      }
    }
  } catch (error) {
    console.error("Error during initial page load:", error);
  } finally {
    pageLoading.value = false;
    scrollToSelectedProvider();
  }
});

const scrollToSelectedProvider = () => {
  if (!currentKiosk.value) return;
  nextTick(() => {
    const providersContainer = document.querySelector(
      ".flex.flex-wrap.max-lg\\:flex-nowrap.max-lg\\:overflow-x-auto"
    );
    if (!providersContainer) return;
    const selectedProvider = Array.from(
      providersContainer.querySelectorAll(".group")
    ).find((el) => {
      return el.querySelector('div[class*="bg-blue-50"]');
    });

    if (selectedProvider) {
      const containerWidth = providersContainer.offsetWidth;
      const selectedPosition = selectedProvider.offsetLeft;
      const selectedWidth = selectedProvider.offsetWidth;
      const scrollTo =
        selectedPosition - (containerWidth / 2 - selectedWidth / 2);
      providersContainer.scrollTo({
        left: Math.max(0, scrollTo),
        behavior: "smooth",
      });
    }
  });
};

watchEffect(() => {
  const selectedFishingProvider = useState("selectedFishingProvider").value;
  if (selectedFishingProvider && !currentKiosk.value) {
    selectGame(selectedFishingProvider);
  } else if (hasGameListKiosks.value?.length > 0 && !currentKiosk.value) {
    selectGame(hasGameListKiosks.value[0]);
  }
});

watch(searchTerm, () => {
  currentPage.value = 1;
});

watch(gameList, () => {
  currentPage.value = 1;
});

watch([searchTerm, sortOption], () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease forwards;
}

.animate-slideUp {
  animation: slideUp 0.8s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
}
</style>
