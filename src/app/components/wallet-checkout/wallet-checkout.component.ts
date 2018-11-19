import { BookingService } from './../../services/booking.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-wallet-checkout',
  templateUrl: './wallet-checkout.component.html',
  styleUrls: ['./wallet-checkout.component.css']
})
export class WalletCheckoutComponent implements OnInit {
  public jamboPayFrm:FormGroup;
  @Input()
  mpesaReference:string; 

  constructor(public frmBuilder:FormBuilder, public bookingService:BookingService) { }

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
    console.log(`${this.mpesaReference}`)
    this.bookingService.authorizeJamboPayment(this.jamboPayFrm.get('username').value,this.jamboPayFrm.get('username').value,this.mpesaReference).subscribe(res =>{
      if(res.response_code == 0){
        this.jamboPayFrm.reset()
        console.log(`SucessFully Authourized Payment ${res.response_message}`)
      }else{
        console.log(`Failed To Authorized ${res.response_message}`)
      }
    })
  }

}
