import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from'@angular/router';
import * as firebase from 'firebase';
import {cust_reg} from 'src/app/interfaces/customers';
import {prods} from 'src/app/interfaces/products'
import { identifierModuleUrl, rendererTypeName } from '@angular/compiler';
declare var Chart:any;

@Component({
  selector: 'app-quicknav',
  templateUrl: './quicknav.component.html',
  styleUrls: ['./quicknav.component.css']
})
export class QuicknavComponent implements OnInit {

  processing:number=0;
  approved:number=0;
  delivered:number=0;
  cancelled:number=0;
  totalor:number=0;
  cprice:number=0;
  gprice:number=0;
  sprice:number=0;
  wprice:number=0;
  ci:number=0;
  gi:number=0;
  si:number=0;
  wi:number=0;
  ti:number=0;
  regload=true;
  custreg:cust_reg[]=[];
  products:prods[]=[];
  dataload=true;
  proload=true;

  constructor(private _router: Router,private auth:AuthService) {
    
  }

  ngOnInit(): void {
    (<HTMLElement>document.getElementById("tadd")).setAttribute("data-dismiss","modal");
    firebase.database().ref("/orderdata/").once('value').then((snapshot)=>{
      snapshot.forEach((child)=>{
          child.forEach((inchild)=>{
            if(inchild.val().status === "Processing")
              this.processing++;
            else if(inchild.val().status === "Approved")
              this.approved++
            else if(inchild.val().status === "Delivered")
              this.delivered++
            else
              this.cancelled++;
          })
          child.forEach((inchild)=>{
            if(inchild.val().item === "Cement"){
              this.cprice=this.cprice+inchild.val().price;
              this.ci++;
            }
            else if(inchild.val().item === "Sand"){
              this.sprice=this.sprice+inchild.val().price;
              this.si++;
            }
            else if(inchild.val().item === "Gravels"){
              this.gprice=this.gprice+inchild.val().price;
              this.gi++;
            }
            else{
              this.wprice=this.wprice+inchild.val().price;
              this.wi++;
            }
          })
      })
    }).then(()=>{
      this.ordersummary();
      this.totalor = this.processing+this.approved+this.delivered+this.cancelled;
      this.dataload=false;
      this.ti=this.ci+this.si+this.gi+this.wi;
      this.ci=Math.round((this.ci/this.ti)*100);
      this.gi=Math.round((this.gi/this.ti)*100);
      this.si=Math.round((this.si/this.ti)*100);
      this.wi=Math.round((this.wi/this.ti)*100);
      (<HTMLSpanElement>document.getElementById("cl")).style.width=this.ci+"%";
      (<HTMLSpanElement>document.getElementById("gl")).style.width=this.gi+"%";
      (<HTMLSpanElement>document.getElementById("sl")).style.width=this.si+"%";
      (<HTMLSpanElement>document.getElementById("wl")).style.width=this.wi+"%";
      this.customers();
      this.prods();
      this.pricesummary();
    });;  
  }

  customers(){
    this.regload=true;
    this.custreg=[];
    firebase.database().ref("/user/").once('value').then((snapshot)=>{
      snapshot.forEach((child)=>{
        if(child.val().type==="regular")
          this.custreg.push({"name":child.val().username,"phone":child.val().phone})
        })
        this.regload=false;
      })
      
  }

  removereg(ph:number){
    firebase.database().ref("/user/"+ph).update({
        type:"common"
      }).then(()=>{this.customers()})
        
  }

