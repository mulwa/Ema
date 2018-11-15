import { City } from './../../models/city';
import { BookingService } from './../../services/booking.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators} from  '@angular/forms';
import { Dates } from 'src/app/models/dates';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
   public cities:City[];
   public traveling_dates:Dates[];
  
  public bookForm:FormGroup;

  constructor(private fb: FormBuilder,
     private bookService:BookingService, private router:Router) { 

  }

  ngOnInit() {
    this.initializeForm()
    this.getCities()
    this.getTravelingDates()
  }
  initializeForm(){
    this.bookForm = this.fb.group({
      from:['', Validators.required],
      to_id:['',Validators.required],
      travel_date:['',Validators.required]
      
    })
  }
  getTravelingDates(){
    this.bookService.getTravelDates().subscribe(data =>{
      this.traveling_dates = data.dates;
      console.log(`${this.traveling_dates}`)
    }, error =>{
      console.log(`An Error Has Occured fetching Traveling Dates ${error.message}`)
    })
  }
  getCities(){
    this.bookService.getCitites().subscribe(data =>{
      this.cities = data.cities;
      console.log(`${this.cities}`)
    }, error =>{
      console.log(`Error Occured Fetching Cities ${error.message}`)
    })
  }
  searchVehicle(){
    console.log("search initialize")
    console.log(this.bookForm.value)
    let data = {
      from:this.bookForm.get('from').value, 
      to_id:this.bookForm.get('to_id').value,
      travel_date:this.bookForm.get('travel_date').value
    }    
    this.router.navigate(['/vehiclelist',{from:data.from, to_id:data.to_id, travel_date:data.travel_date}])
  } 

}
