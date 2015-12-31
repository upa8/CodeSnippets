# GitCommands (Under Construction)
Hello friends , 
Welcome . Are you here to learn git and github ?. You are at right place then . 
This is a repository , where you will find all the basic to advanced git 
commands which we use in our day to day github usage . 
In our day to day use of github , practically it is impossible to memorize 
all the commands of github . So , to solve that problem , I am listing all 
basic commands in this repository . 
What is "I Learn pull request" section ?

Here we go then . 
Let's start : 
1) Setting up name and username 
	$git config --global user.name "username"
	$git config --global user.email "myemail@xyz.com"
2) Create a git repository 
	$git init projectName
3) Create a file 
	$touch filename.extension 
4) Check status of file 
	$git add filename.extension
	OR 
	$git add .  // This will add all the files which are untracked 
5) Check status of the project 
	$git status  
6) Commit the changes 
	$git commit -m "Git Message " // -m here is to give proper name to commit
7) How many remote repositories we are connected to 
	$git remote -v 
8) 