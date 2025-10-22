<template>
  <section class="py-4 containerWid max-lg:py-2">
    <div
      class="flex justify-between max-[360px]:flex-col max-[360px]:items-start max-[360px]:gap-2 items-center mb-4 max-lg:mb-2"
    >
      <div>
        <h2
          class="homeMainTxt3 font-bold text-gray-200 flex items-center max-lg:text-lg"
        >
          <i class="bi bi-stars text-[#ff3344] mr-2"></i>
          {{ $t("promotions") }}
        </h2>
        <p class="text-sm text-gray-400 mt-1 max-lg:text-xs">
          {{ $t("latest_promotions_description") }}
        </p>
      </div>
      <NuxtLinkLocale
        to="/promotions"
        class="text-[#b37a7a] homeSubTxt1 lg:hover:text-[#f0eaea] lg:hover:underline flex items-center gap-1 transition-colors text-nowrap max-lg:pl-2"
      >
        View all
        <i class="bi bi-chevron-right text-xs"></i>
      </NuxtLinkLocale>
    </div>
    <div class="mx-auto">
      <div class="relative">
        <swiper
          :modules="[Autoplay, Navigation, Pagination]"
          :slidesPerView="1"
          :spaceBetween="16"
          :loop="true"
          :pagination="{
            clickable: true,
          }"
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
              slidesPerView: 2,
              spaceBetween: 16,
            },
            850: {
              slidesPerView: 3,
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
              class="rounded-lg overflow-hidden shadow-sm lg:hover:shadow-md transition-all duration-300 group bg-[#241017] h-full border border-[#3b1c23] lg:hover:border-[#4e252d]"
            >
              <div class="relative overflow-hidden">
                <NuxtLinkLocale to="/promotions">
                  <NuxtImg
                    :src="getPromotionImage(promo)"
                    alt="Promotion Image"
                    class="w-full h-full object-cover lg:group-hover:scale-105 transition-transform duration-500"
                  />
                </NuxtLinkLocale>
              </div>
              <div class="p-4 hidden">
                <h3
                  class="homeMainTxt2 font-medium text-[#f0eaea] mb-2 line-clamp-1"
                >
                  {{ promo.maintitleEN }}
                </h3>
                <p class="homeSubTxt1 text-[#b37a7a] mb-3 line-clamp-2">
                  {{ promo.description }}
                </p>
                <button
                  class="w-full py-2 bg-[#a1122d] lg:hover:bg-[#c21b3a] text-white homeMainTxt2 font-medium rounded transition-colors"
                >
                  {{ $t("claim_now") }}
                </button>
              </div>
            </div>
          </swiper-slide>
        </swiper>
        <button
          class="promo-button-prev max-lg:hidden absolute top-1/2 -left-8 z-10 transform -translate-y-1/2 w-10 h-10 bg-[#15090e] rounded-full shadow-md flex items-center justify-center text-[#b37a7a] lg:hover:bg-[#241017] lg:hover:text-[#f0eaea] transition-colors border border-[#3b1c23]"
        >
          <i class="bi bi-chevron-left text-xl"></i>
        </button>
        <button
          class="promo-button-next max-lg:hidden absolute top-1/2 -right-8 z-10 transform -translate-y-1/2 w-10 h-10 bg-[#15090e] rounded-full shadow-md flex items-center justify-center text-[#b37a7a] lg:hover:bg-[#241017] lg:hover:text-[#f0eaea] transition-colors border border-[#3b1c23]"
        >
          <i class="bi bi-chevron-right text-xl"></i>
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

// Chinese image mapping - same as in your main promotions page
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
  // if ($locale.value === "zh" && chineseImageMapping[promotion._id]) {
  //   const chinesePromo = promotions.value?.find(
  //     (p) => p._id === chineseImageMapping[promotion._id]
  //   );

  //   if (chinesePromo && chinesePromo.promotionimage) {
  //     return chinesePromo.promotionimage;
  //   }
  // }

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
@media (max-width: 1023px) {
  :deep(.promotion-swiper .swiper-pagination) {
    bottom: 12px;
    display: flex;
    justify-content: center;
    gap: 6px;
  }

  :deep(.promotion-swiper .swiper-pagination-bullet) {
    width: 8px;
    height: 8px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 1;
    transition: all 0.3s;
    border-radius: 50%;
  }

  :deep(.promotion-swiper .swiper-pagination-bullet-active) {
    background: #ff3344;
    width: 24px;
    border-radius: 4px;
  }
}

/* 大屏幕隐藏 pagination */
@media (min-width: 1024px) {
  :deep(.promotion-swiper .swiper-pagination) {
    display: none;
  }
}
</style>
