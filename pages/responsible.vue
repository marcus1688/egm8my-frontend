<template>
  <div>
    <section class="relative max-lg:max-w-[100vw] shadow-lg shadow-red-600/20">
      <NuxtImg
        src="/images/banner/responsible_banner_desktop.png"
        alt="Promotions and Bonuses Banner"
        class="w-full h-auto lg:block hidden"
      />
      <NuxtImg
        src="/images/banner/responsible_banner_mobile.png"
        alt="Promotions and Bonuses Banner"
        class="w-full h-auto lg:hidden block"
      />
      <div
        class="absolute bottom-[12%] left-[40%] -translate-x-1/2 max-lg:bottom-[25%] max-lg:left-[35%]"
      >
        <a
          href="#self-assessment"
          @click.prevent="handleAnchorClick($event, 'self-assessment')"
          class="inline-flex items-center bg-white text-[#a1122d] text-[1vw] max-lg:hidden px-6 max-lg:px-5 py-3 max-lg:py-2.5 rounded-lg font-medium lg:hover:bg-red-50 transition-colors shadow-lg max-lg:text-sm"
        >
          <i class="bi bi-clipboard-check mr-2"></i>
          <p>{{ $t("take_self_assessment") }}</p>
        </a>
      </div>
    </section>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-[#a1122d] to-[#c21b3a] relative hidden">
      <div class="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern
              id="pattern-circles"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1.6" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-circles)" />
        </svg>
      </div>

      <div
        class="container mx-auto px-6 max-lg:px-4 py-20 max-lg:py-14 relative z-10"
      >
        <div class="max-w-3xl">
          <h1
            class="text-4xl md:text-5xl max-lg:text-3xl font-bold text-white mb-6 max-lg:mb-4 animate-fadeIn"
          >
            {{ $t("responsible_gaming") }}
          </h1>
          <p
            class="text-red-100 text-lg md:text-xl max-lg:text-base mb-8 max-lg:mb-6 animate-fadeIn animate-delay-200"
          >
            {{ $t("safe_fair_environment") }}
          </p>
          <div class="animate-fadeIn animate-delay-400">
            <a
              href="#self-assessment"
              @click.prevent="handleAnchorClick($event, 'self-assessment')"
              class="inline-flex items-center bg-white text-[#a1122d] px-6 max-lg:px-5 py-3 max-lg:py-2.5 rounded-lg font-medium lg:hover:bg-red-50 transition-colors shadow-lg max-lg:text-sm"
            >
              <i class="bi bi-clipboard-check mr-2"></i>
              {{ $t("take_self_assessment") }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <div
      class="bg-[#241017]/60 border-b border-[#3b1c23] overflow-x-auto shadow-lg"
    >
      <div class="container mx-auto px-4">
        <div class="flex flex-nowrap justify-start md:justify-center">
          <a
            href="#understanding"
            @click.prevent="handleAnchorClick($event, 'understanding')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-[#b37a7a] lg:hover:text-[#ff3344] font-medium transition-colors border-b-2 border-transparent lg:hover:border-[#ff3344] max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("understanding") }}
          </a>
          <a
            href="#tools"
            @click.prevent="handleAnchorClick($event, 'tools')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-[#b37a7a] lg:hover:text-[#ff3344] font-medium transition-colors border-b-2 border-transparent lg:hover:border-[#ff3344] max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("tools_controls") }}
          </a>
          <a
            href="#signs"
            @click.prevent="handleAnchorClick($event, 'signs')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-[#b37a7a] lg:hover:text-[#ff3344] font-medium transition-colors border-b-2 border-transparent lg:hover:border-[#ff3344] max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("signs_warning") }}
          </a>
          <a
            href="#tips"
            @click.prevent="handleAnchorClick($event, 'tips')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-[#b37a7a] lg:hover:text-[#ff3344] font-medium transition-colors border-b-2 border-transparent lg:hover:border-[#ff3344] max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("tips_healthy_gaming") }}
          </a>
          <a
            href="#support"
            @click.prevent="handleAnchorClick($event, 'support')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-[#b37a7a] lg:hover:text-[#ff3344] font-medium transition-colors border-b-2 border-transparent lg:hover:border-[#ff3344] max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("support_resources") }}
          </a>
          <a
            href="#protect"
            @click.prevent="handleAnchorClick($event, 'protect')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-[#b37a7a] lg:hover:text-[#ff3344] font-medium transition-colors border-b-2 border-transparent lg:hover:border-[#ff3344] max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("protect_minors") }}
          </a>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div
      class="bg-gradient-to-br from-[#1A0D13] via-gray-950 to-[#241017] py-16"
    >
      <div class="container mx-auto px-4">
        <!-- Our Philosophy Section -->
        <div class="max-w-4xl mx-auto text-center mb-20 max-lg:mb-12">
          <div
            class="w-16 h-16 max-lg:w-12 max-lg:h-12 mx-auto bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] mb-6 max-lg:mb-3"
          >
            <i class="bi bi-heart-fill text-2xl max-lg:text-lg"></i>
          </div>
          <h2
            class="text-3xl max-lg:text-xl font-bold text-[#f0eaea] mb-6 max-lg:mb-3"
          >
            {{ $t("our_philosophy") }}
          </h2>
          <p class="text-lg max-lg:text-sm text-[#b37a7a] mb-6 max-lg:mb-3">
            {{ $t("philosophy_description_1") }}
          </p>
          <p class="text-lg max-lg:text-sm text-[#b37a7a]">
            {{ $t("philosophy_description_2") }}
          </p>
        </div>

        <!-- Understanding Responsible Gaming -->
        <div
          id="understanding"
          class="max-w-4xl mx-auto bg-[#241017]/60 rounded-2xl shadow-lg shadow-red-500/20 p-10 max-lg:p-4 mb-16 max-lg:mb-8 border border-[#3b1c23]"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344]"
            >
              <i class="bi bi-book text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-[#f0eaea]">
              {{ $t("understanding_responsible_gaming") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-[#b37a7a]">
            <p>
              {{ $t("understanding_description") }}
            </p>

            <h3
              class="text-[#f0eaea] font-semibold mt-6 max-lg:mt-4 mb-3 max-lg:mb-2"
            >
              {{ $t("key_principles") }}:
            </h3>

            <ul class="space-y-2 max-lg:space-y-1">
              <li class="max-lg:text-sm">
                <strong class="text-[#ff3344]">{{
                  $t("entertainment_first")
                }}</strong>
                -
                {{ $t("entertainment_first_desc") }}
              </li>
              <li class="max-lg:text-sm">
                <strong class="text-[#ff3344]">{{
                  $t("informed_decisions")
                }}</strong>
                -
                {{ $t("informed_decisions_desc") }}
              </li>
              <li class="max-lg:text-sm">
                <strong class="text-[#ff3344]">{{
                  $t("budget_management")
                }}</strong>
                -
                {{ $t("budget_management_desc") }}
              </li>
              <li class="max-lg:text-sm">
                <strong class="text-[#ff3344]">{{ $t("balance") }}</strong> -
                {{ $t("balance_desc") }}
              </li>
              <li class="max-lg:text-sm">
                <strong class="text-[#ff3344]">{{
                  $t("emotional_control")
                }}</strong>
                -
                {{ $t("emotional_control_desc") }}
              </li>
              <li class="max-lg:text-sm">
                <strong class="text-[#ff3344]">{{ $t("awareness") }}</strong> -
                {{ $t("awareness_desc") }}
              </li>
            </ul>

            <p class="mt-6 max-lg:mt-3 max-lg:text-sm">
              {{ $t("principles_conclusion") }}
            </p>
          </div>
        </div>

        <!-- Tools and Controls -->
        <div
          id="tools"
          class="max-w-4xl mx-auto bg-[#241017]/60 rounded-2xl shadow-lg shadow-red-500/20 p-10 max-lg:p-4 mb-16 max-lg:mb-8 border border-[#3b1c23]"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344]"
            >
              <i class="bi bi-tools text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-[#f0eaea]">
              {{ $t("tools_and_controls") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-[#b37a7a]">
            <p class="max-lg:text-sm">
              {{ $t("tools_description") }}
            </p>

            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-6 max-lg:gap-3 mt-8 max-lg:mt-4"
            >
              <!-- Deposit Limits -->
              <div
                class="border border-[#3b1c23] rounded-xl p-6 max-lg:p-3 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-all bg-[#15090e]/50"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344]"
                  >
                    <i class="bi bi-wallet2 max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("deposit_limits") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("deposit_limits_desc") }}
                </p>
              </div>

              <!-- Time Limits -->
              <div
                class="border border-[#3b1c23] rounded-xl p-6 max-lg:p-3 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-all bg-[#15090e]/50"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344]"
                  >
                    <i class="bi bi-clock max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("session_time_limits") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("session_time_limits_desc") }}
                </p>
              </div>

              <!-- Loss Limits -->
              <div
                class="border border-[#3b1c23] rounded-xl p-6 max-lg:p-3 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-all bg-[#15090e]/50"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344]"
                  >
                    <i class="bi bi-graph-down max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("loss_limits") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("loss_limits_desc") }}
                </p>
              </div>

              <!-- Self-Exclusion -->
              <div
                class="border border-[#3b1c23] rounded-xl p-6 max-lg:p-3 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-all bg-[#15090e]/50"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344]"
                  >
                    <i class="bi bi-pause-circle max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("self_exclusion") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("self_exclusion_desc") }}
                </p>
              </div>

              <!-- Reality Checks -->
              <div
                class="border border-[#3b1c23] rounded-xl p-6 max-lg:p-3 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-all bg-[#15090e]/50"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344]"
                  >
                    <i class="bi bi-bell max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("reality_checks") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("reality_checks_desc") }}
                </p>
              </div>

              <!-- Account History -->
              <div
                class="border border-[#3b1c23] rounded-xl p-6 max-lg:p-3 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-all bg-[#15090e]/50"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344]"
                  >
                    <i class="bi bi-file-earmark-text max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("account_history") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("account_history_desc") }}
                </p>
              </div>
            </div>

            <p class="mt-8 max-lg:mt-4 max-lg:text-xs">
              {{ $t("tools_conclusion") }}
            </p>
          </div>
        </div>

        <!-- Warning Signs -->
        <div
          id="signs"
          class="max-w-4xl mx-auto bg-[#241017]/60 rounded-2xl shadow-lg shadow-red-500/20 p-10 max-lg:p-4 mb-16 max-lg:mb-8 border border-[#3b1c23]"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-orange-500/20 rounded-full flex items-center justify-center text-orange-400"
            >
              <i class="bi bi-exclamation-triangle text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-[#f0eaea]">
              {{ $t("warning_signs") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-[#b37a7a]">
            <p class="max-lg:text-sm">
              {{ $t("warning_signs_description") }}
            </p>

            <div
              class="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6 max-lg:p-3 my-8 max-lg:my-4"
            >
              <h3
                class="text-[#f0eaea] font-semibold mb-4 max-lg:mb-2 max-lg:text-sm"
              >
                {{ $t("common_warning_signs") }}:
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-lg:gap-2">
                <ul class="space-y-2 max-lg:space-y-1">
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-400 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_1") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-400 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_2") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-400 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_3") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-400 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_4") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-400 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_5") }}</span>
                  </li>
                </ul>

                <ul class="space-y-2 max-lg:space-y-1">
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-400 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_6") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-400 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_7") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-400 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_8") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-400 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_9") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-400 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_10") }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <p class="max-lg:text-sm">
              {{ $t("warning_signs_conclusion") }}
            </p>
          </div>
        </div>

        <!-- Self-Assessment -->
        <div
          id="self-assessment"
          class="max-w-4xl mx-auto bg-[#241017]/60 rounded-2xl shadow-lg shadow-red-500/20 p-10 max-lg:p-4 mb-16 max-lg:mb-8 relative overflow-hidden border border-[#3b1c23]"
        >
          <div
            class="absolute top-0 right-0 w-40 h-40 max-lg:w-24 max-lg:h-24 bg-[#ff3344]/10 rounded-full -mr-20 -mt-20 opacity-50"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-40 h-40 max-lg:w-24 max-lg:h-24 bg-[#ff3344]/10 rounded-full -ml-20 -mb-20 opacity-50"
          ></div>

          <div class="relative z-10">
            <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
              <div
                class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344]"
              >
                <i class="bi bi-clipboard-check text-2xl max-lg:text-lg"></i>
              </div>
              <h2 class="text-2xl max-lg:text-lg font-bold text-[#f0eaea]">
                {{ $t("self_assessment_questionnaire") }}
              </h2>
            </div>

            <div
              class="prose prose-lg max-lg:prose-sm max-w-none text-[#b37a7a]"
            >
              <p class="max-lg:text-xs">
                {{ $t("self_assessment_description") }}
              </p>

              <!-- Results Display Section -->
              <div
                v-if="showResults"
                class="my-8 max-lg:my-4 transition-all duration-300 ease-in-out"
                :class="{
                  'opacity-100': resultsVisible,
                  'opacity-0': !resultsVisible,
                }"
              >
                <div
                  class="p-6 max-lg:p-3 rounded-xl border"
                  :class="{
                    'bg-green-500/10 border-green-500/20':
                      riskLevel === 'Low Risk',
                    'bg-yellow-500/10 border-yellow-500/20':
                      riskLevel === 'Moderate Risk',
                    'bg-orange-500/10 border-orange-500/20':
                      riskLevel === 'High Risk',
                  }"
                >
                  <div class="flex items-center mb-4 max-lg:mb-2">
                    <div
                      class="w-12 h-12 max-lg:w-6 max-lg:h-6 rounded-full flex items-center justify-center mr-4 max-lg:mr-2"
                      :class="{
                        'bg-green-500/20 text-green-400':
                          riskLevel === 'Low Risk',
                        'bg-yellow-500/20 text-yellow-400':
                          riskLevel === 'Moderate Risk',
                        'bg-orange-500/20 text-orange-400':
                          riskLevel === 'High Risk',
                      }"
                    >
                      <i
                        class="bi text-2xl max-lg:text-xs"
                        :class="{
                          'bi-check-circle': riskLevel === 'Low Risk',
                          'bi-exclamation-circle':
                            riskLevel === 'Moderate Risk',
                          'bi-exclamation-triangle': riskLevel === 'High Risk',
                        }"
                      ></i>
                    </div>
                    <h3
                      class="text-xl max-lg:text-base font-semibold"
                      :class="{
                        'text-green-400': riskLevel === 'Low Risk',
                        'text-yellow-400': riskLevel === 'Moderate Risk',
                        'text-orange-400': riskLevel === 'High Risk',
                      }"
                    >
                      {{ $t("assessment_results") }}: {{ riskLevel }}
                    </h3>
                  </div>

                  <div class="mb-6 max-lg:mb-3">
                    <div
                      class="w-full bg-[#3b1c23] rounded-full h-2.5 max-lg:h-1.5 mb-1"
                    >
                      <div
                        class="h-2.5 max-lg:h-1.5 rounded-full"
                        :class="{
                          'bg-green-500': riskLevel === 'Low Risk',
                          'bg-yellow-500': riskLevel === 'Moderate Risk',
                          'bg-orange-500': riskLevel === 'High Risk',
                        }"
                        :style="{
                          width: `${(score / maxPossibleScore) * 100}%`,
                        }"
                      ></div>
                    </div>
                    <div class="flex justify-between text-xs max-lg:text-[8px]">
                      <span>{{ $t("low_risk") }}</span>
                      <span>{{ $t("moderate_risk") }}</span>
                      <span>{{ $t("high_risk") }}</span>
                    </div>
                  </div>

                  <p class="mb-4 max-lg:mb-2 max-lg:text-xs">
                    {{ resultMessage }}
                  </p>

                  <p class="mb-2 text-[#f0eaea] font-medium max-lg:text-xs">
                    {{ $t("your_risk_score") }}: {{ score }}/{{
                      maxPossibleScore
                    }}
                    ({{ Math.round((score / maxPossibleScore) * 100) }}%)
                  </p>

                  <div class="mt-6 max-lg:mt-3">
                    <h4
                      class="font-medium mb-2 max-lg:mb-1 max-lg:text-xs text-[#f0eaea]"
                    >
                      {{ $t("recommended_next_steps") }}:
                    </h4>
                    <ul class="space-y-1 max-lg:text-xs">
                      <li
                        v-for="(step, index) in recommendedSteps"
                        :key="index"
                        class="flex"
                      >
                        <span class="mr-2">{{ index + 1 }}.</span>
                        <span>{{ step }}</span>
                      </li>
                    </ul>
                  </div>

                  <div class="mt-6 max-lg:mt-3 text-center">
                    <button
                      @click="resetAssessment"
                      class="px-6 max-lg:px-3 py-2 max-lg:py-1 rounded-lg bg-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#4a2129] transition-colors max-lg:text-xs"
                    >
                      {{ $t("retake_assessment") }}
                    </button>
                  </div>
                </div>
              </div>

              <div
                v-if="!showResults"
                class="mt-8 max-lg:mt-4 space-y-6 max-lg:space-y-3"
              >
                <!-- Question 1 -->
                <div
                  class="p-6 max-lg:p-3 border border-[#3b1c23] rounded-xl bg-[#15090e]/50"
                >
                  <p
                    class="font-medium text-[#f0eaea] mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_1") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(1, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[1] === 0
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(1, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[1] === 1
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(1, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[1] === 2
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(1, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[1] === 3
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 2 -->
                <div
                  class="p-6 max-lg:p-3 border border-[#3b1c23] rounded-xl bg-[#15090e]/50"
                >
                  <p
                    class="font-medium text-[#f0eaea] mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_2") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(2, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[2] === 0
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(2, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[2] === 1
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(2, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[2] === 2
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(2, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[2] === 3
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 3 -->
                <div
                  class="p-6 max-lg:p-3 border border-[#3b1c23] rounded-xl bg-[#15090e]/50"
                >
                  <p
                    class="font-medium text-[#f0eaea] mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_3") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(3, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[3] === 0
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(3, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[3] === 1
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(3, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[3] === 2
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(3, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[3] === 3
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 4 -->
                <div
                  class="p-6 max-lg:p-3 border border-[#3b1c23] rounded-xl bg-[#15090e]/50"
                >
                  <p
                    class="font-medium text-[#f0eaea] mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_4") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(4, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[4] === 0
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(4, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[4] === 1
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(4, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[4] === 2
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(4, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[4] === 3
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 5 -->
                <div
                  class="p-6 max-lg:p-3 border border-[#3b1c23] rounded-xl bg-[#15090e]/50"
                >
                  <p
                    class="font-medium text-[#f0eaea] mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_5") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(5, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[5] === 0
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(5, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[5] === 1
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(5, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[5] === 2
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(5, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[5] === 3
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 6 -->
                <div
                  class="p-6 max-lg:p-3 border border-[#3b1c23] rounded-xl bg-[#15090e]/50"
                >
                  <p
                    class="font-medium text-[#f0eaea] mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_6") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(6, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[6] === 0
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(6, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[6] === 1
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(6, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[6] === 2
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(6, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[6] === 3
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 7 -->
                <div
                  class="p-6 max-lg:p-3 border border-[#3b1c23] rounded-xl bg-[#15090e]/50"
                >
                  <p
                    class="font-medium text-[#f0eaea] mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_7") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(7, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[7] === 0
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(7, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[7] === 1
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(7, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[7] === 2
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(7, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[7] === 3
                          ? 'bg-[#ff3344]/20 border-[#ff3344] text-[#ff3344]'
                          : 'border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#ff3344]/10 lg:hover:border-[#ff3344]/50',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <div class="mt-8 max-lg:mt-4 max-lg:text-xs">
                  <p>
                    {{ $t("assessment_note") }}
                  </p>

                  <div class="mt-6 max-lg:mt-3 text-center">
                    <button
                      @click="getResults"
                      class="px-6 max-lg:px-4 py-3 max-lg:py-1.5 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white rounded-lg font-medium lg:hover:brightness-110 transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed max-lg:text-xs"
                      :disabled="!allQuestionsAnswered"
                    >
                      {{ $t("get_assessment_results") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Healthy Gaming Tips -->
        <div
          id="tips"
          class="max-w-4xl mx-auto bg-[#241017]/60 rounded-2xl shadow-lg shadow-red-500/20 p-10 max-lg:p-4 mb-16 max-lg:mb-8 border border-[#3b1c23]"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344]"
            >
              <i class="bi bi-lightbulb text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-[#f0eaea]">
              {{ $t("healthy_gaming_tips") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-[#b37a7a]">
            <p class="max-lg:text-sm">
              {{ $t("healthy_gaming_tips_description") }}:
            </p>

            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-6 max-lg:gap-3 mt-8 max-lg:mt-4"
            >
              <!-- Tip 1 -->
              <div
                class="bg-[#ff3344]/10 rounded-xl p-6 max-lg:p-3 border border-[#ff3344]/20"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] font-semibold max-lg:text-xs"
                  >
                    1
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("tip_1") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_1_desc") }}
                </p>
              </div>

              <!-- Tip 2 -->
              <div
                class="bg-[#ff3344]/10 rounded-xl p-6 max-lg:p-3 border border-[#ff3344]/20"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] font-semibold max-lg:text-xs"
                  >
                    2
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("tip_2") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_2_desc") }}
                </p>
              </div>

              <!-- Tip 3 -->
              <div
                class="bg-[#ff3344]/10 rounded-xl p-6 max-lg:p-3 border border-[#ff3344]/20"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] font-semibold max-lg:text-xs"
                  >
                    3
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("tip_3") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_3_desc") }}
                </p>
              </div>

              <!-- Tip 4 -->
              <div
                class="bg-[#ff3344]/10 rounded-xl p-6 max-lg:p-3 border border-[#ff3344]/20"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] font-semibold max-lg:text-xs"
                  >
                    4
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("tip_4") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_4_desc") }}
                </p>
              </div>

              <!-- Tip 5 -->
              <div
                class="bg-[#ff3344]/10 rounded-xl p-6 max-lg:p-3 border border-[#ff3344]/20"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] font-semibold max-lg:text-xs"
                  >
                    5
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("tip_5") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_5_desc") }}
                </p>
              </div>

              <!-- Tip 6 -->
              <div
                class="bg-[#ff3344]/10 rounded-xl p-6 max-lg:p-3 border border-[#ff3344]/20"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] font-semibold max-lg:text-xs"
                  >
                    6
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("tip_6") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_6_desc") }}
                </p>
              </div>

              <!-- Tip 7 -->
              <div
                class="bg-[#ff3344]/10 rounded-xl p-6 max-lg:p-3 border border-[#ff3344]/20"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] font-semibold max-lg:text-xs"
                  >
                    7
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("tip_7") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_7_desc") }}
                </p>
              </div>

              <!-- Tip 8 -->
              <div
                class="bg-[#ff3344]/10 rounded-xl p-6 max-lg:p-3 border border-[#ff3344]/20"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] font-semibold max-lg:text-xs"
                  >
                    8
                  </div>
                  <h3 class="font-semibold text-[#f0eaea] max-lg:text-sm">
                    {{ $t("tip_8") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_8_desc") }}
                </p>
              </div>
            </div>

            <p class="mt-8 max-lg:mt-4 max-lg:text-sm">
              {{ $t("healthy_tips_conclusion") }}
            </p>
          </div>
        </div>

        <!-- Support and Resources -->
        <div
          id="support"
          class="max-w-4xl mx-auto bg-[#241017]/60 rounded-2xl shadow-lg shadow-red-500/20 p-10 max-lg:p-4 mb-16 max-lg:mb-8 border border-[#3b1c23]"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400"
            >
              <i class="bi bi-life-preserver text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-[#f0eaea]">
              {{ $t("support_resources") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-[#b37a7a]">
            <p class="max-lg:text-sm">
              {{ $t("support_description") }}
            </p>

            <div class="mt-8 max-lg:mt-4 space-y-6 max-lg:space-y-3">
              <!-- Our Support -->
              <div
                class="border border-blue-500/20 rounded-xl p-6 max-lg:p-3 bg-blue-500/10"
              >
                <h3
                  class="text-[#f0eaea] font-semibold mb-4 max-lg:mb-2 max-lg:text-sm"
                >
                  {{ $t("our_support_team") }}
                </h3>
                <p class="max-lg:text-xs">
                  {{ $t("our_support_description") }}
                </p>
                <div class="mt-4 max-lg:mt-2">
                  <NuxtLinkLocale
                    to="/helpcenter"
                    class="inline-flex items-center text-blue-400 lg:hover:text-blue-300 font-medium max-lg:text-xs"
                  >
                    <i class="bi bi-headset mr-2 max-lg:mr-1"></i>
                    {{ $t("contact_support") }}
                  </NuxtLinkLocale>
                </div>
              </div>

              <!-- Helplines -->
              <div>
                <h3
                  class="text-[#f0eaea] font-semibold mb-4 max-lg:mb-2 max-lg:text-sm"
                >
                  {{ $t("national_helplines") }}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-lg:gap-2">
                  <div
                    class="border border-[#3b1c23] rounded-xl p-4 max-lg:p-2 bg-[#15090e]/50"
                  >
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-xs">
                      {{ $t("national_problem_gambling_helpline") }}
                    </h4>
                    <p class="text-[#b37a7a] mb-2 max-lg:mb-1 max-lg:text-xs">
                      {{ $t("confidential_support") }}
                    </p>
                    <a
                      href="tel:1-800-522-4700"
                      class="text-blue-400 lg:hover:text-blue-300 font-medium max-lg:text-xs"
                      >1-800-522-4700</a
                    >
                  </div>

                  <div
                    class="border border-[#3b1c23] rounded-xl p-4 max-lg:p-2 bg-[#15090e]/50"
                  >
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-xs">
                      {{ $t("gamblers_anonymous") }}
                    </h4>
                    <p class="text-[#b37a7a] mb-2 max-lg:mb-1 max-lg:text-xs">
                      {{ $t("peer_support_network") }}
                    </p>
                    <a
                      href="https://www.gamblersanonymous.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-400 lg:hover:text-blue-300 font-medium max-lg:text-xs"
                      >www.gamblersanonymous.org</a
                    >
                  </div>

                  <div
                    class="border border-[#3b1c23] rounded-xl p-4 max-lg:p-2 bg-[#15090e]/50"
                  >
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-xs">
                      {{ $t("gamcare") }}
                    </h4>
                    <p class="text-[#b37a7a] mb-2 max-lg:mb-1 max-lg:text-xs">
                      {{ $t("information_advice_support") }}
                    </p>
                    <a
                      href="https://www.gamcare.org.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-400 lg:hover:text-blue-300 font-medium max-lg:text-xs"
                      >www.gamcare.org.uk</a
                    >
                  </div>

                  <div
                    class="border border-[#3b1c23] rounded-xl p-4 max-lg:p-2 bg-[#15090e]/50"
                  >
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-xs">
                      {{ $t("begambleaware") }}
                    </h4>
                    <p class="text-[#b37a7a] mb-2 max-lg:mb-1 max-lg:text-xs">
                      {{ $t("guidance_free_resources") }}
                    </p>
                    <a
                      href="https://www.begambleaware.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-400 lg:hover:text-blue-300 font-medium max-lg:text-xs"
                      >www.begambleaware.org</a
                    >
                  </div>
                </div>
              </div>

              <!-- Filtering Software -->
              <div>
                <h3
                  class="text-[#f0eaea] font-semibold mb-4 max-lg:mb-2 max-lg:text-sm"
                >
                  {{ $t("blocking_software") }}
                </h3>
                <p class="max-lg:text-xs">
                  {{ $t("blocking_software_description") }}:
                </p>
                <div
                  class="grid grid-cols-1 md:grid-cols-3 gap-4 max-lg:gap-2 mt-4 max-lg:mt-2"
                >
                  <a
                    href="https://gamban.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="border border-[#3b1c23] rounded-xl p-4 max-lg:p-2 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-shadow text-center bg-[#15090e]/50"
                  >
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-xs">
                      {{ $t("gamban") }}
                    </h4>
                    <p class="text-sm max-lg:text-[10px] text-[#b37a7a]">
                      {{ $t("gamban_desc") }}
                    </p>
                  </a>

                  <a
                    href="https://betblocker.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="border border-[#3b1c23] rounded-xl p-4 max-lg:p-2 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-shadow text-center bg-[#15090e]/50"
                  >
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-xs">
                      {{ $t("betblocker") }}
                    </h4>
                    <p class="text-sm max-lg:text-[10px] text-[#b37a7a]">
                      {{ $t("betblocker_desc") }}
                    </p>
                  </a>

                  <a
                    href="https://gamblock.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="border border-[#3b1c23] rounded-xl p-4 max-lg:p-2 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-shadow text-center bg-[#15090e]/50"
                  >
                    <h4 class="font-medium text-[#f0eaea] max-lg:text-xs">
                      {{ $t("gamblock") }}
                    </h4>
                    <p class="text-sm max-lg:text-[10px] text-[#b37a7a]">
                      {{ $t("gamblock_desc") }}
                    </p>
                  </a>
                </div>
              </div>

              <!-- Professional Help -->
              <div>
                <h3
                  class="text-[#f0eaea] font-semibold mb-4 max-lg:mb-2 max-lg:text-sm"
                >
                  {{ $t("professional_counseling") }}
                </h3>
                <p class="max-lg:text-xs">
                  {{ $t("professional_counseling_desc") }}
                </p>
                <ul class="mt-4 max-lg:mt-2 max-lg:text-xs">
                  <li>{{ $t("licensed_therapists") }}</li>
                  <li>{{ $t("certified_counselors") }}</li>
                  <li>{{ $t("support_groups") }}</li>
                  <li>{{ $t("treatment_centers") }}</li>
                </ul>
              </div>
            </div>

            <p class="mt-8 max-lg:mt-4 max-lg:text-sm">
              {{ $t("seeking_help") }}
            </p>
          </div>
        </div>

        <!-- Protecting Minors -->
        <div
          id="protect"
          class="max-w-4xl mx-auto bg-[#241017]/60 rounded-2xl shadow-lg shadow-red-500/20 p-10 max-lg:p-4 mb-16 max-lg:mb-8 border border-[#3b1c23]"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400"
            >
              <i class="bi bi-shield-lock text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-[#f0eaea]">
              {{ $t("protecting_minors") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-[#b37a7a]">
            <p class="max-lg:text-sm">
              {{ $t("protecting_minors_desc") }}
            </p>

            <h3
              class="text-[#f0eaea] font-semibold mt-6 max-lg:mt-4 mb-4 max-lg:mb-2 max-lg:text-base"
            >
              {{ $t("our_safeguards") }}:
            </h3>

            <ul class="space-y-3 max-lg:space-y-2">
              <li class="flex items-start gap-3 max-lg:gap-2">
                <i
                  class="bi bi-check-circle-fill text-purple-400 mt-1 max-lg:text-sm"
                ></i>
                <span class="max-lg:text-xs"
                  ><strong class="text-[#ff3344]"
                    >{{ $t("age_verification") }}:</strong
                  >
                  {{ $t("age_verification_desc") }}</span
                >
              </li>
              <li class="flex items-start gap-3 max-lg:gap-2">
                <i
                  class="bi bi-check-circle-fill text-purple-400 mt-1 max-lg:text-sm"
                ></i>
                <span class="max-lg:text-xs"
                  ><strong class="text-[#ff3344]"
                    >{{ $t("id_checks") }}:</strong
                  >
                  {{ $t("id_checks_desc") }}</span
                >
              </li>
              <li class="flex items-start gap-3 max-lg:gap-2">
                <i
                  class="bi bi-check-circle-fill text-purple-400 mt-1 max-lg:text-sm"
                ></i>
                <span class="max-lg:text-xs"
                  ><strong class="text-[#ff3344]"
                    >{{ $t("marketing_restrictions") }}:</strong
                  >
                  {{ $t("marketing_restrictions_desc") }}</span
                >
              </li>
              <li class="flex items-start gap-3 max-lg:gap-2">
                <i
                  class="bi bi-check-circle-fill text-purple-400 mt-1 max-lg:text-sm"
                ></i>
                <span class="max-lg:text-xs"
                  ><strong class="text-[#ff3344]"
                    >{{ $t("staff_training") }}:</strong
                  >
                  {{ $t("staff_training_desc") }}</span
                >
              </li>
            </ul>

            <h3
              class="text-[#f0eaea] font-semibold mt-8 max-lg:mt-4 mb-4 max-lg:mb-2 max-lg:text-base"
            >
              {{ $t("parental_controls") }}
            </h3>

            <p class="max-lg:text-sm">{{ $t("parental_controls_desc") }}:</p>

            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-4 max-lg:gap-2 mt-6 max-lg:mt-3"
            >
              <a
                href="https://www.netnanny.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="border border-[#3b1c23] rounded-xl p-4 max-lg:p-2 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-shadow bg-[#15090e]/50"
              >
                <h4 class="font-medium text-[#f0eaea] max-lg:text-xs">
                  {{ $t("net_nanny") }}
                </h4>
                <p class="text-sm max-lg:text-[10px] text-[#b37a7a]">
                  {{ $t("net_nanny_desc") }}
                </p>
              </a>

              <a
                href="https://www.qustodio.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="border border-[#3b1c23] rounded-xl p-4 max-lg:p-2 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-shadow bg-[#15090e]/50"
              >
                <h4 class="font-medium text-[#f0eaea] max-lg:text-xs">
                  {{ $t("qustodio") }}
                </h4>
                <p class="text-sm max-lg:text-[10px] text-[#b37a7a]">
                  {{ $t("qustodio_desc") }}
                </p>
              </a>

              <a
                href="https://family.norton.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="border border-[#3b1c23] rounded-xl p-4 max-lg:p-2 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-shadow bg-[#15090e]/50"
              >
                <h4 class="font-medium text-[#f0eaea] max-lg:text-xs">
                  {{ $t("norton_family") }}
                </h4>
                <p class="text-sm max-lg:text-[10px] text-[#b37a7a]">
                  {{ $t("norton_family_desc") }}
                </p>
              </a>

              <a
                href="https://support.apple.com/en-us/HT201304"
                target="_blank"
                rel="noopener noreferrer"
                class="border border-[#3b1c23] rounded-xl p-4 max-lg:p-2 lg:hover:shadow-lg lg:hover:shadow-red-500/20 transition-shadow bg-[#15090e]/50"
              >
                <h4 class="font-medium text-[#f0eaea] max-lg:text-xs">
                  {{ $t("ios_screen_time") }}
                </h4>
                <p class="text-sm max-lg:text-[10px] text-[#b37a7a]">
                  {{ $t("ios_screen_time_desc") }}
                </p>
              </a>
            </div>

            <p class="mt-8 max-lg:mt-4 max-lg:text-sm">
              {{ $t("minor_suspicion") }}
            </p>
          </div>
        </div>

        <!-- Commitment Section -->
        <div class="max-w-4xl mx-auto text-center">
          <div
            class="w-16 h-16 max-lg:w-10 max-lg:h-10 mx-auto bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] mb-6 max-lg:mb-3"
          >
            <i class="bi bi-check2-circle text-2xl max-lg:text-lg"></i>
          </div>
          <h2
            class="text-3xl max-lg:text-xl font-bold text-[#f0eaea] mb-6 max-lg:mb-3"
          >
            {{ $t("our_commitment") }}
          </h2>
          <p
            class="text-lg max-lg:text-sm text-[#b37a7a] mb-8 max-lg:mb-4 max-w-3xl mx-auto"
          >
            {{ $t("commitment_description") }}
          </p>
          <NuxtLinkLocale
            href="/helpcenter"
            class="inline-flex items-center justify-center bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white px-6 max-lg:px-4 py-3 max-lg:py-2 rounded-lg font-medium lg:hover:brightness-110 transition-all shadow-sm max-lg:text-xs"
          >
            <i class="bi bi-chat-dots mr-2 max-lg:mr-1.5"></i>
            {{ $t("contact_responsible_gaming_team") }}
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const answers = ref({});
const maxPossibleScore = 21;
const showResults = ref(false);
const resultsVisible = ref(false);
const riskLevel = ref("");
const resultMessage = ref("");
const recommendedSteps = ref([]);
const score = ref(0);

const allQuestionsAnswered = computed(() => {
  return [1, 2, 3, 4, 5, 6, 7].every((q) => answers.value[q] !== undefined);
});

function selectAnswer(questionId, value) {
  answers.value[questionId] = value;
}

function getResults() {
  score.value = Object.values(answers.value).reduce((sum, val) => sum + val, 0);
  if (score.value <= 5) {
    riskLevel.value = $t("low_risk");
    resultMessage.value = $t("low_risk_message");
    recommendedSteps.value = [
      $t("low_risk_steps[0]"),
      $t("low_risk_steps[1]"),
      $t("low_risk_steps[2]"),
    ];
  } else if (score.value <= 10) {
    riskLevel.value = $t("moderate_risk");
    resultMessage.value = $t("moderate_risk_message");
    recommendedSteps.value = [
      $t("moderate_risk_steps[0]"),
      $t("moderate_risk_steps[1]"),
      $t("moderate_risk_steps[2]"),
      $t("moderate_risk_steps[3]"),
    ];
  } else {
    riskLevel.value = $t("high_risk");
    resultMessage.value = $t("high_risk_message");
    recommendedSteps.value = [
      $t("high_risk_steps[0]"),
      $t("high_risk_steps[1]"),
      $t("high_risk_steps[2]"),
      $t("high_risk_steps[3]"),
      $t("high_risk_steps[4]"),
    ];
  }
  showResults.value = true;
  nextTick(() => {
    setTimeout(() => {
      resultsVisible.value = true;
    }, 50);
    setTimeout(() => {
      const resultsElement = document.querySelector("#self-assessment");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  });
}

function resetAssessment() {
  resultsVisible.value = false;
  setTimeout(() => {
    showResults.value = false;
    answers.value = {};
  }, 300);
}

const scrollToElement = inject("scrollToElement");

const handleAnchorClick = (e, targetId) => {
  e.preventDefault();
  scrollToElement(targetId);
};

useHead({
  title: "EGM8 | Responsible Gaming & Player Protection - Safe Gaming Malaysia",
  meta: [
    {
      property: "og:title",
      content: "EGM8 | Responsible Gaming - Safe & Fair Gaming Environment",
    },
    {
      name: "description",
      content:
        "EGM8 promotes responsible gaming with self-assessment tools, deposit limits, time controls, self-exclusion options, and comprehensive player protection measures. Play safely and responsibly on Malaysia's trusted gaming platform.",
    },
    {
      name: "keywords",
      content:
        "EGM8 responsible gaming, safe gaming Malaysia, player protection, self-assessment, deposit limits, gambling addiction help, gaming controls, responsible gambling, player safety, gaming support",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.egm8my.vip/responsible",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.egm8my.vip/responsible",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.egm8my.vip/responsible",
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

.transition-all {
  transition-property: all;
}

.duration-300 {
  transition-duration: 300ms;
}

.ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
