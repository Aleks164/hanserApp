import { HOST_NAME } from "@/constants";

export interface FeedbackData {
    data: Data;
    error: boolean;
    errorText: string;
    additionalErrors: null;
    nmId: string;
}

export interface Data {
    countUnanswered: number;
    countArchive: number;
    feedbacks: Feedback[];
}

export interface Feedback {
    id: string;
    text: string;
    productValuation: number;
    createdDate: string;
    answer: null | {
        editable: boolean;
        state: string;
        text: string
    };
    state: string;
    productDetails: ProductDetails;
    video: null;
    wasViewed: boolean;
    photoLinks: null;
    userName: string;
    matchingSize: string;
    isAbleSupplierFeedbackValuation: boolean;
    supplierFeedbackValuation: number;
    isAbleSupplierProductValuation: boolean;
    supplierProductValuation: number;
    isAbleReturnProductOrders: boolean;
    returnProductOrdersDate: null;
}

export interface ProductDetails {
    imtId: number;
    nmId: number;
    productName: string;
    supplierArticle: string;
    supplierName: string;
    brandName: string;
    size: string;
}

export enum FEEDBACK_PATH_NAMES {
    FEEDBACK = 'feedback'
}

function getFeedbacksByNmId(pathName: FEEDBACK_PATH_NAMES, nmid: number, isAnswered: boolean) {
    return fetch(`${HOST_NAME}/${pathName}?nmid=${nmid}&isAnswered=${isAnswered}`, {
        method: "GET",
    })
}

export default getFeedbacksByNmId;

