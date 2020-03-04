const mysql = require('mysql');
const express = require('express');

const app = express();

app.use(express.json());



const mysqlConnection = mysql.createConnection({
  host :'localhost',
  user : 'root',
  password : 'Edg@r2018',
  database : 'EmployeeDB',
  multipleStatements: true
});

mysqlConnection.connect((err)=>{
  if(!err)
  console.log('Conexão com sucesso!');
  else
  console.log(`Falha na conexão ao Banco de Dados. \n Erro: ${JSON.stringify(err, undefined, 2)}`);
});

app.listen(3000, ()=>console.log('O servidor expresso está executando na porta: 3000'));


// get al employee
app.get('/employees', (req, res)=>{
  mysqlConnection.query('SELECT * FROM employee', (err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  });
});

// GET um employee
app.get('/employees/:id', (req, res)=>{
  mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',[req.params.id], (err, rows, fields)=>{
    if(!err)
    res.send(rows);
    else
    console.log(err);
  });
});

// DELETE um employee
app.delete('/employees/:id', (req, res)=>{
  mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?',[req.params.id], (err, rows, fields)=>{
    if(!err)
    res.send('Employee deletado');
    else
    console.log(err);
  });
});

// INSERT um employees
app.post('/employees', (req, res) => {
  let emp = req.body;
  var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
  CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
      if (!err)
          rows.forEach(element => {
              if(element.constructor == Array)
              res.send(`Inserir employee id : ${element[0].EmpID}`);
          });
      else
          console.log(err);
  })
});

// UPDATE um employees
app.put('/employees', (req, res) => {
  let emp = req.body;
  var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
  CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
      if (!err)
          res.send('Updated com sucesso');
      else
          console.log(err);
  })
});