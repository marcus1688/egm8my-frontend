<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isVisible"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
        @click.self="$emit('close')"
      >
        <div
          class="bg-[#1A0D13] border border-[#3b1c23] rounded-xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col shadow-2xl"
          @click.stop
          :class="isVisible ? 'animate-popupIn' : ''"
        >
          <!-- Header -->
          <div
            class="p-4 border-b border-[#3b1c23] flex items-center justify-between flex-shrink-0 bg-gradient-to-r from-[#ff3344]/5 to-transparent"
          >
            <h3
              class="font-bold text-[#f0eaea] text-base max-lg:text-sm pr-4 break-words flex-1"
            >
              {{ title }}
            </h3>

            <button
              @click="$emit('close')"
              class="w-8 h-8 max-sm:w-7 max-sm:h-7 rounded-lg bg-[#241017] border border-[#3b1c23] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all flex-shrink-0"
            >
              <Icon icon="mdi:close" class="w-5 h-5 max-sm:w-4 max-sm:h-4" />
            </button>
          </div>

          <!-- Content -->
          <div class="p-5 max-lg:p-4 overflow-y-auto flex-1">
            <p
              class="text-[#f0eaea] leading-relaxed break-words whitespace-pre-line text-sm"
            >
              {{ content }}
            </p>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-[#3b1c23] flex gap-2 flex-shrink-0">
            <button
              @click="$emit('close')"
              class="w-full py-2.5 bg-[#ff3344] text-white rounded-lg font-semibold hover:bg-[#cc2a3a] transition-all text-sm max-sm:text-xs"
            >
              {{ $t("close") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
});

defineEmits(["close"]);
</script>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Popup Animation */
@keyframes popupIn {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-popupIn {
  animation: popupIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}
</style>
