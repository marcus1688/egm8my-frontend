<template>
  <div
    v-for="game in games"
    :key="game._id"
    @click="() => onClick(game)"
    class="relative cursor-pointer group"
  >
    <div class="relative inline-block group">
      <img
        :src="game.icon || fallback(game.name)"
        :alt="game.name"
        class="w-48 h-auto object-contain rounded-xl shadow"
      />
      <div
        v-if="game.isHotGame"
        class="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xs font-semibold px-2 py-0.5 rounded-bl-lg rounded-tr-lg shadow-lg flex items-center gap-1"
      >
        <Icon icon="mdi:fire" class="text-orange-300" />
        {{ $t("hot") }}
      </div>
      <div
        class="max-lg:hidden absolute inset-0 bg-black/30 opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
      >
        <button
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg transform scale-90 lg:group-hover:scale-100 lg:group-hover:brightness-110 transition-all duration-300"
        >
          <Icon icon="mdi:play-circle-outline" class="text-white text-base" />
          <p class="max-2xl:text-xs">{{ $t("play_now") }}</p>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
defineProps({
  games: {
    type: Array,
    required: true,
  },
  onClick: {
    type: Function,
    default: () => {},
  },
});

const fallback = (name) =>
  `https://placehold.co/264x328/2563eb/FFFFFF/png?text=${encodeURIComponent(
    name
  )}`;
</script>
