import { TestBed } from '@angular/core/testing';
import { mockFormData } from '../../mocks/mortgage-form-data.mock';
import { mockState } from '../../mocks/mortgage-state.mock';

import { MortgageService } from './mortgage.service';

describe('MortgageService', () => {
  let service: MortgageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MortgageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to call calculateSummary()', () => {
    spyOn(service, 'calculateSummary').and.callThrough();
    service.calculateSummary(mockFormData);
    
    expect(service.calculateSummary).toHaveBeenCalledWith(mockFormData);
  });

  it('calculateSummary() should be able to call calculatePlan() & calculateTermPlan() with correct parameters', () => {
    spyOn(service, 'calculatePlan').and.callThrough();
    spyOn(service, 'calculateTermPlan').and.callThrough();

    service.calculateSummary(mockFormData).subscribe(() => {
      expect(service.calculatePlan).toHaveBeenCalledWith(mockFormData.mortgageAmount,
        mockFormData.amortizationPeriod, mockFormData.interestRate, mockFormData.paymentFrequency);
      expect(service.calculateTermPlan).toHaveBeenCalledWith(mockState.amortizationDetails.mortgagePayment,
        mockFormData.term, mockFormData.interestRate, mockFormData.paymentFrequency);
    });
  });

  it('Should be able to get correct value from getCompoundingPeriod()', () => {
    spyOn(service, 'getCompoundingPeriod').and.callThrough();
    expect(service.getCompoundingPeriod('W')).toEqual(52);
    expect(service.getCompoundingPeriod('BiW')).toEqual(26);
    expect(service.getCompoundingPeriod('M')).toEqual(12);
    expect(service.getCompoundingPeriod('SemiM')).toEqual(24);
  });

  it('Should be able to get value from getAmortizationYears()', () => {
    spyOn(service, 'getAmortizationYears').and.callThrough();
    service.getAmortizationYears().subscribe((res) => {
      expect(res.length).toBeGreaterThan(0);
    });
  });

  it('Should be able to get value from getTermYears()', () => {
    spyOn(service, 'getTermYears').and.callThrough();
    service.getTermYears().subscribe((res) => {
      expect(res.length).toBeGreaterThan(0);
    });
  });

  it('Should be able to get value from getPaymentFrequencies()', () => {
    spyOn(service, 'getPaymentFrequencies').and.callThrough();
    service.getPaymentFrequencies().subscribe((res) => {
      expect(res.length).toBeGreaterThan(0);
    });
  });
});
