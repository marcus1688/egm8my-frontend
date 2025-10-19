<template>
  <section class="pb-8 mx-12 max-[1200px]:hidden bg-slate-50 hidden">
    <div class="px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-[1250px]:gap-3">
        <div
          v-for="(card, index) in promoCards"
          :key="index"
          class="group bg-gray-100 rounded-2xl p-6 border border-slate-100"
        >
          <div class="flex items-center gap-4">
            <div
              class="w-12 h-12 max-[1250px]:w-11 max-[1250px]:h-11 rounded-xl flex items-center justify-center text-white flex-shrink-0"
              :class="card.bg"
            >
              <i :class="card.icon" class="baseTxt"></i>
            </div>
            <div>
              <h3 class="baseTxt font-bold text-gray-900 mb-1">
                {{ card.title }}
              </h3>
              <p class="subBaseTxt text-gray-600">
                {{ card.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const promoCards = [
  {
    title: "150% Welcome Bonus",
    description: "Up to MYR 1,800 for new players",
    icon: "bi bi-gift",
    bg: "bg-blue-500",
  },
  {
    title: "MYR 6,888 Weekly Bonus",
    description: "Cashback on your weekly losses",
    icon: "bi bi-cash-stack",
    bg: "bg-green-500",
  },
  {
    title: "#1 Crypto Casino",
    description: "Fully Licensed in Asia",
    icon: "bi bi-shield-check",
    bg: "bg-purple-500",
  },
];
</script>
