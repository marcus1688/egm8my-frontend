<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg max-sm:text-base">
          {{ $t("promo_code") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("claim_promo_code_desc") }}
        </p>
      </div>

      <div class="grid lg:grid-cols-3 gap-6 max-lg:gap-4">
        <!-- Claim Promo Code Card -->
        <div class="lg:col-span-2">
          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
          >
            <div
              class="p-4 bg-gradient-to-r from-[#ff3344]/5 to-transparent border-b border-[#3b1c23]"
            >
              <h3 class="font-bold text-[#f0eaea] text-base max-lg:text-sm">
                {{ $t("claim_promo_code") }}
              </h3>
            </div>

            <div class="p-6 max-lg:p-4">
              <form @submit.prevent="claimPromoCode" class="space-y-4">
                <div>
                  <label
                    for="promoCode"
                    class="block text-xs font-semibold text-[#b37a7a] mb-2 uppercase tracking-wide"
                  >
                    {{ $t("enter_promo_code") }}
                  </label>
                  <input
                    type="text"
                    id="promoCode"
                    v-model="promoCode"
                    class="w-full px-4 py-3 rounded-lg border border-[#3b1c23] bg-[#15090e] text-[#f0eaea] placeholder-[#b37a7a] focus:border-[#ff3344] focus:outline-none transition-all uppercase"
                  />
                </div>

                <button
                  type="submit"
                  :disabled="!promoCode.trim() || isLoading"
                  class="w-full py-3 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white font-semibold rounded-lg lg:hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 max-lg:text-sm"
                >
                  <Icon
                    v-if="!isLoading"
                    icon="mdi:ticket-confirmation"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4"
                  />
                  <Icon
                    v-else
                    icon="mdi:loading"
                    class="w-5 h-5 max-lg:w-4 max-lg:h-4 animate-spin"
                  />
                  <span>{{
                    isLoading ? $t("claiming") : $t("claim_now")
                  }}</span>
                </button>
              </form>
            </div>
          </div>

          <!-- Claim History -->
          <div
            class="bg-[#15090e]/50 rounded-xl border border-[#3b1c23] overflow-hidden shadow-lg shadow-red-500/20 mt-6 max-lg:mt-4"
          >
            <div class="overflow-x-auto">
              <table v-if="claims.length > 0" class="w-full text-center">
                <thead>
                  <tr class="bg-[#241017]/80 border-b border-[#3b1c23]">
                    <th
                      class="py-3 px-4 text-xs max-lg:text-[10px] font-medium text-[#b37a7a] uppercase"
                    >
                      {{ $t("date") }}
                    </th>
                    <th
                      class="py-3 px-4 text-xs max-lg:text-[10px] font-medium text-[#b37a7a] uppercase"
                    >
                      {{ $t("code") }}
                    </th>
                    <th
                      class="py-3 px-4 text-xs max-lg:text-[10px] font-medium text-[#b37a7a] uppercase"
                    >
                      {{ $t("amount") }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(claim, index) in paginatedClaims"
                    :key="claim._id"
                    :class="[
                      'border-b border-[#3b1c23] lg:hover:bg-[#ff3344]/10 transition-colors',
                      index % 2 === 0 ? 'bg-[#15090e]/30' : 'bg-[#15090e]/50',
                    ]"
                  >
                    <td class="py-3 px-4 text-sm max-lg:text-xs text-[#f0eaea]">
                      {{ formatDate(claim.createdAt) }}
                    </td>
                    <td
                      class="py-3 px-4 text-sm max-lg:text-xs text-[#f0eaea] font-mono uppercase"
                    >
                      {{ claim.code }}
                    </td>
                    <td
                      class="py-3 px-4 text-sm max-lg:text-xs font-bold text-green-400"
                    >
                      MYR {{ formatAmount(claim.amount) }}
                    </td>
                  </tr>
                </tbody>
              </table>

              <!-- Empty State -->
              <div v-else class="py-16 max-lg:py-12">
                <div class="flex flex-col items-center">
                  <div
                    class="w-20 h-20 max-lg:w-16 max-lg:h-16 bg-[#ff3344]/20 rounded-full flex items-center justify-center mb-4 max-lg:mb-3"
                  >
                    <Icon
                      icon="mdi:ticket-outline"
                      class="w-10 h-10 max-lg:w-8 max-lg:h-8 text-[#ff3344]"
                    />
                  </div>
                  <h3 class="text-[#f0eaea] font-medium mb-1 max-lg:text-sm">
                    {{ $t("no_claims_yet") }}
                  </h3>
                  <p class="text-[#b37a7a] text-sm max-lg:text-xs text-center">
                    {{ $t("claim_your_first_code") }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div
              v-if="claims.length > 0 && totalPages > 1"
              class="p-4 border-t border-[#3b1c23] flex justify-center items-center gap-2"
            >
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="px-3 max-lg:px-2 py-2 max-lg:py-1.5 rounded-lg border border-[#3b1c23] bg-[#15090e]/50 text-[#b37a7a] lg:hover:bg-[#15090e]/70 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Icon
                  icon="ooui:previous-ltr"
                  class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
                />
              </button>

              <span
                v-for="page in displayedPages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'w-8 h-8 max-lg:w-7 max-lg:h-7 flex items-center justify-center rounded-lg font-medium cursor-pointer text-sm max-lg:text-xs',
                  currentPage === page
                    ? 'bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white'
                    : 'bg-[#15090e]/50 text-[#b37a7a] border border-[#3b1c23] lg:hover:bg-[#15090e]/70',
                ]"
              >
                {{ page }}
              </span>

              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="px-3 max-lg:px-2 py-2 max-lg:py-1.5 rounded-lg border border-[#3b1c23] bg-[#15090e]/50 text-[#b37a7a] lg:hover:bg-[#15090e]/70 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Icon
                  icon="ooui:next-ltr"
                  class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Info Card -->
        <div class="space-y-4">
          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
          >
            <div
              class="p-4 bg-gradient-to-r from-[#ff3344]/5 to-transparent border-b border-[#3b1c23]"
            >
              <h3 class="text-sm font-bold text-[#f0eaea]">
                {{ $t("how_to_use") }}
              </h3>
            </div>
            <div class="p-4">
              <ul class="text-xs text-[#f0eaea] space-y-3">
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-1-circle"
                    class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("promo_step_1") }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-2-circle"
                    class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("promo_step_2") }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:numeric-3-circle"
                    class="w-5 h-5 text-[#ff3344] flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("promo_step_3") }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Important Notice -->
          <div
            class="bg-[#241017] border border-[#3b1c23] rounded-xl overflow-hidden"
          >
            <div
              class="p-4 bg-gradient-to-r from-amber-500/5 to-transparent border-b border-[#3b1c23]"
            >
              <h3 class="text-sm font-bold text-amber-400">
                {{ $t("important_notice") }}
              </h3>
            </div>
            <div class="p-4">
              <ul class="text-xs text-[#f0eaea] space-y-2.5">
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:alert-circle"
                    class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("promo_notice_1") }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:alert-circle"
                    class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("promo_notice_2") }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <Icon
                    icon="mdi:alert-circle"
                    class="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("promo_notice_3") }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserAccountLayout>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";
