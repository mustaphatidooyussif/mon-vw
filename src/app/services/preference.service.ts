import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class PreferenceService {

  static get PREF_INITIALIZED() { return 'preferencesInitialized';}
  static get PREF_TRANSLATION_LANGUAGE() { return 'pref_translation_language';}
  static get PREF_ENABLE_TRANSLATION() { return 'pref_enable_translation';}

  _preferences = {};
  constructor(private _storageService: Storage ) { 
  
  }
  
  initializePreferences(){
    console.log('initializePreferences');
    this._storageService.get(PreferenceService.PREF_INITIALIZED).then((result) => {
      if(result == null || result == false){
        console.log('initializePreferences with default values');
        this._storageService.set(PreferenceService.PREF_INITIALIZED, true);
        this._storageService.set(PreferenceService.PREF_TRANSLATION_LANGUAGE, 'fr');
        this._storageService.set(PreferenceService.PREF_ENABLE_TRANSLATION, true);

        //initialize in memory preferences
        this._preferences[PreferenceService.PREF_TRANSLATION_LANGUAGE] = true;
        this._preferences[PreferenceService.PREF_ENABLE_TRANSLATION] = true;
      }else{
        console.log('preferences obtained from storage');
        let prefs =
          [
            PreferenceService.PREF_TRANSLATION_LANGUAGE,
            PreferenceService.PREF_TRANSLATION_LANGUAGE
          ];

        let thisRef = this;
        this._getAllPreferences(prefs).then(function(results){
            //initialize in memory preferences
            for(let i = 0; i < prefs.length; i++){
              thisRef._preferences[prefs[i]] = results[i];
            }
          }, function (err) {
            // If any of the preferences fail to read, err is the first error
            console.log(err);
          });
      }
    });
  }

  getPreference(key){
    return this._preferences[key];
  }

  setPreference(key, value){
    this._preferences[key] = value;//update pref in memory
    this._storageService.set(key, value);//update pref in db
  }

  _getAllPreferences(prefs){
    return Promise.all(prefs.map((key) => {
      return this._storageService.get(key);
    }));
  }

  _getPreference(key){
    return this._storageService.get(key);
  }

 getTranslationLanguage(){
   return this._getPreference(PreferenceService.PREF_TRANSLATION_LANGUAGE);
 }

 getEnableTranslationStatus(){
   return this._getPreference(PreferenceService.PREF_ENABLE_TRANSLATION);
 }

 getCurrentBuddy(){
  return this._storageService.get("current_buddy");
 }
}
