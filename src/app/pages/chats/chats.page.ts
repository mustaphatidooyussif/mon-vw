import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { RequestService } from '../../services/request.service' //
import { Events } from '@ionic/angular'

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
    public events: Events
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.requestservice.getmyrequests();
    this.events.subscribe('gotrequests', () => {
      this.myrequests = [];
      this.myrequests = this.requestservice.userdetails;
    })

  }

  ionViewDidLeave() {
    this.events.unsubscribe('gotrequests');
  }

  addbuddy(){
    this.router.navigate(["buddies"])
    }
 
 }
