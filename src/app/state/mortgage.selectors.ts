import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MState } from "./mortgage.reducer";

export const selectMortgageState = createFeatureSelector<MState>('summary');

export const selectAmortizationYears = createSelector(selectMortgageState, (s) => s.amortizationYears);
export const selectTermYears = createSelector(selectMortgageState, (s) => s.termYears);
export const selectPaymentFrequency = createSelector(selectMortgageState, (s) => s.paymentFrequencies);
export const isCalculated = createSelector(selectMortgageState, (s) => s.isCalculated);


