import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-foutynine-seater',
  templateUrl: './foutynine-seater.component.html',
  styleUrls: ['./foutynine-seater.component.css']
})
export class FoutynineSeaterComponent implements OnInit {
  seats_selected:any[]= []  
  seatArray:any = [1,'1X','Driver',2,3,4,5,6,7,8,9,10];
  seat_selected = 'assets/images/seat/selected.png';
  seat_not_available = 'assets/images/seat/not-available.png';
  seat_available = 'assets/images/seat/available.png';
  
  @Input()
  available_seats:any[] 
  
  @Output()
  seatSelectionEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
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
