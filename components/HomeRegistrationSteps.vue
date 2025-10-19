<template>
  <section
    class="py-16 max-[768px]:hidden containerWid bg-gray-50 text-gray-800 relative overflow-hidden"
  >
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="particles-container">
        <div
          v-for="i in 20"
          :key="i"
          class="particle absolute rounded-full bg-blue-500 opacity-10"
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
      <div class="text-center mb-12">
        <div class="inline-block px-3 py-1 bg-blue-100 rounded-full mb-3">
          <span class="homeSubTxt1 font-medium text-blue-700 uppercase">{{
            $t("get_started_in_minutes")
          }}</span>
        </div>
        <h2 class="homeMainTxt3 font-bold mb-2 text-gray-900">
          {{ $t("how_to_start_winning") }}
        </h2>
        <p class="text-gray-600 homeMainTxt2 max-w-2xl mx-auto">
          {{ $t("winning_journey_description") }}
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div v-for="(step, index) in registrationSteps" :key="index" class="">
          <div
            class="relative bg-white rounded-lg p-6 text-center group h-full border border-gray-200 shadow-sm lg:hover:shadow-md transition-shadow duration-300"
          >
            <div
              class="absolute -top-5 -left-5 w-12 h-12 max-[1023px]:w-9 max-[1023px]:h-9 rounded-full bg-blue-600 text-white flex items-center justify-center homeMainTxt4 font-bold"
            >
              {{ index + 1 }}
            </div>
            <div
              class="mb-4 mx-auto w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center"
            >
              <i :class="step.icon + ' text-3xl text-blue-600'"></i>
            </div>
            <h3 class="homeMainTxt4 font-bold mb-2 text-gray-800">
              {{ step.title }}
            </h3>
            <p class="homeSubTxt1 text-gray-600">
              {{ step.description }}
            </p>
            <div
              class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-400 scale-x-0 lg:group-hover:scale-x-100 transition-transform duration-500 rounded-b-lg"
            ></div>
          </div>
        </div>
      </div>
      <div class="mt-12 text-center">
        <NuxtLinkLocale :to="isUserLoggedIn ? '/games/slots' : '/register'">
          <button
            class="pulse-button homeMainTxt2 px-8 py-3.5 bg-blue-600 text-white lg:hover:bg-blue-700 rounded-lg font-bold transition-all duration-300 inline-flex items-center gap-2 lg:hover:gap-3 shadow-lg shadow-blue-900/20 lg:hover:shadow-xl lg:hover:shadow-blue-900/30 lg:hover:-translate-y-1"
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
