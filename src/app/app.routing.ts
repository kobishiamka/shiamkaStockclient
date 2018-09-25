import { StockPortfolioComponent } from "./stock-portfolio/stock-portfolio.component";
import { ActionComponent } from "./action/action.component";
import { ShistoryLogComponent } from "./history-log/history-log.component";


import { Route } from "@angular/router";


export const ROUTES: Route[] = [

  {
    path: 'Action/:sName/:currentPrice/:quantity/:whichAction', component: ActionComponent
  },
  {
    path: 'Protfolio', component: StockPortfolioComponent
  },
  {
    path: 'History', component: ShistoryLogComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo: '/Protfolio'
  }

];
