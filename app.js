const express = require('express');
const app = express();

app.use(express.json());

const users = [
  { id: 0, name: 'Rebecca', email: 'Rebecca@youmail.com' },
  { id: 1, name: 'Deborah', email: 'Deborah@youmail.com' },
  { id: 2, name: 'Sharon', email: 'Sharon@youmail.com' },
  { id: 3, name: 'Yasmin', email: 'Yasmin@youmail.com' },
  { id: 4, name: 'Busola', email: 'Busola@youmail.com' },
];

// Route Handlers
const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'sucess',
    data: {
      users,
    },
  });
};
const createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);
  users.push(newUser);
  res.status(201).json({
    status: 'sucess',
    data: {
      user: newUser,
    },
  });
};

const getOneUser = (req, res) => {
  const id = Number(req.params.id);
  if (id < users.length) {
    const user = users.find((user) => id === user.id);
    res.status(200).json({
      status: 'sucess',
      data: {
        user,
      },
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
};

const deleteOneUser = (req, res) => {
  const id = Number(req.params.id);
  if (id < users.length) {
    const user = users.find((user) => id === user.id);
    users.pop(user);
    res.status(200).json({
      status: 'sucess',
      users,
    });
  } else {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
};

const updateOneUser = (req, res) => {
  const id = Number(req.params.id);
  if (id < users.length) {
    const user = users.find((user) => id === user.id);
    Object.assign(user, req.body);
    res.status(200).json({
      status: 'sucess',
      data: {
        user,
      },
    });
  }
};

//Routes
app.route('/api/v1/users').get(getAllUsers).post(createUser)
app.route('/api/v1/users/:id').get(getOneUser).delete(deleteOneUser).patch(updateOneUser)

// app.get('/api/v1/users', getAllUsers);
// app.post('/api/v1/users', createUser);
// app.get('/api/v1/users/:id', getOneUser);
// app.delete('/api/v1/users/:id', deleteOneUser);
// app.patch('/api/v1/users/:id', updateOneUser);

//  server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
