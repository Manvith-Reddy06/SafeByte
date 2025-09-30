# AMU & MRL Compliance Monitoring Platform

This project is a comprehensive digital ecosystem designed to monitor Antimicrobial Usage (AMU) and Maximum Residue Level (MRL) compliance in agriculture. It consists of a backend API and three interconnected web applications tailored for Government Authorities, Veterinarians, and Farmers. The platform facilitates seamless data flow, enhances transparency, and provides powerful tools for analysis and enforcement to ensure food safety and promote responsible antimicrobial stewardship.

## Platform Architecture

The platform is composed of four distinct but integrated applications, each serving a specific purpose:

### 1. Backend API
The central nervous system of the platform. A RESTful API built with Node.js and Express that handles all business logic, data processing, and communication with the PostgreSQL database. It serves data to all three frontend applications and manages user authentication and authorization.

### 2. Government Authority Application
A powerful administrative and analytics platform for officials (administrators, inspectors, veterinary officers) to oversee and enforce compliance.

*   **Dashboard:** A central analytics hub displaying real-time KPIs (Total Farms, MRL Compliance %), compliance charts, AMU trends, and recent activities. Interactive charts and a geographic heatmap provide an at-a-glance overview of the entire system.
*   **Farm & Vet Management:** A comprehensive registry of all monitored farms and veterinarians. Officials can view detailed farm profiles, including compliance history, treatments, prescriptions, and active alerts. The vet registry allows for the verification and management of veterinary officers.
*   **Prescription Analysis:** An explorer for all prescriptions, featuring Optical Character Recognition (OCR) to automatically parse uploaded documents, extract key data, and assign confidence scores for rapid verification.
*   **Reporting:** A robust tool for generating and exporting custom, detailed reports on AMU, MRL compliance, and other metrics in PDF and CSV formats.
*   **Settings:** A configuration panel for adjusting system-wide thresholds, notification rules, and language preferences.

### 3. Farmer Application
A user-friendly portal for farmers to manage their farm's data, track compliance, and interact with veterinarians and authorities.

*   **Farm Dashboard:** A personalized overview of the farm's current compliance status, active withdrawal periods, and recent alerts.
*   **Treatment Logging:** An interface to easily record all antimicrobial treatments administered to livestock.
*   **Prescription Upload:** A simple-to-use feature for uploading prescription documents (via image or PDF) for OCR processing and verification.
*   **Alerts & Notifications:** Real-time notifications for MRL violations, upcoming withdrawal period completions, and communications from authorities.

### 4. Veterinarian Application
A professional tool for registered veterinarians to issue and manage prescriptions, monitor farm health, and ensure best practices.

*   **Digital Prescription Issuance:** A secure module for creating, signing, and issuing digital prescriptions directly to farmers.
*   **Farm Management:** A view of all associated farms, allowing vets to monitor treatment histories and compliance records.
*   **Profile & Verification:** A portal for veterinarians to manage their registration, upload credentials, and track their verification status with government authorities.

## Core System Functionalities

*   **Data-Driven Analytics:** The Government dashboard provides deep insights with interactive charts for compliance distribution, AMU trends, and top-used drugs. Chart segments are clickable to filter data across the application.
*   **OCR-Powered Prescription Verification:** A standout feature is the ability to process uploaded prescription images. The system uses OCR to automatically extract key information like drug names, dosages, and dates, assigning a confidence score to each field for rapid verification.
*   **Compliance & Alerting Engine:** The system automatically calculates MRL compliance and withdrawal period adherence, triggering color-coded alerts (Green for compliant, Amber for warning, Red for violation) across all three applications.
*   **Unified User Experience:** The platform maintains a consistent and intuitive UI across all applications, featuring a persistent navigation sidebar, a global search, a date range filter, and a language switcher.

## Technology Stack

This project is built with a modern, robust tech stack chosen for performance, scalability, and an excellent developer experience.

