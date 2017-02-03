import {
  Component, OnInit, OnChanges,
  Input, Output, EventEmitter,
  SimpleChanges
} from '@angular/core';
import { SubventionsManagerService } from '../../subventions-manager.service';
import { ReportsManagerService } from '../../../shared/reports-manager.service';
import { TGrant } from '../../../shared/models/general.model';
import * as moment from 'moment';

// TODO: Add TGrant to child Input when awesome-typescript-loader issue #2977 is merged

@Component({
  selector: 'app-ecce-modal',
  templateUrl: './ecce-modal.component.html',
  styleUrls: ['./ecce-modal.component.scss']
})
export class EcceModalComponent implements OnInit, OnChanges {
  @Input() public child: any;
  @Output('closeModal') public closeModal = new EventEmitter();
  public pageModel: TGrant;
  public step: number = 0;
  public errorMessage: string;
  public saving: boolean = false;

  constructor(
    public subventionsManager: SubventionsManagerService,
    public reportsManager: ReportsManagerService
  ) {

    this.pageModel = {
      id: null,
      name: '',
      room: null,
      roomId: null,
      annualModel: '',
      days: [],
      status: true,
      monthly: true,
      capitation: 'low',
      normalFee: 0,
      extras: {
        meals: 0,
        hours: 0,
        trips: 0,
        other: 0,
        voluntary: 0
      },
      startDate: 0
    }
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    let child = changes['child'];
    if(child && child.currentValue) {
      this.resetModel(child.currentValue);
    }
  }

  calculateDailyRate(capitation: string): number {
    const model = +this.pageModel.annualModel;
    if(!model) {
      return 0;
    }
    const HIGH_CAPITATION = 2850;
    const LOW_CAPITATION = 2451;
    const daysInWeek = model === 41 ? 4 : 5;
    const capitationValue =
      capitation === 'low'
      ? LOW_CAPITATION
      : HIGH_CAPITATION;

    return capitationValue / (model * daysInWeek);
  }

  get modelFactor(): number {
    let model = +this.pageModel.annualModel || 0;
    let modelFactor =
      model === 38 || model === 41
      ? model / 10
      : model / 12;

    return modelFactor;
  }

  get reducedFee(): number {
    let modelFactor = this.pageModel.monthly ? this.modelFactor : 1;
    let reducedNormal = this.pageModel.normalFee - modelFactor*this.weeklyTotal;
    let ecceTotal =
      Math.max(reducedNormal, 0) + modelFactor * this.weeklyTotalExtras;

    return ecceTotal;
  }

  get weeklyTotal(): number {
    let days = this.pageModel.days.length;
    let rate = this.calculateDailyRate(this.pageModel.capitation);
    return days * rate;
  }

  get weeklyTotalExtras(): number {
    let extras = this.pageModel.extras;
    let keys = Object.keys(extras);
    let extrasValue = keys.reduce((prev, curr) => {
      return prev + Number(extras[curr]);
    }, 0);
    return extrasValue;
  }

  toggleStatus() {
    this.pageModel.status = !this.pageModel.status;
  }

  resetModel(child: any) {
    this.pageModel = Object.assign({}, child, {
      annualModel: child.annualModel || '38',
      startDate: child.startDate || moment().month('September').date(1).format('x'),
      extras: Object.assign({}, child.extras),
      days: [...child.days]
    });


    this.step = 0;
    this.errorMessage = '';
  }

  handleDays(days: string[]) {
    if(this.pageModel.annualModel === '41' && days.length === 5) {
      this.errorMessage = 'Maximum days for 41 weeks model is 4';
    } else {
      this.errorMessage = '';
    }
    this.pageModel.days = [...days];
  }

  handleAnnualModel(modelList: string[]) {
    let model = modelList[0];
    if(model === '41' && this.pageModel.days.length === 5) {
      this.errorMessage = 'Maximum days for 41 weeks model is 4';
    } else {
      this.errorMessage = '';
    }
    this.pageModel.annualModel = model;
  }

  get date() {
    return this.pageModel.startDate
          ? moment.unix(this.pageModel.startDate/1000).format('Do MMMM YYYY')
          : null;
  }

  set date(value) {
    this.pageModel.startDate = +moment(value).format('x');
  }

  dismiss() {
    this.closeModal.emit();
  }

  isDisabled(): boolean {
    return !!this.errorMessage
        || !this.pageModel.startDate
        || !this.pageModel.days.length;
  }

  saveChanges() {
    this.saving = true;
    this.subventionsManager.updateChildDetails(this.pageModel).toPromise().then(
      res => {
        this.saving = false;
        this.reportsManager.resetReports();
        this.closeModal.emit();
      },
      error => console.error(error)
    );
  }

}
