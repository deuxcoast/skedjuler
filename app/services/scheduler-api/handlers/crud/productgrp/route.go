package productgrp

import (
	"net/http"

	"github.com/duexcoast/skedjuler/business/core/crud/delegate"
	"github.com/duexcoast/skedjuler/business/core/crud/product"
	"github.com/duexcoast/skedjuler/business/core/crud/product/stores/productdb"
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
	productCore := product.NewCore(cfg.Log, userCore, cfg.Delegate, productdb.NewStore(cfg.Log, cfg.DB))

	authen := mid.Authenticate(cfg.Auth)
	ruleAny := mid.Authorize(cfg.Auth, auth.RuleAny)
	ruleUserOnly := mid.Authorize(cfg.Auth, auth.RuleUserOnly)
	ruleAuthorizeProduct := mid.AuthorizeProduct(cfg.Auth, productCore)

	hdl := new(productCore)
	app.Handle(http.MethodGet, version, "/products", hdl.query, authen, ruleAny)
	app.Handle(http.MethodGet, version, "/products/{product_id}", hdl.queryByID, authen, ruleAuthorizeProduct)
	app.Handle(http.MethodPost, version, "/products", hdl.create, authen, ruleUserOnly)
	app.Handle(http.MethodPut, version, "/products/{product_id}", hdl.update, authen, ruleAuthorizeProduct)
	app.Handle(http.MethodDelete, version, "/products/{product_id}", hdl.delete, authen, ruleAuthorizeProduct)
}
