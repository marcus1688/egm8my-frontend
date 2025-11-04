<template>
  <div
    class="flex items-center p-4 transition-colors border-b border-[#3b1c23] last:border-0 relative"
    :class="[
      isLocked
        ? 'opacity-50 cursor-not-allowed bg-[#1a0d13]'
        : 'cursor-pointer lg:hover:bg-[#241017]/60',
    ]"
    @click="isLocked ? null : onClick(game)"
  >
    <div
      v-if="isLocked"
      class="absolute inset-0 bg-black/40 flex items-center justify-center z-10"
    >
      <i class="bi-shield-lock-fill text-white text-2xl"></i>
    </div>

    <div
      class="w-16 h-16 flex items-center justify-center mr-4 relative flex-shrink-0"
    >
      <img
        :src="game.logo || fallback(game.name)"
        :alt="game.name"
        class="w-full h-full object-contain z-10"
      />
    </div>
    <div class="flex-1">
      <h3 class="text-sm font-medium text-[#f0eaea]">{{ game.name }}</h3>
    </div>
    <button
      class="px-4 py-1.5 text-sm rounded-md bg-[#ff3344]/20 text-[#ff3344] lg:hover:bg-gradient-to-r lg:hover:from-[#a1122d] lg:hover:to-[#c21b3a] lg:hover:text-white transition-all ml-2 border border-[#ff3344]/30 lg:hover:border-transparent"
    >
      Play
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  game: { type: Object, required: true },
  onClick: { type: Function, default: () => {} },
  isLocked: { type: Boolean, default: false },
});

const fallback = (name) =>
  `https://placehold.co/100x100/2563eb/FFFFFF/png?text=${encodeURIComponent(
    name
  )}`;
</script>
