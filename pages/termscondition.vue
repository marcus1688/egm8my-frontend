<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-gray-700 to-gray-900 relative">
      <div class="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="white"
                stroke-width="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div
        class="container mx-auto px-6 max-lg:px-4 py-16 max-lg:py-10 relative z-10"
      >
        <div class="max-w-4xl mx-auto">
          <h1
            class="text-4xl md:text-5xl max-lg:text-2xl font-bold text-white mb-4 max-lg:mb-2 text-center"
          >
            {{ $t("terms_conditions") }}
          </h1>
          <p
            class="text-gray-300 text-lg md:text-xl max-lg:text-base mb-6 max-lg:mb-3 text-center"
          >
            {{ $t("read_carefully") }}
          </p>
          <div class="flex justify-center">
            <p class="text-sm max-lg:text-xs text-gray-400">
              {{ $t("last_updated") }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-white py-12 max-lg:py-8">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Table of Contents -->
          <div
            class="mb-12 max-lg:mb-8 bg-gray-50 p-6 max-lg:p-4 rounded-lg shadow-sm"
          >
            <h2
              class="text-xl max-lg:text-lg font-bold text-gray-800 mb-4 max-lg:mb-3"
            >
              {{ $t("table_of_contents") }}
            </h2>
            <ul class="space-y-2 max-lg:space-y-1.5">
              <li>
                <a
                  href="#agreement"
                  @click.prevent="handleAnchorClick($event, 'agreement')"
                  class="text-blue-600 lg:hover:text-blue-800 flex items-center"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >1</span
                  >
                  <span class="max-lg:text-sm">{{
                    $t("agreement_to_terms")
                  }}</span>
                </a>
              </li>
              <li>
                <a
                  href="#intellectual-property"
                  @click.prevent="
                    handleAnchorClick($event, 'intellectual-property')
                  "
                  class="text-blue-600 lg:hover:text-blue-800 flex items-center"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >2</span
                  >
                  <span class="max-lg:text-sm">{{
                    $t("intellectual_property_rights")
                  }}</span>
                </a>
              </li>
              <li>
                <a
                  href="#user-accounts"
                  @click.prevent="handleAnchorClick($event, 'user-accounts')"
                  class="text-blue-600 lg:hover:text-blue-800 flex items-center"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >3</span
                  >
                  <span class="max-lg:text-sm">{{ $t("user_accounts") }}</span>
                </a>
              </li>
              <li>
                <a
                  href="#user-content"
                  @click.prevent="handleAnchorClick($event, 'user-content')"
                  class="text-blue-600 lg:hover:text-blue-800 flex items-center"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >4</span
                  >
                  <span class="max-lg:text-sm">{{
                    $t("user_generated_content")
                  }}</span>
                </a>
              </li>
              <li>
                <a
                  href="#prohibited-activities"
                  @click.prevent="
                    handleAnchorClick($event, 'prohibited-activities')
                  "
                  class="text-blue-600 lg:hover:text-blue-800 flex items-center"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >5</span
                  >
                  <span class="max-lg:text-sm">{{
                    $t("prohibited_activities")
                  }}</span>
                </a>
              </li>
              <li>
                <a
                  href="#deposits-withdrawals"
                  @click.prevent="
                    handleAnchorClick($event, 'deposits-withdrawals')
                  "
                  class="text-blue-600 lg:hover:text-blue-800 flex items-center"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >6</span
                  >
                  <span class="max-lg:text-sm">{{
                    $t("deposits_withdrawals")
                  }}</span>
                </a>
              </li>
              <li>
                <a
                  href="#responsible-gaming"
                  @click.prevent="
                    handleAnchorClick($event, 'responsible-gaming')
                  "
                  class="text-blue-600 lg:hover:text-blue-800 flex items-center"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >7</span
                  >
                  <span class="max-lg:text-sm">{{
                    $t("responsible_gaming")
                  }}</span>
                </a>
              </li>
              <li>
                <a
                  href="#limitation-liability"
                  @click.prevent="
                    handleAnchorClick($event, 'limitation-liability')
                  "
                  class="text-blue-600 lg:hover:text-blue-800 flex items-center"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >8</span
                  >
                  <span class="max-lg:text-sm">{{
                    $t("limitation_liability")
                  }}</span>
                </a>
              </li>
              <li>
                <a
                  href="#termination"
                  @click.prevent="handleAnchorClick($event, 'termination')"
                  class="text-blue-600 lg:hover:text-blue-800 flex items-center"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >9</span
                  >
                  <span class="max-lg:text-sm">{{
                    $t("term_termination")
                  }}</span>
                </a>
              </li>
              <li>
                <a
                  href="#modifications"
                  @click.prevent="handleAnchorClick($event, 'modifications')"
                  class="text-blue-600 lg:hover:text-blue-800 flex items-center"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >10</span
                  >
                  <span class="max-lg:text-sm">{{
                    $t("modifications_terms")
                  }}</span>
                </a>
              </li>
              <li>
                <a
                  href="#governing-law"
                  @click.prevent="handleAnchorClick($event, 'governing-law')"
                  class="text-blue-600 lg:hover:text-blue-800 flex items-center"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >11</span
                  >
                  <span class="max-lg:text-sm">{{ $t("governing_law") }}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Introduction -->
          <div
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <h2
              class="text-2xl max-lg:text-xl font-bold text-gray-800 mb-4 max-lg:mb-2"
            >
              {{ $t("introduction") }}
            </h2>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("introduction_text_1") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("introduction_text_2") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("introduction_text_3") }}
            </p>
          </div>

          <!-- Agreement to Terms -->
          <div
            id="agreement"
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                1
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("agreement_to_terms") }}
              </h2>
            </div>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("agreement_text_1") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("agreement_text_2") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("agreement_text_3") }}
            </p>
          </div>

          <!-- Intellectual Property Rights -->
          <div
            id="intellectual-property"
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                2
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("intellectual_property_rights") }}
              </h2>
            </div>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("intellectual_property_text_1") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("intellectual_property_text_2") }}:
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-gray-600 max-lg:text-sm space-y-2 max-lg:space-y-1"
            >
              <li>
                {{ $t("intellectual_property_list_1") }}
              </li>
              <li>
                {{ $t("intellectual_property_list_2") }}
              </li>
              <li>
                {{ $t("intellectual_property_list_3") }}
              </li>
            </ul>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("intellectual_property_text_3") }}
            </p>
          </div>

          <!-- User Accounts -->
          <div
            id="user-accounts"
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                3
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("user_accounts") }}
              </h2>
            </div>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("user_accounts_text_1") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("user_accounts_text_2") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("user_accounts_text_3") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("user_accounts_text_4") }}
            </p>
          </div>

          <!-- User Generated Content -->
          <div
            id="user-content"
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                4
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("user_generated_content") }}
              </h2>
            </div>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("user_content_text_1") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("user_content_text_2") }}:
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-gray-600 max-lg:text-sm space-y-2 max-lg:space-y-1"
            >
              <li>
                {{ $t("user_content_list_1") }}
              </li>
              <li>
                {{ $t("user_content_list_2") }}
              </li>
            </ul>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("user_content_text_3") }}
            </p>
          </div>

          <!-- Prohibited Activities -->
          <div
            id="prohibited-activities"
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                5
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("prohibited_activities") }}
              </h2>
            </div>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("prohibited_text_1") }}
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-gray-600 max-lg:text-sm space-y-2 max-lg:space-y-1"
            >
              <li>
                {{ $t("prohibited_list_1") }}
              </li>
              <li>
                {{ $t("prohibited_list_2") }}
              </li>
              <li>
                {{ $t("prohibited_list_3") }}
              </li>
              <li>
                {{ $t("prohibited_list_4") }}
              </li>
              <li>
                {{ $t("prohibited_list_5") }}
              </li>
            </ul>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("prohibited_text_2") }}
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-gray-600 max-lg:text-sm space-y-2 max-lg:space-y-1"
            >
              <li>
                {{ $t("prohibited_list_6") }}
              </li>
              <li>
                {{ $t("prohibited_list_7") }}
              </li>
              <li>
                {{ $t("prohibited_list_8") }}
              </li>
              <li>
                {{ $t("prohibited_list_9") }}
              </li>
              <li>
                {{ $t("prohibited_list_10") }}
              </li>
              <li>
                {{ $t("prohibited_list_11") }}
              </li>
              <li>
                {{ $t("prohibited_list_12") }}
              </li>
              <li>
                {{ $t("prohibited_list_13") }}
              </li>
              <li>
                {{ $t("prohibited_list_14") }}
              </li>
              <li>{{ $t("prohibited_list_15") }}</li>
            </ul>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("prohibited_text_3") }}
            </p>
          </div>

          <!-- Deposits and Withdrawals -->
          <div
            id="deposits-withdrawals"
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                6
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("deposits_withdrawals") }}
              </h2>
            </div>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("deposits_text_1") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("deposits_text_2") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("deposits_text_3") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("deposits_text_4") }}
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-gray-600 max-lg:text-sm space-y-2 max-lg:space-y-1"
            >
              <li>
                {{ $t("deposits_list_1") }}
              </li>
              <li>{{ $t("deposits_list_2") }}</li>
              <li>
                {{ $t("deposits_list_3") }}
              </li>
              <li>
                {{ $t("deposits_list_4") }}
              </li>
            </ul>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("deposits_text_5") }}
            </p>
          </div>

          <!-- Responsible Gaming -->
          <div
            id="responsible-gaming"
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                7
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("responsible_gaming") }}
              </h2>
            </div>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("gaming_text_1") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("gaming_text_2") }}
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-gray-600 max-lg:text-sm space-y-2 max-lg:space-y-1"
            >
              <li>
                {{ $t("gaming_list_1") }}
              </li>
              <li>
                {{ $t("gaming_list_2") }}
              </li>
              <li>
                {{ $t("gaming_list_3") }}
              </li>
              <li>
                {{ $t("gaming_list_4") }}
              </li>
              <li>
                {{ $t("gaming_list_5") }}
              </li>
            </ul>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("gaming_text_3") }}
              <NuxtLinkLocale
                to="/responsible"
                class="text-blue-600 lg:hover:underline"
                >{{ $t("responsible_gaming_page") }}</NuxtLinkLocale
              >
              {{ $t("gaming_text_4") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("gaming_text_5") }}
            </p>
          </div>

          <!-- Limitation of Liability -->
          <div
            id="limitation-liability"
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                8
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("limitation_liability") }}
              </h2>
            </div>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("liability_text_1") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("liability_text_2") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("liability_text_3") }}
            </p>
          </div>

          <!-- Term and Termination -->
          <div
            id="termination"
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                9
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("term_termination") }}
              </h2>
            </div>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("termination_text_1") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("termination_text_2") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("termination_text_3") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("termination_text_4") }}
            </p>
          </div>

          <!-- Modifications to Terms -->
          <div
            id="modifications"
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                10
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("modifications_terms") }}
              </h2>
            </div>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("modifications_text_1") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("modifications_text_2") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("modifications_text_3") }}
            </p>
          </div>

          <!-- Governing Law -->
          <div
            id="governing-law"
            class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                11
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-gray-800">
                {{ $t("governing_law") }}
              </h2>
            </div>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("law_text_1") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("law_text_2") }}
            </p>
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("law_text_3") }}
            </p>
          </div>

          <!-- Acceptance Button -->
          <div
            class="bg-blue-50 p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5 text-center"
          >
            <p class="text-gray-700 max-lg:text-sm mb-4 max-lg:mb-3">
              {{ $t("acceptance_text") }}
            </p>
            <button
              @click="acceptTerms"
              class="bg-blue-600 text-white px-6 max-lg:px-4 py-3 max-lg:py-2 rounded-lg font-medium lg:hover:bg-blue-700 transition-colors max-lg:text-sm"
            >
              {{ $t("accept_button") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { showAlert } = useAlert();
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

const acceptTerms = () => {
  showAlert($t("thank_you"), $t("acceptance_message"), "success");
};

useHead({
  title: "OC7 | Terms & Conditions - Legal Agreement Malaysia Online Casino",
  meta: [
    {
      property: "og:title",
      content: "OC7 | Terms & Conditions - User Agreement & Policies",
    },
    {
      name: "description",
      content:
        "Read OC7's comprehensive terms and conditions covering user agreements, account policies, intellectual property rights, deposits & withdrawals, responsible gaming, and legal provisions for Malaysia's premier gaming platform.",
    },
    {
      name: "keywords",
      content:
        "OC7 terms conditions, user agreement, casino terms, gaming policies Malaysia, legal terms, account policies, intellectual property, deposit withdrawal terms, responsible gaming policy, casino legal agreement",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.oc7.me/termscondition",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.oc7.me/termscondition",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.oc7.me/termscondition",
    },
  ],
});
</script>

<style scoped></style>
