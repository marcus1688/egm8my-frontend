<!-- <template>
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
    console.log("=== Message Event ===");
    console.log("Origin:", event.origin);
    console.log("Data:", event.data);
    console.log("====================");
    if (event.origin !== "https://oauth.telegram.org") return;

    if (event.data && event.data.event === "auth_user") {
      handleTelegramAuth(event.data.user);
    }
  });
});
</script> -->

<template>
  <div class="w-full">
    <!-- ✅ 隐藏的 Telegram Widget -->
    <div
      ref="telegramButtonContainer"
      style="position: absolute; visibility: hidden; pointer-events: none"
    ></div>

    <!-- ✅ 自定义按钮 -->
    <button
      ref="customTelegramBtn"
      @click="triggerTelegramLogin"
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
const telegramButtonContainer = ref(null);
const customTelegramBtn = ref(null);

// ✅ 处理 Telegram 登录回调
const handleTelegramAuth = async (user) => {
  pageLoading.value = true;

  try {
    const { data } = await post("telegram-login", {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      photo_url: user.photo_url,
      auth_date: user.auth_date,
      hash: user.hash,
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

// ✅ 点击自定义按钮时触发隐藏的 Telegram 按钮
const triggerTelegramLogin = () => {
  // 查找 iframe 内的按钮或直接触发 iframe
  const iframe = telegramButtonContainer.value?.querySelector("iframe");
  if (iframe) {
    // 临时显示 iframe 并点击
    const container = telegramButtonContainer.value;
    container.style.position = "fixed";
    container.style.visibility = "visible";
    container.style.pointerEvents = "auto";
    container.style.zIndex = "10000";

    // 触发 iframe 点击
    setTimeout(() => {
      iframe.click();
    }, 100);
  }
};

// ✅ 渲染 Telegram Widget
const renderTelegramButton = () => {
  if (!telegramButtonContainer.value) {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://telegram.org/js/telegram-widget.js?22";
  script.async = true;
  script.setAttribute("data-telegram-login", config.public.telegramBotUsername);
  script.setAttribute("data-size", "large");
  script.setAttribute("data-radius", "8");
  script.setAttribute("data-onauth", "onTelegramAuth(user)");
  script.setAttribute("data-request-access", "write");

  telegramButtonContainer.value.appendChild(script);
};

// ✅ 全局回调
if (process.client) {
  window.onTelegramAuth = handleTelegramAuth;
}

onMounted(() => {
  const checkContainer = setInterval(() => {
    if (telegramButtonContainer.value) {
      clearInterval(checkContainer);
      renderTelegramButton();
    }
  }, 100);

  setTimeout(() => clearInterval(checkContainer), 10000);
});
</script>
