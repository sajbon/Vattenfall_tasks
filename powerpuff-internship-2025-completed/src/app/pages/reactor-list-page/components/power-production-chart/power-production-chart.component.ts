import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ChartService } from '../../services/chart.service';
import { Status } from '../../../../core/enums/status.enum';
import { ChartDataModel } from '../../../../core/models/reactor.model';

@Component({
  selector: 'app-power-production-chart',
  imports: [],
  templateUrl: './power-production-chart.component.html',
  styleUrl: './power-production-chart.component.scss',
})
export class PowerProductionChartComponent implements AfterViewInit {
  @Input() chartData: ChartDataModel[] | undefined = [];
  @Input() reactorId = '';
  @Input() reactorStatus = Status.inRange;
  dataForChart!: string[];
  chart: any = [];

  constructor(
    private chartService: ChartService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterViewInit() {
    this.dataForChart = this.chartService.getColorsAndLabelsForChart(this.chartData);
    this.cdr.detectChanges();

    this.chart = new Chart('powerProductionChart' + this.reactorId, {
      type: 'bar',
      data: {
        datasets: [
          {
            label: 'Power production chart',
            data: this.chartData,
            borderWidth: 1,
            backgroundColor: this.dataForChart,
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
                return tooltipItem.formattedValue + ' MW';
              },
            },
          },
          title: {
            display: true,
            text: 'Power production output',
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
