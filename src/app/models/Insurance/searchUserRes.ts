import { User } from "./user";

export interface searchUserResponse {
    response_code:number,
    response_message:string,
    users:User[]
}