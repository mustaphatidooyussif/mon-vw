import { Injectable } from '@angular/core'
import { AngularFireAuth } from '@angular/fire/auth'
import { first } from 'rxjs/operators'
import { auth } from 'firebase/app'
import { AngularFirestore } from '@angular/fire/firestore'
import * as firebase from 'firebase';

interface user {
  email: string
	uid: string
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
    firedata = firebase.database().ref('/users');
    private user: user
    constructor(
      private afAuth: AngularFireAuth,
      public afstore: AngularFirestore
      ) {

    }

    setUser(user: user) {
      this.user = user
    }

    getEmail(): string {
      return this.user.email
    }

    reAuth(email: string, password: string) {
      return this.afAuth.auth.currentUser.reauthenticateWithCredential(auth.EmailAuthProvider.credential(email, password))
    }

    updatePassword(newpassword: string) {
      return this.afAuth.auth.currentUser.updatePassword(newpassword)
    }

    updateEmail(newemail: string) {
      return this.afAuth.auth.currentUser.updateEmail(newemail)
    }

    async isAuthenticated() {
      if(this.user) return true

      const user = await this.afAuth.authState.pipe(first()).toPromise()

      if(user) {
        this.setUser({
          email: user.email,
          uid: user.uid
        })

        return true
      }
      return false
    }

    getUID(): string {
      return this.user.uid
    }

    getUserDetailsById(uid){
      var promise = new Promise((resolve, reject) => {
        this.firedata.child(uid).once('value', (snapshot) => {
          resolve(snapshot.val());
        }).catch((err) => {
          reject(err);
          })
        })
        return promise;
    }

    getCurrentUserDetails() {
      var promise = new Promise((resolve, reject) => {
      this.firedata.child(firebase.auth().currentUser.uid).once('value', (snapshot) => {
        resolve(snapshot.val());
      }).catch((err) => {
        reject(err);
        })
      })
      return promise;
    }

    adduser(newuser) {
      var promise = new Promise((resolve, reject) => {
        this.afAuth.auth.createUserWithEmailAndPassword(newuser.email, newuser.password).then(() => {
          this.afAuth.auth.currentUser.updateProfile({
            displayName: newuser.displayName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
          }).then(() => {
            this.firedata.child(this.afAuth.auth.currentUser.uid).set({
              uid: this.afAuth.auth.currentUser.uid,
              displayName: newuser.displayName,
              photoURL: 'https://firebasestorage.googleapis.com/v0/b/myapp-4eadd.appspot.com/o/chatterplace.png?alt=media&token=e51fa887-bfc6-48ff-87c6-e2c61976534e'
            }).then(() => {
              resolve({ success: true });
              }).catch((err) => {
                reject(err);
            })
            }).catch((err) => {
              reject(err);
          })
        }).catch((err) => {
          reject(err);
        })
      })
      return promise;
    }

    getallusers() {
      var promise = new Promise((resolve, reject) => {
        this.firedata.orderByChild('uid').once('value', (snapshot) => {
          let userdata = snapshot.val();
          let temparr = [];
          for (var key in userdata) {
            temparr.push(userdata[key]);
          }
          resolve(temparr);
        }).catch((err) => {
          reject(err);
        })
      })
      return promise;
    }
}