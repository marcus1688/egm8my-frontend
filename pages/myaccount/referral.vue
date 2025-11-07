<template>
  <UserAccountLayout>
    <Teleport to="body">
      <Alerts
        :title="alertTitle"
        :message="alertMessage"
        :isVisible="alertVisible"
        :type="alertType"
        @close="alertVisible = false"
      />
    </Teleport>

    <div class="text-[#f0eaea]">
      <!-- Page Header -->
      <div class="mb-6 max-lg:mb-4">
        <h1 class="text-xl font-bold mb-1 max-lg:text-lg">
          {{ $t("referral") }}
        </h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("invite_friends") }}
        </p>
      </div>

      <div class="space-y-4">
        <!-- Main Referral Card - Split Layout -->
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-lg overflow-hidden"
        >
          <div class="grid md:grid-cols-[300px_1fr] max-lg:grid-cols-1">
            <!-- Left: QR Code Section -->
            <div
              class="bg-[#15090e] border-r border-[#3b1c23] p-6 flex flex-col items-center justify-center max-lg:border-r-0 max-lg:border-b max-lg:p-4"
            >
              <div
                class="w-full max-w-[200px] aspect-square bg-white rounded-lg p-3 mb-4"
              >
                <img
                  :src="userData.referralQrCode"
                  alt="QR Code"
                  class="w-full h-full object-contain"
                />
              </div>
              <button
                @click="downloadQRCode"
                class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ff3344] text-white rounded-lg font-medium lg:hover:bg-[#cc2a3a] transition-all text-sm"
              >
                <Icon icon="mdi:download" class="w-4 h-4" />
                {{ $t("download_qr") }}
              </button>
            </div>

            <!-- Right: Referral Details -->
            <div class="p-6 max-lg:p-4 space-y-4">
              <!-- Referral Code Row -->
              <div
                class="flex items-center gap-3 p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg"
              >
                <div class="flex-1">
                  <label class="text-xs text-[#b37a7a] mb-1 block">{{
                    $t("referral_code")
                  }}</label>
                  <p class="font-mono font-bold text-[#f0eaea] text-lg">
                    {{ userData.referralCode }}
                  </p>
                </div>
                <button
                  @click="copyText(userData.referralCode)"
                  class="w-10 h-10 rounded-lg bg-[#ff3344]/10 border border-[#ff3344] flex items-center justify-center text-[#ff3344] lg:hover:bg-[#ff3344] lg:hover:text-white transition-all"
                >
                  <Icon icon="mdi:content-copy" class="w-5 h-5" />
                </button>
              </div>

              <!-- Referral Link Row -->
              <div
                class="flex items-center gap-3 p-3 bg-[#15090e] border border-[#3b1c23] rounded-lg"
              >
                <div class="flex-1 min-w-0">
                  <label class="text-xs text-[#b37a7a] mb-1 block">{{
                    $t("referral_link")
                  }}</label>
                  <p class="font-mono text-[#f0eaea] text-sm truncate">
                    {{ userData.referralLink }}
                  </p>
                </div>
                <button
                  @click="copyText(userData.referralLink)"
                  class="w-10 h-10 rounded-lg bg-[#ff3344]/10 border border-[#ff3344] flex items-center justify-center text-[#ff3344] lg:hover:bg-[#ff3344] lg:hover:text-white transition-all flex-shrink-0"
                >
                  <Icon icon="mdi:content-copy" class="w-5 h-5" />
                </button>
              </div>

              <!-- Social Share -->
              <div>
                <label class="text-xs text-[#b37a7a] mb-2 block">{{
                  $t("share_via")
                }}</label>
                <div class="flex gap-2 flex-wrap">
                  <button
                    @click="shareToSocial('facebook')"
                    class="w-10 h-10 bg-[#1877F2] rounded-lg flex items-center justify-center lg:hover:brightness-110 transition-all"
                    title="Facebook"
                  >
                    <Icon icon="mdi:facebook" class="w-5 h-5 text-white" />
                  </button>

                  <button
                    @click="shareToSocial('whatsapp')"
                    class="w-10 h-10 bg-[#25D366] rounded-lg flex items-center justify-center lg:hover:brightness-110 transition-all"
                    title="WhatsApp"
                  >
                    <Icon icon="mdi:whatsapp" class="w-5 h-5 text-white" />
                  </button>

                  <button
                    @click="shareToSocial('telegram')"
                    class="w-10 h-10 bg-[#0088cc] rounded-lg flex items-center justify-center lg:hover:brightness-110 transition-all"
                    title="Telegram"
                  >
                    <Icon icon="mdi:telegram" class="w-5 h-5 text-white" />
                  </button>

                  <button
                    @click="shareToSocial('twitter')"
                    class="w-10 h-10 bg-[#1DA1F2] rounded-lg flex items-center justify-center lg:hover:brightness-110 transition-all"
                    title="Twitter"
                  >
                    <Icon icon="mdi:twitter" class="w-5 h-5 text-white" />
                  </button>

                  <button
                    @click="copyText(userData.referralLink)"
                    class="w-10 h-10 bg-[#ff3344] rounded-lg flex items-center justify-center lg:hover:brightness-110 transition-all"
                    title="Copy Link"
                  >
                    <Icon icon="mdi:link" class="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- How It Works - Horizontal Steps -->
        <div
          class="bg-[#241017] border border-[#3b1c23] rounded-lg p-5 max-lg:p-4"
        >
          <h3
            class="font-semibold text-[#f0eaea] mb-4 text-sm flex items-center gap-2"
          >
            <Icon icon="mdi:lightbulb-on" class="w-5 h-5 text-[#ff3344]" />
            {{ $t("how_it_works") }}
          </h3>

          <div class="grid md:grid-cols-3 gap-4 max-lg:gap-3">
            <div class="relative">
              <div class="flex items-start gap-3">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center flex-shrink-0 text-white font-bold"
                >
                  1
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-[#f0eaea] text-sm mb-1">
                    {{ $t("share_your_code") }}
                  </h4>
                  <p class="text-xs text-[#b37a7a] leading-relaxed">
                    {{ $t("share_code_description") }}
                  </p>
                </div>
              </div>
              <!-- Arrow -->
              <div
                class="hidden md:block absolute top-5 -right-5 text-[#3b1c23]"
              >
                <Icon icon="mdi:arrow-right" class="w-8 h-8" />
              </div>
            </div>

            <div class="relative">
              <div class="flex items-start gap-3">
                <div
                  class="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center flex-shrink-0 text-white font-bold"
                >
                  2
                </div>
                <div class="flex-1">
                  <h4 class="font-semibold text-[#f0eaea] text-sm mb-1">
                    {{ $t("friends_sign_up") }}
                  </h4>
                  <p class="text-xs text-[#b37a7a] leading-relaxed">
                    {{ $t("sign_up_description") }}
                  </p>
                </div>
              </div>
              <!-- Arrow -->
              <div
                class="hidden md:block absolute top-5 -right-5 text-[#3b1c23]"
              >
                <Icon icon="mdi:arrow-right" class="w-8 h-8" />
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff3344] to-[#cc2a3a] flex items-center justify-center flex-shrink-0 text-white font-bold"
              >
                3
              </div>
              <div class="flex-1">
                <h4 class="font-semibold text-[#f0eaea] text-sm mb-1">
                  {{ $t("earn_rewards") }}
                </h4>
                <p class="text-xs text-[#b37a7a] leading-relaxed">
                  {{ $t("earn_rewards_description") }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Benefits Grid -->
        <div class="grid md:grid-cols-3 gap-3">
          <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
            <div
              class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-3"
            >
              <Icon icon="mdi:cash-multiple" class="w-5 h-5 text-blue-400" />
            </div>
            <h4 class="font-semibold text-[#f0eaea] text-sm mb-1">
              {{ $t("unlimited_earnings") }}
            </h4>
            <p class="text-xs text-[#b37a7a]">
              {{ $t("unlimited_earnings_desc") }}
            </p>
          </div>

          <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
            <div
              class="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-3"
            >
              <Icon icon="mdi:gift" class="w-5 h-5 text-green-400" />
            </div>
            <h4 class="font-semibold text-[#f0eaea] text-sm mb-1">
              {{ $t("instant_rewards") }}
            </h4>
            <p class="text-xs text-[#b37a7a]">
              {{ $t("instant_rewards_desc") }}
            </p>
          </div>

          <div class="bg-[#241017] border border-[#3b1c23] rounded-lg p-4">
            <div
              class="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3"
            >
              <Icon icon="mdi:account-group" class="w-5 h-5 text-purple-400" />
            </div>
            <h4 class="font-semibold text-[#f0eaea] text-sm mb-1">
              {{ $t("lifetime_commission") }}
            </h4>
            <p class="text-xs text-[#b37a7a]">
              {{ $t("lifetime_commission_desc") }}
            </p>
          </div>
        </div>

        <!-- Terms & Conditions - Collapsible -->
        <div class="border border-[#3b1c23] rounded-lg overflow-hidden">
          <button
            @click="showTerms = !showTerms"
            class="w-full p-4 flex items-center justify-between lg:hover:bg-[#241017] transition-colors"
          >
            <div class="flex items-center gap-2">
              <Icon icon="mdi:file-document" class="w-5 h-5 text-[#ff3344]" />
              <h3 class="font-semibold text-[#f0eaea] text-sm">
                {{ $t("terms_conditions") }}
              </h3>
            </div>
            <Icon
              icon="mdi:chevron-down"
              class="w-5 h-5 text-[#b37a7a] transition-transform"
              :class="{ 'rotate-180': showTerms }"
            />
          </button>

          <Transition name="expand">
            <div v-if="showTerms" class="px-4 pb-4">
              <ul class="space-y-2 pt-2">
                <li class="flex gap-2 text-xs text-[#b37a7a]">
                  <Icon
                    icon="mdi:circle-small"
                    class="w-4 h-4 flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("term_1") }}</span>
                </li>
                <li class="flex gap-2 text-xs text-[#b37a7a]">
                  <Icon
                    icon="mdi:circle-small"
                    class="w-4 h-4 flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("term_2") }}</span>
                </li>
                <li class="flex gap-2 text-xs text-[#b37a7a]">
                  <Icon
                    icon="mdi:circle-small"
                    class="w-4 h-4 flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("term_3") }}</span>
                </li>
                <li class="flex gap-2 text-xs text-[#b37a7a]">
                  <Icon
                    icon="mdi:circle-small"
                    class="w-4 h-4 flex-shrink-0 mt-0.5"
                  />
                  <span>{{ $t("term_4") }}</span>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </UserAccountLayout>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import UserAccountLayout from "~/layouts/UserAccountLayout.vue";

const { checkAuth } = useAuthCheck();
await checkAuth();
const userData = useState("userData");
const alertVisible = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");
const alertType = ref("");
const showTerms = ref(false);

const copyText = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    alertTitle.value = $t("alert_success");
    alertMessage.value = $t("copied_successfully");
    alertType.value = "success";
    alertVisible.value = true;
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

const downloadQRCode = () => {
  const link = document.createElement("a");
  link.href = userData.value.referralQrCode;
  link.download = "referral-qr-code.png";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const shareToSocial = (platform) => {
  let shareUrl = "";
  const text = $t("join_bonus");
  const encodedLink = encodeURIComponent(userData.value.referralLink);
  const encodedText = encodeURIComponent(text);

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedLink}`;
      break;
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodedText}%20${encodedLink}`;
      break;
    case "telegram":
      shareUrl = `https://t.me/share/url?url=${encodedLink}&text=${encodedText}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedLink}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, "_blank");
  }
};
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 300px;
  opacity: 1;
}
</style>
