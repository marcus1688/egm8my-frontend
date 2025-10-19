<template>
  <ClientOnly>
    <Alerts
      :title="alertTitle"
      :message="alertMessage"
      :isVisible="alertVisible"
      :type="alertType"
      @close="alertVisible = false"
    />
    <PageLoading v-if="pageLoading" />
    <div class="bg-slate-50">
      <section class="relative max-lg:max-w-[100vw]">
        <NuxtImg
          src="/images/banner/lottery_banner.png"
          alt="Lottery"
          class="w-full h-auto lg:block hidden"
        />
        <NuxtImg
          src="/images/banner/lottery_banner_mobile.png"
          alt="Lottery"
          class="w-full h-auto lg:hidden block"
        />
      </section>
      <section
        class="py-4 px-16 max-lg:p-4 bg-slate-50 border-t border-slate-100"
      >
        <div>
          <div class="flex justify-between items-center">
            <div>
              <h2 class="homeMainTxt3 font-bold text-gray-900">
                {{ $t("lottery") }}
              </h2>
              <p class="text-gray-500 mt-1 titletext">
                {{ $t("choose_gaming_providers") }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Slot Kiosks-->
      <section
        class="py-4 px-8 bg-white border-t border-b border-slate-100 shadow-sm max-lg:py-2 max-lg:px-3"
      >
        <div
          class="flex flex-wrap gap-4 justify-center max-lg:flex-nowrap max-lg:overflow-x-auto max-lg:justify-start max-lg:scrollbar-hide max-lg:-mx-2 max-lg:px-2 max-lg:pb-2"
        >
          <div
            v-for="provider in lotteryKiosks"
            :key="provider._id"
            @click="selectGame(provider)"
            class="relative cursor-pointer group max-lg:flex-none"
          >
            <div
              class="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 max-lg:px-3 max-lg:py-1.5"
              :class="
                currentKiosk?._id === provider._id
                  ? 'bg-blue-50 border-2 border-blue-500'
                  : 'bg-white lg:hover:bg-slate-50 border-2 border-transparent'
              "
            >
              <div
                class="w-12 h-12 flex items-center justify-center mb-1 max-lg:w-10 max-lg:h-10"
              >
                <img
                  :src="provider.logo"
                  :alt="provider.name"
                  class="max-w-full max-h-full object-contain"
                />
              </div>
              <span
                class="text-sm font-medium max-lg:text-xs max-lg:whitespace-nowrap"
                :class="
                  currentKiosk?._id === provider._id
                    ? 'text-blue-600'
                    : 'text-gray-600'
                "
              >
                {{ provider.name }}
              </span>
              <div
                v-if="provider.isHotGame"
                class="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-semibold px-1.5 py-0.5 rounded shadow-sm max-lg:text-[10px] max-lg:px-1 max-lg:py-0 max-lg:top-0 max-lg:right-0"
              >
                {{ $t("hot") }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Game List -->
      <section
        v-if="currentKiosk && !currentKiosk.isHTMLGame"
        class="py-10 px-16 max-xl:px-8 max-lg:px-4 max-lg:py-4 bg-slate-50"
      >
        <div>
          <div
            class="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6 max-lg:mb-4 max-lg:gap-3"
          >
            <div>
              <h2 class="text-2xl font-bold text-gray-900 max-lg:text-base">
                {{ currentKiosk.name }} {{ $t("games") }}
              </h2>
              <p class="text-gray-500 mt-1 max-lg:text-xs">
                {{
                  $t("showing_games", {
                    shown: paginatedGames.length,
                    total: filteredGameList.length,
                  })
                }}
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div class="relative flex-grow">
                <input
                  type="text"
                  v-model="searchTerm"
                  :placeholder="$t('search_games')"
                  class="w-full px-5 py-3 max-lg:py-2 rounded-lg bg-white border border-slate-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-12 shadow-sm"
                />
                <i
                  class="bi bi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                ></i>
              </div>
            </div>
          </div>

          <div
            v-if="paginatedGames.length > 0"
            class="grid grid-cols-8 max-2xl:grid-cols-6 max-lg:grid-cols-5 max-md:grid-cols-4 max-sm:grid-cols-2 gap-5"
          >
            <div
              v-for="game in paginatedGames"
              :key="game.GameCode"
              @click="
                launchGame({
                  ...currentKiosk,
                  gameCode: game.GameCode,
                  gameType: game.GameType,
                })
              "
              class="bg-white rounded-xl overflow-hidden cursor-pointer shadow-sm transition-all duration-300 group"
            >
              <!-- Image container with Play Now overlay on hover -->
              <div class="relative overflow-hidden">
                <div
                  class="w-full aspect-square flex items-center justify-center bg-gray-100"
                >
                  <img
                    :src="
                      ($i18n.locale === 'zh' && game.GameImageZH) ||
                      ($i18n.locale === 'ms' && game.GameImageMS) ||
                      game.GameImage ||
                      `https://placehold.co/300x300/e2e8f0/475569?text=${encodeURIComponent(
                        getLocalizedGameName(game)
                      )}`
                    "
                    :alt="getLocalizedGameName(game)"
                    class="max-w-full max-h-full object-contain transition-transform duration-200"
                    @error="handleImageError(game)"
                  />

                  <div
                    class="max-lg:hidden absolute inset-0 bg-black/30 opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
                  >
                    <button
                      class="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg shadow-lg transform scale-90 lg:group-hover:scale-100 lg:group-hover:brightness-110 transition-all duration-300"
                    >
                      <Icon
                        icon="mdi:lightning-bolt"
                        class="text-white text-base"
                      />
                      <p class="max-2xl:text-xs">{{ $t("play_now") }}</p>
                    </button>
                  </div>
                  <div
                    v-if="game.Hot"
                    class="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-500 text-white text-xs font-semibold px-2 py-0.5 rounded-bl-lg rounded-tr-lg shadow-lg flex items-center gap-1 z-10"
                  >
                    <Icon icon="mdi:star" class="text-yellow-300" />
                    {{ $t("top") }}
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-100">
                <div class="p-2 pt-3 text-center">
                  <h4
                    class="text-sm max-md:text-xs font-medium text-gray-800 break-words hyphens-auto"
                  >
                    {{ getLocalizedGameName(game) }}
                  </h4>
                </div>

                <!-- RTP row - only shows if RTP exists -->
                <div v-if="game.RTP" class="px-2 pb-2.5 flex justify-center">
                  <div class="flex items-center justify-center gap-2">
                    <div class="h-0.5 w-4 bg-gray-200 rounded-full"></div>
                    <div
                      class="flex items-center bg-gray-100 rounded-full px-2 py-0.5"
                    >
                      <span
                        class="text-xs font-medium text-amber-600 flex items-center gap-1"
                      >
                        <Icon
                          icon="mdi:trophy"
                          class="text-amber-500 text-2xs"
                        />
                        {{ game.RTP }}
                      </span>
                    </div>
                    <div class="h-0.5 w-4 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- No Games Found  -->
          <div v-else class="text-center py-20 bg-white rounded-xl shadow-sm">
            <div
              class="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6"
            >
              <i class="bi bi-search text-4xl"></i>
            </div>
            <h3 class="text-xl font-medium text-gray-700 mb-3">
              {{ $t("no_games_found") }}
            </h3>
            <p class="text-gray-500 max-w-lg mx-auto">
              {{ $t("no_games_message") }}
            </p>
            <button
              @click="searchTerm = ''"
              class="mt-6 px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium lg:hover:bg-blue-600 transition-colors"
            >
              {{ $t("clear_search") }}
            </button>
          </div>
          <!-- Pagination -->
          <div
            v-if="filteredGameList.length > gamesPerPage"
            class="flex justify-center mt-4"
          >
            <div class="inline-flex rounded-lg shadow-sm">
              <button
                @click="currentPage > 1 && currentPage--"
                :disabled="currentPage === 1"
                class="px-4 py-2.5 border border-slate-200 rounded-l-lg text-gray-600 lg:hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="bi bi-chevron-left"></i>
              </button>

              <div
                class="px-6 py-2.5 border-t border-b border-slate-200 text-gray-700 flex items-center"
              >
                <span class="font-medium">{{ currentPage }}</span>
                <span class="mx-1">/</span>
                <span>{{ totalPages }}</span>
              </div>

              <button
                @click="currentPage < totalPages && currentPage++"
                :disabled="currentPage === totalPages"
                class="px-4 py-2.5 border border-slate-200 rounded-r-lg text-gray-600 lg:hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i class="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- HTML Game -->
      <section
        v-if="currentKiosk && currentKiosk.isHTMLGame"
        class="py-10 px-16 max-xl:px-8 max-lg:px-4 max-md:px-3 max-md:py-4 max-sm:py-3 bg-slate-50"
      >
        <div class="max-w-7xl mx-auto">
          <div class="flex flex-col lg:flex-row gap-6 max-md:gap-4">
            <div class="w-full lg:w-1/2">
              <div
                class="bg-white rounded-2xl max-md:rounded-xl shadow-md overflow-hidden h-full"
              >
                <div
                  class="p-6 max-md:p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                >
                  <div class="flex items-center gap-4 max-md:gap-3">
                    <div
                      class="w-16 h-16 max-md:w-12 max-md:h-12 bg-white rounded-full p-2 flex items-center justify-center"
                    >
                      <img
                        :src="currentKiosk.logo"
                        :alt="currentKiosk.name"
                        class="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div>
                      <h2 class="text-2xl max-md:text-xl font-bold">
                        {{ currentKiosk.name }} {{ $t("wallet") }}
                      </h2>
                      <p class="text-blue-100 max-md:text-sm">
                        {{ $t("manage_game_balance") }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="p-6 max-md:p-4 flex-1">
                  <div>
                    <div
                      v-if="hasGameAccount"
                      class="space-y-6 max-md:space-y-4"
                    >
                      <!-- Balance Display -->
                      <div
                        class="flex items-center justify-between bg-blue-50 p-4 max-md:p-3 rounded-lg"
                      >
                        <div class="flex items-center gap-3 max-md:gap-2">
                          <div
                            class="w-10 h-10 max-md:w-8 max-md:h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
                          >
                            <i class="bi bi-wallet2 text-xl max-md:text-lg"></i>
                          </div>
                          <div>
                            <p class="text-sm max-md:text-xs text-gray-500">
                              {{ $t("game_balance") }}
                            </p>
                            <div class="flex items-center">
                              <p
                                class="font-medium text-gray-800 max-md:text-sm"
                                v-if="!isBalanceLoading"
                              >
                                {{ gameBalance || "0.00" }}
                              </p>
                              <div
                                v-else
                                class="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin ml-1"
                              ></div>
                            </div>
                          </div>
                        </div>
                        <button
                          @click="fetchGameBalance"
                          class="text-blue-500 lg:hover:text-blue-700"
                          :disabled="isBalanceLoading"
                        >
                          <i
                            class="bi"
                            :class="[
                              isBalanceLoading
                                ? 'bi-arrow-repeat animate-spin'
                                : 'bi-arrow-clockwise',
                            ]"
                          ></i>
                        </button>
                      </div>

                      <!-- Username Info -->
                      <div
                        class="flex items-center justify-between bg-blue-50 p-4 max-md:p-3 rounded-lg"
                      >
                        <div class="flex items-center gap-3 max-md:gap-2">
                          <div
                            class="w-10 h-10 max-md:w-8 max-md:h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600"
                          >
                            <i
                              class="bi bi-person-fill text-xl max-md:text-lg"
                            ></i>
                          </div>
                          <div>
                            <p class="text-sm max-md:text-xs text-gray-500">
                              {{ $t("username") }}
                            </p>
                            <p class="font-medium text-gray-800 max-md:text-sm">
                              {{ userData.alipayGameID }}
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- Transfer Button -->
                      <button
                        @click="openTransferModal"
                        class="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 max-md:py-2.5 px-6 max-md:px-4 rounded-lg font-medium lg:hover:shadow-lg transition-all flex items-center justify-center gap-2"
                      >
                        <i class="bi bi-arrow-left-right text-xl"></i>
                        <span class="font-bold max-md:text-sm">{{
                          $t("transfer_funds")
                        }}</span>
                      </button>

                      <div class="text-xs text-gray-500 text-center">
                        {{ $t("transfer_funds_description") }}
                      </div>
                    </div>

                    <!-- Account Creation Section (if no account) -->
                    <div
                      v-else
                      class="text-center py-8 max-md:py-6 space-y-6 max-md:space-y-4"
                    >
                      <div
                        class="w-20 h-20 max-md:w-16 max-md:h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-500"
                      >
                        <i
                          class="bi bi-person-plus text-3xl max-md:text-2xl"
                        ></i>
                      </div>
                      <div>
                        <h3
                          class="text-xl max-md:text-lg font-semibold text-gray-800"
                        >
                          {{ $t("account_required") }}
                        </h3>
                        <p
                          class="text-gray-600 mt-2 max-md:mt-1 max-md:text-sm"
                        >
                          {{
                            $t("account_required_description", {
                              provider: currentKiosk.name,
                            })
                          }}
                        </p>
                      </div>
                      <div>
                        <div v-if="isUserLoggedIn">
                          <LoadingButton
                            :loading="isLoading"
                            @click="registerGameAccount"
                            class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 max-md:py-2.5 px-8 max-md:px-6 rounded-lg font-medium lg:hover:shadow-lg transition-all inline-flex items-center gap-2 max-md:text-sm"
                          >
                            <i class="bi bi-plus-circle"></i>
                            {{ $t("create_account") }}
                          </LoadingButton>
                        </div>
                        <div v-else>
                          <NuxtLinkLocale
                            to="/login"
                            class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 max-md:py-2.5 px-8 max-md:px-6 rounded-lg font-medium lg:hover:shadow-lg transition-all inline-flex items-center gap-2 max-md:text-sm"
                          >
                            <i class="bi bi-box-arrow-in-right"></i>
                            {{ $t("login_now") }}
                          </NuxtLinkLocale>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="p-6 max-md:p-4 bg-gray-50 border-t border-gray-100">
                  <h4
                    class="font-medium text-gray-700 mb-3 max-md:mb-2 flex items-center gap-2 max-md:text-sm"
                  >
                    <i class="bi bi-info-circle text-blue-500"></i>
                    {{ $t("transfer_instructions") }}
                  </h4>
                  <ul
                    class="space-y-2 max-md:space-y-1.5 text-sm max-md:text-xs text-gray-600"
                  >
                    <li class="flex items-start gap-2 max-md:gap-1.5">
                      <i
                        class="bi bi-check-circle-fill text-green-500 mt-0.5"
                      ></i>
                      <span>{{ $t("transfer_instruction_1") }}</span>
                    </li>
                    <li class="flex items-start gap-2 max-md:gap-1.5">
                      <i
                        class="bi bi-check-circle-fill text-green-500 mt-0.5"
                      ></i>
                      <span>{{ $t("transfer_instruction_2") }}</span>
                    </li>
                    <li class="flex items-start gap-2 max-md:gap-1.5">
                      <i
                        class="bi bi-check-circle-fill text-green-500 mt-0.5"
                      ></i>
                      <span>{{ $t("transfer_instruction_3") }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="w-full lg:w-1/2">
              <div
                class="bg-white rounded-2xl max-md:rounded-xl shadow-md overflow-hidden h-full flex flex-col"
              >
                <div
                  class="p-6 max-md:p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                >
                  <div class="flex items-center gap-4 max-md:gap-3">
                    <div
                      class="w-16 h-16 max-md:w-12 max-md:h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2 flex items-center justify-center"
                    >
                      <i
                        class="bi bi-globe text-3xl max-md:text-2xl text-white"
                      ></i>
                    </div>
                    <div>
                      <h2 class="text-2xl max-md:text-xl font-bold">
                        {{ $t("play_online", { provider: currentKiosk.name }) }}
                      </h2>
                      <p class="text-indigo-100 max-md:text-sm">
                        {{ $t("launch_in_browser") }}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  class="p-8 max-md:p-4 flex flex-col items-center justify-center flex-1"
                >
                  <div class="text-center mb-6 max-md:mb-4">
                    <h3
                      class="text-xl max-md:text-lg font-semibold text-gray-800 mb-2 max-md:mb-1"
                    >
                      {{ $t("instant_browser_play") }}
                    </h3>
                    <p class="text-gray-600 max-md:text-sm">
                      {{
                        $t("no_download_required", {
                          provider: currentKiosk.name,
                        })
                      }}
                    </p>
                  </div>

                  <div class="w-full flex justify-center mt-4">
                    <button
                      @click="launchHTMLGame"
                      class="px-8 py-3 max-lg:px-6 max-lg:py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 lg:hover:from-purple-700 lg:hover:to-indigo-700 text-white font-medium rounded-lg transition-all shadow-md lg:hover:shadow-lg flex items-center gap-3 max-w-xs w-full justify-center"
                    >
                      <i class="bi bi-play-circle-fill text-2xl"></i>
                      <span class="font-bold uppercase">{{
                        $t("play_now")
                      }}</span>
                    </button>
                  </div>

                  <p class="text-sm text-gray-500 mt-4 text-center">
                    {{ $t("new_window_notice") }}
                  </p>
                </div>

                <div class="p-6 max-md:p-4 bg-gray-50 border-t border-gray-100">
                  <h4
                    class="font-medium text-gray-700 mb-3 max-md:mb-2 flex items-center gap-2 max-md:text-sm"
                  >
                    <i class="bi bi-info-circle text-purple-500"></i>
                    {{ $t("browser_play_tips") }}
                  </h4>
                  <ul
                    class="space-y-2 max-md:space-y-1.5 text-sm max-md:text-xs text-gray-600"
                  >
                    <li class="flex items-start gap-2 max-md:gap-1.5">
                      <i
                        class="bi bi-check-circle-fill text-green-500 mt-0.5"
                      ></i>
                      <span>{{ $t("browser_tip_1") }}</span>
                    </li>
                    <li class="flex items-start gap-2 max-md:gap-1.5">
                      <i
                        class="bi bi-check-circle-fill text-green-500 mt-0.5"
                      ></i>
                      <span>{{ $t("browser_tip_2") }}</span>
                    </li>
                    <li class="flex items-start gap-2 max-md:gap-1.5">
                      <i
                        class="bi bi-check-circle-fill text-green-500 mt-0.5"
                      ></i>
                      <span>{{ $t("browser_tip_3") }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Game Promo Cards -->
      <GamePromoCards />

      <TransferModal
        v-if="showTransferModal"
        :gameInfo="currentKiosk"
        :currentBalance="parseFloat(gameBalance)"
        @close="showTransferModal = false"
        @balanceUpdated="fetchGameBalance"
      />
    </div>
  </ClientOnly>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const { launchGame, alertVisible, alertTitle, alertMessage, alertType } =
  useGameLauncher();
const isUserLoggedIn = useState("isUserLoggedIn");
const lotteryKiosks = useState("lotteryKiosks");
const searchQuery = ref("");
const sortOption = ref("popular");
const currentPage = ref(1);
const itemsPerPage = ref(24);
const gamesPerPage = ref(24);
const searchTerm = ref("");
const { post, get } = useApiEndpoint();
const isAnimating = ref(false);
const pageLoading = ref(false);
const gameList = ref([]);
const currentKiosk = ref(0);
const sliderWrapper = ref(null);
const sliderContent = ref(null);
const currentOffset = ref(0);
const currentIndex = ref(0);
const visibleItems = ref(5);
const userData = useState("userData");
const isLoading = ref(false);
const loadingMessage = ref("");
const hasGameAccount = computed(() => {
  return userData.value && userData.value.alipayGameID;
});
const { showAlert } = useAlert();
const gameBalance = ref("0.00");
const isBalanceLoading = ref(false);
const showTransferModal = ref(false);

const openTransferModal = () => {
  showTransferModal.value = true;
};

const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  showAlert($t("copied"), $t("copied_to_clipboard"), "success");
  setTimeout(() => {
    alertVisible.value = false;
  }, 3000);
};

const registerGameAccount = async () => {
  if (!currentKiosk.value || !currentKiosk.value.apiLink) {
    showAlert($t("alert_info"), $t("cannot_register_game_account"), "info");
    return;
  }
  isLoading.value = true;
  loadingMessage.value = $t("creating_game_account");
  try {
    const { data } = await post(currentKiosk.value.registerGameAPI, {});
    if (data.success) {
      await fetchUserData();
      await fetchGameBalance();
      showAlert($t("alert_success"), $t("game_account_created"), "success");
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    showAlert(
      "Error",
      error.message || "Failed to create game account. Please try again.",
      "error"
    );
  } finally {
    isLoading.value = false;
    loadingMessage.value = "";
  }
};

const refreshGameAccount = async () => {
  isLoading.value = true;
  loadingMessage.value = $t("refreshing_account");
  try {
    await fetchUserData();
    await fetchGameBalance();
    showAlert($t("alert_success"), $t("account_refreshed"), "success");
  } catch (error) {
    showAlert("Error", "Failed to refresh account information", "error");
  } finally {
    isLoading.value = false;
    loadingMessage.value = "";
  }
};

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

const downloadApp = (platform) => {
  if (!currentKiosk.value) {
    showAlert($t("alert_info"), $t("provider_missing"), "info");
    return;
  }
  let downloadUrl = "";
  if (platform === "android") {
    downloadUrl = currentKiosk.value.androidDownloadUrl;
    if (!downloadUrl) {
      showAlert($t("alert_info"), $t("android_unavailable"), "info");
      return;
    }
  } else if (platform === "ios") {
    downloadUrl = currentKiosk.value.iosDownloadUrl;
    if (!downloadUrl) {
      showAlert($t("alert_info"), $t("ios_unavailable"), "info");
      return;
    }
  }
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.target = "_blank";
  link.download = `${currentKiosk.value.name}-${platform}.apk`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const fetchGameBalance = async () => {
  if (!currentKiosk.value || !currentKiosk.value.balanceAPI) {
    showAlert($t("alert_info"), $t("balance_api_unavailable"), "info");
    return;
  }
  isBalanceLoading.value = true;
  try {
    const { data } = await post(currentKiosk.value.balanceAPI);
    if (data.success) {
      gameBalance.value = data.balance || "0.00";
      await fetchUserData();
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
    showAlert("Error", "Failed to fetch balance", "error");
  } finally {
    isBalanceLoading.value = false;
  }
};

watch([searchQuery, sortOption], () => {
  currentPage.value = 1;
});

const filteredGameList = computed(() => {
  if (!searchTerm.value) return gameList.value;
  const searchLower = searchTerm.value.toLowerCase();
  return gameList.value.filter((game) => {
    const nameToSearch =
      $locale.value === "zh" && game.GameNameZH
        ? game.GameNameZH
        : game.GameNameEN;
    return nameToSearch.toLowerCase().includes(searchLower);
  });
});

const paginatedGames = computed(() => {
  const validGames = filteredGameList.value.filter(
    (game) => game.GameImage && !hasImageError(game)
  );
  const start = (currentPage.value - 1) * gamesPerPage.value;
  const end = start + gamesPerPage.value;
  return validGames.slice(start, end);
});

const totalPages = computed(() => {
  const validGames = filteredGameList.value.filter(
    (game) => game.GameImage && !hasImageError(game)
  );
  return Math.ceil(validGames.length / gamesPerPage.value);
});

const selectGame = async (game) => {
  if (currentKiosk.value?._id === game._id) return;
  pageLoading.value = true;
  currentKiosk.value = game;
  try {
    if (game.gameListLink) {
      await fetchGameList(game.gameListLink);
    }
  } catch (error) {
    console.error("Error selecting game:", error);
  } finally {
    pageLoading.value = false;
    scrollToSelectedProvider();
  }
};

async function fetchGameList(link) {
  try {
    const requestBody = {
      gameLang: $locale.value === "zh" ? "zh" : "en",
    };
    const { data } = await post(link, requestBody);
    if (data.success) {
      gameList.value = data.gamelist.filter((game) => game.GameType === "Slot");
    }
  } catch (error) {
    console.error("Error fetching game list:", error);
  }
}

const failedImages = ref(new Set());

const hasImageError = (game) => {
  return failedImages.value.has(game.GameCode);
};

const handleImageError = (game) => {
  failedImages.value.add(game.GameCode);
};

const getLocalizedGameName = (game) => {
  if ($locale.value === "zh" && game.GameNameZH) {
    return game.GameNameZH;
  }
  if ($locale.value === "ms" && game.GameNameMS) {
    return game.GameNameMS;
  }
  return game.GameNameEN;
};

const fallback = (name) =>
  `https://placehold.co/264x328/2563eb/FFFFFF/png?text=${encodeURIComponent(
    name
  )}`;

const scrollToSelectedProvider = () => {
  if (!currentKiosk.value) return;
  nextTick(() => {
    const providersContainer = document.querySelector(
      ".flex.flex-wrap.max-lg\\:flex-nowrap.max-lg\\:overflow-x-auto"
    );
    if (!providersContainer) return;
    const selectedProvider = Array.from(
      providersContainer.querySelectorAll(".group")
    ).find((el) => {
      return el.querySelector('div[class*="bg-blue-50"]');
    });

    if (selectedProvider) {
      const containerWidth = providersContainer.offsetWidth;
      const selectedPosition = selectedProvider.offsetLeft;
      const selectedWidth = selectedProvider.offsetWidth;
      const scrollTo =
        selectedPosition - (containerWidth / 2 - selectedWidth / 2);
      providersContainer.scrollTo({
        left: Math.max(0, scrollTo),
        behavior: "smooth",
      });
    }
  });
};

const launchHTMLGame = async () => {
  if (!currentKiosk.value || !currentKiosk.value.apiLink) {
    showAlert($t("alert_error"), $t("game_link_unavailable"), "error");
    return;
  }
  try {
    const { data } = await post(currentKiosk.value.apiLink);

    if (data.success && data.gameLobby) {
      const newWindow = window.open(data.gameLobby, "_blank");
      if (
        !newWindow ||
        newWindow.closed ||
        typeof newWindow.closed === "undefined"
      ) {
        window.location.href = data.gameLobby;
      }
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Error launching HTML game:", error);
    showAlert("Error", "Failed to launch game. Please try again.", "error");
  }
};

onMounted(async () => {
  pageLoading.value = true;
  try {
    const selectedLotteryProvider = useState("selectedLotteryProvider").value;
    if (selectedLotteryProvider) {
      currentKiosk.value = selectedLotteryProvider;
      if (selectedLotteryProvider.gameListLink) {
        await fetchGameList(selectedLotteryProvider.gameListLink);
      }
    } else if (lotteryKiosks.value?.length > 0 && !currentKiosk.value) {
      currentKiosk.value = lotteryKiosks.value[0];
      if (lotteryKiosks.value[0].gameListLink) {
        await fetchGameList(lotteryKiosks.value[0].gameListLink);
      }
    }
    if (currentKiosk.value && currentKiosk.value.isHTMLGame) {
      if (!hasGameAccount.value) {
        await fetchUserData();
      }
      if (hasGameAccount.value) {
        await fetchGameBalance();
      }
    }
  } catch (error) {
    console.error("Error during initial page load:", error);
  } finally {
    pageLoading.value = false;
    scrollToSelectedProvider();
  }
});

watchEffect(() => {
  const selectedLotteryProvider = useState("selectedLotteryProvider").value;
  if (selectedLotteryProvider && !currentKiosk.value) {
    selectGame(selectedLotteryProvider);
  } else if (lotteryKiosks.value?.length > 0 && !currentKiosk.value) {
    selectGame(lotteryKiosks.value[0]);
  }
});

watch(searchTerm, () => {
  currentPage.value = 1;
});

watch(gameList, () => {
  currentPage.value = 1;
});

watch([searchTerm, sortOption], () => {
  currentPage.value = 1;
});

watch(
  currentKiosk,
  async (newKiosk) => {
    if (newKiosk && newKiosk.isHTMLGame) {
      if (!hasGameAccount.value) {
        await fetchUserData();
      }
      if (hasGameAccount.value) {
        await fetchGameBalance();
      }
    }
  },
  { immediate: true }
);
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease forwards;
}

.animate-slideUp {
  animation: slideUp 0.8s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
