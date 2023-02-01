import { createAction, props } from "@ngrx/store";
import { CalcSummary } from "../models/calc-summary.model";
import { ICalculator } from "../models/calculator.model";
import { SelectItem } from "../models/select-item.model";

export const calculateSummary = createAction(
    '[Mortgage] calculate summary',
    props<{ payload: ICalculator }>()
);

export const loadSummary = createAction(
    '[Mortgage] load summary',
    props<{ amDetails: CalcSummary, termDetails: CalcSummary }>()
);

export const clearSummary = createAction(
    '[Mortgage] clear summary'
);

export const getAmortizationPeriod = createAction(
    '[Mortgage] get amortization period'
);

export const getAmortizationPeriodSuccess = createAction(
    '[Mortgage] get amortization period success',
    props<{ payload: SelectItem[] }>()
);

export const getTerm = createAction(
    '[Mortgage] get term'
);

export const getTermSuccess = createAction(
    '[Mortgage] get term success',
    props<{ payload: SelectItem[] }>()
);

export const getPaymentFrequency = createAction(
    '[Mortgage] get payment frequency'
);

export const getPaymentFrequencySuccess = createAction(
    '[Mortgage] get payment frequency success',
    props<{ payload: SelectItem[] }>()
);