import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ChildActivationStart, Router} from'@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  constructor(private _router: Router,private auth:AuthService) { }

  ngOnInit(): void {
  }
  

  logout(){
    this.auth.logout();
    this._router.navigate([""]);
  }
}
