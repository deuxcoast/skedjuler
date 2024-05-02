-- Version: 1.01
-- Description: Create table users
CREATE TABLE IF NOT EXISTS user (
	user_id       UUID        NOT NULL,
    system_roles  TEXT[]      NOT NULL,
	first_name    TEXT        NOT NULL,
    last_name     TEXT        NOT NULL,
	email         TEXT UNIQUE NOT NULL,
    image_url     TEXT        NULL,
    business_id   UUID        NOT NULL,
	password_hash TEXT        NOT NULL,
    enabled       BOOLEAN     NOT NULL,
	date_created  TIMESTAMPTZ NOT NULL,
	date_updated  TIMESTAMPTZ NOT NULL,

	PRIMARY KEY (user_id),
    FOREIGN KEY (business_id) REFERENCES business(business_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employee (
    employee_id       UUID           NOT NULL,
    user_id           UUID           NULL,
    first_name        TEXT           NOT NULL,
    last_name         TEXT           NOT NULL,
    preferred_name    TEXT           NOT NULL,
    business_id       UUID           NOT NULL,
    email             TEXT  UNIQUE   NOT NULL,
    phone_number      TEXT           NULL,
    hourly_wage       NUMERIC(12, 2) NULL,
    date_created      TIMESTAMPTZ    NOT NULL,
    date_updated      TIMESTAMPTZ    NOT NULL,
    created_by        UUID           NOT NULL,


    PRIMARY KEY (employee_id),
    CONSTRAINT hourly_wage_positive CHECK (hourly_wage > 0),
    FOREIGN KEY (user_id) REFERENCES user(user_id) ON DELETE CASCADE,
    FOREIGN KEY (business_id) REFERENCES business(business_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by) REFERENCES user(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS employee_role (
    employee_role_id  UUID         NOT NULL,
    role_title        TEXT         NOT NULL,
    employee_id       UUID         NOT NULL,
    business_id       UUID         NOT NULL,
    date_created      TIMESTAMPTZ  NOT NULL,
    date_updated      TIMESTAMPTZ  NOT NULL,
    created_by        UUID         NOT NULL,

    PRIMARY KEY (employee_role_id),
    FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
    FOREIGN KEY (business_id) REFERENCES business(business_id),
    FOREIGN KEY (created_by)  REFERENCES user(user_id)
);



CREATE TABLE IF NOT EXISTS business (
    business_id     UUID         NOT NULL,
    business_name   TEXT         NOT NULL,
    industry_id     UUID         NOT NULL,
    timezone        TEXT         NOT NULL,
    address_1       TEXT         NOT NULL,
    address_2       TEXT         NULL,
    zip_code        TEXT         NOT NULL,
    city            TEXT         NOT NULL,
    state           TEXT         NOT NULL,
    country         TEXT         NOT NULL,
    gmaps_place_id  TEXT         NULL, 
    image_url       TEXT         NULL,
    created_date    TIMESTAMPTZ  NOT NULL,
    updated_date    TIMESTAMPTZ  NOT NULL,
    created_by      UUID         NOT NULL,
    

    PRIMARY KEY (business_id),
    FOREIGN KEY (industry_id) REFERENCES industry(industry_id) ON DELETE CASCADE,
    FOREIGN KEY (created_by)  REFERENVES user(user_id) ON DELETE CASCADE,
    CONSTRAINT valid_timezone CHECK (now() AT TIMEZONE timezone IS NOT NULL)
)

-- Version: 1.02
-- Description: Create table products
CREATE TABLE IF NOT EXISTS products (
	product_id   UUID           NOT NULL,
    user_id      UUID           NOT NULL,
	name         TEXT           NOT NULL,
    cost         NUMERIC(10, 2) NOT NULL,
	quantity     INT            NOT NULL,
	date_created TIMESTAMP      NOT NULL,
	date_updated TIMESTAMP      NOT NULL,

	PRIMARY KEY (product_id),
	FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Version: 1.03
-- Description: Add products view.
CREATE OR REPLACE VIEW view_products AS
SELECT
    p.product_id,
    p.user_id,
	p.name,
    p.cost,
	p.quantity,
    p.date_created,
    p.date_updated,
    u.name AS user_name
FROM
    products AS p
JOIN
    users AS u ON u.user_id = p.user_id;

-- Version: 1.04
-- Description: Create table homes
CREATE TABLE IF NOT EXISTS homes (
    home_id       UUID       NOT NULL,
    type          TEXT       NOT NULL,
    user_id       UUID       NOT NULL,
    address_1     TEXT       NOT NULL,
    address_2     TEXT       NULL,
    zip_code      TEXT       NOT NULL,
    city          TEXT       NOT NULL,
    state         TEXT       NOT NULL,
    country       TEXT       NOT NULL,
    date_created  TIMESTAMP  NOT NULL,
    date_updated  TIMESTAMP  NOT NULL,

    PRIMARY KEY (home_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Version 1.05
-- Description: Create table shifts
CREATE TABLE IF NOT EXISTS shift (
    shift_id         UUID         NOT NULL,
    employee_id      UUID         NOT NULL,
    role_id          UUID         NOT NULL,
    start_date       DATE         NOT NULL,
    end_date         DATE         NULL,
    start_time       TIMESTAMPTZ  NOT NULL,
    end_time         TIMESTAMPTZ  NOT NULL,
    published        BOOLEAN      NOT NULL,
    published_by     UUID         NULL,
    published_date   TIMESTAMPTZ  NULL,
    is_recurring     BOOLEAN      NOT NULL,
    created_by       UUID         NOT NULL,
    created_date     TIMESTAMPTZ  NOT NULL,
    updated_date     TIMESTAMPTZ  NOT NULL,
    parent_shift_id  UUID         NULL,

    PRIMARY KEY (shift_id),
    FOREIGN KEY (employee_id)     REFERENCES users(user_id)         ON DELETE CASCADE,
    FOREIGN KEY (role_id)         REFERENCES roles(role_id)         ON DELETE CASCADE,
    FOREIGN KEY (schedule_id)     REFERENCES schedules(schedule_id) ON DELETE CASCADE,
    FOREIGN KEY (published_by)    REFERENCES users(user_id)         ON DELETE CASCADE,
    FOREIGN KEY (created_by)      REFERENCES users(user_id)         ON DELETE CASCADE,
    FOREIGN KEY (parent_shift_id) REFERENCES shifts(shift_id)       ON DELETE CASCADE
);

-- Version 1.06
-- Description: Create user defined type 'recurring_type' as enum
IF NOT EXISTS (SELECT FROM pg_type WHERE typname = 'recurring_type') THEN
    CREATE TYPE recurring_type AS enum (
        'daily',
        'weekly',
        'monthly',
        'yearly',
    );
END IF;

-- Version 1.07
-- Description: Create table recurring_pattern 

CREATE TABLE IF NOT EXISTS recurring_pattern (
    shift_id               UUID            NOT NULL,
    recurring_type         recurring_type  NOT NULL,
    separation_count       INTEGER         NULL,
    max_num_of_occurances  INTEGER         NULL,
    day_of_week            INTEGER         NULL,
    week_of_month          INTEGER         NULL,
    day_of_month           INTEGER         NULL,
    month_of_year          INTEGER         NULL,

    FOREIGN KEY (shift_id) REFERENCES shifts(shift_id) ON DELETE CASCADE,
    PRIMARY KEY (shift_id) 
);

-- Version 1.08
-- Description: Create table shift_instace_exception
CREATE TABLE IF NOT EXISTS shift_instance_exception (
    shift_exception_id  UUID         NOT NULL,
    shift_id            UUID         NOT NULL,
    is_rescheduled      BOOLEAN      NOT NULL,
    is_canceled         BOOLEAN      NOT NULL,
    start_date          DATE         NOT NULL,
    end_date            DATE         NOT NULL,
    start_time          TIMESTAMPTZ  NOT NULL,
    end_time            TIMESTAMPTZ  NOT NULL,
    created_by          UUID         NOT NULL,
    created_date        TIMESTAMPTZ  NOT NULL,
);

CREATE TABLE IF NOT EXISTS shfit_template (
    
)
