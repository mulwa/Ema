import { Component } from '@angular/core';
import { Event as RouterEvent,
NavigationStart,
NavigationEnd,
NavigationCancel,
NavigationError,
Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ena';
  loading = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event);
      console.log( event );
    });
   }

  navigationInterceptor(event: RouterEvent) {
    if ( event instanceof NavigationStart) {
      this.loading = true;
    }
    if ( event instanceof NavigationEnd ) {
      this.loading = false;
    }
    if ( event instanceof NavigationCancel ) {
      this.loading = false;
    }
    if ( event instanceof NavigationError ) {
      this.loading = false;
    }

  }
}
