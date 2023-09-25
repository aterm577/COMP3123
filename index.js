var http = require("http");
//TODO - Use Employee Module here
const employees = require("./Employee"); 

console.log("Lab 03 - NodeJs");

//TODO - Fix any errors you found working with lab exercise 

//Define Server Port
const port = process.env.PORT || 8081;

//Create Web Server using CORE API
const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "${http.STATUS_CODES[405]}"}`);
    } else {
        if (req.url === '/') {
            //TODO - Display message "<h1>Welcome to Lab Exercise 03</h1>"
            res.write("<h1>Welcome to Lab Exercise 03</h1>");
            res.end();
        }

        if (req.url === '/employee') {
            //TODO - Display all details for employees in JSON format
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            res.end(JSON.stringify(employees));
        }

        if (req.url === '/employee/names') {
            //TODO - Display only all employees {first name + lastname} in Ascending order in JSON Array
            //e.g. [ "Ash Lee", "Mac Mohan", "Pritesh Patel"]
            const employeeNames = [];
            for (const employee of employees) {
            const fullName = `${employee.firstName} ${employee.lastName}`;
            employeeNames.push(fullName);
        }
        employeeNames.sort();
        res.setHeader("Content-Type", "application/json;charset=utf-8");
        res.end(JSON.stringify(employeeNames));
        }

        if (req.url === '/employee/totalsalary') {
            //TODO - Display Sum of all employees salary in given JSON format
            //e.g. {"total_salary" : 100 }
            let totalSalary = 0;
            for (const employee of employees) {
                totalSalary += employee.Salary;
            }
            const result = { total_salary: totalSalary };
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            res.end(JSON.stringify(result));
        }
    }
    
    if (!res.finished) {
        res.end(`{"error": "${http.STATUS_CODES[404]}"}`);
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

