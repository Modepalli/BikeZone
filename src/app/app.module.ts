import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
import { StarComponent } from './shared/star.component';
import { ProductDetailComponent } from './products/product-detail.component';
import { WelcomeComponent } from './home/welcome.component';
import { ProductGuardService } from './products/product-guard.service';
import { ProductModule } from './products/product.module';
import { SpeechRecognitionService } from './core/speech-recognition.service';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    StarComponent,
    ConvertToSpacesPipe,
    ProductDetailComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id',
      canActivate: [ProductGuardService],
      component: ProductDetailComponent},
      {path: 'products', component: WelcomeComponent},
      {path: '',redirectTo: 'products', pathMatch: 'full'},
      {path: '**', redirectTo: 'products', pathMatch: 'full'}
    ]),
    ProductModule
  ],
  providers: [
   
  ProductGuardService,
  SpeechRecognitionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
