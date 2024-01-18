import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../../../utils/consts";

export const userAPI = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://${BASE_URL.host}:${BASE_URL.port}`,
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    fetchAllUsers: build.query({
      query: () => ({
        url: "/api",
        method: "POST",
        body: {
          cmd: "get_AllUser",
          arg: {},
          sess_code:
            "6ee5b266d7c7624bc6fd87320b40f5aafa5dcaf472a58da13d808c8fa2a40d52",
        },
      }),
      providesTags: (result) => ["Users"],
    }),
  }),
});
