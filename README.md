<html>
	<head>

	</head>
	<body>
		# GitCommands (Under Construction)
		Hello friends ,<br> 
		Welcome . Are you here to learn git and github ?. You are at right place then . 
		This is a repository , where you will find all the basic to advanced git 
		commands which we use in our day to day github use. <br>
		Practically it is impossible to memorize all github commands  . To solve this problem , I am listing all 
		basic to advanced commands in this repository . 
		What is "I Learn pull request" section ?

Here we go then . <br>
Let's start : <br>
1) Setting up name and username<br>
	<pre><code> 
		$git config --global user.name "username" <br>
		$git config --global user.email "myemail@xyz.com" <br>
	</code></pre> 
2) Create a git repository <br>
	<pre><code> 
		$git init projectName<br>
	</code></pre>
3) Create a file <br>
	<pre><code>
		$touch filename.extension<br>
	</code></pre> 
4) Check status of file <br>
	<pre><code>
		$git add filename.extension<br>
		OR <br>
		$git add .  // This will add all the files which are untracked<br> 
	</code></pre>
5) Check status of the project <br>
	<pre><code>
		$git status  <br>
	</code></pre>
	
6) Commit the changes<br> 
	<pre><code>
		$git commit -m "Git Message " // -m here is to give proper name to commit<br>
	</code></pre>
	
7) How many remote repositories we are connected to <br>
	<pre><code>
		$git remote -v <br>
	</code></pre>
	
8)	How to revert back to particular commit 
	<pre><code>
		$git revert --hard commitId
	</code></pre>
	</body> 
</html>
