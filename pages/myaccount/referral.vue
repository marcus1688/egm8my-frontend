<template>
  <UserAccountLayout>
    <Alerts
      :title="alertTitle"
      :message="alertMessage"
      :isVisible="alertVisible"
      :type="alertType"
      @close="alertVisible = false"
    />

    <div class="bg-white text-gray-800 rounded-lg">
      <div class="mb-6 max-lg:mb-4 max-lg:p-0">
        <h1 class="text-lg max-lg:text-base font-bold">{{ $t("referral") }}</h1>
        <p class="text-gray-500 text-sm max-lg:text-xs">
          {{ $t("invite_friends") }}
        </p>
      </div>

      <div class="max-lg:pb-[80px]">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-4">
          <div class="flex flex-col items-center justify-center">
            <div
              class="bg-white p-4 max-lg:p-3 rounded-lg mb-4 max-lg:mb-3 border border-gray-200 inline-block shadow-sm"
            >
              <img
                :src="userData.referralQrCode"
                alt="QR Code"
                class="w-48 h-48 max-lg:w-36 max-lg:h-36 max-sm:w-32 max-sm:h-32 object-contain"
              />
            </div>
            <button
              @click="downloadQRCode"
              class="max-lg:text-sm max-sm:text-xs bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2 max-lg:px-4 max-lg:py-1.5 rounded-lg lg:hover:from-blue-700 lg:hover:to-indigo-800 transition-all duration-300 flex items-center gap-2"
            >
              <Icon icon="mdi:download" class="w-5 h-5 max-lg:w-4 max-lg:h-4" />
              {{ $t("save_invitation_qr") }}
            </button>
          </div>

          <div class="space-y-6 max-lg:space-y-4">
            <div
              class="bg-gray-50 rounded-lg p-4 max-lg:p-3 border border-gray-200"
            >
              <div class="flex justify-between items-center mb-2 max-lg:mb-1.5">
                <h3 class="text-gray-800 font-medium max-lg:text-sm">
                  {{ $t("exclusive_invitation_code") }}
                </h3>
                <button
                  @click="copyText(userData.referralCode)"
                  class="text-blue-600 lg:hover:text-blue-700 flex items-center gap-1 max-lg:text-sm"
                >
                  {{ $t("copy") }}
                  <Icon
                    icon="mdi:content-copy"
                    class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
                  />
                </button>
              </div>
              <p
                class="bg-white p-3 max-lg:p-2 max-lg:text-sm rounded border border-gray-200 font-mono"
              >
                {{ userData.referralCode }}
              </p>
            </div>

            <div
              class="bg-gray-50 rounded-lg p-4 max-lg:p-3 border border-gray-200"
            >
              <div class="flex justify-between items-center mb-2 max-lg:mb-1.5">
                <h3 class="text-gray-800 font-medium max-lg:text-sm">
                  {{ $t("registration_link") }}
                </h3>
                <button
                  @click="copyText(userData.referralLink)"
                  class="text-blue-600 lg:hover:text-blue-700 flex items-center gap-1 max-lg:text-sm"
                >
                  {{ $t("copy") }}
                  <Icon
                    icon="mdi:content-copy"
                    class="w-4 h-4 max-lg:w-3.5 max-lg:h-3.5"
                  />
                </button>
              </div>
              <p
                class="bg-white p-3 max-lg:p-2 rounded border border-gray-200 font-mono text-sm max-lg:text-xs break-all"
              >
                {{ userData.referralLink }}
              </p>
            </div>

            <div>
              <h3
                class="text-gray-800 font-medium mb-4 max-lg:mb-3 max-lg:text-sm"
              >
                {{ $t("share_on_social") }}
              </h3>
              <div class="grid grid-cols-5 max-sm:grid-cols-5 gap-1">
                <button
                  @click="shareToSocial('facebook')"
                  class="social-button"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 max-sm:w-8 max-sm:h-8 bg-[#1877F2] rounded-lg flex items-center justify-center mx-auto mb-2 max-lg:mb-1"
                  >
                    <Icon
                      icon="mdi:facebook"
                      class="w-6 h-6 max-lg:w-5 max-lg:h-5 max-sm:w-4 max-sm:h-4 text-white"
                    />
                  </div>
                  <span class="text-xs max-sm:text-[10px] text-gray-500">{{
                    $t("facebook")
                  }}</span>
                </button>

                <button
                  @click="shareToSocial('whatsapp')"
                  class="social-button"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 max-sm:w-8 max-sm:h-8 bg-[#25D366] rounded-lg flex items-center justify-center mx-auto mb-2 max-lg:mb-1"
                  >
                    <Icon
                      icon="mdi:whatsapp"
                      class="w-6 h-6 max-lg:w-5 max-lg:h-5 max-sm:w-4 max-sm:h-4 text-white"
                    />
                  </div>
                  <span class="text-xs max-sm:text-[10px] text-gray-500">{{
                    $t("whatsapp")
                  }}</span>
                </button>

                <button
                  @click="shareToSocial('telegram')"
                  class="social-button"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 max-sm:w-8 max-sm:h-8 bg-[#0088cc] rounded-lg flex items-center justify-center mx-auto mb-2 max-lg:mb-1"
                  >
                    <Icon
                      icon="mdi:telegram"
                      class="w-6 h-6 max-lg:w-5 max-lg:h-5 max-sm:w-4 max-sm:h-4 text-white"
                    />
                  </div>
                  <span class="text-xs max-sm:text-[10px] text-gray-500">{{
                    $t("telegram")
                  }}</span>
                </button>

                <button @click="shareToSocial('twitter')" class="social-button">
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 max-sm:w-8 max-sm:h-8 bg-[#1DA1F2] rounded-lg flex items-center justify-center mx-auto mb-2 max-lg:mb-1"
                  >
                    <Icon
                      icon="mdi:twitter"
                      class="w-6 h-6 max-lg:w-5 max-lg:h-5 max-sm:w-4 max-sm:h-4 text-white"
                    />
                  </div>
                  <span class="text-xs max-sm:text-[10px] text-gray-500">{{
                    $t("twitter")
                  }}</span>
                </button>

                <button
                  @click="copyText(userData.referralLink)"
                  class="social-button"
                >
                  <div
                    class="w-12 h-12 max-lg:w-10 max-lg:h-10 max-sm:w-8 max-sm:h-8 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2 max-lg:mb-1"
                  >
                    <Icon
                      icon="mdi:content-copy"
                      class="w-6 h-6 max-lg:w-5 max-lg:h-5 max-sm:w-4 max-sm:h-4 text-white"
                    />
                  </div>
                  <span class="text-xs max-sm:text-[10px] text-gray-500">{{
                    $t("copy_link")
                  }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- How It Works Section -->
        <div
          class="mt-8 max-lg:mt-6 bg-gray-50 rounded-xl p-6 max-lg:p-4 border border-gray-100"
        >
          <h3
            class="text-lg max-lg:text-base font-semibold text-gray-800 mb-6 max-lg:mb-4 flex items-center gap-2"
          >
            <Icon
              icon="mdi:information"
              class="w-5 h-5 max-lg:w-4 max-lg:h-4 text-blue-600"
            />
            {{ $t("how_it_works") }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-lg:gap-3">
            <div
              class="bg-white p-4 max-lg:p-3 rounded-lg border border-gray-200 shadow-sm"
            >
              <div
                class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4 max-lg:mb-3 text-blue-600"
              >
                <Icon icon="mdi:share" class="w-6 h-6 max-lg:w-5 max-lg:h-5" />
              </div>
              <h4
                class="font-medium text-gray-800 mb-2 max-lg:mb-1.5 max-lg:text-sm"
              >
                1. {{ $t("share_your_code") }}
              </h4>
              <p class="text-gray-600 text-sm max-lg:text-xs">
                {{ $t("share_code_description") }}
              </p>
            </div>

            <div
              class="bg-white p-4 max-lg:p-3 rounded-lg border border-gray-200 shadow-sm"
            >
              <div
                class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4 max-lg:mb-3 text-blue-600"
              >
                <Icon
                  icon="mdi:account-plus"
                  class="w-6 h-6 max-lg:w-5 max-lg:h-5"
                />
              </div>
              <h4
                class="font-medium text-gray-800 mb-2 max-lg:mb-1.5 max-lg:text-sm"
              >
                2. {{ $t("friends_sign_up") }}
              </h4>
              <p class="text-gray-600 text-sm max-lg:text-xs">
                {{ $t("sign_up_description") }}
              </p>
            </div>

            <div
              class="bg-white p-4 max-lg:p-3 rounded-lg border border-gray-200 shadow-sm"
            >
              <div
                class="w-12 h-12 max-lg:w-10 max-lg:h-10 bg-blue-100 rounded-full flex items-center justify-center mb-4 max-lg:mb-3 text-blue-600"
              >
                <Icon
                  icon="mdi:currency-usd"
                  class="w-6 h-6 max-lg:w-5 max-lg:h-5"
                />
              </div>
              <h4
                class="font-medium text-gray-800 mb-2 max-lg:mb-1.5 max-lg:text-sm"
              >
                3. {{ $t("earn_rewards") }}
              </h4>
              <p class="text-gray-600 text-sm max-lg:text-xs">
                {{ $t("earn_rewards_description") }}
              </p>
            </div>
          </div>
        </div>

        <!-- Terms & Conditions -->
        <div
          class="mt-6 max-lg:mt-4 bg-white p-4 max-lg:p-3 rounded-lg border border-gray-200"
        >
          <p
            class="text-sm max-lg:text-xs text-gray-500 mb-2 max-lg:mb-1.5 font-medium"
          >
            {{ $t("terms_conditions") }}:
          </p>
          <ul
            class="list-disc list-inside text-xs max-lg:text-[10px] text-gray-500 space-y-1 max-lg:space-y-0.5"
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
