import { shoppingCartModel } from "../../../Interfaces";

export interface OrderSummaryProps {
    apiResult: {
        id: number;
        cartItems: shoppingCartModel[];
        cartTotal: number;
        userId: string;
        stripPaymentIntentId: string;
        
    };
    userInput: {
        name: string;
        email: string;
        phoneNumber: string;
    }
}