import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:7089/api/",
  }),
  tagTypes: ["ShoppingCarts"],
  endpoints: (builder) => ({
    getShoppingCarts: builder.query({
      query: (userId) => ({
        url: `shoppingcarts`,
        params: {
          userId: userId,
        },
      }),
      providesTags: ["ShoppingCarts"],
    }),

    //MUTATION
    updateShoppingCart: builder.mutation({
      query: ({ menuItemId, updateQuantityBy, userId }) => ({
        url: "shoppingcarts",
        method: "POST",
        params: {
          menuItemId,
          updateQuantityBy,
          userId,
        },
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
  }),
});


export const { useGetShoppingCartsQuery, useUpdateShoppingCartMutation } = shoppingCartApi;
export default shoppingCartApi;