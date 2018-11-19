import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { FleetComponent } from './components/fleet/fleet.component';
import { FareComponent } from './components/fare/fare.component';
import { BookingComponent } from './components/booking/booking.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from  '@angular/router';
import { OfficesComponent } from './components/offices/offices.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { PaymentComponent } from './components/payment/payment.component';

const routes: Routes = [
  { path: 'booking', component: BookingComponent},
  { path: 'vehiclelist', component:VehicleListComponent},
  { path: 'vehicledetails', component:VehicleDetailsComponent},
  { path: 'myaccount', component:MyAccountComponent},
  { path: 'offices', component: OfficesComponent},
  { path: 'fare', component:FareComponent},
  { path: 'fleet', component:FleetComponent},
  { path:'about', component: AboutComponent},
  { path: 'payment', component:PaymentComponent},
  { path:'**', component:HomeComponent}

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
