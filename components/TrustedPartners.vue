<template>
  <section class="py-4 containerWid">
    <div class="mx-auto px-4 max-lg:px-0">
      <h2
        class="homeMainTxt3 font-bold text-[#f0eaea] mb-4 max-lg:mb-2 text-center"
      >
        {{ $t("our_trusted_partners") }}
      </h2>
      <div class="partners-container overflow-hidden w-full">
        <div class="marquee-wrapper flex">
          <div class="marquee flex animate-marquee">
            <div
              v-for="(partner, index) in partners"
              :key="'a-' + index"
              class="bg-[#241017] rounded-lg p-4 h-20 flex items-center justify-center border border-[#3b1c23] mx-2"
              style="min-width: 180px"
            >
              <img
                :src="partner.image"
                alt="Partner Logo"
                class="w-32 max-lg:w-24 max-w-[80px]"
              />
            </div>
          </div>
          <div class="marquee flex animate-marquee">
            <div
              v-for="(partner, index) in partners"
              :key="'b-' + index"
              class="bg-[#241017] rounded-lg p-4 h-20 flex items-center justify-center border border-[#3b1c23] mx-2"
              style="min-width: 180px"
            >
              <img
                :src="partner.image"
                alt="Partner Logo"
                class="w-32 max-lg:w-24 max-w-[80px]"
              />
            </div>
          </div>
        </div>
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

const partners = useState("partners");
</script>

<style scoped>
.marquee-wrapper {
  width: max-content;
}

.marquee {
  width: max-content;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

.marquee-wrapper:hover .animate-marquee {
  animation-play-state: paused;
}
</style>
