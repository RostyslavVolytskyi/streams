import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor-display',
  templateUrl: './sensor-display.component.html',
  styleUrls: ['./sensor-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SensorDisplayComponent implements OnInit {

  @Input() value: number;
  @Input() sensorName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
