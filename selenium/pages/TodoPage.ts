import { WebDriver, By, until } from "selenium-webdriver";

// URL of the Todo application
const URL = 'https://todomvc.com/examples/vanillajs/';

/**
 * Class representing a Todo page.
 */
export default class TodoPage {
    /**
     * Create a Todo page.
     * @param {WebDriver} driver - The Selenium WebDriver object.
     */
    constructor(private driver: WebDriver) {}

    /**
     * Visit the Todo page.
     */
    async visit() {
        await this.driver.get(URL);
    }

    /**
     * Fill the new todo input field.
     * @param {string} todoText - The text of the todo.
     */
    async fillNewTodo (todoText: string) {
        await this.driver.findElement(By.css('.new-todo')).sendKeys(todoText);
    }

    /**
     * Submit the new todo form.
     */
    async submit() {
        await this.driver.findElement(By.css('.new-todo')).sendKeys('\n');
    }

    /**
     * Check a todo item.
     * @param {string} todoText - The text of the todo.
     */
    async checkTodo (todoText: string) {
        const todoElement = await this.getTodoElement(todoText);
        await todoElement.findElement(By.css('.toggle')).click();
    }

    /**
     * Uncheck a todo item.
     * @param {string} todoText - The text of the todo.
     */
    async uncheckTodo (todoText: string) {
        const todoElement = await this.getTodoElement(todoText);
        if (await todoElement.findElement(By.css('.toggle')).isSelected()) {
            await todoElement.findElement(By.css('.toggle')).click();
        }
    }

    /**
     * Clear all completed todos.
     */
    async clearCompleted() {
        await this.driver.findElement(By.css('.clear-completed')).click();
    }

    /**
     * Delete a todo item.
     * @param {string} todoText - The text of the todo.
     */
    async deleteTodo (todoText: string) {
        const todoElement = await this.getTodoElement(todoText);
        await this.driver.actions().move({origin: todoElement}).perform();
        await todoElement.findElement(By.css('.destroy')).click();
    }

    /**
     * Get a todo item element.
     * @param {string} todoText - The text of the todo.
     * @return {WebElementPromise} The todo item element.
     */
    async getTodoElement (todoText: string) {
        const todoElements = await this.driver.findElements(By.css('.todo-list li'));
        for (let todoElement of todoElements) {
            if ((await todoElement.getText()) === todoText) {
                return todoElement;
            }
        }
        return null;
    }

    /**
     * Get the todo list element.
     * @return {WebElementPromise} The todo list element.
     */
    async getTodoListElements() {
        return this.driver.findElement(By.css('.todo-list')).findElements(By.css('li'));
    }
}
