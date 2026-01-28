# 🐞 Bugs Fixed – Unolo Field Tracker

This document lists the major bugs identified and fixed during development and testing of the Unolo Field Tracker application.

---

## 1. Authentication / Login Bugs

### Bug 1.1 – Login failed even with valid credentials  
- **Issue:** Login always showed “Invalid credentials”  
- **Root Cause:** Dummy / incorrect bcrypt password hash used in `seed.sql`  
- **Fix:** Replaced placeholder hash with a valid bcrypt hash  
- **File:** seed.sql  

---

### Bug 1.2 – User redirected back to login after successful sign-in  
- **Issue:** Login succeeded but session was not maintained  
- **Root Cause:** Auth token not stored or reused correctly  
- **Fix:** Stored token properly and reused it for protected routes  
- **File:** Login.jsx / auth logic  

---

### Bug 1.3 – Protected APIs returned Unauthorized  
- **Issue:** Dashboard, check-in, history APIs failed with 401/403  
- **Root Cause:** Authorization header missing in API requests  
- **Fix:** Added `Authorization: Bearer <token>` using axios config  
- **File:** api.js  

---

### Bug 1.4 – JWT token verification failed  
- **Issue:** Backend rejected valid tokens  
- **Root Cause:** `.env` file not created from `.env.example`  
- **Fix:** Proper JWT secret configured 
- **File:** .env  

---

## 2. Dashboard Bugs

### Bug 2.1 – Dashboard failed to load (500 error)  
- **Issue:** Dashboard showed “Failed to load dashboard”  
- **Root Cause:** Incorrect API logic for employee dashboard  
- **Fix:** Used correct employee dashboard route and logic  
- **File:** dashboard.js  

---

### Bug 2.2 – Dashboard data missing  
- **Issue:** Stats and lists were empty  
- **Root Cause:** SQL query mismatch and incorrect joins  
- **Fix:** Corrected queries and employee ID usage  
- **File:** dashboard.js  

---

## 3. Check-in Bugs

### Bug 3.1 – Check-in failed after selecting client  
- **Issue:** “Check-in failed” shown in UI  
- **Root Cause:** Column mismatch (`lat/lng` vs `latitude/longitude`)  
- **Fix:** Aligned insert query with database schema  
- **File:** checkin.js  

---

### Bug 3.2 – Multiple active check-ins allowed  
- **Issue:** User could check in multiple times without checkout  
- **Root Cause:** Missing active check-in validation  
- **Fix:** Blocked new check-in if status is `checked_in`  
- **File:** checkin.js  

---

## 4. Checkout Bugs

### Bug 4.1 – Checkout always failed  
- **Issue:** “Checkout failed” with 500 error  
- **Root Cause:** SQL query used non-existent column `checked_out`  
- **Fix:** Used correct condition `status = 'checked_in'`  
- **File:** checkin.js 

---

### Bug 4.2 – Wrong check-in updated during checkout  
- **Issue:** Incorrect record updated  
- **Root Cause:** Missing ordering in query  
- **Fix:** Used `ORDER BY checkin_time DESC LIMIT 1`  
- **File:** checkin.js  

---

## 5. History Page Bugs

### Bug 5.1 – History page blank  
- **Issue:** History page rendered empty screen  
- **Root Cause:** `.reduce()` called on `null`  
- **Fix:** Initialized check-ins state as empty array  
- **File:** History.jsx  
- **Line:** ___  

---

### Bug 5.2 – History data not loading  
- **Issue:** No records shown despite existing data  
- **Root Cause:** API route mismatch  
- **Fix:** Aligned frontend and backend history endpoints  
- **File:** History.jsx / checkin.js  

---

### Bug 5.3 – Incorrect total hours calculation  
- **Issue:** Extremely large total hours displayed  
- **Root Cause:** Active check-ins included in calculation  
- **Fix:** Excluded active check-ins from total hours logic  
- **File:** History.jsx  

---

## 6. Database / Infrastructure Bugs

### Bug 6.1 – SQLite schema mismatch  
- **Issue:** Runtime SQL errors  
- **Root Cause:** Queries written assuming MySQL behavior  
- **Fix:** Updated queries to match SQLite schema  
- **File:** checkin.js / dashboard.js  

---

### Bug 6.2 – API base URL misconfiguration  
- **Issue:** Frontend requests not reaching backend  
- **Root Cause:** Incorrect API base URL  
- **Fix:** Corrected axios base configuration  
- **File:** api.js  

---
