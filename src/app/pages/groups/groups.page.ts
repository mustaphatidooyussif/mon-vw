import { Component, OnInit} from '@angular/core';
import { IonicSelectableComponent } from 'ionic-selectable';
import { Events } from '@ionic/angular'
import { PreferenceService } from './../../services/preference.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.page.html',
  styleUrls: ['./groups.page.scss'],
})
export class GroupsPage implements OnInit {
  /**
   * Thid page is converted to settings page.
   */

  lang: any;
  enableTranslation: any;
  language;
  languages = [
    {
      languageCode: 'en',
      languageName: 'English'
    },
    {
      languageCode: 'fr',
      languageName: 'French'
    },
    {
      languageCode: 'zu',
      languageName: 'Zulu'
    },
    {
      languageCode: 'af',
      languageName: 'afrikaans'
    },
    {
      languageCode: 'ha',
      languageName: 'hausa'
    },
    {
      languageCode: 'ig',
      languageName: 'igbo'
    },
    {
      languageCode: 'sn',
      languageName: 'shona'
    },
    {
      languageCode: 'su',
      languageName: 'sundanese'
    },
    {
      languageCode: 'sw',
      languageName: 'swahili'
    },
    {
      languageCode: 'so',
      languageName: 'somali'
    }
  ];

  preferences = {};
  PREF_TRANSLATION_LANGUAGE;
  PREF_ENABLE_TRANSLATION;
  constructor(
    public events: Events,
    private  preferencesService: PreferenceService
    ) { 
      this.PREF_TRANSLATION_LANGUAGE = PreferenceService.PREF_TRANSLATION_LANGUAGE;
      this.PREF_ENABLE_TRANSLATION = PreferenceService.PREF_ENABLE_TRANSLATION;
  }

  ngOnInit() {
  }

  languageChange(event: {
    component: IonicSelectableComponent,
    value: any 
  }) {
    this.events.publish("languageChanged", event.value)
  }

  ionViewWillEnter(){
    this.preferences[PreferenceService.PREF_TRANSLATION_LANGUAGE]
      = this.preferencesService.getPreference(PreferenceService.PREF_TRANSLATION_LANGUAGE);
    this.preferences[PreferenceService.PREF_ENABLE_TRANSLATION]
      = this.preferencesService.getPreference(PreferenceService.PREF_ENABLE_TRANSLATION);
  }

  changeRadioPreference(event, key){
    this.preferencesService.setPreference(key, event.detail.checked);
  }

  changeSelectPreference(event, key){
    // console.log(event.detail.checked);
    this.preferencesService.setPreference(key, event.detail.value);
  }

}
