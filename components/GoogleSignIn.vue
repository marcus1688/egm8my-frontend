<template>
  <div class="google-btn-custom">
    <GoogleSignInButton
      @success="handleSuccess"
      @error="handleError"
      type="standard"
      :theme="theme"
      :size="size"
      :text="text"
    />
    <button
      class="relative z-[1] w-full h-11 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-2 text-sm font-medium text-gray-800 pointer-events-none transition-all"
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
  type: {
    type: String,
    default: "standard",
  },
  theme: {
    type: String,
    default: "outline",
  },
  size: {
    type: String,
    default: "large",
  },
  text: {
    type: String,
    default: "signin_with",
  },
});

const { post } = useApiEndpoint();
const router = useRouter();
const localePath = useLocalePath();
const pageLoading = useState("pageLoading");
const { showAlert } = useAlert();
const isProcessing = ref(false);
const isUserLoggedIn = useState("isUserLoggedIn");

watch(isUserLoggedIn, (newValue, oldValue) => {
  if (oldValue === true && newValue === false) {
    isProcessing.value = false;
    if (window.google && window.google.accounts) {
      try {
        window.google.accounts.id.cancel();
      } catch (error) {
        console.log("Google reset error:", error);
      }
    }
  }
});

const handleSuccess = async (response) => {
  if (isProcessing.value) {
    console.log("Already processing, skipping...");
    return;
  }
  isProcessing.value = true;
  pageLoading.value = true;
  try {
    const { data } = await post("google-login", {
      credential: response.credential,
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
        router.push(localePath("/"));
      }, 800);
    } else {
      showAlert(
        data.status === "inactive" ? $t("warning") : $t("info"),
        data.message[$locale.value] || $t("login_failed"),
        data.status === "inactive" ? "warning" : "info"
      );
      isProcessing.value = false;
    }
  } catch (error) {
    console.error("Google 登录错误:", error);
    showAlert(
      $t("error"),
      error?.response?.data?.message?.en || $t("network_error"),
      "error"
    );
    isProcessing.value = false;
  } finally {
    pageLoading.value = false;
  }
};

const handleError = (error) => {
  console.error("Google Sign-In 错误:", error);
  showAlert($t("error"), $t("google_signin_failed"), "error");
};
</script>

<style scoped>
.google-btn-custom {
  position: relative;
  width: 100%;
}

.google-btn-custom :deep(div) {
  opacity: 0 !important;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  z-index: 2 !important;
  cursor: pointer !important;
}

.google-btn-custom:hover .custom-overlay-btn {
  background: #f9fafb;
  border-color: #d1d5db;
}
</style>
