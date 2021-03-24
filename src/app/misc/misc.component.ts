import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from'@angular/router';
import {feedb} from 'src/app/interfaces/feed';
import {misc_custs} from 'src/app/interfaces/misc_cust';
import * as firebase from 'firebase';

@Component({
  selector: 'app-misc',
  templateUrl: './misc.component.html',
  styleUrls: ['./misc.component.css']
})
export class MiscComponent implements OnInit {

  feedback:feedb[]=[];
  customers:misc_custs[]=[];
  type:string="";
  mp:boolean=true;
  fbp:boolean=false;
  load:boolean=true;
  usp:boolean=false;
  orders:number=0;
  sno:number=0;
  regular:number=0;
  common:number=0;
  sum:number=0;
  nf:number=0;

  constructor(private _router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.rc();
  }

  rc(){
    this.load=true;
    this.regular=0;
    this.common=0;
    this.sum=0;
    this.nf=0;
        firebase.database().ref("/user/").once("value").then((snapshot)=>{
          snapshot.forEach((child)=>{
            if(child.val().type=="regular")
              this.regular++;
            else
              this.common++;
          })
          this.load=false;
        }).then(()=>{
          firebase.database().ref("/feedback/").once('value').then((snapshot)=>{
            snapshot.forEach((child)=>{
              this.sum+=parseInt(child.val().percent);
              console.log(this.sum);
              this.nf++;
            })
            this.sum=parseFloat((this.sum/this.nf).toFixed(2));
        })
      }).then(()=>{
        this.load=false;
      })
  }
  feedbackpg(){
    this.load=true;
    this.mp=false;
    this.usp=false;
    this.fbp=true;
    this.feedback=[];
    firebase.database().ref("/feedback/").once('value').then((snapshot)=>{
      snapshot.forEach((child)=>{

        firebase.database().ref("/user/"+child.key).once("value").then((snapshot)=>{
          this.type=snapshot.val().type;
          this.feedback.push({"feed":child.val().feedback,"percent":child.val().percent,"time":child.val().time,"user":child.key,"type":this.type,"username":snapshot.val().username})
        }).catch(()=>{
          this.type="common";
          this.feedback.push({"feed":child.val().feedback,"percent":child.val().percent,"time":child.val().time,"user":child.key,"type":this.type,"username":snapshot.val().username})
        });
      })
      this.load=false;
    })
  }

  users(){
    this.sno=0;
    this.load=true;
    this.mp=false;
    this.fbp=false;
    this.usp=true;
    this.customers=[];
    firebase.database().ref("/user/").once("value").then((user)=>{
      user.forEach((inuser)=>{
        firebase.database().ref("/orderdata/"+inuser.val().phone).once("value").then((orders)=>{
          this.orders=0;
          orders.forEach((inorders)=>{
            this.orders++;
            }) 
          }).then(()=>{
            this.customers.push({"name":inuser.val().username,"phone":inuser.val().phone,"type":inuser.val().type,"orders":this.orders});
          })
        })
      this.load=false;
      });
  }

  back(){
    this.mp=true;
    this.fbp=false;
    this.usp=false;
    this.rc();
  }

  search(){
    (<HTMLInputElement>document.getElementById("sph")).classList.toggle("hidden");
    (<HTMLInputElement>document.getElementById("sphi")).focus();
  }

  clear(){
    (<HTMLInputElement>document.getElementById("sphi")).value="";
    (<HTMLInputElement>document.getElementById("sph")).classList.toggle("hidden");
    this.users();
  }

  searchphone(e:KeyboardEvent){
    var st = (<HTMLInputElement>document.getElementById("sphi")).value;
    if(e.keyCode==13){
      this.customers = this.customers.filter((o)=>{
        if(o.phone.toString()===st)
          return true;
        return false;
      })
    }
  }

  statusch(ph:number,ty:string){
    firebase.database().ref("/user/"+ph).update({
      type:ty
    }).then(()=>{
      this.users();
    })
  }

  deleteuser(ph:number){
    firebase.database().ref("/user/"+ph).remove().then(()=>{
      this.users();
    });
  }

  logout(){
    this.auth.logout();
    this._router.navigate([""]);
  }

}
