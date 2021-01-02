const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { mongoose } = require('./database/mongoose');
const { List, Task, User } = require('./database/models');
var jwt = require('jsonwebtoken');
const cors = require('cors')

var supperSecret = '51778657246321226641fsdklafjasdkljfsklfjd7148924065';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(function (req, res, next) {
  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );
    next();
});



// get all list
app.get('/list', verifyToken, (req, res) => {
    List.find({
        _userId: req.user_id
    }).then((lists) => {
        res.send(lists);

    }).catch((e) => {
        res.send(e);
    });
});


// create list
app.post('/list', verifyToken, (req, res) => {
    let title = req.body.title;

    let newList = new List({
        title,
        _userId: req.user_id
    });
    newList.save().then((listDoc) => {
        // the full list document is returned (incl. id)
        console.log(listDoc)
        res.send(listDoc);
    })
});

// update list
app.patch('/list/:id', verifyToken, (req, res) => {
    console.log(req.body)
    List.findOneAndUpdate({ _id: req.params.id, _userId: req.user_id }, {
        $set: req.body
    }).then(() => {
        res.send({ 'message': 'updated successfully' });
    });
})


//delete list 
app.delete('/list/:id', verifyToken, (req, res) => {
    List.findOneAndRemove({
        _id: req.params.id,
        _userId: req.user_id
    }).then((removedListDoc) => {
        Task.deleteMany({
            _listId: req.params.id
        }, (err) => {
            console.log(err)
        })
        res.send(removedListDoc);
    })
});

// get all task
app.get('/list/:listId/task', verifyToken, (req, res) => {
    // We want to return all tasks that belong to a specific list (specified by listId)
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    })
});

// create new task
app.post('/list/:listId/task', verifyToken, (req, res) => {
    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        console.log(list)
        if (list) {
            // list object with the specified conditions was found
            // therefore the currently authenticated user can create new tasks
            return true;
        }

        // else - the list object is undefined
        return false;
    }).then((canCreateTask) => {
        if (canCreateTask) {

            let newTask = new Task({
                title: req.body.title,
                _listId: req.params.listId
            });

            newTask.save().then((newTaskDoc) => {
                res.send(newTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    })
})

//update task
app.patch('/list/:listId/task/:taskId', verifyToken, (req, res) => {
    console.log(req.params.taskId)
    console.log(req.params.listId)
    console.log(req.body)

    List.findOne({
        _id: req.params.listId,
        _userId: req.user_id
    }).then((list) => {
        console.log(list)
        if (list) {
            return true;
        }

        // else - the list object is undefined
        return false;
    }).then((canUpdateTasks) => {
        if (canUpdateTasks) {
            // the currently authenticated user can update tasks

            Task.findOneAndUpdate({
                _id: req.params.taskId,
                _listId: req.params.listId
            }, {
                $set: req.body
            }
            ).then(() => {
                res.send({ message: 'Updated successfully.' })
            })
        } else {
            res.sendStatus(404);
        }
    })
})

// delete task 
app.delete('/list/:listId/task/:taskId', (req, res) => {
    // console.log(req)
    console.log(req.params.listId)
    console.log(req.user_id)
    List.findOne({
        _id: req.params.listId

    }).then((list) => {
        console.log(list)
        if (list) {
            // list object with the specified conditions was found
            // therefore the currently authenticated user can make updates to tasks within this list
            return true;
        }

        // else - the list object is undefined
        return false;
    }).then((canDeleteTasks) => {
        console.log(canDeleteTasks)
        if (canDeleteTasks) {
            Task.findOneAndRemove({
                _id: req.params.taskId,
                _listId: req.params.listId
            }).then((removedTaskDoc) => {
                res.send(removedTaskDoc);
            })
        } else {
            res.sendStatus(404);
        }
    });
})


// verify token
function verifyToken(req, res, next) {

    let token = req.header('x-access-token');

    // verify the JWT
    jwt.verify(token, supperSecret, (err, decoded) => {
        if (err) {
            // there was an error
            // jwt is invalid - * DO NOT AUTHENTICATE *
            res.status(401).send(err);
        } else {
            // jwt is valid
            req.user_id = decoded._id;
            next();
        }
    });

};


// register user
app.post('/register', (req, res) => {
    console.log(req.body.email)
    User.find({
        email: req.body.email

    }).then((UserItem) => {
        console.log(UserItem.length)
        if (UserItem.length != 0) {
            console.log("user found")
            return res.json({ message: 'Email already registered' })
        }
        console.log(req.body.email)
        var user = new User({
            email: req.body.email,
            password: req.body.password

        });
        console.log("user not found")
        let promise = user.save();

        promise.then(function (doc) {
            return res.status(201).json(doc);
        })

        promise.catch(function (err) {
            return res.status(501).json({ message: 'Error registering user.' })
        })
    });

})
//get user
app.get('/register', function (req, res) {
    User.find(function (err, users) {
        if (err)
            return res.send(err);

        res.json(users);
    });
});

// login 
app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.generateAccessAuthToken().then((accessToken) => {
            return { accessToken }
        }).then((authTokens) => {
            // Now we construct and send the response to the user with their auth tokens in the header and the user object in the body
            res
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    })

})


app.listen(3000, () => {
    console.log("server listening on port 3000");
})