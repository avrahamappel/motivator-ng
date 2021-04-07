import { Injectable } from '@angular/core';
import moment, { Moment } from 'moment';
import { Observable, interval, of } from 'rxjs';
import { map, mapTo } from 'rxjs/operators';

interface Log {
  start: Moment;
  end?: Moment;
}

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private logs: Log[] = []

  constructor() { }

  // todo don't start if one's already running
  public startTimer() {
    this.logs.unshift({ start: moment() });
  }

  public stopTimer() {
    this.logs[0].end = moment();
  }

  public getLogs(): Observable<Log[]> {
    return interval(1000).pipe(mapTo(this.logs))
  }

  public getTime() {
    return this.getLogs().pipe(map(
      logs => logs.reduce((acc, log) => acc + this.diffInMinutesFloat(log.start, log.end || moment()), 0)
    ))
  }

  protected diffInMinutesFloat(start: Moment, end: Moment): number {
    return Math.abs(start.diff(end, 'seconds')) / (60 * 60);
  }
}
