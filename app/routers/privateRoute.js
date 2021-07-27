const BudgetContoller = require('../controllers/BudgetController');
module.exports = (app) => {
    app.route('/api/index')
        .get(BudgetContoller().index_home);
    app.route('/api/budgets')
        .get(BudgetContoller().list_budget);
    app.route('/api/budget')
        .post(BudgetContoller().add_budget);
    app.route('/api/budget/:id')
        .put(BudgetContoller().edit_budget);
    app.route('/api/budget/:id')
        .delete(BudgetContoller().delete_budget);
}