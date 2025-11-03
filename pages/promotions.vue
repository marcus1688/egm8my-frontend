<template>
  <ClientOnly>
    <div>
      <section
        class="relative max-lg:max-w-[100vw] shadow-lg shadow-red-600/20"
      >
        <img
          src="/images/banner/promotion_banner_desktop.png"
          alt="Promotions and Bonuses Banner"
          class="w-full h-auto lg:block hidden"
        />
        <img
          src="/images/banner/promotion_banner_mobile.png"
          alt="Promotions and Bonuses Banner"
          class="w-full h-auto lg:hidden block"
        />
      </section>

      <section class="py-8 containerWid max-lg:py-4">
        <div class="mx-auto">
          <div
            class="mb-8 pt-4 pb-3 bg-[#241017] max-lg:mb-2 max-lg:pt-2 max-lg:pb-2 border border-[#3b1c23] rounded-lg"
          >
            <div
              class="flex justify-between items-center max-[430px]:flex-col max-[430px]:items-start max-[430px]:gap-2 mb-4 max-[430px]:!mb-3 max-lg:mb-2 px-4"
            >
              <h2
                class="homeMainTxt3 font-bold text-[#f0eaea] flex items-center gap-2 max-lg:text-lg"
              >
                <span class="text-xl max-lg:text-lg">
                  {{ tabs.find((t) => t.key === selectedTab)?.label }}
                  {{ $t("promotion") }}
                </span>
              </h2>
              <p class="text-sm max-[630px]:text-xs text-[#b37a7a]">
                {{ $t("showing") }}
                <span class="font-semibold text-[#ff3344]">{{
                  filteredContent.length
                }}</span>
                {{ $t("promotions") }}
              </p>
            </div>
            <div class="relative px-4 max-lg:px-2">
              <div
                class="overflow-x-auto category-scroller scrollbar-hide max-lg:-mx-2 max-lg:px-2"
              >
                <div
                  class="flex gap-2 md:gap-3 pb-2 max-lg:gap-1.5 max-lg:pb-1"
                  style="width: max-content"
                >
                  <button
                    v-for="(tab, index) in tabs"
                    :key="index"
                    @click="selectTab(tab.key)"
                    class="px-4 py-2.5 max-[630px]:!px-4 max-[630px]:py-2 max-lg:px-3 max-lg:py-2 rounded-lg whitespace-nowrap transition-all text-sm max-[630px]:text-xs max-lg:text-xs font-medium flex items-center gap-2 max-lg:gap-1.5"
                    :class="
                      selectedTab === tab.key
                        ? 'bg-[#a1122d] text-white shadow-md !border-transparent'
                        : 'bg-[#15090e] text-[#b37a7a] lg:hover:bg-[#2a0f14] border border-[#3b1c23]'
                    "
                  >
                    <img
                      :src="getCategoryIcon(tab.key)"
                      alt="Category Icon"
                      class="w-8 h-auto max-lg:w-6 max-lg:h-6"
                    />
                    <span>{{ tab.label }}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="filteredContent.length > 0"
            class="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-6"
          >
            <div
              v-for="(promotion, index) in filteredContent"
              :key="index"
              class="bg-[#241017] rounded-xl overflow-hidden border border-[#3b1c23] h-full"
            >
              <div class="flex flex-col h-full">
                <div class="relative overflow-hidden">
                  <img
                    :src="getPromotionImage(promotion)"
                    :alt="promotion.title"
                    class="w-full h-full object-cover"
                  />

                  <div
                    class="absolute inset-0 bg-gradient-to-t from-[#1A0D13]/80 via-[#1A0D13]/20 to-transparent opacity-60"
                  ></div>
                </div>

                <div class="p-4 flex flex-col flex-grow">
                  <div
                    class="flex justify-between items-center max-lg:flex-col max-lg:items-start"
                  >
                    <h2
                      v-html="
                        $i18n.locale === 'zh'
                          ? promotion?.maintitle
                          : $i18n.locale === 'ms'
                          ? promotion?.maintitleMS
                          : promotion?.maintitleEN
                      "
                      class="font-bold text-[#f0eaea] mb-2 line-clamp-1 max-lg:text-text-xs"
                    ></h2>
                    <div class="w-[30%] flex justify-end max-lg:w-full">
                      <button
                        @click="openPromotionModal(promotion)"
                        class="w-full py-2 px-4 bg-[#15090e] text-[#b37a7a] lg:hover:bg-[#2a0f14] rounded-lg transition-colors font-medium flex items-center justify-center gap-1 border border-[#3b1c23]"
                      >
                        <i class="bi bi-info-circle"></i>
                        <span class="text-xs">{{ $t("details") }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            v-else
            class="bg-[#241017] rounded-xl p-12 text-center border border-[#3b1c23] shadow-sm"
          >
            <div
              class="w-16 h-16 rounded-full bg-[#15090e] text-[#ff3344] flex items-center justify-center text-xl mx-auto mb-4 border border-[#3b1c23]"
            >
              <i class="bi bi-search"></i>
            </div>
            <h3 class="text-xl font-bold text-[#f0eaea] mb-2">
              {{ $t("no_promotions_found") }}
            </h3>
            <p class="text-[#b37a7a] mb-6 max-w-md mx-auto">
              {{ $t("no_promotions_available") }}
              <span class="font-medium">{{ selectedTab }}</span
              >.
            </p>
            <button
              @click="selectTab('All')"
              class="px-6 py-3 bg-[#a1122d] text-white rounded-lg lg:hover:bg-[#c21b3a] transition-colors text-sm font-medium inline-flex items-center gap-2"
            >
              <i class="bi bi-grid"></i>
              {{ $t("view_all_promotions") }}
            </button>
          </div>
        </div>
      </section>
    </div>

    <PromotionModal
      :show="isPromotionModalOpen"
      :promotion="selectedPromotion"
      @close="closePromotionModal"
    />
  </ClientOnly>
</template>

<script setup>
const pageLoading = useState("pageLoading");
const isPromotionModalOpen = ref(false);
const selectedPromotion = ref(null);
const tabs = [
  { key: "All", label: $t("all") },
  { key: "Live Casino", label: $t("live_casino") },
  { key: "Sports", label: $t("sports") },
  { key: "Slot Games", label: $t("slot_games") },
  { key: "Fishing", label: $t("fishing") },
  { key: "E-Sports", label: $t("e_sports") },
  { key: "Lottery", label: $t("lottery") },
];

const promotionData = ref(null);

const getCategoryIcon = (category) => {
  const iconMap = {
    All: "/images/burger-menu/slots.png",
    "Slot Games": "/images/burger-menu/slots.png",
    "Live Casino": "/images/burger-menu/livecasino.png",
    "E-Sports": "/images/burger-menu/e-sports.png",
    Sports: "/images/burger-menu/sports.png",
    Fishing: "/images/burger-menu/fishing.png",
    Lottery: "/images/burger-menu/lottery.png",
  };
  return iconMap[category];
};
function openPromotionModal(promotion) {
  selectedPromotion.value = {
    promotionimage: promotion.promotionimage,
    maintitle:
      $locale.value === "zh"
        ? promotion.maintitle
        : $locale.value === "ms"
        ? promotion.maintitleMS
        : promotion.maintitleEN,
    content:
      $locale.value === "zh"
        ? promotion.content
        : $locale.value === "ms"
        ? promotion.contentMS
        : promotion.contentEN,
    TnC:
      $locale.value === "zh"
        ? promotion.TnC
        : $locale.value === "ms"
        ? promotion.TnCMS
        : promotion.TnCEN,
  };
  isPromotionModalOpen.value = true;
}

function closePromotionModal() {
  isPromotionModalOpen.value = false;
}

onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchPromotion();
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});

