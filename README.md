# Communication Platform App

A full-stack communication platform inspired by Discord, built using modern web technologies. The application supports real-time text, audio, and video communication, server and channel management, member invitations, and more.

## Features

- **Real-time Communication**: Supports text, audio, and video chat.
- **Server and Channel Management**: Create and manage servers and channels.
- **Member Invitations**: Invite members to servers and channels.
- **Real-time Updates**: Leverages WebSockets for real-time messaging and updates.
- **Authentication**: Secure user authentication using Clerk.
- **Responsive Design**: A user-friendly interface designed with Tailwind CSS and shadcn.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, Prisma ORM, MySQL
- **Real-Time Communication**: WebSocket.io, LiveKit
- **Styling**: Tailwind CSS, shadcn
- **Authentication**: Clerk

## Installation

### Prerequisites

- Node.js (v16+)
- MySQL

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/PramodMahajan14/discord-clone
   cd your-repo-name
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/your_database"
   NEXT_PUBLIC_CLERK_FRONTEND_API="your-clerk-frontend-api"
   CLERK_API_KEY="your-clerk-api-key"
   LIVEKIT_PUBLIC_URL="your-livekit-server-url"
   NEXT_PUBLIC_LIVEKIT_API_KEY="your-livekit-api-key"
   NEXT_PUBLIC_LIVEKIT_API_SECRET="your-livekit-api-secret"
   ```

4. Set up the database:

   ```bash
   npx prisma migrate dev
   ```

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open the app in your browser:

   ```
   http://localhost:3000
   ```

## Usage

- **Login/Register**: Users can register and log in securely.
- **Create Servers and Channels**: Create and manage servers and channels to organize communication.
- **Invite Members**: Send invitations to other users to join servers.
- **Real-Time Chat**: Enjoy real-time messaging, audio, and video calls.

## Project Structure

```plaintext
src/
├── app/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility libraries and helper functions
├── pages/         # Next.js pages
├── prisma/        # Prisma schema and migrations
├── public/        # Static assets
├── components/ui/        # Global and component-specific styles
└── utils/         # Utility functions
```

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.
- `npx prisma studio`: Launch Prisma Studio for database management.

## Future Enhancements

- Implement role-based access control.
- Add notification support.
- Integrate third-party services for extended functionalities.
- Optimize performance for larger user bases.

## Acknowledgments

- [Clerk](https://clerk.dev/) for authentication.
- [LiveKit](https://livekit.io/) for real-time audio and video communication.
- [Prisma](https://prisma.io/) for database ORM.
- [Tailwind CSS](https://tailwindcss.com/) for styling.

---
