/*
    Pros:
    - cy is a global object, so it's always available
    - no async/await needed, easy to chain commands
 */
const URL = 'https://todomvc.com/examples/vanillajs/';

export default class TodoPage {
    /**
     * Visits the specified URL using Cypress.
     */
    visit(): TodoPage {
        cy.visit(URL);
        return this;
    }

    /**
     * Fills the new todo input field with the specified text.
     * @param {string} todoText - The text to be typed into the input field.
     */
    fillNewTodo (todoText: string): TodoPage {
        cy.get('.new-todo').type(todoText);
        return this;
    }

    /**
     * Submits the todo item by pressing the enter key.
     */
    submit(): TodoPage {
        cy.get('.new-todo').type('{enter}');
        return this;
    }

    /**
     * Checks a todo item with the specified text.
     *
     * @param {string} todoText - The text of the todo item to check.
     */
    checkTodo (todoText: string): TodoPage {
        cy.contains(todoText).parent().find('.toggle').check();
        return this;
    }

    /**
     * Unchecks a todo item.
     *
     * @param {string} todoText - The text of the todo item.
     */
    uncheckTodo (todoText: string): TodoPage {
        cy.contains(todoText).parent().find('.toggle').uncheck();
        return this;
    }

    /**
     * Clears all completed todos.
     */
    clearCompleted(): TodoPage {
        cy.get('.clear-completed').click();
        return this
    }

    /**
     * Deletes a todo item with the specified text.
     * @param {string} todoText - The text of the todo item to be deleted.
     */
    deleteTodo(todoText: string): TodoPage {
        cy.contains(todoText).parent().find('.destroy').click({force: true});
        return this;
    }

    /**
     * Returns the parent element of the todo item with the specified text.
     *
     * @param {string} todoText - The text of the todo item.
     * @returns {Cypress.Chainable<Element>} The parent element of the todo item.
     */
    getTodoElement(todoText: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains(todoText).parent().parent();
    }

    /**
     * Retrieves the todo list element.
     * @returns {Cypress.Chainable<JQuery<HTMLElement>>} The todo list element.
     */
    getTodoList(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get('.todo-list');
    }
}
