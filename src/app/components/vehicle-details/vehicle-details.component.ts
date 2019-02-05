import { from } from 'rxjs';
import { BookingService } from 'src/app/services/booking.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FlashMessagesService } from 'angular2-flash-messages';
import { DatePipe } from '@angular/common';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
    selector: 'app-vehicle-details',
    templateUrl: './vehicle-details.component.html',
    styleUrls: ['./vehicle-details.component.css'],
    providers: [DatePipe]
})
export class VehicleDetailsComponent implements OnInit {
    bookingForm: FormGroup;
    from_city: any;
    to_city: any;
    from_id: any
    to_id: any
    route: string;
    bus_id: any;
    travel_date: any;
    seater: any;

    seatsFound: any[] = [];
    loading: boolean = true;
    selectedSeats: any[] = [];
    passangers: FormArray;
    ticket_type: any;
    loop_counter = 0;
    referenceNumber;
    

    seatPrice:number;
    insurance_Price:number = 25;
    isCovered:boolean=false;

    username_pattern = "^([a-zA-Z]{2,}\\s[a-zA-z]{1,}'?-?[a-zA-Z]{2,}\\s?([a-zA-Z]{1,})?)";
    phoneNo_pattern = "^[0-9]{10}"



    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private bookingService: BookingService,
        private spinnerService: Ng4LoadingSpinnerService,
        private datePipe: DatePipe,        
        private insuranceService:InsuranceService,
        private _flashMessagesService: FlashMessagesService,
        private fb: FormBuilder) {

    }


    ngOnInit() {
        this.initializeForm()
        this.getReferenceNumber()


        this.activatedRoute.params.subscribe(params => {
            this.from_city = params['from_city']
            this.to_city = params['to_city']
            this.from_id = params['from_id']
            this.to_id = params['to_id']
            this.route = params['route']
            this.bus_id = params['id']
            this.travel_date = params['travel_date']
            this.seater = params['seater']
            console.log(`Bus id ${this.bus_id} From ${this.from_id} To ${this.to_id} Date ${this.travel_date} `)

            this.getVehicleData(this.from_id, this.to_id, this.travel_date.split(',')[0], this.bus_id)

        })
        
        
    }
    initializeForm() {
        this.bookingForm = this.fb.group({
            payment_method: ['3', Validators.required],
            reference_number: '',
            passangers: this.fb.array([])
        })
    }
    InsuranceState(event:any){
        console.log('insurance State'+event) 
        if(event =='true'){
            this.asyncForEach(this.passanger.value, res =>{
                console.log(res.id_number)                
                let first_name = res.passenger_name.split(" ")[0];
                let last_name = res.passenger_name.split(" ")[1];
                let idNo = res.id_number;
                let phoneNumber = res.phone_number;
                let email_address = res.email_address;

                this.checkIfIsRegistered(idNo,first_name,last_name,phoneNumber,email_address)                
            })
            
        }else{
            console.log('cover not needed')
        }       
    }

    getVehicleData(from: number, to: number, date: string, vehicle_id: number) {
        this.bookingService.getVehicleDetails(from, to, date, vehicle_id).subscribe(data => {
            if (data.response_code == 0) {
                this.loading = false;
                // this.seatsFound = data.seats[0].name
                this.seatsFound = data.seats[0].name.split(" ").join("").split(',');
                console.log(this.seatsFound)

            } else {
                console.log(`An Error Has occured ${data.response_message}`)
                this._flashMessagesService.show(`${data.response_message}`, { cssClass: 'alert-danger', timeout: 5500 });

            }
        })
    }

    onseatSelection($event) {
        let index = this.selectedSeats.indexOf($event);
        if (index == -1) {
            this.selectedSeats.push($event)
            this.addFormField($event)
            this.getTicketType($event)

        } else {
            this.selectedSeats.splice(index, 1)
            console.log(`Removing Seat ${$event}`)
            this.passangers.removeAt(index)

        }
        console.log(`Seat Selected ${this.selectedSeats}`)
    }
    addFormField(seatNo) {
        this.passangers = this.bookingForm.get('passangers') as FormArray;
        this.passangers.push(this.createItem(seatNo))
        console.log(`Adding Field for Seat No ${seatNo}`)

    }


    createItem(seatNo): FormGroup {
        return this.fb.group({
            phone_number: ['',[Validators.required,Validators.pattern(this.phoneNo_pattern)]],
            id_number: [''],
            passenger_name: ['',[Validators.required,Validators.pattern(this.username_pattern)]],
            email_address: [''],
            selected_seat: seatNo,
            insurance_charge: '',
            served_by: 'Web App',
            amount_charged: '',
        });
    }
    get passanger() {
        return this.bookingForm.get('passangers') as FormArray;
    }
    
   
    getReferenceNumber() {
        this.bookingService.generateReferenceNumber().subscribe(data => {
            this.referenceNumber = data.reference_number;
            console.log(data)
            this.bookingForm.get('reference_number').setValue(data.reference_number)
        })
    }
    getTicketType(seat: any) {
        console.log("calling get ticket details");
        this.bookingService.getTicketDetails(this.from_id, this.to_id, this.travel_date.split(',')[0], this.bus_id, this.seater, seat).subscribe(data => {
            this.ticket_type = data.ticket_type[0].id            
            this.seatPrice = data.ticket_type[0].fare_per_ticket;
            console.log('ticket data'+this.seatPrice)
        })
    }
    seerveSeat() {
        this.spinnerService.show()        
        let numOfPassangers = this.bookingForm.get('passangers').value.length;
        console.log(`Booking details ${numOfPassangers} Ticket Type ${this.ticket_type}`)
        this.asyncForEach(this.passanger.value, (res) => {
            console.log('id number Entered'+res.id_number)
            if(this.isCovered){
                // check if id number is provided
                
            }else {
                console.log('Insurance cover not needed')

            }

            let from_city = this.from_id
            let to_city = this.to_id
            let travel_date = this.travel_date.split(',')[0]
            let selected_vehicle = this.bus_id
            let seater = this.seater
            let selected_ticket_type = this.ticket_type
            let selected_seat = res.selected_seat
            let payment_method = this.bookingForm.get('payment_method').value
            let phone_number = res.phone_number;
            let passenger_name = res.passenger_name;
            let email_address = res.email_address;
            let id_number = res.id_number;
            let insurance_charge = res.insurance_charge;
            let served_by = res.served_by;
            let amount_charged = "";
            let reference_number = this.referenceNumber;

            this.bookingService.reserveBooking(from_city, to_city, travel_date, selected_vehicle, seater,
                selected_ticket_type, selected_seat, payment_method, phone_number, passenger_name, email_address,
                id_number, insurance_charge, served_by, amount_charged, reference_number).subscribe(data => {
                    this.loop_counter += 1;
                    console.log("sucess loop counter", this.loop_counter, "no pass", numOfPassangers)                    
                    this.spinnerService.hide()
                    if (this.loop_counter == numOfPassangers) {
                        this.navigateToPayment()
                    }
                }, error => {
                    this.loop_counter += 1;
                    console.log("error loop counter", this.loop_counter, "no pass", numOfPassangers)
                    console.log('an  error has occured' + error);
                    if (this.loop_counter == numOfPassangers) {
                        this.navigateToPayment()
                    }
                })


        })


    }

    public navigateToPayment() {
        console.log("Reference NO" + this.referenceNumber);
        this.router.navigate(['/payment', { ref_no: this.referenceNumber }])

        this.bookingForm.reset();
    }
    public checkIfIsRegistered(idNumber:any, firstName, lastName,phoneNo, emailAddress){        
            console.log('search if user is registered')
            this.insuranceService.checkIfRegistered(idNumber).subscribe(data =>{
                // console.log(data)
                if(data.response_code == 0){
                    // user is already registered                    
                   console.log('User already registered')
                }else{
                    console.log('user not registered')
                //  this.registerUser(firstName,lastName,phoneNo,idNumber,emailAddress)
                    
                    
                }
            })
                  

    }
    private registerUser(firstName,lastname, idNo, phoneNo, emailAddress){
        console.log('registering user')
        this.insuranceService.registerNewUser(firstName,lastname, idNo,phoneNo,emailAddress)
        .subscribe(data =>{
            if(data.responseCode == 0){
                console.log(data.responseMessage)

            }else{
                console.log('failed to register user')
                console.log(data)
            }
        })

    }
    public async  asyncForEach(array, callback) {
        for (let index = 0; index < array.length; index++) {
            await this.waiting(1000)
            await callback(array[index], index, array);

        }
    }
    public waiting(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

     // converting date to fulldate tuesday,thursday 2019
  convertDatetofull(date):Date{
    let dateArray = date.split('-')    
    return new Date(dateArray[2]+'-'+dateArray[1]+'-'+dateArray[0]+'T00:00:00')
  }
//   converts time to 12hrs system
   timeTo12(time24) {
    let ts = time24;
    let H = +ts.substr(0, 2);
    let h:any = (H % 12) || 12;
    h = (h < 10)?("0"+h):h;  // leading 0 at the left for 1 digit hours
    var ampm = H < 12 ? " AM" : " PM";
    ts = h + ts.substr(2, 3) + ampm;
    return ts;
  };

}
