import { Ticket } from 'src/app/models/ticketRes';
import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-print-ticket',
  templateUrl: './print-ticket.component.html',
  styleUrls: ['./print-ticket.component.css']
})
export class PrintTicketComponent implements OnInit { 
  mytickets:Ticket[];
  showloading:boolean;
  reference_number:any;
  username:string;

  constructor(private bookingService:BookingService) { }

  ngOnInit() {
  }

  getTicketDetails(identify){
    console.log(identify)
    this.showloading = true;
    console.log('searching ')
    this.bookingService.getAllCustomerTickets(identify).subscribe(data =>{
      this.showloading = false      
      if(data.response_code == 0){
        this.mytickets = data.tickets;
        console.log(this.mytickets)
      }else{
        console.log('No Ticket found')
      }

    })
    

  }
 

}
