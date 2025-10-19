import { io } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
const { showAlert } = useAlert();

export const useSocketIO = () => {
  const { get, post } = useApiEndpoint();
  const socket = ref(null);
  const isLoggedOut = ref(false);
  const heartbeatInterval = ref(null);

  const startHeartbeat = () => {
    if (heartbeatInterval.value) {
      clearInterval(heartbeatInterval.value);
    }
    heartbeatInterval.value = setInterval(() => {
      if (socket.value?.connected) {
        // console.log("💓 User sending heartbeat");
        socket.value.emit("ping", { timestamp: Date.now() });
      }
    }, 30000);
  };

  const generateUniqueId = () => uuidv4();

  const getOrCreateDeviceId = () => {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = generateUniqueId();
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  };

  const handleForceLogout = async () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("gametoken");
      showAlert(
        $t("force_logout_title"),
        $t("force_logout_message"),
        "warning"
      );
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Error processing force logout:", error);
    }
  };

  const handleDuplicateLogin = async () => {
    isLoggedOut.value = true;
    try {
      if (socket.value) {
        socket.value.disconnect();
        socket.value = null;
      }
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("gametoken");
      showAlert(
        $t("duplicate_login_title"),
        $t("duplicate_login_message"),
        "warning"
      );
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Error handling duplicate login:", error);
    }
  };

  const connectSocketIO = (userData) => {
    if (isLoggedOut.value || socket.value?.connected) {
      return;
    }

    const deviceId = getOrCreateDeviceId();
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    socket.value = io(import.meta.env.VITE_SOCKET_IO_URL, {
      withCredentials: true,
      auth: {
        token,
        refreshToken,
        isAdmin: false,
      },
      reconnection: true,
      reconnectionAttempts: 3,
      reconnectionDelay: 2000,
      reconnectionDelayMax: 10000,
      timeout: 10000,
      pingTimeout: 60000,
      pingInterval: 25000,
    });

    socket.value.on("connect", () => {
      console.log("Socket.IO connected");
      socket.value.emit("setUserId", {
        userId: userData?._id,
        deviceId: deviceId,
      });
      startHeartbeat();
    });

    socket.value.on("token:refresh", (data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        socket.value.auth.token = data.token;
      }
    });

    socket.value.on("reconnect", (attemptNumber) => {
      console.log("Socket.IO reconnected after", attemptNumber, "attempts");
      startHeartbeat();
    });

    socket.value.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    socket.value.on("disconnect", (reason) => {
      console.log("Socket.IO disconnected:", reason);
      if (heartbeatInterval.value) {
        clearInterval(heartbeatInterval.value);
        heartbeatInterval.value = null;
      }
    });

    socket.value.on("forceLogout", handleForceLogout);

    socket.value.on("duplicateLogin", handleDuplicateLogin);
  };

  const cleanup = () => {
    if (heartbeatInterval.value) {
      clearInterval(heartbeatInterval.value);
      heartbeatInterval.value = null;
    }
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  };

  return {
    socket,
    connectSocketIO,
    handleForceLogout,
    handleDuplicateLogin,
    cleanup,
  };
};
