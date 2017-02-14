import { Component, OnInit, OnDestroy, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import {  MdlSnackbarService, MdlDialogOutletService } from 'angular2-mdl';
import { ChildrenManagerService } from '../../shared/children-manager.service';
import { RoomsManagerService } from '../../shared/rooms-manager.service';
import { Child } from '../../shared/models/child.model';
import { TFlexOptions } from '../../shared/models/general.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-centre-children',
  templateUrl: './centre-children.component.html',
  styleUrls: ['./centre-children.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CentreChildrenComponent implements OnInit, OnDestroy {

  public children: Child[] = [];
  public pureStore: Child[] = [];
  public rooms: any[];
  public showModal: boolean = false;
  public selectedChild: Child;
  public deleteMessage: string;
  public confirmDelete: any;
  public loading: boolean = true;
  public tableOptions: TFlexOptions;
  private sub: Subscription;
  constructor(
    public childrenManager: ChildrenManagerService,
    public roomManager: RoomsManagerService,
    private mdlSnackbarService: MdlSnackbarService,
    private mdlDialogOutletService: MdlDialogOutletService,
    private vcr: ViewContainerRef
  ) {

    this.mdlDialogOutletService.setDefaultViewContainerRef(this.vcr);

    this.tableOptions = {
      tooltips: [
        {
          value: '',
          className: 'avatar-col',
          inactive: true
        },
        {
          value: 'name',
          caption: 'Child Name',
          className: 'name-col',
          sortTransform: (name) => name && name.toLowerCase()
        },
        {
          value: 'room',
          caption: 'Room',
          sortTransform: (name) => name && name.toLowerCase()
        },
        {
          value: 'Remove',
          inactive: true
        }
      ]
    }

    const children$ = this.childrenManager.store$.subscribe(children => {
      this.children = children;
      this.pureStore = [...children];
      this.loading = false;
    }, e => {
      this.loading = false;
      console.error(e);
    });
    const rooms$ = this.roomManager.store$.subscribe(rooms => {
      this.rooms = rooms;
    });
    this.sub = children$;
    this.sub.add(rooms$);
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  modalClosed(message?: string) {
    this.showModal = false;
    this.selectedChild = null;
    if(message) {
      this.mdlSnackbarService.showToast(message);
    }
  }

  editChild(child) {
    this.selectedChild = child;
    this.showModal = true;
  }

  addChild() {
    this.selectedChild = null;
    this.showModal = true;
  }

  deleteChild(event, child: Child) {
    event.stopPropagation();
    this.deleteMessage = 'Are you sure you want to delete the room "' + child.name + '" ?';
    this.confirmDelete = child;
  }

  confirmDeleteChild(confirm: boolean) {
    if (confirm === true) {
      this.childrenManager.removeChild(this.confirmDelete);
    }
    this.confirmDelete = null;
  }


  handleFilter(filter: string) {
    let filterValue = filter.toLowerCase();
    this.children = this.pureStore.filter(child => {
      let childName = child.name.toLowerCase();
      return childName.indexOf(filterValue) !== -1;
    });
  }

}
