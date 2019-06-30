import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';


//CALENDARIO----------------
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
//----------------------------------

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LogoComponent } from './shared/logo/logo.component';
import { ButtonsComponent } from './shared/buttons/buttons.component';
import { HeaderComponent } from './shared/header/header.component';
import { SearcherComponent } from './shared/searcher/searcher.component';
import { SearcherInputComponent } from './shared/searcher/searcher_input/searcher_input.component';
import { SearcherBodyComponent } from './shared/searcher/searcher_body/searcher_body.component';
import { SearcherListComponent } from './shared/searcher/searcher_list/searcher_list.component';
import { MapComponent } from './shared/searcher/map/map';
import { FooterComponent } from './shared/footer/footer.component';
import { BtnAccessComponent } from './shared/buttons/btn-access/btn-access.component';
import { BtnCloseComponent } from './shared/buttons/btn-close/btn-close.component';
import { BtnSuccessComponent } from './shared/buttons/btn-success/btn-success.component';
import { BtnDangerComponent } from './shared/buttons/btn-danger/btn-danger.component';
import { BtnFavouritesDeleteComponent } from './shared/buttons/btn-favourites-delete/btn-favourites-delete.component';
import { CarouselComponent } from './shared/carousel/carousel.componet';
import { ModalComponent } from './shared/modal/modal.component';
import { BreadcrumbsHeaderComponent } from './shared/breadcrumbs/breadcrumbs-header/breadcrumbs-header.component';
import { CartComponent } from './shared/breadcrumbs/cart/cart.component';
import { PaymentComponent } from './shared/breadcrumbs/payment/payment.component';
import { HeaderUserComponent } from './shared/header/header-users/header-user/header-user.component';
import { CalendarComponent } from './shared/calendar/calendar.component';
import { LocalInfoComponent } from './shared/local-info/local-info.component';
import { ImageCircularComponent } from './shared/image-circular/image-circular.component';
import { LocalEquipmentComponent } from './shared/local-equipment/local-equipment.component';
import { AvailabilityComponent } from './shared/availability/availability.component';
import { BookingComponent } from './shared/booking/booking.component';
import { MyLocalComponent } from './shared/my-local/my-local.component';
import { AddLocalComponent } from './shared/my-local/add-local/add-local.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { TableComponent } from './shared/table/table.component';
import { BtnShowMoreComponent } from './shared/buttons/btn-show-more/btn-show-more.component';
import { FavouritesComponent } from './shared/favourites/favourites.component';
import { TableGridComponent } from './shared/table-grid/table-grid.component';
import { ConfigUserComponent } from './shared/config-user/config-user.component';
import { ConfigAdminComponent } from './shared/config-admin/config-admin.component';
import { HeaderLocalComponent } from './shared/header/header-users/header-local/header-local.component';
import { IndexComponent } from './pages/index/index.component';
import { LocalComponent } from './pages/local/local.component';
import { PaymentSummaryComponent } from './pages/payment-summary/payment-summary.component';
import { MyLocalsComponent } from './pages/my-locals/my-locals.component';
import { ReservationsComponent } from './pages/reservations/reservations.component';
import { ConfigurationComponent } from './pages/configuration/configuration.component';
import { ReservationSummaryComponent } from './pages/reservation-summary/reservation-summary.component';
import { TableGridPastComponent } from './shared/table-grid-past/table-grid-past.component';
import { ReactiveFormsModule } from '@angular/forms';
//import { GoToPaymentGuard } from './services/go-to-payment.service';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';




import { HTTP_INTERCEPTORS } from '@angular/common/http';

// SERVICIOS------------------
import { TestService } from './services/test.service';
import { LoginFakeInterceptor } from './interceptors/loginFake.interceptor';
import { LoginService } from './services/login.service';
import { LocalsService } from './services/locals.service';
import { LocationService } from './services/location.service';
import { UserService } from './services/users.services';
import { ReservationsService } from './services/reservations.service';
import { FavouritesService } from './services/favourites.service';
import { ScreenService } from './services/screen.service';
//------------------------------------


//MATERIAL-------------------------------
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { SpanishPaginatorComponent } from './shared/spanish-paginator/spanish-paginator.component';


//import {CdkStepperModule} from '@angular/cdk/stepper';
//import {CdkTableModule} from '@angular/cdk/table';
//import {CdkTreeModule} from '@angular/cdk/tree';




//----------------------------------------

//FX------------------
import { ScrollToModule } from 'ng2-scroll-to-el';
import { BtnScrollTopComponent } from './shared/buttons/btn-scroll-top/btn-scroll-top.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


//---------------------------

import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';

//PRUEBA PARA SUBIR IMAGEN--------
import { UploadFilesComponent } from './shared/upload-files/upload-files.component';
import { UploadImageService } from './services/upload.service';
//--------------------------------

const httpInterceptorProviders = [
  //{ provide: HTTP_INTERCEPTORS, useClass: LoginFakeInterceptor, multi: true },
  /* { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }, */
];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LogoComponent,
    ButtonsComponent,
    HeaderComponent,
    SearcherComponent,
    SearcherInputComponent,
    SearcherBodyComponent,
    SearcherListComponent,
    MapComponent,
    FooterComponent,
    BtnAccessComponent,
    BtnCloseComponent,
    BtnSuccessComponent,
    BtnDangerComponent,
    BtnScrollTopComponent,
    BtnFavouritesDeleteComponent,
    CarouselComponent,
    ModalComponent,
    BreadcrumbsHeaderComponent,
    CartComponent,
    PaymentComponent,
    HeaderUserComponent,
    CalendarComponent,
    LocalInfoComponent,
    ImageCircularComponent,
    LocalEquipmentComponent,
    AvailabilityComponent,
    BookingComponent,
    MyLocalComponent,
    AddLocalComponent,
    DropdownComponent,
    TableComponent,
    BtnShowMoreComponent,
    FavouritesComponent,
    TableGridComponent,
    ConfigUserComponent,
    ConfigAdminComponent,
    HeaderLocalComponent,
    IndexComponent,
    LocalComponent,
    PaymentSummaryComponent,
    MyLocalsComponent,
    ReservationsComponent,
    ConfigurationComponent,
    ReservationSummaryComponent,
    TableGridPastComponent,
    DatepickerComponent,
    SpinnerComponent,
    UploadFilesComponent,



  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: YOUR_API_KEY
    }),
    HttpClientModule,
    NgbDatepickerModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatPaginatorModule,
    ScrollToModule.forRoot(),
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    TestService,
    LoginService,
    UserService,
    LocalsService,
    LocationService,
    ReservationsService,
    FavouritesService,
    ScreenService,
    //GoToPaymentGuard,
    httpInterceptorProviders,
    UploadImageService,
    { provide: MatPaginatorIntl, useClass: SpanishPaginatorComponent}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
