<template>
  <div
    class="fixed right-5 bottom-5 cursor-pointer z-[100] max-lg:right-1 max-lg:bottom-[4.5rem]"
    @click="openLiveChat"
  >
    <img :src="buttonImage" :alt="buttonAlt" class="w-[80px] max-lg:w-[80px]" />
  </div>
</template>

<script setup>
const props = defineProps({
  buttonImage: {
    type: String,
    default: "/images/livechat/chatbox.jpeg",
  },
  buttonAlt: {
    type: String,
    default: "Chat with us",
  },
});

const openLiveChat = () => {
  if (window.LiveChatWidget) {
    window.LiveChatWidget.call("maximize");
  } else {
    console.warn("LiveChat Widget API is not available");
    window.open(
      "https://www.livechat.com/customer-service/?utm_source=chat_button&utm_medium=referral&utm_campaign=lc_19076410",
      "_blank"
    );
  }
};
</script>
