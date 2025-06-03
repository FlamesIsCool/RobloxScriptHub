const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static frontend from /public
app.use(express.static(path.join(__dirname, 'public')));

// Optional: Proxy API requests if needed in future
app.get('/api/scripts', async (req, res) => {
    const { tab = 'home' } = req.query;
    let apiUrl = 'https://scriptblox.com/api/script/fetch';
    if (tab === 'popular') apiUrl += '?filters=popular';
    else if (tab === 'universal') apiUrl += '?filters=universal';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch scripts from ScriptBlox.' });
    }
});

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
