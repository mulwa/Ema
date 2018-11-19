import { from } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css']
})
export class VehicleDetailsComponent implements OnInit {
  bookingForm:FormGroup;
  from_city:any;
  to_city:any;
  from_id:any
  to_id:any
  route:string;
  bus_id:any;
  travel_date:any;
  seater:any;

  seatsFound:any[]= [];
  loading:boolean = true;
  selectedSeats:any [] = [];
  passangers: FormArray;
  ticket_type:any;
  
 

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
             private bookingService:BookingService,        
             private fb:FormBuilder) {                

   }
   

  ngOnInit() {
      this.initializeForm()
      this.getReferenceNumber()
     

      this.activatedRoute.params.subscribe(params =>{
          this.from_city = params['from_city']
          this.to_city = params['to_city']
          this.from_id = params['from_id']
          this.to_id = params['to_id']
          this.route = params['route']
          this.bus_id = params['id']
          this.travel_date = params['travel_date']
          this.seater = params['seater']
          console.log(`Bus id ${this.bus_id} From ${this.from_id} To ${this.to_id} Date ${this.travel_date} `)

          this.getVehicleData(this.from_id, this.to_id,this.travel_date.split(',')[0],this.bus_id)
          
      })
  }
  initializeForm(){
      this.bookingForm = this.fb.group({         
        payment_method:['3',Validators.required], 
        reference_number:'',   
        passangers: this.fb.array([])          
      })
  }

  getVehicleData(from:number, to:number,date:string, vehicle_id:number){
      this.bookingService.getVehicleDetails(from,to,date,vehicle_id).subscribe(data =>{
          if(data.response_code == 0){
              this.loading = false;
              this.seatsFound = data.seats[0].name
              console.log(this.seatsFound)

          }else{
              console.log(`An Error Has occured ${data.response_message}`)
          }
      })
  }

  onseatSelection($event){
      let index = this.selectedSeats.indexOf($event);
      if(index == -1){
          this.selectedSeats.push($event) 
          this.addFormField($event)
          this.getTicketType($event)     
          
      }else{
          this.selectedSeats.splice(index,1)
          console.log(`Removing Seat ${$event}`)
          this.passangers.removeAt(index)
          
      }
      console.log(`Seat Selected ${this.selectedSeats}`)
  }
  addFormField(seatNo){
    this.passangers = this.bookingForm.get('passangers') as FormArray;    
    this.passangers.push(this.createItem(seatNo))  
      console.log(`Adding Field for Seat No ${seatNo}`)
      
  }
  

  createItem(seatNo): FormGroup {
    return this.fb.group({          
      phone_number:['',Validators.minLength(10)],
      id_number:[''],
      passenger_name:['',Validators.required],
      email_address:[''],
      selected_seat: seatNo,
      insurance_charge:'',
      served_by:'Web App',
      amount_charged:'',
      
    });
  }
  get passanger() {
    return this.bookingForm.get('passangers') as FormArray;
  }
  getReferenceNumber(){
      this.bookingService.generateReferenceNumber().subscribe(data =>{
          this.bookingForm.get('reference_number').setValue(data.reference_number)
      })
  }
  getTicketType(seat:any){
    console.log("calling get ticket details");      
      this.bookingService.getTicketDetails(this.from_id,this.to_id,this.travel_date.split(',')[0],this.bus_id,this.seater,seat).subscribe(data =>{
          this.ticket_type = data.ticket_type[0].id                    
      })
      
  }
  seerveSeat(){
    let numOfPassangers = this.bookingForm.get('passangers').value.length; 
      console.log(`Booking details ${numOfPassangers} Ticket Type ${this.ticket_type}`)
      for(let pass= 0; pass < numOfPassangers; pass++){
        let from_city = this.from_id
        let to_city = this.to_id
        let travel_date = this.travel_date.split(',')[0]     
        let selected_vehicle = this.bus_id
        let seater = this.seater  
        let selected_ticket_type = this.ticket_type 
        let selected_seat = this.passanger.value[pass].selected_seat         
        let payment_method = this.bookingForm.get('payment_method').value  
        let phone_number =this.passanger.value[pass].phone_number; 
        let passenger_name = this.passanger.value[pass].passenger_name;
        let email_address =  this.passanger.value[pass].email_address;
        let id_number =      this.passanger.value[pass].id_number;
        let insurance_charge = this.passanger.value[pass].insurance_charge;
        let served_by = this.passanger.value[pass].served_by;
        let amount_charged =  "";
        let reference_number =  this.bookingForm.get('reference_number').value;        
       
       
       // reference_number: this.checkOutForm.get('reference_number').value,   
       setTimeout(()=>{                 
         this.bookingService.reserveBooking(from_city, to_city,travel_date,selected_vehicle,seater,selected_ticket_type,selected_seat,payment_method,phone_number,passenger_name, email_address,id_number,insurance_charge,served_by,amount_charged,reference_number).subscribe(data =>{
           console.log(data)                         
           if(data.ticket[0].response_code == "0"){                    
              console.log(data.ticket_message)
             // let tick_message = data.ticket[0].description;
             let tick_message = data.ticket_message[0].name;
             let reference_no = data.ticket[0].reference_number             
             console.log("Reference NO"+reference_no);
             this.router.navigate(['/payment',{ref_no:reference_no}])
             
             this.bookingForm.reset();

             console.log(tick_message)
 
             // direct users according to payment method                       
 
           }else{
             console.log("Reservation failed", data.ticket_message[0].name)
           }
         },error =>{           
           console.log('an  error has occured'+error);
         }) 

        },3000)      
       
     } // end of for loop  
  }

}
 