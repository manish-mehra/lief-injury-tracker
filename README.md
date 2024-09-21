# Injury Tracking System

## Overview

This application is an Injury Tracking System built for organizations such as the police to easily record and track injuries reported by individuals. It provides a user-friendly interface for creating, viewing, updating, and deleting injury reports, with a unique feature allowing users to visually mark injuries on a body map.

## Tech Stack

- Frontend: Next.js (App Router)
- Backend: Firebase
- API: GraphQL
- Authentication: Auth0
- UI Library: Ant Design
- SVG Handling: ReactSvg

## Key Features

1. **User Authentication**
   - Implemented using Auth0
   - Supports email and Google login
   - Custom Auth0 action to store user data in Firebase upon signup

2. **Injury Reporting**
   - Create, view, update, and delete injury reports
   - Interactive body map for marking injury locations
   - Automatic labeling of marked body parts
   - Detailed injury description for each marked area

3. **Report Management**
   - List view of all injury reports
   - Sorting functionality
   - Search by name
   - Filter by injury date

4. **Interactive Body Map**
   - SVG-based front and back body views
   - Click-to-select body parts
   - Synchronized selection between front and back views
   - Automatic labeling of selected areas

## GraphQL Types and Endpoints

```graphql
type Injury {
 label: String
 description: String
}
  
type Report {
  id: String!
  reporterName: String!
  date: String!
  injuries: [Injury]!
}
type Query {
  getInjuryReport(id: String!): QueryResponse!
  getAllInjuryReports: AllReportsResponse!
}

type Mutation {
  addInjuryReport(report: ReportInput!): MutationResponse!
  updateInjuryReport(id: String!, report: ReportInput!): MutationResponse!
  deleteInjuryReport(id: String!): MutationResponse!
}
```


## Authentication Flow

- Next.js dynamically creates auth routes in /api/auth/[auth0]
- Upon successful signup/login, Auth0 triggers a webhook to /api/auth/hook
- The webhook stores the user data in Firebase

## Marking Injuries on Body Parts

One of the core features of this Injury Tracking System is the ability for users to visually mark and describe injuries on a body map. This feature is implemented using a combination of SVG manipulation and React state management.

### SVG Body Map

- The application uses two SVG files representing front and back views of a human body.
- Each body part in the SVG is represented by a separate path element.
- Body parts are assigned specific classes (e.g., "hand left") for easy identification and manipulation.

### Interaction Mechanism

1. **SVG Injection**: 
   - The SVG files are dynamically injected into the DOM using the ReactSvg package.
   - This approach allows for efficient loading and manipulation of complex SVG structures.

2. **Custom Event Listeners**:
   - A custom function `addSvgClickListener(svgEl: SVGSVGElement, callback: Function)` is used to add click event listeners to the SVG elements.
   - This function is defined in a separate `dom_helper` file for better code organization.

3. **Click Handling**:
   - When a user clicks on a body part, the event listener captures the click.
   - The classes of the clicked SVG path are passed to a callback function.

4. **Visual Feedback**:
   - Clicked body parts are visually highlighted by adding a `.select` class to the corresponding SVG path.
   - This provides immediate visual feedback to the user about their selection.

5. **Synchronized Selection**:
   - The selection is synchronized between front and back views.
   - For example, clicking on the left hand in the front view also selects the left hand in the back view.

6. **React State Integration**:
   - The selected body parts are tracked in a React state (`injuryList`).
   - This state is used to render a list of input fields for injury descriptions.

7. **Injury Description**:
   - For each selected body part, users can add a detailed description of the injury.
   - These descriptions are linked to the specific body parts in the injury report.

### Benefits of this Approach

- **Intuitive User Interface**: Users can visually identify and mark injuries, making the reporting process more intuitive and accurate.
- **Flexibility**: 
  - The SVG-based approach allows for easy customization and potential expansion to include more detailed body maps.
  - Currently, the following body parts are marked with classes: `.leg`, `.foot`, `.hips`, `.back`, `.waist`, `.chest`, `.neck`, `.shoulder`, `.arm`, `.hand`, `.head`.
  - More precise selections are possible using combinations of classes, e.g., `.leg.right.upper` for the right thigh.
  - This system can be easily extended to include more detailed or specific body parts by adding more granular classes or labels to the SVG paths.