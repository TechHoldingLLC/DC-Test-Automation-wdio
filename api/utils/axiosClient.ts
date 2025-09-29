import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * AxiosClient is a wrapper around Axios to provide
 * a reusable HTTP client with base configuration.
 *
 * Features:
 * - Base URL support
 * - Optional Bearer Token authentication
 * - JSON headers by default
 * - Timeout handling
 * - Returns full AxiosResponse for status, headers, and data
 */
class AxiosClient {
  private client: AxiosInstance;

  /**
   * Create an AxiosClient instance.
   * @param baseURL - Base URL for all requests
   * @param token - Optional Bearer token for Authorization header
   */
  constructor(baseURL: string, token?: string) {
    this.client = axios.create({
      baseURL,
      timeout: 5000,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });
  }

  /**
   * Perform a POST request and return full AxiosResponse.
   * @param url - Endpoint relative to baseURL
   * @param body - Request payload
   * @param config - Optional Axios request configuration
   * @returns AxiosResponse<T> containing status, headers, and data
   */
  async post<T>(
    url: string,
    body: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    const response = await this.client.post<T>(url, body, config);
    return response; // Returns full response (data + status + headers)
  }
}

export default AxiosClient;
