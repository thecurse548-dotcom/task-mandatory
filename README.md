# TaskFlow - Task Management Web Application

A modern, premium task management web application built with React and Supabase. Features a clean, professional UI/UX with dark mode support, smooth animations, and responsive design.

## Features

### Core Functionality
- **Full CRUD Operations**: Create, Read, Update, and Delete tasks
- **Task Management**:
  - Add title, description, priority (Low/Medium/High), status (Pending/In Progress/Completed), and due date
  - Change task status seamlessly
  - Edit existing tasks with pre-filled data
  - Delete tasks with confirmation modal
- **Dashboard**: Overview with task statistics (Total, Pending, In Progress, Completed, Overdue)
- **Smart Filtering**: Filter tasks by status and priority
- **Search**: Real-time search across task titles and descriptions
- **View Modes**: Toggle between List and Grid view

### UI/UX Features
- **Modern Design**: Clean, minimal, and professional interface
- **Dark/Light Mode**: Toggle between themes with persistent preference
- **Responsive**: Mobile-first approach, works seamlessly on all devices
- **Smooth Animations**: Micro-interactions, hover states, and transitions
- **Toast Notifications**: Real-time feedback for all actions
- **Loading States**: Elegant loading indicators throughout the app

### Security & Authentication
- **Secure Authentication**: Email/password authentication via Supabase
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Row Level Security**: Database-level security policies

## Tech Stack

- **Frontend**: React 18 with JSX
- **Styling**: Tailwind CSS with custom theme
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Deployment Ready**: Production-optimized build

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Select.jsx
│   │   ├── Textarea.jsx
│   │   ├── Modal.jsx
│   │   ├── Toast.jsx
│   │   ├── Card.jsx
│   │   └── Loading.jsx
│   ├── Layout.jsx       # Main layout with navigation
│   └── ProtectedRoute.jsx
├── contexts/
│   ├── AuthContext.jsx   # Authentication state
│   ├── ThemeContext.jsx  # Dark/Light mode
│   └── ToastContext.jsx  # Toast notifications
├── lib/
│   └── supabase.js      # Supabase client config
├── pages/
│   ├── Login.jsx        # Login page
│   ├── Register.jsx     # Registration page
│   ├── Dashboard.jsx    # Dashboard with stats
│   ├── Tasks.jsx        # All tasks view
│   ├── NewTask.jsx      # Create task form
│   └── EditTask.jsx     # Edit/Delete task
├── App.jsx              # Main app with routing
├── main.jsx             # App entry point
└── index.css            # Global styles

```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd taskflow
```

2. Install dependencies
```bash
npm install
```

3. Set up Supabase
   - Create a new project at [Supabase](https://supabase.com)
   - The database schema is already set up automatically

4. Configure environment variables
   - The `.env` file is already configured with Supabase credentials

5. Start the development server
```bash
npm run dev
```

6. Build for production
```bash
npm run build
```

## Database Schema

### Tasks Table
- `id`: UUID (Primary Key)
- `user_id`: UUID (Foreign Key to auth.users)
- `title`: Text (Required)
- `description`: Text
- `priority`: Enum (low, medium, high)
- `status`: Enum (pending, in_progress, completed)
- `due_date`: Date
- `created_at`: Timestamp
- `updated_at`: Timestamp

### Security
- Row Level Security (RLS) enabled
- Users can only access their own tasks
- Secure policies for SELECT, INSERT, UPDATE, DELETE

## Usage

### Authentication
1. Register a new account with email and password
2. Login to access the dashboard

### Managing Tasks
1. **Create**: Click "New Task" button, fill in details, and submit
2. **View**: Browse all tasks in List or Grid view
3. **Filter**: Use status and priority filters to find specific tasks
4. **Search**: Type in the search bar to find tasks by title or description
5. **Edit**: Click on any task to edit its details
6. **Delete**: Use the delete button in edit view (with confirmation)
7. **Status Update**: Change task status directly from the edit page

### Dashboard
- View statistics at a glance
- Quick access to recent tasks
- Create new tasks with one click

## Features Highlights

### Form Validation
- Real-time validation with error messages
- Required field indicators
- Date validation (no past dates)
- Email format validation

### Responsive Design
- Mobile-optimized navigation
- Adaptive layouts for all screen sizes
- Touch-friendly interface

### Performance
- Optimized build size
- Fast page loads
- Efficient database queries
- Smooth animations (60fps)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Future Enhancements

- Task categories/tags
- Task sharing and collaboration
- Email notifications
- Recurring tasks
- File attachments
- Advanced analytics
- Export to PDF/CSV

## Contributing

This is a portfolio/interview project. Feel free to fork and customize for your own use.

## License

MIT License - feel free to use this project for learning and portfolio purposes.
