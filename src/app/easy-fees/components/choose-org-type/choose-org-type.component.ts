import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-choose-org-type',
  templateUrl: './choose-org-type.component.html',
  styleUrls: ['./choose-org-type.component.scss']
})
export class ChooseOrgTypeComponent implements OnInit {
  @Output('closeModal') closeModal = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {

  }

  setOrgType(key: string) {
    this.closeModal.emit(key);
  }

}
