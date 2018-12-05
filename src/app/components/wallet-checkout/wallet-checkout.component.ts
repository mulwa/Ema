import { BookingService } from './../../services/booking.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-wallet-checkout',
  templateUrl: './wallet-checkout.component.html',
  styleUrls: ['./wallet-checkout.component.css']
})
export class WalletCheckoutComponent implements OnInit {
  public jamboPayFrm:FormGroup;
  @Input()
  mpesaReference:string; 

  constructor(public frmBuilder:FormBuilder, public bookingService:BookingService,
    private spinnerService: Ng4LoadingSpinnerService,private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.inializeForm()
  }
  inializeForm(){
    this.jamboPayFrm = this.frmBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }
  processWallet(){
    this.spinnerService.show()
    console.log(`${this.mpesaReference}`)
    this.bookingService.authorizeJamboPayment(this.jamboPayFrm.get('username').value,this.jamboPayFrm.get('username').value,this.mpesaReference).subscribe(res =>{
      this.spinnerService.hide()
      if(res.response_code == 0){
        this.jamboPayFrm.reset()
        console.log(`SucessFully Authourized Payment ${res.response_message}`)
        this._flashMessagesService.show(`${res.response_message}`, { cssClass: 'alert-success', timeout: 5500 });

      }else{
        console.log(`Failed To Authorized ${res.response_message}`)
        this._flashMessagesService.show(`${res.response_message}`, { cssClass: 'alert-danger', timeout: 5500 });

      }
    })
  }

}
