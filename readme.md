Professional Portfolio for AWS DevOps (Madhu C M)

Overview
- Single-page portfolio built with HTML, CSS, and vanilla JS
- Responsive, dark mode, accessible, and fast
- Sections: About, Skills, Projects, Experience, Certifications, Contact

Quick Start
1) Open `index.html` in your browser.
2) Customize placeholders in `index.html`:
   - Replace `YOUR-LINKEDIN`, `YOUR-GITHUB`, and `your-domain.example`.
   - Update email in the contact section `madhucm@example.com`.
   - Replace `CV_MadhuCM.pdf` with your actual resume file.

Customize Content
- Edit text in sections inside `index.html`.
- Add or edit projects in the `#projects` grid. Use `data-tags` like `aws`, `k8s`, `ci`, `iac` for filtering.

Branding & Theme
- Colors are defined with CSS variables in `styles.css`. Toggle light/dark via the top-right button.

Deploy to AWS (S3 + CloudFront)
1) Create an S3 bucket for static hosting (e.g., `madhu-portfolio`).
2) Enable static website hosting and upload `index.html`, `styles.css`, `script.js`, and your resume.
3) Create a CloudFront distribution with the S3 bucket as origin. Set default root object to `index.html`.
4) Add a custom domain via Route 53 and request an ACM certificate for HTTPS.
5) Invalidate CloudFront cache after updates.

Optional: GitHub Pages
- Push this folder to a repository and enable GitHub Pages (main branch, root).

Contact Form
- The form uses Formspree. Replace the `action` URL with your Formspree endpoint, or integrate another backend.

License
- Personal use permitted. Remove this notice if preferred.
