# Check to see if we can use ash, in Alpine images, or default to BASH.
SHELL_PATH = /bin/ash
SHELL = $(if $(wildcard $(SHELL_PATH)),/bin/ash,/bin/bash)

# ==============================================================================
# Define dependencies

GOLANG          := golang:1.22
ALPINE          := alpine:3.19
KIND            := kindest/node:v1.29.2
POSTGRES        := postgres:16.2
GRAFANA         := grafana/grafana:10.4.0
PROMETHEUS      := prom/prometheus:v2.51.0
TEMPO           := grafana/tempo:2.4.0
LOKI            := grafana/loki:2.9.0
PROMTAIL        := grafana/promtail:2.9.0

APP             := scheduler
BASE_IMAGE_NAME := localhost/duexcoast/service
SERVICE_NAME    := scheduler-api
VERSION         := 0.0.1
SERVICE_IMAGE   := $(BASE_IMAGE_NAME)/$(SERVICE_NAME):$(VERSION)
# METRICS_IMAGE   := $(BASE_IMAGE_NAME)/$(SERVICE_NAME)-metrics:$(VERSION)

dev-gotooling:
	go install github.com/divan/expvarmon@latest
	go install github.com/rakyll/hey@latest
	go install honnef.co/go/tools/cmd/staticcheck@latest
	go install golang.org/x/vuln/cmd/govulncheck@latest
	go install golang.org/x/tools/cmd/goimports@latest

dev-brew:
	brew update
	brew list pgcli || brew install pgcli
	brew list watch || brew instal watch

dev-docker:
	docker pull $(GOLANG)
	docker pull $(ALPINE)
	# docker pull $(KIND)
	docker pull $(POSTGRES)
	# docker pull $(GRAFANA)
	# docker pull $(PROMETHEUS)
	# docker pull $(TEMPO)
	# docker pull $(LOKI)
	# docker pull $(PROMTAIL)

# ==============================================================================
# Building containers

all: service

service:
	docker build \
		-f zarf/docker/Dockerfile.service \
		-t $(SERVICE_IMAGE) \
		--build-arg BUILD_REF=$(VERSION) \
		--build-arg BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \
		.

dev-compose-build:
	docker compose up --build \
		--build-arg BUILD_REF=$(VERSION) \
		--build-arg BUILD_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ") \

dev-compose-up:
	docker compose up
	
dev-compose-down:
	docker compose down

# ==============================================================================
# Administration

migrate:
	export SALES_DB_HOST_PORT=localhost; go run app/tooling/scheduler-admin/main.go migrate

seed: migrate
	export SALES_DB_HOST_PORT=localhost; go run app/tooling/scheduler-admin/main.go seed

pgcli:
	pgcli postgresql://postgres:postgres@localhost

liveness:
	curl -il http://localhost:4000/v1/liveness

readiness:
	curl -il http://localhost:4000/v1/readiness

token-gen:
	export SALES_DB_HOST_PORT=localhost; go run app/tooling/scheduler-admin/main.go gentoken 5cf37266-3473-4006-984f-9325122678b7 54bb2165-71e1-41a6-af3e-7da4a0e1e2c1

docs:
	go run app/tooling/docs/main.go --browser

query-local:
	@curl -s "http://localhost:4000/users?page=1&rows=2&orderBy=name,ASC"


# ==============================================================================
# Modules support

deps-reset:
	git checkout -- go.mod
	go mod tidy
	go mod vendor

tidy:
	go mod tidy
	go mod vendor

deps-list:
	go list -m -u -mod=readonly all

deps-upgrade:
	go get -u -v ./...
	go mod tidy
	go mod vendor

deps-cleancache:
	go clean -modcache

list:
	go list -mod=mod all

# ==============================================================================
# Hitting endpoints

token:
	curl -il \
	--user "admin@example.com:gophers" http://localhost:4000/v1/users/token/54bb2165-71e1-41a6-af3e-7da4a0e1e2c1

# export TOKEN="COPY TOKEN STRING FROM LAST CALL"

users:
	curl -il \
	-H "Authorization: Bearer ${TOKEN}" "http://localhost:4000/v1/users?page=1&rows=2"

load:
	hey -m GET -c 100 -n 1000 \
	-H "Authorization: Bearer ${TOKEN}" "http://localhost:4000/v1/users?page=1&rows=2"

otel-test:
	curl -il \
	-H "Traceparent: 00-918dd5ecf264712262b68cf2ef8b5239-896d90f23f69f006-01" \
	--user "admin@example.com:gophers" http://localhost:4000/v1/users/token/54bb2165-71e1-41a6-af3e-7da4a0e1e2c1



# ==============================================================================
# Class Stuff

run:
	go run app/services/scheduler-api/main.go | go run app/tooling/logfmt/main.go

run-help:
	go run app/services/scheduler-api/main.go --help | go run app/tooling/logfmt/main.go

live:
	curl -il http://localhost:4000/v1/liveness

curl-create:
	curl -il -X POST \
	-H "Authorization: Bearer ${TOKEN}" \
	-H 'Content-Type: application/json' \
	-d '{"name":"bill","email":"b@gmail.com","roles":["ADMIN"],"department":"IT","password":"123","passwordConfirm":"123"}' \
	http://localhost:4000/v1/users

