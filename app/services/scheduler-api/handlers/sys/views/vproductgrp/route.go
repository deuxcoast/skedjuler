package vproductgrp

import (
	"net/http"

	"github.com/duexcoast/skedjuler/business/core/views/vproduct"
	"github.com/duexcoast/skedjuler/business/core/views/vproduct/stores/vproductdb"
	"github.com/duexcoast/skedjuler/business/web/auth"
	"github.com/duexcoast/skedjuler/business/web/mid"
	"github.com/duexcoast/skedjuler/foundation/logger"
	"github.com/duexcoast/skedjuler/foundation/web"
	"github.com/jmoiron/sqlx"
)

// Config contains all the mandatory systems required by handlers.
type Config struct {
	Log  *logger.Logger
	Auth *auth.Auth
	DB   *sqlx.DB
}

// Routes adds specific routes for this group.
func Routes(app *web.App, cfg Config) {
	const version = "v1"

	vproductCore := vproduct.NewCore(vproductdb.NewStore(cfg.Log, cfg.DB))

	authen := mid.Authenticate(cfg.Auth)
	ruleAdmin := mid.Authorize(cfg.Auth, auth.RuleAdminOnly)

	hdl := new(vproductCore)
	app.Handle(http.MethodGet, version, "/vproducts", hdl.Query, authen, ruleAdmin)
}
