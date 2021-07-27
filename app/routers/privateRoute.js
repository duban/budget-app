const BudgetContoller = require('../controllers/BudgetController');
module.exports = (app) => {
    app.route('/api/index')
        .get(BudgetContoller().index_home);
    app.route('/api/budgets')
        .get(BudgetContoller().list_budget);
    app.route('/api/add')
        .post(BudgetContoller().add_budget);
}