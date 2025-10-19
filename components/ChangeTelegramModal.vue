<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] max-lg:px-4"
    @click.self="emitClose"
  >
    <div
      class="bg-white text-gray-800 rounded-lg w-1/3 p-6 shadow-lg transform transition-transform scale-95 max-lg:w-full max-lg:p-4"
      role="dialog"
      aria-modal="true"
    >
      <!-- Title Bar -->
      <div
        class="flex justify-between items-center mb-4 border-b border-gray-200 pb-2"
      >
        <h2 class="text-xl font-semibold">{{ $t("change_telegram_id") }}</h2>
        <button @click="emitClose" class="text-gray-500 lg:hover:text-gray-700">
          <Icon icon="mdi:close" class="w-5 h-5" />
        </button>
      </div>
      <!-- Input Field -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t("new_telegram_id") }}</label
        >
        <div class="relative">
          <span
            v-if="!newTelegramId.startsWith('@') && newTelegramId.length > 0"
            class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            @
          </span>
          <input
            type="text"
            v-model="newTelegramId"
            :placeholder="$t('enter_telegram_id')"
            class="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition max-lg:p-2"
            :class="{
              'pl-8':
                !newTelegramId.startsWith('@') && newTelegramId.length > 0,
            }"
          />
        </div>
        <p class="text-xs text-gray-500">
          {{ $t("telegram_username_note") }}
        </p>
      </div>
      <!-- Buttons -->
      <div class="flex justify-end mt-6">
        <button
          @click="emitClose"
          class="px-4 py-2 mr-2 bg-gray-100 text-gray-800 rounded-md lg:hover:bg-gray-200 transition border border-gray-300"
        >
          {{ $t("cancel") }}
        </button>
        <LoadingButton
          :loading="telegramButtonLoading"
          @click="saveTelegramId"
          class="px-4 py-2 bg-blue-600 text-white rounded-md lg:hover:bg-blue-700 transition"
        >
          {{ $t("save") }}
        </LoadingButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const telegramButtonLoading = ref(false);
const emit = defineEmits(["close", "save"]);
const newTelegramId = ref("");

const { showAlert } = useAlert();

function emitClose() {
  emit("close");
}

async function saveTelegramId() {
  if (!newTelegramId.value) return;
  telegramButtonLoading.value = true;
  try {
    const { post, get } = useApiEndpoint();
    const formattedId = newTelegramId.value.startsWith("@")
      ? newTelegramId.value
      : `@${newTelegramId.value}`;
    const { data } = await post("updateSocialMedia", {
      telegramId: formattedId,
    });
    if (data.success) {
      const { data: newData } = await get("userdata");
      if (newData.success) {
        useState("userData").value = newData.user;
      }
      showAlert($t("alert_success"), data.message.en, "success");
      emit("save", formattedId);
      emit("close");
    } else {
      showAlert($t("alert_info"), data.message.en, "info");
    }
  } catch (error) {
    console.error("Save telegram ID error:", error);
    showAlert(
      $t("alert_error"),
      error.response?.data?.message?.en || $t("network_error"),
      "error"
    );
  } finally {
    telegramButtonLoading.value = false;
  }
}
</script>
