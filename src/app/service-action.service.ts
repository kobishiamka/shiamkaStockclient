
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { history } from './model/stock';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Socket } from 'ngx-socket-io';
import 'rxjs/add/operator/map'
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceActionService {

  stocksHistory$: BehaviorSubject<Array<history>> = new BehaviorSubject<Array<history>>([]);
  urlBuy =  `${environment.serverUrl}/buy/?format=json`
  urlSell =  `${environment.serverUrl}/sell/?format=json`
  urlHistory =  `${environment.serverUrl}/history`

  buyStockViaServer(sName, quantity, currentPrice, log) {
    const tempJson = { sName: sName, quantity: quantity, currentPrice: currentPrice, log: log }
    let result = this.http.post<any>(this.urlBuy, JSON.stringify(tempJson)).toPromise().then(() => {
      this.http.get<Array<history>>(this.urlHistory).subscribe(x => {
        this.stocksHistory$.next(x)
      })
    })
    return result
  }

  sellStockViaServer(sName, quantity, currentPrice, log) {
    const tempJson = { sName: sName, quantity: quantity, currentPrice: currentPrice, log: log }
    let result = this.http.post<any>(this.urlSell, JSON.stringify(tempJson)).toPromise().then(() => {
      this.http.get<Array<history>>(this.urlHistory).subscribe(x => {
        this.stocksHistory$.next(x)
      })
    })
    return result
  }
  constructor(private http: HttpClient, private socket: Socket) {
   
}}