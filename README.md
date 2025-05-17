# DevOps Engineer Portfolio

A modern, responsive portfolio website showcasing my skills and experience as a DevOps Engineer.

## Live Demo

Visit the live portfolio at [https://Ahmedelsa3eed.github.io/](https://Ahmedelsa3eed.github.io/)

## How It Works

This portfolio website uses:
- GitHub Pages for hosting (deployed from the gh-pages branch)
- npm and gh-pages package for automated deployment
- Local storage for saving user theme preferences
- PDF.js for rendering the resume preview

## Features

- Responsive design that works on all devices
- Clean and modern UI with smooth animations
- Dark/Light mode toggle with persistent preference
- PDF resume preview functionality
- Sections for showcasing skills, projects, certifications, and work experience
- Contact form for visitors to reach out
- Social media integration

## Technologies Used

- HTML5
- CSS3 (with modern features like Grid, Flexbox, and CSS Variables)
- JavaScript (Vanilla JS)
- Font Awesome for icons
- Google Fonts

## Sections

1. **Hero Section** - Introduction and call-to-action
2. **About Me** - Professional summary and key highlights
3. **Skills** - Technical skills with visual representation
4. **Projects** - Showcase of notable DevOps projects
5. **Certifications** - Professional certifications relevant to DevOps
6. **Work Experience** - Professional history with achievements
7. **Contact** - Contact form and information

## Customization

To personalize this portfolio:

1. Replace placeholder images in the `images` folder with your own
2. Update personal information, skills, projects, and experience details in `index.html`
3. Adjust styling in `css/styles.css` if needed
4. Update social media links and contact information

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/Ahmedelsa3eed/Ahmedelsa3eed.github.io.git
   cd Ahmedelsa3eed.github.io
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Make any necessary modifications to personalize the content

## Development

To run the site locally for development and testing:

```bash
npm start
```

This will start a local development server at http://localhost:8080 (or another available port) using live-server, which automatically reloads when you make changes to the files.

## Deployment

This portfolio is deployed using GitHub Pages:

1. Ensure you have the required dependencies installed:
   ```bash
   npm install
   ```

2. To deploy or update the site:
   ```bash
   npm run deploy
   ```

This will build and deploy the site to the gh-pages branch, which GitHub Pages serves at https://Ahmedelsa3eed.github.io/

Alternatively, you can deploy this portfolio to other static hosting services such as:
- Netlify
- Vercel
- AWS S3
- Firebase Hosting

## License

Feel free to use this template for your personal portfolio website.

## Maintenance

To keep your portfolio up-to-date:

1. Make changes to your code in the main branch
2. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. Deploy the updated site:
   ```bash
   npm run deploy
   ```

This workflow ensures your changes are both saved in the main branch and deployed to the live site.

For help with common deployment issues, refer to [TROUBLESHOOTING.md](TROUBLESHOOTING.md).
