import { Bus } from './../../models/bus';
import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  providers: [DatePipe]
})
export class VehicleListComponent implements OnInit {
  from: number;
  to_id: number;
  traveling_from: string;
  traveling_to: string;
  travel_date: string;
  showloading: boolean = true;
  data;
  availableBuses: Bus[] = [];
  currentTime: any;
  currentDate: any = Date.now();
  arrivalTime: any;
  no_search_result: boolean = false;

  citiesNotAllowed: any[] = [1]

  constructor(private bookService: BookingService,
    private activateRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router) {
    this.currentTime = new Date();

    this.arrivalTime = new Date().getFullYear

    this.currentTime = this.datePipe.transform(this.currentTime, 'H:m');
    this.currentDate = this.datePipe.transform(this.currentDate, 'dd-MM-yyyy');

  }
  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      this.from = params['from']
      this.to_id = params['to_id']
      this.travel_date = params['travel_date']
    })
    console.log(`${this.from} ${this.to_id} ${this.travel_date}`)
    this.getAvailableVehicles()
  }
  getAvailableVehicles() {
    this.bookService.getAvaliableVehicle(this.from, this.to_id, this.travel_date).subscribe(data => {
      this.showloading = false;
      if (data.bus.length > 0) {
        this.traveling_from = data.bus[0].from;
        this.traveling_to = data.bus[0].to;

        data.bus.forEach((x) => {
          let deptureTime = x.departure_time.split(',')[1];
          console.log('Time Difference' + this.calculateTimeDiff(this.currentTime, deptureTime))
          if (parseInt(deptureTime) != parseInt('00:00') && !this.citiesNotAllowed.includes(x.id) && this.calculateTimeDiff(this.currentTime, deptureTime) < 1) {
            this.availableBuses.push(x)
          }
        }) //end foreach

      } else {
        this.showloading = false;
        console.log(`No vehicle found for this route`)
        this.no_search_result = true;
      }

    },error =>{
      console.log('An Error Has Occured'+error)
    })
  }
  calculateTimeDiff(cTime, departureTime) {
    let hours;
    if (this.currentDate == this.travel_date) {
      departureTime = departureTime.split(":");
      cTime = cTime.split(":");
      var startDate = new Date(0, 0, 0, departureTime[0], departureTime[1], 0);
      var endDate = new Date(0, 0, 0, cTime[0], cTime[1], 0);
      var diff = endDate.getTime() - startDate.getTime();

      hours = Math.floor(diff / 1000 / 60 / 60);
      diff -= hours * 1000 * 60 * 60;
      var minutes = Math.floor(diff / 1000 / 60);
      return hours;

    } else {
      return 0;
    }
    // return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;
  }
  openBookingPage(bus: Bus) {
    console.log(`Bus clicked ${bus.id} ${bus.seats[0].seater}`)
    this.router.navigate(['/vehicledetails', { route: bus.route, from_city: bus.from, to_city: bus.to, from_id: this.from, to_id: this.to_id, id: bus.id, travel_date: bus.departure_time, seater: bus.seats[0].seater }])

  }





}
