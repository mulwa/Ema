import { FoutynineSeaterComponent } from './components/seatsFormat/foutynine-seater/foutynine-seater.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CityCoveredComponent } from './components/city-covered/city-covered.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { FooterComponent} from './components/footer/footer.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SearchBusComponent } from './components/search-bus/search-bus.component';
import { FareComponent } from './components/fare/fare.component';
import { FleetComponent } from './components/fleet/fleet.component';
import { BookingComponent } from './components/booking/booking.component';
import { AboutComponent } from './components/about/about.component';
import { OfficesComponent } from './components/offices/offices.component';
import { MzInputModule, MzSelectModule,MzCheckboxModule } from 'ngx-materialize';
import { BookingService } from './services/booking.service';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ElevenSeaterComponent } from './components/seatsFormat/eleven-seater/eleven-seater.component';
import { PaymentComponent } from './components/payment/payment.component';
import { MpesaCheckoutComponent } from './components/mpesa-checkout/mpesa-checkout.component';
import { WalletCheckoutComponent } from './components/wallet-checkout/wallet-checkout.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SixteenSeaterComponent } from './seatsFormat/sixteen-seater/sixteen-seater.component';
import { FiveteeneSeaterComponent } from './seatsFormat/fiveteene-seater/fiveteene-seater.component';
import { PrintTicketComponent } from './components/print-ticket/print-ticket.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { ComponentsComponent } from './components/components.component';
import { TickettoprintComponent } from './tickettoprint/tickettoprint.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    CityCoveredComponent,
    SideNavComponent,
    FooterComponent,
    NavBarComponent,
    HomeComponent,
    SearchBusComponent,
    FareComponent,
    FleetComponent,
    BookingComponent,
    AboutComponent,
    OfficesComponent,    
    VehicleListComponent,
    VehicleDetailsComponent,
    LoadingComponent,    
    ElevenSeaterComponent,
    FoutynineSeaterComponent,
    PaymentComponent,
    MpesaCheckoutComponent,
    WalletCheckoutComponent,
    SixteenSeaterComponent,    
    FiveteeneSeaterComponent,
    PrintTicketComponent,
    TicketListComponent,
    ComponentsComponent,
    TickettoprintComponent, 
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MzInputModule,
    MzSelectModule,
    MzCheckboxModule,
    AppRoutingModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FlashMessagesModule.forRoot() 
  ],
  providers: [BookingService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
