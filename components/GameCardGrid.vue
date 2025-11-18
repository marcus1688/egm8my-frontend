<template>
  <div
    v-for="game in games"
    :key="game._id"
    @click="isGameLocked(game.databaseName) ? null : onClick(game)"
    class="relative group"
    :class="[
      isGameLocked(game.databaseName)
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-pointer',
    ]"
  >
    <div>
      <img
        :src="game.icon || fallback(game.name)"
        :alt="game.name"
        class="w-48 h-auto object-contain rounded-xl shadow-lg"
      />
      <div
        v-if="isGameLocked(game.databaseName)"
        class="absolute inset-0 bg-black/60 flex items-center justify-center z-20 rounded-xl"
      ></div>

      <div
        v-if="game.isHotGame"
        class="absolute top-0 right-0 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white text-xs font-semibold px-2 py-0.5 rounded-bl-lg rounded-tr-lg shadow-lg flex items-center gap-1 z-10"
      >
        <Icon icon="mdi:fire" class="text-orange-400" />
        {{ $t("hot") }}
      </div>

      <div
        v-if="!isGameLocked(game.databaseName)"
        class="max-lg:hidden absolute inset-0 bg-black/50 opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
      >
        <button
          class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white font-semibold rounded-lg shadow-lg shadow-[#ff3344]/30 transform scale-90 lg:group-hover:scale-100 lg:group-hover:brightness-110 transition-all duration-300"
        >
          <p class="text-sm">{{ $t("play_now") }}</p>
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
  isGameLocked: {
    type: Function,
    default: () => false,
  },
});

const fallback = (name) =>
  `https://placehold.co/264x328/2563eb/FFFFFF/png?text=${encodeURIComponent(
    name
  )}`;
</script>
