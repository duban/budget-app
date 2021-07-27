const BudgetController = () => {
    var data = require('../data.json');
    const index_home = async (req, res) => {
        return res.status(200).json({
            message: "Hello from budget api"
        });
    };
    const add_budget = async (req, res) => {
        const { budget, expenses } = req.body;
        const balance = budget - expenses
        try {
            var el = {id:data.length + 1,budget:budget,expenses:expenses,balance:balance}
            var budgets = data.push(el)
            if (budgets) {
                return res.status(200).json({
                    data: el,
                    message:"successfully adding data "
                });
            }
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
        try {
            var item = data.find(x => x.id == id);
            if (item) {
                item.budget = budget
                item.expenses = expenses
                item.balance = balance
                return res.status(200).json({
                    data: item,
                    message:"successfully update data "
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
        console.log(data.length)
        return res.status(200).json({
            data
        });
    };
    return {index_home,add_budget, list_budget,edit_budget}

}
module.exports = BudgetController;