<template>
  <ClientOnly>
    <div
      v-if="isUserLoggedIn"
      class="w-full h-[60px] bg-gray-100 flex gap-2 justify-around items-center shadow-md z-30"
    >
      <!-- HOME -->
      <NuxtLinkLocale
        to="/"
        :class="[
          'flex flex-col items-center justify-center text-xs max-[370px]:text-[0.7rem] z-30 px-2 pt-2 cursor-pointer ',
          isActiveRoute('/') ? ' text-blue-600 rounded-md' : 'text-gray-400',
        ]"
      >
        <component
          :is="isActiveRoute('/') ? HomeSolid : HomeOutline"
          class="w-6 h-6 max-[370px]:w-5 max-[370px]:h-5"
          :class="isActiveRoute('/') ? 'text-blue-600' : 'text-blue-500'"
        />
        <span class="tracking-wide">{{ $t("home") }}</span>
      </NuxtLinkLocale>

      <!-- HISTORY -->
      <NuxtLinkLocale
        to="/myaccount/transaction-history"
        :class="[
          'flex flex-col items-center justify-center text-xs max-[370px]:text-[0.7rem] z-30 px-2 pt-2 cursor-pointer ',
          isActiveRoute('/myaccount/transaction-history')
            ? ' text-blue-600 rounded-md'
            : 'text-gray-400',
        ]"
      >
        <component
          :is="
            isActiveRoute('/myaccount/transaction-history')
              ? ClockSolid
              : ClockOutline
          "
          class="w-6 h-6 max-[370px]:w-5 max-[370px]:h-5"
          :class="
            isActiveRoute('/myaccount/transaction-history')
              ? 'text-blue-600'
              : 'text-blue-500'
          "
        />
        <span class="tracking-wide">{{ $t("history") }}</span>
      </NuxtLinkLocale>

      <!-- Deposit -->
      <NuxtLinkLocale
        to="/myaccount/deposit"
        :class="[
          'flex flex-col items-center justify-center text-xs max-[370px]:text-[0.7rem] z-30 px-2 pt-2 cursor-pointer relative -mt-8',
          isActiveRoute('/myaccount/deposit')
            ? ' text-blue-600 rounded-md'
            : 'text-gray-400',
        ]"
      >
        <div
          class="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-full shadow-md mb-1"
        >
          <component
            :is="
              isActiveRoute('/myaccount/deposit')
                ? CreditCardSolid
                : CreditCardOutline
            "
            class="w-8 h-8 max-[370px]:w-5 max-[370px]:h-5 text-white"
          />
        </div>
        <span class="tracking-wide">{{ $t("deposit") }}</span>
      </NuxtLinkLocale>

      <!-- Rebate -->
      <NuxtLinkLocale
        to="/myaccount/rebate"
        :class="[
          'flex flex-col items-center justify-center text-xs max-[370px]:text-[0.7rem] z-30 px-2 pt-2 cursor-pointer ',
          isActiveRoute('/myaccount/commission')
            ? ' text-blue-600 rounded-md'
            : 'text-gray-400',
        ]"
      >
        <component
          :is="
            isActiveRoute('/myaccount/commission')
              ? BanknotesSolid
              : BanknotesOutline
          "
          class="w-6 h-6 max-[370px]:w-5 max-[370px]:h-5"
          :class="
            isActiveRoute('/myaccount/commission')
              ? 'text-blue-600'
              : 'text-blue-500'
          "
        />
        <span class="tracking-wide">{{ $t("rebate") }}</span>
      </NuxtLinkLocale>

      <!-- Account -->
      <NuxtLinkLocale
        to="/myaccount/profile"
        :class="[
          'flex flex-col items-center justify-center text-xs max-[370px]:text-[0.7rem] z-30 px-2 pt-2 cursor-pointer ',
          isActiveRoute('/myaccount/profile')
            ? ' text-blue-600 rounded-md'
            : 'text-gray-400',
        ]"
      >
        <component
          :is="isActiveRoute('/myaccount/profile') ? UserSolid : UserOutline"
          class="w-6 h-6 max-[370px]:w-5 max-[370px]:h-5"
          :class="
            isActiveRoute('/myaccount/profile')
              ? 'text-blue-600'
              : 'text-blue-500'
          "
        />
        <span class="tracking-wide">{{ $t("account") }}</span>
      </NuxtLinkLocale>
    </div>
  </ClientOnly>
</template>

<script setup>
import {
  HomeIcon as HomeSolid,
  ClockIcon as ClockSolid,
  BuildingLibraryIcon as BuildingSolid,
  UserIcon as UserSolid,
  Cog6ToothIcon as CogSolid,
  BanknotesIcon as BanknotesSolid,
  GiftIcon as GiftSolid,
  AdjustmentsHorizontalIcon as AdjustmentsHorizontalSolid,
  CreditCardIcon as CreditCardSolid,
} from "@heroicons/vue/24/solid";
import {
  HomeIcon as HomeOutline,
  ClockIcon as ClockOutline,
  BuildingLibraryIcon as BuildingOutline,
  UserIcon as UserOutline,
  Cog6ToothIcon as CogOutline,
  BanknotesIcon as BanknotesOutline,
  GiftIcon as GiftOutline,
  AdjustmentsHorizontalIcon as AdjustmentsHorizontalOutline,
  CreditCardIcon as CreditCardOutline,
} from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";
const route = useRoute();
const isActiveRoute = (path) => {
  const currentPath = route.path;
  if (
    path === "/" &&
    (currentPath === "/" || currentPath === "/zh" || currentPath === "/ms")
  ) {
    return true;
  }
  return (
    currentPath === path ||
    currentPath === `/zh${path}` ||
    currentPath === `/ms${path}`
  );
};
const isUserLoggedIn = useState("isUserLoggedIn");
</script>

<style scoped></style>
