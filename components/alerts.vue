<template>
  <div
    v-if="visible"
    class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900/80 backdrop-blur-sm z-[999]"
    @click.self="closeAlert"
  >
    <div
      v-show="visible"
      class="bg-white rounded-xl p-6 w-[90%] max-w-[380px] text-center shadow-xl relative"
      :class="visible ? 'animate-popupIn' : 'animate-popupOut'"
    >
      <div class="flex justify-center mb-4">
        <!-- Dynamic Icon with Animation -->
        <div
          :class="[
            'w-14 h-14 flex items-center justify-center rounded-full border-[3px] shadow-lg icon-container',
            type === 'success'
              ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-500 text-green-600'
              : type === 'error'
              ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-500 text-blue-600'
              : 'bg-gradient-to-br from-amber-50 to-amber-100 border-amber-500 text-amber-600',
          ]"
        >
          <i
            :class="[
              'text-2xl icon-animation',
              type === 'success'
                ? 'bi bi-check-lg'
                : type === 'error'
                ? 'bi bi-x-lg'
                : 'bi bi-exclamation-lg',
            ]"
          ></i>
        </div>
      </div>

      <h2 class="text-xl font-bold mb-3 text-gray-800">{{ title }}</h2>
      <p class="text-gray-600 mb-6" v-html="message"></p>

      <div class="flex justify-center">
        <button
          @click="closeAlert"
          :class="[
            'px-7 py-2.5 rounded-lg font-medium shadow-sm transition-all duration-200 lg:hover:shadow-md',
            type === 'success'
              ? 'bg-gradient-to-r from-green-600 to-green-500 lg:hover:from-green-700 lg:hover:to-green-600 text-white'
              : type === 'error'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 lg:hover:from-blue-700 lg:hover:to-indigo-700 text-white'
              : 'bg-gradient-to-r from-amber-600 to-amber-500 lg:hover:from-amber-700 lg:hover:to-amber-600 text-white',
          ]"
        >
          OK
        </button>
      </div>

      <!-- Modern Close button -->
      <button
        @click="closeAlert"
        class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full lg:hover:bg-gray-100 text-gray-400 lg:hover:text-gray-600 transition-colors"
      >
        <i class="bi bi-x text-lg"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isVisible: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: false,
    default: "error", // Default to "error"
  },
});

const emit = defineEmits(["close"]);

const visible = ref(props.isVisible);

const closeAlert = () => {
  visible.value = false;
  emit("close");
};

watch(
  () => props.isVisible,
  (newValue) => {
    visible.value = newValue;
  }
);
</script>

<style scoped>
/* Icon animations based on alert type */
.icon-container {
  position: relative;
  overflow: hidden;
}

.icon-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  opacity: 0;
  animation: iconGlowPulse 2s infinite;
}

@keyframes iconGlowPulse {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.3);
  }
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
}

.icon-animation {
  animation: iconEnter 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

@keyframes iconEnter {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  60% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Popup transition animations */
@keyframes popupIn {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes popupOut {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.9);
  }
}

.animate-popupIn {
  animation: popupIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

.animate-popupOut {
  animation: popupOut 0.2s ease-in forwards;
}
</style>
