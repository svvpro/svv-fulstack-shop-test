import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {AnalyticChart} from "../shared/interfaces";
import {Subscription} from "rxjs";
import {Chart} from "chart.js";

@Component({
  selector: 'app-analytic-page',
  templateUrl: './analytic-page.component.html',
  styleUrls: ['./analytic-page.component.scss']
})
export class AnalyticPageComponent implements AfterViewInit, OnDestroy {

  pending: boolean = true;
  average: number;
  chart: AnalyticChart;
  aSub: Subscription;

  @ViewChild('gain') gainRef: ElementRef;
  @ViewChild('order') orderRef: ElementRef;

  constructor(private analyticsService: AnalyticsService) {
  }


  ngAfterViewInit(): void {
    const gainConfig: any = {
      label: 'Gain',
      color: 'rgb(255, 99, 132)'
    };

    const orderConfig: any = {
      label: 'Order',
      color: 'rgb(255, 99, 132)'
    };


    this.aSub = this.analyticsService.getAnalytics().subscribe(
      (data) => {
        this.average = data.average;

        gainConfig.labels = data.chart.map(item => item.label);
        gainConfig.data = data.chart.map(item => item.gain);
        const gainCtx = this.gainRef.nativeElement.getContext('2d');
        gainCtx.canvas.height = '50';
        new Chart(gainCtx, this.createChartConfig(gainConfig));

        orderConfig.labels = data.chart.map(item => item.label);
        orderConfig.data = data.chart.map(item => item.order);
        const orderCtx = this.orderRef.nativeElement.getContext('2d');
        orderCtx.canvas.height = '50';
        new Chart(orderCtx, this.createChartConfig(orderConfig));

        this.pending = false;
      }
    );
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  private createChartConfig({labels, data, label, color}) {
    return {
      type: 'line',
      options: {
        responsive: true
      },
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            borderColor: color,
            steppedLine: false,
            fill: false
          }
        ]
      }
    }
  }
}
