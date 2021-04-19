import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ChildActivationStart, Router} from'@angular/router';
import * as firebase from 'firebase';
declare var Chart:any;
@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {


  constructor(private _router: Router,private auth:AuthService) { }

  ngOnInit(): void {
    this.l1();
    this.l2();
    this.l3();
    this.l4();
    this.l5();
    this.l6();
  }
  
  l1(){
    var ctx = (<HTMLCanvasElement>document.getElementById('l1')).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['trip 1', 'trip 2', 'trip 3', 'trip 4','trip 5', 'trip 6', 'trip 7', 'trip 8', 'trip 9', 'trip 10'],
            datasets: [{
                data: [500,400,460,520,600,700,430,200,600,250],
                pointBackgroundColor:"white",
                pointBorderColor:"dodgerblue",
                backgroundColor:"rgba(30, 143, 255, 0.2)",
                lineTension:0.2,
                borderWidth:2,
                pointRadius:2,
                borderColor: "#3e95cd",
                fill:true
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

  l2(){
    var ctx = (<HTMLCanvasElement>document.getElementById('l2')).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['trip 1', 'trip 2', 'trip 3', 'trip 4','trip 5', 'trip 6', 'trip 7', 'trip 8', 'trip 9', 'trip 10'],
            datasets: [{
                data: [400,300,260,320,200,400,330,200,500,250],
                pointBackgroundColor:"white",
                pointBorderColor:"tomato",
                backgroundColor:"rgba(255, 99, 71, 0.2)",
                lineTension:0.2,
                borderWidth:2,
                pointRadius:2,
                borderColor: "tomato",
                fill:true
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

  l3(){
    var ctx = (<HTMLCanvasElement>document.getElementById('l3')).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['trip 1', 'trip 2', 'trip 3', 'trip 4','trip 5', 'trip 6', 'trip 7', 'trip 8'],
            datasets: [{
                data: [100,150,200,250,300,350,430,450],
                pointBackgroundColor:"white",
                pointBorderColor:"limegreen",
                backgroundColor:"rgba(50, 205, 50, 0.2)",
                lineTension:0.2,
                borderWidth:2,
                pointRadius:2,
                borderColor: "limegreen",
                fill:true
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

  l4(){
    var ctx = (<HTMLCanvasElement>document.getElementById('l4')).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['trip 1', 'trip 2', 'trip 3', 'trip 4','trip 5', 'trip 6', 'trip 7', 'trip 8', 'trip 9', 'trip 10'],
            datasets: [{
                data: [250,600,200,600,520,460,340,200,300,300],
                pointBackgroundColor:"white",
                pointBorderColor:"gold",
                backgroundColor:"rgba(255, 217, 0, 0.2)",
                lineTension:0.2,
                borderWidth:2,
                pointRadius:2,
                borderColor: "gold",
                fill:true
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

  l5(){
    var ctx = (<HTMLCanvasElement>document.getElementById('l5')).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['trip 1', 'trip 2', 'trip 3', 'trip 4','trip 5'],
            datasets: [{
                data: [500,400,460,520,600],
                pointBackgroundColor:"white",
                pointBorderColor:"purple",
                backgroundColor:"rgba(221, 160, 221, 0.2)",
                lineTension:0.2,
                borderWidth:2,
                pointRadius:2,
                borderColor: "purple",
                fill:true
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

  l6(){
    var ctx = (<HTMLCanvasElement>document.getElementById('l6')).getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['trip 1', 'trip 2', 'trip 3', 'trip 4','trip 5', 'trip 6', 'trip 7', 'trip 8', 'trip 9', 'trip 10'],
            datasets: [{
                data: [500,450,400,350,300,350,200,350,100,500],
                pointBackgroundColor:"white",
                pointBorderColor:"hotpink",
                backgroundColor:"rgba(255, 105, 180, 0.2)",
                lineTension:0.2,
                borderWidth:2,
                pointRadius:2,
                borderColor: "hotpink",
                fill:true
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

  expand(id:string){
    (<HTMLDivElement>document.getElementById("lor"+id)).classList.toggle("exp");
  }

  logout(){
    this.auth.logout();
    this._router.navigate([""]);
  }
}
