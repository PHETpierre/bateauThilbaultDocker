import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.Product';
import { ProductsService } from '../../core/services/products.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-gestion-produits',
  templateUrl: './gestion-produits.component.html',
  styleUrls: ['./gestion-produits.component.css']
})
export class GestionProduitsComponent implements OnInit {
  listeProduits: Product[] = [];
  listePoissons: Product[] = [];
  listeCrustaces: Product[] = [];
  listeFruitsDeMer: Product[] = [];

  constructor(public productsService: ProductsService, private router: Router) { }

  ngOnInit(): void {
    this.getPoissons();
    this.getCrustaces();
    this.getFruistDeMer();
  }

  getPoissons() {
    this.productsService.getPoissons().subscribe((res: Product[]) => {
      this.listePoissons = res;
      console.log(this.listePoissons);
    },
      (err) => {
        alert('failed to get poissons data from server');
        console.log(err)
      });
  }

  getCrustaces() {
    this.productsService.getCrustaces().subscribe((res: Product[]) => {
      this.listeCrustaces = res;
      console.log(this.listeCrustaces);
    },
      (err) => {
        alert('failed to get crustaces data from server');
        console.log(err)
      });
  }

  getFruistDeMer(){
    this.productsService.getFruitsDeMer().subscribe((res: Product[]) => {
      this.listeFruitsDeMer = res;
      console.log(this.listeFruitsDeMer);
    },
      (err) => {
        alert('failed to get fruits de mer data from server');
        console.log(err)
      });
  }

  addProductStock() {
    this.addProductStockByArray(this.listeCrustaces);
    this.addProductStockByArray(this.listeFruitsDeMer);
    this.addProductStockByArray(this.listePoissons);
  }

  addProductStockByArray(products:Product[]){
    products.forEach((product) => {

      if (typeof product.quantity != "number"){
        product.quantity = 0;
      }

      if (typeof product.discount != "number"){
        product.discount = 0;
      }

      if (typeof product.inStock != "number"){
        product.inStock = 0;
      }

      if (product.quantity > 0){
        this.productsService.addProductStock(product).subscribe();
      }
      
      if (product.quantity < 0) {
        this.productsService.removeProductStock(product).subscribe();
      }

      if (product.discount != 0){
        this.productsService.putProductOnSale(product).subscribe();
      }

      product.inStock = product.inStock + product.quantity;
      product.quantity = 0;

    })
  }

  updateStock(product:Product, type:String){
    switch(type){
      case 'crustace':
        if (typeof product.quantity != "number"){
          product.quantity = 0;
        }
  
        if (typeof product.inStock != "number"){
          product.inStock = 0;
        }

        product.inStock = product.inStock + product.quantity;
        break;
      case 'fruitDeMer':
        break;
      case 'poisson':
        break;
      default:
        console.error("the type : ''"+type+"'' doesn't exist");
    }
  }

}
