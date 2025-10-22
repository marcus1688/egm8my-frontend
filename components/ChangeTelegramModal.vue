<template>
  <Teleport to="body">
    <div
      class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] max-lg:px-4"
      @click.self="emitClose"
    >
      <div
        class="bg-[#1A0D13] border border-[#3b1c23] text-[#f0eaea] rounded-xl w-1/3 p-6 shadow-2xl shadow-[#ff3344]/20 transform transition-transform scale-95 max-lg:w-full max-lg:p-4"
        role="dialog"
        aria-modal="true"
      >
        <!-- Title Bar -->
        <div
          class="flex justify-between items-center mb-4 border-b border-[#3b1c23] pb-3"
        >
          <h2 class="text-xl font-semibold text-[#f0eaea]">
            {{ $t("change_telegram_id") }}
          </h2>
          <button
            @click="emitClose"
            class="text-[#b37a7a] lg:hover:text-[#ff3344] transition-colors"
          >
            <Icon icon="mdi:close" class="w-5 h-5" />
          </button>
        </div>

        <!-- Input Field -->
        <div class="space-y-2">
          <label class="block text-sm font-medium text-[#f0eaea] mb-2">
            {{ $t("new_telegram_id") }}
          </label>
          <div class="relative">
            <span
              v-if="!newTelegramId.startsWith('@') && newTelegramId.length > 0"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b37a7a] pointer-events-none z-10"
            >
              @
            </span>
            <input
              type="text"
              v-model="newTelegramId"
              :placeholder="$t('enter_telegram_id')"
              class="w-full p-3 max-lg:p-2 rounded-lg border border-[#3b1c23] bg-[#241017]/60 text-[#f0eaea] placeholder-[#b37a7a] focus:border-[#ff3344] focus:ring-2 focus:ring-[#ff3344]/50 outline-none transition"
              :class="{
                'pl-8':
                  !newTelegramId.startsWith('@') && newTelegramId.length > 0,
              }"
            />
          </div>
          <p class="text-xs text-[#b37a7a]">
            {{ $t("telegram_username_note") }}
          </p>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end mt-6 gap-2">
          <button
            @click="emitClose"
            class="px-4 py-2 bg-[#241017]/60 text-[#f0eaea] rounded-lg lg:hover:bg-[#3b1c23] transition border border-[#3b1c23]"
          >
            {{ $t("cancel") }}
          </button>
          <LoadingButton
            :loading="telegramButtonLoading"
            @click="saveTelegramId"
            class="px-4 py-2 bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white rounded-lg lg:hover:brightness-110 transition shadow-lg shadow-[#ff3344]/30"
          >
            {{ $t("save") }}
          </LoadingButton>
        </div>
      </div>
    </div>
  </Teleport>
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
