import AxiosClient from "../utils/axiosClient";
import { GirlResponse } from "../types/girl";

const BASE_URL =
  "https://api.ccifn5lai-girlscout2-p2-public.model-t.cc.commerce.ondemand.com/rest/v2";
const TOKEN = "-rykdIrDio8ie67VsSNKqjf6ebU";

const client = new AxiosClient(BASE_URL, TOKEN);

/**
 * Get Girl information from API.
 * Returns full response including status and data.
 */
export const getGirl = async (
  body: any
): Promise<{ data: GirlResponse; status: number }> => {
  const response = await client.post<GirlResponse>("/girlscouts/getGirl", body);
  return {
    data: response.data,
    status: response.status,
  };
};
