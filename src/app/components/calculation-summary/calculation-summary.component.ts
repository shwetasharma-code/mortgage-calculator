import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CalcSummary } from '../../models/calc-summary.model';
import { selectMortgageState } from '../../state/mortgage.selectors';

@Component({
  selector: 'app-calculation-summary',
  templateUrl: './calculation-summary.component.html',
  styleUrls: ['./calculation-summary.component.css']
})
export class CalculationSummaryComponent implements OnInit, OnDestroy {
  amSummary!: CalcSummary;
  termSummary!: CalcSummary;

  subscriptions = new Subscription();
  constructor(private store: Store) { }

  ngOnInit() {
    this.subscriptions.add(this.store.select(selectMortgageState).subscribe(s => {
      this.amSummary = s.amortizationDetails;
      this.termSummary = s.termDetails;
      if (s.isCalculated) {
        // TODO: scroll directive could be implemented
        document.getElementById('summary-panel')?.scrollIntoView(true);
      }
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
