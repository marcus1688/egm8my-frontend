<template>
  <div
    class="w-full h-full bg-[#15090e] rounded-xl shadow-lg border border-[#3b1c23] overflow-hidden flex flex-col"
  >
    <div
      class="p-5 bg-gradient-to-br from-[#241017] to-[#1A0D13] border-b border-[#3b1c23]"
    >
      <div class="flex items-center gap-3">
        <img src="/images/user/icon.png" alt="icon" class="w-14 h-14" />
        <div class="flex-1">
          <h3 class="font-semibold text-[#f0eaea] text-base uppercase">
            {{ userData?.username || "User" }}
          </h3>
          <div class="flex items-center gap-1.5">
            <p class="text-[0.8rem] text-[#b37a7a] font-bold italic">
              {{ userData?.viplevel || "Standard" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto scrollbar-thin py-2">
      <div class="mb-1">
        <button
          @click="
            activeMenuItem = activeMenuItem === 'cashier' ? null : 'cashier'
          "
          class="w-full flex items-center justify-between px-4 py-3 transition-colors lg:hover:bg-[#1A0D13]"
          :class="{ 'bg-[#1A0D13]': activeMenuItem === 'cashier' }"
        >
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 text-[#ff3344]">
              <img
                src="/images/user/cashier2.png"
                alt="Cashier"
                class="w-full h-auto"
              />
            </div>
            <span class="text-base font-medium text-[#f0eaea]">{{
              $t("cashier")
            }}</span>
          </div>
          <Icon
            :icon="
              activeMenuItem === 'cashier'
                ? 'mdi:chevron-up'
                : 'mdi:chevron-down'
            "
            class="text-[#b37a7a] w-5 h-5 transition-transform"
          />
        </button>

        <Transition name="slide">
          <div
            v-if="activeMenuItem === 'cashier'"
            class="bg-[#0a0005] border-l-2 border-[#ff3344]/50 ml-4 mt-1"
          >
            <NuxtLinkLocale
              to="/myaccount/deposit"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('deposit')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:arrow-down-bold-circle" class="w-4 h-4" />
              <span>{{ $t("deposit") }}</span>
            </NuxtLinkLocale>

            <NuxtLinkLocale
              to="/myaccount/withdraw"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('withdraw')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:arrow-up-bold-circle" class="w-4 h-4" />
              <span>{{ $t("withdraw") }}</span>
            </NuxtLinkLocale>

            <NuxtLinkLocale
              to="/myaccount/bankaccount"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('bankaccount')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:bank" class="w-4 h-4" />
              <span>{{ $t("bank_account") }}</span>
            </NuxtLinkLocale>

            <NuxtLinkLocale
              to="/myaccount/rebate"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('rebate')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:cash-refund" class="w-4 h-4" />
              <span>{{ $t("rebate") }}</span>
            </NuxtLinkLocale>

            <NuxtLinkLocale
              to="/myaccount/promocode"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('promocode')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:ticket-percent" class="w-4 h-4" />
              <span>{{ $t("promo_code") }}</span>
            </NuxtLinkLocale>
          </div>
        </Transition>
      </div>

      <!-- Agent Section -->
      <div class="mb-1">
        <button
          @click="activeMenuItem = activeMenuItem === 'agent' ? null : 'agent'"
          class="w-full flex items-center justify-between px-4 py-3 transition-colors lg:hover:bg-[#1A0D13]"
          :class="{ 'bg-[#1A0D13]': activeMenuItem === 'agent' }"
        >
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 text-[#ff3344]">
              <img
                src="/images/user/agent2.png"
                alt="agent"
                class="w-full h-auto"
              />
            </div>
            <span class="text-sm font-medium text-[#f0eaea]">{{
              $t("agent")
            }}</span>
          </div>
          <Icon
            :icon="
              activeMenuItem === 'agent' ? 'mdi:chevron-up' : 'mdi:chevron-down'
            "
            class="text-[#b37a7a] w-5 h-5 transition-transform"
          />
        </button>

        <!-- Agent Sub Items -->
        <Transition name="slide">
          <div
            v-if="activeMenuItem === 'agent'"
            class="bg-[#0a0005] border-l-2 border-[#ff3344]/50 ml-4 mt-1"
          >
            <NuxtLinkLocale
              to="/myaccount/referral"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('referral')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:share-variant" class="w-4 h-4" />
              <span>{{ $t("referral") }}</span>
            </NuxtLinkLocale>

            <NuxtLinkLocale
              to="/myaccount/downline"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('downline')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:account-multiple" class="w-4 h-4" />
              <span>{{ $t("downline") }}</span>
            </NuxtLinkLocale>

            <NuxtLinkLocale
              to="/myaccount/commission"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('commission')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:currency-usd" class="w-4 h-4" />
              <span>{{ $t("commission") }}</span>
            </NuxtLinkLocale>

            <NuxtLinkLocale
              v-if="userData.positionTaking > 0"
              to="/myaccount/agentpt"
              class="flex items-center gap-2 py-2 px-4 text-sm transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('agentpt')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:chart-timeline-variant" class="w-4 h-4" />
              <span>{{ $t("agent_pt") }}</span>
            </NuxtLinkLocale>
          </div>
        </Transition>
      </div>

      <!-- Profile Section -->
      <div class="mb-1">
        <button
          @click="
            activeMenuItem = activeMenuItem === 'profile' ? null : 'profile'
          "
          class="w-full flex items-center justify-between px-4 py-3 transition-colors lg:hover:bg-[#1A0D13]"
          :class="{ 'bg-[#1A0D13]': activeMenuItem === 'profile' }"
        >
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 text-[#ff3344]">
              <img
                src="/images/user/profile2.png"
                alt="profile"
                class="w-full h-auto"
              />
            </div>
            <span class="text-sm font-medium text-[#f0eaea]">{{
              $t("profile")
            }}</span>
          </div>
          <Icon
            :icon="
              activeMenuItem === 'profile'
                ? 'mdi:chevron-up'
                : 'mdi:chevron-down'
            "
            class="text-[#b37a7a] w-5 h-5 transition-transform"
          />
        </button>

        <!-- Profile Sub Items -->
        <Transition name="slide">
          <div
            v-if="activeMenuItem === 'profile'"
            class="bg-[#0a0005] border-l-2 border-[#ff3344]/50 ml-4 mt-1"
          >
            <NuxtLinkLocale
              to="/myaccount/profile"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('profile')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:card-account-details" class="w-4 h-4" />
              <span>{{ $t("my_profile") }}</span>
            </NuxtLinkLocale>

            <NuxtLinkLocale
              to="/myaccount/messaging"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('messaging')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:email" class="w-4 h-4" />
              <span>{{ $t("messaging") }}</span>
            </NuxtLinkLocale>

            <NuxtLinkLocale
              to="/myaccount/change-password"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('change-password')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="mdi:key" class="w-4 h-4" />
              <span>{{ $t("change_password") }}</span>
            </NuxtLinkLocale>
          </div>
        </Transition>
      </div>

      <!-- History Section -->
      <div class="mb-1">
        <button
          @click="
            activeMenuItem = activeMenuItem === 'history' ? null : 'history'
          "
          class="w-full flex items-center justify-between px-4 py-3 transition-colors lg:hover:bg-[#1A0D13]"
          :class="{ 'bg-[#1A0D13]': activeMenuItem === 'history' }"
        >
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 text-[#ff3344]">
              <img
                src="/images/user/history2.png"
                alt="history"
                class="w-full h-auto"
              />
            </div>
            <span class="text-sm font-medium text-[#f0eaea]">{{
              $t("history")
            }}</span>
          </div>
          <Icon
            :icon="
              activeMenuItem === 'history'
                ? 'mdi:chevron-up'
                : 'mdi:chevron-down'
            "
            class="text-[#b37a7a] w-5 h-5 transition-transform"
          />
        </button>

        <!-- History Sub Items -->
        <Transition name="slide">
          <div
            v-if="activeMenuItem === 'history'"
            class="bg-[#0a0005] border-l-2 border-[#ff3344]/50 ml-4 mt-1"
          >
            <NuxtLinkLocale
              to="/myaccount/transaction-history"
              class="flex items-center gap-2 py-3 px-4 text-[0.95rem] transition-colors lg:hover:bg-[#1A0D13]"
              :class="
                isActiveRoute('transaction-history')
                  ? 'text-[#ff3344] bg-[#1A0D13]'
                  : 'text-[#b37a7a]'
              "
            >
              <Icon icon="icon-park-solid:transaction" class="w-4 h-4" />
              <span>{{ $t("transaction_history") }}</span>
            </NuxtLinkLocale>
          </div>
        </Transition>
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

const isActiveRoute = (pathSegment) => {
  const pathParts = route.path.split("/");
  const lastPathPart = pathParts[pathParts.length - 1];
  return lastPathPart === pathSegment;
};

watchEffect(() => {
  if (
    route.path.includes("/myaccount/deposit") ||
    route.path.includes("/myaccount/withdraw") ||
    route.path.includes("/myaccount/bankaccount") ||
    route.path.includes("/myaccount/rebate") ||
    route.path.includes("/myaccount/promocode")
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

<style scoped>
/* Custom scrollbar */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #0a0005;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #3b1c23;
  border-radius: 2px;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #ff3344;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

.slide-leave-to {
  opacity: 0;
  max-height: 0;
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
