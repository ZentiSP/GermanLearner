# About Script

This only use to initialize mongoDB and make start command line
Make it less step and easy to just run this

----
* restart.ps1
is for to npx prisma generate and run start again in case you change
prisma schema and some API Code

* start.ps1
is for the frist time you start the project up and want to run start
this for create MongoDB Replica for prisma to be able to work on this Locally

## * Run this script through VS Code Terminal or any terminal should work fine
and if you run start.ps1 and Mongosh did not say it connet to replica
please stop mongodb server and run the script again