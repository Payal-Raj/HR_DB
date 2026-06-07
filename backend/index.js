const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

//---------------------------------------HR_details
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("select * from hr_details");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//---------------------------------------Employees
app.get("/employees", async (req, res) => {
  try {
    const result = await pool.query("select * from employees");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/employees", async (req, res) => {
  try {
    console.log(req.body);
    const {
      employee_id,
      first_name,
      last_name,
      email,
      phone_number,
      hire_date,
      job_id,
      salary,
      commission_pct,
      manager_id,
      department_id,
    } = req.body;
    const result = await pool.query(
      `insert into employees (employee_id,first_name,last_name,email,phone_number,hire_date,job_id,salary,commission_pct,manager_id,department_id)
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
            returning *`,
      [
        Number(employee_id),
        first_name,
        last_name,
        email,
        phone_number,
        hire_date,
        job_id,
        Number(salary),
        commission_pct ? Number(commission_pct) / 100 : null,
        manager_id ? Number(manager_id) : null,
        Number(department_id),
      ],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//---------------------------------------Jobs
app.get("/jobs", async (req, res) => {
  try {
    const result = await pool.query("select * from jobs");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//---------------------------------------departments
app.get("/departments", async (req, res) => {
  try {
    const result = await pool.query("select * from departments");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//---------------------------------------countries
app.get("/countries", async (req, res) => {
  try {
    const result = await pool.query("select * from countries");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//---------------------------------------regions
app.get("/regions", async (req, res) => {
  try {
    const result = await pool.query("select * from regions");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//---------------------------------------loactions
app.get("/locations", async (req, res) => {
  try {
    const result = await pool.query("select * from locations");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNIGN ON http://localhost:${PORT}`);
});
