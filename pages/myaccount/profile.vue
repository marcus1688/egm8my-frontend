<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg">
          {{ $t("my_profile") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("view_manage_account") }}
        </p>
      </div>

      <div class="space-y-4">
        <!-- VIP Progress Bar (Mobile Only) -->
        <div class="lg:hidden">
          <VipProgressBar />
        </div>

        <!-- Account Stats -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-[#b37a7a] mb-1">
                  {{ $t("member_since") }}
                </p>
                <p class="text-base font-bold text-[#f0eaea]">
                  {{ formatDate(userData.createdAt) }}
                </p>
              </div>
              <div
                class="w-12 h-12 rounded-lg bg-[#ff3344]/10 flex items-center justify-center"
              >
                <Icon icon="mdi:calendar" class="w-6 h-6 text-[#ff3344]" />
              </div>
            </div>
          </div>

          <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-[#b37a7a] mb-1">{{ $t("vip_level") }}</p>
                <p class="text-base font-bold text-[#f0eaea] uppercase">
                  {{ userData.viplevel || $t("standard") }}
                </p>
              </div>
              <div
                class="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center"
              >
                <Icon icon="mdi:crown" class="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>

          <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-[#b37a7a] mb-1">
                  {{ $t("account_balance") }}
                </p>
                <p class="text-base font-bold text-[#f0eaea]">
                  ${{ formatAmount(userData.wallet || 0) }}
                </p>
              </div>
              <div
                class="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center"
              >
                <Icon icon="mdi:wallet" class="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Information -->
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-lg p-5 max-lg:p-4"
        >
          <h3
            class="font-semibold text-[#f0eaea] mb-4 text-sm flex items-center gap-2"
          >
            <Icon icon="mdi:account" class="w-5 h-5 text-[#ff3344]" />
            {{ $t("personal_information") }}
          </h3>

          <div class="space-y-4">
            <!-- Username -->
            <div>
              <label class="block text-xs text-[#b37a7a] mb-2">
                {{ $t("username") }}
              </label>
              <div
                class="flex items-center gap-3 p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg"
              >
                <Icon
                  icon="mdi:account-circle"
                  class="w-5 h-5 text-[#ff3344]"
                />
                <span class="text-sm text-[#f0eaea] font-medium uppercase">{{
                  userData.username
                }}</span>
              </div>
            </div>

            <!-- Date of Birth -->
            <div>
              <label class="block text-xs text-[#b37a7a] mb-2">
                {{ $t("date_of_birth") }}
              </label>
              <div class="flex items-center gap-2">
                <div
                  class="flex items-center gap-3 p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg flex-1"
                >
                  <Icon icon="mdi:cake" class="w-5 h-5 text-[#ff3344]" />
                  <span class="text-sm text-[#f0eaea]">{{
                    userData.dob || $t("not_set")
                  }}</span>
                </div>
                <button
                  v-if="!userData.dob"
                  @click="showChangeBirthdayModal = true"
                  class="w-11 h-11 rounded-lg bg-[#ff3344] flex items-center justify-center text-white lg:hover:bg-[#cc2a3a] transition-all"
                >
                  <Icon icon="mdi:pencil" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Email -->
            <div>
              <label class="block text-xs text-[#b37a7a] mb-2">
                {{ $t("email") }}
              </label>
              <div class="flex items-center gap-2">
                <div
                  class="flex items-center gap-3 p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg flex-1"
                >
                  <Icon icon="mdi:email" class="w-5 h-5 text-[#ff3344]" />
                  <span class="text-sm text-[#f0eaea]">{{
                    userData.email || $t("not_set")
                  }}</span>
                </div>
                <button
                  v-if="!userData.email"
                  @click="showChangeEmailModal = true"
                  class="w-11 h-11 rounded-lg bg-[#ff3344] flex items-center justify-center text-white lg:hover:bg-[#cc2a3a] transition-all"
                >
                  <Icon icon="mdi:pencil" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Password -->
            <div>
              <label class="block text-xs text-[#b37a7a] mb-2">
                {{ $t("password") }}
              </label>
              <div class="flex items-center gap-2">
                <div
                  class="flex items-center gap-3 p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg flex-1"
                >
                  <Icon icon="mdi:lock" class="w-5 h-5 text-[#ff3344]" />
                  <span class="text-sm text-[#f0eaea]">••••••••</span>
                </div>
                <NuxtLinkLocale
                  to="/myaccount/change-password"
                  class="w-11 h-11 rounded-lg bg-[#ff3344] flex items-center justify-center text-white lg:hover:bg-[#cc2a3a] transition-all"
                >
                  <Icon icon="mdi:lock-reset" class="w-5 h-5" />
                </NuxtLinkLocale>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-lg p-5 max-lg:p-4"
        >
          <h3
            class="font-semibold text-[#f0eaea] mb-4 text-sm flex items-center gap-2"
          >
            <Icon icon="mdi:link-variant" class="w-5 h-5 text-[#ff3344]" />
            {{ $t("social_media_connections") }}
          </h3>

          <div class="space-y-4">
            <!-- Telegram -->
            <div>
              <label class="block text-xs text-[#b37a7a] mb-2">
                {{ $t("telegram") }}
              </label>
              <div class="flex items-center gap-2">
                <div
                  class="flex items-center gap-3 p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg flex-1"
                >
                  <Icon icon="mdi:telegram" class="w-5 h-5 text-[#0088cc]" />
                  <span class="text-sm text-[#f0eaea]">{{
                    userData.telegramId || $t("not_set")
                  }}</span>
                </div>
                <button
                  @click="showChangeTelegramModal = true"
                  class="w-11 h-11 rounded-lg bg-[#ff3344] flex items-center justify-center text-white lg:hover:bg-[#cc2a3a] transition-all"
                >
                  <Icon icon="mdi:pencil" class="w-5 h-5" />
                </button>
              </div>
            </div>

            <!-- Facebook -->
            <div>
              <label class="block text-xs text-[#b37a7a] mb-2">
                {{ $t("facebook") }}
              </label>
              <div class="flex items-center gap-2">
                <div
                  class="flex items-center gap-3 p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg flex-1"
                >
                  <Icon icon="mdi:facebook" class="w-5 h-5 text-[#1877F2]" />
                  <span class="text-sm text-[#f0eaea]">{{
                    userData.facebookId || $t("not_set")
                  }}</span>
                </div>
                <button
                  @click="showChangeFacebookModal = true"
                  class="w-11 h-11 rounded-lg bg-[#ff3344] flex items-center justify-center text-white lg:hover:bg-[#cc2a3a] transition-all"
                >
                  <Icon icon="mdi:pencil" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
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
