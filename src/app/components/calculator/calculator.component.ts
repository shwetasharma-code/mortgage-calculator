import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ICalculator } from '../../models/calculator.model';
import { calculateSummary, clearSummary, getAmortizationPeriod, getPaymentFrequency, getTerm } from '../../state/mortgage.actions';
import { isCalculated, selectAmortizationYears, selectPaymentFrequency, selectTermYears } from '../../state/mortgage.selectors';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {
  paymentForm!: FormGroup;
  isSubmitted = false;

  amortizationYears$ = this.store.select(selectAmortizationYears);
  termYears$ = this.store.select(selectTermYears);
  paymentFrequencies$ = this.store.select(selectPaymentFrequency);
  isCalculated$ = this.store.select(isCalculated);

  constructor(private fb: FormBuilder, private store: Store) {
    this.initForm();
  }

  ngOnInit() {
    this.store.dispatch(getAmortizationPeriod());
    this.store.dispatch(getTerm());
    this.store.dispatch(getPaymentFrequency());
  }

  /**
   *
   * @description This method initializes the mortgage calculator form.
   * @memberof CalculatorComponent
   */
  initForm() {
    this.paymentForm = this.fb.group({
      mortgageAmount: ['', [Validators.required]],
      interestRate: ['', [Validators.required, Validators.min(0.01), Validators.max(100)]],
      amortizationPeriod: ['', [Validators.required]],
      paymentFrequency: ['', [Validators.required]],
      term: ['', [Validators.required]]
    });
  }

  /**
   * @description This method dispatch the action to calculate the mortgage payment if form valid 
   * and reset the summary if invalid.
   * Formula: 
   * let monthlyPayment = ((interestRate / 12) / (1 - (Math.Pow((1 + (interestRate / 12)), -(amortizationTerm))))) * loanAmount;
   * monthlyPayment = Math.Round(monthlyPayment, 2);
   * @memberof CalculatorComponent
   */
  calculate() {
    this.isSubmitted = true;

    if (this.paymentForm.valid) {
      const formValue = this.paymentForm.value;
      const obj: ICalculator = {
        mortgageAmount: Number(formValue.mortgageAmount),
        interestRate: Number(formValue.interestRate),
        amortizationPeriod: Number(formValue.amortizationPeriod),
        paymentFrequency: formValue.paymentFrequency,
        term: Number(formValue.term)
      }
      this.store.dispatch(calculateSummary({ payload: obj }));
    } else {
      this.store.dispatch(clearSummary());
    }
  }

}
