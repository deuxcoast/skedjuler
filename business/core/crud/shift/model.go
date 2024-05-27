package shift

import (
	"net/mail"
	"time"

	"github.com/google/uuid"
)

// User represents information about an individual user.
type Shift struct {
	ID            uuid.UUID
	EmployeeId    uuid.UUID
	RoleId        uuid.UUID
	StartDate     time.Time
	EndDate       time.Time
	StartTime     time.Time
	EndTime       time.Time
	Published     bool
	PublishedById uuid.UUID
	PublishedDate time.Time
	IsRecurring   bool
	CreatedById   uuid.UUID
	ParentShiftId uuid.UUID
	DateCreated   time.Time
	DateUpdated   time.Time
}

// NewUser contains information needed to create a new user.
type NewUser struct {
	Name            string
	Email           mail.Address
	Roles           []Role
	Department      string
	Password        string
	PasswordConfirm string
}

// UpdateUser contains information needed to update a user.
type UpdateUser struct {
	Name            *string
	Email           *mail.Address
	Roles           []Role
	Department      *string
	Password        *string
	PasswordConfirm *string
	Enabled         *bool
}
