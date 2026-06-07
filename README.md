# Shift Manager Backend

A Node.js/Express backend service for managing employee shifts, schedules, and shift types. This application provides RESTful APIs for user management, shift operations, schedule generation, and data migration utilities.

## Features

- **User Management**: Create, retrieve, and delete users with secure password authentication
- **Shift Management**: Create, retrieve, and delete shift records
- **Shift Types**: Manage different types of shifts available in the system
- **Schedule Management**: Generate and retrieve work schedules
- **Data Migrations**: Built-in utilities for migrating employee and shift data
- **CORS Support**: Pre-configured CORS for frontend integration
- **MongoDB Integration**: Persistent data storage with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: bcrypt for password hashing
- **Development**: nodemon for auto-reload
- **Utilities**: dotenv for environment configuration, CORS middleware

## Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shift-manager-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (see [Environment Configuration](#environment-configuration))

## Environment Configuration

Create environment files in the `environment/` directory:

### `environment/.env.dev` (Development)
```
NODE_ENV=dev
DB_URI=<your-development-mongodb-uri>
PORT=5000
```

### `environment/.env.prod` (Production)
```
NODE_ENV=prod
DB_URI=<your-production-mongodb-uri>
PORT=5000
```

## Running the Project

### Development Mode
Start the server with auto-reload:
```bash
npm run dev
```

### Production Mode
Start the server:
```bash
npm start
```

The server will start on `http://localhost:5000` (or the port specified in your environment variables).

## API Endpoints

### Users (`/api/users`)
- `GET /hello` - Health check
- `GET /getAllUsers` - Retrieve all users
- `POST /addUser` - Create a new user
  - Body: `{ email, password, name }`
- `DELETE /deleteUser` - Delete a user
  - Body: `{ email }`
- `POST /login` - Authenticate user
  - Body: `{ email, password }`

### Shifts (`/api/shifts`)
- `GET /hello` - Health check
- `GET /getAllShifts` - Retrieve all shifts
- `POST /getShifts` - Get shifts for a specific user
  - Body: `{ _id }`
- `POST /addShift` - Create or update a shift
  - Body: shift object
- `DELETE /deleteShift` - Delete a shift
  - Body: `{ shiftId }`

### Shift Types (`/api/shift-types`)
- CRUD operations for managing different shift types

### Schedules (`/api/schedule`)
- `GET /hello` - Health check
- `GET /getCurrentSchedules` - Retrieve the latest schedule
- `POST /addSchedule` - Create a new schedule
  - Body: schedule object
- `GET /generateSchedule` - Generate a schedule automatically

### Migrations (`/api/migrations`)
- Data migration utilities for batch importing employees and shifts

## Project Structure

```
shift-manager-backend/
├── src/
│   ├── index.js                 # Entry point and server setup
│   ├── users/
│   │   ├── UserRoutes.js       # User endpoints
│   │   └── UserSchema.js       # User data model
│   ├── shifts/
│   │   ├── ShiftsRoutes.js     # Shift endpoints
│   │   └── ShiftsSchema.js     # Shift data model
│   ├── shift_type/
│   │   ├── shiftTypeRoutes.js  # Shift type endpoints
│   │   └── shiftTypeSchema.js  # Shift type data model
│   ├── schedule/
│   │   ├── ScheduleRoutes.js   # Schedule endpoints
│   │   ├── ScheduleSchema.js   # Schedule data model
│   │   └── ScheduleMaker.js    # Schedule generation logic
│   ├── migrations/
│   │   ├── migrationRoutes.js     # Migration endpoints
│   │   ├── migrationFactory.js    # Migration utilities
│   │   ├── mockEmployeesMigration.js
│   │   ├── ScheduleMigration.js
│   │   └── MockShiftsMigration.js
│   └── utils/
│       ├── responseObjects.js  # Standard response formatting
│       └── ScheduleMaker.js    # Schedule generation helper
├── environment/
│   ├── .env.dev              # Development configuration
│   └── .env.prod             # Production configuration
├── package.json
└── README.md
```

## Database Schemas

### User
- `email` (String, unique) - User email address
- `password` (String) - Hashed password
- Additional fields as defined in UserSchema

### Shift
- `shiftId` (String) - Unique shift identifier
- `date` (Date) - Shift date
- Additional fields as defined in ShiftsSchema

### ShiftType
- `name` (String) - Name of the shift type
- Additional fields as defined in shiftTypeSchema

### Schedule
- `date` (Date) - Schedule date
- `shifts` (Array) - Associated shifts
- Additional fields as defined in ScheduleSchema

## CORS Configuration

The backend is configured to accept requests from `http://localhost:3000` (frontend). To modify CORS settings, update the configuration in `src/index.js`.

## Notes

- Passwords are hashed using bcrypt before storage
- All responses follow a standardized format (see `responseObjects.js`)
- The API uses JSON request/response bodies
- Maximum request payload size is set to 10MB

## Development Tips

- Check the console logs to monitor server activity and database connections
- Use HTTP clients like Postman or VS Code REST Client for testing endpoints
- Ensure MongoDB is running before starting the server
- Use `.env.dev` for development to point to a local MongoDB instance

## License

ISC
