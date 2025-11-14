<template>
  <div class="relative w-full">
    <!-- ✅ 改为：只隐藏视觉，但保留点击功能 -->
    <div
      ref="googleButtonDiv"
      class="absolute inset-0 opacity-0 cursor-pointer"
      style="z-index: 10"
    ></div>

    <!-- 自定义按钮（在下层，只是装饰） -->
    <button
      :disabled="!isReady || isProcessing"
      class="relative w-full h-11 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-800 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed pointer-events-none"
    >
      <Icon
        v-if="isProcessing"
        icon="mdi:loading"
        class="w-5 h-5 animate-spin"
      />
      <template v-else>
        <svg class="w-5 h-5" viewBox="0 0 24 24">
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
        </svg>
      </template>
    </button>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

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
const isProcessing = ref(false);
const isReady = ref(false);
const isUserLoggedIn = useState("isUserLoggedIn");
const googleButtonDiv = ref(null);

watch(isUserLoggedIn, (newValue, oldValue) => {
  if (oldValue === true && newValue === false) {
    isProcessing.value = false;
  }
});

onMounted(() => {
  const checkGoogle = setInterval(() => {
    if (window.google?.accounts?.id) {
      clearInterval(checkGoogle);
      initializeGoogleSignIn();
    }
  }, 100);
  setTimeout(() => {
    clearInterval(checkGoogle);
    if (!isReady.value) {
      console.error("Google SDK failed to load");
    }
  }, 10000);
});

// function initializeGoogleSignIn() {
//   try {
//     window.google.accounts.id.initialize({
//       client_id: config.public.googleClientId,
//       callback: handleCredentialResponse,
//       auto_select: false,
//     });
//     window.google.accounts.id.renderButton(googleButtonDiv.value, {
//       type: "standard",
//       theme: "outline",
//       size: "large",
//     });
//     isReady.value = true;
//     console.log("Google Sign-In initialized");
//   } catch (error) {
//     console.error("Failed to initialize Google Sign-In:", error);
//   }
// }

function initializeGoogleSignIn() {
  try {
    console.log("🔧 Initializing Google Sign-In...");
    window.google.accounts.id.initialize({
      client_id: config.public.googleClientId,
      callback: handleCredentialResponse,
      auto_select: false,
    });
    renderGoogleButton();
    isReady.value = true;
    console.log("✅ Google Sign-In initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize Google Sign-In:", error);
  }
}

function renderGoogleButton() {
  console.log("🎨 Rendering Google button...");
  if (googleButtonDiv.value) {
    googleButtonDiv.value.innerHTML = "";
    window.google.accounts.id.renderButton(googleButtonDiv.value, {
      type: "standard",
      theme: "outline",
      size: "large",
    });
    console.log("✅ Google button rendered");

    // 检查按钮是否存在
    setTimeout(() => {
      const btn = googleButtonDiv.value?.querySelector('div[role="button"]');
      console.log("🔍 Button found:", btn ? "YES" : "NO", btn);
    }, 100);
  } else {
    console.log("❌ googleButtonDiv is null");
  }
}

// function handleGoogleLogin() {
//   if (!isReady.value || isProcessing.value) {
//     return;
//   }
//   const btn = googleButtonDiv.value?.querySelector('div[role="button"]');
//   if (btn) {
//     btn.click();
//   }
// }

function handleGoogleLogin() {
  console.log("👆 handleGoogleLogin called");

  if (!isReady.value || isProcessing.value) {
    console.log("⚠️ Disabled");
    return;
  }

  // ✅ 直接点击 googleButtonDiv
  if (googleButtonDiv.value) {
    console.log("✅ Clicking googleButtonDiv");
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    googleButtonDiv.value.dispatchEvent(clickEvent);

    // 或者更直接：
    googleButtonDiv.value.click();
  }
}

// async function handleCredentialResponse(response) {
//   if (isProcessing.value) {
//     return;
//   }
//   isProcessing.value = true;
//   pageLoading.value = true;
//   try {
//     const { data } = await post("google-login", {
//       credential: response.credential,
//       referralCode: props.referralCode,
//     });
//     if (data.success) {
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("refreshToken", data.refreshToken);
//       localStorage.setItem("gametoken", data.newGameToken);
//       showAlert(
//         $t("success"),
//         data.message[$locale.value] || $t("login_successful"),
//         "success"
//       );
//       setTimeout(() => {
//         alertVisible.value = false;
//         router.push(localePath("/"));
//       }, 800);
//     } else {
//       showAlert(
//         data.status === "inactive" ? $t("warning") : $t("info"),
//         data.message[$locale.value] || $t("login_failed"),
//         data.status === "inactive" ? "warning" : "info"
//       );
//       isProcessing.value = false;
//     }
//   } catch (error) {
//     console.error("Google 登录错误:", error);
//     showAlert(
//       $t("error"),
//       error?.response?.data?.message?.en || $t("network_error"),
//       "error"
//     );
//     isProcessing.value = false;
//   } finally {
//     pageLoading.value = false;
//   }
// }
async function handleCredentialResponse(response) {
  console.log("🎉 handleCredentialResponse called");
  console.log("📦 Response:", response);

  if (isProcessing.value) {
    console.log("⚠️ Already processing, skipping...");
    return;
  }

  console.log("🔄 Starting login process...");
  isProcessing.value = true;
  pageLoading.value = true;

  try {
    console.log("📤 Sending to backend...");
    const { data } = await post("google-login", {
      credential: response.credential,
      referralCode: props.referralCode,
    });

    console.log("📥 Backend response:", data);

    if (data.success) {
      console.log("✅ Login successful!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("gametoken", data.newGameToken);

      showAlert(
        $t("success"),
        data.message[$locale.value] || $t("login_successful"),
        "success"
      );

      setTimeout(() => {
        console.log("🚀 Redirecting...");
        alertVisible.value = false;
        router.push(localePath("/"));
      }, 800);
    } else {
      console.log("⚠️ Login failed:", data.message);
      showAlert(
        data.status === "inactive" ? $t("warning") : $t("info"),
        data.message[$locale.value] || $t("login_failed"),
        data.status === "inactive" ? "warning" : "info"
      );
      isProcessing.value = false;
      console.log("🔄 Re-rendering button after failure...");
      setTimeout(renderGoogleButton, 500);
    }
  } catch (error) {
    console.error("❌ Google 登录错误:", error);
    showAlert(
      $t("error"),
      error?.response?.data?.message?.en || $t("network_error"),
      "error"
    );
    isProcessing.value = false;
    console.log("🔄 Re-rendering button after error...");
    setTimeout(renderGoogleButton, 500);
  } finally {
    pageLoading.value = false;
    console.log("🏁 Login process finished");
  }
}

onMounted(() => {
  console.log("🚀 Component mounted");

  const checkGoogle = setInterval(() => {
    if (window.google?.accounts?.id) {
      console.log("✅ Google SDK loaded");
      clearInterval(checkGoogle);
      initializeGoogleSignIn();
    }
  }, 100);

  setTimeout(() => {
    clearInterval(checkGoogle);
    if (!isReady.value) {
      console.error("❌ Google SDK failed to load after 10s");
    }
  }, 10000);

  // 监听窗口焦点
  window.addEventListener("focus", () => {
    console.log("👀 Window focused");
    if (!isProcessing.value && isReady.value) {
      console.log("🔄 Re-rendering button on focus...");
      setTimeout(renderGoogleButton, 300);
    }
  });
});
</script>
