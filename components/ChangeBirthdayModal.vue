<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isVisible"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[99] p-4"
        @click.self="emitClose"
      >
        <div
          class="bg-[#1A0D13] border border-[#3b1c23] rounded-lg w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col"
          @click.stop
          :class="isVisible ? 'animate-popupIn' : ''"
        >
          <div
            class="p-4 border-b border-[#3b1c23] flex items-center justify-between flex-shrink-0"
          >
            <h3 class="font-semibold text-[#f0eaea] text-base max-sm:text-sm">
              {{ $t("change_birthday") }}
            </h3>

            <button
              @click="emitClose"
              class="w-8 h-8 max-sm:w-7 max-sm:h-7 rounded-lg bg-[#241017] border border-[#3b1c23] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all"
            >
              <Icon icon="mdi:close" class="w-5 h-5 max-sm:w-4 max-sm:h-4" />
            </button>
          </div>

          <div class="p-4 overflow-y-auto flex-1">
            <label class="block text-sm font-semibold text-[#f0eaea] mb-3">
              {{ $t("date_of_birth") }}
            </label>

            <VueDatePicker
              v-model="newDob"
              required
              :enable-time-picker="false"
              :format="format"
              :max-date="maxDate"
              :min-date="minDate"
              :auto-apply="true"
              :placeholder="$t('select_date_of_birth')"
              autocomplete="new-password"
              default-view="year"
              :year-range="[1900, new Date().getFullYear() - 18]"
              :flow="['year', 'calendar']"
              :teleport="true"
              dark
            >
              <template #dp-input="{ value }">
                <div class="relative">
                  <input
                    type="text"
                    :value="value"
                    readonly
                    :placeholder="$t('select_date_of_birth')"
                    class="w-full px-4 py-3 pl-12 bg-[#241017] text-[#f0eaea] rounded-lg border border-[#3b1c23] focus:border-[#ff3344] focus:outline-none transition-colors placeholder-[#b37a7a] text-sm cursor-pointer"
                  />
                  <div
                    class="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                  >
                    <Icon icon="mdi:calendar" class="w-5 h-5 text-[#ff3344]" />
                  </div>
                </div>
              </template>
            </VueDatePicker>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-[#3b1c23] flex gap-2 flex-shrink-0">
            <button
              @click="emitClose"
              class="flex-1 py-2.5 bg-[#241017] border border-[#3b1c23] text-[#f0eaea] rounded-lg font-medium lg:hover:border-[#ff3344]/50 transition-all text-sm max-sm:text-xs"
            >
              {{ $t("cancel") }}
            </button>
            <LoadingButton
              :loading="buttonLoading"
              @click="saveBirthday"
              class="flex-1 py-2.5 bg-[#ff3344] text-white rounded-lg font-semibold hover:bg-[#cc2a3a] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm max-sm:text-xs"
            >
              {{ $t("save") }}
            </LoadingButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const buttonLoading = ref(false);
const isVisible = ref(true);
const emit = defineEmits(["close", "save"]);
const newDob = ref("");

const { showAlert } = useAlert();

const format = (date) => {
  if (!date) return "";
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const maxDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 18);
  return date;
});

const minDate = computed(() => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 120);
  return date;
});

function emitClose() {
  isVisible.value = false;
  setTimeout(() => emit("close"), 300);
}

async function saveBirthday() {
  if (!newDob.value) return;
  const today = new Date();
  const birthDate = new Date(newDob.value);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  if (age < 18) {
    showAlert($t("alert_info"), $t("must_be_18"), "info");
    return;
  }

  buttonLoading.value = true;
  try {
    const { post, get } = useApiEndpoint();
    const { data } = await post("updateDOB", {
      dob: format(new Date(newDob.value)),
    });

    if (data.success) {
      const { data: newData } = await get("userdata");
      if (newData.success) {
        useState("userData").value = newData.user;
      }
      showAlert($t("alert_success"), data.message[$locale.value], "success");
      emit("save", format(new Date(newDob.value)));
      emitClose();
    } else {
      showAlert("Info", data.message[$locale.value], "info");
    }
  } catch (error) {
    console.error("Save Birthday error:", error);
    showAlert(
      $t("alert_error"),
      error.response?.data?.message?.en || "Network error",
      "error"
    );
  } finally {
    buttonLoading.value = false;
  }
}
</script>

