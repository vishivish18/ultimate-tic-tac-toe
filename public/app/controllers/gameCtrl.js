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
                //console.log("setplayer emitted", data)
                $scope.player = data.player
            })


            // receive the names and avatars of all people in the chat room
            socket.on('peopleinchat', function(data) {
                console.log("peopleinchat triggered from backend")
                if (data.number === 0) {
                    $scope.status = "Waiting for other player"
                    //console.log("data.number is 0")
                    localStorage.setItem("PLayer", "X");
                    // call the server-side function 'login' and send user's parameters  
                    socket.emit('login', {
                        user: $rootScope.currentUser,
                        id: id
                    });


                } else if (data.number === 1) {
                    //console.log("data.number is 1")
                    //console.log(data)
                    $scope.status = "Player Joined"
                    $scope.$digest();
                    $scope.turn = true;
                    $scope.setup()
                    $scope.chatWith = data.user;
                    //console.log($scope.chatWith)
                    $scope.name = data.user
                    //console.log("scope name is" + $scope.name)
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
                $scope.status = "Opponent Disconnected"
                $scope.$digest();
                if (data.boolean && id == data.room) {

                    console.log("left", data);

                }

            });
            socket.on('receive', function(data) {

                console.log("Recieved by me")
                console.log(data);

            });
            socket.on('winner', function(data) {

                console.log("Winner Declared" + data.user)
                alert("Winner is " + data.user)

            });

        }

        $scope.setup();


        $scope.turn = -1


        $scope.Values00 = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        $scope.Values01 = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        $scope.Values02 = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        $scope.Values10 = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        $scope.Values11 = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        $scope.Values12 = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        $scope.Values20 = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        $scope.Values21 = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        $scope.Values22 = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]


        $scope.megaValues = [
                [$scope.Values00, $scope.Values01, $scope.Values02],
                [$scope.Values10, $scope.Values11, $scope.Values12],
                [$scope.Values20, $scope.Values21, $scope.Values22]
        ]        


        var xValues00 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        

        var xValues01 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        

        var xValues02 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        

        var xValues10 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        

        var xValues11 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        

        var xValues12 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        
        var xValues20 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        
        var xValues21 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        
        var xValues22 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        



        var yValues00 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        

        var yValues01 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        

        var yValues02 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        

        var yValues10 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        

        var yValues11 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        

        var yValues12 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        
        var yValues20 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        
        var yValues21 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        
        var yValues22 = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ]        



        var megaXvalues = [
                [xValues00, xValues01, xValues02],
                [xValues10, xValues11, xValues12],
                [xValues20, xValues21, xValues22]
            ]        

       var megaYvalues = [
                [yValues00, yValues01, yValues02],
                [yValues10, yValues11, yValues12],
                [yValues20, yValues21, yValues22]
            ]        
        
        ///console.log(test[0][0])   
        //console.log(megaXvalues[0][0]);        
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


        socket.on('sendMove', function(data) {

            console.log("Recieved by me in test")
            console.log(data);
            $scope.id = String(data.x) + String(data.y)
            $scope.setValidMove($scope.id);

            if (data.user == "X") {
                var tempDisplay = $scope.megaValues[data.a][data.b];
                tempDisplay[data.x][data.y] = 'X'                
                //$scope.Values[data.x][data.y] = 'X'                
                var tempValue = megaXvalues[data.a][data.b];
                tempValue[data.x][data.y] = 1
                //xValues[data.x][data.y] = 1;                
                $scope.turn = !$scope.turn;
                $scope.$digest();
            } else {
                var tempDisplay = $scope.megaValues[data.a][data.b];
                tempDisplay[data.x][data.y] = '0'                
                //$scope.Values[data.x][data.y] = '0'
                var tempValue = megaYvalues[data.a][data.b];
                tempValue[data.x][data.y] = 1
                //yValues[data.x][data.y] = 1;                
                $scope.turn = !$scope.turn;
                $scope.$digest();
            }


        });


        $scope.setValidMove = function(id) {
            switch (id) {
                case '00':
                    $scope.leftTop = true;
                    break;

                case '01':
                    $scope.middleTop = true;
                    break;

                case '02':
                    $scope.rightTop = true;
                    break;

                case '10':
                    $scope.leftMiddle = true;
                    break;

                case '11':
                    $scope.middleMiddle = true;
                    break;

                case '12':
                    $scope.rightMiddle = true;
                    break;

                case '20':
                    $scope.leftBottom = true;
                    break;

                case '21':
                    $scope.middleBottom = true;
                    break;

                case '22':
                    $scope.rightBottom = true;
                    break;

                case 'reset':
                    $scope.leftTop = false,
                        $scope.middleTop = false,
                        $scope.rightTop = false,
                        $scope.leftMiddle = false,
                        $scope.middleMiddle = false,
                        $scope.rightMiddle = false,
                        $scope.leftBottom = false,
                        $scope.middleBottom = false,
                        $scope.rightBottom = false

                default:

            }

        }



        $scope.play = function(a, b, x, y) {
            var tempDisplay = $scope.megaValues[a][b];            
            //if ($scope.Values[x][y] == '') {            
            if (tempDisplay[x][y] == '') {
                if ($scope.turn == true && $scope.player == 'X') {
                    //$scope.Values[x][y] = 'X'                    
                    tempDisplay[x][y] = 'X'                
                    //xValues[x][y] = 1;
                    var tempValue = megaXvalues[a][b];
                    tempValue[x][y] = 1                    
                    $scope.setValidMove('reset')
                    socket.emit('move', {
                        user: 'X',
                        a: a,
                        b: b,
                        x: x,
                        y: y
                    });

                    //$scope.winner(xValues00, 'X');
                    $scope.winner(tempValue, 'X');
                    $scope.turn = !$scope.turn;
                } else if ($scope.turn == false && $scope.player == '0') {
                    //$scope.Values[x][y] = '0'
                    tempDisplay[x][y] = '0'                
                    //yValues[x][y] = 1;
                    var tempValue = megaYvalues[a][b];
                    tempValue[x][y] = 1                    
                    $scope.setValidMove('reset')
                    socket.emit('move', {
                        user: '0',
                        a: a,
                        b: b,
                        x: x,
                        y: y
                    });
                    //$scope.winner(yValues00, '0');
                    $scope.winner(tempValue, '0');
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
