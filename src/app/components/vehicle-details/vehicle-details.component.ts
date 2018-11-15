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

  
 

  constructor(private router:Router,
              private activatedRoute:ActivatedRoute,
             private bookingService:BookingService,
             private fb:FormBuilder) {
                

   }
   

  ngOnInit() {
      this.initializeForm()
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
        payment_method:['',Validators.required], 
        reference_number:'red122',   
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
  seerveSeat(){
      console.log(this.bookingForm.value)
  }

}
 