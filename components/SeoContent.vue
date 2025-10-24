<template>
  <section class="py-4 containerWid max-lg:pt-2 max-lg:pb-6">
    <div
      v-if="seoData && seoData.contentBlocks.length > 0"
      class="bg-[#241017]/60 border border-[#3b1c23] rounded-lg p-6 max-lg:p-4 max-md:p-3 text-[#b37a7a]"
    >
      <div
        :class="{
          'max-h-[300px] max-lg:max-h-[250px] max-md:max-h-[200px] overflow-hidden':
            !isExpanded,
        }"
        class="space-y-6 max-lg:space-y-4 max-md:space-y-3 transition-all duration-300"
      >
        <div
          v-for="block in seoData.contentBlocks"
          :key="block._id"
          class="space-y-4 max-lg:space-y-3 max-md:space-y-2 pb-6 max-lg:pb-4 max-md:pb-3 border-b border-[#3b1c23] last:border-b-0"
        >
          <div
            v-html="$i18n.locale === 'zh' ? block.contentCN : block.content"
            class="seo-content"
          ></div>
        </div>
      </div>

      <div class="mt-4 max-md:mt-3 text-center">
        <button
          @click="toggleExpand"
          class="px-6 py-2 max-md:px-4 max-md:py-1.5 max-md:text-sm bg-gradient-to-r from-[#a1122d] to-[#c21b3a] lg:hover:brightness-110 text-white rounded-lg transition duration-300"
        >
          {{ isExpanded ? $t("show_less") : $t("read_more") }}
        </button>
      </div>
    </div>

    <div
      v-else-if="loading"
      class="mt-4 max-md:mt-3 p-6 max-lg:p-4 max-md:p-3 text-center text-[#b37a7a] text-sm max-md:text-xs"
    >
      {{ $t("loading") }}...
    </div>

    <div
      v-else-if="error"
      class="mt-4 max-md:mt-3 p-6 max-lg:p-4 max-md:p-3 text-center text-[#ff3344] text-sm max-md:text-xs"
    >
      {{ error }}
    </div>
  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const { get, post } = useApiEndpoint();
const seoData = ref(null);
const loading = ref(true);
const error = ref(null);
const isExpanded = ref(false);

const pathToSeoType = {
  "/": "index",
  "/games/fishing": "fishing",
  "/games/livecasino": "livecasino",
  "/games/slots": "slot",
  "/games/e-sports": "esport",
  "/games/sports": "sport",
  "/games/lottery": "lottery",
};

const getSeoPageType = (path) => {
  return pathToSeoType[path] || "index";
};

async function fetchSeoContent() {
  try {
    loading.value = true;
    error.value = null;
    const pageType = getSeoPageType(route.path);
    const { data } = await get(`seo-pages/${pageType}`);
    if (data.success) {
      seoData.value = data.data;
    }
  } catch (error) {
    error.value = "Failed to load SEO content";
    console.error("Error fetching SEO content:", error);
  } finally {
    loading.value = false;
  }
}

const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

await useAsyncData(`seo-content-${getSeoPageType(route.path)}`, async () => {
  await fetchSeoContent();
  return { loaded: true };
});

watch(
  () => route.path,
  () => {
    fetchSeoContent();
  }
);
</script>

<style>
.seo-content {
  color: #b37a7a;
  line-height: 1.7;
}

.seo-content h1,
.seo-content h2,
.seo-content h3,
.seo-content h4,
.seo-content h5,
.seo-content h6 {
  color: #f0eaea;
  font-weight: bold;
  margin-top: 1.5em;
  margin-bottom: 0.75em;
}

.seo-content p {
  margin-bottom: 1em;
  color: #b37a7a;
}

.seo-content p:empty {
  margin: 1em 0;
}

.seo-content a {
  color: #ff3344;
  text-decoration: none;
  transition: color 0.2s ease;
}

.seo-content a:hover {
  color: #c21b3a;
  text-decoration: underline;
}

.seo-content ul,
.seo-content ol {
  margin: 1em 0;
  padding-left: 1.5em;
  color: #b37a7a;
}

.seo-content li {
  margin-bottom: 0.5em;
}

.seo-content table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5em 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  border: 1px solid #3b1c23;
}

.seo-content th,
.seo-content td {
  border: 1px solid #3b1c23;
  padding: 10px 15px;
  text-align: left;
}

.seo-content th {
  background: linear-gradient(135deg, #a1122d, #c21b3a);
  color: #f0eaea;
  font-weight: bold;
}

.seo-content tr:nth-child(even) {
  background-color: rgba(36, 16, 23, 0.3);
}

.seo-content tr:nth-child(odd) {
  background-color: rgba(36, 16, 23, 0.2);
}

.seo-content tr:hover {
  background-color: rgba(255, 51, 68, 0.1);
  transition: background-color 0.2s ease;
}

.seo-content strong,
.seo-content b {
  color: #f0eaea;
  font-weight: bold;
}

.seo-content em,
.seo-content i {
  color: #b37a7a;
  font-style: italic;
}

.seo-content blockquote {
  border-left: 4px solid #ff3344;
  padding-left: 1em;
  margin: 1.5em 0;
  font-style: italic;
  background-color: rgba(255, 51, 68, 0.1);
  padding: 1em;
  border-radius: 4px;
  color: #b37a7a;
}

.seo-content code {
  background-color: rgba(36, 16, 23, 0.8);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
  color: #ff3344;
  border: 1px solid #3b1c23;
}

.seo-content pre {
  background: rgba(36, 16, 23, 0.8);
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  border: 1px solid #3b1c23;
  margin: 1.5em 0;
}

.seo-content pre code {
  background-color: transparent;
  padding: 0;
  color: #f0eaea;
  border: none;
}

.seo-content hr {
  border: 0;
  height: 2px;
  background: linear-gradient(
    to right,
    rgba(255, 51, 68, 0),
    rgba(255, 51, 68, 0.75),
    rgba(255, 51, 68, 0)
  );
  margin: 2em 0;
}
</style>
