<template>
  <ClientOnly>
    <!-- Simple Footer that matches website design -->
    <footer class="bg-[#1A0D13] text-white pt-12 pb-6 max-lg:pt-4">
      <div class="container mx-auto px-4">
        <!-- Footer Top - Links -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-lg:mb-4">
          <!-- Column 1s -->
          <div>
            <h4
              class="text-lg font-bold mb-4 max-lg:mb-1 max-lg:text-base text-[#f0eaea]"
            >
              {{ $t("products") }}
            </h4>
            <ul class="space-y-3 max-lg:space-y-1">
              <li>
                <NuxtLinkLocale
                  to="/games/sports"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("sports") }}</NuxtLinkLocale
                >
              </li>
              <li>
                <NuxtLinkLocale
                  to="/games/livecasino"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("live_casino") }}</NuxtLinkLocale
                >
              </li>
              <li>
                <NuxtLinkLocale
                  to="/games/slots"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("slot_games") }}</NuxtLinkLocale
                >
              </li>
              <li>
                <NuxtLinkLocale
                  to="/games/fishing"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("fishing") }}</NuxtLinkLocale
                >
              </li>
              <li>
                <NuxtLinkLocale
                  to="/games/lottery"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("lottery") }}</NuxtLinkLocale
                >
              </li>
            </ul>
          </div>

          <!-- Column 2 -->
          <div>
            <h4
              class="text-lg font-bold mb-4 max-lg:mb-1 max-lg:text-base text-[#f0eaea]"
            >
              {{ $t("support") }}
            </h4>
            <ul class="space-y-3 max-lg:space-y-1">
              <li>
                <NuxtLinkLocale
                  to="/helpcenter"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("help_center") }}</NuxtLinkLocale
                >
              </li>
              <li>
                <NuxtLinkLocale
                  to="/faq"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("faq") }}</NuxtLinkLocale
                >
              </li>
              <li>
                <NuxtLinkLocale
                  to="/responsible"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("responsible_gaming") }}</NuxtLinkLocale
                >
              </li>
            </ul>
          </div>

          <!-- Column 3 -->
          <div>
            <h4
              class="text-lg font-bold mb-4 max-lg:mb-1 max-lg:text-base text-[#f0eaea]"
            >
              {{ $t("information") }}
            </h4>
            <ul class="space-y-3 max-lg:space-y-1">
              <li>
                <NuxtLinkLocale
                  to="/license"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("license_display") }}</NuxtLinkLocale
                >
              </li>
              <li>
                <NuxtLinkLocale
                  href="/termscondition"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("terms_conditions") }}</NuxtLinkLocale
                >
              </li>

              <li>
                <NuxtLinkLocale
                  to="/myaccount/referral"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("affiliate_program") }}</NuxtLinkLocale
                >
              </li>
              <li>
                <NuxtLinkLocale
                  to="/vip"
                  class="text-[#b37a7a] lg:hover:text-[#f0eaea] text-sm"
                  >{{ $t("vip_program") }}</NuxtLinkLocale
                >
              </li>
            </ul>
          </div>

          <!-- Column 4 -->
          <div>
            <h4
              class="text-lg font-bold mb-4 max-lg:mb-1 max-lg:text-base text-[#f0eaea]"
            >
              {{ $t("follow_us") }}
            </h4>
            <div class="flex gap-3 max-lg:gap-1">
              <a
                :href="generalSetting.telegram"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-[#241017] lg:hover:bg-[#a1122d] w-8 h-8 rounded flex items-center justify-center transition-colors"
              >
                <i class="bi bi-telegram text-sm"></i>
              </a>
              <a
                :href="generalSetting.facebook"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-[#241017] lg:hover:bg-[#a1122d] w-8 h-8 rounded flex items-center justify-center transition-colors"
              >
                <i class="bi bi-facebook text-sm"></i>
              </a>

              <a
                :href="generalSetting.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-[#241017] lg:hover:bg-[#a1122d] w-8 h-8 rounded flex items-center justify-center transition-colors"
              >
                <i class="bi bi-instagram text-sm"></i>
              </a>

              <a
                :href="generalSetting.youtube"
                target="_blank"
                rel="noopener noreferrer"
                class="bg-[#241017] lg:hover:bg-[#a1122d] w-8 h-8 rounded flex items-center justify-center transition-colors"
              >
                <i class="bi bi-youtube text-sm"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- <div class="border-t border-gray-800 pt-8 pb-8 max-lg:py-4">
          <h4 class="text-lg font-bold mb-6 text-center max-lg:mb-2">
            {{ $t("payment_methods") }}
          </h4>
          <div class="flex flex-wrap justify-center gap-4">
            <img
              src="https://placehold.co/80x40/2d3748/cbd5e0/png?text=VISA"
              alt="Visa"
              class="h-8"
            />
            <img
              src="https://placehold.co/80x40/2d3748/cbd5e0/png?text=Mastercard"
              alt="Mastercard"
              class="h-8"
            />
            <img
              src="https://placehold.co/80x40/2d3748/cbd5e0/png?text=Bitcoin"
              alt="Bitcoin"
              class="h-8"
            />
            <img
              src="https://placehold.co/80x40/2d3748/cbd5e0/png?text=Ethereum"
              alt="Ethereum"
              class="h-8"
            />
            <img
              src="https://placehold.co/80x40/2d3748/cbd5e0/png?text=USDT"
              alt="USDT"
              class="h-8"
            />
            <img
              src="https://placehold.co/80x40/2d3748/cbd5e0/png?text=eWallet"
              alt="eWallet"
              class="h-8"
            />
            <img
              src="https://placehold.co/80x40/2d3748/cbd5e0/png?text=Bank"
              alt="Bank Transfer"
              class="h-8"
            />
          </div>
        </div> -->

        <!-- Footer Bottom -->
        <div
          class="border-t border-[#3b1c23] pt-6 flex flex-col md:flex-row justify-between items-center max-lg:pt-4"
        >
          <img src="/images/egm8my.png" alt="Logo" class="h-8" />

          <div class="text-sm text-[#b37a7a] max-lg:text-xs">
            {{ $t("copyright") }}
          </div>
        </div>
      </div>
    </footer>
  </ClientOnly>
</template>

<script setup>
const generalSetting = useState("generalSetting");
</script>

<style scoped></style>
