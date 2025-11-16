<template>
  <div class="w-full">
    <button
      @click="loginWithTelegram"
      class="relative w-full h-11 bg-[#0088cc] border-0 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-white hover:bg-[#0077b3] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="white">
        <path
          d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.03-2.76-.918c-.6-.187-.612-.6.125-.89l10.782-4.156c.5-.18.943.11.78.89z"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  referralCode: {
    type: String,
    default: "",
  },
  referralFromUrl: {
    type: String,
    default: "",
  },
});

const config = useRuntimeConfig();
const { post } = useApiEndpoint();
const router = useRouter();
const localePath = useLocalePath();
const pageLoading = useState("pageLoading");
const { showAlert, alertVisible } = useAlert();
const telegramBotUsername = computed(() => config.public.telegramBotUsername);

const loginWithTelegram = () => {
  const width = 550;
  const height = 470;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;

  const telegramWindow = window.open(
    `https://oauth.telegram.org/auth?bot_id=${
      config.public.telegramBotId
    }&origin=${encodeURIComponent(
      window.location.origin
    )}&embed=1&request_access=write`,
    "telegram-login",
    `width=${width},height=${height},left=${left},top=${top},resizable=no,scrollbars=no`
  );

  if (!telegramWindow) {
    showAlert($t("error"), "Please allow popups for Telegram login", "error");
  }
};

const handleTelegramAuth = async (user) => {
  pageLoading.value = true;

  try {
    const { data } = await post("telegram-login", {
      ...user,
      referralCode: props.referralCode,
    });

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("gametoken", data.newGameToken);

      showAlert(
        $t("success"),
        data.message[$locale.value] || $t("login_successful"),
        "success"
      );

      setTimeout(() => {
        alertVisible.value = false;
        router.push(localePath("/"));
      }, 800);
    } else {
      showAlert(
        data.status === "inactive" ? $t("warning") : $t("info"),
        data.message[$locale.value] || $t("login_failed"),
        data.status === "inactive" ? "warning" : "info"
      );
    }
  } catch (error) {
    console.error("Telegram 登录错误:", error);
    showAlert(
      $t("error"),
      error?.response?.data?.message?.en || $t("network_error"),
      "error"
    );
  } finally {
    pageLoading.value = false;
  }
};

onMounted(() => {
  window.addEventListener("message", (event) => {
    if (event.origin !== "https://oauth.telegram.org") return;

    if (event.data && event.data.event === "auth_user") {
      handleTelegramAuth(event.data.user);
    }
  });
});
</script>
