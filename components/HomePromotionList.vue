<template>
  <section class="py-4 containerWid max-lg:py-2">
    <div class="my-4">
      <div class="flex items-center justify-between mb-1">
        <h2
          class="text-2xl font-bold text-[#f0eaea] max-xl:text-xl max-md:text-base"
        >
          {{ $t("promotions") }}
        </h2>

        <NuxtLinkLocale
          to="/promotions"
          class="flex items-center gap-2 text-sm font-semibold text-[#ff3344] max-lg:text-xs"
        >
          {{ $t("view_all") }}
          <i class="bi bi-arrow-right"></i>
        </NuxtLinkLocale>
      </div>

      <div class="flex items-center gap-3">
        <p class="text-sm text-[#b37a7a] max-lg:text-xs">
          {{ $t("latest_promotions_description") }}
        </p>
        <div
          class="flex-1 h-px bg-gradient-to-r from-[#3b1c23] to-transparent"
        ></div>
      </div>
    </div>
    <div class="mx-auto">
      <div class="relative">
        <swiper
          :modules="[Autoplay, Navigation]"
          :slidesPerView="1.1"
          :spaceBetween="12"
          :loop="false"
          :centeredSlides="false"
          :autoplay="{
            delay: 4000,
            disableOnInteraction: false,
          }"
          :navigation="{
            nextEl: '.promo-button-next',
            prevEl: '.promo-button-prev',
          }"
          :breakpoints="{
            540: {
              slidesPerView: 2.2,
              spaceBetween: 16,
            },
            850: {
              slidesPerView: 3.2,
              spaceBetween: 20,
            },
            1365: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }"
          class="promotion-swiper"
        >
          <swiper-slide
            v-for="(promo, index) in filteredPromotions"
            :key="index"
          >
            <div
              class="rounded-lg overflow-hidden bg-[#241017] h-full border border-[#3b1c23]"
            >
              <div class="relative overflow-hidden">
                <NuxtLinkLocale to="/promotions">
                  <img
                    :src="getPromotionImage(promo)"
                    alt="Promotion Image"
                    class="w-full h-full"
                  />
                </NuxtLinkLocale>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <button
          class="promo-button-prev max-lg:hidden absolute top-1/2 -left-8 max-[1080px]:-left-3 z-10 transform -translate-y-1/2 w-10 h-10 max-[1080px]:w-8 max-[1080px]:h-8 bg-[#a1122d] rounded-full flex items-center justify-center text-white transition-all duration-300 lg:hover:bg-[#c21b3a]"
        >
          <i
            class="bi bi-chevron-left text-sm font-bold max-[1080px]:text-xs"
          ></i>
        </button>
        <button
          class="promo-button-next max-lg:hidden absolute top-1/2 -right-8 max-[1080px]:-right-3 z-10 transform -translate-y-1/2 w-10 h-10 max-[1080px]:w-8 max-[1080px]:h-8 bg-[#a1122d] rounded-full flex items-center justify-center text-white transition-all duration-300 lg:hover:bg-[#c21b3a]"
        >
          <i
            class="bi bi-chevron-right text-sm font-bold max-[1080px]:text-xs"
          ></i>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const pageLoading = useState("pageLoading");
const promotions = ref([]);
const { get } = useApiEndpoint();

function getPromotionImage(promotion) {
  if ($locale.value === "zh" && promotion.promotionimage2) {
    return promotion.promotionimage2;
  }
  if ($locale.value === "ms" && promotion.promotionimage3) {
    return promotion.promotionimage3;
  }

  return promotion.promotionimage;
}
async function fetchPromotion() {
  try {
    const { data } = await get("client/getallpromotion");
    if (data.success) {
      promotions.value = data.promotions;
    }
  } catch (error) {
    console.error("Error fetching promotions:", error);
  }
}

const filteredPromotions = computed(() => {
  if (!promotions.value) return [];
  return promotions.value;
  const chinesePromotionIds = new Set(Object.values(chineseImageMapping));

  if ($locale.value === "zh") {
    return promotions.value.filter((promo) => {
      return (
        chineseImageMapping[promo._id] && !chinesePromotionIds.has(promo._id)
      );
    });
  } else {
    return promotions.value.filter((promo) => {
      return !chinesePromotionIds.has(promo._id);
    });
  }
});

onMounted(async () => {
  try {
    await fetchPromotion();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});
</script>

<style scoped>
/* Disabled state for navigation buttons */
:deep(.promo-button-prev.swiper-button-disabled),
:deep(.promo-button-next.swiper-button-disabled) {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
  background: #3b1c23 !important;
}

/* Active state hover - only when not disabled */
:deep(.promo-button-prev:not(.swiper-button-disabled)),
:deep(.promo-button-next:not(.swiper-button-disabled)) {
  background: #a1122d;
}

@media (min-width: 1024px) {
  :deep(.promo-button-prev:not(.swiper-button-disabled):hover),
  :deep(.promo-button-next:not(.swiper-button-disabled):hover) {
    background: #c21b3a !important;
  }
}
</style>
