import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { RequestService } from '../../services/request.service' //
import { Events } from '@ionic/angular'
import { AlertController  } from '@ionic/angular'
import { ChatService } from '../../services/chat.service'

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  myrequests;
  myfriends;

  constructor(
    public router: Router,
    public requestservice: RequestService,
    public events: Events,
    public alertController: AlertController,
    public chatservice: ChatService
    ) { }

  ngOnInit() {
  }

  	//Custom alert function
    async presentAlert(title: string, content: string) {
      const alert = await this.alertController.create({
        header: title,
        message: content,
        buttons: ['OK']
      })
  
      await alert.present()
    }

  ionViewDidEnter() {
    this.requestservice.getmyrequests();
    this.requestservice.getmyfriends();
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })
    this.events.subscribe('friends', () => {
      this.myfriends = [];
      this.myfriends = this.requestservice.myfriends; 
    })
  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
    this.events.unsubscribe('friends');
  }

  addbuddy(){
    this.router.navigate(["buddies"])
    }
 

  accept(item) {
      this.requestservice.acceptrequest(item).then(() => {
        this.presentAlert('Friend added', 'Tap on the friend to chat with him')
      })
    }
  
  ignore(item) {
      this.requestservice.deleterequest(item).then(() => {
        alert('Request ignored');
      }).catch((err) => {
        alert(err);
      })
    }

  buddychat(buddy) {
      this.chatservice.initializebuddy(buddy);
      this.router.navigate(["buddychat"])
    }

 }
