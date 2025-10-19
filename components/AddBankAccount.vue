<template>
  <div
    v-if="isVisible"
    class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 max-lg:px-2"
    @click.self="close"
  >
    <div class="bg-white rounded-lg p-6 w-full max-w-md relative max-lg:p-4">
      <h2 class="text-lg font-semibold text-gray-800 mb-4 max-lg:text-base">
        {{ $t("add_bank_account") }}
      </h2>

      <div class="flex flex-col gap-4 mb-4">
        <div>
          <label class="block font-medium text-gray-700 mb-1 max-lg:text-sm">{{
            $t("name")
          }}</label>
          <input
            type="text"
            :value="userData.fullname"
            disabled
            readonly
            class="w-full border border-gray-300 bg-gray-100 rounded-md p-2 text-gray-700 cursor-not-allowed uppercase font-semibold max-lg:text-sm"
          />
        </div>

        <div>
          <label class="block font-medium text-gray-700 mb-1 max-lg:text-sm">{{
            $t("bank_name")
          }}</label>
          <select
            v-model="accountData.bankName"
            class="w-full border border-gray-300 bg-white rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200 max-lg:text-sm"
          >
            <option value="" disabled selected>{{ $t("select_bank") }}</option>
            <option
              v-for="bank in banklist"
              :key="bank._id"
              :value="bank.bankname"
            >
              {{ bank.bankname }}
            </option>
          </select>
        </div>

        <div>
          <label class="block font-medium text-gray-700 mb-1 max-lg:text-sm">{{
            $t("account_number")
          }}</label>
          <input
            v-model="accountData.accountNumber"
            @input="onlyNumbers"
            type="text"
            :placeholder="$t('enter_account_number')"
            class="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200 max-lg:text-sm"
          />
        </div>

        <div
          class="flex items-start gap-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3"
        >
          <Icon
            icon="mdi:alert-circle-outline"
            class="w-5 h-5 mt-0.5 text-red-500"
          />
          <span class="font-medium">
            {{ $t("name_restriction_1") }}
            <strong>{{ $t("name_restriction_2") }}</strong>
            {{ $t("name_restriction_3") }}
          </span>
        </div>
      </div>

      <div class="flex justify-end gap-3">
        <button
          @click="close"
          class="px-4 py-2 rounded-md border text-gray-700 lg:hover:bg-gray-100"
        >
          {{ $t("cancel") }}
        </button>
        <button
          @click="confirmAdd"
          :disabled="addWithdrawBankButtonLoading"
          class="px-4 py-2 rounded-md bg-blue-600 text-white lg:hover:bg-blue-700 disabled:opacity-50"
        >
          {{ $t("confirm") }}
        </button>
      </div>

      <button
        @click="close"
        class="absolute top-3 right-3 text-gray-400 lg:hover:text-gray-600"
      >
        <Icon icon="mdi:close" class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";
const pageLoading = useState("pageLoading");
const { get, post } = useApiEndpoint();
const addWithdrawBankButtonLoading = ref(false);
const banklist = ref([]);
const userData = useState("userData");
const userbank = useState("userbank");
const { alertVisible, alertTitle, alertMessage, alertType, showAlert } =
  useAlert();

const props = defineProps({
  isVisible: Boolean,
});
const emits = defineEmits(["close", "addAccount"]);

const accountData = ref({
  bankName: "",
  accountNumber: "",
});

function close() {
  emits("close");
}

async function confirmAdd() {
  if (!accountData.value.bankName || !accountData.value.accountNumber) {
    showAlert($t("alert_info"), $t("fields_required"));
    return;
  }

  if (isNaN(Number(accountData.value.accountNumber))) {
    showAlert($t("alert_info"), $t("numeric_account_number"));
    return;
  }

  addWithdrawBankButtonLoading.value = true;
  try {
    const { data } = await post("addbank", {
      name: userData.value.fullname,
      bankname: accountData.value.bankName,
      banknumber: accountData.value.accountNumber,
    });
    if (data.success) {
      showAlert(
        $t("alert_success"),
        data.message?.en || $t("bank_added"),
        "success"
      );
      emits("addAccount");
      resetForm();
    } else {
      showAlert("Info", data.message?.en || $t("failed_to_add"), "info");
    }
  } catch (error) {
    showAlert(
      $t("alert_error"),
      error.response?.data?.message?.en || $t("add_failed"),
      "error"
    );
  } finally {
    addWithdrawBankButtonLoading.value = false;
  }
}

function resetForm() {
  accountData.value.bankName = "";
  accountData.value.accountNumber = "";
}

const onlyNumbers = () => {
  accountData.value.accountNumber = accountData.value.accountNumber.replace(
    /\D/g,
    ""
  );
};

const fetchBankList = async () => {
  try {
    const { data } = await get("client/activebanknames");
    if (data.success) {
      banklist.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching bank list:", error);
  }
};

onMounted(async () => {
  pageLoading.value = true;
  try {
    await fetchBankList();
  } catch (error) {
    console.error("Error during initialization:", error);
  } finally {
    pageLoading.value = false;
  }
});
</script>

<style scoped></style>
