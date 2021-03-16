import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from'@angular/router';
import * as firebase from 'firebase';
import {cust_reg} from 'src/app/interfaces/customers';
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
  regload=true;
  custreg:cust_reg[]=[];
  dataload=true;

  constructor(private _router: Router,private auth:AuthService) {
    
  }

  ngOnInit(): void {
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
      });
      this.totalor = this.processing+this.approved+this.delivered+this.cancelled;
      this.dataload=false;
      this.ordersummary();
      this.customers();
    });  
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

  logout(){
    this.auth.logout();
    this._router.navigate([""]);
  }
}