<style scoped>
/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Popup Animation */
@keyframes popupIn {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-popupIn {
  animation: popupIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
}

/* Custom Date Picker Dark Theme */
:deep(.dp__theme_dark) {
  --dp-background-color: #241017;
  --dp-text-color: #f0eaea;
  --dp-hover-color: #3b1c23;
  --dp-hover-text-color: #f0eaea;
  --dp-hover-icon-color: #ff3344;
  --dp-primary-color: #ff3344;
  --dp-primary-disabled-color: #cc2a3a;
  --dp-primary-text-color: #ffffff;
  --dp-secondary-color: #3b1c23;
  --dp-border-color: #3b1c23;
  --dp-menu-border-color: #3b1c23;
  --dp-border-color-hover: #ff3344;
  --dp-border-color-focus: #ff3344;
  --dp-disabled-color: #15090e;
  --dp-scroll-bar-background: #15090e;
  --dp-scroll-bar-color: #3b1c23;
  --dp-success-color: #ff3344;
  --dp-success-color-disabled: #cc2a3a;
  --dp-icon-color: #b37a7a;
  --dp-danger-color: #ff3344;
  --dp-marker-color: #ff3344;
  --dp-tooltip-color: #241017;
  --dp-disabled-color-text: #b37a7a;
  --dp-highlight-color: rgba(255, 51, 68, 0.1);
  --dp-range-between-dates-background-color: #3b1c23;
  --dp-range-between-dates-text-color: #f0eaea;
  --dp-range-between-border-color: #3b1c23;
}

:deep(.dp__input) {
  background-color: #241017 !important;
  border-color: #3b1c23 !important;
  color: #f0eaea !important;
}

:deep(.dp__input:hover) {
  border-color: #ff3344 !important;
}

:deep(.dp__input:focus) {
  border-color: #ff3344 !important;
  outline: none !important;
}

:deep(.dp__menu) {
  background-color: #241017 !important;
  border: 1px solid #3b1c23 !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5) !important;
  max-height: 380px !important;
}

:deep(.dp__calendar_header) {
  background-color: #15090e !important;
  border-bottom: 1px solid #3b1c23 !important;
}

:deep(.dp__calendar_header_item) {
  color: #ff3344 !important;
  font-weight: 600 !important;
}

:deep(.dp__cell_inner) {
  color: #f0eaea !important;
}

:deep(.dp__cell_inner:hover) {
  background-color: #ff3344 !important;
  color: #ffffff !important;
}

:deep(.dp__active_date) {
  background-color: #ff3344 !important;
  color: #ffffff !important;
}

:deep(.dp__today) {
  border: 1px solid #ff3344 !important;
}

:deep(.dp__button) {
  color: #b37a7a !important;
}

:deep(.dp__button:hover) {
  background-color: #3b1c23 !important;
  color: #ff3344 !important;
}

:deep(.dp__overlay) {
  background-color: rgba(0, 0, 0, 0.8) !important;
}

:deep(.dp__overlay_container) {
  background-color: #241017 !important;
  border: 1px solid #3b1c23 !important;
  max-height: 320px !important;
  overflow-y: auto !important;
}

:deep(.dp__overlay_cell) {
  color: #f0eaea !important;
}

:deep(.dp__overlay_cell:hover) {
  background-color: #ff3344 !important;
  color: #ffffff !important;
}

:deep(.dp__overlay_cell_active) {
  background-color: #ff3344 !important;
  color: #ffffff !important;
}

/* Custom scrollbar for date picker overlays */
:deep(.dp__overlay_container::-webkit-scrollbar) {
  width: 6px;
}

:deep(.dp__overlay_container::-webkit-scrollbar-track) {
  background: #15090e;
  border-radius: 3px;
}

:deep(.dp__overlay_container::-webkit-scrollbar-thumb) {
  background: #3b1c23;
  border-radius: 3px;
}

:deep(.dp__overlay_container::-webkit-scrollbar-thumb:hover) {
  background: #ff3344;
}
</style>
