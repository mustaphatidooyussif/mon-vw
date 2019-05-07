import { Injectable } from '@angular/core';
import {Http}  from     '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class TanslationService {
  data: string;

  constructor(private http: Http) { }

  translate(translateTo, text, translateFrom = 'auto') {
    return new Promise((resolve, reject) => {
        const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl="
            + translateFrom + "&tl=" + translateTo + "&dt=t&q=" + encodeURI(text);

        fetch(url).then(response => {
            response.json().then(data => {
                resolve(data[0][0][0])
            }, reject)
        }, reject)
    });
}
}
