import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { City } from 'src/app/models/city';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public cities:City[];

 
  constructor( private bookService:BookingService) { }

  ngOnInit() {
    this.getCities();
  }

  getCities(){
    this.bookService.getCitites().subscribe(res =>{
      this.cities = res.cities;
      console.log(`${this.cities}`)
    }, error =>{
      console.log(`Error Occured Fetching Cities ${error.message}`)
    })
  }

}
