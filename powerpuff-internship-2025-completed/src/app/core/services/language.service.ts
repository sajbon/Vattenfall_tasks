import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import en from '../../../assets/i18n/en.json';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly defaultLanguage = 'en';

  private currentLanguage = this.defaultLanguage;
  private allLanguages: string[] = ['en'];

  constructor(private translateService: TranslateService) {
    this.initializeTranslations();
  }

  initializeTranslations(): void {
    this.translateService.setDefaultLang(this.defaultLanguage);
    this.translateService.use(this.currentLanguage);
    this.translateService.setTranslation(this.currentLanguage, en);
  }

  translate<T extends boolean>(
    key: string | string[],
    instant: T
  ): T extends true ? any : Observable<any> {
    return instant
      ? this.translateService.instant(key)
      : this.translateService.get(key);
  }
}
