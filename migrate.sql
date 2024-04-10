CREATE TABLE restaurants (
  restaurant_id bigserial NOT NULL,
  restaurant_name varchar(255) NOT NULL,
  PRIMARY KEY (restaurant_id)
);

CREATE TABLE employees (
  employee_id bigserial NOT NULL,
  -- TODO: this is a many to many relationship (how do I codify that?)
  -- Do I need to create a Join Table?
  role_id bigserial NOT NULL, 
  restaurant_id bigserial NOT NULL,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  email varchar(255),
  activated boolean NOT NULL DEFAULT false,
  PRIMARY KEY (employee_id),
  FOREIGN KEY (role_id) REFERENCES roles (role_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
);

CREATE TABLE roles (
  role_id bigserial NOT NULL,
  role_name varchar(255) NOT NULL,
  restaurant_id bigserial NOT NULL,
  PRIMARY KEY (role_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
);

CREATE TABLE shifts (
  shift_id bigserial NOT NULL,
  shift_name varchar(255) NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  restaurant_id bigserial NOT NULL,
  PRIMARY KEY (shift_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
);

CREATE TABLE schedules (
  schedule_id bigserial NOT NULL,
  employee_id bigserial NOT NULL,
  restaurant_id bigserial NOT NULL,
  shift_id bigserial NOT NULL,
  date date NOT NULL,
  PRIMARY KEY (schedule_id),
  FOREIGN KEY (employee_id) REFERENCES employees (employee_id),
  FOREIGN KEY (shift_id) REFERENCES shifts (shift_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id)
);

CREATE TABLE users (
  user_id bigserial NOT NULL,
  employee_id bigserial NOT NULL,
)
