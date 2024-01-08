import { DatabaseSingleton } from "./fake-database";
import { test, expect, devices } from "@playwright/test";

test.describe("DatabaseSingleton Tests", () => {
  test("Initial state of database should be 0", () => {
    const db = DatabaseSingleton.getInstance();
    expect(db.getDatabaseState()).toBe(0);
  });

  test("Mutating database state should increment the number", () => {
    const db = DatabaseSingleton.getInstance();
    db.mutateDatabase(); // This should increment the number
    expect(db.getDatabaseState()).toBe(1);
  });

  test("Database state should persist across tests", () => {
    const db = DatabaseSingleton.getInstance();
    // The state should be 1 from the previous test
    expect(db.getDatabaseState()).toBe(1);
  });

  test("Further mutation of database state", () => {
    const db = DatabaseSingleton.getInstance();
    db.mutateDatabase(); // Increment again
    expect(db.getDatabaseState()).toBe(2);
  });
});

test.describe("Parallel DatabaseSingleton Tests", () => {
  test("Database state should persist across tests and parallel runs", () => {
    const db = DatabaseSingleton.getInstance();
    expect(db.getDatabaseState()).toBe(2);
  });
});
