package user

import (
	"net/mail"
	"net/url"
	"time"

	"github.com/google/uuid"
)

// User represents information about an individual user.
type User struct {
	Id          uuid.UUID
	FirstName   string
	LastName    string
	SystemRoles []Role
	Email       mail.Address
	ImageUrl    url.URL
	// TODO: how do I do stuff like foreign keys. How do I explain the
	// relationship to a business_id

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
