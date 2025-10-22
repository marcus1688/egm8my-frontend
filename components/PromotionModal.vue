<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/80 backdrop-filter backdrop-blur-sm flex items-center justify-center z-[999]"
    @click.self="$emit('close')"
  >
    <div
      class="bg-[#1A0D13] border border-[#3b1c23] rounded-xl shadow-2xl shadow-[#ff3344]/20 max-w-[800px] w-full mx-4 overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <div class="bg-gradient-to-r from-[#a1122d] to-[#c21b3a] py-3 relative">
        <h2 class="text-xl font-bold text-white text-center max-lg:text-sm">
          {{ promotion.maintitle }}
        </h2>
        <button
          @click="$emit('close')"
          class="absolute top-3 right-4 text-white/80 lg:hover:text-white transition-colors"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="flex justify-center mb-4">
        <img
          :src="promotion.promotionimage"
          :alt="promotion.maintitle"
          class="object-contain rounded border border-[#3b1c23]"
        />
      </div>
      <div
        class="p-6 max-h-[70vh] overflow-y-auto max-lg:p-4 max-lg:max-h-[80vh] scrollbar-thin"
      >
        <div v-html="promotion.content" class="promotion-content mb-4"></div>
        <div class="flex gap-3 mt-6">
          <button
            @click="$emit('close')"
            class="flex-1 py-2 px-4 bg-[#241017]/60 lg:hover:bg-[#3b1c23] text-[#f0eaea] rounded-lg transition-colors font-medium border border-[#3b1c23]"
          >
            {{ $t("close") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  promotion: {
    type: Object,
    default: () => ({
      maintitle: "",
      promotionimage: "",
      content: "",
      TnC: "",
    }),
  },
});

defineEmits(["close"]);

onMounted(async () => {
  await nextTick();
  adjustTables();
  window.addEventListener("resize", adjustTables);
});

function adjustTables() {
  const tables = document.querySelectorAll(".promotion-content table");
  tables.forEach((table) => {
    if (!table.parentElement.classList.contains("table-wrapper")) {
      const wrapper = document.createElement("div");
      wrapper.className = "table-wrapper";
      wrapper.style.width = "100%";
      wrapper.style.overflowX = "auto";
      table.parentNode.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }

    const colgroups = table.querySelectorAll("colgroup");
    colgroups.forEach((colgroup) => {
      colgroup.style.display = "none";
    });

    table.style.width = "100%";
    table.style.maxWidth = "100%";
    table.style.display = "table";
  });
}

onBeforeUnmount(() => {
  window.removeEventListener("resize", adjustTables);
});

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      nextTick(() => {
        adjustTables();
      });
    }
  }
);
</script>

<style scoped>
.promotion-content {
  width: 100%;
  color: #f0eaea;
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

/* 滚动条样式 */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #241017;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #ff3344;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #c21b3a;
}

:deep(.promotion-content table) {
  width: 100% !important;
  border-collapse: collapse;
  margin-bottom: 1rem;
  background-color: #241017;
}

:deep(.promotion-content table th),
:deep(.promotion-content table td) {
  border: 1px solid #3b1c23;
  padding: 0.5rem;
  text-align: left;
  color: #f0eaea;
}

:deep(.promotion-content table th) {
  background-color: #3b1c23;
  font-weight: bold;
  color: #ff3344;
}

:deep(.promotion-content table tr:nth-child(even)) {
  background-color: #1a0d13;
}

:deep(.promotion-content table tr:hover) {
  background-color: #2a0f14;
}

:deep(.promotion-content p) {
  margin-bottom: 1rem;
  color: #f0eaea;
}

:deep(.promotion-content ul),
:deep(.promotion-content ol) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  color: #f0eaea;
}

:deep(.promotion-content li) {
  margin-bottom: 0.5rem;
}

:deep(.promotion-content h1),
:deep(.promotion-content h2),
:deep(.promotion-content h3),
:deep(.promotion-content h4) {
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  font-weight: bold;
  color: #ff3344;
}

:deep(.promotion-content hr) {
  border: none;
  height: 1px;
  background: #3b1c23;
  margin: 1.5rem 0;
}

:deep(.promotion-content a) {
  color: #ff3344;
  text-decoration: underline;
}

:deep(.promotion-content a:hover) {
  color: #c21b3a;
}

:deep(.promotion-content strong),
:deep(.promotion-content b) {
  color: #ff3344;
  font-weight: bold;
}
</style>
