import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase'
import { Events } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  firereq = firebase.database().ref('/requests');
  firefriends = firebase.database().ref('/friends');

  usersCollection
  users

  userdetails;
  myfriends;
  rquestedUser;
  
  constructor(
    private afs: AngularFirestore,
    public events: Events,
    public user: UserService
    ) { 
  }

  sendrequest(req) {
    var promise = new Promise((resolve, reject) => {
      this.firereq.child(req.recipient).push({
      sender: req.sender
      }).then(() => {
        resolve({ success: true });
        }).catch((err) => {
          resolve(err);
    })
    })
    return promise;
  }

  getAllrequests(uid){
    var request = []
    this.afs.doc(`requests/${uid}`).get().subscribe(docs =>{
      request.push(docs.data())
    })

    return request;
  }

  getAllUsers(){
    var allUsers =[];
    this.users = this.afs.collection('users').snapshotChanges().subscribe(snaps =>{
      snaps.forEach(doc =>{
        var doc_object = this.documentToDomainObject(doc)
        allUsers.push(doc_object)
      })
    })
    return allUsers;
  }

  documentToDomainObject = snap => {
    const object = snap.payload.doc.data();
    object.uid = snap.payload.doc.id;
    return object;
  }

  getUser(uid){
    this.afs.doc(`users/${uid}`).get().subscribe(user =>{
      this.rquestedUser = user.data()
      console.log("rquestedUser 1", this.rquestedUser)
    })

    return 
  }

  // TODO: Optimize this code
  getmyrequests() {
    let allmyrequests;
    var myrequests = [];
    this.firereq.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      allmyrequests = snapshot.val();
      myrequests = [];
      for (var i in allmyrequests) {
        myrequests.push(allmyrequests[i].sender);
      }
      this.user.getallusers().then((res) => {
        var allusers = res;
        this.userdetails = [];
        for (var j in myrequests)
          for (var key in allusers) {
            if (myrequests[j] === allusers[key].uid) {
              this.userdetails.push(allusers[key]);
            }
          }
        this.events.publish('gotrequests');
      })

  })
  }

  
  acceptrequest(buddy) {
    var promise = new Promise((resolve, reject) => {
      this.myfriends = [];
      this.firefriends.child(firebase.auth().currentUser.uid).push({
        uid: buddy.uid
      }).then(() => {
        this.firefriends.child(buddy.uid).push({
          uid: firebase.auth().currentUser.uid
        }).then(() => {
          this.deleterequest(buddy).then(() => {
          resolve(true);
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

  deleterequest(buddy) {
    var promise = new Promise((resolve, reject) => {
     this.firereq.child(firebase.auth().currentUser.uid).orderByChild('sender').equalTo(buddy.uid).once('value', (snapshot) => {
          let somekey;
          for (var key in snapshot.val())
            somekey = key;
          this.firereq.child(firebase.auth().currentUser.uid).child(somekey).remove().then(() => {
            resolve(true);
          })
         })
          .then(() => {

        }).catch((err) => {
          reject(err);
        })
    })
    return promise;
  }

  getmyfriends() {
    let friendsuid = [];
    this.firefriends.child(firebase.auth().currentUser.uid).on('value', (snapshot) => {
      let allfriends = snapshot.val();
      this.myfriends = [];
      for (var i in allfriends)
        friendsuid.push(allfriends[i].uid);

      this.user.getallusers().then((users) => {
        this.myfriends = [];
        for (var j in friendsuid)
          for (var key in users) {
            if (friendsuid[j] === users[key].uid) {
              this.myfriends.push(users[key]);
            }
          }
        this.events.publish('friends');
      }).catch((err) => {
        alert(err);
      })

    })
  }

}
