import { createAction, props, union } from "@ngrx/store";

export enum TableRow {
    DELETE = "[Table Row] Delete",
}

export const deleteRow = createAction(TableRow.DELETE, props<{ rowIndex: number }>());

const all = union({
    deleteRow,
});
export type TableActionsUnion = typeof all;
