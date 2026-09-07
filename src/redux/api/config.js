import axios from "axios";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method = "get", data, params }, api) => {
    try {
      const token = api.getState().auth.token;
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const result = await axios({ url: baseUrl + url, method, data, params, headers });
      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
