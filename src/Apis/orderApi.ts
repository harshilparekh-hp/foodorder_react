import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7089/api/",
  }),
  tagTypes: ["orders"],
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderDetails) => ({
        url: "orders",
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: orderDetails,
      }),
      invalidatesTags: ["orders"]
    }),
    getOrders: builder.query({
      query: (userId) => ({
        url: "orders",
        params: {
          userId: userId,
        },
      }),
      providesTags: ["orders"],
    }),
    getOrderById: builder.query({
      query: (id) => ({
        url: `order/${id}`,
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOrderByIdQuery,
} = orderApi;
export default orderApi;
