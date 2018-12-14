import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sixteen-seater',
  templateUrl: './sixteen-seater.component.html',
  styleUrls: ['./sixteen-seater.component.css']
})
export class SixteenSeaterComponent implements OnInit {
  first_row:any;
  second_row:any;
  third_row:any;
  fourth_row:any; 
  fifth_row:any;
  total_seats:any;
  seat_selected = 'assets/images/seat/selected.png';
  seat_not_available = 'assets/images/seat/not-available.png';
  seat_available = 'assets/images/seat/available.png';

  constructor() { }

  ngOnInit() {
    this.initializeSeater16()
  }
  initializeSeater16(){
    this.first_row = ['1','1X','0'];
    this.second_row = ['2','3','4','5'];
    this.third_row = ['6','7','8'];
    this.fourth_row = ['9','10','11']
    this.fifth_row = ['12','13','14','15'] 
    // combine all the 11 seater array to one
    this.total_seats = this.first_row.concat(this.second_row, this.third_row, this.fourth_row,this.fifth_row);  
    console.log(this.total_seats) 
  }
  

}
