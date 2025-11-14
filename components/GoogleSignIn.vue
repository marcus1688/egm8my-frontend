<template>
  <GoogleSignInButton
    class="w-full"
    @success="handleSuccess"
    @error="handleError"
    :type="type"
    :theme="theme"
    :size="size"
    :shape="shape"
  />
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
    default: "icon",
  },
  theme: {
    type: String,
    default: "filled_black",
  },
  size: {
    type: String,
    default: "large",
  },
  shape: {
    type: String,
    default: "rectangular",
  },
  width: {
    type: Number,
    default: 500,
  },
});

const { post } = useApiEndpoint();
const router = useRouter();
const localePath = useLocalePath();
const pageLoading = useState("pageLoading");
const { showAlert } = useAlert();

const handleSuccess = async (response) => {
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
      if (
        (props.referralFromUrl === "51f645b1" ||
          props.referralFromUrl === "ad440661" ||
          props.referralFromUrl === "156ef7b3") &&
        typeof window !== "undefined" &&
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
        router.push(localePath("/"));
      }, 1000);
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
      error.response?.data?.message?.en || $t("network_error"),
      "error"
    );
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
:deep(.S9gUrf-YoZ4jf) {
  width: 100% !important;
}

:deep(.nsm7Bb-HzV7m-LgbsSe) {
  width: 100% !important;
  border: none !important;
  outline: none !important;
}

:deep(.nsm7Bb-HzV7m-LgbsSe:hover) {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

:deep(.nsm7Bb-HzV7m-LgbsSe:focus) {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}

:deep(.nsm7Bb-HzV7m-LgbsSe-Bz112c-haAclf) {
  width: 100% !important;
}

:deep(div[role="button"]) {
  border: none !important;
  outline: none !important;
}

:deep(div[role="button"]:hover) {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

:deep(div[role="button"]:focus) {
  outline: none !important;
  box-shadow: none !important;
  border: none !important;
}
</style>
