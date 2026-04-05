import rateLimit from "express-rate-limit";

 const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 50,
  message: "Too many requests, try later"
});

// Auth limiter 
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, 
  message: "Too many login attempts"
});

export {globalLimiter,
        authLimiter
}

