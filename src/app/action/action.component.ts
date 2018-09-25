import { Component, OnInit } from '@angular/core';
import { StocksService } from '../service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '../../../node_modules/@angular/router';


@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})

export class ActionComponent implements OnInit {
  form: FormGroup;
  //TRUE : BUY     FALSE: SELL
  formTransactionType: boolean = false;
  isFormValid(){
    return this.form.valid
  }
  doAction(){
      if (this.formTransactionType){
      this.StocksService.buyStockViaServer(this.form.value.sName,this.form.value.quantity,this.form.value.currentPrice,this.form.value.log);
      }
      else{
      this.StocksService.sellStockViaServer(this.form.value.sName,this.form.value.quantity,this.form.value.currentPrice,this.form.value.log);
      }
  }
  constructor(private StocksService: StocksService , private fb: FormBuilder ,private activeRoute: ActivatedRoute) {
    activeRoute.params.subscribe(params => {
      this.form = this.fb.group({
      sName: [params['sName']],
      quantity: [params['quantity'],Validators.min(1)],
      currentPrice: [params['currentPrice']],
      log: [""]
    })
    this.formTransactionType=(params['whichAction']=='true')
    
    })
  }
  ngOnInit() {
  }

 

}
