<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-[10000] max-lg:px-4"
    @click.self="closePopup"
  >
    <div
      class="rounded-lg max-h-[90vh] w-[550px] max-sm:w-full relative overflow-hidden shadow-lg"
      style="background: linear-gradient(to bottom, #ffffff, #f3f4f6)"
    >
      <div
        v-if="hasTitleContent"
        class="relative py-4 px-6 border-b border-gray-200"
        style="background: linear-gradient(to right, #2563eb, #3b82f6)"
      >
        <div class="flex items-center justify-center">
          <h2
            class="text-2xl font-bold text-white"
            v-html="getLocalizedContent(popupData, 'title')"
          ></h2>
          <button
            @click="closePopup"
            class="absolute right-4 top-4 text-white/80 lg:hover:text-white transition-colors duration-200"
          >
            <Icon icon="heroicons:x-mark-20-solid" class="w-6 h-6" />
          </button>
        </div>
      </div>
      <div class="overflow-y-auto max-h-[70vh] bg-white">
        <div>
          <div v-if="popupData.image" class="relative">
            <div
              v-if="imageLoading"
              class="w-full h-48 bg-gray-100 flex items-center justify-center"
            >
              <div class="flex flex-col items-center gap-3">
                <div class="relative">
                  <div
                    class="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"
                  ></div>
                  <div
                    class="absolute inset-0 w-8 h-8 border border-blue-100 rounded-full animate-pulse"
                  ></div>
                </div>
                <span class="text-blue-600 text-sm font-medium animate-pulse">
                  {{ $t("loading") }}...</span
                >
              </div>
            </div>
            <img
              :src="popupData.image"
              :alt="getLocalizedContent(popupData, 'title')"
              class="w-full h-auto shadow-md"
              :class="{ hidden: imageLoading }"
              @load="imageLoading = false"
              @error="imageLoading = false"
            />
          </div>
          <div
            v-if="hasContentText"
            class="text-gray-700 leading-relaxed whitespace-pre-wrap break-words max-w-full px-6 py-4"
            v-html="getLocalizedContent(popupData, 'content')"
          ></div>
        </div>
      </div>
      <div class="p-4 border-t border-gray-200 bg-gray-50">
        <button
          @click="closePopup"
          class="w-full py-3 px-4 bg-blue-600 lg:hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md"
        >
          {{ $t("close") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

const props = defineProps({
  popupData: {
    type: Object,
    required: true,
  },
});

const show = ref(true);
const imageLoading = ref(true);

const getLocalizedContent = (data, type) => {
  if (!data) return "";
  const langSuffix = $locale.value.toUpperCase();
  const propertyName = `${type}${langSuffix}`;
  return data[propertyName] || "";
};

const hasTitleContent = computed(() => {
  const titleContent = getLocalizedContent(props.popupData, "title");
  const textContent = titleContent.replace(/<\/?[^>]+(>|$)/g, "").trim();
  return textContent.length > 0;
});

const hasContentText = computed(() => {
  const contentText = getLocalizedContent(props.popupData, "content");
  const textContent = contentText.replace(/<\/?[^>]+(>|$)/g, "").trim();
  return textContent.length > 0;
});

const closePopup = () => {
  show.value = false;
  if (props.popupData._id) {
    localStorage.setItem("lastPopupId", props.popupData._id);
    localStorage.setItem("lastPopupTime", new Date().toISOString());
  }
};

watch(
  () => props.popupData.image,
  () => {
    if (props.popupData.image) {
      imageLoading.value = true;
    }
  }
);
</script>
