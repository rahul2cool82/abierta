import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Input() userType: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  hideModule(){
    // @ts-ignore
    setTimeout( () => document.querySelector('.dashboard').classList.remove('select') , 0);
  }

  // tslint:disable-next-line:typedef
  showModule(){
    // @ts-ignore
    setTimeout( () => document.querySelector('.dashboard').classList.add('select') , 10);
  }

}
