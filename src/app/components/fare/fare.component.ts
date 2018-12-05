import { BookingService } from './../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { Bus } from 'src/app/models/bus';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-fare',
  templateUrl: './fare.component.html',
  styleUrls: ['./fare.component.css']
})
export class FareComponent implements OnInit {
  availableBuses:Bus[];
   today:any;
  loading:boolean = true

  constructor(private bookingService:BookingService) {
    this.today = formatDate(new Date(), 'dd-MM-yyyy', 'en'); 
    console.log('constructor called')
    
   }

  ngOnInit() {
    console.log('ngOnit called')
    this.getSchedule(this.today)
    console.log(this.today)
  }
  getSchedule(date:any){    
    this.bookingService.getVehicleSchedule(date).subscribe(data =>{      
      this.loading = false
      this.availableBuses = data.bus;
    })
  }

}

