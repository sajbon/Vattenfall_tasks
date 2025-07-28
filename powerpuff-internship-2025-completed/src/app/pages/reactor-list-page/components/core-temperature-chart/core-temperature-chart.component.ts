import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Chart, ScriptableLineSegmentContext } from 'chart.js/auto';
import { ChartService } from '../../services/chart.service';
import { Status } from '../../../../core/enums/status.enum';
import { ChartDataModel } from '../../../../core/models/reactor.model';

@Component({
  selector: 'app-core-temperature-chart',
  imports: [],
  templateUrl: './core-temperature-chart.component.html',
  styleUrl: './core-temperature-chart.component.scss',
})
export class CoreTemperatureChartComponent implements AfterViewInit {
  @Input() chartData: ChartDataModel[] | undefined;
  @Input() reactorId = '';
  @Input() reactorStatus = Status.inRange;
  chart: any = [];
  dataForChart!: string[];

  constructor(
    private chartService: ChartService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    const ctx = 'core-temperature-chart' + this.reactorId;
    this.dataForChart = this.chartService.getColorsAndLabelsForChart(this.chartData);
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Core temperature chart',
            data: this.chartData,
            pointBackgroundColor: this.dataForChart,
            pointBorderColor: this.dataForChart,
            borderColor: this.dataForChart,
            backgroundColor: this.dataForChart,
            fill: false,
            tension: 0.2,
            segment: {
              backgroundColor: ctx => getSegmentColor(ctx, this.dataForChart),
              borderColor: ctx => getSegmentColor(ctx, this.dataForChart),
            },
          },
        ],
      },
      options: {
        layout: {
          padding: 20,
        },
        maintainAspectRatio: false,
        parsing: {
          xAxisKey: 'time',
          yAxisKey: 'value',
        },
        scales: {
          x: {
            ticks: {
              color: '#000000',

              font: { family: 'Vattenfall Hall', size: 14 },
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              color: '#000000',

              font: { family: 'Vattenfall Hall', size: 14 },
            },
          },
        },
        plugins: {
          tooltip: {
            backgroundColor: '#2071b5',
            titleAlign: 'center',
            bodyAlign: 'center',
            xAlign: 'center',
            yAlign: 'bottom',
            padding: 8,
            boxPadding: 3,
            callbacks: {
              title: function (tooltipItem) {
                return '';
              },
              label: function (tooltipItem) {
                return tooltipItem.formattedValue + ' ºC';
              },
            },
            footerFont: {
              family: 'Vattenfall Hall',
            },
          },
          title: {
            display: true,
            text: 'Core temperature',
            color: '#000000',
            align: 'start',
            padding: {
              bottom: 20,
            },
            font: {
              size: 17,
              weight: 'bold',
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });

    this.cdr.detectChanges();
  }
}
function getSegmentColor(ctx: ScriptableLineSegmentContext, dataForChart: string[]): any {
  let point = ctx.p1;
  return dataForChart[point.parsed.x - 1];
}
