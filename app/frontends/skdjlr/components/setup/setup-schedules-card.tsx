import SetupCardWrapper from "./setup-card-wrapper";
import SetupSchedulesForm from "./setup-schedules-form";

export default function SetupSchedulesCard() {
  const headerLabel = "What schedules are you responsible for making?";
  const subHeaderLabel =
    "If you manage multiple schedules separately, give names to the schedules here. For example, if you create separate schedules for Servers and Bussers, we can create those schedules now.";
  return (
    <SetupCardWrapper headerLabel={headerLabel} subHeaderLabel={subHeaderLabel}>
      <SetupSchedulesForm />
    </SetupCardWrapper>
  );
}
