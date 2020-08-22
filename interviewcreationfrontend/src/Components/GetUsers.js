import axios from 'axios';

export default class UserDetails{
    constructor() {
    }

    // Gives all users as a dictionary id => object
    Getallusers(callback){
        axios.get(process.env.REACT_APP_ManageUsers)
        .then( response => {
            var Users = {};
            var UserList = response.data;
            response.data.map( data => {
                Users[data.id] = data;
            })
            callback({"Dictionary" : Users , "list" : UserList});
        })
        .catch(function (error) {
            alert(error); 
        })
    }
    
    // Gives specifiv users as a object
    Getuser(UserId, callback){
        axios.get(process.env.REACT_APP_ManageUsers+UserId)
        .then( response => {
            callback(response.data);
        })
        .catch(function (error) {
            alert(error); 
        })
    }

    // Gives users as dictionary id => object
    GetuserbyArray(UserList, callback){
        var users = {};
        var userList = [];
        UserList.map( userId =>{
            this.Getuser(userId, (User)=> {
                users[User.id] = User
                userList.push(User);
            })
        })
        callback({"Dictionary" : users , "list" : UserList});
    }
    
}