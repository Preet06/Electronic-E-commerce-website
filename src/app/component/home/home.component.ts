import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public product : any[] = []
  notesLists : any;
  filter_category:any




  ngOnInit(): void {
   
    this.getProduct();
    //this.getId()
  }

  constructor( private authService:AuthService){}

  

  getProduct()
  {
     console.log(this.filter_category)
     this.authService.getProduct(this.filter_category).subscribe((e) =>
     {
       const productList = e.docs
       for(var i in productList)
       {
      this.product.push(productList[i].data());
     console.log("without sorting",productList[i].data())
       }
     });
   }


  //     getId()
  //  {
  //   console.log()
  //   this.authService.getIds().subscribe(data=>data.forEach(
  //     el=>{
  //     //  console.log(el.data())
  //       this.notesLists = []
  //      this.product.push(el.data())
  //       console.log("sorting",this.notesLists)
  //     }))

  //     this.notesLists = []
  //     //console.log("sorting",this.notesLists)
      
  //  }

   filterCategory(filter:any)
   {
           this.product = []
         this.filter_category = filter
         console.log(this.filter_category)
         this.authService.getProduct(this.filter_category).subscribe((e) =>
     {
        const productList = e.docs
       for(var i in productList)
       {
      this.product.push(productList[i].data());
     console.log("without sorting",productList[i].data())
       }
     });
   }











































   addtoCart(productCart: any)
   {
    console.log(productCart);
    this.authService.addtoCartService(productCart);
   }




}
