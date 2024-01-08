import { DatabaseSingleton } from "./fake-database";

describe("DatabaseSingleton Tests", () => {
  it("Initial state of database should be 0", () => {
    const db = DatabaseSingleton.getInstance();
    expect(db.getDatabaseState()).to.eq(0);
  });

  it("Mutating database state should increment the number", () => {
    const db = DatabaseSingleton.getInstance();
    db.mutateDatabase(); // This should increment the number
    expect(db.getDatabaseState()).to.eq(1);
  });

  it("Database state should persist across tests", () => {
    const db = DatabaseSingleton.getInstance();
    // The state should be 1 from the previous test
    expect(db.getDatabaseState()).to.eq(1);
  });

  it("Further mutation of database state", () => {
    const db = DatabaseSingleton.getInstance();
    db.mutateDatabase(); // Increment again
    expect(db.getDatabaseState()).to.eq(2);
  });
});

describe("Parallel DatabaseSingleton Tests", () => {
  it("Database state should persist across tests and parallel runs", () => {
    const db = DatabaseSingleton.getInstance();
    expect(db.getDatabaseState()).to.eq(2);
  });
});
