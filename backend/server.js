const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const uploadRoutes = require('./routes/uploadRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));
