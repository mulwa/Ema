import { City } from './../../models/city';
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { FormBuilder,  FormGroup, Validators} from  '@angular/forms';
import { Dates } from 'src/app/models/dates';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {
  public cities:City[];
  public traveling_dates:Dates[];
  public searchForm:FormGroup;

  constructor(private bookService:BookingService, private fb:FormBuilder, private router:Router) { }

  ngOnInit() {
    this.getCity()
    this.getTravelingDates();
    this.initializeForm()
  }
  initializeForm(){
    this.searchForm = this.fb.group({
      from:['', Validators.required],
      to_id:['',Validators.required],
      travel_date:['',Validators.required]
      
    })
  }

  getCity(){
    this.bookService.getCitites().subscribe(data =>{
      this.cities = data.cities;
      console.log(this.cities)
    },error =>{
      console.log(`An Error has Occured ${error.message}`)
    })
  }
  getTravelingDates(){
    this.bookService.getTravelDates().subscribe(data =>{
      this.traveling_dates = data.dates;
      console.log(this.traveling_dates)
    }, error =>{
      console.log(`An Error Has Occured fetching Traveling Dates ${error.message}`)
    })
  }
  onSearch(){
    console.log("search clicked")
    this.router.navigate(['/vehiclelist',{from:this.searchForm.get('from').value, to_id:this.searchForm.get('to_id').value, travel_date:this.searchForm.get('travel_date').value}])
  }

}
