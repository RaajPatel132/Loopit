# Loopit Backend - User Authentication API

A Node.js Express server with JWT-based authentication using PostgreSQL database.

## Features

- ✅ User registration and login
- ✅ JWT token-based authentication
- ✅ Password hashing with bcrypt
- ✅ Input validation
- ✅ PostgreSQL database with Sequelize ORM
- ✅ User profile management
- ✅ Password change functionality
- ✅ Middleware for authentication
- ✅ Error handling

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- npm or yarn

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

1. Install PostgreSQL on your system
2. Create a new database:

```sql
CREATE DATABASE loopit_db;
```

3. Update the database configuration in `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=loopit_db
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
```

### 3. Environment Configuration

Copy the `.env` file and update the values:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=loopit_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# CORS
FRONTEND_URL=http://localhost:3000
```

**Important**: Change the `JWT_SECRET` to a strong, random string in production!

### 4. Run the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/profile` | Get user profile | Yes |
| PUT | `/api/auth/profile` | Update user profile | Yes |
| PUT | `/api/auth/change-password` | Change password | Yes |
| POST | `/api/auth/logout` | Logout user | Yes |

### Health Check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

## API Usage Examples

### Register User

```javascript
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "Password123"
}
```

### Login User

```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

### Get Profile (Protected)

```javascript
GET /api/auth/profile
Authorization: Bearer <your-jwt-token>
```

### Update Profile (Protected)

```javascript
PUT /api/auth/profile
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith"
}
```

### Change Password (Protected)

```javascript
PUT /api/auth/change-password
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "currentPassword": "Password123",
  "newPassword": "NewPassword456"
}
```

## Database Schema

### Users Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | UUID | Primary Key |
| firstName | VARCHAR(50) | NOT NULL |
| lastName | VARCHAR(50) | NOT NULL |
| email | VARCHAR(255) | UNIQUE, NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| isActive | BOOLEAN | DEFAULT TRUE |
| lastLogin | TIMESTAMP | NULL |
| createdAt | TIMESTAMP | NOT NULL |
| updatedAt | TIMESTAMP | NOT NULL |

## Security Features

- **Password Hashing**: Passwords are hashed using bcrypt with salt rounds of 12
- **JWT Tokens**: Secure token-based authentication
- **Input Validation**: Comprehensive validation using express-validator
- **CORS Protection**: Configured for specific frontend origins
- **Error Handling**: Secure error responses without sensitive information

## Password Requirements

- Minimum 6 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional validation errors array
}
```

## Success Responses

All success responses follow this format:

```json
{
  "success": true,
  "message": "Success message",
  "data": {} // Optional data object
}
```

## Development

The server uses Sequelize ORM which will automatically create the database tables on first run. The tables will be created with the `sync({ alter: true })` option, which means:

- Tables will be created if they don't exist
- Existing tables will be altered to match the model definitions
- Data will be preserved during alterations

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong, unique `JWT_SECRET`
3. Configure your production database credentials
4. Set up proper CORS origins
5. Consider using a process manager like PM2
6. Set up proper logging and monitoring

## Troubleshooting

### Database Connection Issues

1. Ensure PostgreSQL is running
2. Check database credentials in `.env`
3. Verify the database exists
4. Check network connectivity

### JWT Token Issues

1. Ensure `JWT_SECRET` is set
2. Check token expiration time
3. Verify token format in Authorization header

### CORS Issues

1. Check `FRONTEND_URL` in `.env`
2. Ensure frontend URL matches exactly
3. Check for trailing slashes
