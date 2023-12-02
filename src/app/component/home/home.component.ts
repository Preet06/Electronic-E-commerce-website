import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
   
    this.getProduct();
  }

  constructor( private authService:AuthService){}

  public product : any[] = []

  getProduct()
  {
     this.authService.getProduct().subscribe((e) =>
     {
       const productList = e.docs
       for(var i in productList)
       {
        this.product.push(productList[i].data());
       }
     });
    
     console.log(this.product)
   }


   addtoCart(productCart: any)
   {
    console.log(productCart);
    this.authService.addtoCartService(productCart);
   }




}
