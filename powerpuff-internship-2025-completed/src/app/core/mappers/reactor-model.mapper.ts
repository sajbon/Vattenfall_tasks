import { Status } from '../enums/status.enum';
import {
  ChartDataModel,
  ChartDataModelDTO,
  ReactorModel,
  ReactorModelDTO,
  ReactorStatus,
  ReactorStatusDTO,
} from '../models/reactor.model';

export function toReactorModel(source: ReactorModelDTO[]): ReactorModel[] {
  return source.map((reactor) => {
    return {
      id: reactor.id,
      name: reactor.name,
      description: reactor.description,
      links: reactor.links,
      status: toReactorStatusModel(reactor.status),
      reactorPowerProduction: toReactorChartDataModel(
        reactor.reactorPowerProduction
      ),
      reactorCoreTemperature: toReactorChartDataModel(
        reactor.reactorCoreTemperature
      ),
    };
  }) as ReactorModel[];
}

function toReactorStatusModel(source: ReactorStatusDTO): ReactorStatus {
  return {
    coreTempStatus: source.coreTempStatus
      ? (source.coreTempStatus as Status)
      : Status.inRange,
    powerProdStatus: source.powerProdStatus
      ? (source.powerProdStatus as Status)
      : Status.inRange,
  };
}

function toReactorChartDataModel(
  source?: ChartDataModelDTO[]
): ChartDataModel[] | void {
  if (source) {
    if (source.length > 24) {
      source.shift();
    }
    return source.map((data) => {
      return {
        ...data,
        time: formatDate(data.time),
        status: data.status ? (data.status as Status) : Status.inRange,
      };
    });
  }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);

  return date.getHours().toString();
}
