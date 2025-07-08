# GitHub Peek 🔍

A modern React application that allows you to search and explore GitHub users and their repositories. Built with TypeScript, Vite, and Radix UI components.

## 📖 Introduction

GitHub Peek is a lightweight web application that provides a clean interface for searching GitHub users and viewing their repositories. The application leverages the GitHub API to fetch user data and repository information, presenting it in an intuitive, collapsible interface.

### Key Features

- 🔍 **User Search**: Search GitHub users by username
- 📋 **Repository Display**: View user repositories with star counts and descriptions
- 🎨 **Modern UI**: Built with Radix UI components for a polished look
- ⚡ **Fast Performance**: Optimized with React Query for efficient data fetching
- 📱 **Responsive Design**: Works seamlessly across different screen sizes
- 🔄 **Real-time Updates**: Automatic data refetching and caching

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- GitHub Personal Access Token

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd github-peek
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=https://api.github.com
   VITE_GH_TOKEN=your_github_personal_access_token
   ```

   > **Note**: You'll need to create a GitHub Personal Access Token:
   > 1. Go to GitHub Settings → Developer settings → Personal access tokens
   > 2. Generate a new token with `public_repo` scope
   > 3. Copy the token to your `.env` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

## 🏗️ Project Structure

```
github-peek/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, icons, and other static files
│   ├── components/        # Shared/reusable components
│   │   ├── collapsible.tsx
│   │   └── collapsible.module.css
│   ├── features/          # Feature-based modules
│   │   └── explorer/      # GitHub user exploration feature
│   │       ├── api/       # API functions and types
│   │       │   ├── search.ts
│   │       │   └── users.ts
│   │       ├── components/ # Feature-specific components
│   │       │   ├── user-detail.tsx
│   │       │   └── user-detail.module.css
│   │       ├── Explorer.tsx
│   │       ├── Explorer.module.css
│   │       └── index.ts
│   ├── lib/               # Utility libraries and configurations
│   │   └── api-client.ts  # Axios configuration
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 📝 File Naming Conventions

- **PascalCase** for component: `UserDetail`, `Explorer`
- **PascalCase** for type definitions: `SearchUserQuery`, `User`, `SearchUserResponse`
- **kebab-case** for files: `search.ts`, `users.ts`
- **camelCase** for API functions: `searchUsers`, `getUserRepos`
- **camelCase** for function parameters and variables

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## 🧰 Technology Stack

### Core Technologies
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

### UI Components
- **Radix UI** - Accessible component primitives
- **Phosphor Icons** - Icon library

### Data Management
- **TanStack Query** - Server state management
- **Axios** - HTTP client

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting

## 🔧 Configuration

### TypeScript Configuration
The project uses a monorepo-style TypeScript configuration with separate configs for:
- `tsconfig.json` - Root configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js environment settings

### Path Aliases
The project uses path aliases for cleaner imports:
```typescript
import { Component } from '@/components/Component';
import { apiFunction } from '@/lib/api-client';
```

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | GitHub API base URL | Yes |
| `VITE_GH_TOKEN` | GitHub Personal Access Token | Yes |

## 🎯 API Integration

The application integrates with the GitHub REST API v3:

### Endpoints Used
- `GET /search/users` - Search for GitHub users
- `GET /users/{username}/repos` - Get user repositories

### Authentication
Requests are authenticated using a GitHub Personal Access Token passed in the Authorization header.

## 🎨 Styling Approach

- **CSS Modules** for component-specific styles
- **Radix UI** for consistent design system
- **Responsive design** with mobile-first approach
- **Accessibility** built-in with Radix UI components

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting
- **Vercel** - Zero-config deployment
- **Netlify** - Easy static site hosting
- **GitHub Pages** - Free hosting for open source projects

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [Radix UI](https://www.radix-ui.com/) for the component library
- [TanStack Query](https://tanstack.com/query) for data fetching
- [Vite](https://vitejs.dev/) for the build tool

Made with ❤️ using modern web technologies
