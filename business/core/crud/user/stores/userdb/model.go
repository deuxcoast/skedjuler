package userdb

import (
	"fmt"
	"net/mail"
	"time"

	"github.com/duexcoast/skedjuler/business/core/crud/user"
	"github.com/duexcoast/skedjuler/business/data/sqldb/dbarray"
	"github.com/google/uuid"
)

type dbUser struct {
	Id           uuid.UUID      `db:"user_id"`
	FirstName    string         `db:"first_name"`
	LastName     string         `db:"last_name"`
	Email        string         `db:"email"`
	SystemRoles  dbarray.String `db:"system_roles"`
	PasswordHash []byte         `db:"password_hash"`
	Enabled      bool           `db:"enabled"`
	CreatedDate  time.Time      `db:"created_date"`
	UpdatedDate  time.Time      `db:"updated_date"`
}

func toDBUser(usr user.User) dbUser {
	systemRoles := make([]string, len(usr.SystemRoles))
	for i, role := range usr.SystemRoles {
		systemRoles[i] = role.Name()
	}

	return dbUser{
		Id:           usr.Id,
		FirstName:    usr.FirstName,
		LastName:     usr.LastName,
		Email:        usr.Email.Address,
		SystemRoles:  systemRoles,
		PasswordHash: usr.PasswordHash,
		Enabled:      usr.Enabled,
		CreatedDate:  usr.CreatedDate.UTC(),
		UpdatedDate:  usr.UpdatedDate.UTC(),
	}
}

func toCoreUser(dbUsr dbUser) (user.User, error) {
	addr := mail.Address{
		Address: dbUsr.Email,
	}

	systemRoles := make([]user.SystemRole, len(dbUsr.SystemRoles))
	for i, value := range dbUsr.SystemRoles {
		var err error
		systemRoles[i], err = user.ParseRole(value)
		if err != nil {
			return user.User{}, fmt.Errorf("parse role: %w", err)
		}
	}

	usr := user.User{
		Id:           dbUsr.Id,
		FirstName:    dbUsr.FirstName,
		LastName:     dbUsr.LastName,
		Email:        addr,
		SystemRoles:  systemRoles,
		PasswordHash: dbUsr.PasswordHash,
		Enabled:      dbUsr.Enabled,
		// TODO: Do we want to store the created date in local time here?
		// Wouldn't UTC be better?
		CreatedDate: dbUsr.CreatedDate.In(time.Local),
		UpdatedDate: dbUsr.UpdatedDate.In(time.Local),
	}

	return usr, nil
}

func toCoreUserSlice(dbUsers []dbUser) ([]user.User, error) {
	usrs := make([]user.User, len(dbUsers))

	for i, dbUsr := range dbUsers {
		var err error
		usrs[i], err = toCoreUser(dbUsr)
		if err != nil {
			return nil, err
		}
	}

	return usrs, nil
}
