
# Simform Task Service
**Description**
 **knowledgebase** is online custom user-friendly Content Management Service which have Category and its content analyzer. Backend Service of **knowledgebase**


# Installation of project

To Run the following Project , follow below steps in your console

 1. npm i
 2. npm start


## Instructions

 1. Copy .env file from your mail and paste it on root-level of the project.
 2. For API Documentaion follow the Link : https://documenter.getpostman.com/view/9952053/TzK17b9q
 3. All Headers should have **Authorization :Bearer < token >**. This can be achieve using Login Route: http://localhost:3000/api/v1/usermgmt/login.
 4. For MongoDb , MongoDB Atlas is used, so no setup required.
 5. For SQL, MySQL Localhost  is used, so you have to run MySQL service in your machine and replace your credentials  in .env file (i.e DB_SQL_USER=*your_username* and DB_SQL_PASS=*your_password* , for e.g DB_SQL_USER=root and DB_SQL_PASS=123456a ). A Dumb DB will be found with this link :https://drive.google.com/drive/folders/1jXN7JL2n0swsCE4u_NCH43ssrZ5RGxAO?usp=sharing.