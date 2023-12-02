import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})


export class SignInComponent implements OnInit {
  
  
  ngOnInit(): void {
    ;
  }

  constructor(private auth : AuthService) {}
   
 

  signInwithGoogle(){
    console.log('log in from ts')
    this.auth.googleSignIn();
  }

  forgotPassword(){}

}
