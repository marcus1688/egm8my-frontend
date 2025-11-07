<template>
  <section
    class="py-4 max-lg:hidden containerWid text-[#f0eaea] relative overflow-hidden"
  >
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="particles-container">
        <div
          v-for="i in 20"
          :key="i"
          class="particle absolute rounded-full bg-[#ff3344] opacity-10"
          :style="{
            width: `${Math.random() * 12 + 5}px`,
            height: `${Math.random() * 12 + 5}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 15}s`,
          }"
        ></div>
      </div>
    </div>
    <div class="mx-auto px-4 relative z-10">
      <div class="text-center mb-8">
        <div
          class="inline-block px-3 py-1 bg-[#241017] rounded-full mb-3 border border-[#3b1c23]"
        >
          <span
            class="text-sm max-xl:text-xs font-medium text-[#ff3344] uppercase"
            >{{ $t("get_started_in_minutes") }}</span
          >
        </div>
        <h2
          class="text-2xl font-bold text-[#f0eaea] max-xl:text-xl max-md:text-base mb-1"
        >
          {{ $t("how_to_start_winning") }}
        </h2>
        <p class="text-[#b37a7a] text-base max-xl:text-sm max-w-2xl mx-auto">
          {{ $t("winning_journey_description") }}
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(step, index) in registrationSteps" :key="index" class="">
          <div
            class="relative bg-[#241017] rounded-lg p-6 text-center group h-full border border-[#3b1c23] shadow-sm lg:hover:shadow-md lg:hover:shadow-[#ff3344]/20 transition-all duration-300"
          >
            <div
              class="absolute -top-5 -left-5 w-12 h-12 max-[1023px]:w-9 max-[1023px]:h-9 rounded-full bg-[#a1122d] text-white flex items-center justify-center homeMainTxt4 font-bold border border-[#3b1c23]"
            >
              {{ index + 1 }}
            </div>
            <div
              class="mb-4 mx-auto w-16 h-16 bg-[#15090e] rounded-full flex items-center justify-center border border-[#3b1c23]"
            >
              <i :class="step.icon + ' text-3xl text-[#ff3344]'"></i>
            </div>
            <h3 class="text-lg max-xl:text-base font-bold mb-2 text-[#f0eaea]">
              {{ step.title }}
            </h3>
            <p class="text-sm max-xl:textxs text-[#b37a7a]">
              {{ step.description }}
            </p>
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#a1122d] to-[#ff3344] scale-x-0 lg:group-hover:scale-x-100 transition-transform duration-500 rounded-b-lg"
            ></div>
          </div>
        </div>
      </div>
      <div class="mt-12 text-center">
        <NuxtLinkLocale :to="isUserLoggedIn ? '/games/slots' : '/register'">
          <button
            class="pulse-button homeMainTxt2 px-8 py-3.5 bg-[#a1122d] text-white lg:hover:bg-[#c21b3a] rounded-lg font-bold transition-all duration-300 inline-flex items-center gap-2 lg:hover:gap-3 shadow-lg shadow-[#a1122d]/20 lg:hover:shadow-xl lg:hover:shadow-[#c21b3a]/30 border border-[#ff3344]"
          >
            {{ isUserLoggedIn ? $t("play_now") : $t("sign_up_now") }}
            <i
              class="bi bi-arrow-right transition-transform duration-300 lg:group-hover:translate-x-1"
            ></i>
          </button>
        </NuxtLinkLocale>
      </div>
    </div>
  </section>
</template>

<script setup>
const isUserLoggedIn = useState("isUserLoggedIn");
const registrationSteps = ref([
  {
    title: $t("create_account"),
    description: $t("create_account_description"),
    icon: "bi bi-person-plus",
  },
  {
    title: $t("make_deposit"),
    description: $t("make_deposit_description"),
    icon: "bi bi-wallet2",
  },
  {
    title: $t("play_games"),
    description: $t("play_games_description"),
    icon: "bi bi-controller",
  },
  {
    title: $t("win_withdraw"),
    description: $t("win_withdraw_description"),
    icon: "bi bi-trophy",
  },
]);
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0.1;
  }
  25% {
    transform: translateY(-30px) translateX(15px);
    opacity: 0.15;
  }
  50% {
    transform: translateY(-70px) translateX(-15px);
    opacity: 0.2;
  }
  75% {
    transform: translateY(-100px) translateX(10px);
    opacity: 0.1;
  }
  100% {
    transform: translateY(-150px) translateX(0);
    opacity: 0;
  }
}

.particle {
  animation: float linear infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.5);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
  }
}

.pulse-button {
  animation: pulse 2s infinite;
}
</style>
