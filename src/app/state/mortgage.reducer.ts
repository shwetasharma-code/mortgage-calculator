import { createReducer, on } from "@ngrx/store";
import { CalcSummary } from "../models/calc-summary.model";
import { SelectItem } from "../models/select-item.model";
import * as MortgageActions from './mortgage.actions';

export interface MState {
    amortizationYears: SelectItem[],
    termYears: SelectItem[],
    paymentFrequencies: SelectItem[],
    amortizationDetails: CalcSummary,
    termDetails: CalcSummary,
    isCalculated: boolean
}

const initialState: MState = {
    amortizationYears: [],
    termYears: [],
    paymentFrequencies: [],
    amortizationDetails: new CalcSummary(),
    termDetails: new CalcSummary(),
    isCalculated: false
};

export const mortgageReducer = createReducer(initialState,
    on(MortgageActions.loadSummary, (state, { amDetails, termDetails }) => ({
        ...state,
        amortizationDetails: amDetails,
        termDetails: termDetails,
        isCalculated: true
    })),
    on(MortgageActions.getAmortizationPeriodSuccess, (state, { payload }) => ({
        ...state, amortizationYears: payload
    })),
    on(MortgageActions.getTermSuccess, (state, { payload }) => ({
        ...state, termYears: payload
    })),
    on(MortgageActions.getPaymentFrequencySuccess, (state, { payload }) => ({
        ...state, paymentFrequencies: payload
    })),
    on(MortgageActions.clearSummary, (state) => ({
        ...state,
        amortizationDetails: initialState.amortizationDetails,
        termDetails: initialState.termDetails,
        isCalculated: initialState.isCalculated
    })));
