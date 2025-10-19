<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm flex items-center justify-center z-[999]"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      <div class="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 relative">
        <h2 class="text-xl font-bold text-white text-center max-lg:text-sm">
          {{ promotion.maintitle }}
        </h2>
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 text-white lg:hover:text-gray-200"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>

      <div
        class="p-6 max-h-[70vh] overflow-y-auto max-lg:p-4 max-lg:max-h-[80vh]"
      >
        <div class="flex justify-center mb-4">
          <img
            :src="promotion.promotionimage"
            :alt="promotion.maintitle"
            class="max-h-48 object-contain rounded border border-gray-200"
          />
        </div>
        <div v-html="promotion.content" class="promotion-content mb-4"></div>
        <div class="flex gap-3 mt-6">
          <button
            @click="$emit('close')"
            class="flex-1 py-2 px-4 bg-gray-100 lg:hover:bg-gray-200 text-gray-800 rounded-lg transition-colors font-medium"
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
}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

:deep(.promotion-content table) {
  width: 100% !important;
  border-collapse: collapse;
  margin-bottom: 1rem;
}

:deep(.promotion-content table th),
:deep(.promotion-content table td) {
  border: 1px solid #e2e8f0;
  padding: 0.5rem;
  text-align: left;
}

:deep(.promotion-content table th) {
  background-color: #f8fafc;
  font-weight: bold;
}

:deep(.promotion-content table tr:nth-child(even)) {
  background-color: #f9fafb;
}

:deep(.promotion-content table tr:hover) {
  background-color: #f1f5f9;
}

:deep(.promotion-content p) {
  margin-bottom: 1rem;
}

:deep(.promotion-content ul),
:deep(.promotion-content ol) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
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
}

:deep(.promotion-content hr) {
  border: none;
  height: 1px;
  background: #e2e8f0;
  margin: 1.5rem 0;
}
</style>
