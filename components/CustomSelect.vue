<template>
  <div class="relative">
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-3 max-lg:py-2 max-lg:text-sm border border-[#3b1c23] rounded-lg bg-[#241017]/60 text-[#f0eaea] appearance-none cursor-pointer transition-all hover:border-[#ff3344]/50 lg:hover:shadow-lg lg:hover:shadow-[#ff3344]/10 focus:outline-none focus:ring-2 focus:ring-[#ff3344]/50 focus:border-[#ff3344] placeholder-[#b37a7a] custom-select"
    >
      <slot></slot>
    </select>
    <div
      class="absolute inset-y-0 right-0 flex items-center px-3 max-lg:px-2 pointer-events-none"
    >
      <Icon
        icon="heroicons:chevron-down"
        class="h-5 w-5 max-lg:h-4 max-lg:w-4 text-[#b37a7a]"
      />
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
defineProps({
  modelValue: {
    type: String,
    default: "",
  },
});
defineEmits(["update:modelValue"]);
</script>
