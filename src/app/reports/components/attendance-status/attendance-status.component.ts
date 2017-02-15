import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-attendance-status',
  templateUrl: './attendance-status.component.html',
  styleUrls: ['./attendance-status.component.scss']
})
export class AttendanceStatusComponent implements OnInit {
  @Input() record:any;
  @Input() inactive;
  constructor() { }

  ngOnInit() {
  }
}
