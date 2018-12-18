import { Injectable } from '@angular/core';
import domtoimage from 'dom-to-image';

@Injectable({
  providedIn: 'root'
})
export class PrintingService {

  constructor() { }

  print() {
    var node = document.getElementById('rcorners2');

    domtoimage.toPng(node)
    .then(function (dataUrl) {
        var popup=window.open();
          popup.document.write('<img src=' + dataUrl + '>');
          popup.document.close();
          popup.focus();
          popup.print();
          popup.close();
    })
    .catch(function (error) {
        console.error('oops, something went wrong!', error);
    });
  }
}
