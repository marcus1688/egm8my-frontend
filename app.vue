<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import { useNotification } from "~/composables/useNotification";
import { useI18n } from "vue-i18n";
const i18n = useI18n();
const { get, post } = useApiEndpoint();
const generalSetting = useState("generalSetting", () => ({}));
const allKiosks = useState("allKiosks", () => []);
const liveCasinoKiosks = useState("liveCasinoKiosks", () => []);
const slotKiosks = useState("slotKiosks", () => []);
const sportsKiosks = useState("sportsKiosks", () => []);
const esportsKiosks = useState("esportsKiosks", () => []);
const fishingKiosks = useState("fishingKiosks", () => []);
const lotteryKiosks = useState("lotteryKiosks", () => []);
const partners = useState("partners", () => []);
const userData = useState("userData");
const unreadCount = useState("unreadCount", () => null);
const { socket, connectSocketIO, cleanup } = useSocketIO();
const { showNotification } = useNotification();
const smsStatus = useState("smsStatus", () => null);

if (process.client) {
  window.$t = i18n.t;
  window.$locale = i18n.locale;
}

async function fetchGeneralSetting() {
  try {
    const { data } = await get("generalsetting");
    if (data.success) {
      generalSetting.value = data.data[0];
    }
  } catch (error) {
    console.error("Error fetching information:", error);
  }
}

async function fetchUnreadCount() {
  try {
    const { data } = await get("mails/unreadcount");
    if (data.success) {
      unreadCount.value = data.data.count;
    }
  } catch (error) {
    console.error("Error fetching unread count:", error);
  }
}

async function fetchKiosks() {
  try {
    const { data } = await get("kiosks");
    if (data?.success) {
      const uniqueKiosksMap = new Map();
      data.data.forEach((kiosk) => {
        if (!uniqueKiosksMap.has(kiosk.name)) {
          uniqueKiosksMap.set(kiosk.name, kiosk);
        }
      });
      allKiosks.value = Array.from(uniqueKiosksMap.values());
    }
    liveCasinoKiosks.value = data.data.filter(
      (kiosk) => kiosk.categoryId?.name === "Live Casino"
    );
    slotKiosks.value = data.data.filter(
      (kiosk) => kiosk.categoryId?.name === "Slot Games"
    );
    sportsKiosks.value = data.data.filter(
      (kiosk) => kiosk.categoryId?.name === "Sports"
    );
    esportsKiosks.value = data.data.filter(
      (kiosk) => kiosk.categoryId?.name === "E-Sports"
    );
    fishingKiosks.value = data.data.filter(
      (kiosk) => kiosk.categoryId?.name === "Fishing"
    );
    lotteryKiosks.value = data.data.filter(
      (kiosk) => kiosk.categoryId?.name === "Lottery"
    );
  } catch (error) {
    console.error("Failed to fetch kiosks:", error);
  }
}

async function fetchSmsStatus() {
  try {
    const { data } = await get("sms-status");
    if (data.success) {
      smsStatus.value = data.status;
    }
  } catch (error) {
    console.error("Error fetching helps:", error);
  }
}

watchEffect(() => {
  if (allKiosks.value?.length > 0) {
    partners.value = allKiosks.value.map((kiosk) => ({
      image: kiosk.logo || kiosk.icon,
    }));
  }
});

watch(
  () => userData.value?._id,
  (newId, oldId) => {
    if (process.client && newId && newId !== oldId) {
      if (oldId && oldId !== newId) {
        cleanup();
      }
      if (!localStorage.getItem("adminAccess")) {
        connectSocketIO(userData.value);
      } else {
        console.log("Admin access - skipping Socket.IO connection");
      }
    }
  },
  { immediate: true }
);

onMounted(async () => {
  await fetchGeneralSetting();
  await fetchKiosks();
  await fetchSmsStatus();
  if (process.client && userData.value?._id) {
    if (!localStorage.getItem("adminAccess")) {
      connectSocketIO(userData.value);
      socket.value?.on("notification", (data) => {
        const notificationTitle =
          $locale.value === "en"
            ? data.title.en
            : $locale.value === "ms"
            ? data.title.ms
            : data.title.zh;

        const notificationMessage =
          $locale.value === "en"
            ? data.message.en
            : $locale.value === "ms"
            ? data.message.ms
            : data.message.zh;
        showNotification(notificationMessage, notificationTitle);
        fetchUnreadCount();
      });
    } else {
      console.log("Admin access - skipping Socket.IO connection in onMounted");
    }
  }
});
</script>
