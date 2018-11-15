import { FoutynineSeaterComponent } from './components/seatsFormat/foutynine-seater/foutynine-seater.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MzInputModule, MzSelectModule } from 'ngx-materialize';
import { BookingService } from './services/booking.service';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleDetailsComponent } from './components/vehicle-details/vehicle-details.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ElevenSeaterComponent } from './components/seatsFormat/eleven-seater/eleven-seater.component';


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
    MyAccountComponent,
    VehicleListComponent,
    VehicleDetailsComponent,
    LoadingComponent,    
    ElevenSeaterComponent,
    FoutynineSeaterComponent, 
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MzInputModule,
    MzSelectModule,
    AppRoutingModule
  ],
  providers: [BookingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
