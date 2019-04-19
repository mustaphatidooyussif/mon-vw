import { Injectable } from '@angular/core';
import {Http}  from     '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TanslationService {
  data: string;

  constructor(private http: Http) { }

  translate(sourceText, sourceLangCode, targetLangCode){
    var url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" 
    + sourceLangCode + "&tl=" + targetLangCode + "&dt=t&q=" + encodeURI(sourceText);
    this.http.get(url).subscribe(data =>{
      this.data = data.json()[0][0][0];
      console.log("this.data", data)
      return this.data;
    })
  }
}
