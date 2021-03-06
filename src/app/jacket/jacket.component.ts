import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { ServiceApi } from '../services/service.api';

@Component({
  selector: 'app-jacket',
  templateUrl: './jacket.component.html',
  styleUrls: ['./jacket.component.scss']
})
export class JacketComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  constructor( private _service_api: ServiceApi) { }

  @Input() userType: string | any;
  @Input() jacketList: any[] | undefined;
  @Input() developmentMode: any;

  @Output() appEmitter = new EventEmitter();

  currentFunctionality = 'showTable';
  dtOptions: DataTables.Settings = {};

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
    console.log('Hide Called');
    // @ts-ignore
    document.querySelector('.antenna').classList.remove('select');
    // @ts-ignore
    setTimeout( () => document.querySelector('.jacket').classList.remove('select') , 0);
  }
  // tslint:disable-next-line:typedef
  showModule(){
    // @ts-ignore
    console.log('Show Called');
    // @ts-ignore
    setTimeout( () => document.querySelector('.jacket').classList.add('select') , 0);
  }

  // tslint:disable-next-line:typedef
  addJacket( $event: any, rfId1: string, rfId2: string ){
    $event.preventDefault();

    if ( rfId1.trim().length <= 0 || rfId2.trim().length <= 0 ){
      alert( 'Data not inserted' );
      return;
    }
    const jacket = {
      rfId1,
      rfId2
    };
    this._service_api.postAddJacket( jacket ).subscribe(
      ( data: any ) => {
        if ( !data || !data.id ){
          return;
        }
        alert( 'Jacket added with id: ' + data.id );
        this.appEmitter.emit( true );
      }
    );
  }


  // tslint:disable-next-line:typedef
  verifyJacket($event: any) {
    $event.preventDefault();
    this._service_api.postJacketVerification().subscribe(
      ( data: any ) => {
        if ( !data || !data.id ){
          alert('Verification Failed');
          return;
        }
        const inputFields = document.querySelectorAll('.jacket__form--text.edit');
        Array.from( inputFields ).forEach( (input, index) => {
          switch ( index ){
            case 0:
              // @ts-ignore
              input.value = data.id;
              break;
            case 1:
              // @ts-ignore
              input.value = data.rfId1;
              break;
            case 2:
              // @ts-ignore
              input.value = data.rfId2;
              break;
          }
        } );
      }
    );
  }
  // tslint:disable-next-line:typedef
  readFromAntenna() {
    // @ts-ignore
    document.querySelector('.antenna').classList.add('select');
    this._service_api.getReadAntenna().subscribe(
      ( data: any ) => {
        // @ts-ignore
        document.querySelector('.antenna').classList.remove( 'select' );
        if ( !data ){
          alert('Antenna Service Down');
          return;
        }

        const inputFields = document.querySelectorAll('.jacket__form--text.add');
        Array.from( inputFields ).forEach( ( input, index ) => {
          switch ( index ) {
            case 0:
              break;
            case 1:
              // @ts-ignore
              input.value = data.rfId1;
              // @ts-ignore
              input.setAttribute('disabled', true);
              break;
            case 2:
              // @ts-ignore
              input.value = data.rfId2;
              // @ts-ignore
              input.setAttribute('disabled', true);
          }
        } );

        // @ts-ignore
        document.querySelector('.jacket__form--button.button.antennaRead').setAttribute('disabled', true);
      }
    );
  }
}
