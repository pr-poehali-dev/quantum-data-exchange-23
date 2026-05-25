CREATE TABLE IF NOT EXISTS t_p58588261_quantum_data_exchang.applications (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('student', 'employee')),
  created_at TIMESTAMP DEFAULT NOW()
);