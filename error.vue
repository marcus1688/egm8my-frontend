<template>
  <ClientOnly>
    <div
      class="min-h-screen bg-gray-50 flex items-center justify-center relative overflow-hidden"
    >
      <div class="absolute inset-0 overflow-hidden opacity-5">
        <div class="absolute top-20 left-1/4 animate-float-gentle">
          <div class="w-12 h-12 rounded-full bg-blue-500"></div>
        </div>
        <div class="absolute bottom-32 right-1/4 animate-float-gentle-delayed">
          <div class="w-8 h-8 rounded-full bg-indigo-500"></div>
        </div>
        <div class="absolute top-1/2 left-10 animate-float-gentle-slow">
          <div class="w-6 h-6 rounded-full bg-blue-400"></div>
        </div>
      </div>

      <div class="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div class="mb-8">
          <div class="error-code-container">
            <div class="error-code-bg"></div>
            <div class="error-code-text">404</div>
          </div>
        </div>

        <h1
          class="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight"
        >
          {{ $t("page_not_found_title") }}
        </h1>

        <p class="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg mx-auto">
          {{ $t("page_not_found_sub") }}
        </p>

        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <NuxtLinkLocale to="/" class="btn-primary">
            <i class="bi bi-house-fill mr-2"></i>
            {{ $t("home") }}
          </NuxtLinkLocale>

          <button @click="goBack" class="btn-secondary">
            <i class="bi bi-arrow-left mr-2"></i>
            {{ $t("page_not_found_goback") }}
          </button>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-md mx-auto">
          <NuxtLinkLocale to="/myaccount/deposit" class="quick-link">
            <i class="bi bi-wallet2 text-purple-600"></i>
            <span>{{ $t("deposit") }}</span>
          </NuxtLinkLocale>

          <NuxtLinkLocale to="/promotions" class="quick-link">
            <i class="bi bi-gift text-orange-600"></i>
            <span>{{ $t("promotions") }}</span>
          </NuxtLinkLocale>

          <NuxtLinkLocale to="/helpcenter" class="quick-link">
            <i class="bi bi-headset text-green-600"></i>
            <span>{{ $t("support") }}</span>
          </NuxtLinkLocale>
        </div>
      </div>

      <div
        class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <p class="text-sm text-gray-500 mb-2">{{ $t("need_help") }}?</p>

        <button
          @click.prevent="openLiveChat"
          class="text-blue-600 lg:hover:text-blue-700 text-sm font-medium inline-flex items-center gap-1 transition-colors"
        >
          <i class="bi bi-chat-dots text-xs"></i>
          {{ $t("contact_support") }}
        </button>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const { locale, setLocale, availableLocales, t } = useI18n();
const i18nCookie = useCookie("i18n_redirected", {
  maxAge: 365 * 24 * 60 * 60,
});

const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

// Navigation function
const goBack = () => {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    navigateTo(`/${locale.value}`);
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
</script>

<style scoped>
/* Error Code Display */
.error-code-container {
  position: relative;
  display: inline-block;
  margin: 0 auto;
}

.error-code-bg {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border-radius: 50%;
  position: relative;
  box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);
}

.error-code-bg::before {
  content: "";
  position: absolute;
  inset: 8px;
  background: white;
  border-radius: 50%;
  box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.1);
}

.error-code-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  font-weight: 900;
  color: #1e40af;
  z-index: 10;
}

/* Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  min-width: 160px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  background: white;
  color: #6b7280;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 160px;
}

.btn-secondary:hover {
  background: #f9fafb;
  border-color: #d1d5db;
  transform: translateY(-1px);
}

/* Quick Links */
.quick-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  background: white;
  border: 1px solid #f3f4f6;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  color: #6b7280;
}

.quick-link:hover {
  background: #f8fafc;
  border-color: #e5e7eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.quick-link i {
  font-size: 1.25rem;
}

.quick-link span {
  font-size: 0.875rem;
  font-weight: 500;
}

/* Gentle Animations */
@keyframes float-gentle {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.05);
  }
}

@keyframes float-gentle-delayed {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-8px) scale(1.1);
  }
}

@keyframes float-gentle-slow {
  0%,
  100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-6px) scale(0.95);
  }
}

.animate-float-gentle {
  animation: float-gentle 6s ease-in-out infinite;
}

.animate-float-gentle-delayed {
  animation: float-gentle-delayed 8s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-float-gentle-slow {
  animation: float-gentle-slow 10s ease-in-out infinite;
  animation-delay: 4s;
}

/* Responsive Design */
@media (max-width: 640px) {
  .error-code-bg {
    width: 100px;
    height: 100px;
  }

  .error-code-text {
    font-size: 2rem;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    min-width: auto;
  }

  .quick-link {
    padding: 12px;
  }

  .quick-link i {
    font-size: 1rem;
  }

  .quick-link span {
    font-size: 0.75rem;
  }

  /* Disable animations on mobile for better performance */
  .animate-float-gentle,
  .animate-float-gentle-delayed,
  .animate-float-gentle-slow {
    animation: none;
  }
}

/* Focus states for accessibility */
.btn-primary:focus,
.btn-secondary:focus,
.quick-link:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Dark mode support (optional) */
@media (prefers-color-scheme: dark) {
  .min-h-screen {
    background: #0f172a;
  }

  .error-code-text {
    color: #3b82f6;
  }

  h1 {
    color: white;
  }

  p {
    color: #cbd5e1;
  }

  .quick-link {
    background: #1e293b;
    border-color: #334155;
    color: #cbd5e1;
  }

  .quick-link:hover {
    background: #334155;
    border-color: #475569;
  }

  .btn-secondary {
    background: #1e293b;
    color: #cbd5e1;
    border-color: #334155;
  }

  .btn-secondary:hover {
    background: #334155;
    border-color: #475569;
  }
}
</style>
