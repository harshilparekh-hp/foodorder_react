import { shoppingCartModel } from "../../../Interfaces";
import { SD_Status } from "../../../Utility/SD";

export interface OrderSummaryProps {
    apiResult: {
        id?: number;
        cartItems?: shoppingCartModel[];
        cartTotal?: number;
        userId?: string;
        stripPaymentIntentId?: string;
        status?: SD_Status;
    };
    userInput: {
        name: string;
        email: string;
        phoneNumber: string;
    }
}