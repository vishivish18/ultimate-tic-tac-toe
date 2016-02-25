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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImNvbnRyb2xsZXJzL2dhbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9tYXN0ZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvcmVnaXN0ZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICAgJ25nUm91dGUnLCAndWkucm91dGVyJ1xuXSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdnYW1lQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHAsICRzdGF0ZVBhcmFtcywgJHJvb3RTY29wZSwgJGxvY2F0aW9uKSB7XG5cbiAgICAgICAgdmFyIHNvY2tldCA9IGlvKCk7XG4gICAgICAgIHZhciBpZCA9ICRzdGF0ZVBhcmFtcy5pZDtcbiAgICAgICAgJHNjb3BlLnN0YXR1cyA9IFwiV2FpdGluZyBmb3IgcGxheWVyc1wiXG4gICAgICAgICRzY29wZS5wbGF5ZXIgPSBcIlwiXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gb24gY29ubmVjdGlvbiB0byBzZXJ2ZXIgc2VuZCB0aGUgaWQgb2YgZ2FtZXMgdXJsXG4gICAgICAgICAgICBzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnbG9hZCcsIGlkKTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIHNvY2tldC5vbignc2V0cGxheWVyJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2V0cGxheWVyIGVtaXR0ZWRcIiwgZGF0YSlcbiAgICAgICAgICAgICAgICAkc2NvcGUucGxheWVyID0gZGF0YS5wbGF5ZXJcbiAgICAgICAgICAgIH0pXG5cblxuICAgICAgICAgICAgLy8gcmVjZWl2ZSB0aGUgbmFtZXMgYW5kIGF2YXRhcnMgb2YgYWxsIHBlb3BsZSBpbiB0aGUgY2hhdCByb29tXG4gICAgICAgICAgICBzb2NrZXQub24oJ3Blb3BsZWluY2hhdCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInBlb3BsZWluY2hhdCB0cmlnZ2VyZWQgZnJvbSBiYWNrZW5kXCIpXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubnVtYmVyID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhLm51bWJlciBpcyAwXCIpXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwiUExheWVyXCIsIFwiWFwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgc2VydmVyLXNpZGUgZnVuY3Rpb24gJ2xvZ2luJyBhbmQgc2VuZCB1c2VyJ3MgcGFyYW1ldGVycyAgXG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdsb2dpbicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6ICRyb290U2NvcGUuY3VycmVudFVzZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogaWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5udW1iZXIgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhLm51bWJlciBpcyAxXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSBcIlBsYXllciBKb2luZWRcIlxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudHVybiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZXR1cCgpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5jaGF0V2l0aCA9IGRhdGEudXNlcjtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmNoYXRXaXRoKVxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUubmFtZSA9IGRhdGEudXNlclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNjb3BlIG5hbWUgaXNcIiArICRzY29wZS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnbG9naW4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiAkcm9vdFNjb3BlLmN1cnJlbnRVc2VyLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNoYXQgaXMgZnVsbFwiKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfSk7XG5cblxuXG5cbiAgICAgICAgICAgIC8vIE90aGVyIHVzZWZ1bCBcblxuXG4gICAgICAgICAgICBzb2NrZXQub24oJ2xlYXZlJywgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9vbGVhbiAmJiBpZCA9PSBkYXRhLnJvb20pIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxlZnRcIiwgZGF0YSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc29ja2V0Lm9uKCdyZWNlaXZlJywgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJSZWNpZXZlZCBieSBtZVwiKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNvY2tldC5vbignd2lubmVyJywgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJXaW5uZXIgRGVjbGFyZWRcIitkYXRhLnVzZXIpXG4gICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIrIGRhdGEudXNlcikgICAgICAgICAgICAgICAgXG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG4gICAgICAgICRzY29wZS50dXJuID0gLTFcblxuXG4gICAgICAgICRzY29wZS5WYWx1ZXMgPSBbXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ10sXG4gICAgICAgICAgICBbJycsICcnLCAnJ11cbiAgICAgICAgXVxuXG5cbiAgICAgICAgdmFyIHhWYWx1ZXMgPSBbXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF1cbiAgICAgICAgXVxuXG4gICAgICAgIHZhciB5VmFsdWVzID0gW1xuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdLFxuICAgICAgICAgICAgWzAsIDAsIDBdXG4gICAgICAgIF1cblxuXG4gICAgICAgICRzY29wZS53aW5uZXIgPSBmdW5jdGlvbihhcnIsIGNhbmRpZGF0ZSkge1xuXG4gICAgICAgICAgICAvL0hlcmUgSSBhbSBiYXNpY2FsbHkgZG9pbmcgdGhlIHNhbWUgdGhpbmcgYWdhaW4gYW5kIGl0IGNhbiBiZSBkb25lIG1vcmUgZWxlZ2FudGx5IHVzaW5nIHJlY3Vyc2lvblxuICAgICAgICAgICAgLy9XaWxsIG1ha2UgaXQgbW9yZSBjb25jaXNlIGFuZCBvcHRpbWl6ZWQgbGF0ZXIuIFxuICAgICAgICAgICAgLy9Ob3cgbG9va2luZyBhdCB0aGUgY29kZSBpdCBsb29rcyBsaWtlIGEgaWYtZWxzZSBoZWxsLCBzb21ldGhpbmcgaW5ub3ZhdGl2ZSBhd2FpdHMgISBcblxuICAgICAgICAgICAgdmFyIHN1bSA9IDBcbiAgICAgICAgICAgICAgICAvL2NoZWNrIGZpcnN0IHJvd1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbMF1bal1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd3aW5uZXInLCB7XG4gICAgICAgICAgICAgICAgICAgIHVzZXI6IGNhbmRpZGF0ZVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vY2hlY2sgc2Vjb25kIHJvd1xuICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbMV1bal1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN1bSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnd2lubmVyJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogY2FuZGlkYXRlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgdGhpcmQgcm93XG4gICAgICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IHN1bSArIGFyclsyXVtqXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBjYW5kaWRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICBzb2NrZXQuZW1pdCgnd2lubmVyJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IGNhbmRpZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGZpcnN0IGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbaV1bMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd3aW5uZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IGNhbmRpZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHNlY29uZCBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyW2ldWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIldpbm5lciBpcyBcIiArIGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ3dpbm5lcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IGNhbmRpZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHRoaXJkIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbaV1bMl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ3dpbm5lcicsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiBjYW5kaWRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ub3cgY2hlY2sgdGhlIGxlZnQgZGlhZ29uYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyW2ldW2pdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd3aW5uZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6IGNhbmRpZGF0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25vdyBjaGVjayB0aGUgcmlnaHQgZGlhZ29uYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICsgaiA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyW2ldW2pdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBjYW5kaWRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd3aW5uZXInLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiBjYW5kaWRhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIHNvY2tldC5vbigncnRlc3QnLCBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiUmVjaWV2ZWQgYnkgbWUgaW4gdGVzdFwiKVxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgICAgICBpZiAoZGF0YS51c2VyID09IFwiWFwiKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLlZhbHVlc1tkYXRhLnhdW2RhdGEueV0gPSAnWCdcbiAgICAgICAgICAgICAgICB4VmFsdWVzW2RhdGEueF1bZGF0YS55XSA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudHVybiA9ICEkc2NvcGUudHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLlZhbHVlc1tkYXRhLnhdW2RhdGEueV0gPSAnMCdcbiAgICAgICAgICAgICAgICB5VmFsdWVzW2RhdGEueF1bZGF0YS55XSA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLiRkaWdlc3QoKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUudHVybiA9ICEkc2NvcGUudHVybjtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH0pO1xuXG4gICAgICAgICRzY29wZS5wbGF5ID0gZnVuY3Rpb24oeCwgeSkge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImdhbWUgb25cIilcbiAgICAgICAgICAgIGlmICgkc2NvcGUuVmFsdWVzW3hdW3ldID09ICcnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCRzY29wZS50dXJuID09IHRydWUgJiYgJHNjb3BlLnBsYXllciA9PSAnWCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLlZhbHVlc1t4XVt5XSA9ICdYJ1xuICAgICAgICAgICAgICAgICAgICB4VmFsdWVzW3hdW3ldID0gMTtcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ21vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiAnWCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUud2lubmVyKHhWYWx1ZXMsICdYJyk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS50dXJuID0gISRzY29wZS50dXJuO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoJHNjb3BlLnR1cm4gPT0gZmFsc2UgJiYgJHNjb3BlLnBsYXllciA9PSAnMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLlZhbHVlc1t4XVt5XSA9ICcwJ1xuICAgICAgICAgICAgICAgICAgICB5VmFsdWVzW3hdW3ldID0gMTtcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ21vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLndpbm5lcih5VmFsdWVzLCAnMCcpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudHVybiA9ICEkc2NvcGUudHVybjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vdCBlbm91Z2ggcGxheWVyc1wiKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIlBsYXllciBpc1wiICsgJHNjb3BlLnBsYXllcilcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0dXJuIG9mXCIgKyAkc2NvcGUudHVybilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFrZW5cIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignaG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbikge1xuXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbiBjaGF0XCIpO1xuICAgICAgICAgICAgJHNjb3BlLmdhbWVpZCA9IE1hdGgucm91bmQoKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbWFzdGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHJvdXRlKSB7XG5cbiAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9nZ2VkX3VzZXInKSl7XG4gICAgICAgIFx0JHJvb3RTY29wZS5jdXJyZW50VXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZWRfdXNlcicpXG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLiRvbignbG9naW4nLCBmdW5jdGlvbihfLCB1c2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dlZCBJblwiKTsgICAgICAgICAgICBcbiAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFVzZXIgPSB1c2VyLm5hbWVcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dnZWRfdXNlcicsICRyb290U2NvcGUuY3VycmVudFVzZXIpXG4gICAgICAgIH0pXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdyZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLm1vZGVsID0ge307XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG4gICAgICAgICRzY29wZS5zYXZlVXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnNpZGUgdGhlIGZ1bmNcIilcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvdXNlcnMnLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5tb2RlbC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogJHNjb3BlLm1vZGVsLnBob25lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLm1vZGVsLmVtYWlsXG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICAkKFwiI3RoYW5rc1wiKS5zaG93KCkuZGVsYXkoNTAwMCkuZmFkZU91dCgpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZXR1cCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGVyZSBpbiBsYW5kaW5nXCIpXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICB2aWV3czogeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAnY29udGVudCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJ1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnaG9tZS5nYW1lJywge1xuICAgICAgICAgICAgdXJsOiAnZ2FtZS86aWQnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2dhbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdnYW1lQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cblxuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSlcblxuXG4gICAgfSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
