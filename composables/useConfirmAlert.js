const isConfirmAlertVisible = ref(false);
const confirmAlertTitle = ref("");
const confirmAlertMessage = ref("");
const confirmAlertType = ref("warning");

let resolvePromise;

export function useConfirmAlert() {
  function showConfirmAlert(title, message, type = "warning") {
    confirmAlertTitle.value = title;
    confirmAlertMessage.value = message;
    confirmAlertType.value = type;
    isConfirmAlertVisible.value = true;

    return new Promise((resolve) => {
      resolvePromise = resolve;
    });
  }

  function closeConfirmAlert(result = false) {
    isConfirmAlertVisible.value = false;
    if (resolvePromise) {
      resolvePromise(result);
      resolvePromise = null;
    }
  }

  return {
    isConfirmAlertVisible,
    confirmAlertTitle,
    confirmAlertMessage,
    confirmAlertType,
    showConfirmAlert,
    closeConfirmAlert,
  };
}
