import { RootState } from "@/lib/store";
import { SampleData } from "@/sample-data/lmno";
import { Role } from "@/types/global";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UUID } from "crypto";

const rolesData = SampleData.roles;

interface RolesState {
  roles: Role[];
}

const initialState: RolesState = {
  roles: rolesData,
};

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    addRole: (state, action: PayloadAction<Role>) => {
      state.roles.push(action.payload);
    },
    removeRoleByID: (state, action: PayloadAction<UUID>) => {
      state.roles.filter((role) => role.id !== action.payload);
    },
  },
});

export const { addRole, removeRoleByID } = rolesSlice.actions;

export const selectRoleID = (state: RootState, roleID: UUID) => roleID;

export const selectRoles = (state: RootState) => state.roles.roles;

export const selectRoleNames = createSelector([selectRoles], (roles) =>
  roles.map((role) => role.name),
);

export const selectRoleNameByID = createSelector(
  [selectRoles, selectRoleID],
  (roles, id) => {
    const role = roles.find((role) => role.id === id);
    return role?.name;
  },
);

export default rolesSlice.reducer;
