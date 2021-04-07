import { Component, OnInit } from '@angular/core';
import { LogService } from '../log.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  constructor(private logs: LogService) { }

  ngOnInit(): void {
  }

  public startTimer() {
    this.logs.startTimer();
  }

  public stopTimer() {
    this.logs.stopTimer();
  }
}