### Frontend
-   **Framework:** Next.js (with App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **UI Components:** shadcn/ui
-   **Data Visualization:** Recharts
-   **Icons:** Lucide React
-   **API Communication:** Axios
-   **Data Fetching & State Management:** Tanstack Query (React Query)
-   **Internationalization (i18n):** Support for English (EN) and Telugu (తెలుగు).

### Backend
-   **Framework:** Node.js, Express.js
-   **Language:** TypeScript
-   **Database:** PostgreSQL
-   **ORM:** Prisma (or TypeORM)
-   **Authentication:** JWT (JSON Web Tokens)

## API Endpoints (Sample)

The backend exposes a RESTful API that the frontend applications consume. Below are some example routes.

| Method | Endpoint | Description | User Role |
| :--- | :--- | :--- | :--- |
| **Authentication** | | | |
| `POST` | `/api/auth/login` | Authenticate a user and return a JWT. | All |
| `POST` | `/api/auth/logout` | Log out the current user. | All |
| `GET` | `/api/auth/me` | Get the profile of the currently logged-in user. | All |
| **Government** | | | |
| `GET` | `/api/gov/dashboard/kpis` | Retrieve main KPIs for the dashboard. | Government |
| `GET` | `/api/gov/farms` | Get a paginated list of all farms with filters. | Government |
| `GET` | `/api/gov/farms/:farmId` | Get detailed information for a specific farm. | Government |
| `PUT` | `/api/gov/vets/:vetId/verify` | Approve or reject a veterinarian's registration. | Government |
| `GET` | `/api/gov/prescriptions` | Get a list of all prescriptions with search/filters. | Government |
| `POST`| `/api/gov/reports` | Generate and request a downloadable report. | Government |
| **Farmer** | | | |
| `GET` | `/api/farmer/dashboard` | Get dashboard data for the farmer's specific farm. | Farmer |
| `POST`| `/api/farmer/treatments` | Log a new antimicrobial treatment. | Farmer |
| `GET` | `/api/farmer/treatments` | View treatment history for the farm. | Farmer |
| `POST`| `/api/farmer/prescriptions/upload` | Upload a prescription image for OCR processing. | Farmer |
| **Veterinarian** | | | |
| `GET` | `/api/vet/dashboard` | Get dashboard data for the veterinarian. | Veterinarian |
| `POST`| `/api/vet/prescriptions` | Create and issue a new digital prescription. | Veterinarian |
| `GET` | `/api/vet/farms` | Get a list of all farms associated with the vet. | Veterinarian |

## Project Structure

The repository is organized as a monorepo, with each application in its own directory.

```
/
├── apps/
│   ├── backend/         # Backend API (Node.js, Express)
│   ├── government/      # Government Authority Web App
│   ├── farmer/          # Farmer Web App
│   └── veterinarian/    # Veterinarian Web App
├── packages/
│   ├── ui/              # Shared UI components
│   └── config/          # Shared configurations (ESLint, etc.)
└── package.json
```

## Getting Started

To get the project up and running on your local machine, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your system:
-   Node.js (v18 or later)
-   npm (or a compatible package manager like yarn or pnpm)
-   PostgreSQL
-   Docker (optional, for easy database setup)

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone <repository-url>
    ```

2.  Navigate into the project's root directory:
    ```bash
    cd <project-folder-name>
    ```

3.  Install all the necessary dependencies for the entire monorepo:
    ```bash
    npm install
    ```

4.  **Set up the Backend Environment**
    -   Navigate to the backend directory: `cd apps/backend`
    -   Create a `.env` file by copying the example: `cp .env.example .env`
    -   Update the `.env` file with your PostgreSQL database connection string and other required variables (e.g., `DATABASE_URL`, `JWT_SECRET`).

5.  **Run Database Migrations**
    -   From the `apps/backend` directory, run the migration command (this assumes Prisma):
        ```bash
        npx prisma migrate dev
        ```

### Running the Development Servers

You can run each application individually or all at once from the **root directory**.

#### Run a Specific Application

To run a single application (e.g., the Government app), use the `npm run dev` command with the `--workspace` flag.

```bash
# Run the Backend API (e.g., on http://localhost:5000)
npm run dev --workspace=backend

# Run the Government App (e.g., on http://localhost:3000)
npm run dev --workspace=government

# Run the Farmer App (e.g., on http://localhost:3001)
npm run dev --workspace=farmer

# Run the Veterinarian App (e.g., on http://localhost:3002)
npm run dev --workspace=veterinarian
```

#### Run All Applications Concurrently

To start all applications simultaneously, you can use a script runner like `concurrently`. First, install it if you haven't already:

```bash
npm install -g concurrently
```

Then, run the following command from the root directory:

```bash
concurrently "npm:dev --workspace=backend" "npm:dev --workspace=government" "npm:dev --workspace=farmer" "npm:dev --workspace=veterinarian"
```

Open the respective `localhost` ports in your browser to view each frontend application.
