# Trivia_website
Trivia website application.\
Shecodes; project

## Discription
The application craeted to the use of the elderly people, with simple UI.\
Especially for my grandfather.

## How its working
- The player answers a short form and choosing a category, difficulty and question type.
- The server recive his form and responde him with 5 questions.
- At the end of the game the player recive a Feedback with his score.
- The player can choose to play again.

## Prerequisites
**Server, which has the following installed:**
- Python 3.6 or higher
- Git
- Import to the following Python Packages:
```
--Flask
--requests
--json
--random
--html
```

**Client-side, which has the following installed:**

- NPM v6.12.0
- Node.js v12.13.0
- Browser

## About the application

**Backend**\
The server side is developed in Python, using Flask.\
Implementing REST-API architecture, using POST & GET requests.\
The data is recived from external Api.\
Once the data is received on the server, it is generated in the server to the wanted response on the client side.\
The client recives only one question at a time, due to security reasons.\
The server also handle the Unicode issue.


**Frontend**\
The client-side architecture is implemented with React, Using Ajax,Proxy and Material-UI.\
The application has two main commponents:
- **Form page :**
```
The palyer fill a form with his name, choosing a category, difficulty and
question type(multiple or true/false). Once the player click "Play!", an Ajax 
request sent to the server.
```
![homePage](https://user-images.githubusercontent.com/45918656/86247926-d7125900-bbb5-11ea-9fd9-1dbfc4adbed1.png)

- **Qustions page:**
```
The client resive a json respone from the server. The json composed with the question
and a list of possible answers. Whene the player pick answer, another Ajax request sent to the server,
to check whether is the correct one. If it is correct answer the player will gain one point to his score.
When the player click "Next", an Ajax request sent to the server and so on.
```

![QuestionPage](https://user-images.githubusercontent.com/45918656/86248206-3bcdb380-bbb6-11ea-9c31-155e19b4b16e.png)

```
Each game consists of 5 questions.
On the fifth question, a "Finish" button appears and by clicking it the player recive a page with 
his final score. He also get to play again by clicking the "Play again" button,
which will lead him to the Form page.
```

![FinishPage](https://user-images.githubusercontent.com/45918656/86248218-40926780-bbb6-11ea-8bfc-b2608803cd64.png)



