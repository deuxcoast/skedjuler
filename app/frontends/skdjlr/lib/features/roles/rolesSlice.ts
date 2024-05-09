import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno-2";
import { Role } from "@/types/global";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { UUID } from "crypto";

interface RolesState {
  entities: {
    [id: UUID]: Role;
  };
  ids: UUID[];
}

const rolesData = SampleData.roles;
const initialState: RolesState = rolesData;

const rolesAdapter = createEntityAdapter({
  selectId: (role: Role) => role.id,
});

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    addRole: rolesAdapter.addOne,
    removeRole: rolesAdapter.removeOne,
  },
});

export const { addRole, removeRole } = rolesSlice.actions;

export const { selectById: selectRoleById, selectAll: selectRoles } =
  rolesAdapter.getSelectors<RootState>((state) => state.roles);

// export const selectRoleId = (_: RootState, roleId: UUID) => roleId;

// export const selectRoles = (state: RootState) => state.roles.roles;

export const selectRoleNames = createSelector([selectRoles], (roles) =>
  roles.map((role) => role.name),
);

// export const selectRoleNameById = createSelector(
//   [selectRoles, selectRoleId],
//   (roles, id) => {
//     const role = roles.find((role) => role.id === id);
//     return role?.name;
//   },
// );

export default rolesSlice.reducer;
