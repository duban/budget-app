const fs = require('fs');
const path = require('path');
var dataPath = './app/data.json'
const dataRaw = fs.readFileSync(dataPath);
const BudgetController = () => {
    // var data = require('../data.json');
    // const file = require(data);
    //read the user data from json file
    const saveData = (data) => {
        const stringifyData = JSON.stringify(data)
        fs.writeFileSync(dataPath, stringifyData)
    }
    const index_home = async (req, res) => {
        return res.status(200).json({
            message: "Hello from budget api"
        });
    };
    const add_budget = async (req, res) => {
        const { budget, expenses } = req.body;
        const balance = budget - expenses
        try {
            var data = JSON.parse(dataRaw)
            var el = {id:data.data.length + 1,budget:budget,expenses:expenses,balance:balance}
            data.data.push(el)
            saveData(data)


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
            return res.status(200).json({
                data: data.data,
                message:"successfully adding data "
            });
            // if (budgets) {
            //     return res.status(200).json({
            //         data: data,
            //         message:"successfully adding data "
            //     });
            // }
        } catch (err) {
            return res.status(500).json({
                data: [],
                message: "Error: " + err
            });
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
                    msg: 'Budget data updated successfully'});
                // item.group = 4;
            // }
        } catch (err) {
            return res.status(500).json({
                data: [],
                message: "Error: " + err
            });
        }
    };
    const delete_budget = async (req, res) => {
        const id = req.params.id;
        try {
            const index = data.findIndex(x => x.id === id);
            // var item = data.find(x => x.id == id);
            if (index !== undefined) {
                data.splice(index, 1)
                // console.log(index)
                // const key = item['id'] = id
                // delete item[id];
                // item.budget = budget
                // item.expenses = expenses
                // item.balance = balance
                return res.status(200).json({
                    data: data,
                    message:"successfully delete data "
                });
                // item.group = 4;
            }
        } catch (err) {
            return res.status(500).json({
                data: [],
                message: "Error: " + err
            });
        }
    };
    const list_budget = async (req, res) => {
        const resp = JSON.parse(dataRaw)
        // console.log(dataRaw)
        return res.status(200).json(resp);
    };
    return {index_home,add_budget, list_budget,edit_budget, delete_budget}

}
module.exports = BudgetController;