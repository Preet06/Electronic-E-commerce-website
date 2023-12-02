import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';
import { AngularFirestore } from "@angular/fire/compat/firestore"; 

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  constructor( private fireauth  : AngularFireAuth, private router : Router, private fs : AngularFirestore) 
  {  }
  ngOnInit(): void {
    this.check()
  }

  public cartList: any = [];

  public addToCartStore = new BehaviorSubject<any>([]);




  googleSignIn()
   {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then( res =>{
      localStorage.setItem('token',JSON.stringify(res.user?.uid))
      console.log("done log in")
    },
    err =>{
      alert(err.message)
    })
   }


   updatedProductList()
   {
    console.log(this.cartList)
    console.log("send data",this.addToCartStore)
    return this.addToCartStore.asObservable();
   }



// get data from firebase
   getProduct(){
    const cityRef = this.fs.collection('Product');
    const doc =  cityRef.get()
    return doc
  }

  addtoCartService(_productCart: any)
  {
       this.cartList.push(_productCart);
       this.addToCartStore.next(this.cartList);
  }

  getTotalPrice()
  {
    let grandTotal = 0;
    this.cartList.map((a:any)=>
    {
      grandTotal = grandTotal + a['Price'];
    })

    console.log(grandTotal);
    return grandTotal;
  }

  removeCartItem(product:any)
  {
    this.cartList.map((a:any,index:any)=>
    {
      if(product.id === a.id)
      {
        this.cartList.splice(index,1);
      }

      console.log("remove-cart-  ",this.cartList);
      this.addToCartStore.next(this.cartList);
      this.getTotalPrice();
    })
  }

  check()
  {
    let show :boolean;
    this.fireauth.onIdTokenChanged((user) => {
   if (user) {
      show = true;
     console.log('loggid in');
     
   }
   else{
     console.log('Not logged')
  
   show = false;
   }
   return show;
 });

 
}




}
 