import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { calculateSummary, clearSummary } from '../../state/mortgage.actions';
import { MState } from '../../state/mortgage.reducer';
import { CalculationSummaryComponent } from '../calculation-summary/calculation-summary.component';
import { MortgageSummaryComponent } from '../mortgage-summary/mortgage-summary.component';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;
  const mockStore = jasmine.createSpyObj<Store<MState>>('store', ['select', 'dispatch']);
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CalculatorComponent, CalculationSummaryComponent, MortgageSummaryComponent],
      providers: [{ provide: Store, useValue: mockStore }]

    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call calculate() method if Calculate button is clicked', () => {
    const element = fixture.debugElement.query(By.css('#btn-calculate'));
    const el: HTMLElement = element.nativeElement;
    el.click();
    fixture.detectChanges();
    expect(component.isSubmitted).toBeTruthy();
  });

  it('Should calculate if form is valid', () => {
    component.paymentForm.patchValue({
      mortgageAmount: 100000,
      interestRate: 5,
      amortizationPeriod: 25,
      paymentFrequency: 'M',
      term: 5
    });
    const expectedAction = calculateSummary({ payload: component.paymentForm.value });
    component.calculate();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('Should not calculate but clear summary, if form is NOT valid', () => {
    component.paymentForm.patchValue({
      mortgageAmount: '',
      interestRate: '',
      amortizationPeriod: '',
      paymentFrequency: '',
      term: ''
    });
    const expectedAction = clearSummary();
    component.calculate();
    fixture.detectChanges();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
