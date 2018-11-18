import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Category} from "../shared/interfaces";
import {CategoryService} from "../shared/services/category.service";

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.scss']
})
export class CategoryPageComponent implements OnInit {

  categories$: Observable<Category[]>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getAll();
  }

}
