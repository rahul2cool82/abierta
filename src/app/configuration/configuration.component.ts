import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ServiceApi } from '../services/service.api';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  constructor(private _service_api: ServiceApi) { }

  @Input() userType: string | any;
  @Input() configurationList: any[] | undefined;
  @Input() developmentMode: any;
  @Output() appEmitter = new EventEmitter();

  currentFunctionality = 'showTable';

  dtOptions: DataTables.Settings = {};

  // tslint:disable-next-line:typedef
  ngOnInit(): void {
    // @ts-ignore
    this.dtOptions = {
      pagingType : 'full_numbers',
      pageLength : 8,
      processing : true
    };
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

  // tslint:disable-next-line:typedef
  addConfiguration( $event: { preventDefault: () => void; } , confKey: string, confValue: string) {
    $event.preventDefault();
    const configuration = {
      confKey,
      confValue
    };
    this._service_api.postConfigurationAdd( configuration ).subscribe(
      ( data: any ) => {
        alert( 'Configuration added with id : ' + data.id );
        this.appEmitter.emit(true);
      }
    );
  }
}
