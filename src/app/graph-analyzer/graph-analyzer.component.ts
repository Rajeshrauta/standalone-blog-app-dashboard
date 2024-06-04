import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import * as Highcharts from 'highcharts';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-graph-analyzer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './graph-analyzer.component.html',
  styleUrl: './graph-analyzer.component.css'
})
export class GraphAnalyzerComponent implements OnInit, OnDestroy {

  public loading = true;
  private destroy$ = new Subject<void>();

  constructor(private postService: PostsService) { }

  ngOnInit(): void {
    this.createPieChart();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  createPieChart() {

    this.loading = true;
    this.postService.loadData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => {

        console.log(val);
        let dataPost = [];
        //-------------
        for (let index = 0; index < val.length; index++) {
          const element: any = val[index].data;
          const categoryId = element.category.categoryId;
          const categoryName = element.category.category;

          var dataPostIndex = dataPost.findIndex(x => x.categoryId == categoryId);
          if (dataPostIndex == -1) {
            dataPost.push({ categoryId: categoryId, category: categoryName, count: 1 });
          }
          else {
            dataPost[dataPostIndex].count = dataPost[dataPostIndex].count + 1;
          }
        }
        this.loading = false;

        setTimeout(() => {
          //-------------
          const chart = Highcharts.chart('chart-pie', {
            chart: {
              type: 'pie',
            },
            title: {
              text: 'Analyze Category/Post',
            },
            credits: {
              enabled: false,
            },
            tooltip: {
              headerFormat: `<span class="mb-2">Category: {point.key}</span><br>`,
              pointFormat: '<span>Post(s): {point.y}</span>',
              useHTML: true,
            },
            series: [{
              name: 'Analyze Category/Post',
              innerSize: '50%',
              colorByPoint: true,
              data: dataPost.map(item => ({ name: item.category, y: item.count }))
            }],
            accessibility: {
              enabled: false // Disable accessibility features
            }
          } as any);

        }, 100);

      }, () => {
        this.loading = false;
      });

  }

}
