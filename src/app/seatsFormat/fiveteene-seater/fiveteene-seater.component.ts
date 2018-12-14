import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fiveteene-seater',
  templateUrl: './fiveteene-seater.component.html',
  styleUrls: ['./fiveteene-seater.component.css']
})
export class FiveteeneSeaterComponent implements OnInit {
  seat_selected = 'assets/images/seat/selected.png';
  seat_not_available = 'assets/images/seat/not-available.png';
  seat_available = 'assets/images/seat/available.png';
  first_row:any;
  second_row:any;
  third_row:any;
  fourth_row:any; 
  fifth_row:any;
  total_seats:any;
  selected_seats:string[] = [];

  constructor() { }

  ngOnInit() {
    this.initializeSeater15()
  }

  initializeSeater15(){
    this.first_row = ['1','1X','0'];
    this.second_row = ['2','3','4'];
    this.third_row = ['5','6','7'];
    this.fourth_row = ['8','9','10'];
    this.fifth_row = ['11','12','13','14'];
    // combine all the 11 seater array to one
    this.total_seats = this.first_row.concat(this.second_row, this.third_row, this.fourth_row,this.fifth_row);  
    console.log(this.total_seats) 
  }

}
