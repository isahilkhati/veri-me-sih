"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app_1 = require("../app");
const router = (0, express_1.Router)();
// GET /users - List all users with pagination and filtering
router.get('/users', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const search = req.query.search;
        const role = req.query.role;
        const offset = (page - 1) * limit;
        console.log('[API] /users - Start');
        try {
            let query = app_1.supabase.from('profiles').select('*', { count: 'exact' });
            if (search) {
                query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%`);
            }
            if (role) {
                query = query.eq('role', role);
            }
            console.log('[API] /users - Executing query.range()');
            const { data: users, count, error } = await query.range(offset, offset + limit - 1);
            console.log('[API] /users - query.range() returned. Error:', error);
            if (error) {
                console.error("Users Table Error:", error);
                throw error;
            }
            // Try to fetch auth users if service role key is present, otherwise skip
            let authUsersMap = new Map();
            if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
                console.log('[API] /users - Fetching listUsers()');
                const { data: authUsers, error: authError } = await app_1.supabase.auth.admin.listUsers();
                console.log('[API] /users - listUsers() returned. Error:', authError);
                if (!authError && authUsers) {
                    authUsersMap = new Map(authUsers.users.map(u => [u.id, u]));
                }
                else if (authError) {
                    console.error('[API] /users - listUsers() error but ignoring:', authError);
                }
            }
            const enrichedUsers = users?.map(u => ({
                ...u,
                last_sign_in_at: authUsersMap.get(u.id)?.last_sign_in_at || null
            })) || [];
            console.log(`[Admin API] /users fetched ${enrichedUsers.length} users (total count: ${count})`);
            res.json({
                data: enrichedUsers,
                meta: {
                    total: count,
                    page,
                    limit,
                    totalPages: count ? Math.ceil(count / limit) : 0
                }
            });
        }
        catch (e) {
            console.error('[API] /users - FATAL THROW:', e);
            throw e;
        }
    }
    catch (error) {
        console.error('[API] /users - SENDING 500:', error.message);
        res.status(500).json({ error: error.message });
    }
});
// GET /users/:id - Full user detail
router.get('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { data: profile, error: profileError } = await app_1.supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();
        if (profileError)
            throw profileError;
        const { data: applications, error: appsError } = await app_1.supabase
            .from('applications')
            .select('*')
            .eq('student_id', id);
        const { count: conversationsCount, error: convError } = await app_1.supabase
            .from('ai_conversations')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', id);
        res.json({
            ...profile,
            applications: applications || [],
            ai_conversations_count: conversationsCount || 0
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// POST /users/:id/reset-password
router.post('/users/:id/reset-password', async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        if (!newPassword)
            return res.status(400).json({ error: 'newPassword is required' });
        const { data, error } = await app_1.supabase.auth.admin.updateUserById(id, { password: newPassword });
        if (error)
            throw error;
        res.json({ message: 'Password updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// POST /users/:id/update-role
router.post('/users/:id/update-role', async (req, res) => {
    try {
        const { id } = req.params;
        const { role } = req.body;
        if (!role)
            return res.status(400).json({ error: 'role is required' });
        const { error } = await app_1.supabase
            .from('profiles')
            .update({ role })
            .eq('id', id);
        if (error)
            throw error;
        res.json({ message: 'Role updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// DELETE /users/:id
router.delete('/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { error } = await app_1.supabase.auth.admin.deleteUser(id);
        if (error)
            throw error;
        res.json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET /stats
router.get('/stats', async (req, res) => {
    try {
        const [{ count: totalUsers, error: err1 }, { data: usersByRoleData, error: err2 }, { count: newUsersThisWeek, error: err3 }, { count: totalOpportunities, error: err4 }, { count: totalApplications, error: err5 }, { count: totalAiConversations, error: err6 }, { count: totalAiMessages, error: err7 }] = await Promise.all([
            app_1.supabase.from('profiles').select('*', { count: 'exact', head: true }),
            app_1.supabase.from('profiles').select('role'),
            app_1.supabase.from('profiles').select('*', { count: 'exact', head: true }).gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
            app_1.supabase.from('opportunities').select('*', { count: 'exact', head: true }),
            app_1.supabase.from('applications').select('*', { count: 'exact', head: true }),
            app_1.supabase.from('ai_conversations').select('*', { count: 'exact', head: true }),
            app_1.supabase.from('ai_messages').select('*', { count: 'exact', head: true }),
        ]);
        if (err1)
            console.error("Stats Error totalUsers:", err1);
        if (err6)
            console.error("Stats Error aiConversations:", err6);
        const usersByRole = usersByRoleData?.reduce((acc, curr) => {
            acc[curr.role] = (acc[curr.role] || 0) + 1;
            return acc;
        }, {}) || {};
        res.json({
            totalUsers: totalUsers || 0,
            usersByRole,
            newUsersThisWeek: newUsersThisWeek || 0,
            totalOpportunities: totalOpportunities || 0,
            totalApplications: totalApplications || 0,
            totalAiConversations: totalAiConversations || 0,
            totalAiMessages: totalAiMessages || 0
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET /activity
router.get('/activity', async (req, res) => {
    try {
        const { data, error } = await app_1.supabase
            .from('activity_log')
            .select('*, profiles(full_name, email, role)')
            .order('created_at', { ascending: false })
            .limit(50);
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET /opportunities
router.get('/opportunities', async (req, res) => {
    try {
        const { data, error } = await app_1.supabase
            .from('opportunities')
            .select('*, profiles(full_name, email)');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// GET /applications
router.get('/applications', async (req, res) => {
    try {
        const { data, error } = await app_1.supabase
            .from('applications')
            .select('*, student:profiles!student_id(full_name, email), opportunities(title, company_id)');
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=admin.js.map