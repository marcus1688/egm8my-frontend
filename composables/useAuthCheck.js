export const useAuthCheck = () => {
  const userData = useState("userData");
  const localePath = useLocalePath();
  const checkAuth = async () => {
    if (!userData.value) {
      return navigateTo(localePath("/login"));
    }
    return true;
  };

  return {
    checkAuth,
  };
};
