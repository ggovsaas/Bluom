// server/routes/personalization.js
import express from 'express';
import pool from '../db.js';
import { generatePersonalizedPlan, getLatestPlan } from '../services/personalizationService.js';

const router = express.Router();

// Middleware: authenticate user however you do (JWT/session)
// For simplicity we accept userId in query or body if no auth.
async function ensureUser(req, res, next) {
  const userId = req.user?.id || req.query.userId || req.body.userId;
  if (!userId) return res.status(401).json({ error: 'userId missing' });
  req.userId = Number(userId);
  next();
}

// Middleware: check trial/premium
async function checkPremiumOrTrial(req, res, next) {
  const userId = req.userId;

  const { rows } = await pool.query(
    'SELECT premium, trial_started_at, trial_days FROM users WHERE id=$1',
    [userId]
  );

  const user = rows[0];
  if (!user) return res.status(404).json({ error: 'User not found' });

  if (user.premium) return next();

  if (!user.trial_started_at) {
    // start trial implicitly on first premium action (optional)
    const startedAt = new Date();
    await pool.query('UPDATE users SET trial_started_at=$1 WHERE id=$2', [startedAt, userId]);
    return next();
  }

  const started = new Date(user.trial_started_at);
  const days = Number(user.trial_days || 3);
  const diffDays = Math.floor((Date.now() - started.getTime()) / (24 * 60 * 60 * 1000));

  if (diffDays < days) return next();

  return res.status(402).json({ error: 'Trial expired / Not premium' });
}

// GET /api/personalized-plan?userId=...
router.get('/', ensureUser, async (req, res) => {
  try {
    const cached = await getLatestPlan(req.userId);
    if (cached) return res.json(cached);

    // generate on the fly (non-premium allowed)
    const plan = await generatePersonalizedPlan(req.userId);
    return res.json(plan);
  } catch (err) {
    console.error('Error fetching plan:', err);
    return res.status(500).json({ error: 'Failed to fetch plan' });
  }
});

// POST /api/personalized-plan/regenerate  (premium or trial)
router.post('/regenerate', ensureUser, checkPremiumOrTrial, async (req, res) => {
  try {
    const plan = await generatePersonalizedPlan(req.userId);
    return res.json(plan);
  } catch (err) {
    console.error('Error regenerating plan:', err);
    return res.status(500).json({ error: 'Failed to generate plan' });
  }
});

export default router;


