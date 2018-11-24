import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {DatePickerInstance, MaterializeService} from "../../shared/classes/materialize.service";
import {Filter} from "../../shared/interfaces";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {

  order: number;
  isValid: boolean = true;
  start: DatePickerInstance;
  end: DatePickerInstance;

  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;
  @Output() onFilter: EventEmitter<Filter> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.start = MaterializeService.datePickerInstance(this.startRef, this.validate.bind(this));
    this.end = MaterializeService.datePickerInstance(this.endRef, this.validate.bind(this));
  }

  ngOnDestroy(): void {
    this.start.destroy();
    this.end.destroy();
  }

  private validate(): boolean {
    if (!this.start.date || !this.end.date) {
      this.isValid = true;
      return
    }
    this.isValid = this.start.date < this.end.date;
  }

  applyFilter() {
    const filter: Filter = {};

    if (this.order) {
      filter.order = this.order;
    }

    if (this.start.date) {
      filter.start = this.start.date;
    }

    if (this.end.date) {
      filter.end = this.end.date;
    }

    return this.onFilter.emit(filter);
  }

}
