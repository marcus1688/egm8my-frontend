<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-600 to-indigo-700 relative">
      <div class="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern
              id="dots"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div
        class="container mx-auto px-6 max-lg:px-4 py-20 max-lg:py-16 text-center relative z-10"
      >
        <h1
          class="text-4xl md:text-5xl max-lg:text-3xl font-bold text-white mb-6 max-lg:mb-4 animate-fadeIn"
        >
          {{ $t("how_can_we_help") }}
        </h1>
        <p
          class="text-blue-100 text-lg md:text-xl max-lg:text-base max-w-2xl mx-auto mb-10 max-lg:mb-6 animate-fadeIn animate-delay-200"
        >
          {{ $t("support_team_assist") }}
        </p>
      </div>
    </div>

    <!-- Support Categories Section -->
    <div class="bg-gray-50 py-16 max-lg:py-12">
      <div class="container mx-auto px-4">
        <h2
          class="text-3xl max-lg:text-2xl font-bold text-center text-gray-800 mb-12 max-lg:mb-8"
        >
          {{ $t("how_we_assist") }}
        </h2>

        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-lg:gap-4"
        >
          <!-- Account Support -->
          <div
            class="bg-white rounded-xl shadow-sm p-6 max-lg:p-4 text-center lg:hover:shadow-md transition-shadow"
          >
            <div
              class="w-16 h-16 max-lg:w-14 max-lg:h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4 max-lg:mb-3"
            >
              <i class="bi bi-person-circle text-2xl max-lg:text-xl"></i>
            </div>
            <h3
              class="text-xl max-lg:text-lg font-semibold text-gray-800 mb-3 max-lg:mb-2"
            >
              {{ $t("account_support") }}
            </h3>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-3">
              {{ $t("account_support_desc") }}
            </p>
            <a
              href="#contact-support"
              @click.prevent="handleAnchorClick($event, 'contact-support')"
              class="text-blue-600 font-medium max-lg:text-sm lg:hover:text-blue-700 inline-flex items-center"
            >
              {{ $t("get_help") }}
              <i class="bi bi-arrow-right ml-1"></i>
            </a>
          </div>

          <!-- Payment Issues -->
          <div
            class="bg-white rounded-xl shadow-sm p-6 max-lg:p-4 text-center lg:hover:shadow-md transition-shadow"
          >
            <div
              class="w-16 h-16 max-lg:w-14 max-lg:h-14 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4 max-lg:mb-3"
            >
              <i class="bi bi-credit-card text-2xl max-lg:text-xl"></i>
            </div>
            <h3
              class="text-xl max-lg:text-lg font-semibold text-gray-800 mb-3 max-lg:mb-2"
            >
              {{ $t("payment_support") }}
            </h3>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-3">
              {{ $t("payment_support_desc") }}
            </p>
            <a
              href="#contact-support"
              @click.prevent="handleAnchorClick($event, 'contact-support')"
              class="text-green-600 font-medium max-lg:text-sm lg:hover:text-green-700 inline-flex items-center"
            >
              Get Help
              <i class="bi bi-arrow-right ml-1"></i>
            </a>
          </div>

          <!-- Technical Support -->
          <div
            class="bg-white rounded-xl shadow-sm p-6 max-lg:p-4 text-center lg:hover:shadow-md transition-shadow"
          >
            <div
              class="w-16 h-16 max-lg:w-14 max-lg:h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mx-auto mb-4 max-lg:mb-3"
            >
              <i class="bi bi-gear text-2xl max-lg:text-xl"></i>
            </div>
            <h3
              class="text-xl max-lg:text-lg font-semibold text-gray-800 mb-3 max-lg:mb-2"
            >
              {{ $t("technical_support") }}
            </h3>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-3">
              {{ $t("technical_support_desc") }}
            </p>
            <a
              href="#contact-support"
              @click.prevent="handleAnchorClick($event, 'contact-support')"
              class="text-purple-600 font-medium max-lg:text-sm lg:hover:text-purple-700 inline-flex items-center"
            >
              {{ $t("get_help") }}
              <i class="bi bi-arrow-right ml-1"></i>
            </a>
          </div>

          <!-- General Inquiries -->
          <div
            class="bg-white rounded-xl shadow-sm p-6 max-lg:p-4 text-center lg:hover:shadow-md transition-shadow"
          >
            <div
              class="w-16 h-16 max-lg:w-14 max-lg:h-14 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mx-auto mb-4 max-lg:mb-3"
            >
              <i class="bi bi-chat-dots text-2xl max-lg:text-xl"></i>
            </div>
            <h3
              class="text-xl max-lg:text-lg font-semibold text-gray-800 mb-3 max-lg:mb-2"
            >
              {{ $t("general_inquiries") }}
            </h3>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-3">
              {{ $t("general_inquiries_desc") }}
            </p>
            <a
              href="#contact-support"
              @click.prevent="handleAnchorClick($event, 'contact-support')"
              class="text-orange-600 font-medium max-lg:text-sm lg:hover:text-orange-700 inline-flex items-center"
            >
              {{ $t("get_help") }}
              <i class="bi bi-arrow-right ml-1"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div id="contact-support" class="container mx-auto px-4">
      <div class="grid grid-cols-2 max-lg:grid-cols-1 gap-10 max-lg:gap-6">
        <div>
          <div class="bg-white rounded-2xl shadow-sm p-8 max-lg:p-5">
            <div class="flex items-center gap-3 mb-8 max-lg:mb-5">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
              >
                <i class="bi bi-headset text-xl max-lg:text-lg"></i>
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("contact_support_team") }}
              </h2>
            </div>

            <p class="text-gray-600 max-lg:text-sm mb-8 max-lg:mb-5">
              {{ $t("support_availability") }} :
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-lg:gap-3">
              <!-- Live Chat -->
              <div
                class="border border-gray-100 rounded-xl p-6 max-lg:p-4 lg:hover:shadow-md transition-all lg:hover:border-blue-100"
              >
                <div
                  class="flex items-center gap-4 max-lg:gap-3 mb-4 max-lg:mb-3"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
                  >
                    <i class="bi bi-chat-dots-fill text-xl max-lg:text-lg"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                      {{ $t("live_chat") }}
                    </h3>
                    <p class="text-sm max-lg:text-xs text-gray-500">
                      {{ $t("available_24_7") }}
                    </p>
                  </div>
                </div>
                <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-3">
                  {{ $t("available_24_7") }}
                </p>
                <button
                  class="w-full py-2 max-lg:py-1.5 max-lg:text-sm bg-blue-600 text-white rounded-lg lg:hover:bg-blue-700 transition-colors"
                  @click="openLiveChat"
                >
                  {{ $t("start_chat") }}
                </button>
              </div>

              <!-- WhatsApp -->
              <div
                v-if="generalSetting?.whatsapp"
                class="border border-gray-100 rounded-xl p-6 max-lg:p-4 lg:hover:shadow-md transition-all lg:hover:border-green-100"
              >
                <div
                  class="flex items-center gap-4 max-lg:gap-3 mb-4 max-lg:mb-3"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                  >
                    <i class="bi bi-whatsapp text-xl max-lg:text-lg"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                      {{ $t("whatsapp") }}
                    </h3>
                    <p class="text-sm max-lg:text-xs text-gray-500">
                      {{ $t("quick_responses") }}
                    </p>
                  </div>
                </div>
                <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-3">
                  {{ $t("whatsapp_desc") }}
                </p>
                <a
                  :href="generalSetting.whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block w-full py-2 max-lg:py-1.5 max-lg:text-sm bg-green-600 text-white rounded-lg lg:hover:bg-green-700 transition-colors text-center"
                >
                  {{ $t("whatsapp_support") }}
                </a>
              </div>

              <!-- WeChat -->
              <div
                v-if="generalSetting?.wechat"
                class="border border-gray-100 rounded-xl p-6 max-lg:p-4 lg:hover:shadow-md transition-all lg:hover:border-green-100"
              >
                <div
                  class="flex items-center gap-4 max-lg:gap-3 mb-4 max-lg:mb-3"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"
                  >
                    <i class="bi bi-wechat text-xl max-lg:text-lg"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                      {{ $t("wechat") }}
                    </h3>
                    <p class="text-sm max-lg:text-xs text-gray-500">
                      {{ $t("chinese_support") }}
                    </p>
                  </div>
                </div>
                <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-3">
                  {{ $t("wechat_desc") }}
                </p>
                <a
                  :href="generalSetting.wechat"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block w-full py-2 max-lg:py-1.5 max-lg:text-sm bg-green-600 text-white rounded-lg lg:hover:bg-green-700 transition-colors text-center"
                >
                  {{ $t("wechat_support") }}
                </a>
              </div>

              <!-- Telegram -->
              <div
                v-if="generalSetting?.telegram"
                class="border border-gray-100 rounded-xl p-6 max-lg:p-4 lg:hover:shadow-md transition-all lg:hover:border-blue-100"
              >
                <div
                  class="flex items-center gap-4 max-lg:gap-3 mb-4 max-lg:mb-3"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
                  >
                    <i class="bi bi-telegram text-xl max-lg:text-lg"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                      {{ $t("telegram") }}
                    </h3>
                    <p class="text-sm max-lg:text-xs text-gray-500">
                      {{ $t("fast_secure") }}
                    </p>
                  </div>
                </div>
                <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-3">
                  {{ $t("telegram_desc") }}
                </p>
                <a
                  :href="generalSetting.telegram"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block w-full py-2 max-lg:py-1.5 max-lg:text-sm bg-blue-500 text-white rounded-lg lg:hover:bg-blue-600 transition-colors text-center"
                >
                  {{ $t("telegram_support") }}
                </a>
              </div>

              <!-- Email Support -->
              <div
                class="border border-gray-100 rounded-xl p-6 max-lg:p-4 lg:hover:shadow-md transition-all lg:hover:border-indigo-100"
              >
                <div
                  class="flex items-center gap-4 max-lg:gap-3 mb-4 max-lg:mb-3"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"
                  >
                    <i class="bi bi-envelope-fill text-xl max-lg:text-lg"></i>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                      {{ $t("email") }}
                    </h3>
                    <p class="text-sm max-lg:text-xs text-gray-500">
                      {{ $t("hour_response") }}
                    </p>
                  </div>
                </div>
                <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-3">
                  {{ $t("email_desc") }}
                </p>
                <a
                  :href="`mailto:${
                    generalSetting?.gmail || 'support@example.com'
                  }`"
                  class="block w-full py-2 max-lg:py-1.5 max-lg:text-sm bg-indigo-600 text-white rounded-lg lg:hover:bg-indigo-700 transition-colors text-center"
                >
                  {{ $t("email_support") }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Support Info -->
        <div>
          <div
            class="bg-white rounded-2xl shadow-sm p-8 max-lg:p-5 mb-6 sticky top-6"
          >
            <div class="flex items-center gap-3 mb-6 max-lg:mb-4">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
              >
                <i class="bi bi-info-circle text-xl max-lg:text-lg"></i>
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("support_info") }}
              </h2>
            </div>

            <div class="space-y-6 max-lg:space-y-4">
              <!-- Support Hours -->
              <div class="p-4 max-lg:p-3 bg-blue-50 rounded-xl">
                <div class="flex items-center gap-2 mb-2 max-lg:mb-1">
                  <i class="bi bi-clock text-blue-500"></i>
                  <h3 class="font-medium text-gray-800 max-lg:text-sm">
                    {{ $t("support_hours") }}
                  </h3>
                </div>
                <p class="text-sm max-lg:text-xs text-gray-600">
                  {{ $t("support_hours_desc") }}
                </p>
              </div>

              <!-- Response Times -->
              <div class="p-4 max-lg:p-3 bg-green-50 rounded-xl">
                <div class="flex items-center gap-2 mb-2 max-lg:mb-1">
                  <i class="bi bi-lightning-charge text-green-500"></i>
                  <h3 class="font-medium text-gray-800 max-lg:text-sm">
                    {{ $t("response_times") }}
                  </h3>
                </div>
                <ul
                  class="text-sm max-lg:text-xs text-gray-600 space-y-2 max-lg:space-y-1.5"
                >
                  <li class="flex items-start gap-2">
                    <i
                      class="bi bi-chat-dots text-green-500 mt-1 max-lg:mt-0.5"
                    ></i>
                    <span>{{ $t("live_chat_immediate") }}</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i
                      class="bi bi-whatsapp text-green-500 mt-1 max-lg:mt-0.5"
                    ></i>
                    <span>{{ $t("whatsapp_response") }}</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i
                      class="bi bi-telegram text-green-500 mt-1 max-lg:mt-0.5"
                    ></i>
                    <span>{{ $t("telegram_response") }}</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i
                      class="bi bi-envelope text-green-500 mt-1 max-lg:mt-0.5"
                    ></i>
                    <span>{{ $t("email_response") }}</span>
                  </li>
                </ul>
              </div>

              <!-- Language Support -->
              <div class="p-4 max-lg:p-3 bg-purple-50 rounded-xl">
                <div class="flex items-center gap-2 mb-2 max-lg:mb-1">
                  <i class="bi bi-translate text-purple-500"></i>
                  <h3 class="font-medium text-gray-800 max-lg:text-sm">
                    {{ $t("languages_supported") }}
                  </h3>
                </div>
                <ul
                  class="text-sm max-lg:text-xs text-gray-600 space-y-2 max-lg:space-y-1.5"
                >
                  <li class="flex items-start gap-2">
                    <i
                      class="bi bi-check-circle text-purple-500 mt-1 max-lg:mt-0.5"
                    ></i>
                    <span>{{ $t("english") }}</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i
                      class="bi bi-check-circle text-purple-500 mt-1 max-lg:mt-0.5"
                    ></i>
                    <span>{{ $t("chinese_mandarin") }}</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i
                      class="bi bi-check-circle text-purple-500 mt-1 max-lg:mt-0.5"
                    ></i>
                    <span>{{ $t("malay") }}</span>
                  </li>
                </ul>
              </div>

              <!-- Support Policies -->
              <div class="border-t border-gray-100 pt-6 max-lg:pt-4">
                <h3
                  class="font-medium text-gray-800 max-lg:text-sm mb-3 max-lg:mb-2"
                >
                  {{ $t("support_policies") }}
                </h3>
                <ul
                  class="text-sm max-lg:text-xs text-gray-600 space-y-3 max-lg:space-y-2"
                >
                  <li class="flex items-start gap-2">
                    <i
                      class="bi bi-shield-check text-blue-500 mt-1 max-lg:mt-0.5"
                    ></i>
                    <span>{{ $t("policy_verification") }}</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i
                      class="bi bi-shield-check text-blue-500 mt-1 max-lg:mt-0.5"
                    ></i>
                    <span>{{ $t("policy_confidential") }}</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <i
                      class="bi bi-shield-check text-blue-500 mt-1 max-lg:mt-0.5"
                    ></i>
                    <span>{{ $t("policy_sensitive") }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Link Section -->
    <div class="bg-gray-50 border-gray-100 py-16 max-lg:py-12">
      <div class="container mx-auto px-4 text-center">
        <h2
          class="text-2xl max-lg:text-xl font-bold text-gray-800 mb-4 max-lg:mb-3"
        >
          {{ $t("looking_for_answers") }}?
        </h2>
        <p
          class="text-gray-600 max-lg:text-sm mb-8 max-lg:mb-6 max-w-2xl mx-auto"
        >
          {{ $t("visit_faq_description") }}
        </p>
        <NuxtLinkLocale
          to="/faq"
          class="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-6 max-lg:px-5 py-3 max-lg:py-2.5 max-lg:text-sm rounded-lg lg:hover:bg-blue-700 transition-colors"
        >
          <i class="bi bi-question-circle"></i>
          {{ $t("visit_faq_page") }}
        </NuxtLinkLocale>
      </div>
    </div>
  </div>
</template>

<script setup>
const searchQuery = ref("");
const generalSetting = useState("generalSetting");

const handleAnchorClick = (e, targetId) => {
  e.preventDefault();
  const targetElement = document.getElementById(targetId);
  if (targetElement) {
    const headerHeight = 80;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

const openLiveChat = () => {
  if (window.LiveChatWidget) {
    window.LiveChatWidget.call("maximize");
  } else {
    console.warn("LiveChat Widget API is not available");
    window.open(
      "https://www.livechat.com/customer-service/?utm_source=chat_button&utm_medium=referral&utm_campaign=lc_19076410",
      "_blank"
    );
  }
};

useHead({
  title: "EGM8 | Customer Support & Help Center - 24/7 Assistance Malaysia",
  meta: [
    {
      property: "og:title",
      content: "EGM8 | 24/7 Customer Support - Live Chat, WhatsApp & More",
    },
    {
      name: "description",
      content:
        "Get instant help from EGM8's 24/7 customer support team. Contact us via live chat, WhatsApp, Telegram, or email for account assistance, payment support, technical help, and general inquiries in English, Chinese, and Malay.",
    },
    {
      name: "keywords",
      content:
        "EGM8 customer support, 24/7 help center, live chat support, WhatsApp support, technical assistance, payment help Malaysia, multilingual support, customer service, account support, gaming help",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.egm8my.vip/helpcenter",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.egm8my.vip/helpcenter",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.egm8my.vip/helpcenter",
    },
  ],
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

.animate-delay-200 {
  animation-delay: 0.2s;
}

.animate-delay-400 {
  animation-delay: 0.4s;
}
</style>
