import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MaterializeService, ModalInstance} from "../../shared/classes/materialize.service";
import {Order} from "../../shared/interfaces";

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss']
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit {

  modal: ModalInstance;
  selectedOrder: Order;
  @ViewChild('modalForm') modalFormRef: ElementRef;
  @Input() orders: Order[];

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.modalInit(this.modalFormRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  showDetails(order): void {
    this.selectedOrder = order;
    this.modal.open();
  }

  closeDetails(): void {
    this.modal.close();
  }

  computePrice(order:Order): number {
    return order.list.reduce((total, item) => {
      return total += item.cost * item.quantity;
    }, 0);
  }

}
