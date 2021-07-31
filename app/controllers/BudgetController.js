const fs = require('fs');
const path = require('path');
const dataPath = './app/data.json'
const viewPath = '../views/'
const dataRaw = fs.readFileSync(dataPath);
var data = JSON.parse(dataRaw)
const BudgetController = () => {
    // var data = require('../data.json');
    // const file = require(data);
    //read the user data from json file
    const saveData = (data) => {
        const stringifyData = JSON.stringify(data)
        fs.writeFileSync(dataPath, stringifyData)
    }

    const getData = () => {
        const budgetData = JSON.parse(dataRaw)
        return budgetData
    }

    const saveExpence = (data) => {
        const stringifyData = JSON.stringify(data)
        fs.writeFileSync(dataPath, stringifyData)
    }

    const render_index = async (req, res) => {
        res.render(__dirname + '/../views/index.html', data);
    };

    const index_home = async (req, res) => {
        return res.status(200).json({
            message: "Hello from budget api"
        });
    };
    const delete_expense = async (req, res) => {
        const id = req.params.id;
        const raw = getData()
        var findExist = raw.expenses.find(expence => expence.id == id);
        if (!findExist) {
            return res.status(409).send({error: true, msg: 'id not exist'})
        }
        const index = raw.expenses.findIndex(expence => expence.id === id);
        raw.balance = raw.balance + findExist.value
        if (index !== undefined) {
            raw.expenses.splice(index, 1)
            if (raw.expenses.length === 0) {
                raw.budget = 0
                raw.balance = 0
                // console.log(raw)
            }
            saveData(raw)
            return res.status(200).json({
                success: true,
                message:`Budget with id ${id} has been deleted`
            });
            // item.group = 4;
        }
    };

    const edit_expense = async (req, res) => {
        console.log('ASU')
        const id = req.params.id;
        const title = req.body.title;
        const value = req.body.value;
        try {
            const raw = getData()
            // const findExist = data.data.findIndex(x => x.id === id);
            var findExist = raw.expenses.find(x => x.id == id);
            if (!findExist) {
                return res.status(409).send({error: true, msg: 'id not exist'})
            }
            const index = raw.expenses.findIndex((expence => expence.id == id));
            const existValue = raw.expenses[index].value
            raw.expenses[index].title = title
            if (existValue > value) {
                // console.log(existValue)
                // console.log(newValue)
                const balance = raw.balance - (existValue - value)
                raw.expenses[index].value = value
                raw.balance = balance
                saveData(raw)
            } else if (existValue < value) {
                // console.log(existValue)
                // console.log(newValue)
                const balance = raw.balance - (value - existValue)
                raw.expenses[index].value = value
                raw.balance = balance
                saveData(raw)

            }
            console.log(raw)
                return res.status(200).json({
                    data: raw,
                    message:"successfully adding data "
                });
            // }
        } catch (err) {
            console.log(err)
            return res.status(500).json({error: true, msg: 'Internal server error'});
        }
    };

    const add_expense = async (req, res) => {
        const title = req.body.title;
        const value = req.body.value;
        try {
            const raw = getData()
            if(raw.balance !== 0) {
                const balance = raw.balance - value
                raw.balance = balance
                const expence = {id:raw.expenses.length + 1,title:title,value:value}

                raw.expenses.push(expence)
                saveExpence(raw)
                return res.status(200).json({
                    data: raw,
                    message:"successfully adding data "
                });
            }
        } catch (err) {
            console.log(err)
            return res.status(500).json({error: true, msg: 'Internal server error'});
        }
    };
    const add_budget = async (req, res) => {
        const budget = req.body.budget;
        const balance = budget
        // const title = null
        // const expenses = 0
        try {
            // const raw = getData()
            // console.log(raw.data)
            // if(raw.data.budget)
            var budgets = {budget:budget,expenses:[],balance:balance}
            console.log(budget)
            // console.log(budgets)
            // data.data.push(el)
            saveData(budgets)

            return res.status(200).json({
                data: budgets,
                message:"successfully adding data "
            });


            // fs.writeFileSync(dataPath, JSON.stringify(data));

            // console.log(budgets)
            // fs.writeFile (dataPath, JSON.stringify(data), function(err) {
            //         if (err) throw err;
            //         console.log('complete');
            //     }
            // );
            // console.log(data)

            // fs.writeFileSync(path.resolve(__dirname, '../data.json'), JSON.stringify(student));
            // var data = {}
            // data.table = []
            // for (i=0; i <2 ; i++){
            //     var obj = {
            //         id: i,
            //         square: i * i
            //     }
            //     data.table.push(obj)
            // }
            // fs.writeFileSync('../data.json', JSON.stringify(data));
            // fs.writeFileSync('../data.json', JSON.stringify(data));
            // fs.writeFile('../data.json', JSON.stringify(data), 'utf8', callback); // write it back
            // fs.writeFileSync('../data.json', JSON.stringify(data));
            // fs.writeFile ("../data.json", JSON.stringify(data), function(err) {
            //         if (err) throw err;
            //         console.log('complete');
            //     }
            // );
            // res.render(__dirname + '/../views/add-budget.html', data);
            // return res.status(200).json({
            //     data: data.data,
            //     message:"successfully adding data "
            // });
            // if (budgets) {
            //     return res.status(200).json({
            //         data: data,
            //         message:"successfully adding data "
            //     });
            // }
        } catch (err) {
            return res.status(500).json({error: true, msg: 'Internal server error'});
        }
    };



    const edit_budget = async (req, res) => {
        const id = req.params.id;
        const { budget, expenses } = req.body;
        const balance = budget - expenses
        // const budgetData = {id:parseInt(id),budget:budget,expenses:expenses,balance:balance}
        var data = JSON.parse(dataRaw)
        try {
            // const findExist = data.data.findIndex(x => x.id === id);
            var findExist = data.data.find(x => x.id == id);
            if (!findExist) {
                return res.status(409).send({error: true, msg: 'id not exist'})
            }
            const index = data.data.findIndex((obj => obj.id == id));
            data.data[index].budget = budget
            data.data[index].expenses = expenses
            data.data[index].balance = balance
            saveData(data)
            // const updateBudget = data.data.filter( user => user.id !== id )
            // updateBudget.push(budgetData)
            // console.log(data)
            // console.log(updateBudget)
            // fs.writeFileSync(data, JSON.stringify(data));
            // if (item) {
            //     item.budget = budget
            //     item.expenses = expenses
            //     item.balance = balance
                return res.status(200).json({
                    success: true,
                    msg: `Budget with id ${id} has been updated`});
                // item.group = 4;
            // }
        } catch (err) {
            return res.status(500).json({error: true, msg: 'Internal server error'});
        }
    };
    const delete_budget = async (req, res) => {
        const id = req.params.id;
        try {
            //filter the userdata to remove it
            var findExist = data.data.find(x => x.id == id);
            if (!findExist) {
                return res.status(409).send({error: true, msg: 'id not exist'})
            }
                // return res.status(200).json({
                //     data: data,
                //     message:"successfully delete data "
                // });
            const index = data.data.findIndex(x => x.id === id);
            // var item = data.data.find(x => x.id == id);
            if (index !== undefined) {
                data.data.splice(index, 1)
                // console.log(index)
                // const key = item['id'] = id
                // delete data.data[id];
                // item.budget = budget
                // item.expenses = expenses
                // item.balance = balance
                console.log(data.data)
                return res.status(200).json({
                    success: true,
                    message:`Budget with id ${id} has been deleted`
                });
                // item.group = 4;
            }
        } catch (err) {
            return res.status(500).json({error: true, msg: 'Internal server error'});
        }
    };
    const list_budget = async (req, res) => {
        try {
            var data = getData()
            // console.log(budgetData)
            // res.render(__dirname + '/../views/add-budget.html', budgetData);
            return res.status(200).json(data);
        } catch (err) {
            return res.status(500).json({error: true, msg: 'Internal server error'});
        }
    };
    return {render_index,index_home,add_budget, add_expense, edit_expense ,delete_expense,list_budget,edit_budget, delete_budget}

}
module.exports = BudgetController;