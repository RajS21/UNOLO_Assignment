# QUESTIONS

## Technical Questions

### 1. If this app had 10,000 employees checking in simultaneously, what would break first? How would you fix it?

If 10,000 employees check in at the same time, the database would be the first bottleneck because many write operations would happen together. The API server may also slow down due to limited connections.

To fix this, I would use database connection pooling, add proper indexes on frequently queried columns, and scale the backend using multiple instances with a load balancer. For heavy operations like reports, caching can also help.

---

### 2. The current JWT implementation has a security issue. What is it and how would you improve it?

The current JWT token does not have token rotation or refresh tokens, so if a token is leaked, it can be used until it expires. Also, tokens are long-lived which increases risk.

To improve this, I would add refresh tokens, reduce access token expiry time, store tokens securely, and validate token expiration and user role on every request.

---

### 3. How would you implement offline check-in support? (Employee has no internet, checks in, syncs later)

For offline support, I would store the check-in data locally in the browser using localStorage or IndexedDB. When the internet becomes available, the app can automatically sync the stored check-ins with the backend.

I would also add timestamps to avoid duplicate entries and handle conflicts properly during sync.

---

## Theory / Research Questions

### 4. Explain the difference between SQL and NoSQL databases. For this application, which would you recommend and why?

SQL databases use structured tables with fixed schemas and are good for relational data. NoSQL databases are more flexible and store data in formats like documents or key-value pairs.

For this Field Force Tracker app, I would recommend SQL because the data has clear relationships (users, clients, check-ins) and requires complex queries and reports.

---

### 5. What is the difference between authentication and authorization? Identify where each is implemented in this codebase.

Authentication is the process of verifying who the user is. Authorization is checking what the user is allowed to do.

In this project, authentication is handled using JWT tokens when the user logs in. Authorization is implemented by checking the user role (employee or manager) before allowing access to certain APIs like the daily summary report.

---

### 6. Explain what a race condition is. Can you identify any potential race conditions in this codebase? How would you prevent them?

A race condition happens when multiple requests try to modify the same data at the same time, leading to incorrect results.

In this codebase, a possible race condition can occur if an employee tries to check in multiple times quickly. To prevent this, I would use database constraints, transactions, or locks to ensure only one active check-in per employee.
