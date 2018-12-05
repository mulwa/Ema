import { BookingService } from './../../services/booking.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-mpesa-checkout',
  templateUrl: './mpesa-checkout.component.html',
  styleUrls: ['./mpesa-checkout.component.css']
})
export class MpesaCheckoutComponent implements OnInit {
  public mpesaFrm:FormGroup;
  @Input()
  mpesaReference:string; 

  constructor(public frmBuilder:FormBuilder, public bookingService:BookingService,
    private spinnerService: Ng4LoadingSpinnerService,private _flashMessagesService: FlashMessagesService ) { }

  ngOnInit() {
    this.initializeForm()
  }
  initializeForm(){
    this.mpesaFrm = this.frmBuilder.group({
      mpesa_phone_number:['', Validators.required]
    })
  }
processMpesa(){
  this.spinnerService.show()
  console.log(`${this.mpesaFrm.get('mpesa_phone_number').value},  ${this.mpesaReference}`)
  this.bookingService.mpesaPayment(this.mpesaReference,this.mpesaFrm.get('mpesa_phone_number').value).subscribe(res =>{
    this.spinnerService.hide()
    if(res.response_code == 0){
      console.log(`SucessFull ${res.response_message}`)
      this._flashMessagesService.show(`${res.response_message}`, { cssClass: 'alert-success', timeout: 5000 });
      this.mpesaFrm.reset()
    }else{
      console.log(`Failed To Authorize Mpesa ${res.response_message}`)
      this._flashMessagesService.show(`${res.response_message}`, { cssClass: 'alert-danger', timeout: 5000 });
    }
  })

}

}
