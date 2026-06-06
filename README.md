# FormFlow

A modern form builder and response management platform inspired by Google Forms.

[🔗 Live Demo](https://form-flow-ashen.vercel.app/)

## Features

* AI-assisted Form Generation
* Google Authentication with Firebase
* Create and manage forms
* Share forms using unique links, QR Code
* Collect responses in real-time
* Export responses to Excel
* Protected dashboard routes
* Responsive UI
* Firestore database integration
* Form ownership and access control
* Public form submission support

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Zustand

### Backend & Database

* Firebase Authentication
* Cloud Firestore

### Deployment

* Vercel

## Screenshots

* Home Page
![Home Page](./public/home-page.png)

* Form Builder
![Form Builder](./public/form-builder.png)

* Response Dashboard
![ Response Dashboard](./public/response-page.png)

* Form Preview
![Form Preview](./public//form-preview.png)

## Installation

Clone the repository:

```bash
git clone <your-repository-url>
```

Move into the project:

```bash
cd formflow
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Start the development server:

```bash
npm run dev
```

## Project Structure

```text
src/
├── components/
├── pages/
├── utils/
├── main.jsx
├── router.jsx
```

## How It Works

### Form Creation

Users can create custom forms with multiple fields and configure form settings.

### Sharing

Each form generates a unique shareable URL.

### Response Collection

Responses are stored securely in Firestore and linked to their respective forms.

### Analytics & Export

Form owners can view submissions and export responses to Excel.

## Security

* Firebase Authentication
* Protected Routes
* Firestore Security Rules
* Form Ownership Validation

## Future Improvements

* Response Analytics Dashboard
* Custom Themes
* Email Notifications
* Team Collaboration

## Author

Mahadev Kumar

## License

This project is licensed under the MIT License.
