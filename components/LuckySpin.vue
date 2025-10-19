<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99] max-lg:px-4"
    @click.self="emitClose"
  >
    <div>
      <!-- Already Claimed View -->
      <div
        v-if="userData && userData.luckySpinAmount > 0"
        class="bg-white p-6 rounded-lg text-center"
      >
        <div class="relative mx-auto w-[200px] mb-4">
          <img
            src="/images/luckyspin/wheel-prize.png"
            alt="Wheel Prize"
            class="w-full h-auto opacity-50"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <span
              class="bg-red-600 text-white px-3 py-1 rounded-md font-bold uppercase"
              >{{ $t("claimed") }}</span
            >
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-800 mb-2">
          {{ $t("won_amount", { amount: userData.luckySpinAmount }) }}
        </h3>
        <p class="text-gray-600 mb-4">
          {{ $t("deposit_to_claim") }}
        </p>

        <div class="flex justify-center gap-3">
          <NuxtLinkLocale
            to="/myaccount/deposit"
            class="px-4 py-2 bg-blue-600 text-white rounded-md lg:hover:bg-blue-700 transition"
          >
            {{ $t("deposit_now") }}
          </NuxtLinkLocale>
          <button
            @click="emitClose"
            class="px-4 py-2 bg-gray-100 text-gray-800 rounded-md lg:hover:bg-gray-200 transition"
          >
            {{ $t("close") }}
          </button>
        </div>
      </div>

      <!-- Regular Spin Wheel -->
      <div v-else>
        <div class="relative flex justify-center items-center">
          <img
            src="/images/luckyspin/wheel-prize.png"
            alt="Wheel Prize"
            class="w-[400px] max-w-full h-auto transition-transform duration-[4s] ease-in-out z-10"
            :style="{
              transform: `rotate(${rotation}deg)`,
            }"
          />
          <img
            src="/images/luckyspin/spin.png"
            alt="Spin Button"
            class="w-[10%] h-auto absolute left-1/2 top-[50%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20"
            @click="spinWheel"
          />
          <img
            src="/images/luckyspin/leg.png"
            alt="Spin Bottom"
            class="w-[60%] h-auto absolute left-1/2 bottom-[-15%] -translate-x-1/2"
          />
        </div>
        <div class="w-full flex justify-center mt-20">
          <button
            @click="emitClose"
            class="px-4 py-2 bg-gray-100 text-gray-800 rounded-md lg:hover:bg-gray-200 transition"
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
