import { Router } from 'express';
import { supabase } from '../app';

const router = Router();

// Sample opportunities route
router.get('/opportunities', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('opportunities')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Create opportunity (Would normally have auth middleware)
router.post('/opportunities', async (req, res) => {
    try {
        const { title, description, type, location, author_id } = req.body;
        
        const { data, error } = await supabase
            .from('opportunities')
            .insert([{ title, description, type, location, author_id }])
            .select();

        if (error) throw error;
        res.status(201).json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Problem statements routes
router.get('/problems', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('problem_statements')
            .select(`
                *,
                industry_profiles(company_name, location)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        res.json(data);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
