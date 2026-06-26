# Implementation Plan - Notification Microservice

This plan outlines the design and implementation of a new Notification Microservice under `backend/notification-service`. It will expose client-facing notification APIs and an internal notification creation API, running on port `4005`. It will reference entities from `kyc-service`, `user-service`, and `document-service`.

## Proposed Folder Structure
Following the structure of `document-service`, the notification microservice will be organized as:
```
backend/notification-service/
├── .dockerignore
├── .gitignore
├── Dockerfile
├── package.json
└── src/
    ├── app.js
    ├── server.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── notificationController.js
    ├── middlewares/
    │   ├── authMiddleware.js
    │   ├── errorMiddleware.js
    │   └── notFoundMiddleware.js
    ├── models/
    │   └── Notification.js
    ├── routes/
    │   └── notificationRoutes.js
    └── services/
        └── notificationService.js
```

---

## User Review Required

> [!IMPORTANT]
> - **Port 4005**: The service will run on port `4005` as requested. We will add configuration to run it standalone and update `docker-compose.yml` to include this service.
> - **Auth Secret**: The user-facing APIs will require a valid JWT token. The service will verify the token using the shared `JWT_ACCESS_SECRET` environment variable, identical to `document-service` and `user-service`.

---

## Open Questions

None at the moment. We will proceed with implementing the clean, layered structure using ES Modules.

---

## Proposed Changes

### Configuration and Setup

#### [NEW] [package.json](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/package.json)
Create `package.json` with dependencies like `express`, `mongoose`, `jsonwebtoken`, `cors`, `helmet`, `morgan`, and `dotenv`. Set type to `module`.

#### [NEW] [Dockerfile](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/Dockerfile)
Create Dockerfile for containerizing the notification service.

#### [NEW] [.dockerignore](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/.dockerignore)
Ignore `node_modules` and other local development artifacts.

#### [NEW] [.gitignore](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/.gitignore)
Ignore `node_modules` and local environment files.

#### [NEW] [db.js](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/src/config/db.js)
Define the Mongoose DB connection function.

#### [NEW] [app.js](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/src/app.js)
Configure middleware, health checks, routes, and standard error handling.

#### [NEW] [server.js](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/src/server.js)
Bootstrap server on port `4005`, connecting to MongoDB and listening for requests.

#### [MODIFY] [docker-compose.yml](file:///d:/prj/MutualFund-Onboarding-KYC/backend/docker-compose.yml)
Add `notification-service` to the Docker orchestration list.

---

### Middlewares

#### [NEW] [authMiddleware.js](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/src/middlewares/authMiddleware.js)
Authentication middleware to verify incoming user JWT tokens.

#### [NEW] [errorMiddleware.js](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/src/middlewares/errorMiddleware.js)
Global error handler middleware.

#### [NEW] [notFoundMiddleware.js](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/src/middlewares/notFoundMiddleware.js)
Catch-all 404 middleware.

---

### Data Models & Services (Database Layer)

#### [NEW] [Notification.js](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/src/models/Notification.js)
Notification model schema referencing:
- `userId` (from `user-service`)
- `referenceId` (representing associated documents from `document-service` or KYC records from `kyc-service`)
- `referenceType` (`USER`, `KYC`, `DOCUMENT`, `SYSTEM`)

#### [NEW] [notificationService.js](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/src/services/notificationService.js)
Encapsulate DB operations:
- Query user notifications.
- Retrieve unread notification count.
- Update read statuses (single or bulk).
- Create new notification records.

---

### Controller & Routing Layer

#### [NEW] [notificationController.js](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/src/controllers/notificationController.js)
Handle request/response lifecycle:
- `getNotifications` (user client)
- `getUnreadCount` (user client)
- `markAsRead` (user client)
- `markAllAsRead` (user client)
- `createInternalNotification` (internal service-to-service creation endpoint)

#### [NEW] [notificationRoutes.js](file:///d:/prj/MutualFund-Onboarding-KYC/backend/notification-service/src/routes/notificationRoutes.js)
Route mappings:
- `GET /api/notifications` (authenticated)
- `GET /api/notifications/unread-count` (authenticated)
- `PATCH /api/notifications/:notificationId/read` (authenticated)
- `PATCH /api/notifications/read-all` (authenticated)
- `POST /internal/notifications` (internal endpoint)

---

## Verification Plan

### Automated Tests
Currently, the codebase does not have an automated test suite configured. We will test running the service locally and making HTTP requests.

### Manual Verification
1. Start MongoDB.
2. Start the notification service:
   ```bash
   npm run dev
   ```
3. Test endpoints using `curl` or a REST client:
   - `GET http://localhost:4005/health` to verify service availability.
   - `POST http://localhost:4005/internal/notifications` to trigger a test notification.
   - Authenticated client requests with verification of JWT decoding.
