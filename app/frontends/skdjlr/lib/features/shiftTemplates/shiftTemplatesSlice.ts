import { UUID } from "crypto";
import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno-2";
import { ShiftTemplate } from "@/types/global";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";

interface ShiftTemplatesState {
  entities: {
    [id: UUID]: ShiftTemplate;
  };
  ids: UUID[];
}

const shiftTemplatesData = SampleData.shiftTemplates;
const initialState: ShiftTemplatesState = shiftTemplatesData;

const shiftTemplateAdapter = createEntityAdapter({
  selectId: (shiftTemplate: ShiftTemplate) => shiftTemplate.id,
});

const shiftTemplateSlice = createSlice({
  name: "shiftTemplates",
  initialState,
  reducers: {
    addShiftTemplate: shiftTemplateAdapter.addOne,
    removeShiftTemplate: shiftTemplateAdapter.removeOne,
  },
});

export const { addShiftTemplate, removeShiftTemplate } =
  shiftTemplateSlice.actions;

export const { selectAll: selectAllShiftTemplates } =
  shiftTemplateAdapter.getSelectors<RootState>((state) => state.shiftTemplates);

// export const selectShiftTemplatesForCurrentSchedule = createSelector(
//   [selectAllShiftTemplates, selectCurrentlySelectedSchedule],
//   (shiftTemplates, currentSchedule) => {
//     const roles = currentSchedule.roles;
//     return shiftTemplates.filter((shiftTemplate) =>
//       roles.includes(shiftTemplate.roleId),
//     );
//   },
// );

export default shiftTemplateSlice.reducer;
