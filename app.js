const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const Users = require('./model/Users')
const app = express()
const port = 8000
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
app.set('views', './views')
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", async (req, res) => {
    const users = await Users.find();
    res.render('index',{users})
})
app.get('/add', (req, res) => {
    res.render('add')
})
app.get('/delete/:rno', async (req, res) => {
    const { rno } = req.params;
    try {
        await Users.deleteOne({ rno: rno });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting user');
    }
});
app.get('/edit/:rno', async (req, res) => {
    const { rno } = req.params;
    const user = await Users.findOne({ rno: rno });
    res.render('edit', { user });
});
app.post('/update', async (req, res) => {
    const { rno, name, age, city } = req.body;
    try {
        await Users.updateOne({ rno: rno }, { name, age, city });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating user');
    }
})
app.post('/save', async (req, res) => {
    const { rno, name, age, city } = req.body
    try {
        const user = new Users({
        rno: rno,
        name: name,
        age: age,
        city: city
        })
        await user.save()
    }
    catch {
        console.log('Error')
    }
    res.redirect('/')
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
