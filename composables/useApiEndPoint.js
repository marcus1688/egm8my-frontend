export const useApiEndpoint = () => {
  const config = useRuntimeConfig();

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return null;
      const response = await fetch(`${config.public.apiUrl}refresh-token`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem("token", token);
        return token;
      }
      return null;
    } catch (error) {
      console.error("Error refreshing token:", error);
      return null;
    }
  };

  const callApi = async (
    endpoint,
    method = "GET",
    body = null,
    customHeaders = {}
  ) => {
    try {
      const token = localStorage.getItem("token");
      const requestConfig = {
        method,
        credentials: "include",
        headers: {
          ...customHeaders,
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      if (body && method !== "GET") {
        if (body instanceof FormData) {
          requestConfig.body = body;
        } else {
          requestConfig.headers["Content-Type"] = "application/json";
          requestConfig.body = JSON.stringify(body);
        }
      }

      let response = await fetch(
        `${config.public.apiUrl}${endpoint}`,
        requestConfig
      );

      if (!response.ok) {
        throw {
          status: response.status,
          message: response.statusText,
          endpoint: endpoint,
        };
      }

      const data = await response.json();
      if (data.authorized === false) {
        const newToken = await refreshAccessToken();
        if (newToken) {
          requestConfig.headers["Authorization"] = `Bearer ${newToken}`;
          response = await fetch(
            `${config.public.apiUrl}${endpoint}`,
            requestConfig
          );
          const newData = await response.json();
          if (response.ok && newData.authorized !== false) {
            return { data: newData };
          }
        }
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("gametoken");
        return { data: null, error: new Error("Authentication required") };
      }
      return { data };
    } catch (error) {
      console.error("API Error:", error);
      // Swal.fire({
      //   title: "Network Error",
      //   text: `Error occurred while calling ${endpoint}. Please try again later.`,
      //   icon: "error",
      // });
      return { data: null, error };
    }
  };

  return {
    callApi,
    get: (endpoint, headers) => callApi(endpoint, "GET", null, headers),
    post: (endpoint, body, headers) => callApi(endpoint, "POST", body, headers),
    put: (endpoint, body, headers) => callApi(endpoint, "PUT", body, headers),
    delete: (endpoint, body, headers) =>
      callApi(endpoint, "DELETE", body, headers),
    patch: (endpoint, body, headers) =>
      callApi(endpoint, "PATCH", body, headers),
  };
};
