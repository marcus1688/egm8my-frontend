<template>
  <UserAccountLayout>
    <div class="bg-white rounded-md">
      <div
        class="flex justify-between items-center mb-6 max-lg:mb-4 max-lg:flex-col max-lg:items-start max-lg:gap-3"
      >
        <div>
          <h1 class="text-lg font-bold max-lg:text-base">
            {{ $t("bank_accounts") }}
          </h1>
          <p class="text-gray-500 text-sm max-lg:text-xs">
            {{ $t("manage_bank_accounts") }}
          </p>
        </div>
        <button
          class="bg-blue-600 text-white px-4 py-2 max-lg:px-3 max-lg:py-1.5 rounded-md lg:hover:bg-blue-700 transition max-lg:text-sm"
          @click="showModal = true"
        >
          {{ $t("add_bank_account") }}
        </button>
      </div>

      <div>
        <div
          v-if="userbank.length"
          class="grid grid-cols-2 max-lg:grid-cols-1 gap-4 max-lg:gap-3"
        >
          <div
            v-for="bank in userbank"
            :key="bank._id"
            class="bg-white shadow-md lg:hover:shadow-lg border border-gray-100 rounded-xl p-6 max-lg:p-4 relative transition-all duration-300 overflow-hidden group"
          >
            <div class="flex justify-between items-start relative z-10">
              <div>
                <div class="flex items-center mb-3 max-lg:mb-2">
                  <div
                    class="w-8 h-8 max-lg:w-7 max-lg:h-7 rounded-full bg-blue-50 flex items-center justify-center mr-3 max-lg:mr-2"
                  >
                    <Icon
                      icon="mdi:bank"
                      class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5 text-blue-600"
                    />
                  </div>
                  <h2
                    class="text-base max-lg:text-sm font-semibold text-gray-800"
                  >
                    {{ bank.bankname }}
                  </h2>
                </div>

                <div class="mt-2 max-lg:mt-1.5 pl-11 max-lg:pl-9">
                  <p class="text-sm max-lg:text-xs text-gray-600 font-mono">
                    <span>
                      {{
                        showFullAccount[bank._id]
                          ? bank.banknumber
                          : formatBankNumber(bank.banknumber)
                      }}
                    </span>
                    <button
                      @click="toggleAccountVisibility(bank._id)"
                      class="ml-2 text-blue-600 text-xs max-lg:text-[10px] lg:hover:text-blue-800 lg:hover:underline transition-colors duration-200"
                    >
                      <span class="flex items-center">
                        <Icon
                          :icon="
                            showFullAccount[bank._id]
                              ? 'mdi:eye-off'
                              : 'mdi:eye'
                          "
                          class="w-3 h-3 max-lg:w-2.5 max-lg:h-2.5 mr-1"
                        />
                        {{
                          showFullAccount[bank._id] ? $t("hide") : $t("show")
                        }}
                      </span>
                    </button>
                  </p>
                </div>
              </div>
              <button
                @click="confirmRemoveAccount(bank._id)"
                class="w-8 h-8 hidden max-lg:w-7 max-lg:h-7 rounded-full items-center justify-center bg-white lg:hover:bg-red-50 text-gray-400 lg:hover:text-red-600 transition-all duration-200 border border-transparent lg:hover:border-red-100"
                :title="$t(`delete_account_tooltip`)"
              >
                <Icon
                  icon="mdi:trash-can-outline"
                  class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
                />
              </button>
            </div>

            <div
              class="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-70"
            ></div>
          </div>
        </div>

        <p v-else class="text-gray-500 max-lg:text-sm">
          {{ $t("no_bank_accounts") }}
        </p>
      </div>
    </div>

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
const {
  isConfirmAlertVisible,
  confirmAlertTitle,
  confirmAlertMessage,
  confirmAlertType,
  showConfirmAlert,
  closeConfirmAlert,
} = useConfirmAlert();
const userData = useState("userData");
const pageLoading = useState("pageLoading");
const showModal = ref(false);
const userbank = useState("userbank", () => []);
const showFullAccount = ref({});
const { get, delete: del } = useApiEndpoint();
const pendingDeleteId = ref(null);

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
        data.message?.en || $t("account_removed"),
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
