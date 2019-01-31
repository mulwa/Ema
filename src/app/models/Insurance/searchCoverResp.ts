import { InsuranceCover } from "./insuranceCover";

export interface searchCoverResponse {
    responseCode:number;
    responseMessage:string;
    InsuranceCover:InsuranceCover[];
}