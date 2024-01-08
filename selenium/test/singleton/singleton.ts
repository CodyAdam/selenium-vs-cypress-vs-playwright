import { expect } from "chai";
import { DatabaseSingleton } from "./fake-database";

describe("DatabaseSingleton Tests", function () {
  this.timeout(10000); // Set timeout to 10 seconds

  let db;

  before(async function () {
    db = DatabaseSingleton.getInstance();
  });

  it("Initial state of database should be 0", async function () {
    expect(db.getDatabaseState()).to.equal(0);
  });

  it("Mutating database state should increment the number", async function () {
    db.mutateDatabase(); // This should increment the number
    expect(db.getDatabaseState()).to.equal(1);
  });

  it("Database state should persist across tests", async function () {
    // The state should be 1 from the previous test
    expect(db.getDatabaseState()).to.equal(1);
  });

  it("Further mutation of database state", async function () {
    db.mutateDatabase(); // Increment again
    expect(db.getDatabaseState()).to.equal(2);
  });
});

describe("Parallel DatabaseSingleton Tests", function () {
  this.timeout(10000); // Set timeout to 10 seconds

  let db;

  before(async function () {
    db = DatabaseSingleton.getInstance();
  });

  it("Database state should persist across tests and parallel runs", async function () {
    expect(db.getDatabaseState()).to.equal(2);
  });
});
