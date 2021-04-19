import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminAuthComponent} from './admin-auth';
import { ErrorComponent } from './error';
import {QuicknavComponent} from './quicknav';
import {OrdersComponent} from './orders'
import { AuthGuard } from './guards/auth.guard';
import { MiscComponent } from './misc/misc.component';
import {DriverComponent} from './driver/driver.component'
import {VehiclesComponent} from './vehicles/vehicles.component'
import {BudgetComponent} from './budget/budget.component'

const routes: Routes = [
  {path:'',component:AdminAuthComponent},
  {path:'quicknav',component:QuicknavComponent,canActivate:[AuthGuard]},
  {path:'orders',component:OrdersComponent,canActivate:[AuthGuard]},
  {path:'misc',component:MiscComponent,canActivate:[AuthGuard]},
  {path:'driver',component:DriverComponent,canActivate:[AuthGuard]},
  {path:'vehicle',component:VehiclesComponent,canActivate:[AuthGuard]},
  {path:'budget',component:BudgetComponent,canActivate:[AuthGuard]},
  {path:'**',component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
