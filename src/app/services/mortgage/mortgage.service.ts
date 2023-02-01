import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CalcSummary } from '../../models/calc-summary.model';
import { ICalculator } from '../../models/calculator.model';
import { SelectItem } from '../../models/select-item.model';

@Injectable({
  providedIn: 'root'
})
export class MortgageService {

  constructor() { }

  /**
   * Calculate the mortgage payment summary 
   *
   * @param {ICalculator} payload
   * @return {*}  {Observable<{ amDetails: CalcSummary, termDetails: CalcSummary }>}
   * @memberof MortgageService
   */
  calculateSummary(payload: ICalculator): Observable<{ amDetails: CalcSummary, termDetails: CalcSummary }> {
    return new Observable<{ amDetails: CalcSummary, termDetails: CalcSummary }>(observer => {
      const amortizationDetails = this.calculatePlan(payload.mortgageAmount,
        payload.amortizationPeriod,
        payload.interestRate,
        payload.paymentFrequency);
      const termDetails = this.calculateTermPlan(amortizationDetails.mortgagePayment,
        payload.term,
        payload.interestRate,
        payload.paymentFrequency)
      observer.next({ amDetails: amortizationDetails, termDetails });
      observer.complete();
    });
  }

  /**
   * Calculate the amortization mortgage payment details
   *
   * @param {*} mortgageAmount
   * @param {*} period
   * @param {*} interestRate
   * @param {string} paymentFrequency
   * @return {*}  {CalcSummary}
   * @memberof MortgageService
   */
  calculatePlan(mortgageAmount: any, period: any, interestRate: any, paymentFrequency: string): CalcSummary {
    const principalAmount = Number(mortgageAmount);
    const totalYears = Number(period);
    const rateOfInterest = Number(interestRate) / 100;

    const compoundingPeriodPerYear = this.getCompoundingPeriod(paymentFrequency);
    const interestPerPeriod = rateOfInterest / compoundingPeriodPerYear;
    const numberOfPayments = compoundingPeriodPerYear * totalYears;
    const monthlyPayment = (interestPerPeriod / (1 - (Math.pow((1 + interestPerPeriod), -(numberOfPayments))))) * principalAmount;
    const totalCost = monthlyPayment * numberOfPayments;
    const interest = totalCost - principalAmount;

    const summary = new CalcSummary();
    summary.amonitizationYears = totalYears;
    summary.numberOfPayment = numberOfPayments;
    summary.mortgagePayment = monthlyPayment;
    summary.principalPayment = principalAmount;
    summary.interestPayment = interest;
    summary.totalAmountPaid = totalCost;
    summary.paymentFrequency = paymentFrequency;
    return summary;
  }

  /**
   * Calculate term mortgage payment 
   *
   * @param {*} mortgagePayment
   * @param {*} period
   * @param {*} interestRate
   * @param {string} paymentFrequency
   * @return {*}  {CalcSummary}
   * @memberof MortgageService
   */
  calculateTermPlan(mortgagePayment: any, period: any, interestRate: any, paymentFrequency: string): CalcSummary {
    const monthlyPayment = Number(mortgagePayment);
    const totalYears = Number(period);
    const rateOfInterest = Number(interestRate) / 100;

    const compoundingPeriodPerYear = this.getCompoundingPeriod(paymentFrequency);
    const interestPerPeriod = rateOfInterest / compoundingPeriodPerYear;
    const numberOfPayments = compoundingPeriodPerYear * totalYears;
    const principalAmount = ((1 - (Math.pow((1 + interestPerPeriod), -(numberOfPayments)))) / interestPerPeriod) * monthlyPayment;
    const totalCost = monthlyPayment * numberOfPayments;
    const interest = totalCost - principalAmount;


    const summary = new CalcSummary();
    summary.termYears = totalYears;
    summary.numberOfPayment = numberOfPayments;
    summary.mortgagePayment = monthlyPayment;
    summary.principalPayment = principalAmount;
    summary.interestPayment = interest;
    summary.totalAmountPaid = totalCost;
    return summary;
  }

  /**
   * 
   * Get number of iterations of payment in one year
   * @param {string} paymentFrequency
   * @return {number} 
   * @memberof MortgageService
   */
  getCompoundingPeriod(paymentFrequency: string): number {
    let iterationsPerYear = 0;
    switch (paymentFrequency) {
      case 'W':
        iterationsPerYear = 52;
        break;
      case 'BiW':
        iterationsPerYear = 26;
        break;
      case 'M':
        iterationsPerYear = 12;
        break;
      case 'SemiM':
        iterationsPerYear = 24;
        break;
    }
    return iterationsPerYear;
  }

  /**
   * Get list of amortization years
   * @return {*} 
   * @memberof MortgageService
   */
  getAmortizationYears() {
    return new Observable<SelectItem[]>(observer => {
      const years = [new SelectItem({ label: 'Select', value: '' })];
      for (let i = 0; i < 30; i++) {
        let year = i + 1;
        years.push(new SelectItem({ label: year, value: year }));
      }
      observer.next(years);
      observer.complete();
    });
  }

  /**
   * Get list of term years
   * @return {*} 
   * @memberof MortgageService
   */
  getTermYears() {
    return new Observable<SelectItem[]>(observer => {
      const years = [new SelectItem({ label: 'Select', value: '' })];
      for (let i = 0; i < 10; i++) {
        let year = i + 1;
        years.push(new SelectItem({ label: year, value: year }));
      }
      observer.next(years);
      observer.complete();
    });
  }

  /**
   * Get list of payment frequeny
   * This could be modified to get data from .json file usinh httpclient
   * @return {*} 
   * @memberof MortgageService
   */
  getPaymentFrequencies() {
    return new Observable<SelectItem[]>(observer => {
      const frequencies: SelectItem[] = [
        { label: 'Select', value: '' },
        { label: 'Weekly', value: 'W' },
        { label: 'Bi-Weekly (every 2 weeks)', value: 'BiW' },
        { label: 'Semi-monthly (24x per year)', value: 'SemiM' },
        { label: 'Monthly (12x per year)', value: 'M' }
      ]
      observer.next(frequencies);
      observer.complete();
    });
  }
}
