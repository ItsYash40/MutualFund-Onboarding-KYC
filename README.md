
# Mutual Fund Investor Onboarding & KYC Platform

![Status](https://img.shields.io/badge/Status-Development-blue)
![Team](https://img.shields.io/badge/Team-15_Members-success)
![License](https://img.shields.io/badge/License-MIT-green)

## Overview

The Mutual Fund Investor Onboarding & KYC Platform is a production-inspired fintech solution designed to simulate the investor onboarding workflow used by Mutual Fund AMCs, RTAs, and FinTech organizations across India.

The platform enables seamless digital onboarding of investors through authentication, PAN verification, Aadhaar/eKYC processing, document verification, fraud detection, and administrative approval workflows.

---

## Core Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Role-Based Access Control

### PAN Verification
- PAN Upload
- PAN Validation
- OCR Extraction

### Aadhaar & eKYC
- Aadhaar Upload
- OCR Processing
- KYC Verification

### Document Management
- Upload Documents
- Secure Storage
- Document Validation

### Video KYC
- Face Verification
- Liveness Detection
- Video Verification Workflow

### Fraud Detection
- Risk Scoring
- Suspicious Activity Detection
- AI-based Validation

### Admin Dashboard
- KYC Approval/Rejection
- User Monitoring
- Analytics Dashboard
- Audit Trail

---

# Technology Stack

## Frontend
- React.js
- Tailwind CSS

## Backend
- Node.js
- Express.js

## Database
- MongoDB

## AI Services
- Python FastAPI
- OCR Engine
- Face Verification

## Infrastructure
- Docker
- Docker Compose
- AWS S3

---

# Project Structure

```text
MutualFund-Onboarding-KYC/

│
├── frontend/
│
├── backend/
│
├── ai-services/
│
├── docs/
│
├── infra/
│
├── docker-compose.yml
│
├── README.md
│
├── CONTRIBUTING.md
│
├── ARCHITECTURE.md
│
├── .gitignore
│
└── LICENSE
```

---

# Branching Strategy

Protected Branches:

```text
main
develop
```

Feature Branches:

```text
feature/auth

feature/pan-verification

feature/aadhaar-kyc

feature/document-upload

feature/video-kyc

feature/admin-dashboard

feature/notifications

feature/fraud-detection

feature/devops
```

---

# Important Rules

## DO NOT

❌ Push directly to main

❌ Push directly to develop

❌ Merge your own Pull Request

❌ Modify another team's module without discussion

---

## DO

✅ Create a feature branch

✅ Commit regularly

✅ Test before pushing

✅ Create Pull Request

✅ Wait for Review

✅ Merge only after approval

---

# Development Workflow

## Step 1: Clone Repository

```bash
git clone https://github.com/ItsYash40/MutualFund-Onboarding-KYC.git

cd MutualFund-Onboarding-KYC
```

---

## Step 2: Fetch Latest Changes

```bash
git checkout develop

git pull origin develop
```

---

## Step 3: Create Your Feature Branch

Example:

```bash
git checkout -b feature/pan-verification
```

OR

```bash
git checkout -b feature/auth
```

---

## Step 4: Work on Your Feature

Check status:

```bash
git status
```

Add files:

```bash
git add .
```

Commit changes:

```bash
git commit -m "feat: implemented PAN validation API"
```

---

## Step 5: Push Feature Branch

```bash
git push origin feature/pan-verification
```

---

## Step 6: Create Pull Request

Open GitHub.

Create:

```text
feature/pan-verification
        ↓
develop
```

Pull Request.

Add:

- Description
- Screenshots
- Testing Results

---

## Step 7: Review Process

Pull Request Requirements:

- Code Working
- No Errors
- Documentation Updated
- Review Approved

Minimum Reviewers:

```text
1 Reviewer
+
Team Lead Approval
```

---

## Step 8: Merge

Only Team Lead or Authorized Reviewer can merge.

Workflow:

```text
Feature Branch
      ↓
Pull Request
      ↓
Review
      ↓
Develop
      ↓
Testing
      ↓
Main Release
```

---

# Commit Message Convention

Use professional commit messages.

### Feature

```bash
git commit -m "feat: add PAN OCR extraction"
```

### Bug Fix

```bash
git commit -m "fix: resolve JWT authentication issue"
```

### Documentation

```bash
git commit -m "docs: update API documentation"
```

### Refactor

```bash
git commit -m "refactor: optimize validation service"
```

---

# Pull Request Template

## Description

Brief summary of changes.

---

## Screenshots

Attach screenshots if UI changed.

---

## Testing

- [ ] Tested Locally
- [ ] No Build Errors
- [ ] No Merge Conflicts

---

## Related Issue

Issue Number:

---

# GitHub Issue Workflow

Every task must have:

```text
Issue
   ↓
Branch
   ↓
Development
   ↓
Pull Request
   ↓
Review
   ↓
Merge
```

---

# Branch Naming Convention

### Feature

```text
feature/auth

feature/pan-verification

feature/aadhaar-kyc

feature/document-upload

feature/video-kyc
```

### Bug Fix

```text
bugfix/login-error

bugfix/pan-validation
```

### Hotfix

```text
hotfix/security-patch
```

---

# Development Standards

- Write clean code
- Follow folder structure
- Avoid hardcoded values
- Use environment variables
- Add comments where necessary
- Keep commits small and meaningful

---

# Team Communication

Before starting any new task:

1. Create GitHub Issue
2. Assign Yourself
3. Create Branch
4. Start Development

Weekly progress should include:

- Completed Tasks
- Current Tasks
- Blockers
- Next Week Plan

---

# Project Maintain

### Repository

https://github.com/ItsYash40/MutualFund-Onboarding-KYC

---

