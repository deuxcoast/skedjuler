import SetupCardWrapper from "./setup-card-wrapper";
import SetupRolesForm from "./setup-roles-form";

export default function SetupRolesCard() {
  const headerLabel =
    "What are the different jobs you schedule your team members for?";
  const subHeaderLabel =
    "If you manage multiple roles within the same schedule then we can coordinate that here. If you have a separate schedule for each role, then just click the checkbox below.";
  return (
    <SetupCardWrapper headerLabel={headerLabel} subHeaderLabel={subHeaderLabel}>
      <SetupRolesForm />
    </SetupCardWrapper>
  );
}
