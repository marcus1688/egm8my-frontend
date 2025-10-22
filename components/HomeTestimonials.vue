<template>
  <section class="py-4 containerWid max-lg:py-2">
    <div class="mx-auto px-4 max-lg:px-0">
      <!-- Section Header -->
      <div class="mb-8 max-lg:mb-3">
        <h2 class="homeMainTxt3 font-bold text-[#f0eaea] mb-2">
          {{ $t("what_our_players_say") }}
        </h2>
        <div class="w-16 h-1 bg-[#ff3344] rounded-full"></div>
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
        :navigation="{
          nextEl: '.testimonial-next-btn',
          prevEl: '.testimonial-prev-btn',
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
          class="h-auto pb-4"
        >
          <div
            class="bg-[#241017] rounded-xl shadow-lg shadow-[#ff3344]/10 p-6 h-full min-h-[300px] max-lg:min-h-[200px] flex flex-col relative overflow-hidden max-lg:p-4 border border-[#3b1c23]"
          >
            <!-- Colored corner accent -->
            <div
              class="absolute top-0 right-0 w-16 h-16 transform translate-x-8 -translate-y-8 rotate-45 bg-[#ff3344] opacity-10"
            ></div>

            <!-- Rating -->
            <div class="flex mb-3 max-[1023px]:pl-2 pl-4 text-yellow-400">
              <i
                v-for="n in Math.floor(review.rating)"
                :key="n"
                class="bi bi-star-fill"
              ></i>
              <i v-if="review.rating % 1 !== 0" class="bi bi-star-half"></i>
            </div>

            <!-- Quote with truncation -->
            <div class="relative z-10 mb-4 flex-grow">
              <div class="pl-4 max-[1023px]:pl-2 relative">
                <h4 class="font-semibold mb-2 text-[#f0eaea]">
                  {{ review.title }}
                </h4>
                <div class="text-[#b37a7a] line-clamp-4 mb-1 homeMainTxt2">
                  {{ review.description }}
                </div>
              </div>
            </div>

            <!-- User info -->
            <div
              class="flex items-center mt-auto pt-4 border-t border-[#3b1c23]"
            >
              <div class="flex-grow">
                <h3 class="titletext font-bold text-[#f0eaea]">
                  {{ review.author }}
                </h3>
                <p class="subtitletext text-[#b37a7a]">
                  {{ $t("verified_player") }}
                </p>
              </div>
              <div class="ml-auto">
                <span
                  class="inline-flex items-center px-2 py-1 bg-[#15090e] text-[#4ade80] titletext rounded-full border border-[#3b1c23]"
                >
                  <i class="bi bi-shield-check mr-1"></i>
                  {{ $t("verified") }}
                </span>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <div
        class="testimonial-pagination flex justify-center mt-6 max-lg:mt-0"
      ></div>
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
:deep(.testimonial-pagination .swiper-pagination-bullet) {
  width: 8px;
  height: 8px;
  background-color: #3b1c23;
  opacity: 1;
}
:deep(.testimonial-pagination .swiper-pagination-bullet-active) {
  background-color: #ff3344;
  width: 24px;
  border-radius: 4px;
}
.bi-quote {
  font-size: 3rem;
  line-height: 1;
}
</style>
