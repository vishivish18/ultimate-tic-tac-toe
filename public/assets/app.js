angular.module('app', [
    'ngRoute', 'ui.router'
])

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

angular.module('app')
    .controller('homeCtrl', function($scope, $location) {

        $scope.setup = function() {
            console.log("in chat");
            $scope.gameid = Math.round((Math.random() * 1000000));
        }

        $scope.setup();




    })

angular.module('app')
    .controller('masterCtrl', function($scope, $rootScope, $route) {

       if(localStorage.getItem('logged_user')){
        	$rootScope.currentUser = localStorage.getItem('logged_user')
        }
        $scope.$on('login', function(_, user) {
            console.log("Logged In");            
            $rootScope.currentUser = user.name
            localStorage.setItem('logged_user', $rootScope.currentUser)
        })
    })

angular.module('app')
    .controller('registerCtrl', function($scope, $http) {
        $scope.setup = function() {
            $scope.model = {};
        }
        $scope.setup();
        $scope.saveUser = function() {
            console.log("inside the func")
            $http.post('/api/users', {
                    name: $scope.model.name,
                    phone: $scope.model.phone,
                    email: $scope.model.email

                })
                .then(function(response) {
                    console.log(response)
                    $("#thanks").show().delay(5000).fadeOut()
                    $scope.setup();
                }, function(response) {
                    console.log(response)
                });

        }


        console.log("here in landing")
    })

angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
        .state('home', {
            url: '/',
            views: {                
                'content': {
                    templateUrl: '/home.html',
                    controller: 'homeCtrl'

                }
            }
        })

        .state('home.game', {
            url: 'game/:id',
            views: {
                'content@': {
                    templateUrl: '/game.html',
                    controller: 'gameCtrl'
                    
                }
            }

        })


        $locationProvider.html5Mode(true)


    });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImNvbnRyb2xsZXJzL2dhbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9tYXN0ZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvcmVnaXN0ZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICAgJ25nUm91dGUnLCAndWkucm91dGVyJ1xuXSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdnYW1lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRzdGF0ZVBhcmFtcywgJHJvb3RTY29wZSwgJGxvY2F0aW9uKSB7XG5cbiAgICAgICAgdmFyIHNvY2tldCA9IGlvKCk7XG4gICAgICAgIHZhciBpZCA9ICRzdGF0ZVBhcmFtcy5pZDtcbiAgICAgICAgJHNjb3BlLnN0YXR1cyA9IFwiV2FpdGluZyBmb3IgcGxheWVyc1wiXG4gICAgICAgICRzY29wZS5wbGF5ZXIgPSBcIlwiXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gb24gY29ubmVjdGlvbiB0byBzZXJ2ZXIgc2VuZCB0aGUgaWQgb2YgZ2FtZXMgdXJsXG4gICAgICAgICAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnbG9hZCcsIGlkKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIHNvY2tldC5vbignc2V0cGxheWVyJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzZXRwbGF5ZXIgZW1pdHRlZFwiLCBkYXRhKVxuICAgICAgICAgICAgICAgICRzY29wZS5wbGF5ZXIgPSBkYXRhLnBsYXllclxuICAgICAgICAgICAgfSlcblxuXG4gICAgICAgICAgICAvLyByZWNlaXZlIHRoZSBuYW1lcyBhbmQgYXZhdGFycyBvZiBhbGwgcGVvcGxlIGluIHRoZSBjaGF0IHJvb21cbiAgICAgICAgICAgIHNvY2tldC5vbigncGVvcGxlaW5jaGF0JywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGVvcGxlaW5jaGF0IHRyaWdnZXJlZCBmcm9tIGJhY2tlbmRcIilcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5udW1iZXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnN0YXR1cyA9IFwiV2FpdGluZyBmb3Igb3RoZXIgcGxheWVyXCJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcImRhdGEubnVtYmVyIGlzIDBcIilcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJQTGF5ZXJcIiwgXCJYXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBzZXJ2ZXItc2lkZSBmdW5jdGlvbiAnbG9naW4nIGFuZCBzZW5kIHVzZXIncyBwYXJhbWV0ZXJzICBcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogJHJvb3RTY29wZS5jdXJyZW50VXNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLm51bWJlciA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiZGF0YS5udW1iZXIgaXMgMVwiKVxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSBcIlBsYXllciBKb2luZWRcIlxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudHVybiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZXR1cCgpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jaGF0V2l0aCA9IGRhdGEudXNlcjtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkc2NvcGUuY2hhdFdpdGgpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5uYW1lID0gZGF0YS51c2VyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJzY29wZSBuYW1lIGlzXCIgKyAkc2NvcGUubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogJHJvb3RTY29wZS5jdXJyZW50VXNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGF0IGlzIGZ1bGxcIilcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG5cblxuXG4gICAgICAgICAgICAvLyBPdGhlciB1c2VmdWwgXG5cblxuICAgICAgICAgICAgc29ja2V0Lm9uKCdsZWF2ZScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuc3RhdHVzID0gXCJPcHBvbmVudCBEaXNjb25uZWN0ZWRcIlxuICAgICAgICAgICAgICAgICRzY29wZS4kZGlnZXN0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9vbGVhbiAmJiBpZCA9PSBkYXRhLnJvb20pIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxlZnRcIiwgZGF0YSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdyZWNlaXZlJywgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWNpZXZlZCBieSBtZVwiKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignd2lubmVyJywgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXaW5uZXIgRGVjbGFyZWRcIiArIGRhdGEudXNlcilcbiAgICAgICAgICAgICAgICBhbGVydChcIldpbm5lciBpcyBcIiArIGRhdGEudXNlcilcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuXG5cbiAgICAgICAgJHNjb3BlLnR1cm4gPSAtMVxuXG5cbiAgICAgICAgJHNjb3BlLlZhbHVlczAwID0gW1xuICAgICAgICAgICAgWycnLCAnJywgJyddLFxuICAgICAgICAgICAgWycnLCAnJywgJyddLFxuICAgICAgICAgICAgWycnLCAnJywgJyddXG4gICAgICAgIF1cblxuICAgICAgICAkc2NvcGUuVmFsdWVzMDEgPSBbXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ11cbiAgICAgICAgXVxuXG4gICAgICAgICRzY29wZS5WYWx1ZXMwMiA9IFtcbiAgICAgICAgICAgIFsnJywgJycsICcnXSxcbiAgICAgICAgICAgIFsnJywgJycsICcnXSxcbiAgICAgICAgICAgIFsnJywgJycsICcnXVxuICAgICAgICBdXG5cbiAgICAgICAgJHNjb3BlLlZhbHVlczEwID0gW1xuICAgICAgICAgICAgWycnLCAnJywgJyddLFxuICAgICAgICAgICAgWycnLCAnJywgJyddLFxuICAgICAgICAgICAgWycnLCAnJywgJyddXG4gICAgICAgIF1cblxuICAgICAgICAkc2NvcGUuVmFsdWVzMTEgPSBbXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ11cbiAgICAgICAgXVxuXG4gICAgICAgICRzY29wZS5WYWx1ZXMxMiA9IFtcbiAgICAgICAgICAgIFsnJywgJycsICcnXSxcbiAgICAgICAgICAgIFsnJywgJycsICcnXSxcbiAgICAgICAgICAgIFsnJywgJycsICcnXVxuICAgICAgICBdXG5cbiAgICAgICAgJHNjb3BlLlZhbHVlczIwID0gW1xuICAgICAgICAgICAgWycnLCAnJywgJyddLFxuICAgICAgICAgICAgWycnLCAnJywgJyddLFxuICAgICAgICAgICAgWycnLCAnJywgJyddXG4gICAgICAgIF1cblxuICAgICAgICAkc2NvcGUuVmFsdWVzMjEgPSBbXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ11cbiAgICAgICAgXVxuXG4gICAgICAgICRzY29wZS5WYWx1ZXMyMiA9IFtcbiAgICAgICAgICAgIFsnJywgJycsICcnXSxcbiAgICAgICAgICAgIFsnJywgJycsICcnXSxcbiAgICAgICAgICAgIFsnJywgJycsICcnXVxuICAgICAgICBdXG5cblxuICAgICAgICAkc2NvcGUubWVnYVZhbHVlcyA9IFtcbiAgICAgICAgICAgICAgICBbJHNjb3BlLlZhbHVlczAwLCAkc2NvcGUuVmFsdWVzMDEsICRzY29wZS5WYWx1ZXMwMl0sXG4gICAgICAgICAgICAgICAgWyRzY29wZS5WYWx1ZXMxMCwgJHNjb3BlLlZhbHVlczExLCAkc2NvcGUuVmFsdWVzMTJdLFxuICAgICAgICAgICAgICAgIFskc2NvcGUuVmFsdWVzMjAsICRzY29wZS5WYWx1ZXMyMSwgJHNjb3BlLlZhbHVlczIyXVxuICAgICAgICBdICAgICAgICBcblxuXG4gICAgICAgIHZhciB4VmFsdWVzMDAgPSBbXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF1cbiAgICAgICAgXSAgICAgICAgXG5cbiAgICAgICAgdmFyIHhWYWx1ZXMwMSA9IFtcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdICAgICAgICBcblxuICAgICAgICB2YXIgeFZhbHVlczAyID0gW1xuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdXG4gICAgICAgIF0gICAgICAgIFxuXG4gICAgICAgIHZhciB4VmFsdWVzMTAgPSBbXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF1cbiAgICAgICAgXSAgICAgICAgXG5cbiAgICAgICAgdmFyIHhWYWx1ZXMxMSA9IFtcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdICAgICAgICBcblxuICAgICAgICB2YXIgeFZhbHVlczEyID0gW1xuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdXG4gICAgICAgIF0gICAgICAgIFxuICAgICAgICB2YXIgeFZhbHVlczIwID0gW1xuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdXG4gICAgICAgIF0gICAgICAgIFxuICAgICAgICB2YXIgeFZhbHVlczIxID0gW1xuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdXG4gICAgICAgIF0gICAgICAgIFxuICAgICAgICB2YXIgeFZhbHVlczIyID0gW1xuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdXG4gICAgICAgIF0gICAgICAgIFxuXG5cblxuICAgICAgICB2YXIgeVZhbHVlczAwID0gW1xuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdXG4gICAgICAgIF0gICAgICAgIFxuXG4gICAgICAgIHZhciB5VmFsdWVzMDEgPSBbXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF1cbiAgICAgICAgXSAgICAgICAgXG5cbiAgICAgICAgdmFyIHlWYWx1ZXMwMiA9IFtcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdICAgICAgICBcblxuICAgICAgICB2YXIgeVZhbHVlczEwID0gW1xuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdXG4gICAgICAgIF0gICAgICAgIFxuXG4gICAgICAgIHZhciB5VmFsdWVzMTEgPSBbXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF1cbiAgICAgICAgXSAgICAgICAgXG5cbiAgICAgICAgdmFyIHlWYWx1ZXMxMiA9IFtcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdICAgICAgICBcbiAgICAgICAgdmFyIHlWYWx1ZXMyMCA9IFtcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdICAgICAgICBcbiAgICAgICAgdmFyIHlWYWx1ZXMyMSA9IFtcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdICAgICAgICBcbiAgICAgICAgdmFyIHlWYWx1ZXMyMiA9IFtcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdICAgICAgICBcblxuXG5cbiAgICAgICAgdmFyIG1lZ2FYdmFsdWVzID0gW1xuICAgICAgICAgICAgICAgIFt4VmFsdWVzMDAsIHhWYWx1ZXMwMSwgeFZhbHVlczAyXSxcbiAgICAgICAgICAgICAgICBbeFZhbHVlczEwLCB4VmFsdWVzMTEsIHhWYWx1ZXMxMl0sXG4gICAgICAgICAgICAgICAgW3hWYWx1ZXMyMCwgeFZhbHVlczIxLCB4VmFsdWVzMjJdXG4gICAgICAgICAgICBdICAgICAgICBcblxuICAgICAgIHZhciBtZWdhWXZhbHVlcyA9IFtcbiAgICAgICAgICAgICAgICBbeVZhbHVlczAwLCB5VmFsdWVzMDEsIHlWYWx1ZXMwMl0sXG4gICAgICAgICAgICAgICAgW3lWYWx1ZXMxMCwgeVZhbHVlczExLCB5VmFsdWVzMTJdLFxuICAgICAgICAgICAgICAgIFt5VmFsdWVzMjAsIHlWYWx1ZXMyMSwgeVZhbHVlczIyXVxuICAgICAgICAgICAgXSAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvLy9jb25zb2xlLmxvZyh0ZXN0WzBdWzBdKSAgIFxuICAgICAgICAvL2NvbnNvbGUubG9nKG1lZ2FYdmFsdWVzWzBdWzBdKTsgICAgICAgIFxuICAgICAgICAkc2NvcGUud2lubmVyID0gZnVuY3Rpb24oYXJyLCBjYW5kaWRhdGUpIHtcblxuICAgICAgICAgICAgLy9IZXJlIEkgYW0gYmFzaWNhbGx5IGRvaW5nIHRoZSBzYW1lIHRoaW5nIGFnYWluIGFuZCBpdCBjYW4gYmUgZG9uZSBtb3JlIGVsZWdhbnRseSB1c2luZyByZWN1cnNpb25cbiAgICAgICAgICAgIC8vV2lsbCBtYWtlIGl0IG1vcmUgY29uY2lzZSBhbmQgb3B0aW1pemVkIGxhdGVyLiBcbiAgICAgICAgICAgIC8vTm93IGxvb2tpbmcgYXQgdGhlIGNvZGUgaXQgbG9va3MgbGlrZSBhIGlmLWVsc2UgaGVsbCwgc29tZXRoaW5nIGlubm92YXRpdmUgYXdhaXRzICEgXG5cbiAgICAgICAgICAgIHZhciBzdW0gPSAwXG4gICAgICAgICAgICAgICAgLy9jaGVjayBmaXJzdCByb3dcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyWzBdW2pdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIldpbm5lciBpcyBcIiArIGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnd2lubmVyJywge1xuICAgICAgICAgICAgICAgICAgICB1c2VyOiBjYW5kaWRhdGVcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2NoZWNrIHNlY29uZCByb3dcbiAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyWzFdW2pdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICBhbGVydChcIldpbm5lciBpcyBcIiArIGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ3dpbm5lcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IGNhbmRpZGF0ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHRoaXJkIHJvd1xuICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbMl1bal1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ3dpbm5lcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiBjYW5kaWRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBmaXJzdCBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyW2ldWzBdXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIldpbm5lciBpcyBcIiArIGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnd2lubmVyJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiBjYW5kaWRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayBzZWNvbmQgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IHN1bSArIGFycltpXVsxXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBjYW5kaWRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd3aW5uZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiBjYW5kaWRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9jaGVjayB0aGlyZCBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyW2ldWzJdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1bSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIldpbm5lciBpcyBcIiArIGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd3aW5uZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogY2FuZGlkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vbm93IGNoZWNrIHRoZSBsZWZ0IGRpYWdvbmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IGopIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IHN1bSArIGFycltpXVtqXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIldpbm5lciBpcyBcIiArIGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnd2lubmVyJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiBjYW5kaWRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ub3cgY2hlY2sgdGhlIHJpZ2h0IGRpYWdvbmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSArIGogPT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IHN1bSArIGFycltpXVtqXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1bSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnd2lubmVyJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogY2FuZGlkYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBzb2NrZXQub24oJ3NlbmRNb3ZlJywgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlJlY2lldmVkIGJ5IG1lIGluIHRlc3RcIilcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgJHNjb3BlLmlkID0gU3RyaW5nKGRhdGEueCkgKyBTdHJpbmcoZGF0YS55KVxuICAgICAgICAgICAgJHNjb3BlLnNldFZhbGlkTW92ZSgkc2NvcGUuaWQpO1xuXG4gICAgICAgICAgICBpZiAoZGF0YS51c2VyID09IFwiWFwiKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBEaXNwbGF5ID0gJHNjb3BlLm1lZ2FWYWx1ZXNbZGF0YS5hXVtkYXRhLmJdO1xuICAgICAgICAgICAgICAgIHRlbXBEaXNwbGF5W2RhdGEueF1bZGF0YS55XSA9ICdYJyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5WYWx1ZXNbZGF0YS54XVtkYXRhLnldID0gJ1gnICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciB0ZW1wVmFsdWUgPSBtZWdhWHZhbHVlc1tkYXRhLmFdW2RhdGEuYl07XG4gICAgICAgICAgICAgICAgdGVtcFZhbHVlW2RhdGEueF1bZGF0YS55XSA9IDFcbiAgICAgICAgICAgICAgICAvL3hWYWx1ZXNbZGF0YS54XVtkYXRhLnldID0gMTsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJHNjb3BlLnR1cm4gPSAhJHNjb3BlLnR1cm47XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHRlbXBEaXNwbGF5ID0gJHNjb3BlLm1lZ2FWYWx1ZXNbZGF0YS5hXVtkYXRhLmJdO1xuICAgICAgICAgICAgICAgIHRlbXBEaXNwbGF5W2RhdGEueF1bZGF0YS55XSA9ICcwJyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyRzY29wZS5WYWx1ZXNbZGF0YS54XVtkYXRhLnldID0gJzAnXG4gICAgICAgICAgICAgICAgdmFyIHRlbXBWYWx1ZSA9IG1lZ2FZdmFsdWVzW2RhdGEuYV1bZGF0YS5iXTtcbiAgICAgICAgICAgICAgICB0ZW1wVmFsdWVbZGF0YS54XVtkYXRhLnldID0gMVxuICAgICAgICAgICAgICAgIC8veVZhbHVlc1tkYXRhLnhdW2RhdGEueV0gPSAxOyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAkc2NvcGUudHVybiA9ICEkc2NvcGUudHVybjtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkc2NvcGUuc2V0VmFsaWRNb3ZlID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoaWQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICcwMCc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0VG9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICcwMSc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5taWRkbGVUb3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJzAyJzpcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJpZ2h0VG9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICcxMCc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0TWlkZGxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICcxMSc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5taWRkbGVNaWRkbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJzEyJzpcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJpZ2h0TWlkZGxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICcyMCc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0Qm90dG9tID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICcyMSc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5taWRkbGVCb3R0b20gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJzIyJzpcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJpZ2h0Qm90dG9tID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyZXNldCc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0VG9wID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWlkZGxlVG9wID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmlnaHRUb3AgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0TWlkZGxlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWlkZGxlTWlkZGxlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmlnaHRNaWRkbGUgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0Qm90dG9tID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWlkZGxlQm90dG9tID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmlnaHRCb3R0b20gPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgJHNjb3BlLnBsYXkgPSBmdW5jdGlvbihhLCBiLCB4LCB5KSB7XG4gICAgICAgICAgICB2YXIgdGVtcERpc3BsYXkgPSAkc2NvcGUubWVnYVZhbHVlc1thXVtiXTsgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vaWYgKCRzY29wZS5WYWx1ZXNbeF1beV0gPT0gJycpIHsgICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICh0ZW1wRGlzcGxheVt4XVt5XSA9PSAnJykge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUudHVybiA9PSB0cnVlICYmICRzY29wZS5wbGF5ZXIgPT0gJ1gnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vJHNjb3BlLlZhbHVlc1t4XVt5XSA9ICdYJyAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRlbXBEaXNwbGF5W3hdW3ldID0gJ1gnICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvL3hWYWx1ZXNbeF1beV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcFZhbHVlID0gbWVnYVh2YWx1ZXNbYV1bYl07XG4gICAgICAgICAgICAgICAgICAgIHRlbXBWYWx1ZVt4XVt5XSA9IDEgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2V0VmFsaWRNb3ZlKCdyZXNldCcpXG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogJ1gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYTogYSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGI6IGIsXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyRzY29wZS53aW5uZXIoeFZhbHVlczAwLCAnWCcpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUud2lubmVyKHRlbXBWYWx1ZSwgJ1gnKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnR1cm4gPSAhJHNjb3BlLnR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUudHVybiA9PSBmYWxzZSAmJiAkc2NvcGUucGxheWVyID09ICcwJykge1xuICAgICAgICAgICAgICAgICAgICAvLyRzY29wZS5WYWx1ZXNbeF1beV0gPSAnMCdcbiAgICAgICAgICAgICAgICAgICAgdGVtcERpc3BsYXlbeF1beV0gPSAnMCcgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8veVZhbHVlc1t4XVt5XSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wVmFsdWUgPSBtZWdhWXZhbHVlc1thXVtiXTtcbiAgICAgICAgICAgICAgICAgICAgdGVtcFZhbHVlW3hdW3ldID0gMSAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZXRWYWxpZE1vdmUoJ3Jlc2V0JylcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ21vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhOiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogYixcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyRzY29wZS53aW5uZXIoeVZhbHVlczAwLCAnMCcpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUud2lubmVyKHRlbXBWYWx1ZSwgJzAnKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnR1cm4gPSAhJHNjb3BlLnR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgZW5vdWdoIHBsYXllcnNcIilcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJQbGF5ZXIgaXNcIiArICRzY29wZS5wbGF5ZXIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidHVybiBvZlwiICsgJHNjb3BlLnR1cm4pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRha2VuXCIpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuXG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ2hvbWVDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkbG9jYXRpb24pIHtcblxuICAgICAgICAkc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW4gY2hhdFwiKTtcbiAgICAgICAgICAgICRzY29wZS5nYW1laWQgPSBNYXRoLnJvdW5kKChNYXRoLnJhbmRvbSgpICogMTAwMDAwMCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG5cblxuXG5cbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ21hc3RlckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRyb290U2NvcGUsICRyb3V0ZSkge1xuXG4gICAgICAgaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJykpe1xuICAgICAgICBcdCRyb290U2NvcGUuY3VycmVudFVzZXIgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9nZ2VkX3VzZXInKVxuICAgICAgICB9XG4gICAgICAgICRzY29wZS4kb24oJ2xvZ2luJywgZnVuY3Rpb24oXywgdXNlcikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJMb2dnZWQgSW5cIik7ICAgICAgICAgICAgXG4gICAgICAgICAgICAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gdXNlci5uYW1lXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnbG9nZ2VkX3VzZXInLCAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyKVxuICAgICAgICB9KVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcigncmVnaXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkaHR0cCkge1xuICAgICAgICAkc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICRzY29wZS5tb2RlbCA9IHt9O1xuICAgICAgICB9XG4gICAgICAgICRzY29wZS5zZXR1cCgpO1xuICAgICAgICAkc2NvcGUuc2F2ZVVzZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiaW5zaWRlIHRoZSBmdW5jXCIpXG4gICAgICAgICAgICAkaHR0cC5wb3N0KCcvYXBpL3VzZXJzJywge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiAkc2NvcGUubW9kZWwubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6ICRzY29wZS5tb2RlbC5waG9uZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6ICRzY29wZS5tb2RlbC5lbWFpbFxuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICAgICAgJChcIiN0aGFua3NcIikuc2hvdygpLmRlbGF5KDUwMDApLmZhZGVPdXQoKVxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2V0dXAoKTtcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICB9XG5cblxuICAgICAgICBjb25zb2xlLmxvZyhcImhlcmUgaW4gbGFuZGluZ1wiKVxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29uZmlnKGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyKSB7XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgIC5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgdmlld3M6IHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2hvbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdob21lQ3RybCdcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICAuc3RhdGUoJ2hvbWUuZ2FtZScsIHtcbiAgICAgICAgICAgIHVybDogJ2dhbWUvOmlkJyxcbiAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgJ2NvbnRlbnRAJzoge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9nYW1lLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnZ2FtZUN0cmwnXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICB9KVxuXG5cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHRydWUpXG5cblxuICAgIH0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
