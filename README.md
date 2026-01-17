# PCCOE Freelance Platform - Frontend

A modern freelance marketplace platform with milestone-based payment system built with React + Vite.

## 🎯 Recent Updates (January 2026)

### ✅ Bug Fixes
- Fixed Dashboard navigation issue where clicking "View Application" was going through multiple pages

### ✅ Database Schema Integration
- Complete alignment with PostgreSQL database schema
- 7 database tables fully integrated
- 39+ API endpoints ready for backend
- Milestone-based payment workflow implemented

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| [INTEGRATION_CHECKLIST.md](./INTEGRATION_CHECKLIST.md) | ⭐ Complete integration status |
| [FORM_INTEGRATION_GUIDE.md](./FORM_INTEGRATION_GUIDE.md) | ⭐ Form-to-API integration guide |
| [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) | Overview of all changes and features |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | Complete API endpoint documentation |
| [BACKEND_QUICK_REF.md](./BACKEND_QUICK_REF.md) | Quick reference for backend team |
| [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) | Detailed migration instructions |
| [WORKFLOW_DIAGRAM.md](./WORKFLOW_DIAGRAM.md) | Visual workflow diagrams |

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── api/                    # API integration layer
│   │   ├── authAPI.js         # Authentication
│   │   ├── userAPI.js         # User & freelancer APIs
│   │   ├── companyAPI.js      # Company profile management ⭐ NEW
│   │   ├── projectAPI.js      # Projects, milestones, assignments
│   │   ├── bidAPI.js          # Bids/proposals
│   │   ├── contractPaymentAPI.js  # Payments & milestones
│   │   ├── messageAPI.js      # Messaging
│   │   ├── axiosConfig.js     # Axios configuration
│   │   └── types.js           # Type definitions ⭐ NEW
│   │
│   ├── components/            # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── DashboardNavbar.jsx
│   │   ├── Footer.jsx
│   │   ├── SignInSelect.jsx
│   │   └── SignUpSelect.jsx
│   │
│   ├── pages/                 # Page components
│   │   ├── Landing.jsx
│   │   ├── SignIn.jsx
│   │   ├── SignUp.jsx
│   │   ├── Dashboard/
│   │   ├── Profile/
│   │   ├── FindProjects/
│   │   ├── CreateProject/
│   │   ├── MyProjects/
│   │   ├── ProjectDetails/
│   │   ├── Applications/
│   │   ├── Candidates/
│   │   ├── Messages/
│   │   ├── Notifications/
│   │   └── ViewProfile/
│   │
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
│
├── public/                   # Static assets
├── API_DOCUMENTATION.md      # API docs ⭐ NEW
├── BACKEND_QUICK_REF.md      # Backend reference ⭐ NEW
├── MIGRATION_GUIDE.md        # Migration guide ⭐ NEW
├── IMPLEMENTATION_SUMMARY.md # Summary ⭐ NEW
├── WORKFLOW_DIAGRAM.md       # Workflows ⭐ NEW
└── package.json
```

## 🔌 API Integration

### Database Schema Entities

1. **Companies** - Company profiles with multiple websites
2. **Projects** - Project management with status tracking
3. **Project Milestones** - Milestone-based project breakdown
4. **Milestone Submissions** - Freelancer work submissions
5. **Milestone Payments** - Payment tracking per milestone
6. **Project Assignments** - Freelancer-project assignments
7. **Company Websites** - Multiple website links per company

### API Endpoints Ready

- **Companies**: 8 endpoints
- **Projects**: 8 endpoints  
- **Milestones**: 6 endpoints
- **Submissions**: 4 endpoints
- **Payments**: 8 endpoints
- **Assignments**: 5 endpoints

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for complete details.

## 🎨 Features

### For Companies
- ✅ Create projects with milestone-based budgeting
- ✅ Post multiple website links
- ✅ Review freelancer submissions
- ✅ Approve and release payments
- ✅ Track project progress
- ✅ Manage company profile

### For Freelancers
- ✅ Browse and apply to projects
- ✅ Submit work for milestones
- ✅ Track payment status
- ✅ View project assignments
- ✅ Manage freelancer profile

### Platform Features
- ✅ Milestone-based payment system
- ✅ Work submission and review workflow
- ✅ Real-time status tracking
- ✅ Role-based access control
- ✅ Project assignment management

## 🔐 Authentication

Uses JWT token-based authentication:
- Token stored in localStorage as 'token'
- User type stored as 'userType' (freelancer/company)
- Auto-logout on token expiration

## 🎯 Milestone Workflow

```
1. Company creates project
2. Company adds milestones (e.g., Frontend: ₹30k, Backend: ₹40k)
3. Company assigns freelancer
4. Freelancer completes milestone
5. Freelancer submits work
6. Company reviews submission
7. Company approves work
8. Company releases payment
9. Milestone marked as "paid"
10. Repeat for next milestone
```

See [WORKFLOW_DIAGRAM.md](./WORKFLOW_DIAGRAM.md) for visual diagrams.

## 📊 Status Enums

### Project Status
`draft` | `open` | `in_progress` | `completed` | `cancelled`

### Milestone Status
`pending` | `in_progress` | `submitted` | `approved` | `paid` | `rejected`

### Payment Status
`pending` | `released` | `failed`

### Assignment Status
`active` | `completed` | `terminated`

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: React Icons
- **Styling**: Tailwind CSS
- **State Management**: React Hooks

## 🔄 Development Workflow

1. **Frontend Development** (Current)
   - ✅ UI components built
   - ✅ API layer ready
   - ✅ Documentation complete

2. **Backend Development** (Next)
   - See [BACKEND_QUICK_REF.md](./BACKEND_QUICK_REF.md)
   - Implement endpoints
   - Set up PostgreSQL database

3. **Integration** (Then)
   - Connect frontend to backend
   - Test end-to-end workflows
   - Deploy

## 📝 Environment Variables

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=PCCOE Freelance Platform
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test

# Run linting
npm run lint
```

## 🚀 Deployment

```bash
# Build for production
npm run build

# Output will be in /dist folder
```

## 👥 For Backend Team

### Start Here
1. Read [BACKEND_QUICK_REF.md](./BACKEND_QUICK_REF.md)
2. Review [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. Check [WORKFLOW_DIAGRAM.md](./WORKFLOW_DIAGRAM.md)

### Key Points
- All field names are **snake_case** in database
- Frontend sends **camelCase**, expects conversion
- Status values are exact lowercase strings
- Use UUIDs for all IDs
- Implement JWT authentication
- Follow provided error format

### Priority Endpoints
1. POST /projects (create project)
2. POST /projects/milestones (create milestone)
3. GET /projects/:id (get project)
4. POST /projects/milestones/submissions (submit work)
5. POST /payments/milestones (create payment)

See complete priority list in [BACKEND_QUICK_REF.md](./BACKEND_QUICK_REF.md)

## 📖 Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

[Add your license here]

## 📞 Support

For questions or issues:
- Check documentation files
- Review API endpoints
- Contact development team

---

**Last Updated**: January 18, 2026
**Status**: ✅ Frontend ready for backend integration
**Database Schema**: ✅ Fully aligned
**Documentation**: ✅ Complete

## React + Vite (Original Template Info)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Plugins Available
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

