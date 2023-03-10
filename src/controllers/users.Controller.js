
import {getUserbyId, getUsersByName, getSessionByToken, getFollowById } from "../repository/users.repository.js";

export async function getUsers(req, res){
    const {username} = req.body;
    const { authorization } = req.headers;
  
    if (!authorization) {
      res.sendStatus(401);
      return;
    }
  
    const token = authorization?.replace("Bearer ", "");

    try{
        const session = await getSessionByToken(token);

        if (session.rows.length === 0) {
          res.sendStatus(401);
          return;
        }

        const users = await getUsersByName(username)
        const following = await getFollowById(session.rows[0].userId) 
        let followingIds = [];

        following.rows.map(f => followingIds.push(f.userId))
        
        users.rows.map(u => {
            if(followingIds.includes(u.id)){
                u.following = true
            }else{
                u.following = false
            }
        })

        res.send(users.rows).status(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function getUser(req, res){
    const {id} = req.params;

    try{
        const user = await getUserbyId(id)

        res.send(user.rows[0]).status(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}

export async function getUserData(req, res){
    const { authorization } = req.headers;

    if (!authorization) {
      res.sendStatus(401);
      return;
    }

    const token = authorization.replace("Bearer ", "");

    try{
        const session = await getSessionByToken(token);

        if (session.rows.length === 0) {
          res.sendStatus(401);
          return;
        }

        const user = await getUserbyId(session.rows[0].userId);


        res.send(user.rows[0]).status(200)

    }catch(err){
        console.log(err);
        res.sendStatus(500)
    }
}
