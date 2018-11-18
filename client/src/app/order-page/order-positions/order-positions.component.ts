import {Component, OnInit} from '@angular/core';
import {PositionService} from "../../shared/services/position.service";
import {Observable} from "rxjs";
import {Position} from "../../shared/interfaces";
import {ActivatedRoute, Params} from "@angular/router";
import {map, switchMap} from "rxjs/operators";
import {OrderService} from "../../shared/services/order.service";
import {MaterializeService} from "../../shared/classes/materialize.service";

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>;

  constructor(private positionService: PositionService, private orderService: OrderService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionService.getAll(params['id']);
      }),
      map((positions) => {
        return positions.map((position) => {
          position.quantity = 1;
          return position;
        })
      })
    );
  }

  addToCard(position: Position): void {
    this.orderService.add(position);
    MaterializeService.toast('Position added to card');
  }
}
