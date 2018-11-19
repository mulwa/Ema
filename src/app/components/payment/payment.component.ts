import { BookingService } from 'src/app/services/booking.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticketRes';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  reference_no:any;
  mytickets:Ticket[]

  constructor(private activatedRouter: ActivatedRoute, private bookingService:BookingService) { }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params =>{
      this.reference_no = params['ref_no']
      this.getTicketInfro(this.reference_no)
    })
  }
  getTicketInfro(refNo:any){
    this.bookingService.getTicketInfor(refNo).subscribe(data =>{
      this.mytickets = data.tickets
      console.log(this.mytickets)

    })
  }
  

}
