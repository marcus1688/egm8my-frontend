<template>
  <ClientOnly>
    <div class="bg-[#0a0005] min-h-screen">
      <section class="relative shadow-lg shadow-red-600/20">
        <img
          src="/images/banner/leaderboard_banner_desktop.png"
          alt="Leaderboard Banner"
          class="w-full h-auto lg:block hidden"
        />
        <img
          src="/images/banner/leaderboard_banner_mobile.png"
          alt="Leaderboard Banner"
          class="w-full h-auto lg:hidden block"
        />
      </section>

      <section class="containerWid px-6 py-8 max-lg:px-4 max-lg:py-6">
        <div class="mb-8 max-lg:mb-2">
          <div
            class="flex items-center justify-between mb-6 max-lg:mb-4 max-md:flex-col max-md:items-start max-md:gap-3"
          >
            <div>
              <h1
                class="text-3xl font-bold text-[#f0eaea] mb-2 max-lg:text-2xl max-sm:text-xl max-lg:mb-1"
              >
                {{ $t("exclusive_leaderboard") }}
              </h1>
              <p class="text-sm text-[#b37a7a] max-lg:text-xs">
                {{
                  $t(
                    "show_them_how_good_you_are_top_10_players_highest_turnover"
                  )
                }}
              </p>
            </div>
          </div>

          <div class="relative">
            <div
              class="overflow-x-auto scrollbar-hide -mx-6 px-6 max-lg:-mx-4 max-lg:px-4"
            >
              <div class="flex gap-2 min-w-max pb-2">
                <button
                  v-for="tab in tabs"
                  :key="tab.key"
                  @click="selectTab(tab.key, $event)"
                  class="flex items-center gap-2 px-6 py-2.5 rounded-lg transition-all duration-200 whitespace-nowrap border max-lg:px-4 max-lg:py-2"
                  :class="
                    selectedTab === tab.key
                      ? 'bg-[#ff3344] border-[#ff3344] text-white'
                      : 'bg-transparent border-[#3b1c23] text-[#b37a7a] lg:hover:border-[#ff3344]/50 lg:hover:text-[#f0eaea]'
                  "
                >
                  <i :class="tab.icon" class="text-base max-lg:text-sm"></i>
                  <span class="text-sm font-medium max-lg:text-xs">{{
                    tab.label
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-show="selectedTab === 'about' || isDesktop" id="about">
          <div class="mb-6 max-lg:mb-4">
            <h2
              class="text-2xl font-bold text-[#f0eaea] mb-2 max-lg:text-xl max-sm:text-lg"
            >
              {{ $t("about_leaderboard") }}
            </h2>
            <p class="text-sm text-[#b37a7a] max-lg:text-xs">
              {{ $t("compete_win_amazing_prizes") }}
            </p>
          </div>

          <div
            class="grid grid-cols-4 max-lg:grid-cols-2 max-sm:grid-cols-1 gap-6 max-lg:gap-4"
          >
            <div
              class="bg-[#15090e] rounded-xl p-4 max-lg:p-4 border border-[#3b1c23]/50 hover:border-[#ff3344]/30 transition-all duration-200"
            >
              <div
                class="flex justify-center mb-4 max-lg:mb-3 h-32 max-lg:h-24"
              >
                <img
                  src="/images/leaderboard/trophy.png"
                  alt="Real-time Rankings"
                  class="w-full h-auto object-contain"
                />
              </div>
              <h3
                class="text-lg font-semibold text-[#f0eaea] mb-2 text-center max-lg:text-base max-lg:mb-1"
              >
                {{ $t("real_time_rankings") }}
              </h3>
              <p
                class="text-sm text-[#b37a7a] text-center leading-relaxed max-lg:text-xs"
              >
                {{
                  $t(
                    "live_leaderboard_allows_players_get_real_time_updates_rankings"
                  )
                }}
              </p>
            </div>

            <div
              class="bg-[#15090e] rounded-xl p-4 max-lg:p-4 border border-[#3b1c23]/50 hover:border-[#ff3344]/30 transition-all duration-200"
            >
              <div
                class="flex justify-center mb-4 max-lg:mb-3 h-32 max-lg:h-24"
              >
                <img
                  src="/images/leaderboard/car2.png"
                  alt="Lucrative Prizes"
                  class="w-full h-auto object-contain"
                />
              </div>
              <h3
                class="text-lg font-semibold text-[#f0eaea] mb-2 text-center max-lg:text-base max-lg:mb-1"
              >
                {{ $t("lucrative_prizes") }}
              </h3>
              <p
                class="text-sm text-[#b37a7a] text-center leading-relaxed max-lg:text-xs"
              >
                {{
                  $t(
                    "higher_you_step_up_leaderboard_ladder_more_luxury_gifts_prizes"
                  )
                }}
              </p>
            </div>

            <div
              class="bg-[#15090e] rounded-xl p-4 max-lg:p-4 border border-[#3b1c23]/50 hover:border-[#ff3344]/30 transition-all duration-200"
            >
              <div
                class="flex justify-center mb-4 max-lg:mb-3 h-32 max-lg:h-24"
              >
                <img
                  src="/images/leaderboard/top10.png"
                  alt="Fair Play Challenges"
                  class="w-full h-auto object-contain"
                />
              </div>
              <h3
                class="text-lg font-semibold text-[#f0eaea] mb-2 text-center max-lg:text-base max-lg:mb-1"
              >
                {{ $t("fair_play_challenges") }}
              </h3>
              <p
                class="text-sm text-[#b37a7a] text-center leading-relaxed max-lg:text-xs"
              >
                {{
                  $t(
                    "pit_yourself_against_others_same_membership_tier_secure_top_spot"
                  )
                }}
              </p>
            </div>

            <div
              class="bg-[#15090e] rounded-xl p-4 max-lg:p-4 border border-[#3b1c23]/50 hover:border-[#ff3344]/30 transition-all duration-200"
            >
              <div
                class="flex justify-center mb-4 max-lg:mb-3 h-32 max-lg:h-24"
              >
                <img
                  src="/images/leaderboard/games.png"
                  alt="Wide Game Selection"
                  class="w-full h-auto object-contain"
                />
              </div>
              <h3
                class="text-lg font-semibold text-[#f0eaea] mb-2 text-center max-lg:text-base max-lg:mb-1"
              >
                {{ $t("wide_game_selection") }}
              </h3>
              <p
                class="text-sm text-[#b37a7a] text-center leading-relaxed max-lg:text-xs"
              >
                {{
                  $t(
                    "players_can_compete_across_broad_range_game_categories_sports_live_casino_slots_fishing_lottery"
                  )
                }}
              </p>
            </div>
          </div>
        </div>

        <div v-show="selectedTab === 'myrank' || isDesktop" id="myrank">
          <Leaderboard />
        </div>
      </section>
    </div>
  </ClientOnly>
</template>

<script setup>
const pageLoading = useState("pageLoading");
const selectedTab = ref("about");
const isDesktop = ref(true);
const scrollToElement = inject("scrollToElement", null);

const tabs = [
  { key: "about", label: $t("about"), icon: "bi bi-info-circle" },
  { key: "myrank", label: $t("my_rank"), icon: "bi bi-trophy" },
];

const selectTab = (tabKey, event) => {
  selectedTab.value = tabKey;
  if (isDesktop.value && scrollToElement) {
    event.preventDefault();
    scrollToElement(tabKey);
  }
};

const updateScreenSize = () => {
  isDesktop.value = window.innerWidth >= 1024;
};

onMounted(() => {
  pageLoading.value = true;
  try {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScreenSize);
});

useHead({
  title: "EGM8 | Exclusive Leaderboard - Compete & Win Amazing Prizes",
  meta: [
    {
      property: "og:title",
      content: "EGM8 | Monthly Leaderboard Challenge",
    },
    {
      name: "description",
      content:
        "Join EGM8's exclusive leaderboard competition. Top 10 players with highest turnover win generous prizes every month. Real-time rankings, lucrative rewards, and fair play challenges.",
    },
    {
      name: "keywords",
      content:
        "EGM8 leaderboard, casino rankings, monthly prizes, turnover competition, VIP rewards, casino challenge, top players, Malaysia casino leaderboard",
    },
  ],
  htmlAttrs: { lang: "en" },
  link: [
    { rel: "canonical", href: "https://www.egm8my.vip/leaderboard" },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.egm8my.vip/leaderboard",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.egm8my.vip/leaderboard",
    },
  ],
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
</style>
