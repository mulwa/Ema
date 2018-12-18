import { Ticket } from 'src/app/models/ticketRes';
import { Component, OnInit, Input } from '@angular/core';
import { PrintingService } from 'src/app/printing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  @Input()
  TicketList:Ticket[];
  

  constructor(private router:Router) { }

  ngOnInit() {
  }
  printTicket(ticket:Ticket){
    console.log('invoking ticket printing' +ticket.name)
    this.router.navigate(['/print',{refNo: ticket.reference_number}])
    
   
  }

}
