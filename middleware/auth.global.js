export default defineNuxtRouteMiddleware(async (to, from) => {
  if (process.client) {
    const isUserLoggedIn = useState("isUserLoggedIn", () => false);
    const userData = useState("userData", () => null);
    const localePath = useLocalePath();
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      isUserLoggedIn.value = false;
      userData.value = null;
      return;
    }
    try {
      const { get } = useApiEndpoint();
      const { data } = await get("userdata");
      if (data.success) {
        isUserLoggedIn.value = true;
        userData.value = data.user;
        if (
          userData.value.bankAccounts.length === 0 &&
          to.path !== localePath("/myaccount/bankaccount")
        ) {
          return navigateTo(localePath("/myaccount/bankaccount"));
        }
      } else {
        isUserLoggedIn.value = false;
        userData.value = null;
      }
    } catch (error) {
      console.error("Auth Middleware Error:", error);
      isUserLoggedIn.value = false;
      userData.value = null;
    }
  }
});
