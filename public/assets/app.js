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

                console.log("Winner Declared" + data.user)
                alert("Winner is " + data.user)

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


        socket.on('sendMove', function(data) {

            console.log("Recieved by me in test")
            console.log(data);
            $scope.id = String(data.x) + String(data.y)
            $scope.setValidMove($scope.id);

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
            if ($scope.Values[x][y] == '') {
                if ($scope.turn == true && $scope.player == 'X') {
                    $scope.Values[x][y] = 'X'
                    xValues[x][y] = 1;
                    $scope.setValidMove('reset')
                    socket.emit('move', {
                        user: 'X',
                        a: a,
                        b: b,
                        x: x,
                        y: y
                    });

                    $scope.winner(xValues, 'X');
                    $scope.turn = !$scope.turn;
                } else if ($scope.turn == false && $scope.player == '0') {
                    $scope.Values[x][y] = '0'
                    yValues[x][y] = 1;
                    $scope.setValidMove('reset')
                    socket.emit('move', {
                        user: '0',
                        a: a,
                        b: b,
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImNvbnRyb2xsZXJzL2dhbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9tYXN0ZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvcmVnaXN0ZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAgICduZ1JvdXRlJywgJ3VpLnJvdXRlcidcbl0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignZ2FtZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGVQYXJhbXMsICRyb290U2NvcGUsICRsb2NhdGlvbikge1xuXG4gICAgICAgIHZhciBzb2NrZXQgPSBpbygpO1xuICAgICAgICB2YXIgaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XG4gICAgICAgICRzY29wZS5zdGF0dXMgPSBcIldhaXRpbmcgZm9yIHBsYXllcnNcIlxuICAgICAgICAkc2NvcGUucGxheWVyID0gXCJcIlxuICAgICAgICAkc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIG9uIGNvbm5lY3Rpb24gdG8gc2VydmVyIHNlbmQgdGhlIGlkIG9mIGdhbWVzIHVybFxuICAgICAgICAgICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2xvYWQnLCBpZCk7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBzb2NrZXQub24oJ3NldHBsYXllcicsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNldHBsYXllciBlbWl0dGVkXCIsIGRhdGEpXG4gICAgICAgICAgICAgICAgJHNjb3BlLnBsYXllciA9IGRhdGEucGxheWVyXG4gICAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICAgIC8vIHJlY2VpdmUgdGhlIG5hbWVzIGFuZCBhdmF0YXJzIG9mIGFsbCBwZW9wbGUgaW4gdGhlIGNoYXQgcm9vbVxuICAgICAgICAgICAgc29ja2V0Lm9uKCdwZW9wbGVpbmNoYXQnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJwZW9wbGVpbmNoYXQgdHJpZ2dlcmVkIGZyb20gYmFja2VuZFwiKVxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm51bWJlciA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YS5udW1iZXIgaXMgMFwiKVxuICAgICAgICAgICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcIlBMYXllclwiLCBcIlhcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNhbGwgdGhlIHNlcnZlci1zaWRlIGZ1bmN0aW9uICdsb2dpbicgYW5kIHNlbmQgdXNlcidzIHBhcmFtZXRlcnMgIFxuICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnbG9naW4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRhdGEubnVtYmVyID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZGF0YS5udW1iZXIgaXMgMVwiKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKVxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc3RhdHVzID0gXCJQbGF5ZXIgSm9pbmVkXCJcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnR1cm4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2V0dXAoKVxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuY2hhdFdpdGggPSBkYXRhLnVzZXI7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5jaGF0V2l0aClcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLm5hbWUgPSBkYXRhLnVzZXJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzY29wZSBuYW1lIGlzXCIgKyAkc2NvcGUubmFtZSlcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogJHJvb3RTY29wZS5jdXJyZW50VXNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDaGF0IGlzIGZ1bGxcIilcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG5cblxuXG4gICAgICAgICAgICAvLyBPdGhlciB1c2VmdWwgXG5cblxuICAgICAgICAgICAgc29ja2V0Lm9uKCdsZWF2ZScsIGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmJvb2xlYW4gJiYgaWQgPT0gZGF0YS5yb29tKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsZWZ0XCIsIGRhdGEpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbigncmVjZWl2ZScsIGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVjaWV2ZWQgYnkgbWVcIilcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzb2NrZXQub24oJ3dpbm5lcicsIGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiV2lubmVyIERlY2xhcmVkXCIgKyBkYXRhLnVzZXIpXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBkYXRhLnVzZXIpXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG4gICAgICAgICRzY29wZS50dXJuID0gLTFcblxuXG4gICAgICAgICRzY29wZS5WYWx1ZXMgPSBbXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ11cbiAgICAgICAgXVxuXG5cbiAgICAgICAgdmFyIHhWYWx1ZXMgPSBbXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF1cbiAgICAgICAgXVxuXG4gICAgICAgIHZhciB5VmFsdWVzID0gW1xuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdXG4gICAgICAgIF1cblxuXG4gICAgICAgICRzY29wZS53aW5uZXIgPSBmdW5jdGlvbihhcnIsIGNhbmRpZGF0ZSkge1xuXG4gICAgICAgICAgICAvL0hlcmUgSSBhbSBiYXNpY2FsbHkgZG9pbmcgdGhlIHNhbWUgdGhpbmcgYWdhaW4gYW5kIGl0IGNhbiBiZSBkb25lIG1vcmUgZWxlZ2FudGx5IHVzaW5nIHJlY3Vyc2lvblxuICAgICAgICAgICAgLy9XaWxsIG1ha2UgaXQgbW9yZSBjb25jaXNlIGFuZCBvcHRpbWl6ZWQgbGF0ZXIuIFxuICAgICAgICAgICAgLy9Ob3cgbG9va2luZyBhdCB0aGUgY29kZSBpdCBsb29rcyBsaWtlIGEgaWYtZWxzZSBoZWxsLCBzb21ldGhpbmcgaW5ub3ZhdGl2ZSBhd2FpdHMgISBcblxuICAgICAgICAgICAgdmFyIHN1bSA9IDBcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGZpcnN0IHJvd1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbMF1bal1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd3aW5uZXInLCB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGNhbmRpZGF0ZVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vY2hlY2sgc2Vjb25kIHJvd1xuICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbMV1bal1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN1bSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnd2lubmVyJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogY2FuZGlkYXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgdGhpcmQgcm93XG4gICAgICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IHN1bSArIGFyclsyXVtqXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBjYW5kaWRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnd2lubmVyJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IGNhbmRpZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGZpcnN0IGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbaV1bMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd3aW5uZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IGNhbmRpZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHNlY29uZCBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyW2ldWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIldpbm5lciBpcyBcIiArIGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ3dpbm5lcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IGNhbmRpZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHRoaXJkIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbaV1bMl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ3dpbm5lcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiBjYW5kaWRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ub3cgY2hlY2sgdGhlIGxlZnQgZGlhZ29uYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyW2ldW2pdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd3aW5uZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IGNhbmRpZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25vdyBjaGVjayB0aGUgcmlnaHQgZGlhZ29uYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICsgaiA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyW2ldW2pdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBjYW5kaWRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd3aW5uZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiBjYW5kaWRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHNvY2tldC5vbignc2VuZE1vdmUnLCBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVjaWV2ZWQgYnkgbWUgaW4gdGVzdFwiKVxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICAkc2NvcGUuaWQgPSBTdHJpbmcoZGF0YS54KSArIFN0cmluZyhkYXRhLnkpXG4gICAgICAgICAgICAkc2NvcGUuc2V0VmFsaWRNb3ZlKCRzY29wZS5pZCk7XG5cbiAgICAgICAgICAgIGlmIChkYXRhLnVzZXIgPT0gXCJYXCIpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuVmFsdWVzW2RhdGEueF1bZGF0YS55XSA9ICdYJ1xuICAgICAgICAgICAgICAgIHhWYWx1ZXNbZGF0YS54XVtkYXRhLnldID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgICAgICRzY29wZS50dXJuID0gISRzY29wZS50dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuVmFsdWVzW2RhdGEueF1bZGF0YS55XSA9ICcwJ1xuICAgICAgICAgICAgICAgIHlWYWx1ZXNbZGF0YS54XVtkYXRhLnldID0gMTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuJGRpZ2VzdCgpO1xuICAgICAgICAgICAgICAgICRzY29wZS50dXJuID0gISRzY29wZS50dXJuO1xuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfSk7XG5cblxuICAgICAgICAkc2NvcGUuc2V0VmFsaWRNb3ZlID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoaWQpIHtcbiAgICAgICAgICAgICAgICBjYXNlICcwMCc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0VG9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICcwMSc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5taWRkbGVUb3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJzAyJzpcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJpZ2h0VG9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICcxMCc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0TWlkZGxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICcxMSc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5taWRkbGVNaWRkbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJzEyJzpcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJpZ2h0TWlkZGxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICcyMCc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0Qm90dG9tID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICcyMSc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5taWRkbGVCb3R0b20gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJzIyJzpcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJpZ2h0Qm90dG9tID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyZXNldCc6XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0VG9wID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWlkZGxlVG9wID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmlnaHRUb3AgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0TWlkZGxlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWlkZGxlTWlkZGxlID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmlnaHRNaWRkbGUgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICRzY29wZS5sZWZ0Qm90dG9tID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUubWlkZGxlQm90dG9tID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmlnaHRCb3R0b20gPSBmYWxzZVxuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcblxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG5cbiAgICAgICAgJHNjb3BlLnBsYXkgPSBmdW5jdGlvbihhLCBiLCB4LCB5KSB7XG4gICAgICAgICAgICBpZiAoJHNjb3BlLlZhbHVlc1t4XVt5XSA9PSAnJykge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUudHVybiA9PSB0cnVlICYmICRzY29wZS5wbGF5ZXIgPT0gJ1gnKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5WYWx1ZXNbeF1beV0gPSAnWCdcbiAgICAgICAgICAgICAgICAgICAgeFZhbHVlc1t4XVt5XSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZXRWYWxpZE1vdmUoJ3Jlc2V0JylcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ21vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiAnWCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBhOiBhLFxuICAgICAgICAgICAgICAgICAgICAgICAgYjogYixcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS53aW5uZXIoeFZhbHVlcywgJ1gnKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnR1cm4gPSAhJHNjb3BlLnR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgkc2NvcGUudHVybiA9PSBmYWxzZSAmJiAkc2NvcGUucGxheWVyID09ICcwJykge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuVmFsdWVzW3hdW3ldID0gJzAnXG4gICAgICAgICAgICAgICAgICAgIHlWYWx1ZXNbeF1beV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuc2V0VmFsaWRNb3ZlKCdyZXNldCcpXG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogJzAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgYTogYSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGI6IGIsXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLndpbm5lcih5VmFsdWVzLCAnMCcpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudHVybiA9ICEkc2NvcGUudHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBlbm91Z2ggcGxheWVyc1wiKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllciBpc1wiICsgJHNjb3BlLnBsYXllcilcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0dXJuIG9mXCIgKyAkc2NvcGUudHVybilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFrZW5cIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignaG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbikge1xuXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbiBjaGF0XCIpO1xuICAgICAgICAgICAgJHNjb3BlLmdhbWVpZCA9IE1hdGgucm91bmQoKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbWFzdGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHJvdXRlKSB7XG5cbiAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9nZ2VkX3VzZXInKSl7XG4gICAgICAgIFx0JHJvb3RTY29wZS5jdXJyZW50VXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZWRfdXNlcicpXG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLiRvbignbG9naW4nLCBmdW5jdGlvbihfLCB1c2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dlZCBJblwiKTsgICAgICAgICAgICBcbiAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFVzZXIgPSB1c2VyLm5hbWVcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dnZWRfdXNlcicsICRyb290U2NvcGUuY3VycmVudFVzZXIpXG4gICAgICAgIH0pXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdyZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLm1vZGVsID0ge307XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG4gICAgICAgICRzY29wZS5zYXZlVXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnNpZGUgdGhlIGZ1bmNcIilcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvdXNlcnMnLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5tb2RlbC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogJHNjb3BlLm1vZGVsLnBob25lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLm1vZGVsLmVtYWlsXG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICAkKFwiI3RoYW5rc1wiKS5zaG93KCkuZGVsYXkoNTAwMCkuZmFkZU91dCgpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZXR1cCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGVyZSBpbiBsYW5kaW5nXCIpXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICB2aWV3czogeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAnY29udGVudCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJ1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnaG9tZS5nYW1lJywge1xuICAgICAgICAgICAgdXJsOiAnZ2FtZS86aWQnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2dhbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdnYW1lQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cblxuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSlcblxuXG4gICAgfSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