const promotions = [
  {
    title: '288% "Have You BK8?" Welcome Bonus',
    description:
      "Power up your play with 288% Welcome Bonus and receive up to MYR2,880!",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=Welcome+Bonus",
    category: "Member",
    validUntil: "31 March 2025",
  },
  {
    title: "150% First Deposit Bonus",
    description:
      "Get extra value on your first deposit with our 150% Welcome Bonus up to MYR1,500.",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=First+Deposit",
    category: "Member",
    validUntil: "31 March 2025",
  },
  {
    title: "Slots Free Spins Thursday",
    description:
      "Enjoy 100 free spins on our most popular slot games every Thursday!",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=Free+Spins",
    category: "Slots",
    validUntil: "31 March 2025",
  },
  {
    title: "Casino Weekend Cashback",
    description:
      "Get up to 15% cashback on your weekend losses, credited every Monday.",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=Casino+Cashback",
    category: "Casino",
    validUntil: "31 March 2025",
  },
  {
    title: "Esports Bonus Bet",
    description:
      "Place your first Esports bet and get a free bonus bet of the same value!",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=Esports+Bonus",
    category: "Esport",
    validUntil: "31 March 2025",
  },
  {
    title: "Sports Accumulator Boost",
    description:
      "Get up to 70% boost on your accumulator bets when you select 5+ events.",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=Sports+Boost",
    category: "Sports",
    validUntil: "31 March 2025",
  },
  {
    title: "Fishing Tournament",
    description:
      "Join our weekly fishing tournament and compete for a prize pool of MYR10,000!",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=Fishing+Tournament",
    category: "Fishing",
    validUntil: "31 March 2025",
  },
  {
    title: "VIP Exclusive Cashback",
    description:
      "VIP members enjoy increased 20% cashback on all games, paid out weekly.",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=VIP+Cashback",
    category: "VIP",
    validUntil: "31 March 2025",
  },
  {
    title: "Lucky Draw Special",
    description:
      "Deposit MYR100 or more and get entered into our monthly lucky draw for prizes!",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=Lucky+Draw",
    category: "Special",
    validUntil: "31 March 2025",
  },
  {
    title: "Crypto Deposit Bonus",
    description:
      "Get an additional 5% bonus when you deposit using any cryptocurrency.",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=Crypto+Bonus",
    category: "Crypto",
    validUntil: "31 March 2025",
  },
  {
    title: "Winner Showcase",
    description: "Check out our recent big winners and their amazing stories!",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=Winner+Showcase",
    category: "Winner",
    validUntil: null,
  },
  {
    title: "Daily Rewards",
    description:
      "Log in daily to receive special rewards and bonuses every day!",
    image: "https://placehold.co/800x400/1a1d22/454b54?text=Daily+Rewards",
    category: "Member",
    validUntil: "31 March 2025",
  },
];

