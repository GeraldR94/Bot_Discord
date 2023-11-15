const db = require('./index');

const createUsersTable = async () => {
  try {

    const statementDropTable = `
    DROP TABLE IF EXISTS users`;

    db.prepare(statementDropTable).run();

    const statementCreateUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        name TEXT NOT NULL
    )`;
    const createUsersTable = db.prepare(statementCreateUsersTable);
    createUsersTable.run();
  } catch (error){
    console.log(error);
    throw new Error('Web no fund');
  }

};

const createNotesTable = async () => {
  try {
    const statementCreateNotesTable = `
    CREATE TABLE IF NOT EXISTS notes (
        note_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        user_id TEXT,
        FOREIGN KEY (user_id)
        REFERENCES user (user_id)
          ON DELETE CASCADE
    )`;
    const createNotesTable = db.prepare(statementCreateNotesTable);
    createNotesTable.run();
  } catch (error){
    console.log(error);
    throw new Error('Web no fund');
  }

};

const createTables = async () => {
  try {
    console.log('Creando tablas...');
    await createUsersTable();
    console.log('Tabla de usuarios creada');
    await createNotesTable();
  } catch (error) {
    console.log('Se acabo');
  }
};

createTables();

