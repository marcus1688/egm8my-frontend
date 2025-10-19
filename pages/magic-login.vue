<template>
  <ClientOnly>
    <div class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div
          v-if="loading"
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"
        ></div>
        <div v-else-if="error" class="text-red-600">
          <p>{{ error }}</p>
        </div>
        <p v-if="loading" class="mt-4">Verifying Login ...</p>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
const route = useRoute();
const loading = ref(true);
const error = ref("");
const { cleanup } = useSocketIO();

useHead({
  meta: [
    { name: "robots", content: "noindex, nofollow" },
    { name: "googlebot", content: "noindex, nofollow" },
  ],
});

onMounted(async () => {
  const token = route.query.token;
  if (!token) {
    error.value = "No Token";
    loading.value = false;
    setTimeout(() => navigateTo("/login"), 2000);
    return;
  }
  try {
    const { get } = useApiEndpoint();
    const { data } = await get(`verify-magic-link/${token}`);
    if (data && data.success) {
      cleanup();
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("gametoken");
      localStorage.removeItem("adminAccess");
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("gametoken", data.newGameToken);
      localStorage.setItem("adminAccess", "true");
      const isUserLoggedIn = useState("isUserLoggedIn");
      isUserLoggedIn.value = true;
      window.location.replace("/");
    } else {
      error.value = data?.message?.zh || data?.message?.en || "Login Failed";
      loading.value = false;
      setTimeout(() => navigateTo("/login"), 3000);
    }
  } catch (apiError) {
    console.error("Magic link verification failed:", apiError);
    if (apiError.response?.data?.message) {
      error.value =
        apiError.response.data.message.zh || apiError.response.data.message.en;
    } else if (apiError.data?.message) {
      error.value = apiError.data.message.zh || apiError.data.message.en;
    } else {
      error.value = "Network Error";
    }
    loading.value = false;
    setTimeout(() => navigateTo("/login"), 3000);
  }
});
</script>
