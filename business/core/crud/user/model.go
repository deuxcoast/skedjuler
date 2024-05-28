package user

import (
	"net/mail"
	"net/url"
	"time"

	"github.com/google/uuid"
)

// User represents information about an individual user.
type User struct {
	Id           uuid.UUID
	FirstName    string
	LastName     string
	SystemRoles  []SystemRole
	Email        mail.Address
	ImageUrl     url.URL
	BusinessId   uuid.UUID
	PasswordHash []byte
	Department   string
	Enabled      bool
	CreatedDate  time.Time
	UpdatedDate  time.Time
}

// NewUser contains information needed to create a new user.
type NewUser struct {
	Name            string
	Email           mail.Address
	SystemRoles     []SystemRole
	Password        string
	PasswordConfirm string
}

// UpdateUser contains information needed to update a user.
type UpdateUser struct {
	Name            *string
	Email           *mail.Address
	SystemRoles     []SystemRole
	Password        *string
	PasswordConfirm *string
	Enabled         *bool
}
