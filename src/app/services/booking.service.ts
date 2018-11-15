import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { username, api_key, baseUrl, hash } from '../models/constants';
import { LocationResponse } from '../models/location-response';
import { TravelDateResponse } from '../models/travel-date-response';
import { from } from 'rxjs';
import { AvailableBusResponse } from '../models/available-bus-response';
import { VehicleDetailsI } from '../models/responseI';

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
}
