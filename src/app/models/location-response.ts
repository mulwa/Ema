import { City } from "./city";

export interface LocationResponse {
    response_code:number,
    response_message:string,
    cities?:City[]
}
