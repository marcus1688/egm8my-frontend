<template>
  <div
    class="w-full h-[700px] bg-[#241017]/60 rounded-xl shadow-lg shadow-red-500/20 border border-[#3b1c23] overflow-hidden"
  >
    <div class="p-4 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white">
      <div class="flex items-center gap-3">
        <div
          class="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center"
        >
          <Icon icon="mdi:account" class="text-white text-xl" />
        </div>
        <div>
          <h3 class="font-medium uppercase">
            {{ userData?.username || "User" }}
          </h3>
          <p class="text-xs text-red-100 uppercase">
            {{ userData?.viplevel || "Standard" }}
          </p>
        </div>
      </div>
    </div>

    <!-- Menu Item -->
    <div class="py-2">
      <!-- Cashier Section -->
      <div class="px-2 mb-1">
        <div
          class="flex items-center justify-between p-3 rounded-lg lg:hover:bg-[#15090e]/50 cursor-pointer transition-colors"
          :class="{ 'bg-[#ff3344]/10': activeMenuItem === 'cashier' }"
          @click="
            activeMenuItem = activeMenuItem === 'cashier' ? null : 'cashier'
          "
        >
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 flex items-center justify-center rounded-md bg-[#ff3344]/20 text-[#ff3344]"
            >
              <Icon icon="mdi:wallet" class="text-xl" />
            </div>
            <span class="text-[#f0eaea] font-medium uppercase">{{
              $t("cashier")
            }}</span>
          </div>
          <Icon
            :icon="
              activeMenuItem === 'cashier'
                ? 'mdi:chevron-up'
                : 'mdi:chevron-down'
            "
            class="text-[#b37a7a] w-5 h-5"
          />
        </div>

        <!-- Cashier Sub Items -->
        <div
          v-if="activeMenuItem === 'cashier'"
          class="mt-1 py-1 border-l-2 border-[#ff3344]"
        >
          <NuxtLinkLocale
            to="/myaccount/deposit"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('deposit'),
              'text-[#b37a7a]': !isActiveRoute('deposit'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:arrow-down-box" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("deposit") }}</span>
            </div>
          </NuxtLinkLocale>

          <NuxtLinkLocale
            to="/myaccount/withdraw"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('withdraw'),
              'text-[#b37a7a]': !isActiveRoute('withdraw'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:arrow-up-box" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("withdraw") }}</span>
            </div>
          </NuxtLinkLocale>

          <NuxtLinkLocale
            to="/myaccount/bankaccount"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('bankaccount'),
              'text-[#b37a7a]': !isActiveRoute('bankaccount'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:bank" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("bank_account") }}</span>
            </div>
          </NuxtLinkLocale>

          <NuxtLinkLocale
            to="/myaccount/rebate"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('rebate'),
              'text-[#b37a7a]': !isActiveRoute('rebate'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:cash-refund" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("rebate") }}</span>
            </div>
          </NuxtLinkLocale>

          <NuxtLinkLocale
            to="/myaccount/rescue"
            class="hidden items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('rescue'),
              'text-[#b37a7a]': !isActiveRoute('rescue'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:hand-heart" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("rescue") }}</span>
            </div>
          </NuxtLinkLocale>

          <NuxtLinkLocale
            to="/myaccount/checkin"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('checkin'),
              'text-[#b37a7a]': !isActiveRoute('checkin'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:calendar-check" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("checkin") }}</span>
            </div>
          </NuxtLinkLocale>
        </div>
      </div>

      <!-- Agent Section -->
      <div class="px-2 mb-1">
        <div
          class="flex items-center justify-between p-3 rounded-lg lg:hover:bg-[#15090e]/50 cursor-pointer transition-colors"
          :class="{ 'bg-[#ff3344]/10': activeMenuItem === 'agent' }"
          @click="activeMenuItem = activeMenuItem === 'agent' ? null : 'agent'"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 flex items-center justify-center rounded-md bg-green-500/20 text-green-400"
            >
              <Icon icon="mdi:account-group" class="text-xl" />
            </div>
            <span class="text-[#f0eaea] font-medium uppercase">{{
              $t("agent")
            }}</span>
          </div>
          <Icon
            :icon="
              activeMenuItem === 'agent' ? 'mdi:chevron-up' : 'mdi:chevron-down'
            "
            class="text-[#b37a7a] w-5 h-5"
          />
        </div>

        <!-- Agent Sub Items -->
        <div
          v-if="activeMenuItem === 'agent'"
          class="mt-1 py-1 border-l-2 border-green-400"
        >
          <NuxtLinkLocale
            to="/myaccount/referral"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('referral'),
              'text-[#b37a7a]': !isActiveRoute('referral'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:share-variant" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("referral") }}</span>
            </div>
          </NuxtLinkLocale>

          <NuxtLinkLocale
            to="/myaccount/downline"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('downline'),
              'text-[#b37a7a]': !isActiveRoute('downline'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:account-multiple" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("downline") }}</span>
            </div>
          </NuxtLinkLocale>

          <NuxtLinkLocale
            to="/myaccount/commission"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('commission'),
              'text-[#b37a7a]': !isActiveRoute('commission'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:currency-usd" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("commission") }}</span>
            </div>
          </NuxtLinkLocale>

          <NuxtLinkLocale
            v-if="userData.positionTaking > 0"
            to="/myaccount/agentpt"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('agentpt'),
              'text-[#b37a7a]': !isActiveRoute('agentpt'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:chart-timeline-variant" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("agent_pt") }}</span>
            </div>
          </NuxtLinkLocale>
        </div>
      </div>

      <!-- Profile Section -->
      <div class="px-2 mb-1">
        <div
          class="flex items-center justify-between p-3 rounded-lg lg:hover:bg-[#15090e]/50 cursor-pointer transition-colors"
          :class="{ 'bg-[#ff3344]/10': activeMenuItem === 'profile' }"
          @click="
            activeMenuItem = activeMenuItem === 'profile' ? null : 'profile'
          "
        >
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 flex items-center justify-center rounded-md bg-purple-500/20 text-purple-400"
            >
              <Icon icon="mdi:account-circle" class="text-xl" />
            </div>
            <span class="text-[#f0eaea] font-medium uppercase">{{
              $t("profile")
            }}</span>
          </div>
          <Icon
            :icon="
              activeMenuItem === 'profile'
                ? 'mdi:chevron-up'
                : 'mdi:chevron-down'
            "
            class="text-[#b37a7a] w-5 h-5"
          />
        </div>

        <!-- Profile Sub Items -->
        <div
          v-if="activeMenuItem === 'profile'"
          class="mt-1 py-1 border-l-2 border-purple-400"
        >
          <NuxtLinkLocale
            to="/myaccount/profile"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('profile'),
              'text-[#b37a7a]': !isActiveRoute('profile'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:card-account-details" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("my_profile") }}</span>
            </div>
          </NuxtLinkLocale>

          <NuxtLinkLocale
            to="/myaccount/messaging"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('messaging'),
              'text-[#b37a7a]': !isActiveRoute('messaging'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:email" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("messaging") }}</span>
            </div>
          </NuxtLinkLocale>

          <NuxtLinkLocale
            to="/myaccount/change-password"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50':
                isActiveRoute('change-password'),
              'text-[#b37a7a]': !isActiveRoute('change-password'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="mdi:key" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("change_password") }}</span>
            </div>
          </NuxtLinkLocale>
        </div>
      </div>

      <!-- History Section -->
      <div class="px-2 mb-1">
        <div
          class="flex items-center justify-between p-3 rounded-lg lg:hover:bg-[#15090e]/50 cursor-pointer transition-colors"
          :class="{ 'bg-[#ff3344]/10': activeMenuItem === 'history' }"
          @click="
            activeMenuItem = activeMenuItem === 'history' ? null : 'history'
          "
        >
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 flex items-center justify-center rounded-md bg-amber-500/20 text-amber-400"
            >
              <Icon icon="mdi:clock" class="text-xl" />
            </div>
            <span class="text-[#f0eaea] font-medium uppercase">{{
              $t("history")
            }}</span>
          </div>
          <Icon
            :icon="
              activeMenuItem === 'history'
                ? 'mdi:chevron-up'
                : 'mdi:chevron-down'
            "
            class="text-[#b37a7a] w-5 h-5"
          />
        </div>

        <!-- History Sub Items -->
        <div
          v-if="activeMenuItem === 'history'"
          class="mt-1 py-1 border-l-2 border-amber-400"
        >
          <NuxtLinkLocale
            to="/myaccount/transaction-history"
            class="flex items-center py-2.5 px-4 lg:hover:bg-[#15090e]/50 transition-colors text-sm"
            :class="{
              'text-[#ff3344] font-medium bg-[#15090e]/50': isActiveRoute(
                'transaction-history'
              ),
              'text-[#b37a7a]': !isActiveRoute('transaction-history'),
            }"
          >
            <div class="flex items-center w-full">
              <div class="flex-shrink-0 w-6 flex justify-center">
                <Icon icon="icon-park-solid:transaction" class="w-4 h-4" />
              </div>
              <span class="ml-3">{{ $t("transaction_history") }}</span>
            </div>
          </NuxtLinkLocale>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { useRoute } from "vue-router";

const userData = useState("userData");
const route = useRoute();
const activeMenuItem = ref("cashier");
const isConfirmAlertVisible = ref(false);
const confirmAlertTitle = ref("");
const confirmAlertMessage = ref("");
const confirmAlertType = ref("warning");
const { t } = useI18n();
const localePath = useLocalePath();
const currentRoute = computed(() => route.path);

const isActiveRoute = (pathSegment) => {
  const pathParts = route.path.split("/");
  const lastPathPart = pathParts[pathParts.length - 1];
  return lastPathPart === pathSegment;
};

watchEffect(() => {
  if (
    route.path.includes("/myaccount/deposit") ||
    route.path.includes("/myaccount/withdraw") ||
    route.path.includes("/myaccount/bankaccount")
  ) {
    activeMenuItem.value = "cashier";
  } else if (
    route.path.includes("/myaccount/referral") ||
    route.path.includes("/myaccount/downline") ||
    route.path.includes("/myaccount/commission") ||
    route.path.includes("/myaccount/agentpt")
  ) {
    activeMenuItem.value = "agent";
  } else if (
    route.path.includes("/myaccount/profile") ||
    route.path.includes("/myaccount/messaging") ||
    route.path.includes("/myaccount/change-password")
  ) {
    activeMenuItem.value = "profile";
  } else if (route.path.includes("/myaccount/transaction-history")) {
    activeMenuItem.value = "history";
  }
});
</script>
