export class DatabaseSingleton {
  private static instance: DatabaseSingleton;

  // A mock state representing some data in the database.
  private databaseNumber: number = 0;

  private constructor() {
    // Private constructor to prevent direct construction calls with the `new` operator.
  }

  static getInstance(): DatabaseSingleton {
    if (!DatabaseSingleton.instance) {
      DatabaseSingleton.instance = new DatabaseSingleton();
    }
    return DatabaseSingleton.instance;
  }

  public mutateDatabase(): void {
    // Here, we're simply incrementing the number to simulate a mutation.
    this.databaseNumber++;
  }

  public getDatabaseState(): number {
    // Method to get the current state of the database.
    return this.databaseNumber;
  }
}
