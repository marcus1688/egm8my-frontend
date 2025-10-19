<template>
  <transition name="slide">
    <div
      v-if="visible"
      class="fixed top-4 right-4 bg-white rounded-lg shadow-lg z-[9999] max-sm:right-1 max-sm:w-72 overflow-hidden"
    >
      <div class="flex items-center p-3">
        <div
          class="flex-shrink-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-12 h-12 flex items-center justify-center mr-3"
        >
          <i class="bi bi-envelope-check text-white text-xl"></i>
        </div>
        <div class="flex-1">
          <div class="flex items-center">
            <p class="font-bold text-gray-800 text-base max-sm:text-sm">
              {{ title }}
            </p>
          </div>
          <p class="text-gray-600 text-sm mt-0.5">{{ message }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { Icon } from "@iconify/vue";
defineProps({
  visible: Boolean,
  title: String,
  message: String,
});
</script>
<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
