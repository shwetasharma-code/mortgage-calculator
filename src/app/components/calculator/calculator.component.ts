import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ICalculator } from '../../models/calculator.model';
import { calculateSummary, clearSummary, getAmortizationPeriod, getPaymentFrequency, getTerm } from '../../state/mortgage.actions';
import { isCalculated, selectAmortizationYears, selectPaymentFrequency, selectTermYears } from '../../state/mortgage.selectors';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit, OnDestroy {
  paymentForm!: FormGroup;
  isSubmitted = false;

  amortizationYears$ = this.store.select(selectAmortizationYears);
  termYears$ = this.store.select(selectTermYears);
  paymentFrequencies$ = this.store.select(selectPaymentFrequency);
  isCalculated$ = this.store.select(isCalculated);

  subscriptions = new Subscription();
  constructor(private fb: FormBuilder, private store: Store) {
    this.initForm();
  }

  ngOnInit() {
    this.subscriptions.add(this.store.dispatch(getAmortizationPeriod()));
    this.subscriptions.add(this.store.dispatch(getTerm()));
    this.subscriptions.add(this.store.dispatch(getPaymentFrequency()));
  }

  /**
   *
   * @description This method initializes the mortgage calculator form.
   * @memberof CalculatorComponent
   */
  initForm() {
    this.paymentForm = this.fb.group({
      mortgageAmount: [null, [Validators.required, this.noZeroOrNegative()]],
      interestRate: [null, [Validators.required, this.noZeroOrNegative(), Validators.max(100)]],
      amortizationPeriod: ['', [Validators.required]],
      paymentFrequency: ['', [Validators.required]],
      term: ['', [Validators.required]]
    }, { validators: this.yearValidator() });
  }

  /**
   * custom validation to check if the number is zero or negative
   *
   * @return {*}  {ValidatorFn}
   * @memberof CalculatorComponent
   */
  noZeroOrNegative(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = control.value === 0 || control.value < 0 ? true : false;
      return forbidden ? { zeroOrNegative: { value: control.value } } : null;
    };
  }

  /**
   * custom validation for amortization year to be greater than term year
   *
   * @return {*}  {ValidatorFn}
   * @memberof CalculatorComponent
   */
  yearValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const amYear = control.get('amortizationPeriod');
      const termYear = control.get('term');
      const forbidden = amYear && termYear && amYear.value && termYear.value &&
        Number(amYear.value) < Number(termYear.value) ? true : false;
      return forbidden ? { forbiddenYear: true } : null;
    };
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
