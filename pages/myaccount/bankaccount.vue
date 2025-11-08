<template>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <div class="flex justify-between items-start gap-3">
          <div class="flex-1">
            <h1 class="text-xl font-bold mb-1 max-lg:text-lg max-sm:text-base">
              {{ $t("bank_accounts") }}
            </h1>
            <p class="text-[#b37a7a] text-sm max-lg:text-xs">
              {{ $t("manage_bank_accounts") }}
            </p>
          </div>
          <button
            @click="showModal = true"
            class="flex items-center gap-2 bg-[#ff3344] text-white px-4 py-2.5 rounded-lg lg:hover:bg-[#cc2a3a] transition-all text-sm font-medium whitespace-nowrap max-lg:px-3 max-lg:py-2 max-lg:text-xs"
          >
            <Icon icon="mdi:plus" class="w-4 h-4" />
            <span class="max-lg:hidden">{{ $t("add_bank_account") }}</span>
            <span class="lg:hidden">{{ $t("add") }}</span>
          </button>
        </div>
      </div>

      <div v-if="userbank.length" class="space-y-3">
        <div
          v-for="bank in userbank"
          :key="bank._id"
          class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4 max-lg:px-2.5 lg:hover:border-[#ff3344]/50 transition-all max-lg:p-3"
        >
          <div class="flex items-start gap-3">
            <div
              class="w-12 h-12 rounded-lg bg-[#15090e] border border-[#3b1c23] flex items-center justify-center flex-shrink-0 max-lg:w-10 max-lg:h-10"
            >
              <Icon
                icon="mdi:bank"
                class="w-6 h-6 text-[#ff3344] max-lg:w-5 max-lg:h-5"
              />
            </div>

            <!-- Bank Details -->
            <div class="flex-1 min-w-0">
              <h3
                class="font-semibold text-[#f0eaea] mb-1 text-base max-lg:text-sm"
              >
                {{ bank.bankname }}
              </h3>
              <div class="flex items-center gap-2 mb-2">
                <p class="text-sm text-[#b37a7a] font-mono max-lg:text-xs">
                  {{
                    showFullAccount[bank._id]
                      ? bank.banknumber
                      : formatBankNumber(bank.banknumber)
                  }}
                </p>
                <button
                  @click="toggleAccountVisibility(bank._id)"
                  class="text-[#ff3344] lg:hover:text-[#cc2a3a] transition-colors"
                >
                  <Icon
                    :icon="
                      showFullAccount[bank._id] ? 'mdi:eye-off' : 'mdi:eye'
                    "
                    class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
                  />
                </button>
              </div>
            </div>

            <!-- Delete Button -->
            <button
              @click="confirmRemoveAccount(bank._id)"
              class="w-9 h-9 rounded-lg bg-[#15090e] border border-[#3b1c23] flex items-center justify-center text-[#b37a7a] lg:hover:bg-red-500/10 lg:hover:border-red-500/50 lg:hover:text-red-400 transition-all max-lg:w-8 max-lg:h-8"
              :title="$t('delete_account_tooltip')"
            >
              <Icon
                icon="mdi:trash-can-outline"
                class="w-5 h-5 max-lg:w-4 max-lg:h-4"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div
        v-else
        class="bg-[#241017] border border-[#3b1c23] rounded-lg p-8 text-center max-lg:p-6"
      >
        <div
          class="w-16 h-16 rounded-full bg-[#ff3344]/10 flex items-center justify-center mx-auto mb-4"
        >
          <Icon icon="mdi:bank-off" class="w-8 h-8 text-[#ff3344]" />
        </div>
        <h3 class="font-semibold text-[#f0eaea] mb-2 text-base">
          {{ $t("no_bank_accounts") }}
        </h3>
        <p class="text-sm text-[#b37a7a] mb-4">
          {{ $t("add_bank_account_to_withdraw") }}
        </p>
        <button
          @click="showModal = true"
          class="inline-flex items-center gap-2 bg-[#ff3344] text-white px-4 py-2.5 rounded-lg lg:hover:bg-[#cc2a3a] transition-all text-sm font-medium"
        >
          <Icon icon="mdi:plus" class="w-4 h-4" />
          {{ $t("add_bank_account") }}
        </button>
      </div>
    </div>

    <!-- Add Bank Account Modal -->
    <AddBankAccount
      :isVisible="showModal"
      @close="showModal = false"
      @addAccount="handleAccountAdded"
    />
  </UserAccountLayout>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";

const { alertVisible, alertTitle, alertMessage, alertType, showAlert } =
  useAlert();
const { showConfirmAlert } = useConfirmAlert();
const userData = useState("userData");
const pageLoading = useState("pageLoading");
const showModal = ref(false);
const userbank = useState("userbank", () => []);
const showFullAccount = ref({});
const { get, delete: del } = useApiEndpoint();

const fetchUserBank = async () => {
  try {
    const { data } = await get("getbank");
    if (data.success) {
      userbank.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching banks:", error);
  }
};

function toggleAccountVisibility(accountId) {
  showFullAccount.value[accountId] = !showFullAccount.value[accountId];
}

function formatBankNumber(number) {
  if (!number) return "";
  const maskLength = Math.max(0, number.length - 4);
  return "*".repeat(maskLength) + number.slice(-4);
}

async function confirmRemoveAccount(id) {
  try {
    const confirmed = await showConfirmAlert(
      $t("delete_account"),
      $t("delete_confirmation"),
      "warning"
    );

    if (confirmed) {
      await removeAccount(id);
    }
  } catch (error) {
    console.error("Confirmation error:", error);
  }
}

async function removeAccount(id) {
  try {
    const { data } = await del("userbank", { bankAccountId: id });
    if (data.success) {
      showAlert(
        $t("alert_success"),
        data.message[$locale.value] || $t("account_removed"),
        "success"
      );
      await fetchUserBank();
    } else {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || data.message.en,
        "info"
      );
    }
  } catch (error) {
    console.error("Delete error:", error);
    showAlert(
      "Error",
      error.response?.data?.message?.en || "Delete failed",
      "error"
    );
  }
}

function handleAccountAdded() {
  fetchUserBank();
  showModal.value = false;
}

onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchUserBank();
    if (userbank.value.length === 0) {
      showModal.value = true;
    }
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});
</script>
