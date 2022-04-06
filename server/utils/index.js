let users=[]
function userJoin(id,user){
let temp={
    user:user,
    id:id
}
users.push(temp)
return temp;
}


function userLeave(id) {
    const index = users.findIndex(user => user.id === id);
  
    if (index !== -1) {
      return users.splice(index, 1)[0];
    }
}


function getUsers(room) {
    return users
}

module.exports = {
    userJoin,
    userLeave,
    getUsers
}