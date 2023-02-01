import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { initialMockState, mockState } from '../../mocks/mortgage-state.mock';
import { MState } from '../../state/mortgage.reducer';
import { selectMortgageState } from '../../state/mortgage.selectors';

import { MortgageSummaryComponent } from './mortgage-summary.component';

describe('MortgageSummaryComponent', () => {
  let component: MortgageSummaryComponent;
  let fixture: ComponentFixture<MortgageSummaryComponent>;
  const initialState: MState = initialMockState;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MortgageSummaryComponent],
      providers: [provideMockStore({
        initialState, selectors: [
          {
            selector: selectMortgageState,
            value: mockState
          },
        ],
      })
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MortgageSummaryComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render mortgage details in DOM', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const elem = compiled.querySelector('#mortgage-summary p');
    expect(elem?.textContent).toContain('25-year');
  });

});
