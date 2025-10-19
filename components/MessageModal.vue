<template>
  <div>
    <div
      v-if="isVisible"
      class="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center z-[999]"
      @click.self="$emit('close')"
    >
      <div
        class="bg-white text-gray-800 rounded-lg w-1/3 shadow-2xl transform transition-transform scale-95 max-lg:w-full custom-animation"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="relative border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-700 p-4 rounded-t-lg"
        >
          <h2 class="text-xl font-semibold text-white text-center break-words">
            {{ title }}
          </h2>
        </div>

        <div class="p-6 min-h-min">
          <p
            class="text-gray-700 leading-relaxed break-words whitespace-pre-line"
          >
            {{ content }}
          </p>
          <div class="flex justify-center mt-6">
            <button
              @click="$emit('close')"
              class="bg-blue-600 lg:hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
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
