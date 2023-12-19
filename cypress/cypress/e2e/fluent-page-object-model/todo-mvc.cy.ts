import TodoPageFluent from '../../fixtures/pages/TodoPageFluent';
describe('TodoMVC Fluent Page Object Model', () => {
    it('should add new todo', () => {
        new TodoPageFluent()
          .visit()
          .fillNewTodo ('new todo')
          .submit()
          .getTodoList()
          .should('contain', 'new todo');
    });

    it('should check todo', () => {
        new TodoPageFluent()
          .visit()
          .fillNewTodo ('new todo')
          .submit()
          .checkTodo ('new todo')
          .getTodoElement('new todo')
          .should('have.class', 'completed');
    });

    it('should uncheck todo', () => {
        new TodoPageFluent()
          .visit()
          .fillNewTodo ('new todo')
          .submit()
          .checkTodo ('new todo')
          .uncheckTodo ('new todo')
          .getTodoElement('new todo')
          .should('not.have.class', 'completed');
    });

    it('should clear completed todos', () => {
        new TodoPageFluent()
          .visit()
          .fillNewTodo ('new todo')
          .submit()
          .checkTodo ('new todo')
          .clearCompleted()
          .getTodoList()
          .should('not.contain', 'new todo');
    });

    it('should delete todo', () => {
        new TodoPageFluent()
          .visit()
          .fillNewTodo ('new todo')
          .submit()
          .deleteTodo ('new todo')
          .getTodoList()
          .should('not.contain', 'new todo');
    });
});
