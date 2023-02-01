import { CalcSummary } from "../models/calc-summary.model";
import { MState } from "../state/mortgage.reducer";

export const initialMockState: MState = {
    amortizationYears: [],
    termYears: [],
    paymentFrequencies: [],
    amortizationDetails: new CalcSummary(),
    termDetails: new CalcSummary(),
    isCalculated: false
};

export const mockState = {
    amortizationYears: [{ label: '1 Year', value: 1 }],
    termYears: [{ label: '1 Year', value: 1 }],
    paymentFrequencies: [{ label: 'Monthly', value: 'M' }],
    amortizationDetails: {
        amonitizationYears: 25,
        numberOfPayment: 300,
        mortgagePayment: 584.5900415079801,
        principalPayment: 100000,
        interestPayment: 75377.01245239403,
        totalAmountPaid: 175377.01245239403,
        paymentFrequency: 'M'
    },
    termDetails: {
        termYears: 5,
        numberOfPayment: 60,
        mortgagePayment: 584.5900415079801,
        principalPayment: 30977.839209441758,
        interestPayment: 4097.563281037052,
        totalAmountPaid: 35075.40249047881
    },
    isCalculated: true
};