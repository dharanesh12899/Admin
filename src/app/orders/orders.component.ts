import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from'@angular/router';
import {ordersList} from 'src/app/interfaces/orderslist';
import * as firebase from 'firebase'; 

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  mp=true;
  pe=false;
  ap=false;
  dp=false;
  cp=false;
  ddb=false;
  adb=false;
  processing_i:number=0;
  approved_i:number=0;
  delivered_i:number=0;
  cancelled_i:number=0;
  orders:ordersList[]=[];
  pos:ordersList[]=[];
  fos:ordersList[]=[];
  disos:ordersList[]=[];
  ids:any[]=[];
  load=true;
  mload=true;
  aab=false;
  rb=false;
  page_name:string="";
  in:number=0;
  pr=[{'item':'Gravels','price':10000},{'item':'Sand','price':20000},{'item':'Cement','price':30000},{'item':'Water','price':500}];
  est:number=0;
  type:string="";
  ctype:string="";
  
  constructor(private _router: Router,private auth:AuthService) {
    
   }

  ngOnInit(): void {
    this.fb(1);
    (<HTMLElement>document.getElementById("place")).setAttribute("data-dismiss","modal");
  }

  fb(a:number){
    this.load=true;
    firebase.database().ref("/orderdata/").once('value').then((snapshot)=>{
      this.orders=[];
      this.processing_i=0;
      this.approved_i=0;
      this.delivered_i=0;
      this.cancelled_i=0;
      snapshot.forEach((child)=>{
          child.forEach((inchild)=>{
            if(inchild.val().status === "Processing"){
              this.processing_i++;
            }
            else if(inchild.val().status === "Approved"){
              this.approved_i++
            }
            else if(inchild.val().status === "Delivered"){
              this.delivered_i++
            }
            else{
              this.cancelled_i++;
            }
            firebase.database().ref("/user/"+child.key).once("value").then((snapshot)=>{
              this.type=snapshot.val().type;
              this.orders.push({id:inchild.val().orderid,date:inchild.val().orderdate,item:inchild.val().item,status:inchild.val().status,price:inchild.val().price,quantity:inchild.val().quantity,address:inchild.val().address,area:inchild.val().area,delivery:inchild.val().deliverydate,phone:child.key,type:this.type});
            }).catch(()=>{
              this.type="common";
              this.orders.push({id:inchild.val().orderid,date:inchild.val().orderdate,item:inchild.val().item,status:inchild.val().status,price:inchild.val().price,quantity:inchild.val().quantity,address:inchild.val().address,area:inchild.val().area,delivery:inchild.val().deliverydate,phone:child.key,type:this.type});
            });
            })
      });
      this.load=false;
      this.fos=this.orders;
    })
  }

  logout(){
    this.auth.logout();
    this._router.navigate([""]);
  }

  itemfil(item:string){
    this.mload=true;
    this.mp=false;
    this.aab=true;
    this.rb=true;
    this.pe=true;
    this.pos=[];
    if(this.in===1){
    this.pos = this.orders.filter((o)=>{
      if(o.item===item && o.status==="Processing")
        return true;
      return false;
    })
  }
  else if(this.in===2){
    this.pos = this.orders.filter((o)=>{
      if(o.item===item && o.status==="Approved")
        return true;
      return false;
    })
  }
  else if(this.in===3){
    this.pos = this.orders.filter((o)=>{
      if(o.item===item && o.status==="Delivered")
        return true;
      return false;
    })
  }
  else if(this.in===4){
    this.pos = this.orders.filter((o)=>{
      if(o.item===item && o.status==="Cancelled")
        return true;
      return false;
    })
  }
    this.ids=[];
    this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
    if(this.pos.length>0)
      setTimeout(()=>{this.displayData(this.pos[0].id);},200);
    else
      this.pos=[];
    }

    custfil(item:string){
      this.mload=true;
      this.mp=false;
      this.aab=true;
      this.rb=true;
      this.pe=true;
      this.pos=[];
      if(this.in===1){
      this.pos = this.orders.filter((o)=>{
        if(o.type===item && o.status==="Processing")
          return true;
        return false;
      })
    }
    else if(this.in===2){
      this.pos = this.orders.filter((o)=>{
        if(o.type===item && o.status==="Approved")
          return true;
        return false;
      })
    }
    else if(this.in===3){
      this.pos = this.orders.filter((o)=>{
        if(o.type===item && o.status==="Delivered")
          return true;
        return false;
      })
    }
    else if(this.in===4){
      this.pos = this.orders.filter((o)=>{
        if(o.type===item && o.status==="Cancelled")
          return true;
        return false;
      })
    }
      this.ids=[];
      this.fos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
      if(this.fos.length>0)
        setTimeout(()=>{this.displayData(this.fos[0].id);},200);
      else
        this.pos=[];
  }

  pending(){
    this.in=1;
    this.page_name="Pending";
    this.mload=true;
    this.mp=false;                   
    this.aab=true;
    this.ddb=false;
    this.adb=true;
    this.rb=true;
    this.pe=true;
    this.pos=[];
    this.pos = this.orders.filter((o)=>{
      if(o.status==="Processing")
        return true;
      return false;
    })
    this.ids=[];
    if(this.pos.length>0){
      this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
      setTimeout(()=>{this.displayData(this.pos[0].id);},200);
    }
    else
      this.pos=[];
    }

  assigned(){
    this.in=2;
    this.page_name="Approved";
    this.mload=true;
    this.mp=false;
    this.pe=true;
    this.aab=false;
    this.ddb=true;
    this.adb=false;
    this.rb=true;
    this.pos=[];
    this.pos = this.orders.filter((o)=>{
      if(o.status==="Approved")
        return true;
      return false;
    })
    this.ids=[];
    this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
    if(this.pos.length>0)
      setTimeout(()=>{this.displayData(this.pos[0].id);},200);
    else
      this.pos=[];
  }

  cancelled(){
    this.in=4;
    this.page_name="Cancelled";
    this.mload=true;
    this.mp=false;
    this.pe=true;
    this.aab=false;
    this.ddb=false;
    this.adb=false;
    this.rb=false;
    this.pos=[];
    this.pos = this.orders.filter((o)=>{
      if(o.status==="Cancelled")
        return true;
      return false;
    })
    this.ids=[];
    this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
    if(this.pos.length>0)
      setTimeout(()=>{this.displayData(this.pos[0].id);},200);
    else
      this.pos=[];
  }

  delivered(){
    this.in=3;
    this.page_name="Delivered";
    this.mload=true;
    this.mp=false;
    this.pe=true;
    this.aab=false;
    this.ddb=false;
    this.adb=false;
    this.rb=false;
    this.pos=[];
    this.pos = this.orders.filter((o)=>{
      if(o.status==="Delivered")
        return true;
      return false;
    })
    this.ids=[];
    this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
    if(this.pos.length>0)
      setTimeout(()=>{this.displayData(this.pos[0].id);},200);
    else
      this.pos=[];
  }

  back(){
    this.mp=true;
    this.pe=false;
    this.fb(1);
  }

  displayData(id:any){
    this.mload=false;
    this.ids.push(id);
    if(this.ids.length == 2){
      (<HTMLDivElement>document.getElementById(this.ids[0])).classList.remove('bg');
      this.ids.shift();
    }
    (<HTMLDivElement>document.getElementById(id)).classList.add('bg');
    var item = <HTMLElement>document.getElementById("item-dis");
    var phone = <HTMLElement>document.getElementById("phone-dis");
    var delivery = <HTMLElement>document.getElementById("delivery-dis");
    var reference = <HTMLElement>document.getElementById("reference-dis");
    var date = <HTMLElement>document.getElementById("date-dis");
    var address = <HTMLElement>document.getElementById("address-dis");
    var area = <HTMLElement>document.getElementById("area-dis");
    var item_bill = <HTMLElement>document.getElementById("item-dis-bill");
    var status = <HTMLElement>document.getElementById("status-dis");
    var price = <HTMLElement>document.getElementById("price-dis");
    var quantity = <HTMLElement>document.getElementById("quantity-dis");
    var total = <HTMLElement>document.getElementById("total-dis");
    
    this.disos = this.pos.filter(function(or){
      if(or.id===id)
        return true;
      return false;
    });

    item.innerHTML=this.disos[0].item;
    delivery.innerHTML=this.disos[0].delivery;
    reference.innerHTML=this.disos[0].id;
    date.innerHTML=this.disos[0].date;
    phone.innerHTML=this.disos[0].phone;
    address.innerHTML=this.disos[0].address;
    area.innerHTML=this.disos[0].area;
    item_bill.innerHTML=this.disos[0].item;
    status.innerHTML=this.disos[0].status;
    var tot=parseInt(this.disos[0].price) / this.disos[0].quantity;
    price.innerHTML = tot.toString()
    quantity.innerHTML=this.disos[0].quantity.toString();
    total.innerHTML=this.disos[0].price;
    var idd = this.disos[0].id;
    var phh = this.disos[0].phone;
    if(this.disos[0].status==="Processing"){
      (<HTMLButtonElement>document.getElementById("aaab")).onclick=()=>{
        this.processbtn(idd,phh);
      }
    }
    if(this.disos[0].status==="Approved"){
      (<HTMLButtonElement>document.getElementById("dddb")).onclick=()=>{
        this.deliverbtn(idd,phh);
      }
    }
    (<HTMLButtonElement>document.getElementById("rrb")).onclick=()=>{
      this.rejbtn(idd,phh);
    }
  }

  processbtn(id:any,phone:any){
    var i=0;
    this.mload=true;
    firebase.database().ref("/orderdata/"+phone+"/"+id).update({
      status:"Approved"
    }).then(()=>{
      if(this.orders.length>0){
        this.orders.splice(this.orders.findIndex(a=>a.id === id),1);
        console.log(i++)
        setTimeout(()=>{this.pending()},200);
      }
      else
        this.orders=[];
      })
  }

  rejbtn(id:any,phone:any){
    this.mload=true;
    firebase.database().ref("/orderdata/"+phone+"/"+id).update({
      status:"Cancelled"
    }).then(()=>{
      if(this.orders.length>0){
        this.orders.splice(this.orders.findIndex(a=>a.id === id),1);
        if(this.in===1)
          setTimeout(()=>{this.pending()},200);
        if(this.in===2)
          setTimeout(()=>{this.assigned()},200);
        if(this.in===3)
          setTimeout(()=>{this.delivered()},200);
        if(this.in===4)
          setTimeout(()=>{this.cancelled()},200);
      }
      else
        this.orders=[];
      })
  }

  deliverbtn(id:any,phone:any){
    var i=0;
    this.mload=true;
    firebase.database().ref("/orderdata/"+phone+"/"+id).update({
      status:"Delivered"
    }).then(()=>{
      if(this.orders.length>0){
        this.orders.splice(this.orders.findIndex(a=>a.id === id),1);
        console.log(i++)
        setTimeout(()=>{this.assigned()},200);
      }
      else
        this.orders=[];
      })
  }

  manually(){
    var phone=(<HTMLInputElement>document.getElementById("phn")).value;
    var item=(<HTMLInputElement>document.getElementById("item")).value;
    var quantity=(<HTMLInputElement>document.getElementById("quantity")).value;
    var address=(<HTMLInputElement>document.getElementById("address")).value;
    var area=(<HTMLInputElement>document.getElementById("area")).value;
    var status=(<HTMLInputElement>document.getElementById("status")).value;
    var deldate=(<HTMLInputElement>document.getElementById("deldate")).value;
    deldate = (new Date(deldate)).toString();
    var ddate= deldate.slice(4,15);
    var date=(new Date()).toString();
    date = date.slice(4,15);
    var dateid=(new Date())
    var id = parseInt(((dateid.getDate()).toString()) + ((dateid.getMonth()).toString()) + ((dateid.getFullYear()).toString()) + ((dateid.getTime()).toString()));
    this.load=true;
    firebase.database().ref("orderdata/"+phone+"/"+id).set({
      address:address,
      area:area,
      deliverydate:ddate,
      item:item,
      orderdate:date,
      orderid:id,
      price:this.est,
      quantity:quantity,
      status:status,
    }).then(()=>{
      this.fb(1);
    });
  }

  price(){
    var typesel=(<HTMLInputElement>document.getElementById("item")).value;
    if(typesel==="")
      this.est=0;
    else{
      var p=this.pr.findIndex(x => x.item === typesel);
      var quant=parseInt((<HTMLInputElement>document.getElementById("quantity")).value);
      this.est= quant*this.pr[p].price;
      if(isNaN(this.est)){
        this.est=0;
      }
    }
  }

  phfilter(item:string){
    this.mload=true;
    this.mp=false;
    this.aab=true;
    this.rb=true;
    this.pe=true;
    this.pos=[];
    if(this.in===1){
    this.pos = this.orders.filter((o)=>{
      if(o.phone===item && o.status==="Processing")
        return true;
      return false;
    })
  }
  else if(this.in===2){
    this.pos = this.orders.filter((o)=>{
      if(o.phone===item && o.status==="Approved")
        return true;
      return false;
    })
  }
  else if(this.in===3){
    this.pos = this.orders.filter((o)=>{
      if(o.phone===item && o.status==="Delivered")
        return true;
      return false;
    })
  }
  else if(this.in===4){
    this.pos = this.orders.filter((o)=>{
      if(o.phone===item && o.status==="Cancelled")
        return true;
      return false;
    })
  }
    this.ids=[];
    this.pos.sort((a, b) => (new Date(a.date) > new Date(b.date) ? 1 : -1));
    if(this.pos.length>0)
      setTimeout(()=>{this.displayData(this.pos[0].id);},200);
    else
      this.pos=[];
    }
  
  searchph(e:KeyboardEvent){
    var ps=(<HTMLInputElement>document.getElementById("search")).value;
    if(ps===""){
      this.clearfil();
    }
    if(e.keyCode === 13){
      var ps=(<HTMLInputElement>document.getElementById("search")).value;
      this.phfilter(ps);
    }
  }

  clearfil(){
    if(this.in===1){
      this.pending();
      }
    else if(this.in===2){
      this.assigned();
      }
    else if(this.in===3){
      this.delivered();
      }
    else if(this.in===4){
      this.cancelled();
      }
  }
}