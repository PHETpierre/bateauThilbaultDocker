import { Injectable } from '@angular/core';
import { Product } from '../../product.Product';
import { HttpClient } from '@angular/common/http';
import { GlobalVariables } from "../../GlobalVariables";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient, private globalVar:GlobalVariables) { }

  getProducts(){
    return this.http.get<Product[]>(this.globalVar.urlDev+"/infoproducts/");
  }

  getSingleProduct(id:number){
    return this.http.get<Product>(this.globalVar.urlDev+"/infoproduct/"+id+"/");
  }

  getCrustaces(){
    return this.http.get<Product[]>(this.globalVar.urlDev+"/infocrustaces/");
  }

  getPoissons(){
    return this.http.get<Product[]>(this.globalVar.urlDev+"/infopoissons/");
  }

  getFruitsDeMer(){
    return this.http.get<Product[]>(this.globalVar.urlDev+"/infofruitdemers/");
  }

  addProductStock(product:Product){
    return this.http.get<Product>(this.globalVar.urlDev+'/incrementStock/'+product.id+'/'+((product.quantity)?product.quantity:0)+'/'+((Number.isInteger(product.price)) ? (product.price + ".0") : product.price));
  }

  removeProductStock(product:Product){
    var productQuantity = (product.quantity)?Math.abs(product.quantity):0;
    var productPrice = (Number.isInteger(product.price)) ? (product.price + ".0") : product.price;
    return this.http.get<Product>(this.globalVar.urlDev+'/decrementStock/'+product.id+'/'+productQuantity+'/'+productPrice);
  }

  putProductOnSale(product:Product){
    return this.http.get<Product>(this.globalVar.urlDev+'/putonsale/'+product.id+'/'+product.discount+'/');
  }

  getTransactions(){
    return this.http.get<Product[]>(this.globalVar.urlDev+"/transaction/");
  }
}
