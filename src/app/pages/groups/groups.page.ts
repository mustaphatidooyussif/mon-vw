import { Component, OnInit} from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase'
import { IonicSelectableComponent } from 'ionic-selectable';
import { TanslationService } from './../../services/tanslation.service';
import { Events } from '@ionic/angular'
// import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {

  language;
  languages = [
    {
      languageCode: 'ar',
      languageName: 'Arabic'
    },
    {
      languageCode: 'eu',
      languageName: 'Basque'
    },
    {
      languageCode: 'bg',
      languageName: 'Bulgarian'
    },
    {
      languageCode: 'ca',
      languageName: 'Catalan'
    },
    {
      languageCode: 'zh-CN',
      languageName: 'Chinese'
    },
    {
      languageCode: 'hr',
      languageName: 'Croatian'
    },
    {
      languageCode: 'cs',
      languageName: 'Czech'
    },
    {
      languageCode: 'da',
      languageName: 'Danish'
    },
    {
      languageCode: 'nl',
      languageName: 'Dutch'
    },
    {
      languageCode: 'en',
      languageName: 'English'
    },
    {
      languageCode: 'es',
      languageName: 'Español'
    },
    {
      languageCode: 'et',
      languageName: 'Estonian'
    },
    {
      languageCode: 'fi',
      languageName: 'Finish'
    },
    {
      languageCode: 'fr',
      languageName: 'French'
    },
    {
      languageCode: 'de',
      languageName: 'German'
    },
    {
      languageCode: 'iw',
      languageName: 'Hebrew'
    },
    {
      languageCode: 'hi',
      languageName: 'Hindi'
    },
    {
      languageCode: 'hu',
      languageName: 'Hungarian'
    },
    {
      languageCode: 'is',
      languageName: 'Icelandic'
    },
    {
      languageCode: 'id',
      languageName: 'Indonesian'
    },
    {
      languageCode: 'it',
      languageName: 'Italian'
    },
    {
      languageCode: 'ga',
      languageName: 'Irish'
    },
    {
      languageCode: 'ja',
      languageName: 'Japanese'
    },
    {
      languageCode: 'ko',
      languageName: 'Korean'
    },
    {
      languageCode: 'lv',
      languageName: 'Latvian'
    },
    {
      languageCode: 'lt',
      languageName: 'Lithuanian'
    },
    {
      languageCode: 'no',
      languageName: 'Norwegian'
    },
    {
      languageCode: 'fa',
      languageName: 'Persian'
    },
    {
      languageCode: 'pl',
      languageName: 'Polish'
    },
    {
      languageCode: 'pt',
      languageName: 'Portuguese'
    },
    {
      languageCode: 'ro',
      languageName: 'Romanian'
    },
    {
      languageCode: 'ru',
      languageName: 'Russian'
    },
    {
      languageCode: 'sr',
      languageName: 'Serbian'
    },
    {
      languageCode: 'sk',
      languageName: 'Slovak'
    },
    {
      languageCode: 'sl',
      languageName: 'Slovenian'
    },
    {
      languageCode: 'sv',
      languageName: 'Swedish'
    },
    {
      languageCode: 'th',
      languageName: 'Thai'
    },
    {
      languageCode: 'tr',
      languageName: 'Turkish'
    },
    {
      languageCode: 'uk',
      languageName: 'Ukrainian'
    },
    {
      languageCode: 'cy',
      languageName: 'Welsh'
    },
    {
      languageCode: 'zu',
      languageName: 'Zulu'
    }

  ];

  constructor(
    private transService: TanslationService,
    public events: Events
    ) { 
   
  }

  ngOnInit() {
  }

  languageChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    this.events.publish("languageChanged", event.value)
  }

}
