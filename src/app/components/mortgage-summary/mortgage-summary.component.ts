import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CalcSummary } from '../../models/calc-summary.model';
import { selectMortgageState } from '../../state/mortgage.selectors';

@Component({
  selector: 'app-mortgage-summary',
  templateUrl: './mortgage-summary.component.html',
  styleUrls: ['./mortgage-summary.component.css']
})
export class MortgageSummaryComponent implements OnInit {
  amSummary!: CalcSummary;
  termSummary!: CalcSummary;
  paymentFrequency!: string;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectMortgageState).subscribe(s => {
      this.amSummary = s.amortizationDetails;
      this.termSummary = s.termDetails;
      const frequency = s.paymentFrequencies.find(f => f.value == this.amSummary.paymentFrequency);
      this.paymentFrequency = frequency ? frequency.label : '';

    });
  }

}
