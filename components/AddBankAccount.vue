<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 max-lg:px-2"
      @click.self="close"
    >
      <div
        class="bg-[#241017]/95 backdrop-blur-sm rounded-xl shadow-2xl shadow-red-500/20 border border-[#3b1c23] p-6 w-full max-w-md relative max-lg:p-4"
      >
        <h2 class="text-lg font-semibold text-[#f0eaea] mb-4 max-lg:text-base">
          {{ $t("add_bank_account") }}
        </h2>
        <div class="flex flex-col gap-4 mb-4">
          <div>
            <label
              class="block font-medium text-[#f0eaea] mb-1 max-lg:text-sm"
              >{{ $t("name") }}</label
            >
            <input
              type="text"
              :value="userData.fullname"
              disabled
              readonly
              class="w-full border border-[#3b1c23] bg-[#15090e]/50 rounded-lg p-2 text-[#b37a7a] cursor-not-allowed uppercase font-semibold max-lg:text-sm focus:outline-none"
            />
          </div>
          <div>
            <label
              class="block font-medium text-[#f0eaea] mb-1 max-lg:text-sm"
              >{{ $t("bank_name") }}</label
            >
            <CustomSelect v-model="accountData.bankName">
              <option
                value=""
                disabled
                selected
                class="bg-[#241017] text-[#b37a7a]"
              >
                {{ $t("select_bank") }}
              </option>
              <option
                v-for="bank in banklist"
                :key="bank._id"
                :value="bank.bankname"
                class="bg-[#241017] text-[#f0eaea]"
              >
                {{ bank.bankname }}
              </option>
            </CustomSelect>
          </div>
          <div>
            <label
              class="block font-medium text-[#f0eaea] mb-1 max-lg:text-sm"
              >{{ $t("account_number") }}</label
            >
            <input
              v-model="accountData.accountNumber"
              @input="onlyNumbers"
              type="text"
              :placeholder="$t('enter_account_number')"
              class="w-full border border-[#3b1c23] bg-[#15090e]/50 text-[#f0eaea] placeholder-[#b37a7a] rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#ff3344]/50 focus:border-[#ff3344] max-lg:text-sm"
            />
          </div>
          <div
            class="flex items-start gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-lg p-3"
          >
            <Icon
              icon="mdi:alert-circle-outline"
              class="w-5 h-5 mt-0.5 text-red-400"
            />
            <span class="font-medium">
              {{ $t("name_restriction_1") }}
              <strong class="text-red-200">{{
                $t("name_restriction_2")
              }}</strong>
              {{ $t("name_restriction_3") }}
            </span>
          </div>
        </div>
        <div class="flex justify-end gap-3">
          <button
            @click="close"
            class="px-4 py-2 rounded-lg border border-[#3b1c23] text-[#b37a7a] lg:hover:bg-[#15090e]/50 lg:hover:text-[#f0eaea] transition-all"
          >
            {{ $t("cancel") }}
          </button>
          <button
            @click="confirmAdd"
            :disabled="addWithdrawBankButtonLoading"
            class="px-4 py-2 rounded-lg bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white lg:hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {{ $t("confirm") }}
          </button>
        </div>
        <button
          @click="close"
          class="absolute top-3 right-3 text-[#b37a7a] lg:hover:text-[#f0eaea] transition-colors"
        >
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div></div
  ></Teleport>
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
        data.message[$locale.value] || $t("bank_added"),
        "success"
      );
      emits("addAccount");
      resetForm();
    } else {
      showAlert(
        "Info",
        data.message[$locale.value] || $t("failed_to_add"),
        "info"
      );
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
