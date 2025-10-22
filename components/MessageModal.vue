<template>
  <div>
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black/80 backdrop-filter backdrop-blur-sm flex items-center justify-center z-[999]"
      @click.self="$emit('close')"
    >
      <div
        class="bg-[#1A0D13] border border-[#3b1c23] text-[#f0eaea] rounded-xl w-1/3 shadow-2xl shadow-[#ff3344]/20 transform transition-transform scale-95 max-lg:w-full custom-animation"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="relative border-b border-[#3b1c23] bg-gradient-to-r from-[#a1122d] to-[#c21b3a] p-4 rounded-t-xl"
        >
          <h2 class="text-xl font-semibold text-white text-center break-words">
            {{ title }}
          </h2>
        </div>

        <div class="p-6 min-h-min">
          <p
            class="text-[#f0eaea] leading-relaxed break-words whitespace-pre-line"
          >
            {{ content }}
          </p>
          <div class="flex justify-center mt-6">
            <button
              @click="$emit('close')"
              class="bg-gradient-to-r from-[#a1122d] to-[#c21b3a] lg:hover:brightness-110 text-white px-6 py-2 rounded-lg transition-all shadow-lg shadow-[#ff3344]/30"
            >
              {{ $t("close") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
.custom-animation {
  animation: fadeInMailModal 0.3s ease;
}

@keyframes fadeInMailModal {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
  }
}
</style>
