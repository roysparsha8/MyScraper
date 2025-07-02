var mdb = require("mongoose"), dotenv = require("dotenv");
dotenv.config();
var User = null;
async function init() {
    try {
        await mdb.connect(process.env.MONGODB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connection created successfully");
        const schema = new mdb.Schema({
            Name: String,
            Email: String,
            Password: String,
            FileInput: String
        });
        User = mdb.models["User"] || mdb.model("User", schema);
    }
    catch(err) {
        console.log("Error while creating mongodb connection ", err);
    }
}
async function insert(tuples) {
    if(User) {
        try {
            if(tuples.length == 0)
                return;
            if(tuples.length == 1) {
                const addedUser = new User(tuples[0]);
                await addedUser.save(); // addedUser contains the added js object after this.
                console.log(addedUser);
            }
            else {
                const multipleUsers = await User.insertMany(tuples); // After this promise, multipleUsers is a list containing tuples of added users
                console.log(multipleUsers);
            }
        }
        catch(err) {
            console.log("Error while inserting users ", err);
        }
    }
    else 
        console.log("Model not initialized");
}
async function getUsers(spec) {
    if(User) {
        try {
            const specUsers = await User.find(spec)
            return specUsers;
        }
        catch(err) {
            console.log("Error while fetching users ", err);
            return [];
        }
    }
    else 
        return [];
}
async function term() {
    try {
        await mdb.connection.close();
        console.log("Terminating MONGODB");
    }
    catch(err) {
        console.log("Error while terminating MONGODB connection ", err);
    }
}
module.exports = {init, insert, getUsers, term};