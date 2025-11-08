<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg max-sm:text-base">
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

        <!-- Profile Header -->
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-xl p-5 max-lg:p-4"
        >
          <div class="flex items-start justify-between gap-4 max-lg:flex-col">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <h2
                  class="text-2xl max-lg:text-xl font-bold text-[#f0eaea] uppercase"
                >
                  {{ userData.username }}
                </h2>
                <div
                  class="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-lg"
                >
                  <div class="flex items-center gap-1.5">
                    <Icon icon="mdi:crown" class="w-4 h-4 text-amber-400" />
                    <span class="text-xs font-bold text-amber-400 uppercase">{{
                      userData.viplevel || $t("standard")
                    }}</span>
                  </div>
                </div>
              </div>
              <p class="text-sm text-[#b37a7a]">
                {{ $t("member_since") }} {{ formatDate(userData.createdAt) }}
              </p>
            </div>

            <div
              class="flex items-center gap-3 max-lg:w-full max-lg:justify-between"
            >
              <div class="text-right max-lg:text-left">
                <p class="text-xs text-[#b37a7a] mb-1">
                  {{ $t("account_balance") }}
                </p>
                <p class="text-2xl max-lg:text-xl font-bold text-[#f0eaea]">
                  ${{ formatAmount(userData.wallet || 0) }}
                </p>
              </div>
              <NuxtLinkLocale
                to="/myaccount/deposit"
                class="px-5 py-2.5 bg-[#ff3344] text-white rounded-lg font-semibold hover:bg-[#cc2a3a] transition-all text-sm whitespace-nowrap"
              >
                {{ $t("deposit") }}
              </NuxtLinkLocale>
            </div>
          </div>
        </div>

        <!-- Two Column Layout -->
        <div class="grid lg:grid-cols-2 gap-4">
          <!-- Personal Information -->
          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
          >
            <div class="p-4 border-b border-[#3b1c23]">
              <h3 class="font-bold text-[#f0eaea] text-base max-lg:text-sm">
                {{ $t("personal_information") }}
              </h3>
            </div>

            <div class="p-4 space-y-4">
              <!-- Username -->
              <div>
                <label
                  class="block text-xs font-semibold text-[#b37a7a] mb-2 uppercase tracking-wide"
                >
                  {{ $t("username") }}
                </label>
                <div
                  class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg"
                >
                  <p class="text-sm font-medium text-[#f0eaea] uppercase">
                    {{ userData.username }}
                  </p>
                </div>
              </div>

              <!-- Date of Birth -->
              <div>
                <label
                  class="block text-xs font-semibold text-[#b37a7a] mb-2 uppercase tracking-wide"
                >
                  {{ $t("date_of_birth") }}
                </label>
                <div class="flex items-center gap-2">
                  <div
                    class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg flex-1"
                  >
                    <p class="text-sm font-medium text-[#f0eaea]">
                      {{ userData.dob || $t("not_set") }}
                    </p>
                  </div>
                  <button
                    v-if="!userData.dob"
                    @click="showChangeBirthdayModal = true"
                    class="px-4 py-3 bg-[#ff3344] text-white rounded-lg font-semibold hover:bg-[#cc2a3a] transition-all text-sm whitespace-nowrap"
                  >
                    {{ $t("add") }}
                  </button>
                </div>
              </div>

              <!-- Email -->
              <div>
                <label
                  class="block text-xs font-semibold text-[#b37a7a] mb-2 uppercase tracking-wide"
                >
                  {{ $t("email") }}
                </label>
                <div class="flex items-center gap-2">
                  <div
                    class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg flex-1 min-w-0"
                  >
                    <p class="text-sm font-medium text-[#f0eaea] truncate">
                      {{ userData.email || $t("not_set") }}
                    </p>
                  </div>
                  <button
                    v-if="!userData.email"
                    @click="showChangeEmailModal = true"
                    class="px-4 py-3 bg-[#ff3344] text-white rounded-lg font-semibold hover:bg-[#cc2a3a] transition-all text-sm whitespace-nowrap"
                  >
                    {{ $t("add") }}
                  </button>
                </div>
              </div>

              <!-- Password -->
              <div>
                <label
                  class="block text-xs font-semibold text-[#b37a7a] mb-2 uppercase tracking-wide"
                >
                  {{ $t("password") }}
                </label>
                <div class="flex items-center gap-2">
                  <div
                    class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg flex-1"
                  >
                    <p class="text-sm font-medium text-[#f0eaea]">
                      ••••••••••••
                    </p>
                  </div>
                  <NuxtLinkLocale
                    to="/myaccount/change-password"
                    class="px-4 py-3 bg-[#ff3344] text-white rounded-lg font-semibold hover:bg-[#cc2a3a] transition-all text-sm whitespace-nowrap"
                  >
                    {{ $t("change") }}
                  </NuxtLinkLocale>
                </div>
              </div>
            </div>
          </div>

          <!-- Social Media Connections -->
          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
          >
            <div class="p-4 border-b border-[#3b1c23]">
              <h3 class="font-bold text-[#f0eaea] text-base max-lg:text-sm">
                {{ $t("social_media_connections") }}
              </h3>
            </div>

            <div class="p-4 space-y-4">
              <!-- Telegram -->
              <div>
                <label
                  class="block text-xs font-semibold text-[#b37a7a] mb-2 uppercase tracking-wide"
                >
                  <Icon
                    icon="mdi:telegram"
                    class="w-4 h-4 inline-block mr-1 text-[#0088cc]"
                  />
                  {{ $t("telegram") }}
                </label>
                <div class="flex items-center gap-2">
                  <div
                    class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg flex-1 min-w-0"
                  >
                    <p class="text-sm font-medium text-[#f0eaea] truncate">
                      {{ userData.telegramId || $t("not_connected") }}
                    </p>
                  </div>
                  <button
                    @click="showChangeTelegramModal = true"
                    class="px-4 py-3 bg-[#ff3344] text-white rounded-lg font-semibold hover:bg-[#cc2a3a] transition-all text-sm whitespace-nowrap"
                  >
                    {{ userData.telegramId ? $t("edit") : $t("connect") }}
                  </button>
                </div>
              </div>

              <!-- Facebook -->
              <div>
                <label
                  class="block text-xs font-semibold text-[#b37a7a] mb-2 uppercase tracking-wide"
                >
                  <Icon
                    icon="mdi:facebook"
                    class="w-4 h-4 inline-block mr-1 text-[#1877F2]"
                  />
                  {{ $t("facebook") }}
                </label>
                <div class="flex items-center gap-2">
                  <div
                    class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg flex-1 min-w-0"
                  >
                    <p class="text-sm font-medium text-[#f0eaea] truncate">
                      {{ userData.facebookId || $t("not_connected") }}
                    </p>
                  </div>
                  <button
                    @click="showChangeFacebookModal = true"
                    class="px-4 py-3 bg-[#ff3344] text-white rounded-lg font-semibold hover:bg-[#cc2a3a] transition-all text-sm whitespace-nowrap"
                  >
                    {{ userData.facebookId ? $t("edit") : $t("connect") }}
                  </button>
                </div>
              </div>

              <!-- Info Notice -->
              <div
                class="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg"
              >
                <div class="flex gap-2">
                  <Icon
                    icon="mdi:information-outline"
                    class="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5"
                  />
                  <p class="text-xs text-[#b37a7a] leading-relaxed">
                    {{ $t("social_connect_info") }}
                  </p>
                </div>
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
