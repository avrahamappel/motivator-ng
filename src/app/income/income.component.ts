import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment, { MomentInput } from 'moment';

import { LogService } from '../log.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css']
})
export class IncomeComponent implements OnInit {
  @Input() wage: number

  moneyMade$: Observable<string>;

  constructor(public logs: LogService) {
    this.moneyMade$ = this.logs.getTime$().pipe(
      map(t => '$' + (t * this.wage).toFixed(2))
    );
  }

  ngOnInit(): void {
    this.moneyMade$.subscribe(m => document.title = m)
  }
}
