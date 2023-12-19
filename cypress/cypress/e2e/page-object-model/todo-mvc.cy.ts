import TodoPage from '../../fixtures/pages/TodoPage';
describe('TodoMVC', () => {
    it('should add new todo', () => {
        const page = new TodoPage();
        page.visit();
        page.fillNewTodo ('new todo');
        page.submit();
        page.getTodoList().should('contain', 'new todo');
    });

    it('should check todo', () => {
        const page = new TodoPage();
        page.visit();
        page.fillNewTodo ('new todo');
        page.submit();
        page.checkTodo ('new todo');
        page.getTodoElement('new todo').should('have.class', 'completed');
    });

    it('should uncheck todo', () => {
        const page = new TodoPage();
        page.visit();
        page.fillNewTodo ('new todo');
        page.submit();
        page.checkTodo ('new todo');
        page.uncheckTodo ('new todo');
        page.getTodoElement('new todo').should('not.have.class', 'completed');
    });

    it('should clear completed todos', () => {
        const page = new TodoPage();
        page.visit();
        page.fillNewTodo ('new todo');
        page.submit();
        page.checkTodo ('new todo');
        page.clearCompleted();
        page.getTodoList().should('not.contain', 'new todo');
    });

    it('should delete todo', () => {
        const page = new TodoPage();
        page.visit();
        page.fillNewTodo ('new todo');
        page.submit();
        page.deleteTodo ('new todo');
        page.getTodoList().should('not.contain', 'new todo');
    });
});
