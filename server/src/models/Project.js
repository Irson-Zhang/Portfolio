import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['fundamentals', 'frontend', 'fullstack'], required: true },
    glyph: { type: String, default: '</>' },
    tags: { type: [String], index: true },
    year: Number,
    featured: { type: Boolean, default: false },
    links: { live: String, repo: String },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
