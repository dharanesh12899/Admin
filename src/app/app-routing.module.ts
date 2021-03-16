import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {AdminAuthComponent} from './admin-auth';
import { ErrorComponent } from './error';
import {QuicknavComponent} from './quicknav';
import {OrdersComponent} from './orders'
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:AdminAuthComponent},
  {path:'quicknav',component:QuicknavComponent,canActivate:[AuthGuard]},
  {path:'orders',component:OrdersComponent,canActivate:[AuthGuard]},
  {path:'**',component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
