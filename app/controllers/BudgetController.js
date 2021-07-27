const BudgetController = () => {
    var data = require('../data.json');
    const index_home = async (req, res) => {
        return res.status(200).json({
            message: "Hello from budget api"
        });
    };
    const add_budget = async (req, res) => {
        const {body} = req;
    };
    const list_budget = async (req, res) => {
        return res.status(200).json({
            data
        });
    };
    return {index_home,add_budget, list_budget}

}
module.exports = BudgetController;