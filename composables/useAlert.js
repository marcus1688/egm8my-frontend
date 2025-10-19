const alertVisible = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");
const alertType = ref("info");

export function useAlert() {
  function showAlert(title, message, type = "info") {
    alertTitle.value = title;
    alertMessage.value = message;
    alertType.value = type;
    alertVisible.value = true;
  }

  return {
    alertVisible,
    alertTitle,
    alertMessage,
    alertType,
    showAlert,
  };
}
