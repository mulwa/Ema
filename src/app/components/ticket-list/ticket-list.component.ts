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
    // let printContents = document.getElementById(compName).innerHTML;
    //  let originalContents = document.body.innerHTML;
    //  document.body.innerHTML = printContents;    
    // window.print();
    // document.body.innerHTML = originalContents;

    let printContents, popupWin;
    printContents = document.getElementById(compName).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=100%');
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
