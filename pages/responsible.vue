<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-emerald-600 to-teal-700 relative">
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
            class="text-emerald-100 text-lg md:text-xl max-lg:text-base mb-8 max-lg:mb-6 animate-fadeIn animate-delay-200"
          >
            {{ $t("safe_fair_environment") }}
          </p>
          <div class="animate-fadeIn animate-delay-400">
            <a
              href="#self-assessment"
              @click.prevent="handleAnchorClick($event, 'self-assessment')"
              class="inline-flex items-center bg-white text-emerald-700 px-6 max-lg:px-5 py-3 max-lg:py-2.5 rounded-lg font-medium lg:hover:bg-emerald-50 transition-colors shadow-lg max-lg:text-sm"
            >
              <i class="bi bi-clipboard-check mr-2"></i>
              {{ $t("take_self_assessment") }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="bg-white shadow-md border-b border-gray-100 overflow-x-auto">
      <div class="container mx-auto px-4">
        <div class="flex flex-nowrap justify-start md:justify-center">
          <a
            href="#understanding"
            @click.prevent="handleAnchorClick($event, 'understanding')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-gray-700 lg:hover:text-emerald-600 font-medium transition-colors border-b-2 border-transparent lg:hover:border-emerald-600 max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("understanding") }}
          </a>
          <a
            href="#tools"
            @click.prevent="handleAnchorClick($event, 'tools')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-gray-700 lg:hover:text-emerald-600 font-medium transition-colors border-b-2 border-transparent lg:hover:border-emerald-600 max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("tools_controls") }}
          </a>
          <a
            href="#signs"
            @click.prevent="handleAnchorClick($event, 'signs')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-gray-700 lg:hover:text-emerald-600 font-medium transition-colors border-b-2 border-transparent lg:hover:border-emerald-600 max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("signs_warning") }}
          </a>
          <a
            href="#tips"
            @click.prevent="handleAnchorClick($event, 'tips')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-gray-700 lg:hover:text-emerald-600 font-medium transition-colors border-b-2 border-transparent lg:hover:border-emerald-600 max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("tips_healthy_gaming") }}
          </a>
          <a
            href="#support"
            @click.prevent="handleAnchorClick($event, 'support')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-gray-700 lg:hover:text-emerald-600 font-medium transition-colors border-b-2 border-transparent lg:hover:border-emerald-600 max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("support_resources") }}
          </a>
          <a
            href="#protect"
            @click.prevent="handleAnchorClick($event, 'protect')"
            class="px-5 max-lg:px-3 py-4 max-lg:py-2.5 text-gray-700 lg:hover:text-emerald-600 font-medium transition-colors border-b-2 border-transparent lg:hover:border-emerald-600 max-lg:text-xs whitespace-nowrap shrink-0"
          >
            {{ $t("protect_minors") }}
          </a>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-gray-50 py-16">
      <div class="container mx-auto px-4">
        <!-- Our Philosophy Section -->
        <div class="max-w-4xl mx-auto text-center mb-20 max-lg:mb-12">
          <div
            class="w-16 h-16 max-lg:w-12 max-lg:h-12 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 max-lg:mb-3"
          >
            <i class="bi bi-heart-fill text-2xl max-lg:text-lg"></i>
          </div>
          <h2
            class="text-3xl max-lg:text-xl font-bold text-gray-800 mb-6 max-lg:mb-3"
          >
            {{ $t("our_philosophy") }}
          </h2>
          <p class="text-lg max-lg:text-sm text-gray-600 mb-6 max-lg:mb-3">
            {{ $t("philosophy_description_1") }}
          </p>
          <p class="text-lg max-lg:text-sm text-gray-600">
            {{ $t("philosophy_description_2") }}
          </p>
        </div>

        <!-- Understanding Responsible Gaming -->
        <div
          id="understanding"
          class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-10 max-lg:p-4 mb-16 max-lg:mb-8"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
            >
              <i class="bi bi-book text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-gray-800">
              {{ $t("understanding_responsible_gaming") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-gray-600">
            <p>
              {{ $t("understanding_description") }}
            </p>

            <h3
              class="text-gray-800 font-semibold mt-6 max-lg:mt-4 mb-3 max-lg:mb-2"
            >
              {{ $t("key_principles") }}:
            </h3>

            <ul class="space-y-2 max-lg:space-y-1">
              <li class="max-lg:text-sm">
                <strong>{{ $t("entertainment_first") }}</strong> -
                {{ $t("entertainment_first_desc") }}
              </li>
              <li class="max-lg:text-sm">
                <strong>{{ $t("informed_decisions") }}</strong> -
                {{ $t("informed_decisions_desc") }}
              </li>
              <li class="max-lg:text-sm">
                <strong>{{ $t("budget_management") }}</strong> -
                {{ $t("budget_management_desc") }}
              </li>
              <li class="max-lg:text-sm">
                <strong>{{ $t("balance") }}</strong> - {{ $t("balance_desc") }}
              </li>
              <li class="max-lg:text-sm">
                <strong>{{ $t("emotional_control") }}</strong> -
                {{ $t("emotional_control_desc") }}
              </li>
              <li class="max-lg:text-sm">
                <strong>{{ $t("awareness") }}</strong> -
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
          class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-10 max-lg:p-4 mb-16 max-lg:mb-8"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
            >
              <i class="bi bi-tools text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-gray-800">
              {{ $t("tools_and_controls") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-gray-600">
            <p class="max-lg:text-sm">
              {{ $t("tools_description") }}
            </p>

            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-6 max-lg:gap-3 mt-8 max-lg:mt-4"
            >
              <!-- Deposit Limits -->
              <div
                class="border border-gray-100 rounded-xl p-6 max-lg:p-3 lg:hover:shadow-md transition-all"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                  >
                    <i class="bi bi-wallet2 max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("deposit_limits") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("deposit_limits_desc") }}
                </p>
              </div>

              <!-- Time Limits -->
              <div
                class="border border-gray-100 rounded-xl p-6 max-lg:p-3 lg:hover:shadow-md transition-all"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                  >
                    <i class="bi bi-clock max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("session_time_limits") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("session_time_limits_desc") }}
                </p>
              </div>

              <!-- Loss Limits -->
              <div
                class="border border-gray-100 rounded-xl p-6 max-lg:p-3 lg:hover:shadow-md transition-all"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                  >
                    <i class="bi bi-graph-down max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("loss_limits") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("loss_limits_desc") }}
                </p>
              </div>

              <!-- Self-Exclusion -->
              <div
                class="border border-gray-100 rounded-xl p-6 max-lg:p-3 lg:hover:shadow-md transition-all"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                  >
                    <i class="bi bi-pause-circle max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("self_exclusion") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("self_exclusion_desc") }}
                </p>
              </div>

              <!-- Reality Checks -->
              <div
                class="border border-gray-100 rounded-xl p-6 max-lg:p-3 lg:hover:shadow-md transition-all"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                  >
                    <i class="bi bi-bell max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("reality_checks") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("reality_checks_desc") }}
                </p>
              </div>

              <!-- Account History -->
              <div
                class="border border-gray-100 rounded-xl p-6 max-lg:p-3 lg:hover:shadow-md transition-all"
              >
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
                  >
                    <i class="bi bi-file-earmark-text max-lg:text-xs"></i>
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
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
          class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-10 max-lg:p-4 mb-16 max-lg:mb-8"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600"
            >
              <i class="bi bi-exclamation-triangle text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-gray-800">
              {{ $t("warning_signs") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-gray-600">
            <p class="max-lg:text-sm">
              {{ $t("warning_signs_description") }}
            </p>

            <div
              class="bg-orange-50 border border-orange-100 rounded-xl p-6 max-lg:p-3 my-8 max-lg:my-4"
            >
              <h3
                class="text-gray-800 font-semibold mb-4 max-lg:mb-2 max-lg:text-sm"
              >
                {{ $t("common_warning_signs") }}:
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-lg:gap-2">
                <ul class="space-y-2 max-lg:space-y-1">
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-500 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>S{{ $t("warning_sign_1") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-500 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_2") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-500 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_3") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-500 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_4") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-500 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_5") }}</span>
                  </li>
                </ul>

                <ul class="space-y-2 max-lg:space-y-1">
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-500 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_6") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-500 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_7") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-500 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_8") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-500 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
                    ></i>
                    <span>{{ $t("warning_sign_9") }}</span>
                  </li>
                  <li
                    class="flex items-start gap-2 max-lg:gap-1 max-lg:text-xs"
                  >
                    <i
                      class="bi bi-exclamation-circle text-orange-500 mt-1 max-lg:mt-0.5 max-lg:text-[10px]"
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
          class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-10 max-lg:p-4 mb-16 max-lg:mb-8 relative overflow-hidden"
        >
          <div
            class="absolute top-0 right-0 w-40 h-40 max-lg:w-24 max-lg:h-24 bg-emerald-100 rounded-full -mr-20 -mt-20 opacity-50"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-40 h-40 max-lg:w-24 max-lg:h-24 bg-emerald-100 rounded-full -ml-20 -mb-20 opacity-50"
          ></div>

          <div class="relative z-10">
            <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
              <div
                class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
              >
                <i class="bi bi-clipboard-check text-2xl max-lg:text-lg"></i>
              </div>
              <h2 class="text-2xl max-lg:text-lg font-bold text-gray-800">
                {{ $t("self_assessment_questionnaire") }}
              </h2>
            </div>

            <div
              class="prose prose-lg max-lg:prose-sm max-w-none text-gray-600"
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
                    'bg-green-50 border-green-100': riskLevel === 'Low Risk',
                    'bg-yellow-50 border-yellow-100':
                      riskLevel === 'Moderate Risk',
                    'bg-orange-50 border-orange-100': riskLevel === 'High Risk',
                  }"
                >
                  <div class="flex items-center mb-4 max-lg:mb-2">
                    <div
                      class="w-12 h-12 max-lg:w-6 max-lg:h-6 rounded-full flex items-center justify-center mr-4 max-lg:mr-2"
                      :class="{
                        'bg-green-100 text-green-600': riskLevel === 'Low Risk',
                        'bg-yellow-100 text-yellow-600':
                          riskLevel === 'Moderate Risk',
                        'bg-orange-100 text-orange-600':
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
                        'text-green-700': riskLevel === 'Low Risk',
                        'text-yellow-700': riskLevel === 'Moderate Risk',
                        'text-orange-700': riskLevel === 'High Risk',
                      }"
                    >
                      {{ $t("assessment_results") }}: {{ riskLevel }}
                    </h3>
                  </div>

                  <div class="mb-6 max-lg:mb-3">
                    <div
                      class="w-full bg-gray-200 rounded-full h-2.5 max-lg:h-1.5 mb-1"
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

                  <p class="mb-2 text-gray-700 font-medium max-lg:text-xs">
                    {{ $t("your_risk_score") }}: {{ score }}/{{
                      maxPossibleScore
                    }}
                    ({{ Math.round((score / maxPossibleScore) * 100) }}%)
                  </p>

                  <div class="mt-6 max-lg:mt-3">
                    <h4 class="font-medium mb-2 max-lg:mb-1 max-lg:text-xs">
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
                      class="px-6 max-lg:px-3 py-2 max-lg:py-1 rounded-lg bg-gray-200 text-gray-700 lg:hover:bg-gray-300 transition-colors max-lg:text-xs"
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
                <div class="p-6 max-lg:p-3 border border-gray-100 rounded-xl">
                  <p
                    class="font-medium text-gray-800 mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_1") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(1, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[1] === 0
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(1, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[1] === 1
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(1, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[1] === 2
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(1, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[1] === 3
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 2 -->
                <div class="p-6 max-lg:p-3 border border-gray-100 rounded-xl">
                  <p
                    class="font-medium text-gray-800 mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_2") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(2, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[2] === 0
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(2, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[2] === 1
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(2, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[2] === 2
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(2, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[2] === 3
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 3 -->
                <div class="p-6 max-lg:p-3 border border-gray-100 rounded-xl">
                  <p
                    class="font-medium text-gray-800 mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_3") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(3, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[3] === 0
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(3, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[3] === 1
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(3, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[3] === 2
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(3, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[3] === 3
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 4 -->
                <div class="p-6 max-lg:p-3 border border-gray-100 rounded-xl">
                  <p
                    class="font-medium text-gray-800 mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_4") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(4, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[4] === 0
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(4, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[4] === 1
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(4, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[4] === 2
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(4, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[4] === 3
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 5 -->
                <div class="p-6 max-lg:p-3 border border-gray-100 rounded-xl">
                  <p
                    class="font-medium text-gray-800 mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_5") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(5, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[5] === 0
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(5, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[5] === 1
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(5, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[5] === 2
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(5, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[5] === 3
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 6 -->
                <div class="p-6 max-lg:p-3 border border-gray-100 rounded-xl">
                  <p
                    class="font-medium text-gray-800 mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_6") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(6, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[6] === 0
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(6, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[6] === 1
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(6, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[6] === 2
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(6, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[6] === 3
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("always") }}
                    </button>
                  </div>
                </div>

                <!-- Question 7 -->
                <div class="p-6 max-lg:p-3 border border-gray-100 rounded-xl">
                  <p
                    class="font-medium text-gray-800 mb-3 max-lg:mb-1.5 max-lg:text-xs"
                  >
                    {{ $t("question_7") }}
                  </p>
                  <div class="flex flex-wrap gap-3 max-lg:gap-1.5">
                    <button
                      @click="selectAnswer(7, 0)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[7] === 0
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("never") }}
                    </button>
                    <button
                      @click="selectAnswer(7, 1)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[7] === 1
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("sometimes") }}
                    </button>
                    <button
                      @click="selectAnswer(7, 2)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[7] === 2
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
                      ]"
                    >
                      {{ $t("often") }}
                    </button>
                    <button
                      @click="selectAnswer(7, 3)"
                      :class="[
                        'px-4 max-lg:px-2 py-2 max-lg:py-1 border rounded-lg transition-colors max-lg:text-xs',
                        answers[7] === 3
                          ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                          : 'border-gray-200 text-gray-700 lg:hover:bg-emerald-50 lg:hover:border-emerald-200',
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
                      class="px-6 max-lg:px-4 py-3 max-lg:py-1.5 bg-emerald-600 text-white rounded-lg font-medium lg:hover:bg-emerald-700 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed max-lg:text-xs"
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
          class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-10 max-lg:p-4 mb-16 max-lg:mb-8"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600"
            >
              <i class="bi bi-lightbulb text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-gray-800">
              {{ $t("healthy_gaming_tips") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-gray-600">
            <p class="max-lg:text-sm">
              {{ $t("healthy_gaming_tips_description") }}:
            </p>

            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-6 max-lg:gap-3 mt-8 max-lg:mt-4"
            >
              <!-- Tip 1 -->
              <div class="bg-emerald-50 rounded-xl p-6 max-lg:p-3">
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold max-lg:text-xs"
                  >
                    1
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("tip_1") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_1_desc") }}
                </p>
              </div>

              <!-- Tip 2 -->
              <div class="bg-emerald-50 rounded-xl p-6 max-lg:p-3">
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold max-lg:text-xs"
                  >
                    2
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("tip_2") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_2_desc") }}
                </p>
              </div>

              <!-- Tip 3 -->
              <div class="bg-emerald-50 rounded-xl p-6 max-lg:p-3">
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold max-lg:text-xs"
                  >
                    3
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("tip_3") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_3_desc") }}
                </p>
              </div>

              <!-- Tip 4 -->
              <div class="bg-emerald-50 rounded-xl p-6 max-lg:p-3">
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold max-lg:text-xs"
                  >
                    4
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("tip_4") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_4_desc") }}
                </p>
              </div>

              <!-- Tip 5 -->
              <div class="bg-emerald-50 rounded-xl p-6 max-lg:p-3">
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold max-lg:text-xs"
                  >
                    5
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("tip_5") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_5_desc") }}
                </p>
              </div>

              <!-- Tip 6 -->
              <div class="bg-emerald-50 rounded-xl p-6 max-lg:p-3">
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold max-lg:text-xs"
                  >
                    6
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("tip_6") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_6_desc") }}
                </p>
              </div>

              <!-- Tip 7 -->
              <div class="bg-emerald-50 rounded-xl p-6 max-lg:p-3">
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold max-lg:text-xs"
                  >
                    7
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
                    {{ $t("tip_7") }}
                  </h3>
                </div>
                <p class="max-lg:text-xs">
                  {{ $t("tip_7_desc") }}
                </p>
              </div>

              <!-- Tip 8 -->
              <div class="bg-emerald-50 rounded-xl p-6 max-lg:p-3">
                <div
                  class="flex items-center gap-3 max-lg:gap-2 mb-4 max-lg:mb-2"
                >
                  <div
                    class="w-10 h-10 max-lg:w-6 max-lg:h-6 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-semibold max-lg:text-xs"
                  >
                    8
                  </div>
                  <h3 class="font-semibold text-gray-800 max-lg:text-sm">
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
          class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-10 max-lg:p-4 mb-16 max-lg:mb-8"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
            >
              <i class="bi bi-life-preserver text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-gray-800">
              {{ $t("support_resources") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-gray-600">
            <p class="max-lg:text-sm">
              {{ $t("support_description") }}
            </p>

            <div class="mt-8 max-lg:mt-4 space-y-6 max-lg:space-y-3">
              <!-- Our Support -->
              <div
                class="border border-blue-100 rounded-xl p-6 max-lg:p-3 bg-blue-50"
              >
                <h3
                  class="text-gray-800 font-semibold mb-4 max-lg:mb-2 max-lg:text-sm"
                >
                  {{ $t("our_support_team") }}
                </h3>
                <p class="max-lg:text-xs">
                  {{ $t("our_support_description") }}
                </p>
                <div class="mt-4 max-lg:mt-2">
                  <NuxtLinkLocale
                    to="/helpcenter"
                    class="inline-flex items-center text-blue-600 lg:hover:text-blue-700 font-medium max-lg:text-xs"
                  >
                    <i class="bi bi-headset mr-2 max-lg:mr-1"></i>
                    {{ $t("contact_support") }}
                  </NuxtLinkLocale>
                </div>
              </div>

              <!-- Helplines -->
              <div>
                <h3
                  class="text-gray-800 font-semibold mb-4 max-lg:mb-2 max-lg:text-sm"
                >
                  {{ $t("national_helplines") }}
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-lg:gap-2">
                  <div class="border border-gray-100 rounded-xl p-4 max-lg:p-2">
                    <h4 class="font-medium text-gray-800 max-lg:text-xs">
                      {{ $t("national_problem_gambling_helpline") }}
                    </h4>
                    <p class="text-gray-600 mb-2 max-lg:mb-1 max-lg:text-xs">
                      {{ $t("confidential_support") }}
                    </p>
                    <a
                      href="tel:1-800-522-4700"
                      class="text-blue-600 lg:hover:text-blue-700 font-medium max-lg:text-xs"
                      >1-800-522-4700</a
                    >
                  </div>

                  <div class="border border-gray-100 rounded-xl p-4 max-lg:p-2">
                    <h4 class="font-medium text-gray-800 max-lg:text-xs">
                      {{ $t("gamblers_anonymous") }}
                    </h4>
                    <p class="text-gray-600 mb-2 max-lg:mb-1 max-lg:text-xs">
                      {{ $t("peer_support_network") }}
                    </p>
                    <a
                      href="https://www.gamblersanonymous.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-600 lg:hover:text-blue-700 font-medium max-lg:text-xs"
                      >www.gamblersanonymous.org</a
                    >
                  </div>

                  <div class="border border-gray-100 rounded-xl p-4 max-lg:p-2">
                    <h4 class="font-medium text-gray-800 max-lg:text-xs">
                      {{ $t("gamcare") }}
                    </h4>
                    <p class="text-gray-600 mb-2 max-lg:mb-1 max-lg:text-xs">
                      {{ $t("information_advice_support") }}
                    </p>
                    <a
                      href="https://www.gamcare.org.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-600 lg:hover:text-blue-700 font-medium max-lg:text-xs"
                      >www.gamcare.org.uk</a
                    >
                  </div>

                  <div class="border border-gray-100 rounded-xl p-4 max-lg:p-2">
                    <h4 class="font-medium text-gray-800 max-lg:text-xs">
                      {{ $t("begambleaware") }}
                    </h4>
                    <p class="text-gray-600 mb-2 max-lg:mb-1 max-lg:text-xs">
                      {{ $t("guidance_free_resources") }}
                    </p>
                    <a
                      href="https://www.begambleaware.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-blue-600 lg:hover:text-blue-700 font-medium max-lg:text-xs"
                      >www.begambleaware.org</a
                    >
                  </div>
                </div>
              </div>

              <!-- Filtering Software -->
              <div>
                <h3
                  class="text-gray-800 font-semibold mb-4 max-lg:mb-2 max-lg:text-sm"
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
                    class="border border-gray-100 rounded-xl p-4 max-lg:p-2 lg:hover:shadow-sm transition-shadow text-center"
                  >
                    <h4 class="font-medium text-gray-800 max-lg:text-xs">
                      {{ $t("gamban") }}
                    </h4>
                    <p class="text-sm max-lg:text-[10px] text-gray-600">
                      {{ $t("gamban_desc") }}
                    </p>
                  </a>

                  <a
                    href="https://betblocker.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="border border-gray-100 rounded-xl p-4 max-lg:p-2 lg:hover:shadow-sm transition-shadow text-center"
                  >
                    <h4 class="font-medium text-gray-800 max-lg:text-xs">
                      {{ $t("betblocker") }}
                    </h4>
                    <p class="text-sm max-lg:text-[10px] text-gray-600">
                      {{ $t("betblocker_desc") }}
                    </p>
                  </a>

                  <a
                    href="https://gamblock.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="border border-gray-100 rounded-xl p-4 max-lg:p-2 lg:hover:shadow-sm transition-shadow text-center"
                  >
                    <h4 class="font-medium text-gray-800 max-lg:text-xs">
                      {{ $t("gamblock") }}
                    </h4>
                    <p class="text-sm max-lg:text-[10px] text-gray-600">
                      {{ $t("gamblock_desc") }}
                    </p>
                  </a>
                </div>
              </div>

              <!-- Professional Help -->
              <div>
                <h3
                  class="text-gray-800 font-semibold mb-4 max-lg:mb-2 max-lg:text-sm"
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
          class="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-10 max-lg:p-4 mb-16 max-lg:mb-8"
        >
          <div class="flex items-center gap-4 max-lg:gap-2 mb-8 max-lg:mb-4">
            <div
              class="w-12 h-12 max-lg:w-8 max-lg:h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600"
            >
              <i class="bi bi-shield-lock text-2xl max-lg:text-lg"></i>
            </div>
            <h2 class="text-2xl max-lg:text-lg font-bold text-gray-800">
              {{ $t("protecting_minors") }}
            </h2>
          </div>

          <div class="prose prose-lg max-lg:prose-sm max-w-none text-gray-600">
            <p class="max-lg:text-sm">
              {{ $t("protecting_minors_desc") }}
            </p>

            <h3
              class="text-gray-800 font-semibold mt-6 max-lg:mt-4 mb-4 max-lg:mb-2 max-lg:text-base"
            >
              {{ $t("our_safeguards") }}:
            </h3>

            <ul class="space-y-3 max-lg:space-y-2">
              <li class="flex items-start gap-3 max-lg:gap-2">
                <i
                  class="bi bi-check-circle-fill text-purple-500 mt-1 max-lg:text-sm"
                ></i>
                <span class="max-lg:text-xs"
                  ><strong>{{ $t("age_verification") }}:</strong>
                  {{ $t("age_verification_desc") }}</span
                >
              </li>
              <li class="flex items-start gap-3 max-lg:gap-2">
                <i
                  class="bi bi-check-circle-fill text-purple-500 mt-1 max-lg:text-sm"
                ></i>
                <span class="max-lg:text-xs"
                  ><strong>{{ $t("id_checks") }}:</strong>
                  {{ $t("id_checks_desc") }}</span
                >
              </li>
              <li class="flex items-start gap-3 max-lg:gap-2">
                <i
                  class="bi bi-check-circle-fill text-purple-500 mt-1 max-lg:text-sm"
                ></i>
                <span class="max-lg:text-xs"
                  ><strong>{{ $t("marketing_restrictions") }}:</strong>
                  {{ $t("marketing_restrictions_desc") }}</span
                >
              </li>
              <li class="flex items-start gap-3 max-lg:gap-2">
                <i
                  class="bi bi-check-circle-fill text-purple-500 mt-1 max-lg:text-sm"
                ></i>
                <span class="max-lg:text-xs"
                  ><strong>{{ $t("staff_training") }}:</strong>
                  {{ $t("staff_training_desc") }}</span
                >
              </li>
            </ul>

            <h3
              class="text-gray-800 font-semibold mt-8 max-lg:mt-4 mb-4 max-lg:mb-2 max-lg:text-base"
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
                class="border border-gray-100 rounded-xl p-4 max-lg:p-2 lg:hover:shadow-sm transition-shadow"
              >
                <h4 class="font-medium text-gray-800 max-lg:text-xs">
                  {{ $t("net_nanny") }}
                </h4>
                <p class="text-sm max-lg:text-[10px] text-gray-600">
                  {{ $t("net_nanny_desc") }}
                </p>
              </a>

              <a
                href="https://www.qustodio.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="border border-gray-100 rounded-xl p-4 max-lg:p-2 lg:hover:shadow-sm transition-shadow"
              >
                <h4 class="font-medium text-gray-800 max-lg:text-xs">
                  {{ $t("qustodio") }}
                </h4>
                <p class="text-sm max-lg:text-[10px] text-gray-600">
                  {{ $t("qustodio_desc") }}
                </p>
              </a>

              <a
                href="https://family.norton.com/"
                target="_blank"
                rel="noopener noreferrer"
                class="border border-gray-100 rounded-xl p-4 max-lg:p-2 lg:hover:shadow-sm transition-shadow"
              >
                <h4 class="font-medium text-gray-800 max-lg:text-xs">
                  {{ $t("norton_family") }}
                </h4>
                <p class="text-sm max-lg:text-[10px] text-gray-600">
                  {{ $t("norton_family_desc") }}
                </p>
              </a>

              <a
                href="https://support.apple.com/en-us/HT201304"
                target="_blank"
                rel="noopener noreferrer"
                class="border border-gray-100 rounded-xl p-4 max-lg:p-2 lg:hover:shadow-sm transition-shadow"
              >
                <h4 class="font-medium text-gray-800 max-lg:text-xs">
                  {{ $t("ios_screen_time") }}
                </h4>
                <p class="text-sm max-lg:text-[10px] text-gray-600">
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
            class="w-16 h-16 max-lg:w-10 max-lg:h-10 mx-auto bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 max-lg:mb-3"
          >
            <i class="bi bi-check2-circle text-2xl max-lg:text-lg"></i>
          </div>
          <h2
            class="text-3xl max-lg:text-xl font-bold text-gray-800 mb-6 max-lg:mb-3"
          >
            {{ $t("our_commitment") }}
          </h2>
          <p
            class="text-lg max-lg:text-sm text-gray-600 mb-8 max-lg:mb-4 max-w-3xl mx-auto"
          >
            {{ $t("commitment_description") }}
          </p>
          <NuxtLinkLocale
            href="/helpcenter"
            class="inline-flex items-center justify-center bg-emerald-600 text-white px-6 max-lg:px-4 py-3 max-lg:py-2 rounded-lg font-medium lg:hover:bg-emerald-700 transition-colors shadow-sm max-lg:text-xs"
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

useHead({
  title: "OC7 | Responsible Gaming & Player Protection - Safe Gaming Malaysia",
  meta: [
    {
      property: "og:title",
      content: "OC7 | Responsible Gaming - Safe & Fair Gaming Environment",
    },
    {
      name: "description",
      content:
        "OC7 promotes responsible gaming with self-assessment tools, deposit limits, time controls, self-exclusion options, and comprehensive player protection measures. Play safely and responsibly on Malaysia's trusted gaming platform.",
    },
    {
      name: "keywords",
      content:
        "OC7 responsible gaming, safe gaming Malaysia, player protection, self-assessment, deposit limits, gambling addiction help, gaming controls, responsible gambling, player safety, gaming support",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.oc7.me/responsible",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.oc7.me/responsible",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.oc7.me/responsible",
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
