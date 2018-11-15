import { Dates } from "./dates";

export interface TravelDateResponse {
    response_code:number,
    response_message:string,
    dates?:Dates[]
}
