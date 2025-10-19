<template>
  <ClientOnly>
    <Alerts
      :title="alertTitle"
      :message="alertMessage"
      :isVisible="alertVisible"
      :type="alertType"
      @close="alertVisible = false"
    />
    <Notification
      :visible="notificationState.visible"
      :title="notificationState.title"
      :message="notificationState.message"
    />
    <ConfirmAlert
      :title="confirmAlertTitle"
      :message="confirmAlertMessage"
      :isVisible="isConfirmAlertVisible"
      :type="confirmAlertType"
      @close="handleConfirmClose"
    />
    <PageLoading v-if="pageLoading || gameLoading" />
    <div class="fixed inset-0 flex flex-col">
      <Header v-if="!excludeNavigationFooter" />
      <div ref="scrollContainer" class="flex-1 overflow-y-auto">
        <NuxtPage />
        <div class="max-lg:hidden" v-if="!excludeNavigationFooter">
          <Footer />
        </div>
        <div
          class="lg:hidden"
          v-if="!isUserLoggedIn && !excludeNavigationFooter"
        >
          <Footer />
        </div>
      </div>
      <div v-if="!excludeNavigationFooter" class="lg:hidden">
        <MobileFooter />
      </div>
    </div>
  </ClientOnly>
</template>
<script setup>
const { alertVisible, alertTitle, alertMessage, alertType, showAlert } =
  useAlert();
const { notificationState } = useNotification();
const scrollContainer = ref(null);
const pageLoading = useState("pageLoading", () => false);
const {
  isConfirmAlertVisible,
  confirmAlertTitle,
  confirmAlertMessage,
  confirmAlertType,
  showConfirmAlert,
  closeConfirmAlert,
} = useConfirmAlert();
const route = useRoute();
const gameLoading = useState("gameLoading");
const excludeNavigation = computed(() => {
  return route.path.includes("/");
});
const excludeNavigationFooter = computed(() => {
  return route.path.includes("/login") || route.path.includes("/register");
});

function handleConfirmClose(confirmed) {
  closeConfirmAlert(confirmed);
}
const isUserLoggedIn = useState("isUserLoggedIn");

watch(
  () => route.path,
  (newPath, oldPath) => {
    if (oldPath && newPath !== oldPath) {
      if (scrollContainer.value) {
        scrollContainer.value.scrollTop = 0;
      }
    }
  }
);
</script>
<style></style>
