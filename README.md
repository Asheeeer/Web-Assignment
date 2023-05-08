### What is this?
This project mainly create a chat application that give user to communicate.
### How to use this project in codio?
In codio, open the Terminal first, and then input: npm start to start the server.
Then click the Box URL to open a new browser, then we can enter the "Chat" page.
In the chat page, we can enter the "Me" page and "About" page by clicking the button in the navigation.
### Explain the design in three pages.
In my three page, I mainly use three suitable picture to fill the page to make it beautiful.
Then the "About" and the "Chat" pages all have navigations at the top of the pages while user can click two button in "Me" page to enter other pages.
Three pages all have a footer to show the right is all reserved to me.
1. About the design of "Me"
I adopt the design of concise, to show my main information and give two entrances to "About" and "Chat"

2. About the design of "About"
I put a photo in the left of the page and make it round.
In the right of this page, I give more information about me, including my hobby, my favorite book and movie.
3. About the design of "Chat"
There mainly have two areas, and one is use to show the users who in active, and another one in to support communication and show who leave the window.
### The challenges during the period of developing.
1. The problems of the codio.
The codio cannot successfully start the Terminal.
I finally ask the worker of codio and then reset the project to solve it.
2. The problems of how to revoke `socket.io` in a right way.
I cannot find the reason why I fail to revoke the socket.io in html.
Finally, I seek my teacher to solve the problem.
3. How the show: user1 is typing.
I search it in the internet and solve it by using socket.
4. How to store the data in my server.
Originally, I want to let users to input their name and show: xxx enter the chat room.
However, I need store their user name. If may be a little difficult for me.
So I change my mind, it would more convenient if just say userx (x express the number) is coming. 
### How the chat application client side communicate with server.
In my website, I use `socket.io` to connect the `server` and the application client.
The following steps is the procedures how the `socket.io` work.
1. Client open the HTML and work on the basis of server code.
2. The js code of client connect the server and use `socket.io` to connect with WebSocket.
3. The js code of client gain HTML elements,such as container.
4. When user input message in the input box and click the button of "Send", the js code of client will revoke 
`'sendMessage'` function to obtain the message in the box and use `'socket.emit()'`function to send message to server.
5. The 'chat message' would be triggered when server receive the message from the client.
Then, broadcast the message to all clients which connect the server. The server use `'io.meit()'` function to send message to 
all the clients.
6. The client-side JavaScript code listens for the 'chat message' event and calls the 'showMessage()' function to display the received message.
7. Similarly, when a new user enters the chat room or a user leaves, the server triggers the 'enter' and 'leave' events, respectively, and broadcasts the relevant information to all clients. The client-side JavaScript code listens for these events and calls the `'showMessage()'` function to display the information.
8. The client-side JavaScript code also listens for the 'keydown' event on the input field. When the user presses the Enter key, it calls the `'sendMessage()'` function to send the message to the server.
9. The server also listens for the `'typing'` event from clients. When a user is typing, the server triggers this event and broadcasts a typing indicator message to other clients.
10. The server maintains a current list of online users. When a new user enters or a user leaves, the server updates the user list and sends the updated list to all clients using the `'userList'` event. The client-side JavaScript code listens for the `'userList'` event and updates the display of the user list.

### How my project achieve the requirement of chat?
1. When a new user joins the chat room:
- On the server side (`server.js`), inside the `io.on('connection', (socket) => { ... })` event listener, the server increments the `clientCount` variable to keep track of the number of clients.
- The server assigns a nickname to the newly connected client by setting `socket.nickname = 'user' + clientCount`.
- The server emits an `'enter'` event using `io.emit('enter', socket.nickname + ' enters the room.')` to notify all connected clients about the new user.

2. Displaying the current user list:
- On the server side, the `users` array is used to store the nicknames of all connected clients.
- After a new user joins or a user leaves, the server emits a `'userList'` event using `io.emit('userList', users)` to send the updated list of users to all clients.
- On the client side (`index.html`), the `socket.on('userList', function(users) { ... })` event listener is triggered when the updated user list is received.
- Inside this event listener, the client-side JavaScript code updates the HTML element with id `'userList'` to display the current list of chatting users.

3. When a user leaves the chat room:
- On the server side, inside the `socket.on('disconnect', () => { ... })` event listener, the server emits a `'leave'` event using `io.emit('leave', socket.nickname + ' leaves the room.')` to notify all connected clients about the user who left.
- The server also removes the nickname of the disconnected user from the `users` array.
- Similar to the previous point, the server emits a `'userList'` event to send the updated user list to all clients.
- On the client side, the event listener `socket.on('leave', (msg) => { ... })` is triggered when a user leaves. Inside this event listener, the client-side JavaScript code calls the `showMessage()` function to display the leave notification message.

4. Notifying other users when a user is typing:
- On the client side, the event listener `inputMessage.addEventListener('input', function() { ... })` is triggered when the user starts typing in the input field.
- Inside this event listener, the client emits a `'typing'` event using `socket.emit('typing')` to notify the server that the user is typing.
- On the server side, the server listens for the `'typing'` event using `socket.on('typing', function(data) { ... })`.
- Inside this event listener, the server broadcasts a typing indicator message to all other clients using `socket.broadcast.emit('typing', socket.nickname+ ' is typing')`.
- On the client side, the event listener `socket.on('typing', function(data) { ... })` is triggered when the typing indicator message is received. Inside this event listener, the client-side JavaScript code updates the HTML element with id `'typingArea'` to display the typing indicator message. After a delay of 3 seconds, the typing indicator is cleared.

### References
1. A project from Github.
https://github.com/cleverqin/node-websocket-Chatroom
2. Use socket and express in the chat room in CSDN.
https://blog.csdn.net/qq_42535651/article/details/111460966
3. How to make a chat room, in bilibili.com.
https://www.bilibili.com/video/BV14K411T7cd/?spm_id_from=333.337.search-card.all.click
4. The all PPTs that we used in the class.