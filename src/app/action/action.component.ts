import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { ServiceActionService } from '../service-action.service';


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
      this.actionService.buyStockViaServer(this.form.value.sName,this.form.value.quantity,this.form.value.currentPrice,this.form.value.log);
      }
      else{
      this.actionService.sellStockViaServer(this.form.value.sName,this.form.value.quantity,this.form.value.currentPrice,this.form.value.log);
      }
  }
  constructor(private actionService: ServiceActionService , private fb: FormBuilder ,private activeRoute: ActivatedRoute) {
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
