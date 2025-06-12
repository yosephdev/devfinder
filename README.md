# DevFinder

![DevFinder Logo](https://via.placeholder.com/150x50?text=DevFinder)

A modern GitHub user search application built with React, TypeScript, and Tailwind CSS.

## 📋 Overview

DevFinder allows you to search for GitHub developers and view their detailed profiles. The application provides a clean, responsive interface with both light and dark themes.

### ✨ Features

- **GitHub User Search**: Find developers by username or other search criteria
- **Detailed User Profiles**: View comprehensive information about developers
- **Repository Showcase**: See a developer's top repositories
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes for comfortable viewing
- **Error Handling**: Graceful handling of API rate limits and other errors

## 🚀 Live Demo

[View Live Demo](https://yoseph.dev/devfinder)

## 🛠️ Technologies

- **React 18** - Modern UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next-generation frontend tooling
- **Lucide React** - Beautiful, consistent icons
- **GitHub API** - For fetching developer data

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yosephdev/devfinder.git
   cd devfinder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 🔧 Usage

1. Enter a GitHub username or search term in the search bar
2. Browse through the list of matching developers
3. Click on a developer card to view their detailed profile
4. Toggle between light and dark themes using the theme switch

## 📁 Project Structure

```
src/
├── components/         # UI components
│   ├── EmptyState.tsx  # Empty state displays
│   ├── ErrorMessage.tsx # Error handling component
│   ├── LoadingSpinner.tsx # Loading indicator
│   ├── SearchBar.tsx   # Search input component
│   ├── ThemeToggle.tsx # Dark/light mode toggle
│   ├── UserCard.tsx    # Developer card component
│   └── UserDetails.tsx # Detailed profile view
├── hooks/              # Custom React hooks
│   ├── useGitHub.ts    # GitHub API integration
│   └── useTheme.ts     # Theme management
├── types/              # TypeScript type definitions
│   └── github.ts       # GitHub API types
├── App.tsx             # Main application component
├── index.css           # Global styles
└── main.tsx            # Application entry point
```

## 🔄 API Integration

DevFinder uses the GitHub REST API to fetch user data. The application handles:

- User search with pagination
- Detailed user profile information
- Repository listing with sorting
- API rate limiting and error handling

## 🎨 Customization

### Themes

The application supports both light and dark themes. The theme system uses Tailwind CSS and custom CSS variables for consistent styling.

### Styling

The UI is built with Tailwind CSS for responsive design and easy customization. You can modify the theme in `tailwind.config.js`.

## 📈 Future Improvements

- [ ] Add authentication to increase API rate limits
- [ ] Implement pagination for search results
- [ ] Add filtering options for repositories
- [ ] Create user comparison feature
- [ ] Add more detailed repository statistics

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yoseph Berhane**
- Website: [yoseph.dev](https://yoseph.dev)
- GitHub: [@yourusername](https://github.com/yosephdev)

## 🙏 Acknowledgments

- [GitHub API](https://docs.github.com/en/rest) for providing the data
- [React](https://reactjs.org/) team for the amazing library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vite](https://vitejs.dev/) for the blazing fast build tool
- [Lucide](https://lucide.dev/) for the beautiful icons