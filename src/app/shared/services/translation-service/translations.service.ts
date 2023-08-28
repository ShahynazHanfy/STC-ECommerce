import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn:"root"
})
export class TranslationsService {

  currentLang = 'en';
  onChangeObservable = new Subject();
  htmlTag: HTMLHtmlElement;
  constructor(
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.htmlTag = this.document.getElementsByTagName(
      'html'
    )[0] as HTMLHtmlElement;
    let savedLang = localStorage.getItem('currentLng');
    if (savedLang) {
      this.currentLang = savedLang;
    } else {
      this.currentLang = 'en';
      localStorage.setItem('currentLng', 'en');
    }
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang(this.currentLang);
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.useLanguage(this.currentLang);
  }

  useLanguage(currentLang:string) {
    console.log("currentLang",currentLang)
    if (this.currentLang != currentLang) {
      this.onChangeObservable.next(currentLang);
    }
    this.currentLang = currentLang;
    localStorage.setItem('currentLng', currentLang);
    if (currentLang === 'en') {
      localStorage.setItem('dir', 'ltr');
      this.htmlTag.lang = this.currentLang;
      this.htmlTag.dir = 'ltr';
    } else if (currentLang === 'ar') {
      localStorage.setItem('dir', 'rtl');
      this.htmlTag.lang = this.currentLang;
      this.htmlTag.dir = 'rtl';
    }
    return this.translate.use(currentLang);
  }

  returnTranslateKey(key: any) {
    let val;
    let KeyValue = key.toUpperCase();
    let removeWhiteSpace = KeyValue.includes(' ')
      ? KeyValue.replace(/\s/g, '_')
      : KeyValue;
    this.translate.get(removeWhiteSpace).subscribe((res) => {
      val = res;
    });
    return val;
  }

}
