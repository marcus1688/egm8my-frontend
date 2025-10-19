<template>
  <ClientOnly>
    <div
      class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      <div class="containerWid py-8 max-lg:py-4 max-lg:px-4">
        <div class="max-w-lg mx-auto">
          <div
            class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 mb-6 lg:hover:shadow-2xl transition-all duration-300"
          >
            <div class="text-center p-6 pb-4">
              <div
                class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-2 shadow-lg"
              >
                <i class="bi bi-dice-5-fill text-2xl text-white"></i>
              </div>
              <h2
                class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2"
              >
                {{ $t("lucky_draw") }}
              </h2>
              <p class="text-gray-600 text-sm">
                {{ $t("lucky_draw_desc") }}
              </p>
            </div>

            <div class="px-6">
              <div class="relative mb-6">
                <div
                  class="absolute -inset-3 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-2xl opacity-20 animate-pulse-slow"
                ></div>
                <div
                  class="relative grid grid-cols-3 gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-br from-yellow-50 to-red-50 rounded-xl border-2 border-yellow-200"
                >
                  <div
                    v-for="(prize, index) in displayPrizes"
                    :key="index"
                    class="aspect-square relative rounded-lg overflow-hidden transition-all duration-300"
                    :class="[
                      currentIndex === index
                        ? 'ring-4 ring-yellow-400  shadow-xl animate-bounce-light'
                        : '',
                      index === 4 ? 'col-start-2 row-start-2' : '',
                    ]"
                  >
                    <div v-if="index === 4" class="w-full h-full p-1">
                      <button
                        @click="startSpin"
                        :disabled="isSpinning"
                        class="w-full h-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold rounded-xl shadow-lg transition-all duration-300 relative overflow-hidden group border-2 border-yellow-300"
                        :class="[
                          isSpinning
                            ? 'opacity-50 cursor-not-allowed'
                            : 'lg:hover:from-yellow-300 lg:hover:to-orange-400',
                        ]"
                      >
                        <div
                          class="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                        ></div>
                        <div
                          class="relative z-10 flex flex-col items-center justify-center h-full"
                        >
                          <i
                            class="bi bi-dice-5 text-2xl sm:text-3xl mb-1 drop-shadow-lg"
                            :class="isSpinning ? 'animate-pulse' : ''"
                          ></i>
                          <span
                            class="text-xs sm:text-sm font-bold tracking-wide drop-shadow-md uppercase"
                          >
                            {{ isSpinning ? $t("drawing") : $t("start") }}
                          </span>
                        </div>
                        <div
                          v-if="isSpinning"
                          class="absolute inset-0 bg-white/10 animate-ping rounded-xl"
                        ></div>
                        <div
                          v-if="!isSpinning"
                          class="absolute inset-0 rounded-xl border-2 border-white/20 animate-pulse-slow"
                        ></div>
                      </button>
                    </div>
                    <div
                      v-else
                      class="w-full h-full bg-white rounded-lg shadow-md border-2 border-gray-100 p-1 sm:p-2 flex flex-col items-center justify-center relative overflow-hidden"
                    >
                      <div class="w-full h-12 sm:h-16 mb-1 sm:mb-2 relative">
                        <img
                          :src="prize?.image"
                          :alt="prize?.name"
                          class="w-full h-full object-contain"
                        />
                      </div>

                      <p
                        class="text-[10px] sm:text-xs text-center text-gray-700 font-medium leading-tight px-1"
                        :class="{
                          'line-clamp-1': prize?.name.length > 8,
                          'line-clamp-2': prize?.name.length <= 8,
                        }"
                      >
                        {{ prize?.name }}
                      </p>
                      <div
                        v-if="currentIndex === index"
                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="px-6 pb-6 hidden">
              <div
                class="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100"
              >
                <p class="text-blue-700 text-sm font-medium">
                  {{ $t("draw_cost") }}
                  <span class="font-bold text-red-500 text-lg mx-1">1</span>
                  {{ $t("chance") }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- Terms and Conditions Card -->
        <div class="flex justify-center">
          <div
            class="relative lg:min-w-[800px] bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 mb-6"
          >
            <div
              class="absolute -right-0 -top-[42%] transform -translate-y-1/2 z-10 max-lg:hidden"
            >
              <img
                src="/images/luckydraw/character.png"
                alt="Lucky Draw Character"
                class="w-[15rem] h-auto object-contain"
              />
            </div>

            <div class="flex items-center mb-4">
              <i class="bi bi-info-circle text-blue-500 text-xl mr-3"></i>
              <h3 class="text-lg font-bold text-gray-800">
                {{ $t("terms_conditions") }}
              </h3>
            </div>
            <div class="space-y-3 text-sm text-gray-700">
              <div class="flex items-center">
                <i
                  class="bi bi-dot text-blue-500 text-xl mr-2 mt-0.5 flex-shrink-0"
                ></i>
                <p>{{ $t("term_daily_topup") }}</p>
              </div>
              <div class="flex items-center">
                <i
                  class="bi bi-dot text-blue-500 text-xl mr-2 mt-0.5 flex-shrink-0"
                ></i>
                <p>{{ $t("term_auto_credit") }}</p>
              </div>
              <div class="flex items-center">
                <i
                  class="bi bi-dot text-blue-500 text-xl mr-2 mt-0.5 flex-shrink-0"
                ></i>
                <p>{{ $t("term_high_value") }}</p>
              </div>
              <div class="flex items-center">
                <i
                  class="bi bi-dot text-blue-500 text-xl mr-2 mt-0.5 flex-shrink-0"
                ></i>
                <p>{{ $t("term_wallet_requirement") }}</p>
              </div>
              <div class="flex items-center">
                <i
                  class="bi bi-dot text-blue-500 text-xl mr-2 mt-0.5 flex-shrink-0"
                ></i>
                <p>{{ $t("term_once_daily") }}</p>
              </div>
              <div class="flex items-center">
                <i
                  class="bi bi-dot text-blue-500 text-xl mr-2 mt-0.5 flex-shrink-0"
                ></i>
                <p>{{ $t("term_verification") }}</p>
              </div>

              <div class="flex items-center">
                <i
                  class="bi bi-dot text-blue-500 text-xl mr-2 mt-0.5 flex-shrink-0"
                ></i>
                <p>{{ $t("term_general") }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Result Modal -->
    <div
      v-if="showResult && result"
      class="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      @click.self="closeResult"
    >
      <div
        class="bg-white rounded-2xl p-6 max-w-sm w-full mx-auto relative animate-fade-in-up shadow-2xl border border-blue-100"
      >
        <div class="text-center">
          <div
            class="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center animate-bounce-slow shadow-lg"
          >
            <i class="bi bi-trophy-fill text-3xl text-white"></i>
          </div>
          <h3 class="text-2xl font-bold text-blue-700 mb-2">
            {{ $t("congratulations") }}
          </h3>

          <div class="mb-4">
            <div
              class="w-28 h-28 mx-auto mb-3 bg-blue-50 rounded-xl p-2 border-2 border-blue-200"
            >
              <img
                :src="`/images/luckydraw/image_${result.gridPosition + 1}.png`"
                :alt="result.name"
                class="w-full h-full object-contain rounded-lg"
              />
            </div>
            <p class="text-lg font-bold text-blue-600">{{ result.name }}</p>
          </div>
          <div class="bg-blue-50 rounded-lg p-3 mb-6 border border-blue-100">
            <p class="text-blue-700 text-sm">
              {{ $t("prize_desc") }}
            </p>
          </div>

          <div class="space-y-3">
            <button
              @click="closeResult"
              class="w-full py-2 text-blue-600 lg:hover:text-blue-700 transition-colors font-medium"
            >
              {{ $t("close") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const { get, post } = useApiEndpoint();
const { alertVisible, alertTitle, alertMessage, alertType, showAlert } =
  useAlert();
const userData = useState("userData");
const isSpinning = ref(false);
const currentIndex = ref(-1);
const result = ref(null);
const showResult = ref(false);
const pageLoading = useState("pageLoading");
const prizes = ref([]);
const gridPositions = [0, 1, 2, 5, 8, 7, 6, 3];
const isUserLoggedIn = useState("isUserLoggedIn");

const displayPrizes = computed(() => {
  const result = Array(9).fill(null);
  prizes.value.forEach((prize) => {
    result[prize.gridPosition] = prize;
  });
  result[4] = { id: "draw-button", name: "抽奖", isButton: true };
  return result;
});

const fetchPrizes = async () => {
  try {
    const { data } = await get("luckydraw9grid/prizes");
    if (data.success) {
      prizes.value = data.data.map((prize) => ({
        ...prize,
        image: `/images/luckydraw/image_${prize.gridPosition + 1}.png`,
      }));
    }
  } catch (error) {
    console.error("Error fetching prizes:", error);
  }
};

const fetchUserData = async () => {
  try {
    const { data } = await get("userdata");
    if (data.success) {
      userData.value = data.user;
    }
  } catch (error) {
    console.error("Error fetching helps:", error);
  }
};

const startSpin = async () => {
  if (!isUserLoggedIn.value) {
    showAlert($t("info"), $t("please_login_to_play_lucky_draw"), "info");
    return;
  }
  isSpinning.value = true;
  try {
    const { data } = await post("luckydraw9grid/spin");
    if (data.success) {
      const winningPrize = data.data.prize;
      const winningGridIndex = gridPositions.findIndex(
        (pos) => pos === winningPrize.gridPosition
      );
      await runSpinAnimation(winningGridIndex);
      result.value = winningPrize;
      showResult.value = true;
      await fetchUserData();
    } else {
      showAlert(
        $t("info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Lucky Draw Error:", error);
  } finally {
    isSpinning.value = false;
  }
};

const runSpinAnimation = (targetIndex) => {
  return new Promise((resolve) => {
    let currentPos = 0;
    let spinCount = 0;
    const totalSpins = 3;
    let currentSpeed = 150;
    const baseSpeed = 150;
    const animate = () => {
      currentIndex.value = gridPositions[currentPos];
      currentPos = (currentPos + 1) % 8;
      if (currentPos === 0) spinCount++;
      if (spinCount < totalSpins - 1) {
        currentSpeed = baseSpeed;
      } else if (spinCount === totalSpins - 1) {
        currentSpeed = baseSpeed + currentPos * 40;
      } else if (spinCount >= totalSpins) {
        if (currentPos === (targetIndex + 1) % 8) {
          currentIndex.value = gridPositions[targetIndex];
          setTimeout(() => {
            setTimeout(resolve, 600);
          }, 300);
          return;
        } else {
          currentSpeed = baseSpeed + 200 + currentPos * 50;
        }
      }
      requestAnimationFrame(() => {
        setTimeout(animate, currentSpeed);
      });
    };
    animate();
  });
};

const closeResult = () => {
  showResult.value = false;
  result.value = null;
};

onMounted(async () => {
  pageLoading.value = true;
  try {
    await Promise.all([fetchPrizes()]);
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});

useHead({
  title: "EGM8 | Lucky Draw",
  meta: [
    {
      property: "og:title",
      content: "EGM8 | Lucky Draw",
    },
    {
      name: "description",
      content:
        "Join EGM8's exciting 9 grid lucky draw game! Win amazing prizes including cash rewards and exclusive bonuses. Test your luck today!",
    },
    {
      name: "keywords",
      content:
        "EGM8 lucky draw, 9 grid lottery, casino games, win prizes, cash rewards, online gaming Malaysia",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.egm8my.vip/luckydraw",
    },
  ],
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.4;
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

@keyframes shine {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

.animate-fade-in-up {
  animation: fade-in-up 0.4s ease-out;
}

.animate-fade-in-down {
  animation: fade-in-down 0.3s ease-out;
}

.animate-bounce-light {
  animation: bounce-light 0.6s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-slow 2s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-spin-slow {
  animation: spin-slow 1s linear infinite;
}

.animate-shine {
  animation: shine 1.5s ease-in-out infinite;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@media (max-width: 640px) {
  .containerWid {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .grid-cols-3 {
    gap: 0.5rem;
  }

  .aspect-square {
    min-height: 80px;
  }
}
</style>
