import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-jacket',
  templateUrl: './jacket.component.html',
  styleUrls: ['./jacket.component.scss']
})
export class JacketComponent implements OnInit {
  constructor() { }

  @Input() userType: string | any;
  currentFunctionality = 'showTable';
  dtOptions: DataTables.Settings = {};

  // tslint:disable-next-line:typedef
  developmentMode = 'demo';

  // tslint:disable-next-line:typedef
  jacketsList: any[] | undefined;

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  changeFunctionality( functionality: string ){
    this.currentFunctionality = functionality;
  }

  // tslint:disable-next-line:typedef
  hideModule(){
    console.log('Hide Called');
    // @ts-ignore
    setTimeout( () => document.querySelector('.jacket').classList.remove('select') , 0);
  }
  // tslint:disable-next-line:typedef
  showModule(){
    console.log('Show Called');
    // @ts-ignore
    setTimeout( () => document.querySelector('.jacket').classList.add('select') , 0);
  }


}
