<template>
  <transition name="slide">
    <div
      v-if="visible"
      class="fixed top-4 right-4 bg-[#1A0D13] border border-[#3b1c23] rounded-xl shadow-2xl shadow-[#ff3344]/20 z-[9999] max-sm:right-1 max-sm:w-72 overflow-hidden"
    >
      <div class="flex items-center p-3">
        <div
          class="flex-shrink-0 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] rounded-full w-12 h-12 flex items-center justify-center mr-3 shadow-lg shadow-[#ff3344]/30"
        >
          <i class="bi bi-envelope-check text-white text-xl"></i>
        </div>
        <div class="flex-1">
          <div class="flex items-center">
            <p class="font-bold text-[#f0eaea] text-base max-sm:text-sm">
              {{ title }}
            </p>
          </div>
          <p class="text-[#b37a7a] text-sm mt-0.5">{{ message }}</p>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
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
