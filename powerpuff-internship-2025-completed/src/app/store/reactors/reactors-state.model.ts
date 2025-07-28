import { SafetyStatusModel } from '../../core/models/safetyStatus.model';
import { ReactorModel } from '../../core/models/reactor.model';
import { ImageModel } from '../../core/models/image.model';

export interface ReactorsStateModel {
  reactors: ReactorModel[];
  reactorsSafetyStatus?: SafetyStatusModel;
  reactorsImages: ImageModel[];

  loadingReactors: boolean;
  loadingSafetyStatus: boolean;
  loadingReactorsImages: boolean;

  errorReactors: boolean;
  errorSafetyStatus: boolean;
  errorReactorsImages: boolean;
  errorLocationImage: boolean;
}