import moment from "moment-timezone";

const { alertVisible, alertTitle, alertMessage, alertType, showAlert } =
  useAlert();
const pageLoading = useState("pageLoading");
const promoCode = ref("");
const isLoading = ref(false);
const claims = ref([]);
const currentPage = ref(1);
const itemsPerPage = ref(5);
const { get, post } = useApiEndpoint();

const totalPages = computed(() =>
  Math.ceil(claims.value.length / itemsPerPage.value)
);

const paginatedClaims = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return claims.value.slice(start, end);
});

const displayedPages = computed(() => {
  if (totalPages.value <= 5) {
    return Array.from({ length: totalPages.value }, (_, i) => i + 1);
  }

  if (currentPage.value <= 3) {
    return [1, 2, 3, 4, 5];
  }

  if (currentPage.value >= totalPages.value - 2) {
    return [
      totalPages.value - 4,
      totalPages.value - 3,
      totalPages.value - 2,
      totalPages.value - 1,
      totalPages.value,
    ];
  }

  return [
    currentPage.value - 2,
    currentPage.value - 1,
    currentPage.value,
    currentPage.value + 1,
    currentPage.value + 2,
  ];
});

const fetchClaimHistory = async () => {
  try {
    const { data } = await get("user/promoclaims");
    if (data.success) {
      claims.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching claim history:", error);
  }
};

const claimPromoCode = async () => {
  if (!promoCode.value.trim()) return;

  isLoading.value = true;
  try {
    const { data } = await post("promocodes/claim", {
      code: promoCode.value.trim().toUpperCase(),
    });

    if (data.success) {
      showAlert(
        $t("alert_success"),
        data.message[$locale.value] || data.message.en,
        "success"
      );
      promoCode.value = "";
      await fetchClaimHistory();

      // Refresh user data
      const userData = useState("userData");
      if (userData.value) {
        userData.value.wallet += data.data.amount;
      }
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Claim promo code error:", error);
    showAlert(
      $t("alert_error"),
      error.response?.data?.message?.[$locale.value] ||
        error.response?.data?.message?.en ||
        $t("network_error"),
      "error"
    );
  } finally {
    isLoading.value = false;
  }
};

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

onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchClaimHistory();
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});
</script>

<style scoped></style>
