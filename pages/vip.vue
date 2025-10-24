<template>
  <ClientOnly>
    <div>
      <section class="relative max-lg:max-w-[100vw]">
        <NuxtImg
          src="/images/vip_banner.png"
          alt="VIP Banner"
          class="w-full h-auto lg:block hidden"
        />
        <NuxtImg
          src="/images/vip_banner_mobile.png"
          alt="VIP Banner"
          class="w-full h-auto lg:hidden block"
        />
      </section>
      <section class="py-8 relative max-lg:p-4">
        <div class="mb-4 px-48 max-2xl:px-12 max-lg:px-2 max-lg:hidden">
          <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div
              v-for="level in settingsData.vipLevels"
              :key="level.id"
              class="bg-[#1A0D13] rounded-xl shadow-md overflow-hidden transform transition-all lg:hover:scale-105 lg:hover:shadow-lg border border-[#3b1c23]"
            >
              <div
                class="relative h-24 flex items-center justify-center bg-gradient-to-r overflow-hidden"
                :class="getGradientClass(level.name)"
              >
                <div class="absolute inset-0 opacity-20">
                  <div
                    class="absolute top-0 left-1/4 w-20 h-20 rounded-full border-2 border-white/20"
                  ></div>
                  <div
                    class="absolute -bottom-10 -right-5 w-16 h-16 rounded-full border-2 border-white/20"
                  ></div>
                </div>
                <div
                  class="w-16 h-16 rounded-full flex items-center justify-center shadow-inner z-10"
                  :class="getInnerCircleClass(level.name)"
                >
                  <img
                    v-if="level.iconUrl"
                    :src="level.iconUrl"
                    class="w-12 h-12"
                    alt="VIP icon"
                  />
                </div>
              </div>
              <div class="p-4 text-center">
                <h3
                  class="font-bold text-lg"
                  :class="{
                    'text-[#a45e24]': level.name === 'Bronze',
                    'text-gray-400': level.name === 'Silver',
                    'text-[#daa520]': level.name === 'Gold',
                    'text-[#3d898f]': level.name === 'Platinum',
                    'text-gray-300': level.name === 'Diamond',
                    'text-[#a855f7]': level.name === 'EGM8 Elite VIP',
                  }"
                >
                  <p class="max-xl:text-sm">
                    {{ getLocalizedLevelName(level.name) }}
                  </p>
                </h3>
              </div>
            </div>
          </div>
        </div>

        <!-- VIP Table -->
        <div class="px-48 max-2xl:px-12 max-lg:px-0">
          <div
            class="bg-[#241017] rounded-xl shadow-lg overflow-hidden border border-[#3b1c23] relative max-lg:rounded-lg max-lg:shadow-md"
          >
            <!-- Glowing corner effects -->
            <div
              class="absolute -top-4 -left-4 w-8 h-8 bg-[#ff3344] rounded-full blur-xl opacity-20 max-lg:w-6 max-lg:h-6"
            ></div>
            <div
              class="absolute -bottom-4 -right-4 w-8 h-8 bg-[#a1122d] rounded-full blur-xl opacity-20 max-lg:w-6 max-lg:h-6"
            ></div>

            <div class="overflow-x-auto">
              <table
                class="w-full min-w-[900px] max-lg:min-w-[750px] text-nowrap"
              >
                <thead>
                  <tr
                    class="bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white"
                  >
                    <th class="py-4 px-6 text-left max-lg:py-3 max-lg:px-3">
                      {{ localizedTableTitle }}
                    </th>
                    <th
                      v-for="level in settingsData.vipLevels"
                      :key="`header-${level.name}`"
                      class="py-4 px-4 text-center max-lg:py-3 max-lg:px-2 max-lg:text-sm"
                    >
                      <div class="flex flex-col items-center">
                        <img
                          v-if="level.iconUrl"
                          :src="level.iconUrl"
                          alt="VIP Icon"
                          class="w-12 h-auto max-lg:w-8"
                        />
                        <span class="max-lg:text-xs">
                          {{ getLocalizedLevelName(level.name) }}</span
                        >
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <template
                    v-for="(row, rowIndex) in settingsData.rowHeaders"
                    :key="row.id"
                  >
                    <tr v-if="isFirstInGroup(rowIndex)" class="bg-[#15090e]/40">
                      <td
                        colspan="7"
                        class="py-2 px-6 font-medium text-[#ff3344] max-lg:py-1.5 max-lg:px-3 max-lg:text-sm"
                      >
                        {{ getSectionTitle(row.name) }}
                      </td>
                    </tr>
                    <tr class="lg:hover:bg-[#2a0f14] transition-colors">
                      <td
                        class="py-3 px-6 border-t border-[#3b1c23] font-medium max-lg:py-2 max-lg:px-3 max-lg:text-sm text-[#f0eaea]"
                      >
                        {{ getLocalizedRowName(row.name) }}
                      </td>
                      <td
                        v-for="level in settingsData.vipLevels"
                        :key="`${level.name}-${row.name}`"
                        class="py-3 px-4 text-center border-t border-[#3b1c23] max-lg:py-2 max-lg:px-2 max-lg:text-xs text-gray-300"
                      >
                        <span
                          v-if="
                            level.benefits &&
                            level.benefits[row.name]
                              ?.toString()
                              .toLowerCase() === 'yes'
                          "
                          class="text-green-500"
                          ><i class="bi bi-check-lg"></i
                        ></span>
                        <span
                          v-else-if="
                            level.benefits &&
                            level.benefits[row.name]
                              ?.toString()
                              .toLowerCase() === 'no'
                          "
                          class="text-gray-400"
                          ><i class="bi bi-x"></i
                        ></span>
                        <template v-else>
                          {{
                            row.name === "Withdraw Limit" &&
                            level.benefits &&
                            level.benefits[row.name]
                              ? formatNumber(level.benefits[row.name], row.name)
                              : (row.name === "Rebate Slot" ||
                                  row.name === "Rebate Live Casino" ||
                                  row.name === "Rebate Sports & Esports") &&
                                level.benefits &&
                                level.benefits[row.name]
                              ? formatNumber(
                                  level.benefits[row.name],
                                  row.name
                                ) + "%"
                              : "MYR " +
                                formatNumber(
                                  level.benefits
                                    ? level.benefits[row.name]
                                    : "",
                                  row.name
                                )
                          }}
                        </template>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>

            <!-- Mobile hint -->
            <div
              class="text-center text-xs text-[#b37a7a] p-2 border-t border-[#3b1c23] bg-[#15090e] md:hidden max-lg:py-3"
            >
              <p>
                <i class="bi bi-arrow-left-right mr-1"></i>
                {{ $t("swipe_horizontally") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Terms and Conditions
        <div>
          <div
            class="bg-[#241017] rounded-xl shadow-lg !py-6 container mx-auto !px-4 border border-[#3b1c23] relative max-lg:rounded-lg max-lg:shadow-md max-lg:!py-4 max-lg:!px-3"
          >
            <div
              class="absolute top-0 right-0 w-20 h-20 overflow-hidden max-lg:w-12 max-lg:h-12"
            >
              <div
                class="absolute top-0 right-0 w-4 h-4 bg-[#ff3344] transform rotate-45 translate-x-1/2 -translate-y-1/2 max-lg:w-3 max-lg:h-3"
              ></div>
            </div>

            <h3
              class="text-lg font-bold text-[#f0eaea] mb-4 flex items-center max-lg:text-base max-lg:mb-3"
            >
              <i class="bi bi-info-circle text-[#ff3344] mr-2"></i>
              {{ $t("terms_conditions") }}
            </h3>

            <div
              v-if="getLocalizedTerms"
              class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-[#b37a7a] text-sm max-lg:gap-x-4 max-lg:gap-y-2 max-lg:text-xs"
            >
              <ul class="space-y-2 list-none max-lg:space-y-1.5">
                <li
                  v-for="(item, index) in getLocalizedTermsArray"
                  :key="index"
                  class="flex items-start"
                >
                  <span
                    class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#15090e] text-[#ff3344] text-xs font-bold mr-2 flex-shrink-0 max-lg:w-4 max-lg:h-4 max-lg:text-[10px] max-lg:mr-1.5 border border-[#3b1c23]"
                    >{{ index + 1 }}</span
                  >
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div> -->
      </section>
    </div>
  </ClientOnly>
</template>

<script setup>
const pageLoading = useState("pageLoading");
const { get } = useApiEndpoint();
const settingsData = ref({
  tableTitle: "VIP Exclusive Benefits",
  rowHeaders: [],
  vipLevels: [],
  terms: {
    en: "",
    zh: "",
  },
});

const fetchSettings = async () => {
  try {
    const { data } = await get("vipsettings");
    if (data?.success) {
      settingsData.value = data.data[0];
    }
  } catch (error) {
    console.error("Error fetching VIP settings:", error);
  }
};

const getLocalizedTermsArray = computed(() => {
  if (!getLocalizedTerms.value) return [];
  const items = getLocalizedTerms.value
    .split("\n")
    .filter((item) => item.trim());
  const leftColumn = [];
  const rightColumn = [];
  items.forEach((item, index) => {
    if (index < Math.ceil(items.length / 2)) {
      leftColumn.push(item);
    } else {
      rightColumn.push(item);
    }
  });
  return [...leftColumn, ...rightColumn];
});

const formatNumber = (value, rowName) => {
  if (!value) return "";
  if (
    typeof value === "string" &&
    (value.toLowerCase() === "no" || value.toLowerCase() === "yes")
  ) {
    return value.toUpperCase();
  }
  const number = parseFloat(value);
  if (isNaN(number)) {
    return value;
  }
  if (rowName === "Withdraw Limit" || rowName === "Total Deposit") {
    return number.toLocaleString("en-US", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  } else {
    return number.toLocaleString("en-US", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
  }
};

const getLocalizedTerms = computed(() => {
  if ($locale.value === "zh") {
    return settingsData.value.terms?.zh;
  } else if ($locale.value === "ms") {
    return settingsData.value.terms?.ms;
  } else {
    return settingsData.value.terms?.en;
  }
});

const levelNameTranslations = {
  bronze: {
    en: "Bronze",
    zh: "青銅",
    zh_hk: "青銅",
    ms: "Gangsa",
    id: "Perunggu",
  },
  silver: {
    en: "Silver",
    zh: "白銀",
    zh_hk: "白銀",
    ms: "Perak",
    id: "Perak",
  },
  gold: {
    en: "Gold",
    zh: "黃金",
    zh_hk: "黃金",
    ms: "Emas",
    id: "Emas",
  },
  platinum: {
    en: "Platinum",
    zh: "鉑金",
    zh_hk: "鉑金",
    ms: "Platinum",
    id: "Platinum",
  },
  "egm8 elite vip": {
    en: "EGM8 Elite VIP",
    zh: "EGM8 尊贵贵宾",
    zh_hk: "EGM8 尊贵贵宾",
    ms: "EGM8 Elite VIP",
    id: "EGM8 Elite VIP",
  },
  diamond: {
    en: "Diamond",
    zh: "鑽石",
    zh_hk: "鑽石",
    ms: "Berlian",
    id: "Berlian",
  },
  royal: {
    en: "Royal",
    zh: "至尊",
    zh_hk: "至尊",
    ms: "Raja",
    id: "Royal",
  },
};

const getLocalizedLevelName = (name) => {
  const lowerName = name.toLowerCase();
  return levelNameTranslations[lowerName]?.[$locale.value] || name;
};

const rowNameTranslations = {
  "Total Deposit": {
    en: "Total Deposit",
    zh: "总存款",
    ms: "Jumlah Deposit",
  },
  "Upgrade Bonus": {
    en: "Upgrade Bonus",
    zh: "晋级奖励",
    ms: "Bonus Naik Taraf",
  },
  "VIP Monthly Bonus": {
    en: "VIP Monthly Bonus",
    zh: "VIP每月奖金",
    ms: "Bonus Bulanan VIP",
  },
  Rebate: {
    en: "Rebate",
    zh: "返水比例",
    ms: "Rebat",
  },
  "Rebate Slot": {
    en: "Rebate Slot",
    zh: "老虎机返水",
    ms: "Rebat Slot",
  },
  "Rebate Live Casino": {
    en: "Rebate Live Casino",
    zh: "真人娱乐返水",
    ms: "Rebat Live Casino",
  },
  "Rebate Sports & Esports": {
    en: "Rebate Sports & Esports",
    zh: "体育与电竞返水",
    ms: "Rebat Sports & Esports",
  },
  "Birthday Bonus": {
    en: "Birthday Bonus",
    zh: "生日奖励",
    ms: "Bonus Hari Jadi",
  },
  "Withdraw Limit": {
    en: "Withdraw Limit",
    zh: "提款限额",
    ms: "Had Pengeluaran",
  },
};

const localizedTableTitle = computed(() => {
  return $locale.value === "zh"
    ? "VIP 专属福利"
    : settingsData.value?.tableTitle;
});

const getLocalizedRowName = (name) => {
  return rowNameTranslations[name]?.[$locale.value] || name;
};

const getGradientClass = (name) => {
  switch (name) {
    case "Bronze":
    case "Brozne":
      return "from-[#cd7f32] to-[#a45e24]";
    case "Silver":
      return "from-[#c0c0c0] to-[#a0a0a0]";
    case "Gold":
      return "from-[#ffd700] to-[#daa520]";
    case "Platinum":
      return "from-[#71c4cf] to-[#3d898f]";
    case "Diamond":
      return "from-[#b9b9b9] to-[#e0e0e0]";
    case "EGM8 Elite VIP":
      return "from-[#4B0082] to-[#800080]";
    default:
      console.log("No matching style for:", name);
      return "from-gray-400 to-gray-500";
  }
};

const getInnerCircleClass = (name) => {
  switch (name) {
    case "Bronze":
    case "Brozne":
      return "bg-[#a45e24] border-2 border-[#cd7f32]";
    case "Silver":
      return "bg-[#a0a0a0] border-2 border-[#c0c0c0]";
    case "Gold":
      return "bg-[#daa520] border-2 border-[#ffd700]";
    case "Platinum":
      return "bg-[#3d898f] border-2 border-[#71c4cf]";
    case "Diamond":
      return "bg-[#b9b9b9] border-2 border-[#e0e0e0]";
    case "EGM8 Elite VIP":
      return "bg-[#800080] border-2 border-[#9370DB]";
    default:
      console.log("No matching inner circle style for:", name);
      return "bg-gray-500 border-2 border-gray-400";
  }
};

const isFirstInGroup = (index) => {
  if (index === 0) return true;
  const currentRowName = settingsData.value.rowHeaders[index].name;
  const prevRowName = settingsData.value.rowHeaders[index - 1].name;
  return getGroupName(currentRowName) !== getGroupName(prevRowName);
};

const getGroupName = (rowName) => {
  if (rowName.includes("Deposit") || rowName.includes("Total")) {
    return $t("membership_requirements");
  } else if (rowName.includes("Bonus") || rowName.includes("Upgrade")) {
    return $t("bonuses_rewards");
  } else if (rowName.includes("Rebate") || rowName.includes("Sport")) {
    return $t("special_rebates");
  } else if (rowName.includes("Withdraw") || rowName.includes("Account")) {
    return $t("account_benefits");
  } else {
    return $t("other_benefits");
  }
};

const getSectionTitle = (rowName) => {
  return getGroupName(rowName);
};

useHead({
  title: "EGM8 | VIP Membership Program & Exclusive Benefits - Malaysia Casino",
  meta: [
    {
      property: "og:title",
      content: "EGM8 VIP | Elite Gaming Benefits & Premium Rewards",
    },
    {
      name: "description",
      content:
        "Experience EGM8's exclusive VIP membership program with premium benefits including higher withdrawal limits, special rebates, monthly bonuses, birthday rewards, and personalized customer service in Malaysia's top gaming platform.",
    },
    {
      name: "keywords",
      content:
        "EGM8 VIP, VIP membership Malaysia, casino VIP program, exclusive gaming benefits, premium rewards, VIP rebates, monthly VIP bonus, high roller benefits, elite gaming Malaysia, EGM8 premium membership",
    },
  ],
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "canonical",
      href: "https://www.egm8my.vip/vip",
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: "https://www.egm8my.vip/vip",
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: "https://www.egm8my.vip/vip",
    },
  ],
});

onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchSettings();
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});
</script>

<style scoped>
@keyframes float-slow {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-15px) rotate(5deg);
  }
}
@keyframes float-medium {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(-5deg);
  }
}
@keyframes bounce-slow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}
@keyframes glow {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}
@keyframes glow-delayed {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}

.animate-float-slow {
  animation: float-slow 10s ease-in-out infinite;
}
.animate-float-medium {
  animation: float-medium 8s ease-in-out infinite;
  animation-delay: 1s;
}
.animate-bounce-slow {
  animation: bounce-slow 6s ease-in-out infinite;
  animation-delay: 0.5s;
}
.animate-spin-slow {
  animation: spin-slow 20s linear infinite;
}
.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}
.animate-glow {
  animation: glow 4s ease-in-out infinite;
}
.animate-glow-delayed {
  animation: glow-delayed 4s ease-in-out infinite;
  animation-delay: 2s;
}

.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .container {
    padding-left: 0;
    padding-right: 0;
  }
  .animate-float-slow,
  .animate-float-medium,
  .animate-bounce-slow,
  .animate-spin-slow {
    animation: none;
  }
}
</style>
