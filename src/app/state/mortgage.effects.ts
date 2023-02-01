import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { MortgageService } from "../services/mortgage/mortgage.service";
import { calculateSummary, getAmortizationPeriod, getAmortizationPeriodSuccess, getPaymentFrequency, getPaymentFrequencySuccess, getTerm, getTermSuccess, loadSummary } from "./mortgage.actions";

@Injectable()
export class MortgageEffects {
    calculateSummary$ = createEffect(() =>
        this.actions$.pipe(
            ofType(calculateSummary),
            mergeMap((action) =>
                this.mortgageService.calculateSummary(action.payload).pipe(
                    map((res) => loadSummary({ amDetails: res.amDetails, termDetails: res.termDetails })),
                    catchError(() => of({ type: '[Mortgage] calculate summary error' })
                    ))
            )));

    loadAmortizationPeriod$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getAmortizationPeriod),
            mergeMap(() =>
                this.mortgageService.getAmortizationYears().pipe(
                    map((res) => getAmortizationPeriodSuccess({ payload: res })))
            )));
    loadTermYears$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getTerm),
            mergeMap(() =>
                this.mortgageService.getTermYears().pipe(
                    map((res) => getTermSuccess({ payload: res })))
            )));
    loadpaymentFrequency$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getPaymentFrequency),
            mergeMap(() =>
                this.mortgageService.getPaymentFrequencies().pipe(
                    map((res) => getPaymentFrequencySuccess({ payload: res })))
            )));
    /**
     * Creates an instance of MortgageEffects.
     * @param {Actions} actions$
     * @param {MortgageService} mortgageService
     * @memberof MortgageEffects
     */
    constructor(private actions$: Actions, private mortgageService: MortgageService) {
    }
}