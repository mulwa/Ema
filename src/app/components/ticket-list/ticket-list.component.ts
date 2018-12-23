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
    let url = "http://enacoach.com/print?print_type=ticket&size=A4&reference_number=MA00111487";
    var W = window.open(url)
    W.window.print()

    // window.open('http://enacoach.com/print?print_type=ticket&size=A4&reference_number=MA00111487')
    console.log('invoking ticket printing' +ticket.name)
    // this.router.navigate(['/print',{refNo: ticket.reference_number}])
    
   
  }

}
