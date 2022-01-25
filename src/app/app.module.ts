import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './features/header/header.component';
import { FooterComponent } from './features/footer/footer.component';
import { DetailsProduitComponent } from './pages/details-produit/details-produit.component';
import { ProductsService } from './core/services/products.service';
import { GestionProduitsComponent } from './pages/gestion-produits/gestion-produits.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
//import * as PlotlyJS from '@types/plotly.js';
//import { PlotlyModule } from 'angular-plotly.js';
import { NgChartsModule } from 'ng2-charts';

//PlotlyModule.plotlyjs = PlotlyJS;
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailsProduitComponent,
    GestionProduitsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    //PlotlyModule,
    NgChartsModule,
    NgSelectModule,
    FormsModule
  ],
  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
