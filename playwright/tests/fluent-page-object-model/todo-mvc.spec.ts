import TodoPageFluent from '../../pages/TodoPageFluent';
import { test, expect } from '@playwright/test';

test('should add new todo', async ({ page }) => {
    const todoPage = new TodoPageFluent(page);
    todoPage
      .visit()
      .then((todoPage) =>  todoPage.fillNewTodo('new todo') )
      .then((todoPage) =>  todoPage.submit() )
      .then((todoPage) => todoPage.getTodoList())
      .then((list) => expect(list).toHaveText('new todo'))
});

test('should check todo', async ({ page }) => {
    new TodoPageFluent(page)
    .visit()
    .then((todoPage) =>  todoPage.fillNewTodo ('new todo') )
    .then((todoPage) =>  todoPage.submit() )
    .then((todoPage) => todoPage.checkTodo ('new todo') )
    .then((todoPage) => todoPage.getTodoElement('new todo'))
    .then((todoElement) => expect(todoElement).toHaveClass('completed'))
});

test('should uncheck todo', async ({ page }) => {
    new TodoPageFluent(page)
    .visit()
    .then((todoPage) =>  todoPage.fillNewTodo ('new todo') )
    .then((todoPage) =>  todoPage.submit() )
    .then((todoPage) => todoPage.checkTodo ('new todo') )
    .then((todoPage) => todoPage.uncheckTodo ('new todo') )
    .then((todoPage) => todoPage.getTodoElement('new todo'))
    .then((todoElement) => expect(todoElement).not.toHaveClass('completed'))
});

test('should clear completed', async ({ page }) => {
    new TodoPageFluent(page)
    .visit()
    .then((todoPage) =>  todoPage.fillNewTodo ('new todo') )
    .then((todoPage) =>  todoPage.submit() )
    .then((todoPage) => todoPage.checkTodo ('new todo') )
    .then((todoPage) => todoPage.clearCompleted() )
    .then((todoPage) => todoPage.getTodoElement('new todo'))
    .then((todoElement) => expect(todoElement).not.toBeVisible())
});

test('should delete todo', async ({ page }) => {
    new TodoPageFluent(page)
    .visit()
    .then((todoPage) =>  todoPage.fillNewTodo ('new todo') )
    .then((todoPage) =>  todoPage.submit() )
    .then((todoPage) => todoPage.deleteTodo ('new todo') )
    .then((todoPage) => todoPage.getTodoElement('new todo'))
    .then((todoElement) => expect(todoElement).not.toBeVisible())
});