const getCategoryColor = (category) => {
  const colorMap = {
    All: "text-blue-600",
    "Slot Games": "text-purple-600",
    "Live Casino": "text-red-600",
    "E-Sports": "text-green-600",
    Sports: "text-orange-600",
    Fishing: "text-cyan-600",
    Lottery: "text-yellow-600",
  };

  return colorMap[category] || "text-gray-600";
};

const selectedTab = ref("All");
function selectTab(tabName) {
  selectedTab.value = tabName;
}

async function fetchPromotion() {
  try {
    const { get } = useApiEndpoint();
    const { data } = await get("client/getallpromotion");
    if (data.success) {
      promotionData.value = data.promotions;
    }
  } catch (error) {
    console.error("Error fetching promotions:", error);
  }
}

const chineseImageMapping = {
  "68a8e6095b0b3524a723a8ba": "68ad709c4fa1a2b251ae614a",
  "68a834e98c7c0b0fd3bfc317": "68ad70a24fa1a2b251ae6179",
  "6835810cacaed1c845fb72c4": "687a14c4696757f1e34d8d47", // English promo ID -> Chinese promo ID
  "6815c2930f91b823519dd20b": "687a1050696757f1e34d8354",
  "6815be950f91b823519dd144": "687a1320696757f1e34d8979",
  "6815b6a50f91b823519dcf28": "687a1386696757f1e34d8a71",
  "6815b3900f91b823519dcdf3": "687a13b7696757f1e34d8aeb",
  "6815aa1e0f91b823519dcb74": "687a13f7696757f1e34d8b83",
  "68132db2b08436800e2c1cfe": "687a142b696757f1e34d8c05",
  "6813257c3e85ca8b7abf9246": "687a1450696757f1e34d8c33",
  "68131b6d3e85ca8b7abf907a": "687a1478696757f1e34d8ca3",
};

