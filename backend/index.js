const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

//---------------------------------------HR_details
app.get('/', async(req,res) => {
    try {
        const result = await pool.query('select * from hr_details');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//---------------------------------------Employees
app.get('/employees', async(req,res) => {
    try {
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//---------------------------------------Jobs
app.get('/jobs', async(req,res) => {
    try {
        const result = await pool.query('select * from jobs');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//---------------------------------------departments
app.get('/departments', async(req,res) => {
    try {
        const result = await pool.query('select * from departments');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//---------------------------------------countries
app.get('/countries', async(req,res) => {
    try {
        const result = await pool.query('select * from countries');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//---------------------------------------regions
app.get('/regions', async(req,res) => {
    try {
        const result = await pool.query('select * from regions');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

//---------------------------------------loactions
app.get('/locations', async(req,res) => {
    try {
        const result = await pool.query('select * from locations');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`SERVER IS RUNNIGN ON http://localhost:${PORT}`);

})