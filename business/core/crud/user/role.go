package user

import "fmt"

// Set of possible roles for a user.
var (
	RoleAdmin = SystemRole{"ADMIN"}
	RoleUser  = SystemRole{"USER"}
)

// Set of known roles.
var roles = map[string]SystemRole{
	RoleAdmin.name: RoleAdmin,
	RoleUser.name:  RoleUser,
}

// SystemRole represents a role in the system.
type SystemRole struct {
	name string
}

// ParseRole parses the string value and returns a role if one exists.
func ParseRole(value string) (SystemRole, error) {
	role, exists := roles[value]
	if !exists {
		return SystemRole{}, fmt.Errorf("invalid role %q", value)
	}

	return role, nil
}

// MustParseRole parses the string value and returns a role if one exists. If
// an error occurs the function panics.
func MustParseRole(value string) SystemRole {
	role, err := ParseRole(value)
	if err != nil {
		panic(err)
	}

	return role
}

// Name returns the name of the role.
func (r SystemRole) Name() string {
	return r.name
}

// UnmarshalText implement the unmarshal interface for JSON conversions.
func (r *SystemRole) UnmarshalText(data []byte) error {
	role, err := ParseRole(string(data))
	if err != nil {
		return err
	}

	r.name = role.name
	return nil
}

// MarshalText implement the marshal interface for JSON conversions.
func (r SystemRole) MarshalText() ([]byte, error) {
	return []byte(r.name), nil
}

// Equal provides support for the go-cmp package and testing.
func (r SystemRole) Equal(r2 SystemRole) bool {
	return r.name == r2.name
}
