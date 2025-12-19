# Copilot Instructions for qrcode-reader-vue3

## Project Overview

This repository contains a Vue 3 component library for detecting and decoding QR codes in the browser. The library provides three main components:
- `QrcodeStream`: Accesses device camera for continuous QR code scanning
- `QrcodeDropZone`: Drag-and-drop interface for QR code image decoding
- `QrcodeCapture`: File upload field for QR code scanning

## Development Setup

### Prerequisites
- Node.js (version 16 or higher recommended)
- npm package manager

### Getting Started
```bash
# Install dependencies
npm install

# Start development server with local demo page
npm run dev

# Build the library for production
npm run build

# Run linter
npm run lint
```

## Code Style and Conventions

### Vue 3 Standards
- This is a Vue 3 project - use Composition API or Options API consistently with existing code
- All components are located in `src/components/`
- Use kebab-case for component references in templates
- Follow responsive design principles - components should adapt to different screen sizes

### Code Formatting
- **Prettier** is used for code formatting
- **ESLint** is configured for linting Vue and JavaScript files
- Pre-commit hooks automatically lint staged files
- Run `npm run lint` to check and fix code style issues

### File Structure
```
src/
  ├── components/     # Vue components
  ├── mixins/        # Shared Vue mixins
  ├── misc/          # Utility functions and helpers
  ├── types/         # Type definitions
  └── index.js       # Main entry point
```

## Testing and Quality

### Before Submitting Changes
1. Run `npm run lint` to ensure code style compliance
2. Run `npm run build` to verify the library builds successfully
3. Test changes using the development server (`npm run dev`)
4. Ensure changes work across different browsers (Chrome, Firefox, Safari)

### Browser Support Considerations
- Components rely on WebRTC and camera access APIs
- HTTPS is required for camera access (except localhost)
- Not all QR code types are supported (e.g., Model 1 QR codes, color-inverted codes)

## Commit Message Conventions

**CRITICAL**: This project uses [semantic-release](https://github.com/semantic-release/semantic-release) with Angular Commit Message Conventions. Version numbers are automatically determined from commit messages.

### Format
```
<type>(<scope>): <subject>
```

### Types
- **feat**: A new feature (triggers minor version bump)
- **fix**: A bug fix (triggers patch version bump)
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (white-space, formatting)
- **refactor**: Code changes that neither fix bugs nor add features
- **perf**: Performance improvements
- **test**: Adding or updating tests
- **chore**: Changes to build process or auxiliary tools

### Examples
```
feat(QrcodeStream): add support for custom camera constraints
fix(QrcodeCapture): resolve file upload issue on iOS Safari
docs(README): update installation instructions
```

### Breaking Changes
For breaking changes, add `BREAKING CHANGE:` in the commit body to trigger a major version bump.

## Component Development Guidelines

### When Adding or Modifying Components
1. Keep components focused and single-purpose
2. Emit events for decoded QR codes and errors
3. Provide clear error messages for troubleshooting
4. Ensure components are accessible and responsive
5. Follow existing patterns in `src/components/`

### Props and Events
- Use descriptive prop names with clear types
- Document all props and events
- Follow Vue 3 prop validation patterns
- Emit events in kebab-case

## Dependencies

### Core Dependencies
- **Vue 3**: UI framework
- **barcode-detector**: QR code detection/decoding
- **callforth**: Async function orchestration
- **webrtc-adapter**: WebRTC polyfills for cross-browser compatibility

### Adding New Dependencies
- Minimize new dependencies when possible
- Prefer well-maintained, actively developed packages
- Check bundle size impact using bundlephobia.com
- Document why the dependency is needed

## Common Tasks for Copilot

### Good Task Examples
- Bug fixes in existing components
- Adding prop validation or improving error messages
- Documentation updates
- Accessibility improvements
- Code style and linting fixes
- Performance optimizations

### Tasks Requiring Human Review
- Breaking API changes
- Major refactoring across multiple components
- Changes to build configuration
- Security-sensitive code
- Camera permission handling logic

## Troubleshooting

### Camera Access Issues
- Verify HTTPS is being used (or localhost)
- Check browser permissions
- Review `init` event errors
- Test on the demo page first

### Build Issues
- Clear `node_modules` and run `npm install` again
- Check Node.js version compatibility
- Verify all dependencies are installed

## Additional Resources

- [Live Demos](https://scholtz.github.io/qrcode-reader-vue3/demos/DecodeAll.html)
- [API Reference](https://scholtz.github.io/qrcode-reader-vue3/api/QrcodeStream.html)
- [Original vue-qrcode-reader (Vue 2)](https://github.com/gruhn/vue-qrcode-reader)

## Notes for AI Assistants

When working on issues:
1. Read and understand the full issue description before making changes
2. Test changes locally using `npm run dev`
3. Run linter and build before submitting
4. Follow the Angular commit message convention
5. Keep changes minimal and focused on the specific issue
6. Preserve existing code style and patterns
7. Update documentation if API changes are made
