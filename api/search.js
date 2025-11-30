const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

// CORS enable करने के लिए
app.use(cors());
app.use(express.json());

// API endpoint
app.get('/api/search', async (req, res) => {
    try {
        const { number } = req.query;
        
        if (!number) {
            return res.status(400).json({
                success: false,
                message: 'Phone number is required'
            });
        }

        // Your actual API call
        const response = await fetch(`https://happy-family-api.vercel.app/api/aggregate?number=${number}`);
        
        if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
        }

        const data = await response.json();
        
        // Actual API response भेजें
        res.json(data);
        
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching data from API',
            error: error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
