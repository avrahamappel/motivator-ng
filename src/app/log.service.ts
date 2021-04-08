import { Injectable } from '@angular/core';
import moment, { Moment } from 'moment';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

interface Log {
  start: Moment;
  end?: Moment;
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logs: Log[] = [];
  private logs$: BehaviorSubject<Log[]>;
  public isRunning$: Observable<boolean>;
  public isRunning = false;

  constructor() {
    this.logs$ = new BehaviorSubject(this.logs.splice(0));
    this.isRunning$ = this.logs$.pipe(map(this.isRunningPred));

    this.logs$.subscribe(ls => this.logs = ls);
    this.logs$.subscribe(ls => console.log(JSON.stringify(ls)));
    this.isRunning$.subscribe(r => this.isRunning = r);
    this.isRunning$.subscribe(r => console.log(`running: ${r} ${this.isRunning}`))
  }

  public startTimer() {
    if (this.isRunning) return;

    this.logs$.next([{ start: moment() }].concat(this.logs));
  }

  public stopTimer() {
    if (!this.isRunning) return;

    console.log(JSON.stringify(this.logs))

    const logs = this.logs$.getValue();
    logs[0].end = moment();
    this.logs$.next(logs);
  }

  public getLogs$(): Observable<Log[]> {
    return this.logs$;
  }

  public getTime$() {
    return interval(1000).pipe(
      map(() =>
        this.logs.reduce((acc, log) => acc + this.diffInMinutesFloat(log.start, log.end || moment()), 0)
      )
    );
  }

  private diffInMinutesFloat(start: Moment, end: Moment): number {
    return Math.abs(start.diff(end, 'seconds')) / (60 * 60);
  }

  private isRunningPred(logs: Log[]) {
    return logs.some(log => !log.end);
  }
}
