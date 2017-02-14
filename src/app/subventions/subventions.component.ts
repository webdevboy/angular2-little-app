import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SubventionsManagerService } from './subventions-manager.service';
import { TGrant, TFlexOptions } from '../shared/models/general.model';

@Component({
  selector: 'app-subventions',
  templateUrl: './subventions.component.html',
  styleUrls: ['./subventions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SubventionsComponent implements OnInit {
  public subventions: TGrant[] = [];
  public store: TGrant[] = [];
  public selectedChild: TGrant;
  public tableOptions: TFlexOptions;
  public loading: boolean = true;
  constructor(private subventionsManager: SubventionsManagerService) {
    this.tableOptions = {
      tooltips: [
        {
          value: 'name',
          caption: 'Child Name',
          className: 'child-name',
          sortTransform: (name: string) => name.toLowerCase()
        },
        {
          value: 'startDate',
          caption: 'Start Date',
          className: 'start-date'
        },
        {
          value: 'status',
          caption: 'Status',
          className: 'status',
          sortTransform: (status: boolean) => !status // Revert results for Status
        },
        {
          value: 'days',
          caption: 'Days In Attendance',
          className: 'attendance',
          sortTransform: (days: string[]) => days.length
        }
      ]
    }
    this.subventionsManager.store$.subscribe(grants => {
      this.subventions = [...grants];
      this.store = [...grants];
      this.loading = false;
    }, e => {
      this.loading = false;
      console.error(e);
    });
  }

  ngOnInit() {
    this.subventionsManager.getChildren().subscribe(grants => {
      this.subventions = [...grants];
    });
  }

  handleFilter(filterValue: string) {
    let filter = filterValue.toLowerCase();
    this.subventions = this.store.filter((grant: TGrant) => {
      let name = grant.name.toLowerCase();
      return name.indexOf(filter) !== -1;
    });
  }


}
