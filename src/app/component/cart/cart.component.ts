import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  products: any = [];
  public totalPrice!: number;
  public check: boolean = false;
 

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


 

}
