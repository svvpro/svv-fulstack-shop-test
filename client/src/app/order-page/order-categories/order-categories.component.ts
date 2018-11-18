import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../shared/services/category.service";
import {Observable} from "rxjs";
import {Category} from "../../shared/interfaces";

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
  }

}
