const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const connectionString = {host:"localhost",port:3306,
                          database:"enzigma",user:"W2_83981_Snehal",
                          password:"snehal" };

const app = express();
app.use(express.json());

app.get("/tasks",(request,response)=>{
    let queryText = `select * from Task`;
    let connection = mysql.createConnection(connectionString);
    connection.connect();
    connection.query(queryText,(err,result)=>{
        if(err == null){
            var resultString = JSON.stringify(result);
            response.setHeader("content-type","application/json");
            response.write(resultString);
            connection.end();
            response.end();
        }
        else{
            var errInString = JSON.stringify(err);
            response.setHeader("content-type","application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    });
});

app.post("/tasks",(request,response)=>{
    let queryText = `insert into Task(assignedTo,status,dueDate,priority,comments) values('${request.body.assignedTo}','${request.body.status}','${request.body.dueDate}','${request.body.priority}','${request.body.comments}')`;
    console.log(queryText);
    connection.connect();
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            var resultInString = JSON.stringify(result);
            response.setHeader("content-type", "application/json");
            response.write(resultInString);
            connection.end();
            response.end();
        }
        else
        {
            var errInString = JSON.stringify(err);
            response.setHeader("content-type", "application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    });
});

app.put("/tasks/:id",(request,response)=>{
    let id = request.params.id;
    let AssignedTo = request.body.assignedTo;
    let Status = request.body.status;
    let DueDate = request.body.dueDate;
    let Priority = request.body.priority;
    let Comments = request.body.comments;
    let queryText = `update Task set assignedTo = ${AssignedTo},status = ${Status},dueDate = ${DueDate},priority = ${Priority},comments = ${Comments} where id=${id}`;
    console.log(queryText);
    connection.connect();
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            var resultInString = JSON.stringify(result);
            response.setHeader("content-type", "application/json");
            response.write(resultInString);
            connection.end();
            response.end();
        }
        else
        {
            var errInString = JSON.stringify(err);
            response.setHeader("content-type", "application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    });
});

app.delete("/tasks/:id",(request,response)=>{
    let id = request.params.id;
    let queryText = `delete from Task where id=${id}`;
    console.log(queryText);
    connection.connect();
    connection.query(queryText,(err,result)=>{
        if(err==null)
        {
            var resultInString = JSON.stringify(result);
            response.setHeader("content-type", "application/json");
            response.write(resultInString);
            connection.end();
            response.end();
        }
        else
        {
            var errInString = JSON.stringify(err);
            response.setHeader("content-type", "application/json");
            response.write(errInString);
            connection.end();
            response.end();
        }
    });
});

app.listen(9999,()=>{console.log("server started..")});

