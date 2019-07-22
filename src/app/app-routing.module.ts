import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { LocalComponent } from './pages/local/local.component';
import { PaymentSummaryComponent } from './pages/payment-summary/payment-summary.component';
import { MyLocalsComponent } from './pages/my-locals/my-locals.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { AuthGuard } from './guards/auth.guard';
import { BandOnLine } from './guards/bandOnline.guard';
import { GoToPayment } from './guards/toPayment.guard';
import { LocalOnLine } from './guards/localOnline.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LocalFound } from './guards/localFound.guard';


const routes: Routes = [
  {
    path: "index", component: IndexComponent,
  },
  {
    path: "local/:id", component: LocalComponent,
    canActivate:[LocalFound]
  },

  {
    path: "payment", component: PaymentSummaryComponent,
    canActivate: [AuthGuard, BandOnLine, GoToPayment]
  },
  {
    path: "my-locals", component: MyLocalsComponent,
    canActivate: [AuthGuard, LocalOnLine]
  },
  {
    path: "reservations", component: ReservationsComponent,
    canActivate: [AuthGuard, BandOnLine]
  },
  {
    path: "settings", component: ConfigurationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "", redirectTo: "/index", pathMatch: "full"
  },
  {
    path:"**", component:PageNotFoundComponent,
  }];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