function getPromotionImage(promotion) {
  if ($locale.value === "zh") {
    if (chineseImageMapping[promotion._id]) {
      const chinesePromo = promotionData.value?.find(
        (p) => p._id === chineseImageMapping[promotion._id]
      );

      if (chinesePromo && chinesePromo.promotionimage) {
        return chinesePromo.promotionimage;
      }
    }
    return promotion.promotionimage2 || promotion.promotionimage;
  }

  if ($locale.value === "ms") {
    return promotion.promotionimage3 || promotion.promotionimage;
  }

  return promotion.promotionimage;
}

const filteredContent = computed(() => {
  if (!promotionData.value) return [];

  let allPromotions = promotionData.value.filter((promo) => {
    return promo.maintitleEN && promo.maintitleEN.trim() !== "";
  });

  // Apply category filter
  if (selectedTab.value === "All") return allPromotions;

  return allPromotions.filter((promo) => {
    if (selectedTab.value === "Live Casino") {
      return promo.categories.some((cat) => cat.name === "Live Casino");
    }
    if (selectedTab.value === "Sports") {
      return promo.categories.some((cat) => cat.name === "Sports");
    }
    if (selectedTab.value === "Slot Games") {
      return promo.categories.some((cat) => cat.name === "Slot Games");
    }
    if (selectedTab.value === "Fishing") {
      return promo.categories.some((cat) => cat.name === "Fishing");
    }
    if (selectedTab.value === "E-Sports") {
      return promo.categories.some((cat) => cat.name === "E-Sports");
    }
    if (selectedTab.value === "Lottery") {
      return promo.categories.some((cat) => cat.name === "Lottery");
    }
  });
});

useHead({
  title: "EGM8 | Latest Promotions & Bonuses - Malaysia Online Casino Offers",
  meta: [
    {
      property: "og:title",
      content: "EGM8 | Exclusive Casino Promotions & Welcome Bonuses",
    },
    {
      name: "description",
      content:
        "Discover EGM8's latest promotions and bonuses including welcome bonuses, free spins, cashback offers, sports betting promotions, VIP rewards, and daily specials. Join Malaysia's premier gaming platform for exclusive deals.",
    },
    {
      name: "keywords",
      content:
        "EGM8 promotions, casino bonuses Malaysia, welcome bonus, free spins, cashback offers, sports betting bonus, slot promotions, live casino bonus, VIP rewards, daily bonuses, Malaysia casino deals",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.egm8my.vip/promotions",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.egm8my.vip/promotions",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.egm8my.vip/promotions",
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

button {
  transition: all 0.25s ease;
}

.category-scroller {
  cursor: grab;
  touch-action: pan-x;
  -webkit-overflow-scrolling: touch;
}

.category-scroller:active {
  cursor: grabbing;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.animate-float-slow {
  animation: float 8s ease-in-out infinite;
}

.animate-float-medium {
  animation: float 6s ease-in-out infinite;
}

.animate-float-fast {
  animation: float 4s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin 15s linear infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
