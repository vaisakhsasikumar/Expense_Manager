var GenerateSchema = require('generate-schema')

var schema = GenerateSchema.mysql('Expense', [
    {
        userId : "32",
    newExpense :{
        payee: "ffd",
        buddies: [{ 
            name: "name1",
            expense: 4422},
            { 
                name: "name3",
                expense: 4422}
        ],
        totalBillAmount: 22,
        splitAuto : true
    } 
    }
])

CREATE TABLE Expense (
    id TEXT(200),
    PRIMARY KEY (id)
  );
  
  CREATE TABLE Expense_0 (
    Expense_id TEXT(200),
    id TEXT(200),
    userId TEXT(200),
    PRIMARY KEY (id),
    FOREIGN KEY (Expense_id) REFERENCES Expense(id)
  );
  
  CREATE TABLE Expense_0_newExpense (
    Expense_0_id TEXT(200),
    id TEXT(200),
    payee TEXT(200),
    totalBillAmount INT,
    splitAuto BOOLEAN,
    PRIMARY KEY (id),
    FOREIGN KEY (Expense_0_id) REFERENCES Expense_0(id)
  );
  
  CREATE TABLE Expense_0_newExpense_buddies (
    Expense_0_newExpense_id TEXT(200),
    id TEXT(200),
    name TEXT(200),
    expense INT,
    PRIMARY KEY (id),
    FOREIGN KEY (Expense_0_newExpense_id) REFERENCES Expense_0_newExpense(id)
  );
console.log(schema)
