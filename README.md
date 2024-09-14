# Workout Logger

## Description

**Workout Logger** is a web application for logging workout data at the gym. It leverages modern technologies including React, Tailwind CSS, and ShadCN for a sleek UI, and integrates with `zod` for validation, `react-hook-form` for form management, and `swr` for efficient data fetching and optimistic updates.

## Key Features

- **Workout Data Logging**: Easily log and track workout sessions.
- **Form Management**: Utilize `react-hook-form` for efficient form handling.
- **Validation**: Validate form data using `zod`.
- **Optimistic Updates**: Use `swr` for seamless data fetching and optimistic UI updates.
- **Responsive Design**: Built with Tailwind CSS and ShadCN components for a responsive and user-friendly interface.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)

### Installation

1. **Clone the repository**:

    ```bash
    git clone <repository-url>
    cd workout_logger
    ```

2. **Install dependencies** using `pnpm`:

    ```bash
    pnpm install
    ```

3. **Setup environment variables**:

    - Copy the example environment file:

      ```bash
      cp .env.example .env.local
      ```

    - Update `.env.local` with your supabase credentials

4. **Run the development server**:

    ```bash
    pnpm dev
    ```

    The application will be available at `http://localhost:3000`.

### Scripts

- **`pnpm dev`**: Start the development server.
- **`pnpm build`**: Build the application for production.
- **`pnpm start`**: Start the application in production mode.
- **`pnpm lint`**: Run linting checks.

## Key Elements

### ShadCN Components

The project utilizes ShadCN components for UI elements such as buttons, dialogs, and forms, providing a consistent and modern look.

### React Hook Form

`react-hook-form` is used for handling form state and validation efficiently.

### Zod

`zod` provides schema validation for form data, ensuring that input meets the required criteria.

### SWR

`SWR` is used for data fetching and optimistic updates, allowing for a responsive and fluid user experience.
