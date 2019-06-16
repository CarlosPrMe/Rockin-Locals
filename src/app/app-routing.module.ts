import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LocalComponent } from './pages/local/local.component';
import { PaymentSummaryComponent } from './pages/payment-summary/payment-summary.component';
import { MyLocalsComponent } from './pages/my-locals/my-locals.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { ReservationSummaryComponent } from './pages/reservation-summary/reservation-summary.component';
import { GoToPaymentGuard } from './services/go-to-payment.service';


const routes: Routes = [
  {
    path: "index", component: IndexComponent,
  },
  {
    path: "local/:id", component: LocalComponent
  },
/*   {
    path: "reservation-summary", component: ReservationSummaryComponent
  }, */
  {
    path: "payment", component: PaymentSummaryComponent,
    //canActivate:[GoToPaymentGuard]
  },
  {
    path: "my-locals", component: MyLocalsComponent
  },
  {
    path: "reservations", component: ReservationsComponent
  },
  {
    path: "settings", component: ConfigurationComponent
  },
  {
    path: "", redirectTo: "/index", pathMatch: "full" // el patchMatch solo se utiliza en el de redirigir
  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
