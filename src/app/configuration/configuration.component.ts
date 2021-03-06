import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  constructor() { }

  @Input() userType: string | any;
  currentFunctionality = 'showTable';

  dtOptions: DataTables.Settings = {};

  // tslint:disable-next-line:typedef
  developmentMode = 'demo';
  // tslint:disable-next-line:typedef
  configurationsList: any;

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  changeFunctionality( functionality: string ){
    this.currentFunctionality = functionality;
  }

  // tslint:disable-next-line:typedef
  hideModule(){
    // @ts-ignore
    setTimeout( () => document.querySelector('.configuration').classList.remove('select') , 0);
  }
  // tslint:disable-next-line:typedef
  showModule(){
    // @ts-ignore
    setTimeout( () => document.querySelector('.configuration').classList.add('select') , 0);
  }

}
