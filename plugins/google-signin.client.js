export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const loadGoogleSDK = () => {
    return new Promise((resolve, reject) => {
      if (window.google?.accounts?.id) {
        resolve(window.google);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        const checkGoogle = setInterval(() => {
          if (window.google?.accounts?.id) {
            clearInterval(checkGoogle);
            resolve(window.google);
          }
        }, 50);

        setTimeout(() => {
          clearInterval(checkGoogle);
          reject(new Error("Google SDK timeout"));
        }, 10000);
      };
      script.onerror = () => reject(new Error("Failed to load Google SDK"));
      document.head.appendChild(script);
    });
  };
  loadGoogleSDK()
    .then(() => {
      console.log("✅ Google SDK loaded globally");
    })
    .catch((error) => {
      console.error("❌ Failed to load Google SDK:", error);
    });

  return {
    provide: {
      googleSDK: {
        isLoaded: () => !!window.google?.accounts?.id,
      },
    },
  };
});
