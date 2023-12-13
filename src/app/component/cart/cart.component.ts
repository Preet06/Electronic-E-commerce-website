import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  products: any = [];
  public totalPrice!: number;
  public check: boolean = false;
  public grandTotal = 0


  couponsForm = new FormGroup({
    coupon: new FormControl(''),
  })
  coupon: any;
  public coupanAll : any[] = []
 

  constructor(private authService:AuthService ,private fireauth  : AngularFireAuth, private router : Router, private fs : AngularFirestore){}


  ngOnInit(): void {
  let show = false
    this.fireauth.onIdTokenChanged((user) => {
      if (user) {
        this.authService.updatedProductList().subscribe
        (res => {
      this.products = res;
      this.totalPrice = this.authService.getTotalPrice();
    })
    }

      else
      {
        this.router.navigate(['/signIn'])
     
      show = false;
      }
      console.log("show",show)
    });
    
   

   
  }

  removeItem(item:any)
  {
     this.authService.removeCartItem(item);
  }

  coupanAdd()
  {
     const coupanText = this.couponsForm.value['coupon']
    console.log(coupanText)
    const cityRef = this.fs.collection('Coupons');
     // const doc =  cityRef.get()
      const doc = this.fs.collection("Coupons",ref=>ref.where('Coupon','==',coupanText)).get()
      console.log(doc);
      doc.subscribe((e) =>
      {
        const CouponList = e.docs
        console.log(CouponList.length)
        for(var i in CouponList)
       {
      this.coupanAll.push(CouponList[i].data());
     console.log("without sorting",CouponList[i].data())
       }
       this.totalPrice = this.authService.getTotalPrice();
       this.coupanAll.map((a:any)=>
      {
        off = off + a['Off'];
        console.log("Inside",off,this.totalPrice);
       this.totalPrice = this.totalPrice - ( this.totalPrice * a['Off'] )/100 ;
      })

      })
      console.log("Length", this.coupanAll, Object.keys(this.coupanAll).length)
      let off = 0;

      // this.coupanAll.map((a:any)=>
      // {
      //   off = off + a['Off'];
      //   console.log(a);
      // })
 


    // console.log(this.getTotalPrice());
    // const price = this.authService.getTotalPrice();
    // console.log(price)
   // this.totalPrice = off
  }

  getTotalPrice()
  {
    //let grandTotal = 0;
    this.coupanAll.map((a:any)=>
    {
      this.grandTotal = this.grandTotal + ( this.grandTotal * a['Off'] )/100 ;
    })

    console.log("Function",this.grandTotal);
    return this.grandTotal;
  }




 

}
