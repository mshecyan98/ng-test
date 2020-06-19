import { createReducer, on } from "@ngrx/store";
import { deleteRow, TableRow } from "@ngrx/actions/table.action";

import { TABLE_DATA } from "@db/fake-db";

export const initialState = {
    tableData: TABLE_DATA
};

const _tableReducer = createReducer(initialState,
    on(deleteRow, (state, action) => {
        const tableData = [...state.tableData];
        tableData.splice(action.rowIndex, 1);
        return {
            ...state,
            tableData
        };
    })
);

export function tableReducer(state, action) {
    return _tableReducer(state, action);
}
