import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import {Router} from'@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-admin-auth',
  templateUrl: './admin-auth.component.html',
  styleUrls: ['./admin-auth.component.css']
})

export class AdminAuthComponent implements OnInit {

  passauth!:FormGroup;
  passchange!:FormGroup;
  submitted=false;
  submitted2=false;
  notequal=false;

  constructor(private _router: Router,private fb:FormBuilder) { 
    this.passauth = this.fb.group({
      pass:['',Validators.required],
    });

    this.passchange = this.fb.group({
      opass:['',Validators.required],
      npass:['',Validators.required],
      cnpass:['',Validators.required]
    });
  }

  get f(){
    return this.passauth.controls;
  }

  get c(){
    return this.passchange.controls;
  }

  ngOnInit(): void {
    if(localStorage.getItem("adminloggedin")=="true"){
      this._router.navigate(['/quicknav']);
    }
  }

  passbtn(){
    this.submitted=true;
    if(this.passauth.invalid)
      return;
    else{
        (<HTMLButtonElement>document.getElementById("pb")).disabled=true;
        (<HTMLButtonElement>document.getElementById("pb")).innerHTML="Logging you in  <i class='fa fa-spinner fa-pulse'></i>";
        firebase.database().ref("/admin/").once("value").then((snapshot)=>{
          var p=snapshot.val().password;
          if((this.passauth.controls['pass'].value).toString()===p.toString()){
            localStorage.setItem("adminloggedin","true");
            this._router.navigate(['/quicknav']);
          }
        else{
          setTimeout(function(){
            (<HTMLDivElement>document.getElementById("nope")).style.display="none";
            },5000);
            (<HTMLDivElement>document.getElementById("nope")).style.display="block";
            (<HTMLButtonElement>document.getElementById("pb")).disabled=false;
            (<HTMLButtonElement>document.getElementById("pb")).innerHTML="LOGIN";
        }
      });
    }
  }


  changepassword(){
    this.submitted2=true;
    if(this.passchange.invalid)
      return;
    else if(((this.passchange.controls['npass']).value).toString() !== ((this.passchange.controls['cnpass']).value).toString()){
      this.notequal=true;
    }
    else{
      (<HTMLButtonElement>document.getElementById("cpb")).disabled=true;
      (<HTMLButtonElement>document.getElementById("cpb")).innerHTML="Updating...<i class='fa fa-spinner fa-pulse'></i>";
      firebase.database().ref("/admin/").once("value").then((snapshot)=>{
        var p=snapshot.val().password;
        if((this.passchange.controls['opass'].value).toString()===p.toString()){  
          firebase.database().ref("/admin/").update({
            password:this.passchange.controls['cnpass'].value
          });
          setTimeout(function(){
            (<HTMLDivElement>document.getElementById("yes")).style.display="none";
            (<HTMLButtonElement>document.getElementById("cpb")).disabled=false;
            (<HTMLButtonElement>document.getElementById("cpb")).innerHTML="Change Password";
            },5000);
          (<HTMLDivElement>document.getElementById("yes")).style.display="block";
          
          (<HTMLButtonElement>document.getElementById("cpb")).innerHTML="Change Password";
        }
        else{
          setTimeout(function(){
            (<HTMLDivElement>document.getElementById("nope")).style.display="none";
            },5000);
            (<HTMLDivElement>document.getElementById("nope")).style.display="block";
            (<HTMLButtonElement>document.getElementById("cpb")).disabled=false;
            (<HTMLButtonElement>document.getElementById("cpb")).innerHTML="Change Password";
        }
      });
    }
  }

  change(){
    (<HTMLFormElement>document.getElementById("noc")).style.display="none";
    (<HTMLFormElement>document.getElementById("chpa")).style.display="flex";
  }

  nochange(){
    (<HTMLFormElement>document.getElementById("noc")).style.display="flex";
    (<HTMLFormElement>document.getElementById("chpa")).style.display="none";
  }
}