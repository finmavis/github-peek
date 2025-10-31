# GitHub Peek

A modern React application that allows you to search and explore GitHub repositories with advanced filtering capabilities. Built with TypeScript, Vite, and custom UI components based on Radix UI.

**Live Website**: [https://finmavis.github.io/github-peek/](https://finmavis.github.io/github-peek/)

## Introduction

GitHub Peek is a lightweight web application that provides a clean interface for searching GitHub repositories. The application leverages the GitHub API to fetch repository data and presents it in an intuitive, filterable interface with pagination support.

### Key Features

- **Repository Search**: Search GitHub repositories with full-text search
- **Advanced Filtering**: Filter by language, stars, forks, user, organization, dates, topics, license, visibility, and more
- **Sorting Options**: Sort results by stars, forks, help-wanted-issues, or last updated
- **Pagination**: Navigate through search results with pagination (supports up to 1000 results)
- **Modern UI**: Built with custom composable UI components
- **Theme Toggle**: Switch between light and dark themes
- **Fast Performance**: Optimized with React Query for efficient data fetching and caching
- **Responsive Design**: Works seamlessly across different screen sizes
- **Real-time Updates**: Automatic data refetching and URL state synchronization

## Quick Start

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
   > 1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
   > 2. Generate a new token with `public_repo` scope (or no scopes needed for public read access)
   > 3. Copy the token to your `.env` file

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

## File Naming Conventions

- **PascalCase** for components: `SearchHeader`, `RepositoryCard`
- **PascalCase** for type definitions: `Repository`, `SearchRepositoriesResponse`
- **kebab-case** for files: `search-repositories.ts`, `use-query-params.ts`
- **camelCase** for API functions: `searchRepositories`, `buildSearchQuery`
- **camelCase** for function parameters and variables

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |

## Technology Stack

### Core Technologies
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

### UI Components
- **Custom UI Components** - Composable component library built with Radix UI principles
  - Components follow Radix UI's composable architecture and accessibility patterns
  - Built from scratch using React primitives with Radix UI-inspired API design
  - Includes: Card, Button, Text, Badge, Flex, Select, Popover, ScrollArea, Skeleton, TextField
- **Phosphor Icons** - Icon library
- **CSS Modules** - Component-scoped styling

### Data Management
- **TanStack Query** - Server state management, caching, and automatic refetching
- **Axios** - HTTP client with interceptors for error handling

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting

## Configuration

### TypeScript Configuration
The project uses a monorepo-style TypeScript configuration with separate configs for:
- `tsconfig.json` - Root configuration
- `tsconfig.app.json` - Application-specific settings
- `tsconfig.node.json` - Node.js environment settings

### Path Aliases
The project uses path aliases for cleaner imports:
```typescript
import { Card, Button, Text } from '@/components/ui';
import { useQueryParams } from '@/hooks/use-query-params';
import { formatDate } from '@/lib/date';
```

### Environment Variables
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | GitHub API base URL |
| `VITE_GH_TOKEN` | GitHub Personal Access Token |

## API Integration

The application integrates with the GitHub REST API v3:

### Endpoints Used
- `GET /search/repositories` - Search for GitHub repositories

### Search Query Syntax
The application supports GitHub's advanced search syntax with qualifiers:
- Text search: `query`
- Language: `language:javascript`
- Stars: `stars:>100`, `stars:10..50`
- Forks: `forks:>10`
- User/Org: `user:username`, `org:organization`
- Dates: `created:>2024-01-01`, `pushed:>2024-01-01`
- Topic: `topic:react`
- License: `license:mit`
- Visibility: `is:public`, `is:private`
- Archive status: `archived:true`, `archived:false`
- Template: `is:template`

### Authentication
Requests are authenticated using a GitHub Personal Access Token passed in the Authorization header.

### Error Handling
The application handles various API errors:
- Rate limiting (429)
- Authentication failures (401, 403)
- Search result limits (422 - "Only the first 1000 search results are available")
- Network errors
- Generic API errors

## Styling Approach

- **CSS Modules** for component-specific styles
- **CSS Custom Properties** for theming (light/dark mode)
- **Responsive design** with mobile-first approach
- **Composable UI components** - Built with Radix UI-inspired composable architecture for flexible, accessible component composition
- **Accessibility** - Components follow Radix UI's accessibility principles, including proper ARIA attributes, keyboard navigation, and focus management

## Theme System

The application supports light and dark themes:
- Theme preference is stored in localStorage
- Theme can be toggled via the theme toggle button
- CSS custom properties are used for theme values
- Smooth transitions between themes

## Search Features

### Basic Search
- Full-text search across repository names, descriptions, and README files
- URL state synchronization

### Filtering
- **Language**: Filter by programming language
- **Sort**: Sort by stars, forks, help-wanted-issues, or last updated
- **Advanced Filters**:
  - Stars (min/max range)
  - Forks (min/max range)
  - User/Organization
  - Created/Updated dates
  - Topics
  - License
  - Visibility (public/private)
  - Archive status
  - Template status

### Pagination
- Navigate through search results
- Supports up to 1000 results (GitHub API limit)
- Page state synchronized with URL parameters

## Deployment

### Build for Production
```bash
npm run build
```

The build output will be in the `dist/` directory, ready for deployment to any static hosting service.

### Recommended Hosting
- **Vercel** - Zero-config deployment with automatic CI/CD
- **Netlify** - Easy static site hosting with form handling
- **GitHub Pages** - Free hosting for open source projects

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [Radix UI](https://www.radix-ui.com/) - The UI components are built following Radix UI's composable architecture, accessibility principles, and API design patterns
- [TanStack Query](https://tanstack.com/query) for data fetching and caching
- [Vite](https://vitejs.dev/) for the build tool
- [Phosphor Icons](https://phosphoricons.com/) for the icon library
