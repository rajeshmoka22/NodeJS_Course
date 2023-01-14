import express from 'express';
import {v4 as uuidV4} from 'uuid';
import { AutoSuggest, User } from './interface';
import { userSchema, userValidator } from './schema';

const app = express();
app.use(express.json());
const PORT = 3000;

const users: User[] = [];

//get user
app.get('/users/:id', (req, res) => {
  const {id} = req.params;
  const user = users.find(user => user.id === id && !user.isDeleted);
  if(user) res.status(200).send(user);
  else res.status(404).send({message: `user not found for id: ${id}`});
});

//create user
app.post('/users', userValidator(userSchema),  (req, res) => {
  const user = req.body as User;
  const id = uuidV4();
  users.push({...user, id});
  users.sort((user1, user2) => user1.login> user2.login ? 1 : -1);
  res.status(200).send({message: "user created successfully"});
});

//update user
app.post('/users/:id', userValidator(userSchema), (req, res) => {
  const {login, password, age} = req.body as User;
  const {id} = req.params;
  const userIndex = users.findIndex(item => item.id === id && !item.isDeleted);
  if(userIndex === -1) res.status(404).send({message: `user not found for id: ${id}`});
  else {
    users[userIndex] = {...users[userIndex], login, password, age};
    users.sort((user1, user2) => user1.login> user2.login ? 1 : -1);
    res.status(200).send({message: 'user updated successfully'});
  }
});

//delete user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex(user => user.id === id && !user.isDeleted);
  if(userIndex === -1) res.status(404).send({message: `user not found for id: ${id}`});
  else {
    users[userIndex] = ({...users[userIndex], isDeleted: true});
    res.status(200).send({message: 'user deleted successfully'});
  }
})

//autosuggest users
app.get('/users', (req, res) => {
  const {loginSubstring = '', limit = 10} = req.query as AutoSuggest;
  const suggestions = users.filter(user => loginSubstring && user.login.toLowerCase().includes(loginSubstring.toLowerCase()) && !user.isDeleted).slice(0, limit);
  res.status(200).send(suggestions);
})

app.listen(PORT);
