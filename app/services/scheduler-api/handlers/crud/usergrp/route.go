package usergrp

import (
	"net/http"

	"github.com/duexcoast/skedjuler/business/core/crud/delegate"
	"github.com/duexcoast/skedjuler/business/core/crud/user"
	"github.com/duexcoast/skedjuler/business/core/crud/user/stores/usercache"
	"github.com/duexcoast/skedjuler/business/core/crud/user/stores/userdb"
	"github.com/duexcoast/skedjuler/business/web/auth"
	"github.com/duexcoast/skedjuler/business/web/mid"
	"github.com/duexcoast/skedjuler/foundation/logger"
	"github.com/duexcoast/skedjuler/foundation/web"
	"github.com/jmoiron/sqlx"
)

// Config contains all the mandatory systems required by handlers.
type Config struct {
	Log      *logger.Logger
	Delegate *delegate.Delegate
	Auth     *auth.Auth
	DB       *sqlx.DB
}

// Routes adds specific routes for this group.
func Routes(app *web.App, cfg Config) {
	const version = "v1"

	userCore := user.NewCore(cfg.Log, cfg.Delegate, usercache.NewStore(cfg.Log, userdb.NewStore(cfg.Log, cfg.DB)))

	authen := mid.Authenticate(cfg.Auth)
	ruleAdmin := mid.Authorize(cfg.Auth, auth.RuleAdminOnly)
	ruleAuthorizeUser := mid.AuthorizeUser(cfg.Auth, userCore)

	hdl := new(userCore, cfg.Auth)
	app.Handle(http.MethodGet, version, "/users/token/{kid}", hdl.token)
	app.Handle(http.MethodGet, version, "/users", hdl.query, authen, ruleAdmin)
	app.Handle(http.MethodGet, version, "/users/{user_id}", hdl.queryByID, authen, ruleAuthorizeUser)
	app.Handle(http.MethodPost, version, "/users", hdl.create, authen, ruleAdmin)
	app.Handle(http.MethodPut, version, "/users/{user_id}", hdl.update, authen, ruleAuthorizeUser)
	app.Handle(http.MethodDelete, version, "/users/{user_id}", hdl.delete, authen, ruleAuthorizeUser)
}
