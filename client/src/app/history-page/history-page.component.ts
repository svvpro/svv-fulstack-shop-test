import {Component, OnInit} from '@angular/core';
import {Filter, Order} from "../shared/interfaces";
import {OrdersService} from "../shared/services/orders.service";

const STEP = 2;

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  filterVisible: boolean = false;
  canLoad: boolean = true;
  reloading: boolean = false;
  loading: boolean = false;
  orders: Order[] = [];
  limit: number = STEP;
  offset: number = 0;
  filter: Filter = {};

  constructor(private ordersSerivce: OrdersService) {
  }


  ngOnInit() {
    this.reloading = true;
    this.fetchOrders();
  }

  filterVisibleTrigger(): void {
    this.filterVisible = !this.filterVisible;
  }

  submitFilter(filter: Filter): void {
    this.filter = filter;
    this.reloading = true;
    this.orders = [];
    this.offset = 0;
    this.fetchOrders();
  }

  loadMore(): void {
    this.loading = true;
    this.offset += STEP;
    this.fetchOrders();
  }

  private fetchOrders(): void {
    const params = Object.assign({}, this.filter, {
      limit: this.limit,
      offset: this.offset
    });

    this.ordersSerivce.getOrders(params).subscribe(
      (orders) => {
        this.orders = this.orders.concat(orders);
        this.reloading = false;
        this.loading = false;
        this.canLoad = orders.length < STEP;
      }
    );
  }


}
