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
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-xl max-lg:rounded-lg px-4 py-5 max-sm:px-3 max-sm:py-3"
        >
          <div class="flex items-start justify-between gap-4 max-sm:flex-col">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-3">
                <h2
                  class="text-2xl max-lg:text-xl max-sm:text-lg font-bold text-[#f0eaea] uppercase"
                >
                  {{ userData.username }}
                </h2>
                <div
                  class="px-3 py-1 max-sm:py-0.5 bg-amber-500/10 border border-amber-500/20 rounded-lg"
                >
                  <div class="flex items-center gap-1.5">
                    <Icon
                      icon="mdi:crown"
                      class="w-4 h-4 max-sm:w-3 max-sm:h-3 text-amber-400"
                    />
                    <span
                      class="text-xs max-sm:text-[0.7rem] font-bold text-amber-400 uppercase"
                      >{{ userData.viplevel || $t("standard") }}</span
                    >
                  </div>
                </div>
              </div>
              <p class="text-[0.8rem] max-sm:text-xs text-[#b37a7a]">
                {{ $t("member_since") }} {{ formatDate(userData.createdAt) }}
              </p>
            </div>

            <div class="text-right max-lg:text-left">
              <p class="text-xs text-[#b37a7a] mb-1">
                {{ $t("account_balance") }}
              </p>
              <p
                class="text-2xl max-lg:text-xl max-sm:text-lg font-bold text-[#f0eaea]"
              >
                ${{ formatAmount(userData.wallet || 0) }}
              </p>
              <NuxtLinkLocale
                to="/myaccount/deposit"
                class="text-xs max-sm:text-[0.7rem] text-[#ff3344] hover:text-[#cc2a3a] underline transition-all"
              >
                {{ $t("top_up_balance") }}
              </NuxtLinkLocale>
            </div>
          </div>
        </div>

        <div class="lg:hidden">
          <VipProgressBar />
        </div>

        <div class="grid lg:grid-cols-2 gap-4">
          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-xl max-lg:rounded-lg overflow-hidden"
          >
            <div class="p-4 max-sm:p-3 border-b border-[#3b1c23]">
              <h3 class="font-bold text-[#f0eaea] text-base max-lg:text-sm">
                {{ $t("personal_information") }}
              </h3>
            </div>

            <div class="p-4 space-y-4 max-sm:p-3">
              <div>
                <label
                  class="block text-xs font-semibold text-[#b37a7a] mb-2 uppercase tracking-wide"
                >
                  {{ $t("username") }}
                </label>
                <div
                  class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-md"
                >
                  <p
                    class="text-[0.9rem] max-sm:text-sm max-[370px]:text-xs font-medium text-[#f0eaea] uppercase"
                  >
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
                    class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-md flex-1"
                  >
                    <p
                      class="text-[0.9rem] max-sm:text-sm max-[370px]:text-xs font-medium text-[#f0eaea] uppercase"
                    >
                      {{ userData.dob || $t("not_set") }}
                    </p>
                  </div>
                  <button
                    v-if="!userData.dob"
                    @click="showChangeBirthdayModal = true"
                    class="px-4 py-3 bg-[#ff3344] text-white rounded-md font-semibold hover:bg-[#cc2a3a] transition-all text-[0.9rem] max-sm:text-sm max-[370px]:text-xs whitespace-nowrap"
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
                    class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-md flex-1"
                  >
                    <p
                      class="text-[0.9rem] max-sm:text-sm max-[370px]:text-xs font-medium text-[#f0eaea] truncate"
                    >
                      {{ userData.email || $t("not_set") }}
                    </p>
                  </div>
                  <button
                    v-if="!userData.email"
                    @click="showChangeEmailModal = true"
                    class="px-4 py-3 bg-[#ff3344] text-white rounded-md font-semibold hover:bg-[#cc2a3a] transition-all text-[0.9rem] max-sm:text-sm max-[370px]:text-xs whitespace-nowrap"
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
                    class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-md flex-1"
                  >
                    <p
                      class="text-[0.9rem] max-sm:text-sm max-[370px]:text-xs font-medium text-[#f0eaea]"
                    >
                      ••••••••••••
                    </p>
                  </div>
                  <NuxtLinkLocale
                    to="/myaccount/change-password"
                    class="px-4 py-3 bg-[#ff3344] text-white rounded-md font-semibold hover:bg-[#cc2a3a] transition-all text-[0.9rem] max-sm:text-sm max-[370px]:text-xs whitespace-nowrap"
                  >
                    {{ $t("change") }}
                  </NuxtLinkLocale>
                </div>
              </div>
            </div>
          </div>

          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-xl max-lg:rounded-lg overflow-hidden"
          >
            <div class="p-4 max-sm:p-3 border-b border-[#3b1c23]">
              <h3 class="font-bold text-[#f0eaea] text-base max-lg:text-sm">
                {{ $t("social_media_connections") }}
              </h3>
            </div>

            <div class="p-4 space-y-4">
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
                    class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-md flex-1 min-w-0"
                  >
                    <p
                      class="text-[0.9rem] max-sm:text-sm max-[370px]:text-xs font-medium text-[#f0eaea] truncate"
                    >
                      {{ userData.telegramId || $t("not_connected") }}
                    </p>
                  </div>
                  <button
                    @click="showChangeTelegramModal = true"
                    class="px-4 py-3 bg-[#ff3344] text-white rounded-md font-semibold hover:bg-[#cc2a3a] transition-all text-[0.9rem] max-sm:text-sm max-[370px]:text-xs whitespace-nowrap"
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
                    class="p-3 bg-[#15090e] border border-[#3b1c23] rounded-md flex-1 min-w-0"
                  >
                    <p
                      class="text-[0.9rem] max-sm:text-sm max-[370px]:text-xs font-medium text-[#f0eaea] truncate"
                    >
                      {{ userData.facebookId || $t("not_connected") }}
                    </p>
                  </div>
                  <button
                    @click="showChangeFacebookModal = true"
                    class="px-4 py-3 bg-[#ff3344] text-white rounded-md font-semibold hover:bg-[#cc2a3a] transition-all text-[0.9rem] max-sm:text-sm max-[370px]:text-xs whitespace-nowrap"
                  >
                    {{ userData.facebookId ? $t("edit") : $t("connect") }}
                  </button>
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
