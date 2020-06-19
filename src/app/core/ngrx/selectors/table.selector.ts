import { createSelector } from "@ngrx/store";
import { IDataItem } from "@models/global";

export interface AppState {
    data: {
        tableData: IDataItem[];
    };
}

export const selectTableData = (state: AppState) => {
    return state.data.tableData;
};

export const selectFeatureTableData = createSelector(
    selectTableData,
    (state: IDataItem[]) => state
);
