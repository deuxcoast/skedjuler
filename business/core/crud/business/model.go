package business

import (
	"net/url"
	"time"

	"github.com/google/uuid"
)

type Business struct {
	Id           uuid.UUID
	Name         string
	IndustryId   uuid.UUID
	TimeZone     string
	Address1     string
	Address2     string
	ZipCode      string
	City         string
	State        string
	Country      string
	GmapsPlaceId string
	ImageUrl     url.URL
	CreatedDate  time.Time
	UpdatedDate  time.Time
	CreatedById  uuid.UUID
}
