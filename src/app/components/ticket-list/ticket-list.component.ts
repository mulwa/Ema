import { Ticket } from 'src/app/models/ticketRes';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  @Input()
  TicketList:Ticket[];
  

  constructor() { }

  ngOnInit() {
  }
  printTicket(compName){
    console.log('invoking ticket printing')
    let printContents = document.getElementById(compName).innerHTML;
     let originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;    
    window.print();
    document.body.innerHTML = originalContents;
  }

}
