import { Component, OnInit } from '@angular/core';
import { Product } from '../../product.Product';
import { ProductsService } from '../../core/services/products.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-details-produit',
  templateUrl: './details-produit.component.html',
  styleUrls: ['./details-produit.component.css']
})
export class DetailsProduitComponent implements OnInit {
    listeProduits: Product[] = [];
    selectedProduit: Product = {};
    selectedId: number = 1;

    constructor(public productsService: ProductsService) { }

    getProducts(){
        this.productsService.getProducts().subscribe((res: Product[]) => {
            // console.log(res);
            this.listeProduits = res;
            // this.selectedProduit = this.getProduit(1);
            this.getProduit(1);
        },
        (err) => {
             alert('failed to get data from json');
         })
    };

    getProduit(id: number){
        // let result: Product = {};
        this.productsService.getSingleProduct(this.selectedId).subscribe((res:Product) => {
            // console.log(res);
            this.selectedProduit = res;
            this.selectedProduit.price = (typeof this.selectedProduit.price != "number")? 0: this.selectedProduit.price;
            this.selectedProduit.discount = (typeof this.selectedProduit.discount != "number")? 0: this.selectedProduit.discount;
            this.selectedProduit.price_on_sale = this.selectedProduit.price * (1-this.selectedProduit.discount/100);
            // result = res;
        },
        (err) => {
             alert('failed to get data from json');
         })
        // this.listeProduits.forEach((product) => {
        //     if(product.id == id) result = product;
        // });
        // return result;
    }

    ngOnInit(): void {
      this.getProducts();
    }

    updateId(){
        // this.selectedProduit = this.getProduit(this.selectedId);
        this.getProduit(this.selectedId);
    }

    addProduct(){
      this.productsService.addProductStock(this.selectedProduit).subscribe((res: Product) => {
        this.getProducts();
      },
      (err) => {
          alert('failed to add data');
      })
    }

    removeProduct(){
      if(typeof this.selectedProduit.inStock == "number" && typeof this.selectedProduit.quantity == "number"){
          let productDiff = this.selectedProduit.inStock - this.selectedProduit.quantity;
          // console.log(productDiff);
            if(productDiff <= 0){
                alert("Quantité saisie invalide");
            }else{
                this.productsService.removeProductStock(this.selectedProduit).subscribe((res: Product) => {
                    this.getProducts();
                },
                (err) => {
                    alert('failed to add data');
                })
            }
        }
    }

    modifyPromotion(){
      if(typeof this.selectedProduit.discount == "number" && this.selectedProduit.discount <= 100 &&
  this.selectedProduit.discount >= 0){
         this.productsService.putProductOnSale(this.selectedProduit).subscribe((res: Product) => {
            this.getProducts();
          },
          (err) => {
              alert('failed to add data');
          })
      }else{
          alert("Promotion saisie invalide")
      }
    }
}
