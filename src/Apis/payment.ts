import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
    reducerPath: "paymentApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://localhost:7089/api/"
    }),
    endpoints: (builder) => ({
        initiatePayment: builder.mutation({
            query: (userId) => ({
                url: "stripepayments",
                method: "POST",
                params: {
                    userId: userId
                }
            }),
        }),
    }),
});

export const {useInitiatePaymentMutation} = paymentApi;
export default paymentApi;