import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculationSummaryComponent } from './components/calculation-summary/calculation-summary.component';
import { CalculatorComponent } from './components/calculator/calculator.component';
import { MortgageSummaryComponent } from './components/mortgage-summary/mortgage-summary.component';
import { FooterComponent } from './footer/footer.component';
import { MortgageEffects } from './state/mortgage.effects';
import { mortgageReducer } from './state/mortgage.reducer';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    CalculatorComponent,
    CalculationSummaryComponent,
    MortgageSummaryComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ summary: mortgageReducer }),
    EffectsModule.forRoot([MortgageEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
