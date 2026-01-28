# Unolo Field Force Tracker

A web application for tracking field employee check-ins at client locations.

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js, SQLite
- **Authentication:** JWT

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm run setup    # Installs dependencies and initializes database
cp .env.example .env
npm run dev
```

Backend runs on: `http://localhost:3001`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Test Credentials

| Role     | Email              | Password    |
|----------|-------------------|-------------|
| Manager  | manager@unolo.com | password123 |
| Employee | rahul@unolo.com   | password123 |
| Employee | priya@unolo.com   | password123 |

## Project Structure

```
├── backend/
│   ├── config/          # Database configuration
│   ├── middleware/      # Auth middleware
│   ├── routes/          # API routes
│   ├── scripts/         # Database init scripts
│   └── server.js        # Express app entry
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── pages/       # Page components
│   │   └── utils/       # API helpers
│   └── index.html
└── database/            # SQL schemas (reference only)
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Check-ins
- `GET /api/checkin/clients` - Get assigned clients
- `POST /api/checkin` - Create check-in
- `PUT /api/checkin/checkout` - Checkout
- `GET /api/checkin/history` - Get check-in history
- `GET /api/checkin/active` - Get active check-in

### Dashboard
- `GET /api/dashboard/stats` - Manager stats
- `GET /api/dashboard/employee` - Employee stats

## Notes

- The database uses SQLite - no external database setup required
- Run `npm run init-db` to reset the database to initial state


## Assignment Implementation Notes

### Feature A: Real-time Distance Calculation

When an employee checks in, the application calculates the distance between the employee’s current GPS location and the assigned client’s location.

- Distance is calculated using latitude and longitude values
- The distance is shown in kilometers (rounded to 2 decimal places)
- If the distance is greater than 500 meters, a warning message is displayed
- The calculated distance is stored along with each check-in
- Distance is visible on both the Check-in screen and History page

---

### Feature B: Daily Summary Report API (Manager Only)

A new API endpoint has been added to allow managers to view a daily summary of team activity.

- Only users with role `manager` can access this API
- Employees attempting access will receive an authorization error
- The API supports filtering by date and optional employee ID
- Proper validation is applied for missing or invalid dates

**Endpoint**
```

GET /api/reports/daily-summary

**Required Query Parameter**
- `date` (YYYY-MM-DD)

**Optional Query Parameter**
- `employee_id`

**Authorization Header**
```

Authorization: Bearer <JWT_TOKEN>



### Design & Architecture Notes

- JWT authentication is used for secure API access
- Role-based authorization ensures restricted access to manager-only APIs
- Distance calculation is handled on the backend for consistency
- SQL queries are written to avoid unnecessary database calls
- Existing project structure and database schema were preserved

---

### Setup Notes

- No additional environment variables were required
- Existing database and seed scripts are reused
- The project runs using the same setup steps provided above
```

---
