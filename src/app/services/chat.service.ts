import { Events } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import * as firebase from 'firebase'
import { PreferenceService } from './preference.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  buddy: any
  firebuddychats = firebase.database().ref('/buddychats');
  buddymessages = [];
  constructor(
    public router: Router,
    public events: Events,
    public preferenceService: PreferenceService
  ) { }

  
  initializebuddy(buddy) {
    this.buddy = buddy;
  }

  addnewmessage(msg, trans) {
    if (this.buddy) {
      var promise = new Promise((resolve, reject) => {
        this.firebuddychats.child(firebase.auth().currentUser.uid).child(this.buddy.uid).push({
          sentby: firebase.auth().currentUser.uid,
          message: msg,
          translation: trans,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(() => {
          this.firebuddychats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            translation: trans,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            resolve(true);
            }).catch((err) => {
              reject(err);
          })
        })
      })
      return promise;
    }else{
      this.preferenceService.getCurrentBuddy().then(buddy =>{
        var promise = new Promise((resolve, reject) => {
          this.firebuddychats.child(firebase.auth().currentUser.uid).child(buddy.uid).push({
            sentby: firebase.auth().currentUser.uid,
            message: msg,
            translation: trans,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(() => {
            this.firebuddychats.child(this.buddy.uid).child(firebase.auth().currentUser.uid).push({
              sentby: firebase.auth().currentUser.uid,
              message: msg,
              translation: trans,
              timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(() => {
              resolve(true);
              }).catch((err) => {
                reject(err);
            })
          })
        })
        return promise;
      })
    }
  }

  getBuddyFireMessages(uid){
    let temp;
    this.firebuddychats.child(firebase.auth().currentUser.uid).child(uid).on('value', (snapshot) => {
      this.buddymessages = [];
      temp = snapshot.val();
      for (var tempkey in temp) {
        this.buddymessages.push(temp[tempkey]);
      }
      this.events.publish('newmessage');
    })
  }

  getbuddymessages() {
    if(this.buddy){
      this.getBuddyFireMessages(this.buddy.uid);
    }else{
      this.preferenceService.getCurrentBuddy().then(buddy =>{
        this.getBuddyFireMessages(buddy.uid);
      })
    }
  }
}
