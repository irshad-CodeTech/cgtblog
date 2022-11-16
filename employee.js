// 
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "username",
  host: "localhost",
  database: "postgres-api",
  password: "12345",
  port: 5432,
});

const createEmployee = (req, res) => {
  const { name, email } = req.body;

  pool.query(
    "INSERT INTO employee (name,email) VALUES ($1,$2) RETURNING * ",
    [name, email],
    (err, result) => {
      if (err) {
        console.log(err);
        throw err;
      }

      res.status(200).json({
        msg: "data created succeffully",
        data: result.rows[0],
      });
    }
  );
};

module.exports={
    createEmployee
}