import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router'
import { UserService } from './user.service'
import * as firebase from 'firebase'


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(
    private router: Router,
     private user: UserService
  ) { }

  async canActivate(route) {
		if(await this.user.isAuthenticated()) {
			return true
		}

		this.router.navigate(['/login'])
		return false
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
