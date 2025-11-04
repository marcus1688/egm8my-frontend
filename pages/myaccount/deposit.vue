<template>
  <Teleport to="body">
    <Alerts
      :title="alertTitle"
      :message="alertMessage"
      :isVisible="alertVisible"
      :type="alertType"
      @close="alertVisible = false"
    />
  </Teleport>
  <UserAccountLayout>
    <div class="text-[#f0eaea]">
      <div class="mb-6 max-lg:mb-2">
        <h1 class="text-lg font-bold max-lg:text-base">{{ $t("deposit") }}</h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("add_funds_description") }}
        </p>
      </div>

      <div>
        <div
          v-if="
            userData &&
            userData.luckySpinAmount > 0 &&
            userData.luckySpinClaim === false
          "
          class="bg-green-500/10 border border-green-500/30 text-sm text-[#f0eaea] rounded-lg p-4 max-lg:p-3 mb-4 max-lg:mb-3 relative max-lg:text-xs"
        >
          <div class="flex items-start gap-2 max-lg:gap-1.5">
            <div class="text-green-400 mt-0.5 flex-shrink-0">
              <Icon icon="mdi:gift" class="w-5 h-5 max-lg:w-4 max-lg:h-4" />
            </div>
            <div class="w-full">
              <strong class="text-green-400 block mb-2 max-lg:mb-1.5">{{
                $t("lucky_spin_reward")
              }}</strong>
              <p class="mb-2 max-lg:mb-1.5">
                {{ $t("lucky_spin_waiting_1") }}
                <span class="font-bold text-green-400"
                  >${{ userData.luckySpinAmount }}</span
                >
                {{ $t("lucky_spin_waiting_2") }}
              </p>
              <p class="mb-2 max-lg:mb-1.5">
                {{ $t("claim_instructions_1") }}
                <span class="font-bold text-green-400">$30</span>
                {{ $t("claim_instructions_2") }}
              </p>
              <p class="text-xs max-lg:text-[10px] text-[#b37a7a]">
                {{ $t("turnover_note") }}
              </p>

              <div class="mt-3 max-lg:mt-2">
                <button
                  @click="selectDepositAmount(30)"
                  class="px-4 py-1.5 max-lg:px-3 max-lg:py-1 rounded-lg font-medium transition-all bg-green-600 text-white lg:hover:brightness-110 max-lg:text-xs"
                >
                  {{ $t("deposit_30_now") }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="selectedOption === 'bank_transfer'" class="mb-4">
          <div
            class="bg-red-500/10 border border-red-500/30 text-sm max-lg:text-xs text-[#f0eaea] rounded-lg p-4 max-lg:p-3"
          >
            <div class="flex items-start gap-2">
              <Icon
                icon="mdi:information-outline"
                class="text-red-400 mt-0.5 w-5 h-5 max-lg:w-4 max-lg:h-4 flex-shrink-0"
              />
              <div class="w-full">
                <strong class="text-red-400 block mb-2 max-lg:mb-1.5">{{
                  $t("notice")
                }}</strong>
                <p class="mb-2 max-lg:mb-1.5">
                  {{ $t("bank_transfer_notice_1") }}
                </p>
                <p class="text-[#ff3344] font-medium">
                  {{ $t("bank_transfer_notice_2") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Deposit Type Selection -->
        <div class="mb-6 max-lg:mb-2">
          <label class="block font-semibold mb-2 max-lg:mb-1.5 max-lg:text-sm">
            {{ $t("deposit_method") }}
          </label>
          <div class="flex gap-4 max-lg:gap-2 max-lg:flex-wrap">
            <button
              v-for="option in depositOptions"
              :key="option.name"
              @click="selectOption(option.name)"
              :class="[
                'py-3 px-6 rounded-lg text-center text-sm flex items-center gap-2 transition-colors duration-200 font-medium max-lg:text-xs max-lg:px-4 max-lg:py-2',
                selectedOption === option.name
                  ? 'bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white shadow-lg shadow-red-500/20 border-transparent'
                  : 'bg-[#15090e]/50 text-[#b37a7a] lg:hover:bg-[#15090e]/70 border border-[#3b1c23]',
              ]"
            >
              <Icon :icon="option.icon" class="text-xl max-lg:text-lg" />
              {{ $t(option.label) }}
            </button>
          </div>
        </div>

        <!-- Deposit Amount -->
        <div class="mb-6 max-lg:mb-2">
          <label class="block font-semibold mb-2 max-lg:mb-1.5 max-lg:text-sm">
            {{ $t("deposit_amount") }}
          </label>
          <input
            type="text"
            v-model="selectedDepositAmount"
            :placeholder="$t('amount_placeholder')"
            @input="onlyNumbers"
            class="w-full p-3 max-lg:p-2.5 mb-4 max-lg:mb-3 bg-[#15090e]/50 text-[#f0eaea] rounded-lg placeholder-[#b37a7a] border border-[#3b1c23] focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/50 focus:outline-none max-lg:text-sm"
          />
          <div class="flex gap-2 flex-wrap">
            <button
              v-for="amount in amounts"
              :key="amount"
              @click="selectDepositAmount(amount)"
              :class="[
                'px-4 py-2 max-lg:px-3 max-lg:py-1.5 rounded-lg font-medium transition-colors max-lg:text-xs',
                selectedDepositAmount === amount.toString()
                  ? 'bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white shadow-lg shadow-red-500/20'
                  : 'bg-[#ff3344]/20 text-[#f0eaea] lg:hover:bg-[#ff3344]/30 border border-[#ff3344]/30',
              ]"
            >
              {{ amount }}
            </button>
          </div>
        </div>

        <!-- Bank Transfer Options -->
        <div v-if="selectedOption === 'bank_transfer'" class="mb-6 max-lg:mb-2">
          <label class="block font-semibold mb-2 max-lg:mb-1.5 max-lg:text-sm">
            {{ $t("select_bank") }}
          </label>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-lg:gap-3"
          >
            <div
              v-for="bank in depositbank"
              :key="bank._id"
              @click="selectBank(bank)"
              :class="[
                'flex flex-col p-4 max-lg:p-3 rounded-lg cursor-pointer transition-colors',
                selectedBank && selectedBank.bankaccount === bank.bankaccount
                  ? 'bg-[#ff3344]/20 border-2 border-[#ff3344]'
                  : 'bg-[#15090e]/50 lg:hover:bg-[#ff3344]/10 border border-[#3b1c23]',
              ]"
            >
              <div class="w-full flex justify-center mb-3 max-lg:mb-2">
                <img
                  v-if="bank.qrimage"
                  :src="bank.qrimage"
                  :alt="bank.bankname + ' Logo'"
                  class="w-16 h-auto max-lg:w-12"
                />
                <img
                  v-else
                  src="/images/deposit/bank.png"
                  :alt="bank.bankname + ' Logo'"
                  class="w-16 h-auto max-lg:w-12"
                />
              </div>
              <div class="flex flex-col">
                <p class="text-md font-semibold mb-1 max-lg:text-sm">
                  {{ $t("bank") }}: {{ bank.bankname }}
                </p>
                <p class="text-sm mb-1 max-lg:text-xs text-[#b37a7a]">
                  {{ $t("name") }}: {{ bank.ownername }}
                </p>
                <p
                  class="text-sm flex items-center gap-1 max-lg:text-xs text-[#b37a7a]"
                >
                  {{ $t("account_number") }}: {{ bank.bankaccount }}
                  <button
                    type="button"
                    @click.stop="copyToClipboard(bank.bankaccount)"
                    class="text-[#ff3344] lg:hover:text-[#c21b3a] transition-colors"
                    title="Copy"
                  >
                    <Icon
                      icon="mdi:content-copy"
                      class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
                    />
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Fast Deposit Options -->
        <div
          v-else-if="selectedOption === 'fast_deposit'"
          class="mb-6 max-lg:mb-2"
        >
          <label class="block font-semibold mb-2 max-lg:mb-1.5 max-lg:text-sm">
            {{ $t("deposit_channel") }}
          </label>
          <div class="flex gap-4 max-lg:gap-3 flex-wrap">
            <button
              v-for="gateway in paymentGateways"
              :key="gateway._id"
              @click="selectPaymentGateway(gateway)"
              :class="[
                'py-4 max-lg:py-3 px-6 max-lg:px-4 rounded-lg text-center flex flex-col items-center gap-2 transition-colors',
                selectedPaymentGateway === gateway
                  ? 'bg-[#ff3344]/20 border-2 border-[#ff3344]'
                  : 'bg-[#15090e]/50 lg:hover:bg-[#ff3344]/10 border border-[#3b1c23]',
              ]"
            >
              <img
                v-if="gateway.logo"
                :src="gateway.logo"
                :alt="gateway.name"
                class="w-20 max-lg:w-16 h-auto"
              />
            </button>
          </div>
        </div>

        <!-- DGPay -->
        <div
          v-if="
            selectedOption === 'fast_deposit' &&
            selectedPaymentGateway &&
            selectedPaymentGateway.name === 'DGPay'
          "
          class="mb-6 max-lg:mb-2"
        >
          <label class="block font-semibold mb-2 max-lg:mb-1.5 max-lg:text-sm">
            {{ $t("select_bank_for", { provider: "DGPay" }) }}</label
          >
          <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-lg:gap-2"
          >
            <div
              v-for="bank in dgpayBanks"
              :key="bank.code"
              @click="selectDGPayBank(bank)"
              :class="[
                'p-4 max-lg:p-3 rounded-lg cursor-pointer transition-colors flex flex-col items-center',
                selectedDGPayBank && selectedDGPayBank.code === bank.code
                  ? 'bg-[#ff3344]/20 border-2 border-[#ff3344]'
                  : 'bg-[#15090e]/50 lg:hover:bg-[#ff3344]/10 border border-[#3b1c23]',
              ]"
            >
              <img
                :src="bank.logo"
                :alt="bank.name"
                class="w-16 h-16 max-lg:w-12 max-lg:h-12 object-contain mb-2"
              />
              <p class="text-sm max-lg:text-xs font-medium text-center">
                {{ bank.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- TruePay -->
        <div
          v-if="
            selectedOption === 'fast_deposit' &&
            selectedPaymentGateway &&
            selectedPaymentGateway.name === 'TruePay'
          "
          class="mb-6 max-lg:mb-2"
        >
          <label class="block font-semibold mb-2 max-lg:mb-1.5 max-lg:text-sm">
            {{ $t("select_bank_for", { provider: "TruePay" }) }}</label
          >
          <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-lg:gap-2"
          >
            <div
              v-for="bank in truepayBanks"
              :key="bank.code"
              @click="selectTruePayBank(bank)"
              :class="[
                'p-4 max-lg:p-3 rounded-lg cursor-pointer transition-colors flex flex-col items-center',
                selectedTruePayBank && selectedTruePayBank.code === bank.code
                  ? 'bg-[#ff3344]/20 border-2 border-[#ff3344]'
                  : 'bg-[#15090e]/50 lg:hover:bg-[#ff3344]/10 border border-[#3b1c23]',
              ]"
            >
              <img
                :src="bank.logo"
                :alt="bank.name"
                class="w-16 h-16 max-lg:w-12 max-lg:h-12 object-contain mb-2"
              />
              <p class="text-sm max-lg:text-xs font-medium text-center">
                {{ bank.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- LuxePay -->
        <div
          v-if="
            selectedOption === 'fast_deposit' &&
            selectedPaymentGateway &&
            selectedPaymentGateway.name === 'LuxePay'
          "
          class="mb-6 max-lg:mb-2"
        >
          <label class="block font-semibold mb-2 max-lg:mb-1.5 max-lg:text-sm">
            {{ $t("select_bank_for", { provider: "LuxePay" }) }}</label
          >
          <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-lg:gap-2"
          >
            <div
              v-for="bank in luxepayBanks"
              :key="bank.code"
              @click="selectLuxePayBank(bank)"
              :class="[
                'p-4 max-lg:p-3 rounded-lg cursor-pointer transition-colors flex flex-col items-center',
                selectedLuxePayBank && selectedLuxePayBank.code === bank.code
                  ? 'bg-[#ff3344]/20 border-2 border-[#ff3344]'
                  : 'bg-[#15090e]/50 lg:hover:bg-[#ff3344]/10 border border-[#3b1c23]',
              ]"
            >
              <img
                :src="bank.logo"
                :alt="bank.name"
                class="w-16 h-16 max-lg:w-12 max-lg:h-12 object-contain mb-2"
              />
              <p class="text-sm max-lg:text-xs font-medium text-center">
                {{ bank.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- SKL99 -->
        <div
          v-if="
            selectedOption === 'fast_deposit' &&
            selectedPaymentGateway &&
            selectedPaymentGateway.name === 'SKL99'
          "
          class="mb-6 max-lg:mb-2"
        >
          <label class="block font-semibold mb-2 max-lg:mb-1.5 max-lg:text-sm">
            {{ $t("select_bank_for", { provider: "SKL99" }) }}</label
          >
          <div
            class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-lg:gap-2"
          >
            <div
              v-for="bank in skl99Banks"
              :key="bank.code"
              @click="selectSKL99Bank(bank)"
              :class="[
                'p-4 max-lg:p-3 rounded-lg cursor-pointer transition-colors flex flex-col items-center',
                selectedSKL99Bank && selectedSKL99Bank.code === bank.code
                  ? 'bg-[#ff3344]/20 border-2 border-[#ff3344]'
                  : 'bg-[#15090e]/50 lg:hover:bg-[#ff3344]/10 border border-[#3b1c23]',
              ]"
            >
              <img
                :src="bank.logo"
                :alt="bank.name"
                class="w-16 h-16 max-lg:w-12 max-lg:h-12 object-contain mb-2"
              />
              <p class="text-sm max-lg:text-xs font-medium text-center">
                {{ bank.name }}
              </p>
            </div>
          </div>
        </div>

        <!-- Promotion Selection -->
        <div class="mb-6 max-lg:mb-2">
          <label class="block font-semibold mb-2 max-lg:mb-1.5 max-lg:text-sm">
            {{ $t("promotion_optional") }}
          </label>
          <CustomSelect v-model="selectedPromotion">
            <option
              :value="null"
              disabled
              selected
              class="bg-[#241017] text-[#b37a7a]"
            >
              {{ $t("select_promotion") }}
            </option>
            <option value="" class="bg-[#241017] text-[#f0eaea]">
              {{ $t("without_promotion") }}
            </option>
            <option
              v-for="promotion in promotionlist"
              :key="promotion._id"
              :value="promotion"
              class="bg-[#241017] text-[#f0eaea]"
            >
              {{ promotion.maintitleEN }}
            </option>
          </CustomSelect>
        </div>

        <!-- Receipt Upload -->
        <div v-if="selectedOption === 'bank_transfer'" class="mb-6 max-lg:mb-2">
          <label class="block font-semibold mb-2 max-lg:mb-1.5 max-lg:text-sm">
            {{ $t("upload_receipt") }}
          </label>
          <div
            class="flex flex-col items-center justify-center p-6 max-lg:p-4 border-2 border-dashed border-[#3b1c23] rounded-lg bg-[#15090e]/30 cursor-pointer lg:hover:bg-[#ff3344]/10 transition-colors"
            @click="$refs.fileInput.click()"
          >
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              @change="handleFileUpload"
              accept="image/*"
            />

            <div v-if="!receipt" class="text-center">
              <Icon
                icon="mdi:cloud-upload"
                class="w-12 h-12 max-lg:w-8 max-lg:h-8 mx-auto mb-2 text-[#b37a7a]"
              />
              <p class="text-[#b37a7a] max-lg:text-sm">
                {{ $t("upload_receipt") }}
              </p>
            </div>

            <div v-else class="w-full relative">
              <img
                :src="receiptPreview"
                class="w-full h-40 max-lg:h-32 object-contain rounded-lg"
              />
              <button
                @click.stop="removeReceipt"
                class="absolute top-2 right-2 bg-red-500 rounded-full p-1 lg:hover:bg-red-600 transition-colors"
              >
                <Icon
                  icon="mdi:close"
                  class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-white"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <LoadingButton
          :loading="depositButtonLoading"
          @click="submitDeposit"
          class="w-full py-3 max-lg:py-2.5 uppercase bg-gradient-to-r from-[#a1122d] to-[#c21b3a] lg:hover:brightness-110 rounded-lg text-lg max-lg:text-base font-semibold text-white transition-all shadow-lg shadow-red-500/20"
        >
          {{ $t("submit") }}
        </LoadingButton>

        <!-- Important Notice -->
        <div
          class="bg-red-500/10 border border-red-500/30 text-sm max-lg:text-xs text-[#f0eaea] rounded-lg p-4 max-lg:p-3 mt-8 max-lg:mt-4 relative"
        >
          <div class="flex items-start gap-2">
            <Icon
              icon="mdi:alert-circle-outline"
              class="text-red-400 mt-0.5 w-5 h-5 max-lg:w-4 max-lg:h-4"
            />
            <div class="w-full">
              <strong class="text-red-400 block mb-2 max-lg:mb-1.5">{{
                $t("important_notice")
              }}</strong>
              <ul
                class="list-disc ml-5 max-lg:ml-4 space-y-1 max-lg:space-y-0.5"
              >
                <li>
                  {{ $t("notice_1") }}
                </li>
                <li>{{ $t("notice_2") }}</li>
                <template v-if="showFullNotice">
                  <li>
                    {{ $t("notice_3") }}
                  </li>
                  <li>
                    {{ $t("notice_4") }}
                  </li>
                  <li>
                    {{ $t("notice_5") }}
                  </li>
                  <li>
                    {{ $t("notice_6") }}
                  </li>
                  <li>
                    {{ $t("notice_7_1") }}
                    <strong class="text-red-300">{{ $t("notice_7_2") }}</strong>
                    {{ $t("notice_7_3") }}
                  </li>
                </template>
              </ul>

              <div class="text-right mt-2">
                <button
                  class="text-[#ff3344] lg:hover:underline text-sm max-lg:text-xs transition-colors"
                  @click="showFullNotice = !showFullNotice"
                >
                  {{ showFullNotice ? $t("show_less") : $t("show_more") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UserAccountLayout>
</template>

<script setup>
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";
import { Icon } from "@iconify/vue";

const { checkAuth } = useAuthCheck();
await checkAuth();
const userData = useState("userData");
const showFullNotice = ref(false);
const pageLoading = useState("pageLoading");
const depositbank = ref([]);
const promotionlist = ref([]);
const fileInput = ref(null);
const receipt = ref(null);
const receiptPreview = ref("");
const selectedPromotion = ref(null);
const depositButtonLoading = ref(false);
const paymentGateways = ref([]);
const selectedPaymentGateway = ref(null);
let gameTotalBalances = ref(0);

const alertVisible = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");
const alertType = ref("");

const { get, post } = useApiEndpoint();

const depositOptions = [
  { name: "fast_deposit", label: "fast_deposit", icon: "mdi:flash" },
  { name: "bank_transfer", label: "bank_transfer", icon: "mdi:bank" },
];

const selectedOption = ref("fast_deposit");
const selectedDepositAmount = ref("");
const selectedBank = ref(null);
const amounts = [50, 100, 500, 1000, 3000];

function selectOption(option) {
  selectedOption.value = option;
  if (option === "fast_deposit" && paymentGateways.value.length > 0) {
    selectPaymentGateway(paymentGateways.value[0]);
  }
}

function selectDepositAmount(amount) {
  selectedDepositAmount.value = amount.toString();
}

function selectBank(bank) {
  selectedBank.value = bank;
}

function selectPaymentGateway(gateway) {
  selectedPaymentGateway.value = gateway;
}

function onlyNumbers() {
  selectedDepositAmount.value = selectedDepositAmount.value.replace(/\D/g, "");
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  receipt.value = file;
  const reader = new FileReader();
  reader.onload = (e) => (receiptPreview.value = e.target.result);
  reader.readAsDataURL(file);
}

function removeReceipt() {
  receipt.value = null;
  receiptPreview.value = "";
  if (fileInput.value) fileInput.value.value = "";
}

function resetForm() {
  selectedOption.value = "bank_transfer";
  selectedDepositAmount.value = "";
  selectedBank.value = null;
  receipt.value = null;
  receiptPreview.value = "";
  selectedPromotion.value = null;
  selectedPaymentGateway.value = null;
  selectedDGPayBank.value = null;
  selectedTruePayBank.value = null;
  selectedLuxePayBank.value = null;
  selectedSKL99Bank.value = null;
  if (fileInput.value) fileInput.value.value = "";
}

function showAlert(title, message, type = "info") {
  alertTitle.value = title;
  alertMessage.value = message;
  alertType.value = type;
  alertVisible.value = true;
}

function validateDepositForm() {
  if (!selectedDepositAmount.value) {
    showAlert($t("alert_info"), $t("please_enter_amount"));
    return false;
  }

  if (selectedOption.value === "bank_transfer") {
    if (!selectedBank.value) {
      showAlert($t("alert_info"), $t("please_select_bank"));
      return false;
    }

    if (!receipt.value) {
      showAlert($t("alert_info"), $t("please_upload_receipt"));
      return false;
    }
  } else if (selectedOption.value === "fast_deposit") {
    if (!selectedPaymentGateway.value) {
      showAlert($t("alert_info"), $t("please_select_payment_gateway"));
      return false;
    }
  }

  return true;
}

async function submitBonus(depositId) {
  try {
    const { data } = await post("client/submitdepositbonus", {
      promotionId: selectedPromotion.value._id,
      depositAmount: selectedDepositAmount.value,
      depositId: depositId,
    });
    if (!data.success) {
      showAlert(
        $t("alert_info"),
        data.message[$locale.value] || "Bonus submission failed"
      );
    }
  } catch (error) {
    console.error("Failed to submit bonus:", error);
  }
}

async function submitDeposit() {
  if (!validateDepositForm()) return;

  const amount = Number(selectedDepositAmount.value);
  if (isNaN(amount) || !amount) {
    showAlert($t("alert_info"), $t("please_enter_valid_amount"));
    return;
  }

  if (selectedOption.value === "fast_deposit") {
    try {
      const restrictionCheck = await get(`check-fast-deposit-restriction`);
      if (
        restrictionCheck.data.success &&
        restrictionCheck.data.hasRestriction &&
        userData.value.wallet + gameTotalBalances >= 10
      ) {
        showAlert(
          $t("alert_info"),
          $t("fast_deposit_balance_restriction"),
          "info"
        );
        return;
      }
    } catch (error) {
      console.error("Error checking fast deposit restriction:", error);
      if (userData.value && userData.value.wallet + gameTotalBalances >= 10) {
        showAlert(
          $t("alert_info"),
          $t("fast_deposit_balance_restriction"),
          "info"
        );
        return;
      }
    }
  }

  if (selectedPromotion.value) {
    try {
      const checkResponse = await post("client/checkpromotion", {
        promotionId: selectedPromotion.value._id,
        depositAmount: Number(selectedDepositAmount.value),
      });

      if (!checkResponse.data.success) {
        showAlert(
          $t("alert_info"),
          checkResponse.data.message[$locale.value] ||
            checkResponse.data.message.en
        );
        return;
      }
    } catch (error) {
      console.error("Error checking promotion:", error);
      showAlert(
        "Error",
        error.response?.data?.message?.[$locale.value] ||
          error.response?.data?.message?.en ||
          $t("network_error"),
        "error"
      );
      return;
    }
  }

  depositButtonLoading.value = true;

  try {
    if (selectedOption.value === "fast_deposit") {
      const { minDeposit, maxDeposit } = selectedPaymentGateway.value;
      if (amount < minDeposit || amount > maxDeposit) {
        showAlert(
          $t("alert_info"),
          $t("amount_between", { min: minDeposit, max: maxDeposit })
        );
        return;
      }

      if (selectedPaymentGateway.value.name === "DGPay") {
        if (!selectedDGPayBank.value) {
          showAlert(
            $t("alert_info"),
            $t("please_select_bank_for", { provider: "DGPay" })
          );
          return;
        }
      } else if (selectedPaymentGateway.value.name === "TruePay") {
        if (!selectedTruePayBank.value) {
          showAlert(
            $t("alert_info"),
            $t("please_select_bank_for", { provider: "TruePay" })
          );
          return;
        }

        if (
          (selectedTruePayBank.value.code === "FPX" ||
            selectedTruePayBank.value.code === "FPXDUITNOW") &&
          amount < 100
        ) {
          showAlert($t("alert_info"), $t("fpx_alert_warning"));
          return;
        }
      } else if (selectedPaymentGateway.value.name === "LuxePay") {
        if (!selectedLuxePayBank.value) {
          showAlert(
            $t("alert_info"),
            $t("please_select_bank_for", { provider: "LuxePay" })
          );
          return;
        }
      } else if (selectedPaymentGateway.value.name === "SKL99") {
        if (!selectedSKL99Bank.value) {
          showAlert(
            $t("alert_info"),
            $t("please_select_bank_for", { provider: "SKL99" })
          );
          return;
        }
      }

      const requestParams = { trfAmt: amount };

      if (selectedPromotion.value) {
        requestParams.promotionId = selectedPromotion.value._id;
      }

      if (selectedPaymentGateway.value.name === "DGPay") {
        requestParams.bankCode = selectedDGPayBank.value.code;
      } else if (selectedPaymentGateway.value.name === "TruePay") {
        requestParams.bankCode = selectedTruePayBank.value.code;
      } else if (selectedPaymentGateway.value.name === "LuxePay") {
        requestParams.bankCode = selectedLuxePayBank.value.code;
      } else if (selectedPaymentGateway.value.name === "SKL99") {
        requestParams.bankCode = selectedSKL99Bank.value.code;
      }

      const { data } = await post(
        selectedPaymentGateway.value.paymentAPI,
        requestParams
      );

      if (data.success && data.url) {
        window.open(data.url, "_blank");
        // if (selectedPromotion.value) await submitBonus(data.depositId);
        resetForm();
      } else {
        showAlert(
          $t("alert_info"),
          data.message[$locale.value] || data.message.en,
          "info"
        );
      }
    } else {
      const formData = new FormData();
      formData.append("bankname", selectedBank.value.bankname);
      formData.append("ownername", selectedBank.value.ownername);
      formData.append("transferNumber", selectedBank.value.bankaccount);
      formData.append("bankid", selectedBank.value._id);
      formData.append("depositAmount", selectedDepositAmount.value);
      formData.append("receipt", receipt.value);

      const { data } = await post("deposit", formData);

      if (!data.success) {
        showAlert(
          $t("alert_info"),
          data.message[$locale.value] || "Deposit failed"
        );
        return;
      }

      if (selectedPromotion.value) await submitBonus(data.depositId);

      showAlert(
        $t("alert_success"),
        data.message[$locale.value] || $t("deposit_successful"),
        "success"
      );
      resetForm();
    }
  } catch (error) {
    console.error("Deposit error:", error);
    showAlert(
      "Error",
      error.response?.data?.message?.en || "Network error occurred",
      "error"
    );
  } finally {
    depositButtonLoading.value = false;
  }
}

const fetchDepositBank = async () => {
  try {
    const { data } = await get("client/banklist");
    if (data.success) {
      depositbank.value = data.data;
    }
  } catch (error) {
    console.error("Error fetching banks:", error);
  }
};

const fetchPromotionList = async () => {
  try {
    const { data } = await get("getdepositpromotion");
    if (data.success) promotionlist.value = data.data;
  } catch (error) {
    console.error("Error fetching promotions:", error);
  }
};

const fetchPaymentGateways = async () => {
  try {
    const { data } = await get("payment-gateways");
    if (data.success) paymentGateways.value = data.data;
  } catch (error) {
    console.error("Error fetching payment gateways:", error);
  }
};

function getPlaceholderText() {
  if (selectedOption.value === "fast_deposit" && selectedPaymentGateway.value) {
    return `Min: ${selectedPaymentGateway.value.minDeposit}, Max: ${selectedPaymentGateway.value.maxDeposit}`;
  }
  return "Enter deposit amount";
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      showAlert($t("alert_success"), $t("account_number_copied"), "success");
    })
    .catch(() => {
      showAlert($t("alert_error"), $t("failed_to_copy"), "error");
    });
}

// const selectedDGPayBank = ref(null);
// const dgpayBanks = [
//   { name: "Maybank", code: "MAYB", logo: "maybank.png" },
//   { name: "CIMB", code: "CIMB", logo: "cimb.png" },
//   { name: "Public Bank", code: "PBBB", logo: "publicbank.png" },
//   { name: "RHB", code: "RHBB", logo: "rhb.png" },
//   { name: "Hong Leong", code: "HOLB", logo: "hongleong.png" },
//   { name: "Affin", code: "AFIN", logo: "affinbank.png" },
//   { name: "Bank Simpanan Nasional", code: "SINA", logo: "bsn.png" },
// ];

// const selectedTruePayBank = ref(null);
// const truepayBanks = [
//   { name: "Maybank", code: "MBB", logo: "maybank.png" },
//   { name: "FPX", code: "FPX", logo: "fpxlogoact.png" },
//   { name: "DuitNow", code: "FPXDUITNOW", logo: "fpxqr.png" },
//   { name: "CIMB", code: "CIMB", logo: "cimb.png" },
//   { name: "Public Bank", code: "PBB", logo: "publicbank.png" },
//   { name: "Alliance Bank", code: "ALLIANCE", logo: "alliance.png" },
//   { name: "Agrobank", code: "AGRO", logo: "agro.png" },
//   { name: "AmBank", code: "AMBANK", logo: "ambank.png" },
//   // { name: "Boost Bank", code: "BOOST", logo: "boost.png" },
//   // { name: "Touch 'n Go'", code: "TNGQR", logo: "tng.png" },
//   // { name: "UOB Bank", code: "UOBM", logo: "uob.png" },
//   { name: "RHB", code: "RHB", logo: "rhb.png" },
//   { name: "Hong Leong", code: "HLB", logo: "hongleong.png" },
//   { name: "Bank Simpanan Nasional", code: "BSN", logo: "bsn.png" },
// ];

// const selectedLuxePayBank = ref(null);
// const luxepayBanks = [
//   { name: "Maybank", code: "MB2U", logo: "maybank.png" },
//   { name: "CIMB", code: "CIMB", logo: "cimb.png" },
//   // { name: "Public Bank", code: "PBB", logo: "publicbank.png" },
//   { name: "Alliance Bank", code: "ABMB", logo: "alliance.png" },
//   // { name: "Agrobank", code: "AGRO", logo: "agro.png" },
//   { name: "AmBank", code: "AMBB", logo: "ambank.png" },
//   // { name: "Boost Bank", code: "BOOST", logo: "boost.png" },
//   { name: "Affin", code: "AFBB", logo: "affinbank.png" },
//   { name: "Bank Islam", code: "BIMB", logo: "bim.png" },
//   { name: "OCBC", code: "OCBC", logo: "ocbc.png" },
//   { name: "RHB", code: "RHBB", logo: "rhb.png" },
//   { name: "Hong Leong", code: "HLBB", logo: "hongleong.png" },
//   { name: "Bank Simpanan Nasional", code: "BSNB", logo: "bsn.png" },
// ];

// const selectedSKL99Bank = ref(null);
// const skl99Banks = [
//   { name: "Maybank", code: "MAYBANK", logo: "maybank.png" },
//   { name: "CIMB", code: "CIMB", logo: "cimb.png" },
//   // { name: "Public Bank", code: "PBB", logo: "publicbank.png" },
//   // { name: "Alliance Bank", code: "ABMB", logo: "alliance.png" },
//   // { name: "Agrobank", code: "AGRO", logo: "agro.png" },
//   { name: "AmBank", code: "AMBANK", logo: "ambank.png" },
//   { name: "Public Bank", code: "PUBLIC_BANK", logo: "publicbank.png" },
//   { name: "Bank Islam", code: "BANK_ISLAM", logo: "bim.png" },
//   // { name: "Boost Bank", code: "BOOST", logo: "boost.png" },
//   // { name: "Affin", code: "AFBB", logo: "affinbank.png" },
//   // { name: "Bank Islam", code: "BIMB", logo: "bim.png" },
//   // { name: "OCBC", code: "OCBC", logo: "ocbc.png" },
//   { name: "RHB", code: "RHB", logo: "rhb.png" },
//   { name: "Hong Leong", code: "HLB", logo: "hongleong.png" },
//   // { name: "Bank Simpanan Nasional", code: "BSNB", logo: "bsn.png" },
// ];

const selectedDGPayBank = ref(null);
const dgpayBanks = computed(() => {
  const dgpay = paymentGateways.value.find((g) => g.name === "DGPay");
  return (
    dgpay?.banks
      ?.filter((bank) => bank.active)
      .map((bank) => ({
        name: bank.bankname,
        code: bank.bankcode,
        logo: bank.bankimage,
      })) || []
  );
});

const selectedTruePayBank = ref(null);
const truepayBanks = computed(() => {
  const truepay = paymentGateways.value.find((g) => g.name === "TruePay");
  return (
    truepay?.banks
      ?.filter((bank) => bank.active)
      .map((bank) => ({
        name: bank.bankname,
        code: bank.bankcode,
        logo: bank.bankimage,
      })) || []
  );
});

const selectedLuxePayBank = ref(null);
const luxepayBanks = computed(() => {
  const luxepay = paymentGateways.value.find((g) => g.name === "LuxePay");
  return (
    luxepay?.banks
      ?.filter((bank) => bank.active)
      .map((bank) => ({
        name: bank.bankname,
        code: bank.bankcode,
        logo: bank.bankimage,
      })) || []
  );
});

const selectedSKL99Bank = ref(null);
const skl99Banks = computed(() => {
  const skl99 = paymentGateways.value.find((g) => g.name === "SKL99");
  return (
    skl99?.banks
      ?.filter((bank) => bank.active)
      .map((bank) => ({
        name: bank.bankname,
        code: bank.bankcode,
        logo: bank.bankimage,
      })) || []
  );
});

function selectDGPayBank(bank) {
  selectedDGPayBank.value = bank;
}

function selectTruePayBank(bank) {
  selectedTruePayBank.value = bank;
}

function selectLuxePayBank(bank) {
  selectedLuxePayBank.value = bank;
}

function selectSKL99Bank(bank) {
  selectedSKL99Bank.value = bank;
}

const fetchAllGameBalances = async () => {
  try {
    const { data } = await post("game/checkallgamebalance");
    if (data.success) {
      gameTotalBalances = data.totalBalance;
    }
  } catch (error) {
    console.error("Error fetching game balances:", error);
  }
};

onMounted(async () => {
  pageLoading.value = true;
  try {
    await Promise.all([
      fetchDepositBank(),
      fetchPromotionList(),
      fetchPaymentGateways(),
      fetchAllGameBalances(),
    ]);
    if (
      selectedOption.value === "fast_deposit" &&
      paymentGateways.value.length > 0
    ) {
      selectPaymentGateway(paymentGateways.value[0]);
    }
  } catch (error) {
    console.error("Error loading initial data:", error);
  } finally {
    pageLoading.value = false;
  }
});
</script>
