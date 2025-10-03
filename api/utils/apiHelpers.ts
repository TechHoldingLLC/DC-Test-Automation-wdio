import request, { Response } from "supertest";

/**
 * Wrapper for SuperTest API requests
 * Supports GET, POST, PUT, DELETE
 * Measures response time
 */

export const apiGet = async (
  baseUrl: string,
  endpoint: string,
  token?: string,
  queryParams?: Record<string, any>
) => {
  const startTime = Date.now();
  const req = request(baseUrl)
    .get(endpoint)
    .set("Content-Type", "application/json");

  if (token) req.set("Authorization", `Bearer ${token}`);
  if (queryParams) req.query(queryParams);

  const response: Response = await req;
  const responseTime = Date.now() - startTime;

  return { response, responseTime };
};

export const apiPost = async (
  baseUrl: string,
  endpoint: string,
  body: any,
  token?: string
) => {
  const startTime = Date.now();
  const req = request(baseUrl)
    .post(endpoint)
    .set("Content-Type", "application/json")
    .send(body);

  if (token) req.set("Authorization", `Bearer ${token}`);

  const response: Response = await req;
  const responseTime = Date.now() - startTime;

  return { response, responseTime };
};

export const apiPut = async (
  baseUrl: string,
  endpoint: string,
  body: any,
  token?: string
) => {
  const startTime = Date.now();
  const req = request(baseUrl)
    .put(endpoint)
    .set("Content-Type", "application/json")
    .send(body);

  if (token) req.set("Authorization", `Bearer ${token}`);

  const response: Response = await req;
  const responseTime = Date.now() - startTime;

  return { response, responseTime };
};

export const apiDelete = async (
  baseUrl: string,
  endpoint: string,
  token?: string
) => {
  const startTime = Date.now();
  const req = request(baseUrl)
    .delete(endpoint)
    .set("Content-Type", "application/json");

  if (token) req.set("Authorization", `Bearer ${token}`);

  const response: Response = await req;
  const responseTime = Date.now() - startTime;

  return { response, responseTime };
};
