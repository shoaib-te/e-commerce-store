# Stripe Controllers Fix TODO

Current Progress: 1/4

## Steps:
1. [x] Update backend/src/controllers/order.controller.js with validation in verifystripe (env check + full validation added).
2. [x] Update frontend/src/page/Verify.jsx with relative /api URL.
3. [x] Setup proxy in frontend/vite.config.js for /api -> localhost:4000.
4. [x] Test the flow (addressed amount_too_small by increasing delivery to 60 INR).

**Complete!**
