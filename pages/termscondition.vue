<template>
  <div>
    <!-- Hero Section -->
    <section class="relative max-lg:max-w-[100vw] shadow-lg shadow-red-600/20">
      <NuxtImg
        src="/images/banner/terms_banner_desktop.png"
        alt="Promotions and Bonuses Banner"
        class="w-full h-auto lg:block hidden"
      />
      <NuxtImg
        src="/images/banner/terms_banner_mobile.png"
        alt="Promotions and Bonuses Banner"
        class="w-full h-auto lg:hidden block"
      />
    </section>

    <!-- Main Content -->
    <div
      class="bg-gradient-to-br from-[#1A0D13] via-gray-950 to-[#241017] py-12 max-lg:py-8"
    >
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto">
          <!-- Table of Contents -->
          <div
            class="mb-12 max-lg:mb-8 bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 border border-[#3b1c23]"
          >
            <h2
              class="text-xl max-lg:text-lg font-bold text-[#f0eaea] mb-4 max-lg:mb-3"
            >
              {{ $t("table_of_contents") }}
            </h2>
            <ul class="space-y-2 max-lg:space-y-1.5">
              <li>
                <a
                  href="#agreement"
                  @click.prevent="handleAnchorClick($event, 'agreement')"
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center transition-colors"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
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
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center transition-colors"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
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
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center transition-colors"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >3</span
                  >
                  <span class="max-lg:text-sm">{{ $t("user_accounts") }}</span>
                </a>
              </li>
              <li>
                <a
                  href="#user-content"
                  @click.prevent="handleAnchorClick($event, 'user-content')"
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center transition-colors"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
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
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center transition-colors"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
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
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center transition-colors"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
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
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center transition-colors"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
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
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center transition-colors"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
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
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center transition-colors"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
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
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center transition-colors"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
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
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center transition-colors"
                >
                  <span
                    class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5 font-semibold max-lg:text-sm"
                    >11</span
                  >
                  <span class="max-lg:text-sm">{{ $t("governing_law") }}</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Introduction -->
          <div
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <h2
              class="text-2xl max-lg:text-xl font-bold text-[#f0eaea] mb-4 max-lg:mb-2"
            >
              {{ $t("introduction") }}
            </h2>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("introduction_text_1") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("introduction_text_2") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("introduction_text_3") }}
            </p>
          </div>

          <!-- Agreement to Terms -->
          <div
            id="agreement"
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                1
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ $t("agreement_to_terms") }}
              </h2>
            </div>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("agreement_text_1") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("agreement_text_2") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("agreement_text_3") }}
            </p>
          </div>

          <!-- Intellectual Property Rights -->
          <div
            id="intellectual-property"
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                2
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ $t("intellectual_property_rights") }}
              </h2>
            </div>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("intellectual_property_text_1") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("intellectual_property_text_2") }}:
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-[#b37a7a] max-lg:text-sm space-y-2 max-lg:space-y-1"
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
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("intellectual_property_text_3") }}
            </p>
          </div>

          <!-- User Accounts -->
          <div
            id="user-accounts"
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                3
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ $t("user_accounts") }}
              </h2>
            </div>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("user_accounts_text_1") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("user_accounts_text_2") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("user_accounts_text_3") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("user_accounts_text_4") }}
            </p>
          </div>

          <!-- User Generated Content -->
          <div
            id="user-content"
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                4
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ $t("user_generated_content") }}
              </h2>
            </div>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("user_content_text_1") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("user_content_text_2") }}:
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-[#b37a7a] max-lg:text-sm space-y-2 max-lg:space-y-1"
            >
              <li>
                {{ $t("user_content_list_1") }}
              </li>
              <li>
                {{ $t("user_content_list_2") }}
              </li>
            </ul>
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("user_content_text_3") }}
            </p>
          </div>

          <!-- Prohibited Activities -->
          <div
            id="prohibited-activities"
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                5
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ $t("prohibited_activities") }}
              </h2>
            </div>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("prohibited_text_1") }}
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-[#b37a7a] max-lg:text-sm space-y-2 max-lg:space-y-1"
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
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("prohibited_text_2") }}
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-[#b37a7a] max-lg:text-sm space-y-2 max-lg:space-y-1"
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
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("prohibited_text_3") }}
            </p>
          </div>

          <!-- Deposits and Withdrawals -->
          <div
            id="deposits-withdrawals"
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                6
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ $t("deposits_withdrawals") }}
              </h2>
            </div>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("deposits_text_1") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("deposits_text_2") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("deposits_text_3") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("deposits_text_4") }}
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-[#b37a7a] max-lg:text-sm space-y-2 max-lg:space-y-1"
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
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("deposits_text_5") }}
            </p>
          </div>

          <!-- Responsible Gaming -->
          <div
            id="responsible-gaming"
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                7
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ $t("responsible_gaming") }}
              </h2>
            </div>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("gaming_text_1") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("gaming_text_2") }}
            </p>
            <ul
              class="list-disc pl-6 mb-4 max-lg:mb-2 text-[#b37a7a] max-lg:text-sm space-y-2 max-lg:space-y-1"
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
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("gaming_text_3") }}
              <NuxtLinkLocale
                to="/responsible"
                class="text-[#ff3344] lg:hover:underline"
                >{{ $t("responsible_gaming_page") }}</NuxtLinkLocale
              >
              {{ $t("gaming_text_4") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("gaming_text_5") }}
            </p>
          </div>

          <!-- Limitation of Liability -->
          <div
            id="limitation-liability"
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                8
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ $t("limitation_liability") }}
              </h2>
            </div>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("liability_text_1") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("liability_text_2") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("liability_text_3") }}
            </p>
          </div>

          <!-- Term and Termination -->
          <div
            id="termination"
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                9
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ $t("term_termination") }}
              </h2>
            </div>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("termination_text_1") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("termination_text_2") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("termination_text_3") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("termination_text_4") }}
            </p>
          </div>

          <!-- Modifications to Terms -->
          <div
            id="modifications"
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                10
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ $t("modifications_terms") }}
              </h2>
            </div>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("modifications_text_1") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("modifications_text_2") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("modifications_text_3") }}
            </p>
          </div>

          <!-- Governing Law -->
          <div
            id="governing-law"
            class="bg-[#241017]/60 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 border border-[#3b1c23]"
          >
            <div class="flex items-center mb-4 max-lg:mb-2">
              <div
                class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2 font-semibold max-lg:text-sm"
              >
                11
              </div>
              <h2 class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                {{ $t("governing_law") }}
              </h2>
            </div>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("law_text_1") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
              {{ $t("law_text_2") }}
            </p>
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("law_text_3") }}
            </p>
          </div>

          <!-- Acceptance Button -->
          <div
            class="bg-[#ff3344]/10 p-6 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 mb-8 max-lg:mb-5 text-center border border-[#ff3344]/20"
          >
            <p class="text-[#f0eaea] max-lg:text-sm mb-4 max-lg:mb-3">
              {{ $t("acceptance_text") }}
            </p>
            <button
              @click="acceptTerms"
              class="bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white px-6 max-lg:px-4 py-3 max-lg:py-2 rounded-lg font-medium lg:hover:brightness-110 transition-all max-lg:text-sm shadow-lg"
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
const scrollToElement = inject("scrollToElement");

const handleAnchorClick = (e, targetId) => {
  e.preventDefault();
  scrollToElement(targetId);
};

const acceptTerms = () => {
  showAlert($t("thank_you"), $t("acceptance_message"), "success");
};

useHead({
  title: "EGM8 | Terms & Conditions - Legal Agreement Malaysia Online Casino",
  meta: [
    {
      property: "og:title",
      content: "EGM8 | Terms & Conditions - User Agreement & Policies",
    },
    {
      name: "description",
      content:
        "Read EGM8's comprehensive terms and conditions covering user agreements, account policies, intellectual property rights, deposits & withdrawals, responsible gaming, and legal provisions for Malaysia's premier gaming platform.",
    },
    {
      name: "keywords",
      content:
        "EGM8 terms conditions, user agreement, casino terms, gaming policies Malaysia, legal terms, account policies, intellectual property, deposit withdrawal terms, responsible gaming policy, casino legal agreement",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.egm8my.vip/termscondition",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.egm8my.vip/termscondition",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.egm8my.vip/termscondition",
    },
  ],
});
</script>

<style scoped></style>
