const Database = require("./config");

const initDb = {
  async init() {
    const db = await Database();

    await db.exec(`CREATE TABLE profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    avatar TEXT,
    monthly_budget INT,
    days_per_week INT,
    hours_per_day INT,
    vacation_per_year INT,
    value_hour INT
)`);
    await db.exec(`CREATE TABLE jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    daily_hours INT,
    Total_hours INT,
    createAt DATETIME

)`);

    await db.run(`INSERT INTO profile (
    name, 
    avatar, 
    monthly_budget,
    days_per_week,
    hours_per_day,
    vacation_per_year,
    value_hour
    
) VALUES (
    "Deividy",
    "https://avatars.githubusercontent.com/u/89440440?s=400&u=1f857d600ed116e1c219e229927696863b05b95e&v=4",
    3000,
    5,
    5,
    4,
    75
    
);`);

    await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    createAt

) VALUES (
    "Pizzaria Guloso",
    2,
    1,
    1617514376818
);`);

    await db.run(`INSERT INTO jobs (
    name,
    daily_hours,
    total_hours,
    createAt

) VALUES (
    "OneTwo Projects",
    3,
    47,
    1617514376818
);`);

    await db.close();
  },
};

initDb.init();
