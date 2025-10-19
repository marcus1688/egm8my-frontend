<template>
  <ClientOnly>
    <div class="text-red-50">
      <section class="relative max-lg:max-w-[100vw]">
        <swiper
          :modules="[Autoplay, Pagination, EffectFade]"
          :loop="true"
          :autoplay="{
            delay: 4000,
            disableOnInteraction: false,
          }"
          :pagination="{
            clickable: true,
          }"
          class="hero-swiper"
        >
          <swiper-slide v-for="(image, index) in carousel" :key="index">
            <NuxtImg
              :src="image"
              alt="carousel image"
              class="w-full h-auto object-cover"
            />
          </swiper-slide>
        </swiper>
      </section>

      <section
        class="shadow-lg shadow-red-500/20 relative z-10 py-2 border-b-2 border-red-600"
      >
        <div class="mx-auto containerWid">
          <div
            class="flex justify-between items-center overflow-x-auto scrollbar-hide"
          >
            <div
              class="font-bold text-red-500 flex items-center pr-2 text-nowrap bg-black px-3 py-1 rounded-md border border-red-600"
            >
              <i class="bi bi-megaphone mr-2 text-red-400"></i>
              {{ $t("news") }}
            </div>
            <NuxtMarquee
              play
              direction="left"
              speed="10"
              pauseOnHover
              class="text-sm max-lg:text-xs"
            >
              <p class="text-red-100">
                {{ announcement }}
              </p>
            </NuxtMarquee>
          </div>
        </div>
      </section>

      <LuckySpin v-if="showLuckySpin" @close="showLuckySpin = false" />
      <Sports />
      <HomePromotionList />
      <Transaction />
      <Leaderboard />
      <HomeRegistrationSteps />
      <HomeGamesSection />
      <TrustedPartners />
      <HomeTestimonials />
      <HomePopup v-if="shouldShowPopup" :popup-data="activePopup" />

      <div
        v-if="userData && userData.luckySpinClaim === false"
        class="fixed bottom-32 right-0 z-[60] max-lg:right-1 cursor-pointer animate-pulse-glow lg:hover:animate-none"
        @click="showLuckySpin = true"
      >
        <div class="relative">
          <img
            src="/images/luckyspin/logo.png"
            alt="Lucky Spin"
            class="w-32 h-auto object-contain animate-float max-lg:w-20 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]"
          />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const pageLoading = useState("pageLoading");
const userData = useState("userData");
const { get, post } = useApiEndpoint();
const generalSetting = useState("generalSetting");
const carousel = ref([]);
const activePopup = ref(null);
const shouldShowPopup = ref(false);
const showLuckySpin = ref(false);

const announcement = computed(() => {
  return $locale.value === "zh"
    ? generalSetting.value.announcementCN
    : $locale.value === "ms"
    ? generalSetting.value.announcementMS
    : generalSetting.value.announcementEN;
});

async function fetchCarousel() {
  try {
    const { data } = await get("client/getallcarousels");

    if (data.success) {
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;

      let filteredCarousels;

      if (isMobile) {
        const mobileCarousels = data.carousels.filter((carousel) =>
          carousel.name.startsWith("M_")
        );
        console.log(mobileCarousels);
        if (mobileCarousels.length > 0) {
          filteredCarousels = mobileCarousels;
        } else {
          filteredCarousels = data.carousels.filter(
            (carousel) => !carousel.name.startsWith("M_")
          );
        }
      } else {
        filteredCarousels = data.carousels.filter(
          (carousel) => !carousel.name.startsWith("M_")
        );
      }

      carousel.value = filteredCarousels.map((carousel) => carousel.link);
      if (process.client) {
        carousel.value.forEach((src) => {
          if (src) {
            const img = new Image();
            img.src = src;
          }
        });
      }
    }
  } catch (error) {
    console.error("Error fetching promotions:", error);
  }
}

const checkPopupVisibility = async () => {
  try {
    const { data } = await get("active-popup");
    if (data.success && data.data) {
      const popup = data.data;
      if (process.client && popup.image) {
        const img = new Image();
        img.src = popup.image;
      }
      const lastPopupId = localStorage.getItem("lastPopupId");
      const lastPopupTime = localStorage.getItem("lastPopupTime");
      const shouldShow = checkShouldShowPopup(
        popup._id,
        lastPopupId,
        lastPopupTime
      );
      if (shouldShow) {
        activePopup.value = popup;
        shouldShowPopup.value = true;
      }
    }
  } catch (error) {
    console.error("Error fetching popup:", error);
  }
};

const checkShouldShowPopup = (currentPopupId, lastPopupId, lastPopupTime) => {
  if (!lastPopupId || !lastPopupTime) return true;
  if (currentPopupId !== lastPopupId) return true;
  const lastTime = new Date(lastPopupTime);
  const currentTime = new Date();
  const hoursDiff = (currentTime - lastTime) / (1000 * 60 * 60);
  return hoursDiff >= 1;
};

useHead({
  title: "EGM8 | Premier Online Gaming & Casino Experience in Malaysia",
  meta: [
    {
      property: "og:title",
      content: "EGM8 | Malaysia's Leading Online Gaming Platform",
    },
    {
      name: "description",
      content:
        "EGM8 delivers the ultimate online gaming experience in Malaysia with premium slot machines, live dealer games, comprehensive sportsbook, instant withdrawals, and exclusive member benefits.",
    },
    {
      name: "keywords",
      content:
        "EGM8, Malaysia online gaming, premium slots, live dealers, sports betting, instant withdrawal, member rewards, gaming platform Malaysia, online casino games, trusted gaming site",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.egm8my.vip/",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.egm8my.vip/",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.egm8my.vip/",
    },
  ],
});

onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchCarousel();
    await checkPopupVisibility();
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});
</script>

<style scoped>
.hero-swiper {
  width: 100%;
  height: 100%;
}

:deep(.swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.4);
  opacity: 0.7;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: #ef4444;
  width: 12px;
  height: 12px;
  border: 2px solid #dc2626;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
}

.news-ticker {
  height: 24px;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.news-animation {
  animation: tickerScroll 20s linear infinite;
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
}

.news-animation > div {
  height: 24px;
  display: flex;
  align-items: center;
}

@keyframes tickerScroll {
  0% {
    transform: translateY(0);
  }
  20% {
    transform: translateY(-24px);
  }
  25% {
    transform: translateY(-24px);
  }
  45% {
    transform: translateY(-48px);
  }
  50% {
    transform: translateY(-48px);
  }
  70% {
    transform: translateY(-72px);
  }
  75% {
    transform: translateY(-72px);
  }
  95% {
    transform: translateY(-96px);
  }
  100% {
    transform: translateY(-96px);
  }
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}

@keyframes pulse-glow {
  0% {
    filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.6));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(239, 68, 68, 1));
  }
  100% {
    filter: drop-shadow(0 0 4px rgba(239, 68, 68, 0.6));
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 10s linear infinite;
}
</style>
