const URL = 'https://todomvc.com/examples/vanillajs/';

export default class TodoPage {
    /**
     * Visits the specified URL using Cypress.
     */
    visit() {
        cy.visit(URL);
    }

    /**
     * Fills the new todo input field with the specified text.
     * @param {string} todoText - The text to be typed into the input field.
     */
    fillNewTodo (todoText) {
        cy.get('.new-todo').type(todoText);
    }

    /**
     * Submits the todo item by pressing the enter key.
     */
    submit() {
        cy.get('.new-todo').type('{enter}');
    }

    /**
     * Checks a todo item with the specified text.
     *
     * @param {string} todoText - The text of the todo item to check.
     */
    checkTodo (todoText) {
        cy.contains(todoText).parent().find('.toggle').check();
    }

    /**
     * Unchecks a todo item.
     * 
     * @param {string} todoText - The text of the todo item.
     */
    uncheckTodo (todoText) {
        cy.contains(todoText).parent().find('.toggle').uncheck();
    }

    /**
     * Clears all completed todos.
     */
    clearCompleted() {
        cy.get('.clear-completed').click();
    }

    /**
     * Deletes a todo item with the specified text.
     * @param {string} todoText - The text of the todo item to be deleted.
     */
    deleteTodo (todoText) {
        cy.contains(todoText).parent().find('.destroy').click({force: true});
    }

    /**
     * Returns the parent element of the todo item with the specified text.
     *
     * @param {string} todoText - The text of the todo item.
     * @returns {Cypress.Chainable<Element>} The parent element of the todo item.
     */
    getTodoElement (todoText) {
        return cy.contains(todoText).parent().parent();
    }

    /**
     * Retrieves the todo list element.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The todo list element.
     */
    getTodoList() {
        return cy.get('.todo-list');
    }
}
