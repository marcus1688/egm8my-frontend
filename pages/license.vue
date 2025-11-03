<template>
  <div>
    <!-- Hero Section -->
    <section class="relative max-lg:max-w-[100vw] shadow-lg shadow-red-600/20">
      <NuxtImg
        src="/images/banner/license_banner_desktop.png"
        alt="Promotions and Bonuses Banner"
        class="w-full h-auto lg:block hidden"
      />
      <NuxtImg
        src="/images/banner/license_banner_mobile.png"
        alt="Promotions and Bonuses Banner"
        class="w-full h-auto lg:hidden block"
      />
    </section>

    <!-- Main Content -->
    <div class="py-16 max-lg:py-10">
      <div class="container mx-auto px-4">
        <div class="mx-auto">
          <div
            class="p-8 md:p-12 max-lg:p-4 rounded-lg shadow-lg shadow-red-500/20 border border-[#3b1c23] bg-[#241017]/60"
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
                    class="rounded-lg shadow-lg shadow-red-500/20 max-w-full object-contain border border-[#3b1c23]"
                    style="max-height: 500px"
                    onerror="this.src='https://placehold.co/400x600/241017/f0eaea?text=PAGCOR+License'"
                  />
                  <div
                    class="absolute -bottom-4 -right-4 max-lg:-bottom-2 max-lg:-right-2 w-24 h-24 max-lg:w-16 max-lg:h-16 bg-[#ff3344]/20 rounded-full p-2 flex items-center justify-center shadow-md border border-[#3b1c23]"
                  >
                    <img
                      src="/images/pagcor.png"
                      alt="PAGCOR Logo"
                      class="max-w-full max-h-full object-contain"
                      onerror="this.src='https://placehold.co/80x80/ff3344/fff?text=PAGCOR'"
                    />
                  </div>
                </div>
              </div>

              <!-- License Details -->
              <div class="lg:w-1/2">
                <h2
                  class="text-2xl max-lg:text-xl font-bold text-[#f0eaea] mb-6 max-lg:mb-4 flex items-center"
                >
                  <span
                    class="w-10 h-10 max-lg:w-8 max-lg:h-8 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-3 max-lg:mr-2"
                  >
                    <i class="bi bi-shield-check max-lg:text-sm"></i>
                  </span>
                  {{ $t("official_pagcor_license") }}
                </h2>

                <div class="space-y-6 max-lg:space-y-4">
                  <div>
                    <h3
                      class="text-lg max-lg:text-base font-semibold text-[#f0eaea] mb-1"
                    >
                      {{ $t("official_pagcor_license") }}
                    </h3>
                    <ul
                      class="space-y-3 max-lg:space-y-2 text-[#b37a7a] max-lg:text-sm"
                    >
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-400 mt-1 mr-2 max-lg:text-xs"
                        ></i>
                        <span
                          ><strong>{{ $t("license_number") }}:</strong>
                          OSP18-0037-4-B</span
                        >
                      </li>
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-400 mt-1 mr-2 max-lg:text-xs"
                        ></i>
                        <span
                          ><strong>{{ $t("issued_to") }}:</strong> EGM8 ASIA
                          GROUP LIMITED</span
                        >
                      </li>
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-400 mt-1 mr-2 max-lg:text-xs"
                        ></i>
                        <span
                          ><strong>{{ $t("type") }}:</strong> Gaming Support
                          Provider</span
                        >
                      </li>
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-400 mt-1 mr-2 max-lg:text-xs"
                        ></i>
                        <span
                          ><strong>{{ $t("effective_date") }}:</strong> February
                          17, 2017</span
                        >
                      </li>
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-400 mt-1 mr-2 max-lg:text-xs"
                        ></i>
                        <span
                          ><strong>{{ $t("issued_by") }}:</strong> Philippine
                          Amusement & Gaming Corporation (PAGCOR)</span
                        >
                      </li>
                      <li class="flex items-start">
                        <i
                          class="bi bi-check-circle-fill text-green-400 mt-1 mr-2 max-lg:text-xs"
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
                      class="text-lg max-lg:text-base font-semibold text-[#f0eaea] mb-1"
                    >
                      {{ $t("business_address") }}
                    </h3>
                    <p class="text-[#b37a7a] max-lg:text-sm">
                      14th Floor, Burgundy Corporate Tower, Sen. G. Puyat
                      Avenue, Makati City, Philippines
                    </p>
                  </div>

                  <div class="pt-4 max-lg:pt-2 border-t border-[#3b1c23]">
                    <p class="text-[#b37a7a] max-lg:text-sm italic">
                      {{ $t("certificate_effective") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- PAGCOR Info Section -->
            <div
              class="bg-[#15090e]/50 p-6 max-lg:p-4 rounded-lg shadow-sm mb-8 max-lg:mb-5 border border-[#3b1c23]"
            >
              <h3
                class="text-xl max-lg:text-lg font-bold text-[#f0eaea] mb-4 max-lg:mb-2 flex items-center"
              >
                <span
                  class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5"
                >
                  <i class="bi bi-info-circle max-lg:text-xs"></i>
                </span>
                {{ $t("about_pagcor") }}
              </h3>
              <p class="text-[#b37a7a] max-lg:text-sm mb-4 max-lg:mb-2">
                {{ $t("pagcor_description_1") }}
              </p>
              <p class="text-[#b37a7a] max-lg:text-sm">
                {{ $t("pagcor_description_2") }}
              </p>
            </div>

            <!-- What This Means For You -->
            <div
              class="bg-[#ff3344]/10 p-6 max-lg:p-4 rounded-lg shadow-sm border border-[#ff3344]/20"
            >
              <h3
                class="text-xl max-lg:text-lg font-bold text-[#f0eaea] mb-4 max-lg:mb-2 flex items-center"
              >
                <span
                  class="w-8 h-8 max-lg:w-6 max-lg:h-6 flex items-center justify-center bg-[#ff3344]/20 text-[#ff3344] rounded-full mr-2 max-lg:mr-1.5"
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
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4
                      class="font-semibold text-[#f0eaea] mb-1 max-lg:text-sm"
                    >
                      {{ $t("legal_regulated") }}
                    </h4>
                    <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                      {{ $t("legal_regulated_desc") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4
                      class="font-semibold text-[#f0eaea] mb-1 max-lg:text-sm"
                    >
                      {{ $t("fair_play") }}
                    </h4>
                    <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                      {{ $t("fair_play_desc") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4
                      class="font-semibold text-[#f0eaea] mb-1 max-lg:text-sm"
                    >
                      {{ $t("secure_transactions") }}
                    </h4>
                    <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                      {{ $t("secure_transactions_desc") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4
                      class="font-semibold text-[#f0eaea] mb-1 max-lg:text-sm"
                    >
                      {{ $t("responsible_gaming") }}
                    </h4>
                    <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                      {{ $t("responsible_gaming_desc") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4
                      class="font-semibold text-[#f0eaea] mb-1 max-lg:text-sm"
                    >
                      {{ $t("dispute_resolution") }}
                    </h4>
                    <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                      {{ $t("dispute_resolution_desc") }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start">
                  <div
                    class="w-10 h-10 max-lg:w-7 max-lg:h-7 bg-[#ff3344]/20 rounded-full flex items-center justify-center text-[#ff3344] mr-3 max-lg:mr-2 flex-shrink-0"
                  >
                    <i class="bi bi-check-lg max-lg:text-xs"></i>
                  </div>
                  <div>
                    <h4
                      class="font-semibold text-[#f0eaea] mb-1 max-lg:text-sm"
                    >
                      {{ $t("regular_audits") }}
                    </h4>
                    <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                      {{ $t("regular_audits_desc") }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Verification Notice -->
          <div class="mt-10 max-lg:mt-6 text-center">
            <p class="text-[#b37a7a] max-lg:text-sm">
              {{ $t("verification_notice") }}
              <a
                href="https://www.pagcor.ph/regulatory/index.php"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#ff3344] lg:hover:underline"
                >{{ $t("official_pagcor_website") }}</a
              >.
            </p>
            <p class="text-[#b37a7a] text-sm max-lg:text-xs mt-2">
              {{ $t("questions_licensing") }}
              <NuxtLinkLocale
                href="/helpcenter"
                class="text-[#ff3344] lg:hover:underline"
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
useHead({
  title:
    "EGM8 | Official PAGCOR Gaming License - Legal & Regulated Malaysia Casino",
  meta: [
    {
      property: "og:title",
      content: "EGM8 | PAGCOR Licensed Gaming Platform - Fully Regulated",
    },
    {
      name: "description",
      content:
        "EGM8 operates under official PAGCOR gaming license OSP18-0037-4-B, ensuring legal, regulated, and secure gaming services. Fully licensed by Philippine Amusement & Gaming Corporation for your protection and peace of mind.",
    },
    {
      name: "keywords",
      content:
        "EGM8 PAGCOR license, gaming license Malaysia, PAGCOR regulated casino, legal online casino, licensed gaming platform, EGM8 Asia Group Limited, gaming authority, regulated gambling Malaysia, licensed casino operator",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.egm8my.vip/license",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.egm8my.vip/license",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.egm8my.vip/license",
    },
  ],
});
</script>

<style scoped>
[id] {
  scroll-margin-top: 100px;
}
</style>
