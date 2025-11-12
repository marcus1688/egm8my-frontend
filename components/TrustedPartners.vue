<template>
  <section
    class="max-lg:hidden py-6 containerWid max-lg:py-2 relative overflow-hidden"
  >
    <div class="mx-auto px-4 max-lg:px-2">
      <div class="text-center mb-6">
        <h2
          class="text-2xl font-bold text-[#f0eaea] max-xl:text-xl max-md:text-base mb-1"
        >
          {{ $t("our_trusted_partners") }}
        </h2>
      </div>

      <div class="relative">
        <div
          class="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#15090e] to-transparent z-10 pointer-events-none max-lg:w-16"
        ></div>
        <div
          class="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#15090e] to-transparent z-10 pointer-events-none max-lg:w-16"
        ></div>

        <div class="overflow-hidden">
          <div class="flex animate-marquee hover:pause-animation">
            <div class="flex gap-6 min-w-max px-3">
              <div
                v-for="(partner, index) in partners"
                :key="'a-' + index"
                class="group bg-[#241017] rounded-xl p-6 flex items-center justify-center border border-[#3b1c23]"
                style="width: 200px; height: 90px"
              >
                <img
                  :src="partner.image"
                  :alt="partner.name || 'Partner Logo'"
                  class="max-w-full max-h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const partners = useState("partners");
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}

.animate-marquee:hover,
.hover\:pause-animation:hover {
  animation-play-state: paused;
}
</style>
