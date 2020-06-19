import { Component, OnInit, forwardRef, OnDestroy, EventEmitter, Output } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validators, FormControl } from "@angular/forms";

import { IDataItem } from "@models/global";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "[app-table-row]",
  templateUrl: "./app-table-row.component.html",
  styleUrls: ["./app-table-row.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppTableRowComponent),
      multi: true
    }
  ]
})
export class AppTableRowComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Output() public deleteRowEmit: EventEmitter<void> = new EventEmitter<void>();

  private _unsubscribe$: Subject<void> = new Subject<void>();

  public regExp: RegExp = new RegExp(/[a-zA-Z]/);

  public tableRowData: IDataItem = null;

  public allowEdit = false;

  public nameControl: FormControl = new FormControl(null, [Validators.required]);

  public onChange: any = (value: IDataItem) => { };

  public onTouch: any = (value: IDataItem) => { };

  constructor() { }

  ngOnInit(): void {
    this._handleNameControlChanges();
  }


  private _handleNameControlChanges(): void {
    this.nameControl.valueChanges
      .pipe(takeUntil(this._unsubscribe$))
      .subscribe((value: string) => {
        this.onChange({
          id: this.tableRowData.id,
          color: this.tableRowData.color,
          name: value
        });
      });
  }

  public onSubmit(): void {
    this.toggleAllowEdit();
    const { value } = this.nameControl;
    const { id, color } = this.tableRowData;
    this.onChange({
      id,
      color,
      name: value
    });
  }

  public toggleAllowEdit(): void {
    this.allowEdit = !this.allowEdit;
  }

  public deleteRow(): void {
    this.deleteRowEmit.emit();
  }

  public writeValue(value: IDataItem): void {
    this.tableRowData = value;
    this.nameControl.setValue(value.name);
  }

  public registerOnChange(fn: (data: IDataItem) => {}) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (data: IDataItem) => {}) {
    this.onTouch = fn;
  }

  get nameCtrlValue(): string {
    return this.nameControl.value;
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

}
