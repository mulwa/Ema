import { City } from './../../models/city';
import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { FormBuilder,  FormGroup, Validators} from  '@angular/forms';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {
  public cities:City[];
  public searchForm:FormGroup;

  constructor(private bookService:BookingService, private fb:FormBuilder) { }

  ngOnInit() {
    this.getCity()
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
  onSearch(){
    console.log("search clicked")
    console.log(this.searchForm.value)
  }

}
