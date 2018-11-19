import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { username, api_key, baseUrl, hash, ReferenceNumberUrl } from '../models/constants';
import { LocationResponse } from '../models/location-response';
import { TravelDateResponse } from '../models/travel-date-response';
import { from } from 'rxjs';
import { AvailableBusResponse } from '../models/available-bus-response';
import { VehicleDetailsI } from '../models/responseI';
import { ReferenceRes } from '../models/ReferenceResp';
import { ReservationRes } from '../models/reservationResponse';
import { Reservation } from '../models/reservationI';
import { TicketResponse } from '../models/ticketRes';
import { mpesaResponse } from '../models/mpesaRes';
import { responseI } from '../models/response.1';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor( private http:HttpClient) {

   }
   // gets all available cities
  public getCitites(){   
    const cityParams = {
      username: username,
      api_key: api_key,
      action:"AvailableCities"    
    }
    return this.http.post<LocationResponse>(baseUrl,cityParams);
  }
  // gets travelling dates
  getTravelDates(){
    const cityParams = {
      username: username,
      api_key: api_key,
      action:"AvailableDates"    
    }
    return this.http.post<TravelDateResponse>(baseUrl,cityParams);
  }
  getAvaliableVehicle(from:number,to_id:number, travel_date:string){
    let body = {
      username: username,
      api_key: api_key,
      action:"SearchSchedule",
      hash:hash,
      travel_from:from,
      travel_to:to_id,      
      travel_date:travel_date,               
    }
    return this.http.post<AvailableBusResponse>(baseUrl,body);
  }
  getVehicleDetails(from:number,to_id:number, travel_date:string,selected_vehicle:number){
    let body = {
      username: username,
      api_key: api_key,
      action:"AvailableSeats",
      hash:hash,
      from_city:from,
      to_city:to_id,
      travel_date:travel_date,
      selected_vehicle:selected_vehicle         
    }
    console.log(body)
    return this.http.post<VehicleDetailsI>(baseUrl,body);

  }
  generateReferenceNumber(){  
    let body = {
      developer_username: username,
      developer_api_key: api_key,
      action:"generatereferencenumber"
    }
  return this.http.put<ReferenceRes>(ReferenceNumberUrl,body);
  
  }
  getTicketDetails(from:number,to_id:number, travel_date:string,selected_vehicle:number,
    seater:number,selected_seat:number){
    let body = {
      username: username,
      api_key: api_key,
      action:"TicketTypes",
      hash:hash,
      from_city:from,
      to_city:to_id,
      travel_date:travel_date,
      selected_vehicle:selected_vehicle,
      selected_seat:selected_seat,
      seater:seater     
              
    }
    console.log(body)
    return this.http.post<VehicleDetailsI>(baseUrl,body);
  }
  reserveBooking(from_city:number, to_city:number, travel_date:string, selected_vehicle:number, seater:number, selected_ticket_type:number, selected_seat:number, 
    payment_method:number, phone_number:string, passenger_name:string, email_address:string, id_number:string,
     insurance_charge:string, served_by:string, amount_charged:string, reference_number:string){
    let body:Reservation = {
      username:username,
      api_key:api_key,
      hash:hash,
      action:'ReserveSeats',
      from_city:from_city,
      to_city:to_city,
      travel_date:travel_date,      
      selected_vehicle:selected_vehicle,
      seater:seater,  
      selected_ticket_type:selected_ticket_type, 
      selected_seat:selected_seat,         
      payment_method:payment_method,
      phone_number: phone_number,
      id_number:id_number,
      passenger_name:passenger_name,
      email_address: email_address,
      insurance_charge:insurance_charge,
      served_by:served_by,
      amount_charged: amount_charged,
      reference_number: reference_number
    }    
    console.log(body)      
    return this.http.post<ReservationRes>(baseUrl,body)
  }
  getTicketInfor(phone_number:string){
    let body = {
      username:username,
      api_key:api_key,
      action:"SearchTicket",
      identifier:phone_number
    }  
    return this.http.post<TicketResponse>(baseUrl,body)
  }
  mpesaPayment(referenceNo, phone_number){
    let body = {
      username:username,
      api_key:api_key,
      action:"AuthorizePayment",
      payment_method:"3",
      reference_number:referenceNo,
      mpesa_phone_number:phone_number
    }
    return this.http.post<mpesaResponse>(baseUrl,body)
    
  }
  authorizeJamboPayment(jambopay_username, password, referenceNo){
    let body = {
    username:username,
    api_key:api_key,
    action:"AuthorizePayment",
    payment_method:"2",
    reference_number:referenceNo,
    jambopay_wallet_username:jambopay_username,
    jambopay_wallet_password:password
  }
  console.log('authorizeJamboPayment value set to server'+JSON.stringify(body))
  return this.http.post<responseI>(baseUrl,body);
  
  }


}

