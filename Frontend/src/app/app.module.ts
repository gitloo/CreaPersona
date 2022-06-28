import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // aggiungere in imports : FormsModule, ReactiveFormsModule,
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // aggiungere in imports : BrowserAnimationsModule
import { HttpClientModule } from '@angular/common/http'; // aggiungere in imports : HttpClientModule

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
