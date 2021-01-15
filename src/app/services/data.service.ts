import { Injectable } from '@angular/core';
import { of, Observable, timer, race, interval } from 'rxjs';
import { delay, concatMap, map, share, tap, mapTo, mergeMap, switchMap, shareReplay, debounceTime } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  timeMin = 200; // ms
  timeMax = 1500; // ms

  constructor() { }

  generateSensorValue$(min: number, max: number): Observable<number> {
    const value$ = timer(0, 0).pipe(
      concatMap((i: number) => of(i).pipe(
        delay(this.generateDelay(this.timeMin, this.timeMax)),
        map(_ => this.getRandomIntInclusive(min, max))
      )),
      shareReplay()
    );

    return value$;
  }

  private getRandomIntInclusive(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);;
  }

  private generateDelay(min: number, max: number): number {
    const toMax = max-min;
    const delay = min + (Math.random() * toMax);
    return delay; 
  }
}
