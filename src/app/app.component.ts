import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, concat, forkJoin, iif, interval, merge, Observable, of, race, timer, zip, } from 'rxjs';
import { auditTime, combineAll, concatAll, concatMap, debounceTime, first, map, mapTo, mergeAll, mergeMap, takeUntil, throttleTime, withLatestFrom } from 'rxjs/operators';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AppComponent implements OnInit{
  generartorA$: Observable<number>;
  generartorB$: Observable<number>;
  generartorC$: Observable<number>;
  generartorD$: Observable<number>;

  viewObject$: Observable<[number, number, number, number]>;

  sensorA: number;
  sensorB: number;
  sensorC: number;
  sensorD: number;

  RENDER_TIME = 200; // ms

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.generartorA$ = this.dataService.generateSensorValue$(-100, -50);   // sensor A range [-100 .. -50];
    this.generartorB$ = this.dataService.generateSensorValue$(0, 10);       // sensor B range [0 .. 10];
    this.generartorC$ = this.dataService.generateSensorValue$(100, 1000);   // sensor C range [100 .. 1000];
    this.generartorD$ = this.dataService.generateSensorValue$(1001, 10000); // sensor D range [1001 .. 10000];

    this.viewObject$ = combineLatest([
      this.generartorA$,
      this.generartorB$,
      this.generartorC$,
      this.generartorD$
    ]).pipe(throttleTime(this.RENDER_TIME));

    this.viewObject$.subscribe(([sensorA, sensorB, sensorC, sensorD]) => {
      this.sensorA = sensorA;
      this.sensorB = sensorB;
      this.sensorC = sensorC;
      this.sensorD = sensorD;
    });
  }
}
