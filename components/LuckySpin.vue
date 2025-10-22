<template>
  <div
    class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[99] max-lg:px-4"
    @click.self="emitClose"
  >
    <div>
      <div
        v-if="userData && userData.luckySpinAmount > 0"
        class="bg-[#1A0D13] border border-[#3b1c23] p-6 rounded-xl text-center shadow-2xl shadow-[#ff3344]/20"
      >
        <div class="relative mx-auto w-[200px] mb-4">
          <img
            src="/images/luckyspin/wheel-prize.png"
            alt="Wheel Prize"
            class="w-full h-auto opacity-50"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <span
              class="bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white px-3 py-1 rounded-md font-bold uppercase shadow-lg"
              >{{ $t("claimed") }}</span
            >
          </div>
        </div>

        <h3 class="text-xl font-bold text-[#f0eaea] mb-2">
          {{ $t("won_amount", { amount: userData.luckySpinAmount }) }}
        </h3>
        <p class="text-[#b37a7a] mb-4">
          {{ $t("deposit_to_claim") }}
        </p>

        <div class="flex justify-center gap-3">
          <NuxtLinkLocale
            to="/myaccount/deposit"
            class="px-4 py-2 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white rounded-lg lg:hover:brightness-110 transition shadow-lg shadow-[#ff3344]/30"
          >
            {{ $t("deposit_now") }}
          </NuxtLinkLocale>
          <button
            @click="emitClose"
            class="px-4 py-2 bg-[#241017]/60 text-[#f0eaea] rounded-lg lg:hover:bg-[#3b1c23] transition border border-[#3b1c23]"
          >
            {{ $t("close") }}
          </button>
        </div>
      </div>

      <div v-else>
        <div class="relative flex justify-center items-center">
          <img
            src="/images/luckyspin/wheel-prize.png"
            alt="Wheel Prize"
            class="w-[400px] max-w-full h-auto transition-transform duration-[4s] ease-in-out z-10 drop-shadow-2xl"
            :style="{
              transform: `rotate(${rotation}deg)`,
            }"
          />
          <img
            src="/images/luckyspin/spin.png"
            alt="Spin Button"
            class="w-[10%] h-auto absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 lg:hover:scale-110 transition-transform duration-200 drop-shadow-xl"
            @click="spinWheel"
          />
          <img
            src="/images/luckyspin/leg.png"
            alt="Spin Bottom"
            class="w-[60%] h-auto absolute left-1/2 bottom-[-15%] -translate-x-1/2 drop-shadow-xl"
          />
        </div>
        <div class="w-full flex justify-center mt-20">
          <button
            @click="emitClose"
            class="px-4 py-2 bg-[#241017]/60 text-[#f0eaea] rounded-lg lg:hover:bg-[#3b1c23] transition border border-[#3b1c23]"
          >
            {{ $t("close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["close", "win"]);
const rotation = ref(0);
const isSpinning = ref(false);
const userData = useState("userData");
const { showAlert } = useAlert();
const { get } = useApiEndpoint();

function emitClose() {
  emit("close");
}

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

const spinWheel = async () => {
  if (!userData.value) {
    showAlert($t("login_required"), $t("login_to_play"), "error");
    return;
  }

  if (userData.value.luckySpinAmount > 0) {
    showAlert($t("already_claimed"), $t("already_claimed_message"), "info");
    return;
  }

  if (isSpinning.value) return;

  isSpinning.value = true;
  try {
    const { post } = useApiEndpoint();
    const { data } = await post("luckySpinStartGame");

    if (data.success) {
      const randomPrize = data.prize;
      const targetAngle = randomPrize.angle;
      const currentRotation = rotation.value % 360;
      const extraRotation = (360 - currentRotation + targetAngle) % 360;
      const totalRotation = 360 * 5 + extraRotation;

      rotation.value += totalRotation;
      await new Promise((resolve) => {
        setTimeout(async () => {
          isSpinning.value = false;
          if (randomPrize.value > 0) {
            showAlert(
              $t("congratulations"),
              $t("won_message", { amount: randomPrize.value }),
              "success"
            );
          } else {
            showAlert($t("better_luck"), $t("try_again_message"), "info");
          }

          await fetchUserData();
          resolve();
        }, 4000);
      });
    } else {
      isSpinning.value = false;
      showAlert(
        $t("alert_error"),
        data.message.en || "An error occurred",
        "error"
      );
    }
  } catch (error) {
    isSpinning.value = false;
    showAlert($t("network_error"), $t("connect_server_failed"), "error");
  }
};
</script>
