import { Injectable } from '@angular/core';
import { State, Action, Selector, StateContext } from '@ngxs/store';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ReactorsStateModel } from './reactors-state.model';

import { ReactorStatusService } from '../../core/services/reactor-status.service';
import { ReactorModel } from '../../core/models/reactor.model';
import {
  FetchReactorsAction,
  FetchReactorsImagesAction,
  FetchSafetyStatusAction,
} from './reactors.actions';
import { SafetyStatusModel } from '../../core/models/safetyStatus.model';
import { ImageModel } from '../../core/models/image.model';

@State<ReactorsStateModel>({
  name: 'reactors',
  defaults: {
    reactors: [],
    reactorsImages: [],
    reactorsSafetyStatus: undefined,
    loadingReactors: false,
    loadingReactorsImages: false,
    loadingSafetyStatus: false,
    errorLocationImage: false,
    errorReactors: false,
    errorReactorsImages: false,
    errorSafetyStatus: false,
  },
})
@Injectable()
export class ReactorsState {
  constructor(private serviceReactors: ReactorStatusService) {}

  @Selector()
  static getReactors(state: ReactorsStateModel): ReactorModel[] {
    return state.reactors;
  }

  @Selector()
  static getReactorsSafetyStatus(
    state: ReactorsStateModel
  ): SafetyStatusModel | void {
    return state.reactorsSafetyStatus;
  }



  @Selector()
  static getReactorsImageList(state: ReactorsStateModel): ImageModel[] {
    return state.reactorsImages;
  }

  @Selector()
  static loadingReactors(state: ReactorsStateModel): boolean {
    return state.loadingReactors;
  }

  @Selector()
  static loadingReactorsImages(state: ReactorsStateModel): boolean {
    return state.loadingReactorsImages;
  }

  @Selector()
  static loadingSafetyStatus(state: ReactorsStateModel): boolean {
    return state.loadingSafetyStatus;
  }

  @Selector()
  static errorLocationImage(state: ReactorsStateModel): boolean {
    return state.errorLocationImage;
  }

  @Selector()
  static errorReactors(state: ReactorsStateModel): boolean {
    return state.errorReactors;
  }

  @Selector()
  static errorReactorsImages(state: ReactorsStateModel): boolean {
    return state.errorReactorsImages;
  }

  @Selector()
  static errorSafetyStatus(state: ReactorsStateModel): boolean {
    return state.errorSafetyStatus;
  }

  @Action(FetchReactorsAction)
  fetchReactors(
    ctx: StateContext<ReactorsStateModel>
  ): Observable<ReactorsStateModel> | Observable<void> {
    ctx.patchState({ loadingReactors: true });

    return this.serviceReactors.getReactors().pipe(
      map((response) => {
        console.log('Reactors fetched:', response);
        return ctx.patchState({ reactors: response, loadingReactors: false });
      }),
      catchError((err) =>
        of(ctx.patchState({ errorReactors: true, loadingReactors: false }))
      )
    );
  }

  @Action(FetchSafetyStatusAction)
  fetchReactorsSafetyStatus(
    ctx: StateContext<ReactorsStateModel>
  ): Observable<ReactorsStateModel> | Observable<void> {
    ctx.patchState({ loadingSafetyStatus: true });

    return this.serviceReactors.getReactorsSafetyStatus().pipe(
      map((response) => {
        return ctx.patchState({
          reactorsSafetyStatus: response,
          loadingSafetyStatus: false,
        });
      }),
      catchError((err) =>
        of(
          ctx.patchState({
            errorSafetyStatus: true,
            loadingSafetyStatus: false,
          })
        )
      )
    );
  }

  @Action(FetchReactorsImagesAction)
  fetchReactorsImages(
    ctx: StateContext<ReactorsStateModel>
  ): Observable<ReactorsStateModel> | Observable<void> {
    ctx.patchState({ loadingReactorsImages: true });

    return this.serviceReactors.getReactorImagesList().pipe(
      map((response) => {
        return ctx.patchState({
          reactorsImages: response,
          loadingReactorsImages: false,
        });
      }),
      catchError((err) =>
        of(
          ctx.patchState({
            errorReactorsImages: true,
            loadingReactorsImages: false,
          })
        )
      )
    );
  }

}
