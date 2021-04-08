import { Component, OnInit } from '@angular/core';
import { LogService } from '../log.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  buttonText: 'Start' | 'Stop' = 'Start';

  constructor(public logs: LogService) {
    this.logs.isRunning$.subscribe(r => r ? this.buttonText = 'Stop' : this.buttonText = 'Start')
  }

  ngOnInit(): void {
  }

  public toggleTimer() {
    this.logs.isRunning
      ? this.logs.stopTimer()
      : this.logs.startTimer();
  }
}
