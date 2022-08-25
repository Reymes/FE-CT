import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxAnnotateTextModule } from 'ngx-annotate-text';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AnnotationComponent } from './annotation/annotation.component';

@NgModule({
  declarations: [
    AppComponent,
    AnnotationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxAnnotateTextModule,
    NgbModule,
    NoopAnimationsModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatOptionModule,
    MatChipsModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
