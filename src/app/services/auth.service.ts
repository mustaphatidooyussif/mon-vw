import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'
import { UserService } from './user.service'
import * as firebase from 'firebase'
import { AngularFireAuth } from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(
    private router: Router,
     private user: UserService,
     private afAuth: AngularFireAuth,
  ) { }

  async canActivate(route) {
		if(await this.user.isAuthenticated()) {
			return true
		}

		this.router.navigate(['/login'])
		return false
  }
  
  login(credentials) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
        resolve(true);
      }).catch((err) => {
        reject(err);
       })
    })

    return promise;
    
  }

  // Reset a password
  resetPassword(email) {
    var promise = new Promise((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email).then(() => {
        resolve({ success: true });
      }).catch((err) => {
        reject(err);
      })
    })
    return promise;
  }
}
