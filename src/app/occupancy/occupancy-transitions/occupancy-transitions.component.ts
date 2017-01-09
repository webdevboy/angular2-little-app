import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-occupancy-transitions',
  templateUrl: './occupancy-transitions.component.html',
  styleUrls: ['./occupancy-transitions.component.scss', '../occupancy.component.scss']
})
export class OccupancyTransitionsComponent implements OnInit {
  datelist: any[] = [];
  selectedDate: string;
  constructor() { 
    this.datelist = [
      {id:"1", name:"JAN 17", selected:true},
      {id:"2", name:"FEB 17", selected:false},
      {id:"3", name:"MAR 17", selected:false},
      {id:"4", name:"APR 17", selected:false},
      {id:"5", name:"MAY 17", selected:false},
      {id:"6", name:"JUN 17", selected:false},
      {id:"7", name:"JUL 17", selected:false},
      {id:"8", name:"AUG 17", selected:false},
      {id:"9", name:"SEP 17", selected:false}
    ]
  }

  ngOnInit() {
    this.selectedDate = "JAN 17";
  }

  selectDateTab(id: number){
    this.datelist.forEach(data => {
      data.selected = false;
      if( data.id == id ){
        this.selectedDate = data.name;
        data.selected = true;
      }
    });
  }

}
