import {Component, OnInit, Signal} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';

import {ImageModel} from '../../core/models/image.model';
import {ImageType} from '../../core/enums/imageType.enum';
import {ButtonType} from '../../core/enums/buttonType.enum';
import {NgxsModule, Store} from '@ngxs/store';
import {
  FetchReactorsAction,
  FetchReactorsImagesAction,
  FetchSafetyStatusAction,
  ReactorsState,
} from '../../store/reactors';
import {SafetyStatusModel} from '../../core/models/safetyStatus.model';
import {Observable} from 'rxjs';
import {CommonModule} from '@angular/common';
import {Status} from '../../core/enums/status.enum';

@Component({
  selector: 'app-welcome-page',
  imports: [SharedModule, CommonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {
  ImageType = ImageType;
  ButtonType = ButtonType;
  Status = Status;

  safetyStatus$: Observable<SafetyStatusModel | void> = this.store.select(
    ReactorsState.getReactorsSafetyStatus
  );
//location image
  reactorList$: Observable<ImageModel[]> = this.store.select(
    ReactorsState.getReactorsImageList
  );

  safetyStatusLoading$: Observable<boolean> = this.store.select(
    ReactorsState.loadingSafetyStatus
  );
//location image loading
  reactorListLoading$: Observable<boolean> = this.store.select(
    ReactorsState.loadingReactorsImages
  );

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new FetchSafetyStatusAction());
    this.store.dispatch(new FetchReactorsImagesAction());
    // Fetch the location image
  }
}
