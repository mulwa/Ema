import { BookingService } from './../services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ticket } from '../models/ticketRes';
import { PrintingService } from '../printing.service';

@Component({
  selector: 'app-tickettoprint',
  templateUrl: './tickettoprint.component.html',
  styleUrls: ['./tickettoprint.component.css']
})
export class TickettoprintComponent implements OnInit {
  referenceNumber:any;
  mytickets:Ticket[];

  constructor(private activatedRoute:ActivatedRoute, private bookingService:BookingService, private printService:PrintingService) { 
   
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params =>{
      this.referenceNumber = params['refNo']
      this.getTicketDetails(this.referenceNumber)
    })
  }
  getTicketDetails(identify){
    console.log(identify)   
    console.log('searching ')
    this.bookingService.getAllCustomerTickets(identify).subscribe(data =>{           
      if(data.response_code == 0){
        this.mytickets = data.tickets;
        console.log(this.mytickets)           
      }else{
        console.log('No Ticket found')
      }

    })   

  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('rcorners2').innerHTML;
    popupWin = window.open();
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
  

}
