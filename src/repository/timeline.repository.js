import { connection } from "../database/db.js";

export function insertPost(userId, linksId, comments) {
  return connection.query(
    `INSERT INTO posts ("userId", "linksId", comments, likes) VALUES ($1, $2, $3, $4) RETURNING id;`,
    [userId, linksId, comments, 0]
  );
}

export function insertLink(title, description, url, image) {
  return connection.query(
    `INSERT INTO links ("linkTitle", "linkDescription", "linkUrl", "linkImage") VALUES ($1,$2,$3,$4) RETURNING id;`,
    [title, description, url, image]
  );
}

export function insertUpdatedPost(comments, id) {
  return connection.query(`UPDATE posts SET comments=$1  WHERE posts.id=$2;`, [
    comments,
    id,
  ]);
}

export function selectUserId(postId) {
  return connection.query(`SELECT posts."userId" FROM posts WHERE id = $1`, [
    postId,
  ]);
}

export function findLink(link){
  return connection.query(`SELECT id FROM links WHERE links."linkUrl" = $1`, [
    link,
  ]);

}


export function deleteOnePost(postid) {
  return connection.query(`DELETE FROM posts WHERE id=$1;`, [postid]);
}

export function getAllPosts() {
  return connection.query(`SELECT * FROM posts`);
}

export function getAllLinks() {
  return connection.query(`SELECT * FROM links`);
}

export function selectAllPosts() {
  return connection.query(
    `SELECT
  users.id,
  users.username,
  users."pictureUrl", 
  posts."likes",
  posts.comments, 
  posts.id AS "postId",
  links."linkTitle",
  links."linkDescription", 
  links."linkUrl", 
  links."linkImage"
  FROM posts 
  JOIN users ON posts."userId"=users.id 
  JOIN links ON posts."linksId"=links.id 
  ORDER BY posts.id DESC
  LIMIT 20
  ;`
  );
}

export function selectPostsfollowing(userId) {
  return connection.query(
    `SELECT
  users.id,
  users.username,
  users."pictureUrl", 
  posts."likes",
  posts.comments, 
  posts.id AS "postId",
  links."linkTitle",
  links."linkDescription", 
  links."linkUrl", 
  links."linkImage"
  FROM posts 
  JOIN users ON posts."userId"=users.id 
  JOIN links ON posts."linksId"=links.id 
  JOIN follows ON users.id = follows."userId"
  WHERE follows."followerId" = $1
  ORDER BY posts.id DESC
  LIMIT 20
  ;`, [userId]
  );
}

export function selectPostsById(id) {
  return connection.query(
    `SELECT
  users.id,
  users.username,
  users."pictureUrl", 
  posts."likes",
  posts.comments, 
  posts.id AS "postId",
  links."linkTitle",
  links."linkDescription", 
  links."linkUrl", 
  links."linkImage"
  FROM posts 
  JOIN users ON posts."userId"=users.id 
  JOIN links ON posts."linksId"=links.id 
  WHERE users.id = $1 
  ORDER BY posts.id DESC
  LIMIT 20
  ;`,
    [id]
  );
}
