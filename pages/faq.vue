<template>
  <div>
    <div class="bg-gradient-to-r from-[#a1122d] to-[#c21b3a]">
      <!-- Header/Banner Section -->
      <div
        class="container mx-auto px-6 max-lg:px-4 py-16 max-lg:py-12 text-center"
      >
        <h1
          class="text-4xl md:text-5xl max-lg:text-3xl font-bold text-white mb-4 max-lg:mb-3"
        >
          {{ $t("frequently_asked_questions") }}
        </h1>
        <p
          class="text-red-100 text-lg md:text-xl max-lg:text-base max-w-2xl mx-auto"
        >
          {{ $t("find_answers") }}
        </p>

        <!-- Search bar -->
        <div class="max-w-xl mx-auto mt-8 max-lg:mt-6 relative">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('search_for_questions')"
            class="w-full px-5 max-lg:px-4 py-3 max-lg:py-2.5 rounded-lg bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-red-100 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent shadow-lg max-lg:text-sm"
          />
          <i
            class="bi bi-search absolute right-4 top-1/2 -translate-y-1/2 text-red-100"
          ></i>
        </div>
      </div>
    </div>

    <!-- FAQ Content Section -->
    <div class="container mx-auto px-4 py-16 max-lg:py-4 max-w-4xl">
      <!-- Loading state -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-20 max-lg:py-16"
      >
        <div
          class="w-16 h-16 max-lg:w-12 max-lg:h-12 border-4 max-lg:border-3 border-[#ff3344] border-t-transparent rounded-full animate-spin"
        ></div>
        <p class="mt-4 max-lg:mt-3 text-[#b37a7a] max-lg:text-sm">
          {{ $t("loading_faq") }}...
        </p>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="text-center py-20 max-lg:py-16">
        <div
          class="w-20 h-20 max-lg:w-16 max-lg:h-16 mx-auto bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] mb-4 max-lg:mb-3"
        >
          <i class="bi bi-exclamation-triangle text-3xl max-lg:text-2xl"></i>
        </div>
        <h3 class="text-xl max-lg:text-lg font-semibold text-[#f0eaea] mb-2">
          {{ $t("error_title") }}
        </h3>
        <p class="text-[#b37a7a] max-lg:text-sm">
          {{ $t("error_message") }}
        </p>
        <button
          @click="fetchHelps"
          class="mt-6 max-lg:mt-4 px-6 max-lg:px-5 py-2 max-lg:py-1.5 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white rounded-lg lg:hover:brightness-110 transition-all max-lg:text-sm"
        >
          {{ $t("try_again") }}
        </button>
      </div>

      <!-- No results -->
      <div
        v-else-if="filteredFaqs.length === 0"
        class="text-center py-20 max-lg:py-16"
      >
        <div
          class="w-20 h-20 max-lg:w-16 max-lg:h-16 mx-auto bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] mb-4 max-lg:mb-3"
        >
          <i class="bi bi-search text-3xl max-lg:text-2xl"></i>
        </div>
        <h3 class="text-xl max-lg:text-lg font-semibold text-[#f0eaea] mb-2">
          {{ $t("no_results_found") }}
        </h3>
        <p class="text-[#b37a7a] max-lg:text-sm">
          {{ $t("no_results_message") }}
        </p>
        <button
          @click="searchQuery = ''"
          class="mt-6 max-lg:mt-4 px-6 max-lg:px-5 py-2 max-lg:py-1.5 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white rounded-lg lg:hover:brightness-110 transition-all max-lg:text-sm"
        >
          {{ $t("clear_search") }}
        </button>
      </div>

      <!-- FAQ list -->
      <div v-else>
        <ul class="space-y-6 max-lg:space-y-4">
          <li
            v-for="(faq, index) in filteredFaqs"
            :key="faq._id"
            class="bg-[#241017]/60 rounded-xl shadow-lg shadow-red-500/20 border border-[#3b1c23] overflow-hidden transition-all duration-300 lg:hover:shadow-[#ff3344]/20 lg:hover:border-[#ff3344]/50"
            :class="{ 'animate-fadeIn': true }"
            :style="{ animationDelay: `${index * 0.05}s` }"
          >
            <button
              @click="toggleFaq(faq._id)"
              class="w-full text-left p-6 max-lg:p-4 flex justify-between items-start gap-4 max-lg:gap-3"
            >
              <div>
                <h3
                  class="text-xl max-lg:text-base font-semibold text-[#f0eaea]"
                >
                  {{
                    $i18n.locale === "zh"
                      ? faq.questionCN
                      : $i18n.locale === "ms"
                      ? faq.questionMS
                      : faq.questionEN
                  }}
                </h3>
              </div>
              <div class="text-[#ff3344] flex-shrink-0 mt-1">
                <i
                  class="bi transition-transform duration-300"
                  :class="[
                    openFaqs.includes(faq._id)
                      ? 'bi-chevron-up'
                      : 'bi-chevron-down',
                  ]"
                ></i>
              </div>
            </button>

            <div
              v-show="openFaqs.includes(faq._id)"
              class="px-6 max-lg:px-4 pb-6 max-lg:pb-4 text-[#b37a7a]"
            >
              <div class="border-t border-[#3b1c23] pt-4 max-lg:pt-3">
                <p class="max-lg:text-sm">
                  {{
                    $i18n.locale === "zh"
                      ? faq.answerCN
                      : $i18n.locale === "ms"
                      ? faq.answerMS
                      : faq.answerEN
                  }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- Contact Section -->
    <div class="bg-[#1A0D13] border-t border-[#3b1c23]">
      <div
        class="container mx-auto px-4 py-16 max-lg:py-12 text-center max-w-3xl"
      >
        <h2
          class="text-2xl md:text-3xl max-lg:text-xl font-bold text-[#f0eaea] mb-4 max-lg:mb-3"
        >
          {{ $t("still_have_questions") }}?
        </h2>
        <p class="text-[#b37a7a] max-lg:text-sm mb-8 max-lg:mb-6">
          {{ $t("contact_support_message") }}
        </p>
        <div
          class="flex flex-col sm:flex-row gap-4 max-lg:gap-3 justify-center"
        >
          <a
            :href="`mailto:${generalSetting?.gmail || 'support@example.com'}`"
            class="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white px-6 max-lg:px-5 py-3 max-lg:py-2.5 rounded-lg lg:hover:brightness-110 transition-all max-lg:text-sm"
          >
            <i class="bi bi-envelope"></i>
            {{ $t("email_support") }}
          </a>
          <a
            :href="`${generalSetting?.telegram || 'https://t.me/support'}`"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 bg-[#ff3344]/20 text-[#ff3344] px-6 max-lg:px-5 py-3 max-lg:py-2.5 rounded-lg lg:hover:bg-[#ff3344]/30 transition-all max-lg:text-sm border border-[#ff3344]/30"
          >
            <i class="bi bi-telegram"></i>
            {{ $t("telegram_support") }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const pageLoading = useState("pageLoading");
const { showAlert } = useAlert();
const { get, post } = useApiEndpoint();
const faqs = ref([]);
const openFaqs = ref([]);
const isLoading = ref(true);
const error = ref(null);
const searchQuery = ref("");
const generalSetting = useState("generalSetting");

const filteredFaqs = computed(() => {
  if (!searchQuery.value) return faqs.value;
  const query = searchQuery.value.toLowerCase();
  return faqs.value.filter((faq) => {
    return (
      faq.questionEN.toLowerCase().includes(query) ||
      faq.answerEN.toLowerCase().includes(query) ||
      (faq.questionCN && faq.questionCN.toLowerCase().includes(query)) ||
      (faq.answerCN && faq.answerCN.toLowerCase().includes(query)) ||
      (faq.questionMS && faq.questionMS.toLowerCase().includes(query)) ||
      (faq.answerMS && faq.answerMS.toLowerCase().includes(query))
    );
  });
});

const toggleFaq = (id) => {
  if (openFaqs.value.includes(id)) {
    openFaqs.value = openFaqs.value.filter((faqId) => faqId !== id);
  } else {
    openFaqs.value.push(id);
  }
};

const fetchHelps = async () => {
  isLoading.value = true;
  try {
    const { data } = await get("helps");
    if (data.success) {
      faqs.value = data.data;
    } else {
      const errorMsg = "Failed to fetch FAQs";
      error.value = errorMsg;
      showAlert("Info", errorMsg, "info");
    }
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    error.value = err.message || "Error loading FAQ data";
  } finally {
    isLoading.value = false;
  }
};

useHead({
  title: "EGM8 | Frequently Asked Questions & Help Center - Malaysia Casino",
  meta: [
    {
      property: "og:title",
      content: "EGM8 | FAQ & Help Center - Get Instant Answers",
    },
    {
      name: "description",
      content:
        "Find answers to frequently asked questions about EGM8's gaming platform, account management, deposits, withdrawals, bonuses, and more. Get instant help and support for Malaysia's premier online casino.",
    },
    {
      name: "keywords",
      content:
        "EGM8 FAQ, help center, frequently asked questions, casino support, account help, deposit questions, withdrawal help, bonus questions, gaming support Malaysia, EGM8 customer service",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.egm8my.vip/faq",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.egm8my.vip/faq",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.egm8my.vip/faq",
    },
  ],
});

onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchHelps();
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.5s ease forwards;
  opacity: 0;
}
</style>
