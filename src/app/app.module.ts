import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './componets/product-list/product-list.component';
import { CartComponent } from './componets/cart/cart.component';
import { HeaderComponent } from './componets/header/header.component';
import { FilterComponent } from './componets/filter/filter.component';
import { reducer } from 'src/app/app.reducer';
import { AppEffects } from 'src/app/app.effects';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CartComponent,
    HeaderComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
ReactiveFormsModule,
StoreModule.forRoot(reducer),
    EffectsModule.forRoot(AppEffects),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
