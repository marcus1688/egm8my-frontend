<template>
  <section class="py-12 containerWid max-lg:py-6">
    <div class="mx-auto px-4 max-lg:px-2">
      <!-- Section Header -->
      <div class="mb-4 text-center">
        <h2
          class="text-2xl font-bold text-[#f0eaea] max-xl:text-xl max-md:text-base mb-1"
        >
          {{ $t("what_our_players_say") }}
        </h2>
      </div>

      <!-- Testimonial Slider -->
      <swiper
        :modules="[Navigation, Autoplay, Pagination]"
        :slidesPerView="1"
        :spaceBetween="20"
        :loop="true"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :pagination="{
          clickable: true,
          el: '.testimonial-pagination',
        }"
        :breakpoints="{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }"
        class="testimonials-swiper"
      >
        <swiper-slide
          v-for="(review, index) in reviews"
          :key="index"
          class="h-auto"
        >
          <div
            class="bg-[#241017] rounded-xl border border-[#3b1c23] p-6 flex flex-col transition-all duration-300 max-lg:p-5 h-[320px] max-lg:h-[280px]"
          >
            <!-- Rating Stars -->
            <div class="flex gap-0.5 mb-4 flex-shrink-0">
              <i
                v-for="n in 5"
                :key="n"
                :class="
                  n <= Math.floor(review.rating)
                    ? 'bi bi-star-fill text-[#fbbf24]'
                    : 'bi bi-star text-[#3b1c23]'
                "
              ></i>
            </div>

            <!-- Review Content - Scrollable if needed -->
            <div class="flex-grow mb-4 overflow-hidden">
              <h4 class="font-bold text-base mb-2 text-[#f0eaea] line-clamp-2">
                {{ review.title }}
              </h4>
              <p class="text-sm text-[#b37a7a] leading-relaxed line-clamp-5">
                "{{ review.description }}"
              </p>
            </div>

            <!-- Author - Always at bottom -->
            <div
              class="flex items-center gap-3 pt-4 border-t border-[#3b1c23] flex-shrink-0"
            >
              <div
                class="w-10 h-10 rounded-full bg-[#1A0D13] border-2 border-[#ff3344] flex items-center justify-center text-[#ff3344] font-bold flex-shrink-0"
              >
                {{ review.author.charAt(0) }}
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-[#f0eaea] text-sm truncate">
                  {{ review.author }}
                </h3>
                <p class="text-xs text-[#4ade80] flex items-center gap-1">
                  <i class="bi bi-patch-check-fill"></i>
                  {{ $t("verified") }}
                </p>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <!-- Pagination -->
      <div class="testimonial-pagination flex justify-center mt-8"></div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const pageLoading = useState("pageLoading");
const reviews = ref([]);
const colors = [
  "blue",
  "purple",
  "green",
  "red",
  "yellow",
  "indigo",
  "orange",
  "teal",
];

const fetchReviews = async () => {
  try {
    const { get } = useApiEndpoint();
    const { data } = await get("reviews");
    if (data.success) {
      reviews.value = data.data.map((review, index) => ({
        ...review,
        title:
          $locale.value === "zh"
            ? review.titleCN
            : $locale.value === "ms"
            ? review.titleMS
            : review.titleEN,
        description:
          $locale.value === "zh"
            ? review.descriptionCN
            : $locale.value === "ms"
            ? review.descriptionMS
            : review.descriptionEN,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    }
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

onMounted(async () => {
  try {
    await fetchReviews();
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});
</script>

<style scoped>
/* Modern Pagination Dots */
:deep(.testimonial-pagination) {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
}

:deep(.testimonial-pagination .swiper-pagination-bullet) {
  width: 10px;
  height: 10px;
  background-color: #3b1c23;
  opacity: 1;
  transition: all 0.3s ease;
  border-radius: 50%;
  margin: 0 !important;
}

:deep(.testimonial-pagination .swiper-pagination-bullet:hover) {
  background-color: #ff3344;
  transform: scale(1.2);
}

:deep(.testimonial-pagination .swiper-pagination-bullet-active) {
  background-color: #ff3344;
  width: 32px;
  border-radius: 6px;
  box-shadow: 0 0 12px rgba(255, 51, 68, 0.4);
}

/* Ensure swiper slides have equal height */
:deep(.testimonials-swiper .swiper-wrapper) {
  align-items: stretch;
}

:deep(.testimonials-swiper .swiper-slide) {
  height: auto;
}
</style>
