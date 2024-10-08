import orderDetailModel from "./orderDetailModel";

export default interface orderHeaderModel {
    orderHeaderId: number;
    pickupName: string;
    pickupPhoneNumber: String;
    pickupEmail: String;
    applicationUserId: string;
    user?: any;
    orderTotal: number;
    orderDate: Date;
    stripPaymentIntentId: string;
    status?: string;
    totalItems?: number;
    orderDetails?: orderDetailModel[];
  }