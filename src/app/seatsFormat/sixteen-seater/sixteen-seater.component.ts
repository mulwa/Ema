import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sixteen-seater',
  templateUrl: './sixteen-seater.component.html',
  styleUrls: ['./sixteen-seater.component.css']
})
export class SixteenSeaterComponent implements OnInit {
  seats_selected:any[]= []  
  first_row:any;
  second_row:any;
  third_row:any;
  fourth_row:any; 
  fifth_row:any;
  total_seats:any;
  seat_selected = 'assets/images/seat/selected.png';
  seat_not_available = 'assets/images/seat/not-available.png';
  seat_available = 'assets/images/seat/available.png';

  @Input()
  available_seats:any[] 
  
  @Output()
  seatSelectionEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    this.initializeSeater16()
  }
  initializeSeater16(){
    this.first_row = ['1','1X','Drv'];
    this.second_row = ['2','3','4'];
    this.third_row = ['5','6','7'];
    this.fourth_row = ['8','9','10']
    this.fifth_row = ['11','12','13','14'] 
    // combine all the 11 seater array to one
    this.total_seats = this.first_row.concat(this.second_row, this.third_row, this.fourth_row,this.fifth_row);  
    console.log(this.total_seats) 
  }
 

  selectSeat(seatNo){ 
    let index = this.seats_selected.indexOf(seatNo)
    if(index !== -1){
      this.seats_selected.splice(index,1)
      this.seatSelectionEvent.emit(seatNo)
    }else{
      this.seats_selected.push(seatNo)
      this.seatSelectionEvent.emit(seatNo)
    }
  }
  checkIfSelected(seatNo){
    if(this.seats_selected.indexOf(seatNo) !== -1){
      return this.seat_selected;
    }else{
      return this.seat_available
    }
  }
  // checks if  seat available
  checkIfAvailable(seatNo):boolean{
    return this.available_seats.includes(seatNo)
  }
  

}
