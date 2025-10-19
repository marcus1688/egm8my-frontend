<template>
  <div>
    <!-- Hero Section -->
    <div class="bg-gradient-to-r from-blue-800 to-indigo-900 relative">
      <div class="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <defs>
            <pattern
              id="shield-pattern"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M25,2 L2,10 L2,30 Q2,35 6,38 L25,48 L44,38 Q48,35 48,30 L48,10 L25,2"
                fill="none"
                stroke="white"
                stroke-width="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#shield-pattern)" />
        </svg>
      </div>

      <div
        class="container mx-auto px-6 max-lg:px-4 py-16 max-lg:py-12 relative z-10"
      >
        <div class="max-w-4xl mx-auto text-center">
          <h1
            class="text-4xl md:text-5xl max-lg:text-3xl font-bold text-white mb-4 max-lg:mb-2"
          >
            {{ $t("official_gaming_license") }}
          </h1>
          <p
            class="text-blue-100 text-lg md:text-xl max-lg:text-base max-w-2xl mx-auto"
          >
            {{ $t("fully_licensed") }}
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="bg-white py-16 max-lg:py-10">
      <div class="container mx-auto px-4">
        <div class="mx-auto">
          <div
            class="p-8 md:p-12 max-lg:p-4 rounded-lg shadow-lg border border-amber-100"
          >
            <!-- License Info Section -->
            <div
              class="flex flex-col lg:flex-row gap-10 max-lg:gap-6 mb-10 max-lg:mb-6"
            >
              <!-- License Certificate Image -->
              <div class="lg:w-1/2 flex justify-center">
                <div class="relative">
                  <img
                    src="/images/license.png"
                    alt="PAGCOR License Certificate"
                    class="rounded-lg shadow-lg max-w-full object-contain"
                    style="max-height: 500px"
                    onerror="this.src='https://placehold.co/400x600/FCFBE7/333?text=PAGCOR+License'"
                  />
                  <div
                    class="absolute -bottom-4 -right-4 max-lg:-bottom-2 max-lg:-right-2 w-24 h-24 max-lg:w-16 max-lg:h-16 bg-blue-100 rounded-full p-2 flex items-center justify-center shadow-md"
                  >
                    <img
                      src="/images/pagcor.png"
                      alt="PAGCOR Logo"
                      class="max-w-full max-h-full object-contain"
                      onerror="this.src='https://placehold.co/80x80/fff/333?text=PAGCOR'"
                    />
                  </div>
                </div>
              </div>

              <!-- License Details -->
              <div class="lg:w-1/2">
                <h2
                  class="text-2xl max-lg:text-xl font-bold text-gray-800 mb-6 max-lg:mb-4 flex items-center"
                >
                  <span
                    class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full mr-3 max-lg:mr-2"
                  >
                    <i class="bi bi-shield-check max-lg:text-sm"></i>
                  </span>
                  {{ $t("official_pagcor_license") }}
                </h2>

                <div class="space-y-6 max-lg:space-y-4">
                  <div>
                    <h3
                      class="text-lg max-lg:text-base font-semibold text-gray-700 mb-1"
                    >
                      {{ $t("official_pagcor_license") }}
                    </h3>
                    <ul
                      class="space-y-3 max-lg:space-y-2 text-gray-600 max-lg:text-sm"
                    >
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-500 mt-1 mr-2 max-lg:text-xs"
                        ></i>
                        <span
                          ><strong>{{ $t("license_number") }}:</strong>
                          OSP18-0037-4-B</span
                        >
                      </li>
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-500 mt-1 mr-2 max-lg:text-xs"
                        ></i>
                        <span
                          ><strong>{{ $t("issued_to") }}:</strong> OC7 ASIA
                          GROUP LIMITED</span
                        >
                      </li>
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-500 mt-1 mr-2 max-lg:text-xs"
                        ></i>
                        <span
                          ><strong>{{ $t("type") }}:</strong> Gaming Support
                          Provider</span
                        >
                      </li>
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-500 mt-1 mr-2 max-lg:text-xs"
                        ></i>
                        <span
                          ><strong>{{ $t("effective_date") }}:</strong> February
                          17, 2017</span
                        >
                      </li>
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-500 mt-1 mr-2 max-lg:text-xs"
                        ></i>
                        <span
                          ><strong>{{ $t("issued_by") }}:</strong> Philippine
                          Amusement & Gaming Corporation (PAGCOR)</span
                        >
                      </li>
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-500 mt-1 mr-2 max-lg:text-xs"
                        ></i>
                        <span
                          ><strong>{{ $t("legal_authority") }}:</strong>
                          Presidential Decree 1869, as amended by Republic Act
                          9487</span
                        >
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3
                      class="text-lg max-lg:text-base font-semibold text-gray-700 mb-1"
                    >
                      {{ $t("business_address") }}
                    </h3>
                    <p class="text-gray-600 max-lg:text-sm">
                      14th Floor, Burgundy Corporate Tower, Sen. G. Puyat
                      Avenue, Makati City, Philippines
                    </p>
                  </div>

                  <div class="pt-4 max-lg:pt-2 border-t border-amber-200">
                    <p class="text-gray-600 max-lg:text-sm italic">
                      {{ $t("certificate_effective") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- PAGCOR Info Section -->
            <div
              class="bg-white p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5"
            >
              <h3
                class="text-xl max-lg:text-lg font-bold text-gray-800 mb-4 max-lg:mb-2 flex items-center"
              >
                <span
                  class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-amber-100 text-amber-700 rounded-full mr-2 max-lg:mr-1.5"
                >
                  <i class="bi bi-info-circle max-lg:text-xs"></i>
                </span>
                {{ $t("about_pagcor") }}
              </h3>
              <p class="text-gray-600 max-lg:text-sm mb-4 max-lg:mb-2">
                {{ $t("pagcor_description_1") }}
              </p>
              <p class="text-gray-600 max-lg:text-sm">
                {{ $t("pagcor_description_2") }}
              </p>
            </div>

            <!-- What This Means For You -->
            <div class="bg-blue-50 p-6 max-lg:p-4 rounded-lg shadow-sm">
              <h3
                class="text-xl max-lg:text-lg font-bold text-gray-800 mb-4 max-lg:mb-2 flex items-center"
              >
                <span
                  class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full mr-2 max-lg:mr-1.5"
                >
                  <i class="bi bi-shield-lock max-lg:text-xs"></i>
                </span>
                {{ $t("what_this_means") }}
              </h3>
              <div
                class="grid grid-cols-1 md:grid-cols-2 gap-6 max-lg:gap-3 mt-4 max-lg:mt-2"
              >
                <div class="flex items-start">
                  <div
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1 max-lg:text-sm">
                      {{ $t("legal_regulated") }}
                    </h4>
                    <p class="text-gray-600 text-sm max-lg:text-xs">
                      {{ $t("legal_regulated_desc") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1 max-lg:text-sm">
                      {{ $t("fair_play") }}
                    </h4>
                    <p class="text-gray-600 text-sm max-lg:text-xs">
                      {{ $t("fair_play_desc") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1 max-lg:text-sm">
                      {{ $t("secure_transactions") }}
                    </h4>
                    <p class="text-gray-600 text-sm max-lg:text-xs">
                      {{ $t("secure_transactions_desc") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1 max-lg:text-sm">
                      {{ $t("responsible_gaming") }}
                    </h4>
                    <p class="text-gray-600 text-sm max-lg:text-xs">
                      {{ $t("responsible_gaming_desc") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1 max-lg:text-sm">
                      {{ $t("dispute_resolution") }}
                    </h4>
                    <p class="text-gray-600 text-sm max-lg:text-xs">
                      {{ $t("dispute_resolution_desc") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800 mb-1 max-lg:text-sm">
                      {{ $t("regular_audits") }}
                    </h4>
                    <p class="text-gray-600 text-sm max-lg:text-xs">
                      {{ $t("regular_audits_desc") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Verification Notice -->
          <div class="mt-10 max-lg:mt-6 text-center">
            <p class="text-gray-600 max-lg:text-sm">
              {{ $t("verification_notice") }}
              <a
                href="https://www.pagcor.ph/regulatory/index.php"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-600 lg:hover:underline"
                >{{ $t("official_pagcor_website") }}</a
              >.
            </p>
            <p class="text-gray-500 text-sm max-lg:text-xs mt-2">
              {{ $t("questions_licensing") }}
              <NuxtLinkLocale
                href="/helpcenter"
                class="text-blue-600 lg:hover:underline"
                >{{ $t("contact_support") }}</NuxtLinkLocale
              >.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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
  title:
    "OC7 | Official PAGCOR Gaming License - Legal & Regulated Malaysia Casino",
  meta: [
    {
      property: "og:title",
      content: "OC7 | PAGCOR Licensed Gaming Platform - Fully Regulated",
    },
    {
      name: "description",
      content:
        "OC7 operates under official PAGCOR gaming license OSP18-0037-4-B, ensuring legal, regulated, and secure gaming services. Fully licensed by Philippine Amusement & Gaming Corporation for your protection and peace of mind.",
    },
    {
      name: "keywords",
      content:
        "OC7 PAGCOR license, gaming license Malaysia, PAGCOR regulated casino, legal online casino, licensed gaming platform, OC7 Asia Group Limited, gaming authority, regulated gambling Malaysia, licensed casino operator",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.oc7.me/license",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.oc7.me/license",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.oc7.me/license",
    },
  ],
});
</script>

<style scoped>
[id] {
  scroll-margin-top: 100px;
}
</style>
