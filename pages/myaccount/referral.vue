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
      <div class="mb-6 max-lg:mb-4 max-lg:p-0">
        <h1 class="text-lg max-lg:text-base font-bold">{{ $t("referral") }}</h1>
        <p class="text-[#b37a7a] text-sm max-lg:text-xs">
          {{ $t("invite_friends") }}
        </p>
      </div>

      <div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-4">
          <div class="flex flex-col items-center justify-center">
            <div
              class="bg-[#15090e]/50 p-4 max-lg:p-3 rounded-lg mb-4 max-lg:mb-3 border border-[#3b1c23] inline-block shadow-lg shadow-red-500/20"
            >
              <img
                :src="userData.referralQrCode"
                alt="QR Code"
                class="w-48 h-48 max-lg:w-36 max-lg:h-36 max-sm:w-32 max-sm:h-32 object-contain"
              />
            </div>
            <button
              @click="downloadQRCode"
              class="max-lg:text-sm max-sm:text-xs bg-gradient-to-r from-[#a1122d] to-[#c21b3a] text-white px-6 py-2 max-lg:px-4 max-lg:py-1.5 rounded-lg lg:hover:brightness-110 transition-all duration-300 flex items-center gap-2"
            >
              <Icon icon="mdi:download" class="w-5 h-5 max-lg:w-4 max-lg:h-4" />
              {{ $t("save_invitation_qr") }}
            </button>
          </div>

          <div class="space-y-6 max-lg:space-y-4">
            <div
              class="bg-[#15090e]/50 rounded-lg p-4 max-lg:p-3 border border-[#3b1c23]"
            >
              <div class="flex justify-between items-center mb-2 max-lg:mb-1.5">
                <h3 class="text-[#f0eaea] font-medium max-lg:text-sm">
                  {{ $t("exclusive_invitation_code") }}
                </h3>
                <button
                  @click="copyText(userData.referralCode)"
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center gap-1 max-lg:text-sm transition-colors"
                >
                  {{ $t("copy") }}
                  <Icon
                    icon="mdi:content-copy"
                    class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
                  />
                </button>
              </div>
              <p
                class="bg-[#241017]/60 p-3 max-lg:p-2 max-lg:text-sm rounded-lg border border-[#3b1c23] font-mono text-[#f0eaea]"
              >
                {{ userData.referralCode }}
              </p>
            </div>

            <div
              class="bg-[#15090e]/50 rounded-lg p-4 max-lg:p-3 border border-[#3b1c23]"
            >
              <div class="flex justify-between items-center mb-2 max-lg:mb-1.5">
                <h3 class="text-[#f0eaea] font-medium max-lg:text-sm">
                  {{ $t("registration_link") }}
                </h3>
                <button
                  @click="copyText(userData.referralLink)"
                  class="text-[#ff3344] lg:hover:text-[#c21b3a] flex items-center gap-1 max-lg:text-sm transition-colors"
                >
                  {{ $t("copy") }}
                  <Icon
                    icon="mdi:content-copy"
                    class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
                  />
                </button>
              </div>
              <p
                class="bg-[#241017]/60 p-3 max-lg:p-2 rounded-lg border border-[#3b1c23] font-mono text-sm max-lg:text-xs break-all text-[#f0eaea]"
              >
                {{ userData.referralLink }}
              </p>
            </div>

            <div>
              <h3
                class="text-[#f0eaea] font-medium mb-4 max-lg:mb-3 max-lg:text-sm"
              >
                {{ $t("share_on_social") }}
              </h3>
              <div class="grid grid-cols-5 max-sm:grid-cols-5 gap-1">
                <button
                  @click="shareToSocial('facebook')"
                  class="social-button"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 max-sm:w-8 max-sm:h-8 bg-[#1877F2] rounded-lg flex items-center justify-center mx-auto mb-2 max-lg:mb-1 lg:hover:brightness-110 transition-all"
                  >
                    <Icon
                      icon="mdi:facebook"
                      class="w-6 h-6 max-lg:w-5 max-lg:h-5 max-sm:w-4 max-sm:h-4 text-white"
                    />
                  </div>
                  <span class="text-xs max-sm:text-[10px] text-[#b37a7a]">{{
                    $t("facebook")
                  }}</span>
                </button>

                <button
                  @click="shareToSocial('whatsapp')"
                  class="social-button"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 max-sm:w-8 max-sm:h-8 bg-[#25D366] rounded-lg flex items-center justify-center mx-auto mb-2 max-lg:mb-1 lg:hover:brightness-110 transition-all"
                  >
                    <Icon
                      icon="mdi:whatsapp"
                      class="w-6 h-6 max-lg:w-5 max-lg:h-5 max-sm:w-4 max-sm:h-4 text-white"
                    />
                  </div>
                  <span class="text-xs max-sm:text-[10px] text-[#b37a7a]">{{
                    $t("whatsapp")
                  }}</span>
                </button>

                <button
                  @click="shareToSocial('telegram')"
                  class="social-button"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 max-sm:w-8 max-sm:h-8 bg-[#0088cc] rounded-lg flex items-center justify-center mx-auto mb-2 max-lg:mb-1 lg:hover:brightness-110 transition-all"
                  >
                    <Icon
                      icon="mdi:telegram"
                      class="w-6 h-6 max-lg:w-5 max-lg:h-5 max-sm:w-4 max-sm:h-4 text-white"
                    />
                  </div>
                  <span class="text-xs max-sm:text-[10px] text-[#b37a7a]">{{
                    $t("telegram")
                  }}</span>
                </button>

                <button @click="shareToSocial('twitter')" class="social-button">
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 max-sm:w-8 max-sm:h-8 bg-[#1DA1F2] rounded-lg flex items-center justify-center mx-auto mb-2 max-lg:mb-1 lg:hover:brightness-110 transition-all"
                  >
                    <Icon
                      icon="mdi:twitter"
                      class="w-6 h-6 max-lg:w-5 max-lg:h-5 max-sm:w-4 max-sm:h-4 text-white"
                    />
                  </div>
                  <span class="text-xs max-sm:text-[10px] text-[#b37a7a]">{{
                    $t("twitter")
                  }}</span>
                </button>

                <button
                  @click="copyText(userData.referralLink)"
                  class="social-button"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 max-sm:w-8 max-sm:h-8 bg-[#ff3344] rounded-lg flex items-center justify-center mx-auto mb-2 max-lg:mb-1 lg:hover:brightness-110 transition-all"
                  >
                    <Icon
                      icon="mdi:content-copy"
                      class="w-6 h-6 max-lg:w-5 max-lg:h-5 max-sm:w-4 max-sm:h-4 text-white"
                    />
                  </div>
                  <span class="text-xs max-sm:text-[10px] text-[#b37a7a]">{{
                    $t("copy_link")
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- How It Works Section -->
        <div
          class="mt-8 max-lg:mt-6 bg-[#15090e]/50 rounded-xl p-6 max-lg:p-4 border border-[#3b1c23] shadow-lg shadow-red-500/10"
        >
          <h3
            class="text-lg max-lg:text-base font-semibold text-[#f0eaea] mb-6 max-lg:mb-4 flex items-center gap-2"
          >
            <Icon
              icon="mdi:information"
              class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-[#ff3344]"
            />
            {{ $t("how_it_works") }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-lg:gap-3">
            <div
              class="bg-[#241017]/60 p-4 max-lg:p-3 rounded-lg border border-[#3b1c23] shadow-sm"
            >
              <div
                class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-[#ff3344]/20 rounded-full flex items-center justify-center mb-4 max-lg:mb-3 text-[#ff3344]"
              >
                <Icon icon="mdi:share" class="w-6 h-6 max-lg:w-5 max-lg:h-5" />
              </div>
              <h4
                class="font-medium text-[#f0eaea] mb-2 max-lg:mb-1.5 max-lg:text-sm"
              >
                1. {{ $t("share_your_code") }}
              </h4>
              <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                {{ $t("share_code_description") }}
              </p>
            </div>

            <div
              class="bg-[#241017]/60 p-4 max-lg:p-3 rounded-lg border border-[#3b1c23] shadow-sm"
            >
              <div
                class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-[#ff3344]/20 rounded-full flex items-center justify-center mb-4 max-lg:mb-3 text-[#ff3344]"
              >
                <Icon
                  icon="mdi:account-plus"
                  class="w-6 h-6 max-lg:w-5 max-lg:h-5"
                />
              </div>
              <h4
                class="font-medium text-[#f0eaea] mb-2 max-lg:mb-1.5 max-lg:text-sm"
              >
                2. {{ $t("friends_sign_up") }}
              </h4>
              <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                {{ $t("sign_up_description") }}
              </p>
            </div>

            <div
              class="bg-[#241017]/60 p-4 max-lg:p-3 rounded-lg border border-[#3b1c23] shadow-sm"
            >
              <div
                class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-[#ff3344]/20 rounded-full flex items-center justify-center mb-4 max-lg:mb-3 text-[#ff3344]"
              >
                <Icon
                  icon="mdi:currency-usd"
                  class="w-6 h-6 max-lg:w-5 max-lg:h-5"
                />
              </div>
              <h4
                class="font-medium text-[#f0eaea] mb-2 max-lg:mb-1.5 max-lg:text-sm"
              >
                3. {{ $t("earn_rewards") }}
              </h4>
              <p class="text-[#b37a7a] text-sm max-lg:text-xs">
                {{ $t("earn_rewards_description") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Terms & Conditions -->
        <div
          class="mt-6 max-lg:mt-4 bg-[#241017]/60 p-4 max-lg:p-3 rounded-lg border border-[#3b1c23]"
        >
          <p
            class="text-sm max-lg:text-xs text-[#f0eaea] mb-2 max-lg:mb-1.5 font-medium"
          >
            {{ $t("terms_conditions") }}:
          </p>
          <ul
            class="list-disc list-inside text-xs max-lg:text-[10px] text-[#b37a7a] space-y-1 max-lg:space-y-0.5"
          >
            <li>
              {{ $t("term_1") }}
            </li>
            <li>
              {{ $t("term_2") }}
            </li>
            <li>
              {{ $t("term_3") }}
            </li>
            <li>
              {{ $t("term_4") }}
            </li>
          </ul>
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
