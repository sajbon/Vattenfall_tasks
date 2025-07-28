import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomBtnComponent } from './components/custom-btn/custom-btn.component';
import { LegendComponent } from './components/legend/legend.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ImageComponent } from './components/image/image.component';
import { NgLetDirective } from './directives/ng-let.directive';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [CommonModule, MatProgressSpinnerModule, TranslateModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],

  declarations: [
    CustomBtnComponent,
    LegendComponent,
    CarouselComponent,
    ImageComponent,
    NgLetDirective,
    LoaderComponent,
  ],
  exports: [
    CustomBtnComponent,
    LegendComponent,
    CarouselComponent,
    ImageComponent,
    NgLetDirective,
    LoaderComponent,
    TranslateModule,
  ],
})
export class SharedModule {}
