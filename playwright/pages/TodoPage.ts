import { Page } from 'playwright';
import {Locator} from "@playwright/test";

// URL of the Todo application
const URL = 'https://todomvc.com/examples/vanillajs/';

/**
 * Class representing a Todo page.
 */
export default class TodoPage {
    /**
     * Create a Todo page.
     * @param {Page} page - The Playwright page object.
     */
    constructor(private page: Page) {}

    /**
     * Visit the Todo page.
     */
    async visit() {
        await this.page.goto(URL);
    }

    /**
     * Fill the new todo input field.
     * @param {string} todoText - The text of the todo.
     */
    async fillNewTodo (todoText: string) {
        await this.page.fill('.new-todo', todoText);
    }

    /**
     * Submit the new todo form.
     */
    async submit() {
        await this.page.press('.new-todo', 'Enter');
    }

    /**
     * Check a todo item.
     * @param {string} todoText - The text of the todo.
     */
    async checkTodo (todoText: string) {
        const todoElement = this.getTodoElement(todoText);
        const checkbox = todoElement.locator('.toggle');
        await checkbox.check()
    }

    /**
     * Uncheck a todo item.
     * @param {string} todoText - The text of the todo.
     */
    async uncheckTodo (todoText: string) {
        const todoElement = this.getTodoElement(todoText);
        const checkbox = todoElement.locator('.toggle');
        await checkbox.uncheck()
    }

    /**
     * Clear all completed todos.
     */
    async clearCompleted() {
        await this.page.click('.clear-completed');
    }

    /**
     * Delete a todo item.
     * @param {string} todoText - The text of the todo.
     */
    async deleteTodo (todoText: string) {
        const todoElement = this.getTodoElement(todoText);
        const deleteButton = todoElement.locator('.destroy').first();
        await deleteButton.dispatchEvent('click');
    }

    /**
     * Get a todo item element.
     * @param {string} todoText - The text of the todo.
     * @return {Locator} The todo item element.
     */
    getTodoElement (todoText: string): Locator {
        return this.page.locator(`.todo-list>li`).filter({hasText: todoText});
    }

    /**
     * Get the todo list element.
     * @return {Locator} The todo list element.
     */
    async getTodoList(): Promise<Locator> {
        return this.page.locator('.todo-list');
    }
}
