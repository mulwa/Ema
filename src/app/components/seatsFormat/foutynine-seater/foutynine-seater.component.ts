import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-foutynine-seater',
  templateUrl: './foutynine-seater.component.html',
  styleUrls: ['./foutynine-seater.component.css']
})
export class FoutynineSeaterComponent implements OnInit {
  seats_selected:any[]= []  
  seatArray:any = [1,'1X','Driver',2,3,4,5,6,7,8,9,10];
  
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
      return 'selected'
    }else{
      return 'not-selected'
    }
  }
  // checks if  seat available
  checkIfAvailable(seatNo):boolean{
    return this.available_seats.includes(seatNo)
  }


}
