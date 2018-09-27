
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Stock, protfolio } from './model/stock';
import { HttpClient } from '../../node_modules/@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { environment } from '../environments/environment';

import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  stocks: Array<Stock>;
  stocks$: BehaviorSubject<Array<Stock>> = new BehaviorSubject<Array<Stock>>([]);

  stocksInPortfolio: Array<protfolio>;
  stocksInPortfolio$: BehaviorSubject<Array<protfolio>> = new BehaviorSubject<Array<protfolio>>([]);

  urlStock =  `${environment.serverUrl}/stock`
  urlHistory =  `${environment.serverUrl}/protfolio`

  private getAllStocksFromServer(): Observable<Array<Stock>> {
    return this.http.get<Array<Stock>>(this.urlStock)
  }

  getProtfolioFromServer(): Observable<Array<protfolio>> {
    return this.http.get<Array<protfolio>>(this.urlHistory);
  }

  constructor(private http: HttpClient, private socket: Socket) {
    this.getAllStocksFromServer();
    this.socket.fromEvent("price-update").subscribe((data: Stock[]) => {
      this.stocks$.next(data);
    })

    this.socket.fromEvent("protfolio-update").subscribe((data: protfolio[]) => {
      this.stocksInPortfolio$.next(data);
    })

    this.getAllStocksFromServer().subscribe(x => {
      this.stocks$.next(x);
    });

    this.getProtfolioFromServer().subscribe(x => {
      this.stocksInPortfolio$.next(x);
    });
  }
}