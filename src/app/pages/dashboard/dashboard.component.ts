import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../product.Product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  transactions: any[] = [];
  transactionsCrustace: any[] = [];
  transactionsMer: any[] = [];
  transactionsPoisson: any[] = [];
  dataQuantityType: any[] = [];
  dataPriceType: any[] = [];

  CA: any = 0;
  resultComptable: any = 0;

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: String[] = ['Crustacés', 'Fruits de mer', 'Poissons'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataset[] = [];
  barChartData2: ChartDataset[] = [];

  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
    this.getTransaction();

  }

  getTransaction() {
    this.productsService.getTransactions().subscribe((data: any[]) => {
      console.log(data)
      this.transactions = data;
      this.transactions.forEach(transaction => {
        if (transaction.price >= 0) {
          this.CA += (transaction.price * transaction.quantite);
        }
        this.CA = Math.round(this.CA * 100) / 100
        this.resultComptable += Math.round((transaction.price * transaction.quantite) * 100)/100;
      })
      this.transactionsCrustace = this.transactions.filter(transaction => (transaction.type == "Crustace" || transaction.type == "Crustaces"));
      this.generateBuisnessData(this.transactionsCrustace);
      this.transactionsMer = this.transactions.filter(transaction => (transaction.type == "mer" || transaction.type == "Fruit de mer"));
      this.generateBuisnessData(this.transactionsMer);
      this.transactionsPoisson = this.transactions.filter(transaction => transaction.type == "poissons");
      this.generateBuisnessData(this.transactionsPoisson);
      this.generateChartData();
    });
  }

  generateBuisnessData(list: any[]) {
    var soldQuantities = 0;
    var soldPrice = 0;
    
    list.forEach(transaction => {
      if (transaction.price >= 0) {
        soldQuantities += transaction.quantite;
        soldPrice += (transaction.price * transaction.quantite);
      }
    })

    this.dataQuantityType.push(soldQuantities);
    this.dataPriceType.push(soldPrice);
  }

  generateChartData() {

    this.barChartLabels = ['Crustacés', 'Fruits de mer', 'Poissons'];
  
    this.barChartData = [
      { data: this.dataQuantityType }
    ];

    this.barChartData2 = [
      { data: this.dataPriceType}
    ]

  }

}