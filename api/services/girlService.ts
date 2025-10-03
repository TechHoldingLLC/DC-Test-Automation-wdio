import request from "supertest";
import { getApiBaseUrl } from "../utils/envApiUtils";
import { apiPost } from "../utils/apiHelpers";

export const getGirl = async (body: any, token: string) => {
  const BASE_URL = getApiBaseUrl();
  return await apiPost(BASE_URL, "/girlscouts/getGirl", body, token);
};
