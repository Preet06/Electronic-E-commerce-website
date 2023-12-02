import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  products: any = [];
  public totalPrice!: number;
  public check: boolean = false;
 

  constructor(private authService:AuthService , private router : Router){}


  ngOnInit(): void {
    

    let check = this.authService.check();
    console.log("check- "+ check);

    if(this.check)
    {
      this.authService.updatedProductList().subscribe
    (res => {
      this.products = res;
      this.totalPrice = this.authService.getTotalPrice();
    })

    }
    else
    {
      this.router.navigate(['/signIn'])
    }
   

   
  }

  removeItem(item:any)
  {
     this.authService.removeCartItem(item);
  }


 

}
