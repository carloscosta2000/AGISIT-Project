db.createUser(
  {
    user: "project",
    pwd: "UenbhkDgE1sSUkyQUE8",
    roles: [
      {
        role: "readWrite",
        db: "agisit023"
      }
    ]
  }
);
db.createUser(
  {
    user: "task",
    pwd: "zYXm7HJNpsNPsTBte4",
    roles: [
      {
        role: "readWrite",
        db: "agisit023"
      }
    ]
  }
);
db.createUser(
  {
    user: "user",
    pwd: "ynIxj882Uo53mDFGs",
    roles: [
      {
        role: "readWrite",
        db: "agisit023"
      }
    ]
  }
);
  db.createCollection('users');
  db.users.insertOne(
    {
      username: 'Admin1',
      password: 'Aa123456',
      isAdmin: true
    }
  );
  db.users.insertOne(
    {
      username: 'User1',
      password: 'Bb123456',
      isAdmin: false
    }
  );