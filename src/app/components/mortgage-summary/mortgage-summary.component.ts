import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CalcSummary } from '../../models/calc-summary.model';
import { selectMortgageState } from '../../state/mortgage.selectors';

@Component({
  selector: 'app-mortgage-summary',
  templateUrl: './mortgage-summary.component.html',
  styleUrls: ['./mortgage-summary.component.css']
})
export class MortgageSummaryComponent implements OnInit, OnDestroy {
  amSummary!: CalcSummary;
  termSummary!: CalcSummary;
  paymentFrequency!: string;
  subscriptions = new Subscription();
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscriptions.add(this.store.select(selectMortgageState).subscribe(s => {
      this.amSummary = s.amortizationDetails;
      this.termSummary = s.termDetails;
      const frequency = s.paymentFrequencies.find(f => f.value == this.amSummary.paymentFrequency);
      this.paymentFrequency = frequency ? frequency.label : '';

    }));
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
