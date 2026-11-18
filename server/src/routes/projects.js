import { Router } from 'express';
import Project from '../models/Project.js';
import { isDBConnected } from '../db.js';
import localProjects from '../../../shared/projects.json' with { type: 'json' };

const router = Router();
const CATEGORIES = new Set(['fundamentals', 'frontend', 'fullstack']);

// GET /api/projects?category=frontend
router.get('/', async (req, res) => {
  // Only accept a known string, never an object, so query operators can't be injected.
  const category = CATEGORIES.has(req.query.category) ? req.query.category : undefined;

  if (isDBConnected()) {
    const projects = await Project.find(category ? { category } : {})
      .sort({ featured: -1, year: -1 })
      .select('-__v')
      .lean();
    return res.json(projects);
  }

  res.json(category ? localProjects.filter((p) => p.category === category) : localProjects);
});

export default router;
