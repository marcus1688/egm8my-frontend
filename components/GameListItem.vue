<template>
  <div
    class="flex items-center p-4 lg:hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0"
    @click="onClick(game)"
  >
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
      <h3 class="text-sm font-medium text-gray-800">{{ game.name }}</h3>
    </div>
    <button
      class="px-4 py-1.5 text-sm rounded-md bg-blue-50 text-blue-600 lg:hover:bg-blue-600 lg:hover:text-white transition-colors ml-2"
    >
      Play
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  game: { type: Object, required: true },
  onClick: { type: Function, default: () => {} },
});

const fallback = (name) =>
  `https://placehold.co/100x100/2563eb/FFFFFF/png?text=${encodeURIComponent(
    name
  )}`;
</script>
