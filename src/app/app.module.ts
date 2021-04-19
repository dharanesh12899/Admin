import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminAuthComponent } from './admin-auth';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './error';
import { QuicknavComponent } from './quicknav';
import { AuthGuard } from './guards/auth.guard';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { MiscComponent } from './misc/misc.component';
import { DriverComponent } from './driver/driver.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { BudgetComponent } from './budget/budget.component';

@NgModule({
  imports:[
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    AdminAuthComponent,
    ErrorComponent,
    QuicknavComponent,
    OrdersComponent,
    MiscComponent,
    DriverComponent,
    VehiclesComponent,
    BudgetComponent
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
