import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialMockState, mockState } from '../../mocks/mortgage-state.mock';
import { MState } from '../../state/mortgage.reducer';
import { selectMortgageState } from '../../state/mortgage.selectors';

import { CalculationSummaryComponent } from './calculation-summary.component';

describe('CalculationSummaryComponent', () => {
  let component: CalculationSummaryComponent;
  let fixture: ComponentFixture<CalculationSummaryComponent>;

  const initialState: MState = initialMockState;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [CalculationSummaryComponent],
      providers: [provideMockStore({
        initialState, selectors: [
          {
            selector: selectMortgageState,
            value: mockState
          },
        ],
      }),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CalculationSummaryComponent);
    component = fixture.componentInstance;
    TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render calculation summary details in DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const elem = compiled.querySelector('#calculation-summary tbody tr');
    expect(elem?.textContent).toContain(mockState.amortizationDetails.numberOfPayment);
  });
});
