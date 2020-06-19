import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TableRow, TableActionsUnion } from "@ngrx/actions/table.action";

import { map, share } from "rxjs/operators";


@Injectable()
export class TableEffects {
    deleteRow$ = createEffect(() =>
        this.actions$.pipe(
            ofType(TableRow.DELETE),
            share(),
            map((action) =>
                ({ type: "DELETE_ROW_SUCCESS", payload: action })
            )
        )
    );

    constructor(
        private actions$: Actions<TableActionsUnion>,
    ) { }
}
