import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/core/services/service-authentication/authentication.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationsService } from '../../services/translation-service/translations.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {
  lang!: string | null;
  currentLang!: string;
  constructor(private authService: AuthenticationService,
  public translate: TranslationsService,
  public ngxTranslate: TranslateService) { }

  logout() {
    this.authService.logout()
  }
  onLangChange() {
    console.log("arabic")
    this.lang = localStorage.getItem('currentLng');
    if (this.lang == 'ar') {
      this.translate.useLanguage('en');
      this.currentLang = 'En';
    } else {
      this.translate.useLanguage('ar');
      this.currentLang = 'Ar';
    }
  }
}
