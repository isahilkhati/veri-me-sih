"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load env vars BEFORE importing routes!
const supabase_js_1 = require("@supabase/supabase-js");
const ai_1 = __importDefault(require("./routes/ai"));
const routes_1 = __importDefault(require("./routes"));
const adminAuth_1 = require("./middleware/adminAuth");
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '50mb' }));
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
// Supabase client instance (will be moved to config/supabase.ts)
const supabaseUrl = process.env.SUPABASE_URL && process.env.SUPABASE_URL.startsWith('http')
    ? process.env.SUPABASE_URL
    : 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'placeholder_key';
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
app.get('/health', async (req, res) => {
    try {
        // Ping Supabase to keep it awake
        await exports.supabase.from('profiles').select('id').limit(1);
        res.status(200).json({ status: 'OK', message: 'Kaushal Setu API is running, DB is awake' });
    }
    catch (err) {
        res.status(500).json({ status: 'ERROR', message: 'DB Ping failed' });
    }
});
app.use('/api', routes_1.default);
app.use('/api/ai', ai_1.default);
app.use('/api/admin', adminAuth_1.adminAuth, admin_1.default);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});
exports.default = app;
//# sourceMappingURL=app.js.map