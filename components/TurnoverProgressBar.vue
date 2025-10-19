<template>
  <div
    v-if="turnoverDetails"
    class="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-lg p-6 shadow-xl w-[90%] max-w-md transform transition-all max-lg:w-[95%]"
    >
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-bold text-gray-800">
          {{
            turnoverDetails.currentTurnover !== undefined
              ? $t("turnover_progress")
              : $t("winover_progress")
          }}
        </h3>
      </div>

      <div class="space-y-4">
        <div class="flex justify-between text-sm text-gray-600">
          <span
            >{{
              turnoverDetails.currentTurnover !== undefined
                ? $t("current_turnover")
                : $t("current_balance")
            }}:</span
          >
          <span class="font-medium">{{
            (turnoverDetails.currentTurnover !== undefined
              ? turnoverDetails.currentTurnover
              : turnoverDetails.currentBalance
            ).toFixed(2)
          }}</span>
        </div>

        <div class="flex justify-between text-sm text-gray-600">
          <span
            >{{
              turnoverDetails.requiredTurnover !== undefined
                ? $t("required_turnover")
                : $t("required_balance")
            }}:</span
          >
          <span class="font-medium">{{
            (turnoverDetails.requiredTurnover !== undefined
              ? turnoverDetails.requiredTurnover
              : turnoverDetails.requiredAmount
            ).toFixed(2)
          }}</span>
        </div>

        <div
          class="w-full h-4 bg-gray-100 rounded-full overflow-hidden relative"
        >
          <div
            :style="{ width: progressPercentage + '%' }"
            class="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
          ></div>
        </div>

        <div class="text-center text-sm text-gray-500">
          {{ progressPercentage }}% {{ $t("completed") }}
        </div>

        <div
          class="bg-blue-50 rounded-lg p-4 text-center border border-blue-100"
        >
          <div class="text-sm text-gray-600 mb-1">
            {{
              turnoverDetails.currentTurnover !== undefined
                ? $t("remaining_turnover_needed")
                : $t("remaining_balance_needed")
            }}
          </div>
          <div class="text-xl font-bold text-blue-600">
            {{ remainingTurnover.toFixed(2) }}
          </div>
        </div>

        <div
          v-if="turnoverDetails.currentTurnover !== undefined"
          class="bg-blue-50 rounded-lg p-4 border border-blue-100"
        >
          <div
            class="text-sm text-gray-700 font-semibold mb-2 flex items-center"
          >
            <Icon icon="mdi:information-outline" class="text-blue-500 mr-1" />
            {{ $t("below_games_excluded") }}:
          </div>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="game in excludedGames"
              :key="game"
              class="px-3 py-1 bg-white border border-blue-200 text-gray-700 rounded-md text-sm flex gap-2 items-center shadow-sm"
            >
              <Icon
                icon="mdi:gamepad-variant"
                class="w-4 h-4 text-blue-500"
              />{{ game }}
            </span>
          </div>
        </div>
      </div>

      <button
        @click="$emit('close')"
        class="mt-6 w-full bg-blue-600 lg:hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm"
      >
        {{ $t("understand") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
  turnoverDetails: {
    type: Object,
    default: null,
  },
  showAnimation: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);

const excludedGames = ["GW99", "ALIPAY"];
const progressPercentage = computed(() => {
  if (!props.turnoverDetails) return 0;
  if (
    props.turnoverDetails.currentTurnover !== undefined &&
    props.turnoverDetails.requiredTurnover !== undefined
  ) {
    const percentage =
      (props.turnoverDetails.currentTurnover /
        props.turnoverDetails.requiredTurnover) *
      100;
    return Math.min(percentage, 100).toFixed(2);
  }
  if (
    props.turnoverDetails.currentBalance !== undefined &&
    props.turnoverDetails.requiredAmount !== undefined
  ) {
    const percentage =
      (props.turnoverDetails.currentBalance /
        props.turnoverDetails.requiredAmount) *
      100;
    return Math.min(percentage, 100).toFixed(2);
  }

  return 0;
});

const remainingTurnover = computed(() => {
  if (!props.turnoverDetails) return 0;
  if (
    props.turnoverDetails.currentTurnover !== undefined &&
    props.turnoverDetails.requiredTurnover !== undefined
  ) {
    return Math.max(
      props.turnoverDetails.requiredTurnover -
        props.turnoverDetails.currentTurnover,
      0
    );
  }
  if (props.turnoverDetails.remainingAmount !== undefined) {
    return props.turnoverDetails.remainingAmount;
  }

  return 0;
});

const closeOnOverlay = (event) => {
  if (event.target === event.currentTarget) {
    emit("close");
  }
};
</script>

<style scoped>
.fixed {
  animation: fadeIn 0.3s ease-out;
}

.bg-white {
  animation: slideUp 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
