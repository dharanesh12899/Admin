import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ChildActivationStart, Router} from'@angular/router';
import {driverdata} from '../interfaces/driverdata'
import * as firebase from 'firebase';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  mp=true;
  drivers:driverdata[]=[];
  drvr:driverdata[]=[];
  ns:string="";
  load=false;
  constructor(private _router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    
  }

  driver(name:string){
    this.load=true;
    this.mp=false;
    this.drvr=[];
    firebase.database().ref("/DriverData/"+name).once("value").then((snapshot)=>{
        this.drvr.push({"name":snapshot.val().Name,"dob":snapshot.val().DOB,"tasks":snapshot.val().Tasks,"beta":snapshot.val().Beta,"monthly":snapshot.val().Monthly,"vehicle":snapshot.val().Vehicle,"salary":snapshot.val().Salary,"attendance":snapshot.val().Attendance,"experience":snapshot.val().Experience});
    }).then(()=>{
      this.ns=name;
      this.load=false;
    })
  }

  vis(inp:string){
    (<HTMLInputElement>document.getElementById(inp)).style.display="flex";
    if(inp=="sal")
      (<HTMLInputElement>document.getElementById("Salary")).focus;
    else
      (<HTMLInputElement>document.getElementById("Beta")).focus;
  }

  hide(inp:string){
    (<HTMLInputElement>document.getElementById(inp)).style.display="none";
  }

  back(){
    this.mp=true;
  }

  update(e:KeyboardEvent,name:string,pa:any,id:string){
    if(e.keyCode==13){
      var am:any = (<HTMLInputElement>document.getElementById(id)).value;
      am = parseInt(am);
      am=am+pa;
      if(id==="Salary"){
        firebase.database().ref("DriverData/"+name).update({
          Salary:am
        }).then(()=>{this.driver(name)});
      }
      else{
        firebase.database().ref("DriverData/"+name).update({
          Beta:am
        }).then(()=>{this.driver(name)});
      } 
    }
  }

  logout(){
    this.auth.logout();
    this._router.navigate([""]);
  }

}
