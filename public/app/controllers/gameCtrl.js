angular.module('app')
    .controller('gameCtrl', function($scope, $http, $stateParams, $rootScope, $location) {

        var socket = io();
        var id = $stateParams.id;
        $scope.status = "Waiting for players"
        $scope.player = ""
        $scope.setup = function() {
            // on connection to server send the id of games url
            socket.on('connect', function() {
                socket.emit('load', id);
            });


            socket.on('setplayer', function(data) {
                console.log("setplayer emitted", data)
                $scope.player = data.player
            })


            // receive the names and avatars of all people in the chat room
            socket.on('peopleinchat', function(data) {
                console.log("peopleinchat triggered from backend")
                if (data.number === 0) {

                    console.log("data.number is 0")
                    localStorage.setItem("PLayer", "X");
                    // call the server-side function 'login' and send user's parameters  
                    socket.emit('login', {
                        user: $rootScope.currentUser,
                        id: id
                    });


                } else if (data.number === 1) {
                    console.log("data.number is 1")
                    console.log(data)
                    $scope.status = "Player Joined"
                    $scope.turn = true;
                    $scope.setup()
                    $scope.chatWith = data.user;
                    console.log($scope.chatWith)
                    $scope.name = data.user
                    console.log("scope name is" + $scope.name)
                    socket.emit('login', {
                        user: $rootScope.currentUser,
                        id: id
                    });


                } else {
                    console.log("Chat is full")
                }

            });




            // Other useful 


            socket.on('leave', function(data) {

                if (data.boolean && id == data.room) {

                    console.log("left", data);

                }

            });
            socket.on('receive', function(data) {

                console.log("Recieved by me")
                console.log(data);

            });
            socket.on('winner', function(data) {

                console.log("Winner Declared"+data.user)
                alert("Winner is "+ data.user)                

            });

        }

        $scope.setup();


        $scope.turn = -1


        $scope.Values = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]


        var xValues = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]

        var yValues = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]


        $scope.winner = function(arr, candidate) {

            //Here I am basically doing the same thing again and it can be done more elegantly using recursion
            //Will make it more concise and optimized later. 
            //Now looking at the code it looks like a if-else hell, something innovative awaits ! 

            var sum = 0
                //check first row
            for (var j = 0; j < arr.length; j++) {
                sum = sum + arr[0][j]
            }
            if (sum == 3) {
                alert("Winner is " + candidate)
                socket.emit('winner', {
                    user: candidate
                });

            } else {
                //check second row
                sum = 0
                for (var j = 0; j < arr.length; j++) {
                    sum = sum + arr[1][j]
                }
                if (sum == 3) {
                    alert("Winner is " + candidate)
                    socket.emit('winner', {
                        user: candidate
                    });
                } else {
                    //check third row
                    sum = 0
                    for (var j = 0; j < arr.length; j++) {
                        sum = sum + arr[2][j]
                    }
                    if (sum == 3) {
                        alert("Winner is " + candidate)
                        socket.emit('winner', {
                            user: candidate
                        });
                    } else {
                        //check first column
                        sum = 0
                        for (var i = 0; i < arr.length; i++) {
                            sum = sum + arr[i][0]
                        }
                        if (sum == 3) {
                            alert("Winner is " + candidate)
                            socket.emit('winner', {
                                user: candidate
                            });
                        } else {
                            //check second column
                            sum = 0
                            for (var i = 0; i < arr.length; i++) {
                                sum = sum + arr[i][1]
                            }
                            if (sum == 3) {
                                alert("Winner is " + candidate)
                                socket.emit('winner', {
                                    user: candidate
                                });
                            } else {
                                //check third column
                                sum = 0
                                for (var i = 0; i < arr.length; i++) {
                                    sum = sum + arr[i][2]
                                }
                                if (sum == 3) {
                                    alert("Winner is " + candidate)
                                    socket.emit('winner', {
                                        user: candidate
                                    });
                                } else {
                                    //now check the left diagonal
                                    sum = 0
                                    for (var i = 0; i < arr.length; i++) {
                                        for (var j = 0; j < arr.length; j++) {
                                            if (i == j) {
                                                sum = sum + arr[i][j]
                                            }

                                        }
                                    }
                                    if (sum == 3) {
                                        alert("Winner is " + candidate)
                                        socket.emit('winner', {
                                            user: candidate
                                        });
                                    } else {
                                        //now check the right diagonal
                                        sum = 0
                                        for (var i = 0; i < arr.length; i++) {
                                            for (var j = 0; j < arr.length; j++) {
                                                if (i + j == 2) {
                                                    sum = sum + arr[i][j]
                                                }

                                            }
                                        }
                                        if (sum == 3) {
                                            alert("Winner is " + candidate)
                                            socket.emit('winner', {
                                                user: candidate
                                            });
                                        }
                                    }

                                }
                            }
                        }

                    }

                }

            }
        }


        socket.on('rtest', function(data) {

            console.log("Recieved by me in test")
            console.log(data);
            if (data.user == "X") {
                $scope.Values[data.x][data.y] = 'X'
                xValues[data.x][data.y] = 1;
                $scope.$digest();
                $scope.turn = !$scope.turn;
            } else {
                $scope.Values[data.x][data.y] = '0'
                yValues[data.x][data.y] = 1;
                $scope.$digest();
                $scope.turn = !$scope.turn;
            }


        });

        $scope.play = function(x, y) {

            console.log("game on")
            if ($scope.Values[x][y] == '') {
                if ($scope.turn == true && $scope.player == 'X') {
                    $scope.Values[x][y] = 'X'
                    xValues[x][y] = 1;
                    socket.emit('move', {
                        user: 'X',
                        x: x,
                        y: y
                    });

                    $scope.winner(xValues, 'X');
                    $scope.turn = !$scope.turn;
                } else if ($scope.turn == false && $scope.player == '0') {
                    $scope.Values[x][y] = '0'
                    yValues[x][y] = 1;
                    socket.emit('move', {
                        user: '0',
                        x: x,
                        y: y
                    });
                    $scope.winner(yValues, '0');
                    $scope.turn = !$scope.turn;
                } else {
                    console.log("Not enough players")
                    console.log("Player is" + $scope.player)
                    console.log("turn of" + $scope.turn)
                }
            } else {
                console.log("taken")
            }

        }


    })
