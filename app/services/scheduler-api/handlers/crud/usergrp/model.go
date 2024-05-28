package usergrp

import (
	"fmt"
	"net/mail"
	"time"

	"github.com/duexcoast/skedjuler/business/core/crud/user"
	"github.com/duexcoast/skedjuler/foundation/validate"
)

// AppUser represents information about an individual user.
type AppUser struct {
	Id           string   `json:"id"`
	FirstName    string   `json:"firstName"`
	LastName     string   `json:"lastName"`
	Email        string   `json:"email"`
	SystemRoles  []string `json:"systemRoles"`
	PasswordHash []byte   `json:"-"`
	Department   string   `json:"department"`
	Enabled      bool     `json:"enabled"`
	CreatedDate  string   `json:"createdDate"`
	UpdatedDate  string   `json:"updatedDate"`
}

func toAppUser(usr user.User) AppUser {
	systemRoles := make([]string, len(usr.SystemRoles))
	for i, role := range usr.SystemRoles {
		systemRoles[i] = role.Name()
	}

	return AppUser{
		Id:           usr.Id.String(),
		FirstName:    usr.FirstName,
		LastName:     usr.LastName,
		Email:        usr.Email.Address,
		SystemRoles:  systemRoles,
		PasswordHash: usr.PasswordHash,
		Department:   usr.Department,
		Enabled:      usr.Enabled,
		CreatedDate:  usr.CreatedDate.Format(time.RFC3339),
		UpdatedDate:  usr.UpdatedDate.Format(time.RFC3339),
	}
}

func toAppUsers(users []user.User) []AppUser {
	items := make([]AppUser, len(users))
	for i, usr := range users {
		items[i] = toAppUser(usr)
	}

	return items
}

// AppNewUser defines the data needed to add a new user.
type AppNewUser struct {
	Name            string   `json:"name" validate:"required"`
	Email           string   `json:"email" validate:"required,email"`
	Roles           []string `json:"roles" validate:"required"`
	Department      string   `json:"department"`
	Password        string   `json:"password" validate:"required"`
	PasswordConfirm string   `json:"passwordConfirm" validate:"eqfield=Password"`
}

func toCoreNewUser(app AppNewUser) (user.NewUser, error) {
	systemRoles := make([]user.SystemRole, len(app.Roles))
	for i, roleStr := range app.Roles {
		role, err := user.ParseRole(roleStr)
		if err != nil {
			return user.NewUser{}, fmt.Errorf("parse: %w", err)
		}
		systemRoles[i] = role
	}

	addr, err := mail.ParseAddress(app.Email)
	if err != nil {
		return user.NewUser{}, fmt.Errorf("parse: %w", err)
	}

	usr := user.NewUser{
		Name:            app.Name,
		Email:           *addr,
		SystemRoles:     systemRoles,
		Password:        app.Password,
		PasswordConfirm: app.PasswordConfirm,
	}

	return usr, nil
}

// Validate checks the data in the model is considered clean.
func (app AppNewUser) Validate() error {
	if err := validate.Check(app); err != nil {
		return err
	}

	return nil
}

// AppUpdateUser defines the data needed to update a user.
type AppUpdateUser struct {
	Name            *string  `json:"name"`
	Email           *string  `json:"email" validate:"omitempty,email"`
	Roles           []string `json:"roles"`
	Department      *string  `json:"department"`
	Password        *string  `json:"password"`
	PasswordConfirm *string  `json:"passwordConfirm" validate:"omitempty,eqfield=Password"`
	Enabled         *bool    `json:"enabled"`
}

func toCoreUpdateUser(app AppUpdateUser) (user.UpdateUser, error) {
	var systemRoles []user.SystemRole
	if app.Roles != nil {
		systemRoles = make([]user.SystemRole, len(app.Roles))
		for i, roleStr := range app.Roles {
			role, err := user.ParseRole(roleStr)
			if err != nil {
				return user.UpdateUser{}, fmt.Errorf("parse: %w", err)
			}
			systemRoles[i] = role
		}
	}

	var addr *mail.Address
	if app.Email != nil {
		var err error
		addr, err = mail.ParseAddress(*app.Email)
		if err != nil {
			return user.UpdateUser{}, fmt.Errorf("parse: %w", err)
		}
	}

	nu := user.UpdateUser{
		Name:            app.Name,
		Email:           addr,
		SystemRoles:     systemRoles,
		Password:        app.Password,
		PasswordConfirm: app.PasswordConfirm,
		Enabled:         app.Enabled,
	}

	return nu, nil
}

// Validate checks the data in the model is considered clean.
func (app AppUpdateUser) Validate() error {
	if err := validate.Check(app); err != nil {
		return fmt.Errorf("validate: %w", err)
	}

	return nil
}

type token struct {
	Token string `json:"token"`
}

func toToken(v string) token {
	return token{
		Token: v,
	}
}
