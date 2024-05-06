const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const budgetRoutes = require('./routes/budgetRoutes');  
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api', budgetRoutes); 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
