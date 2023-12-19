import {Builder, WebDriver} from "selenium-webdriver";
import TodoPage from "../../pages/TodoPage";
import {expect} from "chai";

describe("TodoMVC Page Object Model", function () {
  let driver: WebDriver;
  let todoPage: TodoPage;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    todoPage = new TodoPage(driver);
  });

  after(async () => driver.quit());

  it("should add new todo", async () => {
    await todoPage.visit();
    await todoPage.fillNewTodo ('new todo');
    await todoPage.submit();
    const todoList = await todoPage.getTodoListElements();
    expect(todoList.length).to.equal(1);
    expect(await todoList[0].getText()).to.equal('new todo');
  });

  it("should check todo", async () => {
    await todoPage.visit();
    await todoPage.checkTodo ('new todo');
    const todoList = await todoPage.getTodoListElements();
    expect(todoList.length).to.equal(1);
    expect(await todoList[0].getAttribute('class')).to.equal('completed');
  });

  it("should uncheck todo", async () => {
    await todoPage.visit();
    await todoPage.uncheckTodo ('new todo');
    const todoList = await todoPage.getTodoListElements();
    expect(todoList.length).to.equal(1);
    expect(await todoList[0].getAttribute('class')).to.equal('');
  });

  it("should clear completed todos", async () => {
    await todoPage.visit();
    await todoPage.checkTodo ('new todo');
    await todoPage.clearCompleted();
    const todoList = await todoPage.getTodoListElements();
    expect(todoList.length).to.equal(0);
  });

  it("should delete todo", async () => {
    await todoPage.visit();
    await todoPage.fillNewTodo ('new todo');
    await todoPage.submit();
    await todoPage.deleteTodo ('new todo');
    const todoList = await todoPage.getTodoListElements();
    expect(todoList.length).to.equal(0);
  });
});

