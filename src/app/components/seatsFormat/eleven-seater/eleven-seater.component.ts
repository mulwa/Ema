import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { seatLimit } from 'src/app/models/constants';

@Component({
  selector: 'app-eleven-seater',
  templateUrl: './eleven-seater.component.html',
  styleUrls: ['./eleven-seater.component.css']
})
export class ElevenSeaterComponent implements OnInit {
    selected_seats:string[] = [];
    @Input()
    available_seats:any[]
    @Output()
    seatSelectionEvent = new EventEmitter<number>();
    // 49seater seat format
    seater_49_seats:any;
    first_row:any;
    second_row:any;
    third_row:any;
    fourth_row:any;
    fifth_row:any;
    seat_selected = 'assets/images/seat/selected.png';
    seat_not_available = 'assets/images/seat/not-available.png';
    seat_available = 'assets/images/seat/available.png';
  

  constructor() { 
      this.initializeSeater49()
  }

  ngOnInit() {
  }
  

//clear handler
clearSelected = function() {
  this.selected_seats = [];  
}
initializeSeater49():void{
    this.first_row  = ['1A','3A','5A','7A','9A','11A','13A','15A','17A','19A','21A','23A'];
    this.second_row = ['2A','4A','6A','8A','10A','12A','14A','16A','18A','20A','22A','24A'];
    this.third_row  = ['25'],
    this.fourth_row  = ['1B','3B','5B','7B','9B','11B','13B','15B','17B','19B','21B','23B'];
    this.fifth_row = ['2B','4B','6B','8B','10B','12B','14B','16B','18B','20B','22B','24B'];
    
    // combine all arrays to make one array
    this.seater_49_seats = this.fifth_row.concat(this.first_row,this.third_row,this.fourth_row,this.fifth_row);
    
  }
  seatSelected(seatNo){ 
      console.log(`Seat cliked is ${seatNo}`);
      let index = this.selected_seats.indexOf(seatNo)
      console.log(`selected seat index ${index}`)
      if(index !== -1){
          this.selected_seats.splice(index,1)
          this.seatSelectionEvent.emit(seatNo)
      }else{
          this.selected_seats.push(seatNo)
          this.seatSelectionEvent.emit(seatNo)
      }
  }
  checkIfSelected(seatNo){
      if(this.selected_seats.indexOf(seatNo) !== -1){
          return this.seat_selected;
      }else{
          return this.seat_available;
      }
  }

//   check if seat is available
  checkIfAvailable(seatNo):boolean{
      return this.available_seats.includes(seatNo)
  }
  ExceedSeatMax():boolean{
    if(this.selected_seats.length > seatLimit){
      return true
    }
    return false;
  }
  removeSeat(seat){
    let index = this.selected_seats.indexOf(seat)
    if(index !== -1){
      this.selected_seats.splice(index,1)
      this.seatSelectionEvent.emit(seat)
    }else{
      console.log('You Have Booked maximum allowed Seats')
    }

  }

}
