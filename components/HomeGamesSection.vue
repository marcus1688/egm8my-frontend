<template>
  <Alerts
    :title="alertTitle"
    :message="alertMessage"
    :isVisible="alertVisible"
    :type="alertType"
    @close="alertVisible = false"
  />
  <section
    class="py-10 containerWid bg-gradient-to-b from-gray-50 to-white max-lg:py-2 max-lg:px-1"
  >
    <div class="mx-auto px-4 max-lg:px-2">
      <div class="mb-8 max-lg:mb-4">
        <div class="block lg:hidden">
          <div class="grid grid-cols-3 gap-2 max-lg:gap-1">
            <button
              v-for="(category, index) in [
                'Slots',
                'Casino',
                'Sports',
                'E-Sports',
                'Fishing',
                'Lottery',
              ]"
              :key="category"
              @click="selectCategory(index)"
              class="relative py-2 px-1 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center justify-center max-lg:py-1.5"
              :class="
                activeCategory === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 lg:hover:bg-gray-100'
              "
            >
              <i
                :class="getCategoryIcon(category)"
                class="text-lg mb-1 max-lg:text-base max-lg:mb-0.5"
              ></i>
              <span class="menuText max-lg:text-[10px]">{{ category }}</span>
              <div
                v-if="activeCategory === index"
                class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
              ></div>
            </button>
          </div>
        </div>
        <div class="hidden lg:flex overflow-x-auto scrollbar-hide">
          <div class="flex mx-auto space-x-1">
            <button
              v-for="(category, index) in [
                'Slots',
                'Casino',
                'Sports',
                'E-Sports',
                'Fishing',
                'Lottery',
              ]"
              :key="category"
              @click="selectCategory(index)"
              class="relative px-4 py-3 rounded-lg font-medium whitespace-nowrap transition-all duration-200"
              :class="
                activeCategory === index
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 lg:hover:bg-gray-100'
              "
            >
              <div class="flex items-center space-x-2 menuText">
                <i :class="getCategoryIcon(category)"></i>
                <span>{{ category }}</span>
              </div>
              <div
                v-if="activeCategory === index"
                class="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
              ></div>
            </button>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center mb-6 max-lg:mb-3">
        <h2 class="text-xl font-bold text-gray-900 max-lg:text-lg">
          {{
            ["Slots", "Casino", "Sports", "E-Sports", "Fishing", "Lottery"][
              activeCategory
            ]
          }}
        </h2>

        <div class="flex space-x-2 max-lg:space-x-1">
          <button
            @click="viewMode = 'grid'"
            class="p-2 rounded-md transition-colors max-lg:p-1.5"
            :class="
              viewMode === 'grid'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 lg:hover:bg-gray-200'
            "
          >
            <i class="bi bi-grid-3x3-gap"></i>
          </button>
          <button
            @click="viewMode = 'list'"
            class="p-2 rounded-md transition-colors max-lg:p-1.5"
            :class="
              viewMode === 'list'
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600 lg:hover:bg-gray-200'
            "
          >
            <i class="bi bi-list"></i>
          </button>
        </div>
      </div>

      <div
        v-if="viewMode === 'grid'"
        class="grid grid-cols-8 max-xl:grid-cols-6 max-lg:grid-cols-4 max-md:grid-cols-3 gap-4 max-lg:gap-2"
      >
        <!-- Slot Games -->
        <GameCardGrid
          v-if="activeCategory === 0"
          :games="slotKiosks"
          :onClick="launchGame"
        />

        <!-- Live Casino -->
        <GameCardGrid
          v-if="activeCategory === 1"
          :games="liveCasinoKiosks"
          :onClick="launchGame"
        />

        <!-- Sports -->
        <GameCardGrid
          v-if="activeCategory === 2"
          :games="sportsKiosks"
          :onClick="launchGame"
        />

        <!-- E-Sports -->
        <GameCardGrid
          v-if="activeCategory === 3"
          :games="esportsKiosks"
          :onClick="launchGame"
        />

        <!-- Fishing -->
        <GameCardGrid
          v-if="activeCategory === 4"
          :games="fishingKiosks"
          :onClick="launchGame"
        />

        <!-- Lottery Games -->
        <GameCardGrid
          v-if="activeCategory === 5"
          :games="lotteryKiosks"
          :onClick="launchGame"
        />
      </div>

      <!-- List View -->
      <div
        v-else
        class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden max-lg:rounded-lg"
      >
        <template v-if="activeCategory === 0">
          <GameListItem
            v-for="game in slotKiosks"
            :key="game._id"
            :game="game"
            :onClick="launchGame"
          />
        </template>

        <template v-else-if="activeCategory === 1">
          <GameListItem
            v-for="game in liveCasinoKiosks"
            :key="game._id"
            :game="game"
            :onClick="launchGame"
          />
        </template>

        <template v-else-if="activeCategory === 2">
          <GameListItem
            v-for="game in sportsKiosks"
            :key="game._id"
            :game="game"
            :onClick="launchGame"
          />
        </template>

        <template v-else-if="activeCategory === 3">
          <GameListItem
            v-for="game in esportsKiosks"
            :key="game._id"
            :game="game"
            :onClick="launchGame"
          />
        </template>

        <template v-else-if="activeCategory === 4">
          <GameListItem
            v-for="game in fishingKiosks"
            :key="game._id"
            :game="game"
            :onClick="launchGame"
          />
        </template>

        <template v-else-if="activeCategory === 5">
          <GameListItem
            v-for="game in lotteryKiosks"
            :key="game._id"
            :game="game"
            :onClick="launchGame"
          />
        </template>
      </div>

      <div
        v-if="
          (activeCategory === 0 && slotKiosks.length === 0) ||
          (activeCategory === 1 && liveCasinoKiosks.length === 0) ||
          (activeCategory === 2 && sportsKiosks.length === 0) ||
          (activeCategory === 3 && esportsKiosks.length === 0) ||
          (activeCategory === 4 && fishingKiosks.length === 0) ||
          (activeCategory === 5 && lotteryKiosks.length === 0)
        "
        class="py-12 text-center max-lg:py-8"
      >
        <div
          class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center max-lg:w-12 max-lg:h-12 max-lg:mb-3"
        >
          <i class="bi bi-search text-gray-400 text-xl max-lg:text-lg"></i>
        </div>
        <h3
          class="text-lg font-medium text-gray-700 mb-2 max-lg:text-base max-lg:mb-1.5"
        >
          {{ $t("no_games_found") }}
        </h3>
        <p class="text-gray-500 max-w-md mx-auto max-lg:text-sm">
          {{ $t("no_games_message") }}
        </p>
      </div>
    </div>
  </section>
</template>
<script setup>
import { Icon } from "@iconify/vue";
const { launchGame, alertVisible, alertTitle, alertMessage, alertType } =
  useGameLauncher();
const liveCasinoKiosks = useState("liveCasinoKiosks");
const slotKiosks = useState("slotKiosks");
const sportsKiosks = useState("sportsKiosks");
const esportsKiosks = useState("esportsKiosks");
const fishingKiosks = useState("fishingKiosks");
const lotteryKiosks = useState("lotteryKiosks");
const activeCategory = ref(0);
const viewMode = ref("grid");

const getCategoryIcon = (categoryName) => {
  const iconMap = {
    Slots: "bi bi-grid-3x3-gap",
    Casino: "bi bi-suit-club",
    Sports: "bi bi-dribbble",
    "E-Sports": "bi bi-controller",
    Fishing: "bi bi-water",
    Lottery: "bi bi-ticket-perforated",
  };
  return iconMap[categoryName] || "bi bi-grid";
};

const selectCategory = (index) => {
  activeCategory.value = index;
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
