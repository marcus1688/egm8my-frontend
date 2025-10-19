<template>
  <ClientOnly>
    <ConfirmAlert
      :title="confirmAlertTitle"
      :message="confirmAlertMessage"
      :isVisible="isConfirmAlertVisible"
      :type="confirmAlertType"
      @close="handleConfirmClose"
    />
    <Alerts
      :title="alertTitle"
      :message="alertMessage"
      :isVisible="alertVisible"
      :type="alertType"
      @close="alertVisible = false"
    />

    <div>
      <header
        class="relative w-full h-[80px] max-lg:h-[60px] bg-[#1A0D13] shadow-md border-b border-gray-800 z-50"
      >
        <div
          class="mx-auto px-24 py-4 h-full max-2xl:px-12 max-xl:px-4 max-lg:p-2"
        >
          <div class="flex justify-between items-center h-full">
            <div class="flex items-center gap-4 max-[373px]:!gap-2">
              <button
                @click="mobileMenuOpen = !mobileMenuOpen"
                class="lg:hidden text-gray-300 hover:text-white"
              >
                <i class="bi bi-list text-2xl max-[480px]:text-xl"></i>
              </button>
              <NuxtLinkLocale class="max-lg:hidden" to="/">
                <img
                  :src="generalSetting.logoimage"
                  alt="Logo"
                  class="w-24 h-auto"
                />
              </NuxtLinkLocale>
              <div v-if="!userData">
                <NuxtLinkLocale class="lg:hidden" to="/">
                  <img
                    :src="generalSetting.logoimage"
                    alt="Logo"
                    class="w-16 h-auto"
                  />
                </NuxtLinkLocale>
              </div>
            </div>

            <div v-if="userData">
              <NuxtLinkLocale class="lg:hidden" to="/">
                <img
                  :src="generalSetting.logoimage"
                  alt="Logo"
                  class="w-12 h-auto"
                />
              </NuxtLinkLocale>
            </div>

            <nav class="hidden lg:flex items-center flex-1 justify-center">
              <div
                v-for="item in HeaderNav"
                :key="item.name"
                class="relative px-3"
              >
                <div
                  class="py-2 inline-block"
                  @mouseenter="activeDropdown = item.name"
                >
                  <NuxtLinkLocale
                    :to="`${item.link}`"
                    class="flex items-center gap-1 menuText font-medium text-gray-300 lg:hover:text-red-400 transition-colors"
                  >
                    <span>{{ item.label }}</span>
                    <i class="bi bi-chevron-down text-xs"></i>
                  </NuxtLinkLocale>
                </div>

                <div
                  v-if="activeDropdown === item.name"
                  class="absolute left-0 w-full h-2 bottom-0 translate-y-full z-50"
                  @mouseenter="activeDropdown = item.name"
                ></div>
              </div>
              <div class="px-3 max-xl:hidden">
                <NuxtLinkLocale
                  to="/promotions"
                  class="menuText font-medium text-gray-300 lg:hover:text-red-400 transition-colors"
                >
                  {{ $t("promotions") }}</NuxtLinkLocale
                >
              </div>
              <div class="px-3 max-xl:hidden">
                <NuxtLinkLocale
                  to="/vip"
                  class="menuText font-medium text-gray-300 lg:hover:text-red-400 transition-colors"
                >
                  {{ $t("vip") }}</NuxtLinkLocale
                >
              </div>
            </nav>

            <div class="flex items-center gap-2">
              <div>
                <div v-if="!userData" class="flex gap-2 items-center">
                  <NuxtLinkLocale
                    to="/login"
                    class="px-4 py-1.5 max-[360px]:!px-4 menuText font-medium text-gray-300 border border-gray-600 rounded lg:hover:border-red-400 lg:hover:text-red-400 transition-colors"
                  >
                    {{ $t("log_in") }}
                  </NuxtLinkLocale>
                  <NuxtLinkLocale
                    to="/register"
                    class="px-4 py-1.5 max-[360px]:!px-4 menuText font-medium bg-red-600 lg:hover:bg-red-700 text-white rounded transition-colors"
                  >
                    {{ $t("register") }}
                  </NuxtLinkLocale>
                </div>
                <div v-else class="flex items-center gap-3">
                  <!-- Profile icon with dropdown -->
                  <div
                    class="relative cursor-pointer max-lg:hidden"
                    @mouseenter="showProfileMenu = true"
                    @mouseleave="showProfileMenu = false"
                  >
                    <NuxtLinkLocale to="/myaccount/profile" class="block">
                      <div
                        class="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center"
                      >
                        <i class="bi bi-person-fill text-white text-lg"></i>
                      </div>
                    </NuxtLinkLocale>

                    <!-- Profile Dropdown Menu -->
                    <div
                      v-if="showProfileMenu"
                      class="absolute left-1/2 transform -translate-x-1/2 w-80 bg-black rounded-lg shadow-lg border border-gray-700 z-50"
                    >
                      <!-- User Info Section -->
                      <div class="p-4 border-b border-gray-700">
                        <div class="flex items-center justify-between mb-2">
                          <p class="text-gray-200 font-medium">
                            {{ $t("hi") }}, {{ userData.username }}
                          </p>
                          <div class="flex flex-col items-center gap-1">
                            <span class="text-gray-400 text-xs">{{
                              $t("your_vip_tier_is")
                            }}</span>
                            <span
                              class="text-red-400 text-sm font-medium uppercase"
                              >{{ userData.viplevel }}</span
                            >
                          </div>
                        </div>

                        <!-- VIP Progress Bar -->
                        <VipProgressBar />
                      </div>

                      <!-- Menu Items -->
                      <div>
                        <!-- Cashier (expandable) -->
                        <div class="border-b border-gray-700">
                          <div
                            class="flex items-center justify-between p-3 lg:hover:bg-gray-800 cursor-pointer"
                            @click="
                              activeMenuItem =
                                activeMenuItem === 'cashier' ? null : 'cashier'
                            "
                          >
                            <div class="flex items-center gap-3">
                              <div class="text-red-400">
                                <i class="bi bi-wallet2"></i>
                              </div>
                              <span
                                class="text-gray-200 font-medium uppercase"
                                >{{ $t("cashier") }}</span
                              >
                            </div>
                            <i
                              class="bi text-gray-400"
                              :class="
                                activeMenuItem === 'cashier'
                                  ? 'bi-chevron-up'
                                  : 'bi-chevron-down'
                              "
                            ></i>
                          </div>

                          <!-- Cashier Sub Items -->
                          <div
                            v-if="activeMenuItem === 'cashier'"
                            class="border-t border-gray-700"
                          >
                            <NuxtLinkLocale
                              to="/myaccount/deposit"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("deposit") }}
                            </NuxtLinkLocale>
                            <NuxtLinkLocale
                              to="/myaccount/withdraw"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("withdraw") }}
                            </NuxtLinkLocale>
                            <NuxtLinkLocale
                              to="/myaccount/bankaccount"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("bank_account") }}
                            </NuxtLinkLocale>
                            <NuxtLinkLocale
                              to="/myaccount/rebate"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("rebate") }}
                            </NuxtLinkLocale>
                            <NuxtLinkLocale
                              to="/myaccount/rescue"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("rescue") }}
                            </NuxtLinkLocale>
                            <NuxtLinkLocale
                              to="/myaccount/checkin"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("checkin") }}
                            </NuxtLinkLocale>
                          </div>
                        </div>

                        <!-- Agent (expandable) -->
                        <div class="border-b border-gray-700">
                          <div
                            class="flex items-center justify-between p-3 lg:hover:bg-gray-800 cursor-pointer"
                            @click="
                              activeMenuItem =
                                activeMenuItem === 'agent' ? null : 'agent'
                            "
                          >
                            <div class="flex items-center gap-3">
                              <div class="text-red-400">
                                <i class="bi bi-gift"></i>
                              </div>
                              <span
                                class="text-gray-200 font-medium uppercase"
                                >{{ $t("agent") }}</span
                              >
                            </div>
                            <i
                              class="bi text-gray-400"
                              :class="
                                activeMenuItem === 'agent'
                                  ? 'bi-chevron-up'
                                  : 'bi-chevron-down'
                              "
                            ></i>
                          </div>

                          <!-- Agent Sub Items -->
                          <div
                            v-if="activeMenuItem === 'agent'"
                            class="border-t border-gray-700"
                          >
                            <NuxtLinkLocale
                              to="/myaccount/referral"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("referral") }}
                            </NuxtLinkLocale>
                            <NuxtLinkLocale
                              to="/myaccount/downline"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("downline") }}
                            </NuxtLinkLocale>
                            <NuxtLinkLocale
                              to="/myaccount/commission"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("commission") }}
                            </NuxtLinkLocale>
                            <NuxtLinkLocale
                              v-if="userData.positionTaking > 0"
                              to="/myaccount/agentpt"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("agent_pt") }}
                            </NuxtLinkLocale>
                          </div>
                        </div>

                        <!-- Profile (expandable) -->
                        <div class="border-b border-gray-700">
                          <div
                            class="flex items-center justify-between p-3 lg:hover:bg-gray-800 cursor-pointer"
                            @click="
                              activeMenuItem =
                                activeMenuItem === 'profile' ? null : 'profile'
                            "
                          >
                            <div class="flex items-center gap-3">
                              <div class="text-red-400">
                                <i class="bi bi-person"></i>
                              </div>
                              <span
                                class="text-gray-200 font-medium uppercase"
                                >{{ $t("profile") }}</span
                              >
                            </div>
                            <i
                              class="bi text-gray-400"
                              :class="
                                activeMenuItem === 'profile'
                                  ? 'bi-chevron-up'
                                  : 'bi-chevron-down'
                              "
                            ></i>
                          </div>

                          <!-- Profile Sub Items -->
                          <div
                            v-if="activeMenuItem === 'profile'"
                            class="border-t border-gray-700"
                          >
                            <NuxtLinkLocale
                              to="/myaccount/profile"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("my_profile") }}
                            </NuxtLinkLocale>
                            <NuxtLinkLocale
                              to="/myaccount/messaging"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("messaging") }}
                            </NuxtLinkLocale>
                            <NuxtLinkLocale
                              to="/myaccount/change-password"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("change_password") }}
                            </NuxtLinkLocale>
                          </div>
                        </div>

                        <!-- History (expandable) -->
                        <div class="border-b border-gray-700">
                          <div
                            class="flex items-center justify-between p-3 lg:hover:bg-gray-800 cursor-pointer"
                            @click="
                              activeMenuItem =
                                activeMenuItem === 'history' ? null : 'history'
                            "
                          >
                            <div class="flex items-center gap-3">
                              <div class="text-red-400">
                                <i class="bi bi-file-earmark-text"></i>
                              </div>
                              <span
                                class="text-gray-200 font-medium uppercase"
                                >{{ $t("history") }}</span
                              >
                            </div>
                            <i
                              class="bi text-gray-400"
                              :class="
                                activeMenuItem === 'history'
                                  ? 'bi-chevron-up'
                                  : 'bi-chevron-down'
                              "
                            ></i>
                          </div>

                          <!-- History Sub Items -->
                          <div
                            v-if="activeMenuItem === 'history'"
                            class="border-t border-gray-700"
                          >
                            <NuxtLinkLocale
                              to="/myaccount/transaction-history"
                              class="pl-10 block py-3 px-2 text-gray-300 lg:hover:bg-gray-800 lg:hover:text-red-400"
                            >
                              {{ $t("transaction_history") }}
                            </NuxtLinkLocale>
                          </div>
                        </div>

                        <!-- Logout -->
                        <div class="px-4 py-3">
                          <button
                            @click="handleLogout"
                            class="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-900/50 text-red-400 lg:hover:bg-red-800/50 border border-red-700/50 transition-colors"
                          >
                            <i class="bi bi-box-arrow-right"></i>
                            <span class="font-medium">{{ $t("logout") }}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- Message Icon -->
                  <NuxtLinkLocale to="/myaccount/messaging" class="relative">
                    <div
                      class="w-9 h-9 bg-red-600 rounded-full flex items-center justify-center"
                    >
                      <i class="bi bi-envelope-fill text-white text-lg"></i>
                    </div>
                    <span
                      v-if="unreadCount > 0"
                      class="absolute -top-1 -right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] font-bold rounded-full px-1.5 min-w-[16px] h-[16px] flex items-center justify-center shadow-lg animate-pulse"
                    >
                      {{ unreadCount }}
                    </span>
                  </NuxtLinkLocale>
                  <!-- Balance -->
                  <div
                    @mouseenter="showBalanceDropdown = true"
                    @mouseleave="showBalanceDropdown = false"
                    class="relative max-lg:hidden"
                  >
                    <div class="cursor-pointer">
                      <span class="text-xs text-gray-400">{{
                        $t("main_wallet")
                      }}</span>
                      <div class="flex gap-2">
                        <span class="text-red-400"
                          >MYR {{ userData.wallet.toFixed(2) }}</span
                        >
                        <i
                          class="bi bi-caret-down-fill text-xs ml-0.5 text-red-300"
                        ></i>
                      </div>
                    </div>

                    <GameBalanceDropdown v-if="showBalanceDropdown" />
                  </div>
                </div>
              </div>

              <!-- Language Selector -->
              <div
                class="relative hidden lg:flex"
                @mouseenter="showLanguageMenu = true"
                @mouseleave="showLanguageMenu = false"
              >
                <button
                  class="flex items-center gap-1 text-gray-300 p-1.5 lg:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <img
                    :src="
                      languageOptions.find((lang) => lang.code === locale).flag
                    "
                    :alt="
                      languageOptions.find((lang) => lang.code === locale).name
                    "
                    class="w-5 h-5 rounded-full object-cover"
                  />
                </button>

                <div
                  v-if="showLanguageMenu"
                  class="absolute right-0 top-full bg-black rounded-xl shadow-xl border border-gray-700 overflow-hidden z-50 w-44 transition-all duration-200"
                >
                  <div
                    class="absolute -top-1 right-0 w-full h-1 bg-transparent"
                  ></div>

                  <div class="py-1">
                    <button
                      v-for="lang in languageOptions"
                      :key="lang.code"
                      @click="changeLocale(lang.code)"
                      class="w-full text-left px-4 py-3 text-sm lg:hover:bg-gray-800 flex items-center gap-3 transition-all duration-200 group"
                      :class="
                        locale === lang.code
                          ? 'text-red-400 font-semibold bg-gray-800'
                          : 'text-gray-300 lg:hover:text-red-400'
                      "
                    >
                      <div class="relative">
                        <img
                          :src="lang.flag"
                          :alt="lang.name"
                          class="w-6 h-6 rounded-full object-cover shadow-sm border-2 lg:group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>

                      <span class="flex-1">{{ lang.name }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Main Menu Button -->
              <div
                class="relative hidden lg:flex"
                @mouseenter="showMainMenu = true"
                @mouseleave="showMainMenu = false"
              >
                <button
                  class="p-1.5 text-gray-300 lg:hover:bg-gray-800 rounded-full"
                >
                  <i class="bi bi-grid text-lg"></i>
                </button>

                <!-- Dropdown Menu -->
                <div
                  v-if="showMainMenu"
                  class="absolute right-0 top-full bg-black rounded-xl shadow-xl border border-gray-700 overflow-hidden z-50 w-72"
                >
                  <!-- Invisible bridge to prevent gap issues -->
                  <div
                    class="absolute -top-2 right-0 w-full h-2 bg-transparent"
                  ></div>

                  <!-- Menu Items -->
                  <div class="">
                    <div class="space-y-2">
                      <!-- Promotions -->
                      <NuxtLinkLocale
                        to="/promotions"
                        class="xl:hidden group flex items-center gap-4 p-4 rounded-xl lg:hover:bg-gray-800 transition-all duration-200 border border-transparent lg:hover:border-red-400/20 lg:hover:shadow-sm"
                        @click="showMainMenu = false"
                      >
                        <div
                          class="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-600 flex-shrink-0"
                        >
                          <NuxtImg
                            src="/images/newicon/promotion.png"
                            class="w-7 h-7 object-contain"
                            alt="Promotions"
                          />
                        </div>
                        <div class="flex-1">
                          <span
                            class="text-sm font-semibold text-gray-200 lg:group-hover:text-red-400 transition-colors block"
                          >
                            {{ $t("promotions") }}
                          </span>
                          <p class="text-xs text-gray-400 mt-1">
                            Special offers and bonuses
                          </p>
                        </div>
                        <i
                          class="bi bi-chevron-right text-gray-400 lg:group-hover:text-red-400 transition-colors"
                        ></i>
                      </NuxtLinkLocale>

                      <!-- VIP -->
                      <NuxtLinkLocale
                        to="/vip"
                        class="xl:hidden group flex items-center gap-4 p-4 rounded-xl lg:hover:bg-gray-800 transition-all duration-200 border border-transparent lg:hover:border-red-400/20 lg:hover:shadow-sm"
                        @click="showMainMenu = false"
                      >
                        <div
                          class="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-600 flex-shrink-0"
                        >
                          <NuxtImg
                            src="/images/newicon/vip.png"
                            class="w-7 h-7 object-contain"
                            alt="VIP"
                          />
                        </div>
                        <div class="flex-1">
                          <span
                            class="text-sm font-semibold text-gray-200 lg:group-hover:text-red-400 transition-colors block"
                          >
                            {{ $t("vip") }}
                          </span>
                          <p class="text-xs text-gray-400 mt-1">
                            Exclusive member benefits
                          </p>
                        </div>
                        <i
                          class="bi bi-chevron-right text-gray-400 lg:group-hover:text-red-400 transition-colors"
                        ></i>
                      </NuxtLinkLocale>

                      <!-- Refer Friends -->
                      <NuxtLinkLocale
                        to="/myaccount/referral"
                        class="group flex items-center gap-4 p-4 rounded-xl lg:hover:bg-gray-800 transition-all duration-200 border border-transparent lg:hover:border-red-400/20 lg:hover:shadow-sm"
                        @click="showMainMenu = false"
                      >
                        <div
                          class="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-600 flex-shrink-0"
                        >
                          <NuxtImg
                            src="/images/newicon/referral.png"
                            class="w-7 h-7 object-contain"
                            alt="Referral"
                          />
                        </div>
                        <div class="flex-1">
                          <span
                            class="text-sm font-semibold text-gray-200 lg:group-hover:text-red-400 transition-colors block"
                          >
                            {{ $t("refer_a_friend") }}
                          </span>
                          <p class="text-xs text-gray-400 mt-1">
                            Earn rewards for referrals
                          </p>
                        </div>
                        <i
                          class="bi bi-chevron-right text-gray-400 lg:group-hover:text-red-400 transition-colors"
                        ></i>
                      </NuxtLinkLocale>

                      <!-- Lucky Draw -->
                      <NuxtLinkLocale
                        to="/luckydraw"
                        class="group flex items-center gap-4 p-4 rounded-xl lg:hover:bg-gray-800 transition-all duration-200 border border-transparent lg:hover:border-red-400/20 lg:hover:shadow-sm"
                        @click="showMainMenu = false"
                      >
                        <div
                          class="w-11 h-11 bg-gray-800 rounded-xl flex items-center justify-center border border-gray-600 flex-shrink-0"
                        >
                          <NuxtImg
                            src="/images/newicon/dice.png"
                            class="w-7 h-7 object-contain"
                            alt="Lucky Draw"
                          />
                        </div>
                        <div class="flex-1">
                          <span
                            class="text-sm font-semibold text-gray-200 lg:group-hover:text-red-400 transition-colors block"
                          >
                            {{ $t("lucky_draw") }}
                          </span>
                          <p class="text-xs text-gray-400 mt-1">
                            Try your luck and win prizes
                          </p>
                        </div>
                        <i
                          class="bi bi-chevron-right text-gray-400 lg:group-hover:text-red-400 transition-colors"
                        ></i>
                      </NuxtLinkLocale>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Full Width Game Dropdowns -->
        <template v-for="item in HeaderNav" :key="`dropdown-${item.name}`">
          <div
            v-show="activeDropdown === item.name"
            class="absolute left-0 w-full bg-black/95 py-8 z-40 mega-dropdown"
            style="top: 100%"
            @mouseenter="activeDropdown = item.name"
            @mouseleave="activeDropdown = null"
          >
            <div class="max-w-[1100px] mx-auto px-4">
              <div class="flex justify-between items-center mb-2">
                <h2 class="text-xl font-bold text-white">{{ item.label }}</h2>
                <NuxtLinkLocale
                  :to="`${item.link}`"
                  class="text-sm text-gray-300 lg:hover:text-red-400 flex items-center gap-1"
                >
                  {{ $t("view_all") }}
                  <i class="bi bi-arrow-right"></i>
                </NuxtLinkLocale>
              </div>

              <!-- Sports Games -->
              <div
                v-if="item.name === 'Sports'"
                class="grid grid-cols-7 max-xl:grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2"
              >
                <template v-for="game in sportsKiosks" :key="game._id">
                  <div class="cursor-pointer">
                    <div
                      class="relative overflow-hidden rounded-lg transition-transform group lg:hover:scale-105 w-36"
                      @click="launchGame(game)"
                    >
                      <div
                        class="flex flex-col pt-5 items-center justify-center"
                      >
                        <img
                          :src="game.icon || fallback(game.name)"
                          :alt="game.name"
                          class="w-full h-full object-contain z-10 drop-shadow-md"
                        />
                        <div
                          class="bg-black/70 text-white text-center py-2 px-2 z-50 w-full rounded-full"
                        >
                          <p class="text-xs font-medium truncate">
                            {{ game.name }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <!-- E-Sports Games -->
              <div
                v-if="item.name === 'E-Sports'"
                class="grid grid-cols-7 max-xl:grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2"
              >
                <template v-for="game in esportsKiosks" :key="game._id">
                  <div class="cursor-pointer">
                    <div
                      class="relative overflow-hidden rounded-lg transition-transform group lg:hover:scale-105 w-36"
                      @click="launchGame(game)"
                    >
                      <div
                        class="flex flex-col pt-5 items-center justify-center"
                      >
                        <img
                          :src="game.icon || fallback(game.name)"
                          :alt="game.name"
                          class="w-full h-full object-contain z-10 drop-shadow-md"
                        />
                        <div
                          class="bg-black/70 text-white text-center py-2 px-2 z-50 w-full rounded-full"
                        >
                          <p class="text-xs font-medium truncate">
                            {{ game.name }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <!-- Casino Games -->
              <div
                v-if="item.name === 'Casino'"
                class="grid grid-cols-7 max-xl:grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2"
              >
                <template v-for="game in liveCasinoKiosks" :key="game._id">
                  <div class="cursor-pointer">
                    <div
                      class="relative overflow-hidden rounded-lg transition-transform group lg:hover:scale-105 w-36"
                      @click="launchGame(game)"
                    >
                      <div
                        class="flex flex-col pt-5 items-center justify-center"
                      >
                        <img
                          :src="game.icon || fallback(game.name)"
                          :alt="game.name"
                          class="w-full h-full object-contain z-10 drop-shadow-md"
                        />
                        <div
                          class="bg-black/70 text-white text-center py-2 px-2 z-50 w-full rounded-full"
                        >
                          <p class="text-xs font-medium truncate">
                            {{ game.name }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <!-- Slots Games -->
              <div
                v-if="item.name === 'Slots'"
                class="grid grid-cols-7 max-xl:grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2"
              >
                <template v-for="(game, index) in slotKiosks" :key="game._id">
                  <div v-if="index < 13" class="cursor-pointer">
                    <div
                      class="relative overflow-hidden rounded-lg transition-transform group lg:hover:scale-105 w-36"
                      @click="launchGame(game)"
                    >
                      <div
                        class="flex flex-col pt-5 items-center justify-center"
                      >
                        <img
                          :src="game.icon || fallback(game.name)"
                          :alt="game.name"
                          class="w-full h-full object-contain z-10 drop-shadow-md"
                        />
                        <div
                          class="bg-black/70 text-white text-center py-2 px-2 z-50 w-full rounded-full"
                        >
                          <p class="text-xs font-medium truncate">
                            {{ game.name }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <!-- View More Button -->
                <div v-if="slotKiosks.length > 13" class="cursor-pointer">
                  <NuxtLinkLocale
                    :to="HeaderNav.find((nav) => nav.name === 'Slots').link"
                    @click="activeDropdown = null"
                    class="relative overflow-hidden rounded-lg transition-transform group lg:hover:scale-105 w-36 h-full"
                  >
                    <div
                      class="flex flex-col pt-5 items-center justify-center h-full min-h-[120px]"
                    >
                      <div
                        class="w-full h-full bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex flex-col items-center justify-center"
                      >
                        <i
                          class="bi bi-plus-circle text-white text-3xl mb-2"
                        ></i>
                        <span class="text-white text-sm font-semibold">{{
                          $t("view_more")
                        }}</span>
                        <span class="text-white/80 text-xs"
                          >+{{ slotKiosks.length - 13 }} {{ $t("games") }}</span
                        >
                      </div>
                    </div>
                  </NuxtLinkLocale>
                </div>
              </div>

              <!-- Fishing Games -->
              <div
                v-if="item.name === 'Fishing'"
                class="grid grid-cols-7 max-xl:grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2"
              >
                <template v-for="game in fishingKiosks" :key="game._id">
                  <div class="cursor-pointer">
                    <div
                      class="relative overflow-hidden rounded-lg transition-transform group lg:hover:scale-105 w-36"
                      @click="launchGame(game)"
                    >
                      <div
                        class="flex flex-col pt-5 items-center justify-center"
                      >
                        <img
                          :src="game.icon || fallback(game.name)"
                          :alt="game.name"
                          class="w-full h-full object-contain z-10 drop-shadow-md"
                        />
                        <div
                          class="bg-black/70 text-white text-center py-2 px-2 z-50 w-full rounded-full"
                        >
                          <p class="text-xs font-medium truncate">
                            {{ game.name }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>

              <!-- Lottery Games -->
              <div
                v-if="item.name === 'Lottery'"
                class="grid grid-cols-7 max-xl:grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2"
              >
                <template v-for="game in lotteryKiosks" :key="game._id">
                  <div class="cursor-pointer">
                    <div
                      class="relative overflow-hidden rounded-lg transition-transform group lg:hover:scale-105 w-36"
                      @click="launchGame(game)"
                    >
                      <div
                        class="flex flex-col pt-5 items-center justify-center"
                      >
                        <img
                          :src="game.icon || fallback(game.name)"
                          :alt="game.name"
                          class="w-full h-full object-contain z-10 drop-shadow-md"
                        />
                        <div
                          class="bg-black/70 text-white text-center py-2 px-2 z-50 w-full rounded-full"
                        >
                          <p class="text-xs font-medium truncate">
                            {{ game.name }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </template>
      </header>

      <!-- Mobile Menu Slide-in Panel -->
      <div
        class="fixed inset-0 z-50 lg:hidden transition-opacity duration-300"
        :class="
          mobileMenuOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        "
      >
        <!-- Backdrop with fade effect -->
        <div
          class="absolute inset-0 bg-black/40 transition-opacity duration-300"
          :class="mobileMenuOpen ? 'opacity-100' : 'opacity-0'"
          @click="closeMobileMenu"
        ></div>

        <!-- Menu Content with slide animation -->
        <div
          class="fixed inset-0 z-50 lg:hidden transition-opacity duration-300"
          :class="
            mobileMenuOpen
              ? 'pointer-events-auto opacity-100'
              : 'pointer-events-none opacity-0'
          "
        >
          <!-- Backdrop -->
          <div
            class="absolute inset-0 bg-black/40 transition-opacity duration-300"
            :class="mobileMenuOpen ? 'opacity-100' : 'opacity-0'"
            @click="closeMobileMenu"
          ></div>

          <!-- Slide-in Panel (Flex Column + Sticky Footer) -->
          <div
            class="fixed inset-0 z-50 lg:hidden transition-opacity duration-300"
            :class="
              mobileMenuOpen
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
            "
          >
            <!-- Backdrop -->
            <div
              class="absolute inset-0 bg-black/40 transition-opacity duration-300"
              :class="mobileMenuOpen ? 'opacity-100' : 'opacity-0'"
              @click="closeMobileMenu"
            ></div>

            <!-- Slide-in Panel (Flex Column + Sticky Footer) -->
            <div
              class="h-screen w-[280px] max-w-[85%] bg-[#1A0D13] shadow-xl overflow-hidden flex flex-col transition-transform duration-300 ease-out transform"
              :class="mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
              style="overflow-x: hidden"
            >
              <!-- Header -->
              <div class="bg-red-600 p-4">
                <div class="flex justify-between items-center">
                  <img src="/images/egm8my.png" alt="Logo" class="h-7" />
                  <div class="flex items-center gap-2">
                    <!-- Language Button -->
                    <div class="relative language-dropdown">
                      <button
                        @click.stop="showLanguageMenu = !showLanguageMenu"
                        class="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white"
                      >
                        <img
                          :src="
                            languageOptions.find((lang) => lang.code === locale)
                              .flag
                          "
                          :alt="
                            languageOptions.find((lang) => lang.code === locale)
                              .name
                          "
                          class="w-5 h-5 rounded-full object-cover"
                        />
                      </button>
                      <!-- Dropdown Menu -->
                      <div v-if="showLanguageMenu" class="relative z-[999]">
                        <div
                          class="lg:hidden fixed flex items-center justify-center inset-0 bg-black bg-opacity-20 z-40"
                          @click="showLanguageMenu = false"
                        ></div>
                        <div
                          class="absolute right-0 mt-2 bg-black border border-gray-700 rounded-lg shadow-md z-50 py-1 w-32"
                        >
                          <button
                            v-for="lang in languageOptions"
                            :key="lang.code"
                            @click.stop="
                              changeLocale(lang.code);
                              showLanguageMenu = false;
                            "
                            class="flex items-center gap-2 w-full px-3 py-2 lg:hover:bg-gray-800 text-left"
                            :class="
                              locale === lang.code
                                ? 'bg-gray-800 text-red-400 font-medium'
                                : 'text-gray-300'
                            "
                          >
                            <img
                              :src="lang.flag"
                              :alt="lang.name"
                              class="w-5 h-5 rounded-full object-cover"
                            />
                            {{ lang.name }}
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- Close Button -->
                    <button
                      @click="closeMobileMenu"
                      class="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 text-white"
                    >
                      <i class="bi bi-x text-lg"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Scrollable Content -->
              <div
                class="flex-1 overflow-y-auto pb-4"
                style="overflow-x: hidden"
              >
                <!-- Login / Register (KEEPING YOUR ORIGINAL BLOCK) -->
                <div v-if="!userData" class="px-4 pt-3 flex gap-3">
                  <NuxtLinkLocale
                    to="/login"
                    @click="closeMobileMenu"
                    class="flex-1 py-2 text-center border border-gray-600 rounded-lg text-gray-300 font-medium mobileMenuText"
                  >
                    {{ $t("log_in") }}
                  </NuxtLinkLocale>
                  <NuxtLinkLocale
                    to="/register"
                    @click="closeMobileMenu"
                    class="flex-1 py-2 text-center bg-red-600 rounded-lg text-white font-medium mobileMenuText"
                  >
                    {{ $t("register") }}
                  </NuxtLinkLocale>
                </div>

                <!-- User Account Info (if logged in) -->
                <div
                  v-if="isUserLoggedIn"
                  class="px-4 py-3 bg-black border-b border-gray-700"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <div
                        class="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center"
                      >
                        <i class="bi bi-person text-red-600"></i>
                      </div>
                      <div>
                        <p class="text-sm font-medium text-gray-200">
                          {{ userData?.username || "User" }}
                        </p>
                        <p class="text-xs text-gray-400">
                          {{ userData?.viplevel || "Standard" }}
                        </p>
                      </div>
                    </div>
                    <div class="text-sm text-red-400 font-medium">
                      <div
                        @click="showBalanceDropdown = !showBalanceDropdown"
                        class="flex items-center gap-1 cursor-pointer"
                      >
                        <span
                          >MYR
                          {{ userData?.wallet?.toFixed(2) || "0.00" }}</span
                        >
                        <i
                          class="bi bi-caret-down-fill text-xs ml-0.5 text-red-300"
                        ></i>
                      </div>
                      <GameBalanceDropdown
                        v-if="showBalanceDropdown"
                        @close="showBalanceDropdown = false"
                      />
                    </div>
                  </div>
                </div>

                <!-- Tabs -->
                <div v-if="isUserLoggedIn" class="px-4 pt-2 pb-1">
                  <div class="bg-gray-800 p-1 rounded-xl flex shadow-sm">
                    <button
                      @click="mobileTab = 'games'"
                      class="relative flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
                      :class="
                        mobileTab === 'games' ? 'text-red-400' : 'text-gray-400'
                      "
                    >
                      <div
                        v-if="mobileTab === 'games'"
                        class="absolute inset-0 bg-[#1A0D13] rounded-lg shadow-sm transition-all duration-300"
                      ></div>

                      <div
                        class="relative flex items-center justify-center gap-1.5 z-10"
                      >
                        <i class="bi bi-controller text-lg"></i>
                        <span>{{ $t("games") }}</span>
                      </div>
                    </button>

                    <button
                      @click="mobileTab = 'account'"
                      class="relative flex-1 flex items-center justify-center py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
                      :class="
                        mobileTab === 'account'
                          ? 'text-red-400'
                          : 'text-gray-400'
                      "
                    >
                      <div
                        v-if="mobileTab === 'account'"
                        class="absolute inset-0 bg-[#1A0D13] rounded-lg shadow-sm transition-all duration-300"
                      ></div>
                      <div
                        class="relative flex items-center justify-center gap-1.5 z-10"
                      >
                        <i class="bi bi-person text-lg"></i>
                        <span>{{ $t("account") }}</span>
                      </div>
                    </button>
                  </div>
                </div>

                <!-- Games Tab Content -->
                <div v-if="mobileTab === 'games'" class="px-4 pt-3">
                  <!-- Game Categories -->
                  <div class="grid grid-cols-2 gap-3">
                    <NuxtLinkLocale
                      v-for="item in HeaderNav"
                      :key="item.name"
                      :to="item.link"
                      @click="closeMobileMenu"
                      class="group flex flex-col items-center p-3 bg-gray-800 rounded-xl border border-gray-700"
                    >
                      <div
                        class="w-11 h-11 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center mb-2"
                      >
                        <NuxtImg
                          :src="item.icon"
                          :alt="item.name"
                          class="w-7 h-7 object-contain"
                        />
                      </div>
                      <span
                        class="text-sm font-medium text-gray-200 text-center"
                      >
                        {{ item.label }}
                      </span>
                    </NuxtLinkLocale>
                  </div>

                  <!-- Premium Features -->
                  <div
                    class="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-gray-700"
                  >
                    <NuxtLinkLocale
                      to="/promotions"
                      @click="closeMobileMenu"
                      class="group flex flex-col items-center p-3 bg-gradient-to-br from-red-900/30 to-red-800/30 rounded-xl border border-red-700/30"
                    >
                      <div
                        class="w-11 h-11 bg-black rounded-xl flex items-center justify-center mb-2"
                      >
                        <NuxtImg
                          src="/images/newicon/promotion.png"
                          class="w-7 h-7 object-contain"
                          alt="Promotions"
                        />
                      </div>
                      <span
                        class="text-sm font-medium text-red-300 text-center"
                      >
                        {{ $t("promotions") }}
                      </span>
                    </NuxtLinkLocale>

                    <NuxtLinkLocale
                      to="/vip"
                      @click="closeMobileMenu"
                      class="group flex flex-col items-center p-3 bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 rounded-xl border border-yellow-700/30"
                    >
                      <div
                        class="w-11 h-11 bg-black rounded-xl flex items-center justify-center mb-2"
                      >
                        <NuxtImg
                          src="/images/newicon/vip.png"
                          class="w-7 h-7 object-contain"
                          alt="VIP"
                        />
                      </div>
                      <span
                        class="text-sm font-medium text-yellow-300 text-center"
                      >
                        {{ $t("vip") }}
                      </span>
                    </NuxtLinkLocale>
                  </div>

                  <div
                    v-if="isUserLoggedIn"
                    class="py-4 bg-[#1A0D13] border-gray-700 flex justify-center"
                  >
                    <button
                      @click="handleLogout"
                      class="w-full py-2 rounded-lg bg-red-900/30 text-red-400 border border-red-700/30 flex items-center justify-center gap-2"
                    >
                      <i class="bi bi-box-arrow-right"></i>
                      <span class="font-medium text-sm">{{
                        $t("logout")
                      }}</span>
                    </button>
                  </div>
                </div>

                <!-- Account Tab Content -->
                <div v-if="mobileTab === 'account'" class="px-4 pt-3">
                  <!-- Cashier Section -->
                  <div class="mb-3">
                    <div
                      @click="
                        mobileActiveSubmenu =
                          mobileActiveSubmenu === 'cashier' ? null : 'cashier'
                      "
                      class="p-3 bg-gray-800 rounded-xl border border-gray-700 shadow-sm cursor-pointer transition-all duration-200"
                      :class="{
                        'border-red-400/30 bg-gray-800':
                          mobileActiveSubmenu === 'cashier',
                      }"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-10 h-10 bg-red-900/30 rounded-xl flex items-center justify-center"
                          >
                            <i class="bi bi-wallet text-red-400"></i>
                          </div>
                          <span class="text-sm font-semibold text-gray-200">
                            {{ $t("cashier") }}
                          </span>
                        </div>
                        <i
                          class="bi text-gray-400 transition-transform duration-300"
                          :class="
                            mobileActiveSubmenu === 'cashier'
                              ? 'bi-chevron-up rotate-270'
                              : 'bi-chevron-down rotate-0'
                          "
                        ></i>
                      </div>
                    </div>

                    <Transition
                      enter-active-class="transition-all duration-300 ease-out"
                      enter-from-class="opacity-0 transform -translate-y-2 scale-95"
                      enter-to-class="opacity-100 transform translate-y-0 scale-100"
                      leave-active-class="transition-all duration-200 ease-in"
                      leave-from-class="opacity-100 transform translate-y-0 scale-100"
                      leave-to-class="opacity-0 transform -translate-y-2 scale-95"
                    >
                      <div
                        v-if="mobileActiveSubmenu === 'cashier'"
                        class="mt-2 bg-gray-800 rounded-xl border border-red-400/20 shadow-sm p-2 origin-top"
                      >
                        <NuxtLinkLocale
                          to="/myaccount/deposit"
                          @click="closeMobileMenu"
                          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                        >
                          <i class="bi bi-arrow-down-circle text-red-400"></i>
                          <span class="text-gray-300 text-sm">{{
                            $t("deposit")
                          }}</span>
                        </NuxtLinkLocale>

                        <NuxtLinkLocale
                          to="/myaccount/withdraw"
                          @click="closeMobileMenu"
                          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                        >
                          <i class="bi bi-arrow-up-circle text-red-400"></i>
                          <span class="text-gray-300 text-sm">{{
                            $t("withdraw")
                          }}</span>
                        </NuxtLinkLocale>

                        <NuxtLinkLocale
                          to="/myaccount/rescue"
                          @click="closeMobileMenu"
                          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                        >
                          <i class="bi bi-heart-pulse text-red-400"></i>
                          <span class="text-gray-300 text-sm">{{
                            $t("rescue")
                          }}</span>
                        </NuxtLinkLocale>

                        <NuxtLinkLocale
                          to="/myaccount/checkin"
                          @click="closeMobileMenu"
                          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                        >
                          <i class="bi bi-calendar-check text-red-400"></i>
                          <span class="text-gray-300 text-sm">{{
                            $t("checkin")
                          }}</span>
                        </NuxtLinkLocale>

                        <NuxtLinkLocale
                          to="/luckydraw"
                          @click="closeMobileMenu"
                          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                        >
                          <i class="bi bi-dice-5 text-red-400"></i>
                          <span class="text-gray-300 text-sm">{{
                            $t("lucky_draw")
                          }}</span>
                        </NuxtLinkLocale>

                        <NuxtLinkLocale
                          to="/myaccount/bankaccount"
                          @click="closeMobileMenu"
                          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                        >
                          <i class="bi bi-bank text-red-400"></i>
                          <span class="text-gray-300 text-sm">{{
                            $t("bank_account")
                          }}</span>
                        </NuxtLinkLocale>
                      </div>
                    </Transition>
                  </div>

                  <!-- Agent Section with Smooth Transitions -->
                  <div class="mb-3">
                    <div
                      @click="
                        mobileActiveSubmenu =
                          mobileActiveSubmenu === 'agent' ? null : 'agent'
                      "
                      class="p-3 bg-gray-800 rounded-xl border border-gray-700 shadow-sm cursor-pointer transition-all duration-200"
                      :class="{
                        'border-green-400/30 bg-gray-800':
                          mobileActiveSubmenu === 'agent',
                      }"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-3">
                          <div
                            class="w-10 h-10 bg-green-900/30 rounded-xl flex items-center justify-center"
                          >
                            <i class="bi bi-people text-green-400"></i>
                          </div>
                          <span class="text-sm font-semibold text-gray-200">
                            {{ $t("agent") }}
                          </span>
                        </div>
                        <i
                          class="bi text-gray-400 transition-transform duration-300"
                          :class="
                            mobileActiveSubmenu === 'agent'
                              ? 'bi-chevron-up rotate-270'
                              : 'bi-chevron-down rotate-0'
                          "
                        ></i>
                      </div>
                    </div>

                    <Transition
                      enter-active-class="transition-all duration-300 ease-out"
                      enter-from-class="opacity-0 transform -translate-y-2 scale-95"
                      enter-to-class="opacity-100 transform translate-y-0 scale-100"
                      leave-active-class="transition-all duration-200 ease-in"
                      leave-from-class="opacity-100 transform translate-y-0 scale-100"
                      leave-to-class="opacity-0 transform -translate-y-2 scale-95"
                    >
                      <div
                        v-if="mobileActiveSubmenu === 'agent'"
                        class="mt-2 bg-gray-800 rounded-xl border border-green-400/20 shadow-sm p-2 origin-top"
                      >
                        <NuxtLinkLocale
                          to="/myaccount/referral"
                          @click="closeMobileMenu"
                          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                        >
                          <i class="bi bi-share-fill text-green-400"></i>
                          <span class="text-gray-300 text-sm">{{
                            $t("referral")
                          }}</span>
                        </NuxtLinkLocale>

                        <NuxtLinkLocale
                          to="/myaccount/downline"
                          @click="closeMobileMenu"
                          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                        >
                          <i class="bi bi-diagram-3 text-green-400"></i>
                          <span class="text-gray-300 text-sm">{{
                            $t("downline")
                          }}</span>
                        </NuxtLinkLocale>

                        <NuxtLinkLocale
                          to="/myaccount/commission"
                          @click="closeMobileMenu"
                          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                        >
                          <i class="bi bi-currency-dollar text-green-400"></i>
                          <span class="text-gray-300 text-sm">{{
                            $t("commission")
                          }}</span>
                        </NuxtLinkLocale>

                        <NuxtLinkLocale
                          v-if="userData?.positionTaking > 0"
                          to="/myaccount/agentpt"
                          @click="closeMobileMenu"
                          class="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors"
                        >
                          <i class="bi bi-graph-up text-green-400"></i>
                          <span class="text-gray-300 text-sm">{{
                            $t("agent_pt")
                          }}</span>
                        </NuxtLinkLocale>
                      </div>
                    </Transition>
                  </div>

                  <div
                    v-if="isUserLoggedIn"
                    class="pb-4 pt-1 bg-[#1A0D13] border-gray-700 flex justify-center"
                  >
                    <button
                      @click="handleLogout"
                      class="w-full py-2 rounded-lg bg-red-900/30 text-red-400 border border-red-700/30 transition-colors flex items-center justify-center gap-2"
                    >
                      <i class="bi bi-box-arrow-right"></i>
                      <span class="font-medium text-sm">{{
                        $t("logout")
                      }}</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Sticky Footer (outside the scrollable area) -->
              <div
                class="px-2 py-2 flex justify-center border-t border-gray-700 bg-gray-800 max-lg:h-[120px]"
              >
                <div class="grid grid-cols-5">
                  <NuxtLinkLocale
                    to="/license"
                    @click="closeMobileMenu"
                    class="flex flex-col items-center p-2 lg:hover:bg-gray-700 rounded-lg transition-colors group"
                  >
                    <div
                      class="w-6 h-6 bg-purple-900/30 rounded-lg flex items-center justify-center mb-1 lg:group-hover:bg-purple-800/30 transition-colors"
                    >
                      <i class="bi bi-shield-check text-purple-400 text-xs"></i>
                    </div>
                    <span
                      class="text-[9px] font-medium text-gray-300 text-center"
                    >
                      {{ $t("license") }}
                    </span>
                  </NuxtLinkLocale>

                  <NuxtLinkLocale
                    to="/termscondition"
                    @click="closeMobileMenu"
                    class="flex flex-col items-center p-2 lg:hover:bg-gray-700 rounded-lg transition-colors group"
                  >
                    <div
                      class="w-6 h-6 bg-blue-900/30 rounded-lg flex items-center justify-center mb-1 lg:group-hover:bg-blue-800/30 transition-colors"
                    >
                      <i class="bi bi-file-text text-blue-400 text-xs"></i>
                    </div>
                    <span
                      class="text-[9px] font-medium text-gray-300 text-center"
                    >
                      {{ $t("terms") }}
                    </span>
                  </NuxtLinkLocale>

                  <NuxtLinkLocale
                    to="/responsible"
                    @click="closeMobileMenu"
                    class="flex flex-col items-center p-2 lg:hover:bg-gray-700 rounded-lg transition-colors group"
                  >
                    <div
                      class="w-6 h-6 bg-green-900/30 rounded-lg flex items-center justify-center mb-1 lg:group-hover:bg-green-800/30 transition-colors"
                    >
                      <i class="bi bi-heart-pulse text-green-400 text-xs"></i>
                    </div>
                    <span
                      class="text-[9px] font-medium text-gray-300 text-center"
                    >
                      {{ $t("gaming") }}
                    </span>
                  </NuxtLinkLocale>

                  <NuxtLinkLocale
                    to="/helpcenter"
                    @click="closeMobileMenu"
                    class="flex flex-col items-center p-2 lg:hover:bg-gray-700 rounded-lg transition-colors group"
                  >
                    <div
                      class="w-6 h-6 bg-red-900/30 rounded-lg flex items-center justify-center mb-1 lg:group-hover:bg-red-800/30 transition-colors"
                    >
                      <i class="bi bi-question-circle text-red-400 text-xs"></i>
                    </div>
                    <span
                      class="text-[9px] font-medium text-gray-300 text-center"
                    >
                      {{ $t("help") }}
                    </span>
                  </NuxtLinkLocale>

                  <NuxtLinkLocale
                    to="/faq"
                    @click="closeMobileMenu"
                    class="flex flex-col items-center p-2 lg:hover:bg-gray-700 rounded-lg transition-colors group"
                  >
                    <div
                      class="w-6 h-6 bg-indigo-900/30 rounded-lg flex items-center justify-center mb-1 lg:group-hover:bg-indigo-800/30 transition-colors"
                    >
                      <i class="bi bi-chat-dots text-indigo-400 text-xs"></i>
                    </div>
                    <span
                      class="text-[9px] font-medium text-gray-300 text-center"
                    >
                      {{ $t("faq") }}
                    </span>
                  </NuxtLinkLocale>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
const router = useRouter();

const showBalanceDropdown = ref(false);
const { post, get } = useApiEndpoint();
const { launchGame, alertVisible, alertTitle, alertMessage, alertType } =
  useGameLauncher();
const unreadCount = useState("unreadCount");
const generalSetting = useState("generalSetting");
const liveCasinoKiosks = useState("liveCasinoKiosks");
const slotKiosks = useState("slotKiosks");
const sportsKiosks = useState("sportsKiosks");
const esportsKiosks = useState("esportsKiosks");
const fishingKiosks = useState("fishingKiosks");
const lotteryKiosks = useState("lotteryKiosks");
const isUserLoggedIn = useState("isUserLoggedIn");
const localePath = useLocalePath();
const isLogoutSuccess = ref(false);
const isConfirmAlertVisible = ref(false);
const confirmAlertTitle = ref("");
const confirmAlertMessage = ref("");
const confirmAlertType = ref("warning");
const activeMenuItem = ref("profile");
const showProfileMenu = ref(false);
const userData = useState("userData");
const mobileMenuOpen = ref(false);
const activeDropdown = ref(null);
const mobileActiveSubmenu = ref(null);
const showMainMenu = ref(false);
const showLanguageMenu = ref(false);
const mobileTab = ref("games");
const { locale, setLocale, availableLocales, t } = useI18n();
const i18nCookie = useCookie("i18n_redirected", {
  maxAge: 365 * 24 * 60 * 60,
});
const languageOptions = [
  { name: "English", flag: "/images/flags/England.svg", code: "en" },
  { name: "Malay", flag: "/images/flags/Malaysia.svg", code: "ms" },
  { name: "中文", flag: "/images/flags/China.svg", code: "zh" },
];

const changeLocale = async (lang) => {
  await setLocale(lang);
  i18nCookie.value = lang;
  showLanguageMenu.value = false;
  mobileMenuOpen.value = false;
};

const fallback = (name) =>
  `https://placehold.co/264x328/2563eb/FFFFFF/png?text=${encodeURIComponent(
    name
  )}`;

const isSpecialNav = (navName) => {
  return ["Promos", "VIP"].includes(navName);
};

const toggleMobileSubmenu = (navName) => {
  mobileActiveSubmenu.value =
    mobileActiveSubmenu.value === navName ? null : navName;
};

// Function to get the appropriate icon for each navigation item
const getNavIcon = (navName) => {
  const iconMap = {
    Sports: "bi bi-dribbble",
    "E-Sports": "bi bi-controller",
    Casino: "bi bi-suit-club",
    Slots: "bi bi-grid-3x3-gap",
    Fishing: "bi bi-water",
    Lottery: "bi bi-ticket-perforated",
    Promos: "bi bi-percent",
    VIP: "bi bi-crown",
    "Lucky Wheel": "bi bi-bullseye",
  };

  return iconMap[navName] || "bi bi-circle";
};

const HeaderNav = computed(() => [
  {
    name: "Casino",
    label: $t("live_casino"),
    link: "/games/livecasino",
    icon: "/images/newicon/poker.png",
    games: [
      {
        name: "Sexybcrt",
        image: "/images/header/gameimg2.png",
      },
      {
        name: "Evolution Gaming",
        image: "/images/header/gameimg2.png",
        tag: "Hot",
      },
    ],
  },
  {
    name: "Slots",
    label: $t("slots"),
    link: "/games/slots",
    icon: "/images/newicon/slot.png",
    games: [
      {
        name: "JDB",
        image: "/images/header/gameimg2.png",
      },
      {
        name: "Jili",
        image: "/images/header/gameimg2.png",
        tag: "New",
      },
    ],
  },
  {
    name: "Fishing",
    label: $t("fishing"),
    link: "/games/fishing",
    icon: "/images/newicon/fishing.png",
    games: [
      {
        name: "JDB",
        image: "/images/header/gameimg2.png",
      },
      {
        name: "Joker",
        image: "/images/header/gameimg2.png",
      },
    ],
  },

  {
    name: "Lottery",
    label: $t("lottery"),
    link: "/games/lottery",
    icon: "/images/newicon/lottery.png",
    games: [
      {
        name: "QQ Keno",
        image: "/images/header/gameimg1.png",
      },
      {
        name: "Funky Games",
        image: "/images/header/gameimg2.png",
      },
    ],
  },
  {
    name: "Sports",
    label: $t("sports"),
    link: "/games/sports",
    icon: "/images/newicon/sport.png",
    games: [
      {
        name: "SABA SPORTS",
        image: "/images/header/gameimg1.png",
        tag: "Hot",
      },
      {
        name: "AFB SPORTS",
        image: "/images/header/gameimg1.png",
      },
    ],
  },
  {
    name: "E-Sports",
    label: $t("e_sports"),
    link: "/games/e-sports",
    icon: "/images/newicon/game.png",
    games: [
      {
        name: "TF GAMING",
        image: "/images/header/gameimg1.png",
        tag: "Hot",
      },
      {
        name: "IM ESPORTS",
        image: "/images/header/gameimg1.png",
        tag: "New",
      },
    ],
  },
]);
const getIconBgClass = (name) => {
  switch (name) {
    case "Sports":
      return "bg-blue-50 border border-blue-100";
    case "E-Sports":
      return "bg-purple-50 border border-purple-100";
    case "Casino":
      return "bg-red-50 border border-red-100";
    case "Slots":
      return "bg-amber-50 border border-amber-100";
    case "Fishing":
      return "bg-teal-50 border border-teal-100";
    case "Lottery":
      return "bg-green-50 border border-green-100";
    default:
      return "bg-gray-50 border border-gray-100";
  }
};

const getIconTextClass = (name) => {
  switch (name) {
    case "Sports":
      return "text-blue-500";
    case "E-Sports":
      return "text-purple-500";
    case "Casino":
      return "text-red-500";
    case "Slots":
      return "text-amber-500";
    case "Fishing":
      return "text-teal-500";
    case "Lottery":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
};
const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
  mobileActiveSubmenu.value = null;
  showLanguageMenu.value = false;
  showBalanceDropdown.value = false;
};

const handleLogout = () => {
  confirmAlertTitle.value = $t("logout_confirmation");
  confirmAlertMessage.value = $t("logout_confirm_message");
  confirmAlertType.value = "warning";
  isConfirmAlertVisible.value = true;
};

function handleConfirmClose(confirmed) {
  isConfirmAlertVisible.value = false;
  if (isLogoutSuccess.value) {
    window.location.href = localePath("/");
    return;
  }
  if (confirmed) {
    performLogout();
  }
}

const fetchUserData = async () => {
  try {
    const { data } = await get("userdata");
    if (data.success) {
      userData.value = data.user;
    }
  } catch (error) {
    console.error("Error fetching helps:", error);
  }
};

const handleRefresh = async () => {
  try {
    await fetchUserData();
    alertTitle.value = $t("success");
    alertMessage.value = $t("balance_refreshed");
    alertType.value = "success";
    alertVisible.value = true;
  } catch (error) {
    console.error("Error refreshing balance:", error);
    alertTitle.value = $t("error");
    alertMessage.value = $t("refresh_failed");
    alertType.value = "error";
    alertVisible.value = true;
  }
};

const performLogout = async () => {
  try {
    const { post } = useApiEndpoint();
    const { data } = await post("logout");
    if (data.success) {
      isUserLoggedIn.value = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("gametoken");
      isLogoutSuccess.value = true;
      confirmAlertTitle.value = $t("success");
      confirmAlertMessage.value = $t("logout_success_message");
      confirmAlertType.value = "success";
      isConfirmAlertVisible.value = true;
      setTimeout(() => {
        window.location.href = localePath("/");
      }, 1500);
    }
  } catch (error) {
    console.error("Logout error:", error);
    confirmAlertTitle.value = $t("error");
    confirmAlertMessage.value = $t("logout_failed");
    confirmAlertType.value = "error";
    isConfirmAlertVisible.value = true;
  }
};

watch(
  () => router.currentRoute.value,
  () => {
    mobileMenuOpen.value = false;
  }
);
</script>

<style scoped>
.mega-dropdown {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out forwards;
}

.animate-slideIn {
  animation: slideIn 0.3s ease-out forwards;
}
</style>
