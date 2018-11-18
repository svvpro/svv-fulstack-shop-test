import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {MaterializeService, ModalInstance} from "../shared/classes/materialize.service";
import {OrderService} from "../shared/services/order.service";
import {OrdersService} from "../shared/services/orders.service";
import {Order} from "../shared/interfaces";

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  isRoot: boolean = true;
  modal: ModalInstance;
  @ViewChild('modalForm') modalFormRef: ElementRef;

  constructor(public orderService: OrderService, private ordersService: OrdersService, private router: Router) {
  }

  ngOnInit() {
    this.isRoot = this.router.url === '/order';

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order';
      }
    });
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.modalInit(this.modalFormRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  basketOpen(): void {
    this.modal.open();
  }

  basketClose(): void {
    this.modal.close();
  }

  removeFromCard(position): void {
    this.orderService.remove(position);
    MaterializeService.toast('Position removed');
  }

  submitOrder(): void {
    const order: Order = Object.assign({}, {
      list: this.orderService.list.map((item) => {
        delete item._id;
        return item;
      })
    });

    this.ordersService.addOrder(order).subscribe(
      (order) => {
        MaterializeService.toast(`Order № ${order.order} has created`);
        this.orderService.clear();
        this.modal.close();
      },
      error => MaterializeService.toast(error.error.message)
    )
  }

}
