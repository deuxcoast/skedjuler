package role

import (
	"time"

	"github.com/google/uuid"
)

type Role struct {
	Id         uuid.UUID
	EmployeeId uuid.UUID
	BusinessId uuid.UUID

	Title       string
	CreatedDate time.Time
	UpdatedDate time.Time
	CreatedById uuid.UUID
}
