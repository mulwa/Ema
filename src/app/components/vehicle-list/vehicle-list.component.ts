import { Bus } from './../../models/bus';
import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  from:number;
  to_id:number;
  traveling_from:string;
  traveling_to:string;
  travel_date:string;
  showloading:boolean = true;
  data;
  availableBuses:Bus[];


  constructor(private bookService:BookingService,
             private activateRoute:ActivatedRoute,
             private router:Router){ 

  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.from = params['from']
      this.to_id  = params['to_id']
      this.travel_date = params['travel_date']      
    })
    console.log(`${this.from} ${this.to_id} ${this.travel_date}`)
    this.getAvailableVehicles()
    
  }
  getAvailableVehicles(){
    this.bookService.getAvaliableVehicle(this.from, this.to_id,this.travel_date).subscribe(data =>{
      this.showloading = false;
      this.availableBuses = data.bus;

      if(data.bus.length > 0){
        console.log(data.bus[0].route)
        this.traveling_from = this.availableBuses[0].from;
        this.traveling_to = this.availableBuses[0].to;
        console.log(this.availableBuses)
      }else {
        console.log(`No vehicle found for this route`)
      }
      
    })
  }
  openBookingPage(bus:Bus){
    console.log(`Bus clicked ${bus.id} ${bus.seats[0].seater}`)
    this.router.navigate(['/vehicledetails',{route:bus.route,from_city:bus.from,to_city:bus.to,from_id:this.from, to_id:this.to_id,id:bus.id,travel_date:bus.departure_time,seater:bus.seats[0].seater}])
    
  }

}
