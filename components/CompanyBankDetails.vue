<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="show"
        class="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[99] p-4"
        @click.self="$emit('close')"
      >
        <div
          v-if="bank"
          class="bg-[#1A0D13] border border-[#3b1c23] rounded-lg w-full max-w-md overflow-hidden"
          :class="show ? 'animate-popupIn' : ''"
        >
          <div
            class="p-4 border-b border-[#3b1c23] flex items-center justify-between"
          >
            <h3 class="font-semibold text-[#f0eaea] text-base max-sm:text-sm">
              {{ $t("bank_details") }}
            </h3>
            <button
              @click="$emit('close')"
              class="w-8 h-8 max-sm:w-7 max-sm:h-7 rounded-lg bg-[#241017] border border-[#3b1c23] flex items-center justify-center text-[#b37a7a] lg:hover:text-[#ff3344] lg:hover:border-[#ff3344] transition-all"
            >
              <Icon icon="mdi:close" class="w-5 h-5 max-sm:w-4 max-sm:h-4" />
            </button>
          </div>

          <div class="p-4">
            <div
              class="w-24 h-24 max-sm:w-20 max-sm:h-20 mx-auto mb-4 rounded-lg bg-[#241017] border border-[#3b1c23] flex items-center justify-center"
            >
              <img
                v-if="bank.qrimage"
                :src="bank.qrimage"
                :alt="bank.bankname"
                class="w-20 h-20 max-sm:w-14 max-sm:h-14 object-contain"
              />
              <img
                v-else
                src="/images/deposit/bank.png"
                :alt="bank.bankname"
                class="w-20 h-20 object-contain"
              />
            </div>

            <div class="space-y-3">
              <div>
                <p class="text-xs text-[#b37a7a] mb-1">{{ $t("bank_name") }}</p>
                <p
                  class="text-base font-semibold text-[#f0eaea] max-sm:text-sm"
                >
                  {{ bank.bankname }}
                </p>
              </div>

              <div>
                <p class="text-xs text-[#b37a7a] mb-1">
                  {{ $t("account_holder") }}
                </p>
                <p class="text-base font-medium text-[#f0eaea] max-sm:text-sm">
                  {{ bank.ownername }}
                </p>
              </div>

              <div>
                <p class="text-xs text-[#b37a7a] mb-1">
                  {{ $t("account_number") }}
                </p>
                <div class="flex items-center gap-2">
                  <p
                    class="text-base max-sm:text-sm font-mono font-semibold text-[#f0eaea] flex-1"
                  >
                    {{ bank.bankaccount }}
                  </p>
                  <button
                    type="button"
                    @click="$emit('copy', bank.bankaccount)"
                    class="w-9 h-9 max-sm:w-7 max-sm:h-7 rounded-lg bg-[#ff3344]/10 border border-[#ff3344] flex items-center justify-center text-[#ff3344] lg:hover:bg-[#ff3344] lg:hover:text-white transition-all"
                  >
                    <Icon
                      icon="mdi:content-copy"
                      class="w-5 h-5 max-sm:w-3 max-sm:h-3"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-[#3b1c23] flex gap-2">
            <button
              @click="$emit('close')"
              class="flex-1 py-2.5 bg-[#241017] border border-[#3b1c23] text-[#f0eaea] rounded-lg font-medium lg:hover:border-[#ff3344]/50 transition-all text-sm max-sm:text-xs"
            >
              {{ $t("cancel") }}
            </button>
            <button
              @click="$emit('select', bank)"
              class="flex-1 py-2.5 bg-[#ff3344] text-white rounded-lg font-medium lg:hover:bg-[#cc2a3a] transition-all text-sm max-sm:text-xs"
            >
              {{ $t("select_bank_modal") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  bank: {
    type: Object,
    default: null,
  },
});

defineEmits(["close", "select", "copy"]);
</script>

<style scoped>
/* Fade transition for modal overlay */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Popup animation for modal */
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
</style>
