import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CategoryService} from "../../shared/services/category.service";
import {Observable, of} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/operators";
import {MaterializeService} from "../../shared/classes/materialize.service";
import {Category} from "../../shared/interfaces";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form: FormGroup;
  isNew: boolean = true;
  image: File;
  imagePreview: string | ArrayBuffer = '';
  selectedCategory: Category;

  @ViewChild('formUpload') formUploadRef: ElementRef;

  constructor(private categoryService: CategoryService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          return this.categoryService.getById(params['id']);
        }
        return of(null);
      })
    ).subscribe((category) => {
      if (category) {
        this.form.setValue({
          name: category.name
        });
        this.imagePreview = category.imageSrc;
        this.isNew = false;
        this.selectedCategory = category;
        MaterializeService.updateTextFields();
      } else {
        this.form.reset({
          name: null
        });
        this.isNew = false;
      }
    })
  }

  submit(): void {
    this.form.disable();

    let obs$;

    if (this.isNew) {
      obs$ = this.categoryService.add(this.form.value.name, this.image);
    } else {
      obs$ = this.categoryService.update(this.selectedCategory._id, this.form.value.name, this.image);
    }

    obs$.subscribe(
      () => {
        this.router.navigate(['/category']);
        MaterializeService.toast('Changes saved');
      },
      error => MaterializeService.toast(error.error.message),
      () => this.form.enable()
    );
  }

  delete(): void {
    this.categoryService.delete(this.selectedCategory._id).subscribe(
      ({message}) => {
        this.router.navigate(['/category']);
        MaterializeService.toast(message);
      },
      error => MaterializeService.toast(error.error.message)
    );
  }

  private showUploadForm(): void {
    this.formUploadRef.nativeElement.click();
  }

  private uploadImage(event): void {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }


}
