import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PositionService} from "../../../shared/services/position.service";
import {MaterializeService, ModalInstance} from "../../../shared/classes/materialize.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Position} from "../../../shared/interfaces";

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.scss']
})
export class PositionFormComponent implements OnInit, OnDestroy, AfterViewInit {

  form: FormGroup;
  modal: ModalInstance;
  loading: boolean = true;
  positions: Position[];
  selectedPosition: Position;
  @Input() categoryId: string;
  @ViewChild('modalForm') modalFormRef: ElementRef;

  constructor(private positionService: PositionService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      cost: new FormControl(0, Validators.required)
    });

    this.positionService.getAll(this.categoryId).subscribe(
      (positions: Position[]) => {
        this.positions = positions;
        this.loading = false;
      }
    );
  }

  ngAfterViewInit(): void {
    this.modal = MaterializeService.modalInit(this.modalFormRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  createPositionForm(): void {
    this.modal.open();
    this.form.reset({
      name: null,
      cost: 0
    });
    MaterializeService.updateTextFields();
  }

  updatePositionForm(position: Position): void {
    this.modal.open();

    this.form.setValue({
      name: position.name,
      cost: position.cost
    });
    this.selectedPosition = position;
    MaterializeService.updateTextFields();
  }

  closePositionForm(): void {
    this.modal.close();
  }

  submit(): void {
    const position:Position = {
     name: this.form.value.name,
     cost: this.form.value.cost,
     category: this.categoryId
    };

    if (this.selectedPosition) {
      this.positionService.update(this.selectedPosition._id, position).subscribe(
        (position: Position) => {
          const idx = this.positions.findIndex((p) => p._id === position._id);
          this.positions[idx] = position;
          MaterializeService.toast('Changes saved');
          this.modal.close();
        },
        error => MaterializeService.toast(error.error.message)
      );
    }else {
      this.positionService.add(position).subscribe(
        (position) => {
          this.positions.push(position);
          MaterializeService.toast('Changes saved');
          this.modal.close();
        },
        error => MaterializeService.toast(error.error.message)
      );

    }
  }

  delete(event: Event, position: Position): void {
    event.stopPropagation();
    this.positionService.delete(position._id).subscribe(
      ({message}) => {
        const idx = this.positions.findIndex((p) => p._id === position._id);
        this.positions.splice(idx, 1);
        MaterializeService.toast(message);
      },
      error => MaterializeService.toast(error.error.message)
    )
  }

}
