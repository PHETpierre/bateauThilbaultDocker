import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetailsProduitComponent } from './pages/details-produit/details-produit.component';
import { GestionProduitsComponent } from './pages/gestion-produits/gestion-produits.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'details-produit', component: DetailsProduitComponent },
    { path: 'gestion-produits', component: GestionProduitsComponent },
    { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
