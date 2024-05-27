package shifttemplate

import (
	"time"

	"github.com/google/uuid"
)

type ShiftTemplate struct {
	Id          uuid.UUID
	RoleId      uuid.UUID
	StartTime   time.Time
	EndTime     time.Time
	CreatedDate time.Time
	UpdatedDate time.Time
}

type NewShiftTemplate struct {
	Id        uuid.UUID
	RoleId    uuid.UUID
	StartTime time.Time
	EndTime   time.Time
}
type UpdateShiftTemplate struct {
	RoleId    *uuid.UUID
	StartTime *time.Time
	EndTime   *time.Time
}
