import AxiosClient from "../utils/axiosClient";

const BASE_URL =
  "https://api.ccifn5lai-girlscout2-p2-public.model-t.cc.commerce.ondemand.com/rest/v2";

/**
 * Get Girl information from API.
 * Returns full response including status and data.
 */
export const getGirl = async (
  body: any,
  token: string
): Promise<{ data: any; status: number }> => {
  const client = new AxiosClient(BASE_URL, token);
  const response = await client.post<any>("/girlscouts/getGirl", body);
  return {
    data: response.data,
    status: response.status,
  };
};
