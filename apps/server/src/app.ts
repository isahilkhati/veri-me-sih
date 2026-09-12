import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config(); // Load env vars BEFORE importing routes!

import { createClient } from '@supabase/supabase-js';
import multer from 'multer';
import aiRoutes from './routes/ai';
import apiRoutes from './routes';
import { adminAuth } from './middleware/adminAuth';
import adminRoutes from './routes/admin';

const app: Express = express();

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Supabase client instance (will be moved to config/supabase.ts)
const supabaseUrl = process.env.SUPABASE_URL && process.env.SUPABASE_URL.startsWith('http') 
  ? process.env.SUPABASE_URL 
  : 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'placeholder_key';
export const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'Nexus API is running' });
});

app.use('/api', apiRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/admin', adminAuth, adminRoutes);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

export default app;
