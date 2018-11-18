import {Injectable} from '@angular/core';
import {OrderPosition, Position} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  list: OrderPosition[] = [];
  price: number = 0;

  constructor() {
  }

  add(position: Position): void {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: position.cost,
      quantity: position.quantity,
      _id: position._id
    });

    const candidate = this.list.find((p) => p._id === orderPosition._id);

    if (candidate) {
      candidate.quantity += orderPosition.quantity;
    } else {
      this.list.push(orderPosition);
    }

    this.computePrice();
  }

  remove(position: Position): void {
    const idx = this.list.findIndex((p) => p._id === position._id);
    this.list.splice(idx, 1);

    this.computePrice();
  }

  clear(): void {
    this.list = [];
    this.price = 0;
  }

  private computePrice(): void {
    this.price = this.list.reduce((total, item) => {
      return total += item.quantity * item.cost;
    }, 0);
  }
}
