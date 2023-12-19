import TodoPage from '../../pages/TodoPage';
import { test, expect } from '@playwright/test';

test('should add new todo', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.visit();
    await todoPage.fillNewTodo ('new todo');
    await todoPage.submit();
    const list = await todoPage.getTodoList()
    await expect(list).toHaveText('new todo')
});

test('should check todo', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.visit();
    await todoPage.fillNewTodo ('new todo');
    await todoPage.submit();
    await todoPage.checkTodo ('new todo');
    const todoElement = todoPage.getTodoElement('new todo')
    await expect(todoElement).toHaveClass('completed')
});

test('should uncheck todo', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.visit();
    await todoPage.fillNewTodo ('new todo');
    await todoPage.submit();
    await todoPage.checkTodo ('new todo');
    await todoPage.uncheckTodo ('new todo');
    const todoElement = todoPage.getTodoElement('new todo')
    await expect(todoElement).not.toHaveClass('completed')
});

test('should clear completed', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.visit();
    await todoPage.fillNewTodo ('new todo');
    await todoPage.submit();
    await todoPage.checkTodo ('new todo');
    await todoPage.clearCompleted();
    const todoElement = todoPage.getTodoElement('new todo')
    await expect(todoElement).not.toBeVisible()
});

test('should delete todo', async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.visit();
    await todoPage.fillNewTodo ('new todo');
    await todoPage.submit();
    await todoPage.deleteTodo ('new todo');
    const todoElement = todoPage.getTodoElement('new todo')
    await expect(todoElement).not.toBeVisible()
});
