This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Employment Management CRUD App

## Project Structure

- `employee_app/`: Django backend
- `employee-frontend/`: Next.js frontend

## Prerequisites

- Python 3.x
- npm
- Git

## Setup and Installation

### Backend (Django)

1. Clone the repository:
   ```
   git clone <repository-url>
   cd employee_app
   ```

2. Create and activate a virtual environment:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Apply migrations:
   ```
   python manage.py migrate
   ```

5. Run the Django development server:
   ```
   python manage.py runserver
   ```

The backend should now be running on `http://localhost:8000`.

### Frontend (Next.js)

1. Navigate to the frontend directory:
   ```
   cd employee-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the `employee-frontend` directory with the following content:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Run the Next.js development server:
   ```
   npm run dev
   ```

The frontend should now be accessible at `http://localhost:3000`.

## Usage

- Access the frontend application at `http://localhost:3000`
- Use the interface to manage employees and departments
- The backend API is available at `http://localhost:8000/api/`

## API Endpoints

- `GET /api/employees/`: List all employees
- `POST /api/employees/create/`: Create a new employee
- `GET /api/employees/<id>/`: Retrieve an employee
- `PUT /api/employees/<id>/`: Update an employee
- `DELETE /api/employees/<id>/`: Delete an employee
- `GET /api/departments/`: List all departments

## Technologies Used

- Backend: Django, Django REST Framework
- Frontend: Next.js, React, Tailwind CSS
- Database: SQLite (default)
