import {Builder, WebDriver} from "selenium-webdriver";
import {expect} from "chai";
import TodoPageFluent from "../../pages/TodoPageFluent";

describe("TodoMVC Fluent Page Object Model", function () {
  let driver: WebDriver;
  let todoPage: TodoPageFluent;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    todoPage = new TodoPageFluent(driver);
  });

  after(async () => driver.quit());

  it("should add new todo", async () => {
    todoPage
      .visit()
      .then((todoPage) =>  todoPage.fillNewTodo ('new todo') )
      .then((todoPage) =>  todoPage.submit() )
      .then((todoPage) => todoPage.getTodoListElements())
      .then((list) => expect(list.length).to.equal(1))
      .then((list) => expect(list[0].getText()).to.equal('new todo'))
  });

  it("should check todo", async () => {
    todoPage
      .visit()
      .then((todoPage) => todoPage.checkTodo ('new todo') )
      .then((todoPage) => todoPage.getTodoListElements())
      .then((list) => expect(list.length).to.equal(1))
      .then((list) => expect(list[0].getAttribute('class')).to.equal('completed'))
  });

  it("should uncheck todo", async () => {
    todoPage
      .visit()
      .then((todoPage) => todoPage.uncheckTodo ('new todo') )
      .then((todoPage) => todoPage.getTodoListElements())
      .then((list) => expect(list.length).to.equal(1))
      .then((list) => expect(list[0].getAttribute('class')).to.equal(''))
  });

  it("should clear completed todos", async () => {
    todoPage
      .visit()
      .then((todoPage) => todoPage.checkTodo ('new todo') )
      .then((todoPage) => todoPage.clearCompleted() )
      .then((todoPage) => todoPage.getTodoListElements())
      .then((list) => expect(list.length).to.equal(0))
  });

  it("should delete todo", async () => {
    todoPage
      .visit()
      .then((todoPage) => todoPage.deleteTodo ('new todo') )
      .then((todoPage) => todoPage.getTodoListElements())
      .then((list) => expect(list.length).to.equal(0))
  });
});

