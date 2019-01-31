import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { insuranceUrl, username, api_key } from '../models/constants';
import { searchUserResponse } from '../models/Insurance/searchUserRes';
import { registerUserRes } from '../models/Insurance/registerUser';
import { searchCoverResponse } from '../models/Insurance/searchCoverResp';
import { PayInsuranceResponse } from '../models/Insurance/payInsuranceResponse';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {

  constructor(private http:HttpClient) {

   }
   checkIfRegistered(identify:string){
     let body = {
      developer_username:username,
      developer_api_key:api_key,
      action: "searchusers",
      identifier: identify
     }
     return this.http.put<searchUserResponse>(insuranceUrl,body)
   }
   registerNewUser(firstName, middle_name, lastname, idNo, phoneNo, emailAddress){
    let body = {
      developer_username:username,
      developer_api_key:api_key,
      action: "newuser",
      first_name:firstName,
      middle_name:middle_name,
      last_name:lastname,
      id_number: idNo,
      phone_number:phoneNo,
      email_address: emailAddress,
      country:"Kenya",
      address: "PO Box 60309-00100",
      city:"Nairobi"
     }
     return this.http.put<registerUserRes>(insuranceUrl,body)
   }
   searchCover(phoneNumber){
    let body = {
      developer_username:username,
      developer_api_key:api_key,
      action:"searchinsurancecover",
      search_criteria:"phone_number",
      search_text:phoneNumber
     }
     return this.http.put<searchCoverResponse>(insuranceUrl, body)
    
   }
   newCover(idNO, phoneNo,amount,from, to, travel_date, travel_time,ticket_no){
    let body = {
      developer_username:username,
      developer_api_key:api_key,
      action:"newcover",
      id_number:idNO,
      policy_name:"",
      phone_number:phoneNo,
      amount_paid:amount,
      travel_from:from,
      travel_to:to,
      travel_date:travel_date,
      travel_time:travel_time,
      ticket_number:ticket_no,
      bus_company: "Nduthi Sacco",
      reg_number: "KMDU111B"
      
     }
     return this.http.put<PayInsuranceResponse>(insuranceUrl,body)

   }
}
