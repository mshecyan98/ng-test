import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormBuilder, FormArray, AbstractControl, FormControl } from "@angular/forms";

import { IDataItem } from "@models/global";

import { Store, select } from "@ngrx/store";
import { deleteRow } from "@ngrx/actions/table.action";
import { selectFeatureTableData } from "@ngrx/selectors/table.selector";
import { TableEffects } from "@ngrx/effects/table.effects";

import { takeUntil, filter, first } from "rxjs/operators";
import { Subject, Subscription } from "rxjs";

@Component({
  selector: "app-main-view",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"]
})
export class MainViewComponent implements OnInit, OnDestroy {
  private _tableDataSubscription: Subscription = new Subscription();
  private _unsubscribe$: Subject<void> = new Subject<void>();

  public dataForm: FormArray;

  public dataSource: IDataItem[] = null;

  constructor(
    private _fb: FormBuilder,
    private _store: Store<{ data: { tableData: IDataItem[] } }>,
    private _tableEffects: TableEffects
  ) {
  }

  ngOnInit() {
    this._initForm();
    this._initState();
    this._handleDeleteEvent();
  }

  private _initState(): void {
    this._tableDataSubscription = this._store.pipe(
      select(selectFeatureTableData),
      takeUntil(this._unsubscribe$),
      first()
    ).subscribe((data) => {
      this.dataSource = data;
      this._setFormArrayControls();
      this._tableDataSubscription.unsubscribe();
    });
  }

  private _initForm(): void {
    this.dataForm = this._fb.array([]);
  }

  private _handleDeleteEvent(): void {
    this._tableEffects.deleteRow$
      .pipe(
        filter(action => action.type === "DELETE_ROW_SUCCESS"),
        takeUntil(this._unsubscribe$)
      )
      .subscribe((data) => {
        const { rowIndex } = data.payload;
        const controls = this.dataForm.controls;
        controls.splice(rowIndex, 1);
      });
  }

  private _setFormArrayControls(): void {
    const controls: AbstractControl[] = this.dataSource.map((element, index) => {
      return new FormControl({
        id: element.id,
        name: element.name,
        color: element.color
      });
    });
    this.dataForm.controls = controls;
  }

  public deleteTableRow(index: number): void {
    this._store.dispatch(deleteRow({ rowIndex: index }));
  }

  get controls(): AbstractControl[] {
    return this.dataForm.controls;
  }

  ngOnDestroy() {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }
}

