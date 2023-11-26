import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private fireauth  : AngularFireAuth, private router : Router ) 
  {  }

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
}
