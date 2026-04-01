const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors()); // Ye line zaroori hai!
app.use(express.json());

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// GET Ads Route
app.get('/api/ads', async (req, res) => {
    const { status } = req.query; // Browser se status pakrein
    
    let query = supabase.from('ads').select('*');

    // Agar URL mein status diya hai (jaise approved), toh filter lagao
    if (status) {
        query = query.eq('status', status);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) return res.status(400).json(error);
    res.json(data || []);
});

// PATCH Status Route
app.patch('/api/ads/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const { data, error } = await supabase
        .from('ads')
        .update({ status: status })
        .eq('id', id)
        .select();

    if (error) return res.status(400).json(error);
    res.json(data);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));