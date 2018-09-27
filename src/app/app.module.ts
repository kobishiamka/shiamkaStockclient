import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockPortfolioComponent } from './stock-portfolio/stock-portfolio.component';
import { ShistoryLogComponent } from './history-log/history-log.component';
import { ActionComponent } from './action/action.component';
import { RouterModule } from '../../node_modules/@angular/router';
import { ROUTES } from './app.routing';
import { MatButtonModule, MatTableModule, MatToolbarModule} from '@angular/material';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { MatSelectModule} from '@angular/material/select';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: 'http://localhost:3001', options: {} };


@NgModule({
  declarations: [
    AppComponent,
    StocksComponent,
    StockPortfolioComponent,
    ShistoryLogComponent,
    ActionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
