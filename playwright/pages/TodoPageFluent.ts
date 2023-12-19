/*
    Cons:
    - Because there are promises in the methods, it is harder to implement the fluent pattern (chaining methods).
 */

import { Page } from 'playwright';
import {Locator} from "@playwright/test";

// URL of the Todo application
const URL = 'https://todomvc.com/examples/vanillajs/';

/**
 * Class representing a Todo page.
 */
export default class TodoPageFluent {
    /**
     * Create a Todo page.
     * @param {Page} page - The Playwright page object.
     */
    constructor(private page: Page) {}

    /**
     * Visit the Todo page.
     */
    async visit(): Promise<this> {
        await this.page.goto(URL);
        return this;
    }

    /**
     * Fill the new todo input field.
     * @param {string} todoText - The text of the todo.
     */
    async fillNewTodo (todoText: string): Promise<this> {
        await this.page.fill('.new-todo', todoText);
        return this;
    }

    /**
     * Submit the new todo form.
     */
    async submit(): Promise<this> {
        await this.page.press('.new-todo', 'Enter');
        return this;
    }

    /**
     * Check a todo item.
     * @param {string} todoText - The text of the todo.
     */
    async checkTodo (todoText: string): Promise<this> {
        const todoElement = this.getTodoElement(todoText);
        const checkbox = todoElement.locator('.toggle');
        await checkbox.check()
        return this;
    }

    /**
     * Uncheck a todo item.
     * @param {string} todoText - The text of the todo.
     */
    async uncheckTodo (todoText: string): Promise<this> {
        const todoElement = this.getTodoElement(todoText);
        const checkbox = todoElement.locator('.toggle');
        await checkbox.uncheck()
        return this;
    }

    /**
     * Clear all completed todos.
     */
    async clearCompleted(): Promise<this> {
        await this.page.click('.clear-completed');
        return this;
    }

    /**
     * Delete a todo item.
     * @param {string} todoText - The text of the todo.
     */
    async deleteTodo (todoText: string): Promise<this> {
        const todoElement = this.getTodoElement(todoText);
        const deleteButton = todoElement.locator('.destroy').first();
        await deleteButton.dispatchEvent('click');
        return this;
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
