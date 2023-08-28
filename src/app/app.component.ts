import { Component } from '@angular/core';
import { TranslationsService } from './shared/services/translation-service/translations.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'my-angular-app';
  constructor(public translate: TranslationsService,public ngxTranslate:TranslateService){}
}
