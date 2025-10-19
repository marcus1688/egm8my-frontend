<template>
  <UserAccountLayout>
    <div class="bg-white text-gray-800 rounded-lg">
      <div class="mb-6 max-lg:mb-4">
        <div class="mb-4 max-lg:mb-3">
          <h1 class="text-lg font-bold max-lg:text-base">
            {{ $t("my_profile") }}
          </h1>
          <p class="text-gray-500 text-sm max-lg:text-xs">
            {{ $t("view_manage_account") }}
          </p>
        </div>

        <div class="mb-5 max-lg:mb-4 lg:hidden">
          <NuxtLinkLocale
            to="/myaccount/change-password"
            class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 lg:hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
          >
            <Icon icon="mdi:lock-reset" class="w-4 h-4" />
            <span>{{ $t("change_password") }}</span>
          </NuxtLinkLocale>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="lg:hidden">
          <!-- VIP Progress Bar -->
          <VipProgressBar />
        </div>
        <!-- Username Field -->
        <div>
          <label
            class="block text-sm max-lg:text-xs font-medium text-gray-700 mb-2 max-lg:mb-1"
          >
            {{ $t("username") }} *
          </label>
          <input
            type="text"
            :value="userData.username"
            readonly
            disabled
            class="w-full p-3 max-lg:p-2 max-lg:text-sm rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed border border-gray-200"
          />
        </div>

        <!-- Birthday Field -->
        <div>
          <label
            class="block text-sm max-lg:text-xs font-medium text-gray-700 mb-2 max-lg:mb-1"
          >
            {{ $t("date_of_birth") }} *
          </label>
          <div
            class="flex rounded-lg border border-gray-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
          >
            <input
              type="text"
              :value="userData.dob"
              readonly
              disabled
              class="w-full p-3 max-lg:p-2 max-lg:text-sm bg-white text-gray-600 outline-none"
            />
            <button
              v-if="!userData.dob"
              @click="showChangeBirthdayModal = true"
              class="px-3 max-lg:px-2 flex items-center justify-center bg-gray-100 border-l border-gray-300 text-gray-600 lg:hover:bg-gray-200 transition-colors"
            >
              <Icon
                icon="mingcute:edit-line"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4"
              />
            </button>
          </div>
        </div>

        <!-- Email Field -->
        <div>
          <label
            class="block text-sm max-lg:text-xs font-medium text-gray-700 mb-2 max-lg:mb-1"
          >
            {{ $t("email") }} *
          </label>
          <div
            class="flex rounded-lg border border-gray-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
          >
            <input
              type="email"
              :value="userData.email"
              readonly
              disabled
              class="w-full p-3 max-lg:p-2 max-lg:text-sm bg-white text-gray-600 outline-none"
            />
            <button
              v-if="!userData.email"
              @click="showChangeEmailModal = true"
              class="px-3 max-lg:px-2 flex items-center justify-center bg-gray-100 border-l border-gray-300 text-gray-600 lg:hover:bg-gray-200 transition-colors"
            >
              <Icon
                icon="mingcute:edit-line"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4"
              />
            </button>
          </div>
        </div>

        <!-- Telegram Field -->
        <div>
          <label
            class="block text-sm max-lg:text-xs font-medium text-gray-700 mb-2 max-lg:mb-1"
          >
            {{ $t("telegram") }}
          </label>
          <div
            class="flex rounded-lg border border-gray-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
          >
            <input
              type="text"
              :value="userData.telegramId || 'Not set'"
              readonly
              disabled
              class="w-full p-3 max-lg:p-2 max-lg:text-sm bg-white text-gray-600 outline-none"
            />
            <button
              @click="showChangeTelegramModal = true"
              class="px-3 max-lg:px-2 flex items-center justify-center bg-gray-100 border-l border-gray-300 text-gray-600 lg:hover:bg-gray-200 transition-colors"
            >
              <Icon
                icon="mingcute:edit-line"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4"
              />
            </button>
          </div>
        </div>

        <!-- Facebook Field -->
        <div>
          <label
            class="block text-sm max-lg:text-xs font-medium text-gray-700 mb-2 max-lg:mb-1"
          >
            {{ $t("facebook") }}
          </label>
          <div
            class="flex rounded-lg border border-gray-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200"
          >
            <input
              type="text"
              :value="userData.facebookId || $t('not_set')"
              readonly
              disabled
              class="w-full p-3 max-lg:p-2 max-lg:text-sm bg-white text-gray-600 outline-none"
            />
            <button
              @click="showChangeFacebookModal = true"
              class="px-3 max-lg:px-2 flex items-center justify-center bg-gray-100 border-l border-gray-300 text-gray-600 lg:hover:bg-gray-200 transition-colors"
            >
              <Icon
                icon="mingcute:edit-line"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4"
              />
            </button>
          </div>
        </div>

        <!-- Change Password Button (Visible only on larger screens) -->
        <div class="lg:block hidden">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t("password") }}
          </label>
          <div class="flex rounded-lg border border-gray-300 overflow-hidden">
            <input
              type="password"
              value="••••••••"
              readonly
              disabled
              class="w-full p-3 bg-white text-gray-600 outline-none"
            />
            <NuxtLinkLocale
              to="/myaccount/change-password"
              class="px-3 flex items-center justify-center bg-blue-600 border-l border-blue-700 text-white lg:hover:bg-blue-700 transition-colors"
            >
              <Icon icon="mdi:lock-reset" class="w-5 h-5" />
            </NuxtLinkLocale>
          </div>
        </div>
      </div>

      <!-- Account Info Cards -->
      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 max-lg:mt-6 max-lg:pb-4"
      >
        <div
          class="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-5 max-lg:p-3 border border-blue-200"
        >
          <div class="flex items-center justify-between mb-2 max-lg:mb-1">
            <div class="text-sm max-lg:text-xs text-blue-600 font-medium">
              {{ $t("member_since") }}
            </div>
            <div
              class="w-10 h-10 max-lg:w-8 max-lg:h-8 bg-blue-100 rounded-full flex items-center justify-center"
            >
              <Icon
                icon="mdi:calendar"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-blue-600"
              />
            </div>
          </div>
          <div class="text-lg max-lg:text-base font-bold text-gray-800">
            {{ formatDate(userData.createdAt) }}
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-5 max-lg:p-3 border border-green-200"
        >
          <div class="flex items-center justify-between mb-2 max-lg:mb-1">
            <div class="text-sm max-lg:text-xs text-green-600 font-medium">
              {{ $t("vip_level") }}
            </div>
            <div
              class="w-10 h-10 max-lg:w-8 max-lg:h-8 bg-green-100 rounded-full flex items-center justify-center"
            >
              <Icon
                icon="mdi:crown"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-green-600"
              />
            </div>
          </div>
          <div
            class="text-lg max-lg:text-base font-bold text-gray-800 uppercase"
          >
            {{ userData.viplevel || $t("standard") }}
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-5 max-lg:p-3 border border-indigo-200"
        >
          <div class="flex items-center justify-between mb-2 max-lg:mb-1">
            <div class="text-sm max-lg:text-xs text-indigo-600 font-medium">
              {{ $t("account_balance") }}
            </div>
            <div
              class="w-10 h-10 max-lg:w-8 max-lg:h-8 bg-indigo-100 rounded-full flex items-center justify-center"
            >
              <Icon
                icon="mdi:wallet"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-indigo-600"
              />
            </div>
          </div>
          <div class="text-lg max-lg:text-base font-bold text-gray-800">
            ${{ formatAmount(userData.wallet || 0) }}
          </div>
        </div>
      </div>
    </div>

    <ChangeEmailModal
      v-if="showChangeEmailModal"
      @close="showChangeEmailModal = false"
    />

    <ChangeTelegramModal
      v-if="showChangeTelegramModal"
      @close="showChangeTelegramModal = false"
      @save="updateTelegramId"
    />

    <ChangeFacebookModal
      v-if="showChangeFacebookModal"
      @close="showChangeFacebookModal = false"
      @save="updateFacebookId"
    />

    <ChangeBirthdayModal
      v-if="showChangeBirthdayModal"
      @close="showChangeBirthdayModal = false"
      @save="updateDob"
    />
  </UserAccountLayout>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";

import moment from "moment-timezone";

const { checkAuth } = useAuthCheck();
await checkAuth();
const userData = useState("userData");

const showChangeEmailModal = ref(false);
const showChangeTelegramModal = ref(false);
const showChangeFacebookModal = ref(false);
const showChangeBirthdayModal = ref(false);

const telegramId = ref("");
function updateTelegramId(newId) {
  telegramId.value = newId;
}

const facebookId = ref("");
function updateFacebookId(newId) {
  facebookId.value = newId;
}

const dob = ref("");
function updateDob(newDob) {
  dob.value = newDob;
}

const formatDate = (date) => {
  if (!date) return "-";
  return moment(date).tz("Asia/Kuala_Lumpur").format("DD/MM/YYYY");
};

const formatAmount = (value) => {
  if (!value && value !== 0) return "0.00";
  const number = parseFloat(value);
  if (isNaN(number)) return "0.00";
  return number.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
</script>