  pricesummary(){
    var ctx = (<HTMLCanvasElement>document.getElementById('line-chart-container')).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Sand', 'Cement', 'Gravels', 'Water'],
            datasets: [{
                data: [this.sprice, this.cprice, this.gprice, this.wprice],
                pointBackgroundColor:"white",
                pointBorderColor:"gold",
                lineTension:0.5,
                borderWidth:2,
                pointRadius:5,
                borderColor: "#3e95cd",
                fill:false
            }]
        },
        options: {
          responsive:false,
          maintainAspectRatio:false,
            title:{
              display:false,
            },
            layout:{
              padding:{
                left:40,
                right:40,
                top:15,
                bottom:15,
              }
            },
            legend:{
              display:false,
            },
            animation:{
              animationScale:true,
              animateRotate:true
            },
            scales: {
                xAxes:[{
                  gridLines:{
                    display:false
                  },
                  ticks: {
                    fontSize:12,
                    padding:10,
                    maxRotation:15,
                    minRotation:15,
                    fontFamily:'Helvetica',
                    fontStyle:'bold',
                    display:true
                }
                }],
                yAxes: [{
                  gridLines:{
                    display:true
                  },
                  ticks: {
                      display:false
                  }
                }]
            }
        }
    });
    myChart.render();
  }

  ordersummary(){
    var ctx = (<HTMLCanvasElement>document.getElementById('chart-container')).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Processing', 'Approved', 'Delivered', 'Cancelled'],
            datasets: [{
                data: [this.processing, this.approved, this.delivered, this.cancelled],
                backgroundColor: [
                    'gold',
                    'chocolate',
                    'limegreen',
                    'tomato',
                ],
                borderColor: [
                  'gold',
                  'chocolate',
                  'limegreen',
                  'tomato',
                ],
                borderWidth: 1
            }]
        },
        options: {
          responsive:false,
          maintainAspectRatio:false,
            title:{
              display:false,
            },
            layout:{
              padding:{
                left:50,
                right:50,
                top:10,
                bottom:10,
              }
            },
            legend:{
              display:false,
            },
            animation:{
              animationScale:true,
              animateRotate:true
            },
            scales: {
                xAxes:[{
                  gridLines:{
                    display:false
                  },
                  ticks: {
                    display:false
                }
                }],
                yAxes: [{
                  gridLines:{
                    display:false
                  },
                  ticks: {
                      display:false
                  }
                }]
            }
        }
    });
    myChart.render();
  }

  chpr(idd:string){
    (<HTMLInputElement>document.getElementById(idd)).classList.toggle("hidden");
    (<HTMLInputElement>document.getElementById(idd)).focus();
  }

  prods(){
    this.proload=true;
    this.products=[];
    firebase.database().ref("/products/").once("value").then((snapshot)=>{
      snapshot.forEach((child)=>{
        this.products.push({"item":child.val().item,"price":child.val().price,"avail":child.val().availability});
      })
      this.proload=false;
    })
  }

  uppr(e:KeyboardEvent,idd:string){
    (<HTMLInputElement>document.getElementById(idd)).style.border="1px solid gray";
    var pr = (<HTMLInputElement>document.getElementById(idd)).value;
    if(e.keyCode==13){
      if(pr==="")
      {
        var pr = (<HTMLInputElement>document.getElementById(idd)).style.border="1px solid red";
      }
      else{
        (<HTMLInputElement>document.getElementById(idd)).value="";
        (<HTMLInputElement>document.getElementById(idd)).classList.toggle("hidden");
        if(idd==="sp")
          firebase.database().ref("/products/Sand").update({price:pr}).then(()=>{this.prods()});
        else if(idd==="cp")
          firebase.database().ref("/products/Cement").update({price:pr}).then(()=>{this.prods()});
        else if(idd==="gp")
          firebase.database().ref("/products/Gravels").update({price:pr}).then(()=>{this.prods()});
        else
          firebase.database().ref("/products/Water").update({price:pr}).then(()=>{this.prods()});
      }
      
    }
  }

  avail(id:string){
    var ele = (<HTMLElement>document.getElementById(id));
    if(ele.classList.contains("avail")){
      ele.classList.remove("avail");
      ele.classList.add("noavail");
      firebase.database().ref("/products/"+id).update({
        availability:"unavailable"
      })
    }
    else{
      ele.classList.remove("noavail");
      ele.classList.add("avail");
      firebase.database().ref("/products/"+id).update({
        availability:"available"
      })
    }
  }

  addtask(){
    var tn = (<HTMLInputElement>document.getElementById("tn")).value;
    var des = (<HTMLInputElement>document.getElementById("desc")).value;
    var lbc = (<HTMLInputElement>document.getElementById("lb")).value;
    var dt = (<HTMLInputElement>document.getElementById("dt")).value;
    var dateid=(new Date());
    var id = parseInt(((dateid.getDate()).toString()) + ((dateid.getMonth()).toString()) + ((dateid.getFullYear()).toString()) + ((dateid.getTime()).toString()));
    firebase.database().ref("/tasks/"+id).set({
      id:id,
      task:tn,
      description:des,
      label:lbc,
      datetime:dt
    }).then();
  }

  logout(){
    this.auth.logout();
    this._router.navigate([""]);
  }
}