module.exports = function(app,io){
	
	console.log("hello");
	// Initialize a new socket.io application, named 'chat'
	var chat = io.on('connection', function (socket) {
		console.log(socket.id)
		socket.on('load',function(data){
			
			//client sends the games url in data
			console.log("data from the client"+data)			

			var room = findClientsSocket(io,data);
			console.log(room.length)
			if(room.length === 0 ) {

				socket.emit('peopleinchat', {number: 0});
			}
			else if(room.length === 1) {
				console.log("now room length is 1")			
				socket.emit('peopleinchat', {
					number: 1,
					user: room[0].username,					
					id: data
				});
			}
			else if(room.length >= 2) {

				chat.emit('tooMany', {boolean: true});
			}
		});

		// When the client emits 'login', save his name and avatar,
		// and add them to the room

		socket.on('move',function(data){
			console.log("the move is "+data.x + data.y )

		})


		socket.on('login', function(data) {

			console.log("login action triggered")
			console.log(data);
			var room = findClientsSocket(io, data.id);
			console.log(room);
			// Only two people per room are allowed
			if (room.length < 2) {

				console.log("room length is less than 2")
				// Use the socket object to store data. Each client gets
				// their own unique socket object

				socket.username = data.user;
				socket.room = data.id;
				

				// Tell the person what he should use for an avatar
				socket.emit('img', socket.avatar);


				// Add the client to the room
				socket.join(data.id);

				console.log("room length again"+ room.length);

				if (room.length == 1) {
					console.log("room length is 1")
					var usernames = [],
						avatars = [];

					usernames.push(room[0].username);
					usernames.push(socket.username);

					avatars.push(room[0].avatar);
					avatars.push(socket.avatar);

					// Send the startChat event to all the people in the
					// room, along with a list of people that are in it.

					chat.in(data.id).emit('startChat', {
						boolean: true,
						id: data.id,
						users: usernames,
						avatars: avatars
					});
				}
			}
			else {
				socket.emit('tooMany', {boolean: true});
			}
		});

		// Somebody left the chat
		socket.on('disconnect', function() {

			// Notify the other person in the chat room
			// that his partner has left

			socket.broadcast.to(this.room).emit('leave', {
				boolean: true,
				room: this.room,
				user: this.username,
				avatar: this.avatar
			});

			// leave the room
			socket.leave(socket.room);
		});


		// Handle the sending of messages
		socket.on('msg', function(data){
			console.log("A new message recieved")
			console.log(data)
			// When the server receives a message, it sends it to the other person in the room.
			socket.broadcast.to(socket.room).emit('receive', {msg: data.msg, user: data.user});
		});
	});
};

function findClientsSocket(io,roomId, namespace) {
	console.log("in client socket finding function")
	console.log(roomId,namespace);
	var res = [],
		ns = io.of(namespace ||"/");    // the default namespace is "/"

	if (ns) {
		console.log("if condition executed");		
		for (var id in ns.connected) {
			console.log(roomId)
			console.log(ns.connected[id].rooms);

			if(roomId) {
				var index = ns.connected[id].rooms.indexOf(roomId) ;
				if(index !== -1) {
					res.push(ns.connected[id]);
				}
			}
			else {
				res.push(ns.connected[id]);
			}
		}
	}
	return res;
}


