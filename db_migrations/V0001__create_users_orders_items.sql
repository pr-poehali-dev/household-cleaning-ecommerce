
CREATE TABLE IF NOT EXISTS t_p55225895_household_cleaning_e.users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p55225895_household_cleaning_e.orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES t_p55225895_household_cleaning_e.users(id),
  status TEXT NOT NULL DEFAULT 'new',
  delivery_type TEXT NOT NULL DEFAULT 'delivery',
  address TEXT,
  total INTEGER NOT NULL DEFAULT 0,
  promo TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS t_p55225895_household_cleaning_e.order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES t_p55225895_household_cleaning_e.orders(id),
  product_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  quantity INTEGER NOT NULL,
  volume TEXT
);
