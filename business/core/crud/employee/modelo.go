package employee

import (
	"net/mail"
	"time"

	"github.com/google/uuid"
)

// Employee represents information about an individual employee
type Employee struct {
	Id         uuid.UUID
	UserId     uuid.UUID
	BusinessId uuid.UUID

	FirstName     string
	LastName      string
	PreferredName string
	Email         mail.Address
	PhoneNumber   string
	HourlyWage    float64
	DateCreated   time.Time
	DateUpdated   time.Time
}
