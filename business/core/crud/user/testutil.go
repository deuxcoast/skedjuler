package user

import (
	"context"
	"fmt"
	"math/rand"
	"net/mail"
)

// TestGenerateNewUsers is a helper method for testing.
func TestGenerateNewUsers(n int, role SystemRole) []NewUser {
	newUsrs := make([]NewUser, n)

	idx := rand.Intn(10000)
	for i := 0; i < n; i++ {
		idx++

		nu := NewUser{
			Name:            fmt.Sprintf("Name%d", idx),
			Email:           mail.Address{Address: fmt.Sprintf("Email%d@gmail.com", idx)},
			SystemRoles:     []SystemRole{role},
			Password:        fmt.Sprintf("Password%d", idx),
			PasswordConfirm: fmt.Sprintf("Password%d", idx),
		}

		newUsrs[i] = nu
	}

	return newUsrs
}

// TestGenerateSeedUsers is a helper method for testing.
func TestGenerateSeedUsers(ctx context.Context, n int, role SystemRole, api *Core) ([]User, error) {
	newUsrs := TestGenerateNewUsers(n, role)

	usrs := make([]User, len(newUsrs))
	for i, nu := range newUsrs {
		usr, err := api.Create(ctx, nu)
		if err != nil {
			return nil, fmt.Errorf("seeding user: idx: %d : %w", i, err)
		}

		usrs[i] = usr
	}

	return usrs, nil
}
