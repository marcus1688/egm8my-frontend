<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <div class="mb-6 max-lg:mb-4">
        <div class="mb-4 max-lg:mb-3">
          <h1 class="text-lg font-bold max-lg:text-base">
            {{ $t("my_profile") }}
          </h1>
          <p class="text-[#b37a7a] text-sm max-lg:text-xs">
            {{ $t("view_manage_account") }}
          </p>
        </div>

        <div class="mb-5 max-lg:mb-4 lg:hidden">
          <NuxtLinkLocale
            to="/myaccount/change-password"
            class="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] lg:hover:brightness-110 text-white rounded-lg text-sm font-medium transition-all"
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
            class="block text-sm max-lg:text-xs font-medium text-[#f0eaea] mb-2 max-lg:mb-1"
          >
            {{ $t("username") }} *
          </label>
          <input
            type="text"
            :value="userData.username"
            readonly
            disabled
            class="w-full p-3 max-lg:p-2 max-lg:text-sm rounded-lg bg-[#15090e]/50 text-[#b37a7a] cursor-not-allowed border border-[#3b1c23]"
          />
        </div>

        <!-- Birthday Field -->
        <div>
          <label
            class="block text-sm max-lg:text-xs font-medium text-[#f0eaea] mb-2 max-lg:mb-1"
          >
            {{ $t("date_of_birth") }} *
          </label>
          <div
            class="flex rounded-lg border border-[#3b1c23] overflow-hidden focus-within:border-[#ff3344] focus-within:ring-2 focus-within:ring-[#ff3344]/50"
          >
            <input
              type="text"
              :value="userData.dob"
              readonly
              disabled
              class="w-full p-3 max-lg:p-2 max-lg:text-sm bg-[#15090e]/50 text-[#b37a7a] outline-none"
            />
            <button
              v-if="!userData.dob"
              @click="showChangeBirthdayModal = true"
              class="px-3 max-lg:px-2 flex items-center justify-center bg-[#ff3344]/20 border-l border-[#3b1c23] text-[#ff3344] lg:hover:bg-[#ff3344]/30 transition-colors"
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
            class="block text-sm max-lg:text-xs font-medium text-[#f0eaea] mb-2 max-lg:mb-1"
          >
            {{ $t("email") }} *
          </label>
          <div
            class="flex rounded-lg border border-[#3b1c23] overflow-hidden focus-within:border-[#ff3344] focus-within:ring-2 focus-within:ring-[#ff3344]/50"
          >
            <input
              type="email"
              :value="userData.email"
              readonly
              disabled
              class="w-full p-3 max-lg:p-2 max-lg:text-sm bg-[#15090e]/50 text-[#b37a7a] outline-none"
            />
            <button
              v-if="!userData.email"
              @click="showChangeEmailModal = true"
              class="px-3 max-lg:px-2 flex items-center justify-center bg-[#ff3344]/20 border-l border-[#3b1c23] text-[#ff3344] lg:hover:bg-[#ff3344]/30 transition-colors"
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
            class="block text-sm max-lg:text-xs font-medium text-[#f0eaea] mb-2 max-lg:mb-1"
          >
            {{ $t("telegram") }}
          </label>
          <div
            class="flex rounded-lg border border-[#3b1c23] overflow-hidden focus-within:border-[#ff3344] focus-within:ring-2 focus-within:ring-[#ff3344]/50"
          >
            <input
              type="text"
              :value="userData.telegramId || 'Not set'"
              readonly
              disabled
              class="w-full p-3 max-lg:p-2 max-lg:text-sm bg-[#15090e]/50 text-[#b37a7a] outline-none"
            />
            <button
              @click="showChangeTelegramModal = true"
              class="px-3 max-lg:px-2 flex items-center justify-center bg-[#ff3344]/20 border-l border-[#3b1c23] text-[#ff3344] lg:hover:bg-[#ff3344]/30 transition-colors"
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
            class="block text-sm max-lg:text-xs font-medium text-[#f0eaea] mb-2 max-lg:mb-1"
          >
            {{ $t("facebook") }}
          </label>
          <div
            class="flex rounded-lg border border-[#3b1c23] overflow-hidden focus-within:border-[#ff3344] focus-within:ring-2 focus-within:ring-[#ff3344]/50"
          >
            <input
              type="text"
              :value="userData.facebookId || $t('not_set')"
              readonly
              disabled
              class="w-full p-3 max-lg:p-2 max-lg:text-sm bg-[#15090e]/50 text-[#b37a7a] outline-none"
            />
            <button
              @click="showChangeFacebookModal = true"
              class="px-3 max-lg:px-2 flex items-center justify-center bg-[#ff3344]/20 border-l border-[#3b1c23] text-[#ff3344] lg:hover:bg-[#ff3344]/30 transition-colors"
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
          <label class="block text-sm font-medium text-[#f0eaea] mb-2">
            {{ $t("password") }}
          </label>
          <div class="flex rounded-lg border border-[#3b1c23] overflow-hidden">
            <input
              type="password"
              value="••••••••"
              readonly
              disabled
              class="w-full p-3 bg-[#15090e]/50 text-[#b37a7a] outline-none"
            />
            <NuxtLinkLocale
              to="/myaccount/change-password"
              class="px-3 flex items-center justify-center bg-gradient-to-r from-[#a1122d] to-[#c21b3a] border-l border-[#c21b3a] text-white lg:hover:brightness-110 transition-all"
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
          class="bg-gradient-to-r from-[#ff3344]/10 to-[#ff3344]/20 rounded-lg p-5 max-lg:p-3 border border-[#ff3344]/30"
        >
          <div class="flex items-center justify-between mb-2 max-lg:mb-1">
            <div class="text-sm max-lg:text-xs text-[#ff3344] font-medium">
              {{ $t("member_since") }}
            </div>
            <div
              class="w-10 h-10 max-lg:w-8 max-lg:h-8 bg-[#ff3344]/20 rounded-full flex items-center justify-center"
            >
              <Icon
                icon="mdi:calendar"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-[#ff3344]"
              />
            </div>
          </div>
          <div class="text-lg max-lg:text-base font-bold text-[#f0eaea]">
            {{ formatDate(userData.createdAt) }}
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-green-500/10 to-green-500/20 rounded-lg p-5 max-lg:p-3 border border-green-500/30"
        >
          <div class="flex items-center justify-between mb-2 max-lg:mb-1">
            <div class="text-sm max-lg:text-xs text-green-400 font-medium">
              {{ $t("vip_level") }}
            </div>
            <div
              class="w-10 h-10 max-lg:w-8 max-lg:h-8 bg-green-500/20 rounded-full flex items-center justify-center"
            >
              <Icon
                icon="mdi:crown"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-green-400"
              />
            </div>
          </div>
          <div
            class="text-lg max-lg:text-base font-bold text-[#f0eaea] uppercase"
          >
            {{ userData.viplevel || $t("standard") }}
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-purple-500/10 to-purple-500/20 rounded-lg p-5 max-lg:p-3 border border-purple-500/30"
        >
          <div class="flex items-center justify-between mb-2 max-lg:mb-1">
            <div class="text-sm max-lg:text-xs text-purple-400 font-medium">
              {{ $t("account_balance") }}
            </div>
            <div
              class="w-10 h-10 max-lg:w-8 max-lg:h-8 bg-purple-500/20 rounded-full flex items-center justify-center"
            >
              <Icon
                icon="mdi:wallet"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-purple-400"
              />
            </div>
          </div>
          <div class="text-lg max-lg:text-base font-bold text-[#f0eaea]">
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
