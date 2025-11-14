<template>
  <div class="w-full">
    <!-- ✅ 隐藏的 Google 按钮 -->
    <div
      ref="googleButtonContainer"
      style="position: absolute; visibility: hidden; pointer-events: none"
    ></div>

    <!-- ✅ 自定义按钮 -->
    <button
      ref="customGoogleBtn"
      @click="triggerGoogleLogin"
      class="relative w-full h-11 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg class="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
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
const googleClientId = computed(() => config.public.googleClientId);
const googleButtonContainer = ref(null);
const customGoogleBtn = ref(null);

// ✅ 回调函数
const handleCredentialResponse = async (response) => {
  pageLoading.value = true;

  try {
    console.log("Google callback triggered");
    const { data } = await post("google-login", {
      credential: response.credential,
      referralCode: props.referralCode,
    });

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("gametoken", data.newGameToken);

      if (
        ["51f645b1", "ad440661", "156ef7b3"].includes(props.referralFromUrl) &&
        typeof fbq !== "undefined"
      ) {
        fbq("track", "CompleteRegistration");
      }

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
    console.error("Google 登录错误:", error);
    showAlert(
      $t("error"),
      error?.response?.data?.message?.en || $t("network_error"),
      "error"
    );
  } finally {
    pageLoading.value = false;
  }
};

// ✅ 点击自定义按钮时触发 Google 登录
const triggerGoogleLogin = () => {
  const gBtn = googleButtonContainer.value?.querySelector('div[role="button"]');
  if (gBtn) {
    console.log("Triggering Google button click");
    gBtn.click();
  } else {
    console.error("Google button not found");
  }
};

// ✅ 渲染 Google 按钮
const renderGoogleButton = () => {
  if (!window.google?.accounts?.id || !googleButtonContainer.value) {
    console.warn("Google SDK or container not ready");
    return;
  }

  console.log("Rendering Google button...");

  // 1. 初始化
  window.google.accounts.id.initialize({
    client_id: googleClientId.value,
    callback: handleCredentialResponse,
  });

  // 2. 清空容器
  googleButtonContainer.value.innerHTML = "";

  // 3. 渲染按钮
  window.google.accounts.id.renderButton(googleButtonContainer.value, {
    theme: "outline",
    size: "large",
    text: "signin_with",
    shape: "rectangular",
    logo_alignment: "left",
  });

  console.log("✅ Google button rendered");
};

onMounted(() => {
  // 等待 Google SDK 加载
  const checkSDK = setInterval(() => {
    if (window.google?.accounts?.id && googleButtonContainer.value) {
      clearInterval(checkSDK);
      renderGoogleButton();
    }
  }, 100);

  // 超时保护
  setTimeout(() => clearInterval(checkSDK), 10000);
});
</script>
