angular.module('app', [
    'ngRoute', 'ui.router'
])

angular.module('app')
    .controller('gameCtrl', function($scope, $http, $stateParams, $rootScope, $location) {

        var socket = io();
        var id = $stateParams.id;
        $scope.status = "Waiting for players"
        $scope.setup = function() {
            // on connection to server send the id of games url
            socket.on('connect', function() {
                socket.emit('load', id);
            });



            // receive the names and avatars of all people in the chat room
            socket.on('peopleinchat', function(data) {

                if (data.number === 0) {

                    console.log("data.number is 0")

                    // call the server-side function 'login' and send user's parameters                    
                    socket.emit('login', {
                        user: $rootScope.currentUser,
                        id: id
                    });

                } else if (data.number === 1) {
                    console.log("data.number is 1")
                    console.log(data)
                    $scope.status = "Player Joined"
                    $scope.$apply()
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
                    //showMessage("somebodyLeft", data);
                    //chats.empty();
                }

            });

        }

        $scope.setup();


        $scope.turn = 1


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
            } else {
                //check second row
                sum = 0
                for (var j = 0; j < arr.length; j++) {
                    sum = sum + arr[1][j]
                }
                if (sum == 3) {
                    alert("Winner is " + candidate)
                } else {
                    //check third row
                    sum = 0
                    for (var j = 0; j < arr.length; j++) {
                        sum = sum + arr[2][j]
                    }
                    if (sum == 3) {
                        alert("Winner is " + candidate)
                    } else {
                        //check first column
                        sum = 0
                        for (var i = 0; i < arr.length; i++) {
                            sum = sum + arr[i][0]
                        }
                        if (sum == 3) {
                            alert("Winner is " + candidate)
                        } else {
                            //check second column
                            sum = 0
                            for (var i = 0; i < arr.length; i++) {
                                sum = sum + arr[i][1]
                            }
                            if (sum == 3) {
                                alert("Winner is " + candidate)
                            } else {
                                //check third column
                                sum = 0
                                for (var i = 0; i < arr.length; i++) {
                                    sum = sum + arr[i][2]
                                }
                                if (sum == 3) {
                                    alert("Winner is " + candidate)
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
                                        }
                                    }

                                }
                            }
                        }

                    }

                }

            }
        }


        $scope.play = function(x, y) {
            console.log("game on")
            if ($scope.Values[x][y] == '') {
                if ($scope.turn == 1) {
                    $scope.Values[x][y] = 'X'
                    xValues[x][y] = 1;
                    socket.emit('move', {
                        user: 'X',
                        x: x,
                        y: y
                    });
                    $scope.winner(xValues, 'X');
                    $scope.turn = !$scope.turn;
                } else {
                    $scope.Values[x][y] = '0'
                    yValues[x][y] = 1;
                    socket.emit('move', {
                        user: '0',
                        x: x,
                        y: y
                    });
                    $scope.winner(yValues, '0');
                    $scope.turn = !$scope.turn;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImNvbnRyb2xsZXJzL2dhbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvaG9tZUN0cmwuanMiLCJjb250cm9sbGVycy9tYXN0ZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvcmVnaXN0ZXJDdHJsLmpzIiwiY29udHJvbGxlcnMvcm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdk5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAgICduZ1JvdXRlJywgJ3VpLnJvdXRlcidcbl0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignZ2FtZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwLCAkc3RhdGVQYXJhbXMsICRyb290U2NvcGUsICRsb2NhdGlvbikge1xuXG4gICAgICAgIHZhciBzb2NrZXQgPSBpbygpO1xuICAgICAgICB2YXIgaWQgPSAkc3RhdGVQYXJhbXMuaWQ7XG4gICAgICAgICRzY29wZS5zdGF0dXMgPSBcIldhaXRpbmcgZm9yIHBsYXllcnNcIlxuICAgICAgICAkc2NvcGUuc2V0dXAgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIG9uIGNvbm5lY3Rpb24gdG8gc2VydmVyIHNlbmQgdGhlIGlkIG9mIGdhbWVzIHVybFxuICAgICAgICAgICAgc29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2xvYWQnLCBpZCk7XG4gICAgICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgICAgIC8vIHJlY2VpdmUgdGhlIG5hbWVzIGFuZCBhdmF0YXJzIG9mIGFsbCBwZW9wbGUgaW4gdGhlIGNoYXQgcm9vbVxuICAgICAgICAgICAgc29ja2V0Lm9uKCdwZW9wbGVpbmNoYXQnLCBmdW5jdGlvbihkYXRhKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5udW1iZXIgPT09IDApIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGEubnVtYmVyIGlzIDBcIilcblxuICAgICAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBzZXJ2ZXItc2lkZSBmdW5jdGlvbiAnbG9naW4nIGFuZCBzZW5kIHVzZXIncyBwYXJhbWV0ZXJzICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogJHJvb3RTY29wZS5jdXJyZW50VXNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5udW1iZXIgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhLm51bWJlciBpcyAxXCIpXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zdGF0dXMgPSBcIlBsYXllciBKb2luZWRcIlxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUuJGFwcGx5KClcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLmNoYXRXaXRoID0gZGF0YS51c2VyO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuY2hhdFdpdGgpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5uYW1lID0gZGF0YS51c2VyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2NvcGUgbmFtZSBpc1wiICsgJHNjb3BlLm5hbWUpXG5cbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ2xvZ2luJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogJHJvb3RTY29wZS5jdXJyZW50VXNlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2hhdCBpcyBmdWxsXCIpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vIE90aGVyIHVzZWZ1bCBcblxuXG4gICAgICAgICAgICBzb2NrZXQub24oJ2xlYXZlJywgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuYm9vbGVhbiAmJiBpZCA9PSBkYXRhLnJvb20pIHtcblxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxlZnRcIiwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIC8vc2hvd01lc3NhZ2UoXCJzb21lYm9keUxlZnRcIiwgZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIC8vY2hhdHMuZW1wdHkoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG4gICAgICAgICRzY29wZS50dXJuID0gMVxuXG5cbiAgICAgICAgJHNjb3BlLlZhbHVlcyA9IFtcbiAgICAgICAgICAgIFsnJywgJycsICcnXSxcbiAgICAgICAgICAgIFsnJywgJycsICcnXSxcbiAgICAgICAgICAgIFsnJywgJycsICcnXVxuICAgICAgICBdXG5cblxuICAgICAgICB2YXIgeFZhbHVlcyA9IFtcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdXG5cbiAgICAgICAgdmFyIHlWYWx1ZXMgPSBbXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF1cbiAgICAgICAgXVxuXG5cbiAgICAgICAgJHNjb3BlLndpbm5lciA9IGZ1bmN0aW9uKGFyciwgY2FuZGlkYXRlKSB7XG5cbiAgICAgICAgICAgIC8vSGVyZSBJIGFtIGJhc2ljYWxseSBkb2luZyB0aGUgc2FtZSB0aGluZyBhZ2FpbiBhbmQgaXQgY2FuIGJlIGRvbmUgbW9yZSBlbGVnYW50bHkgdXNpbmcgcmVjdXJzaW9uXG4gICAgICAgICAgICAvL1dpbGwgbWFrZSBpdCBtb3JlIGNvbmNpc2UgYW5kIG9wdGltaXplZCBsYXRlci4gXG4gICAgICAgICAgICAvL05vdyBsb29raW5nIGF0IHRoZSBjb2RlIGl0IGxvb2tzIGxpa2UgYSBpZi1lbHNlIGhlbGwsIHNvbWV0aGluZyBpbm5vdmF0aXZlIGF3YWl0cyAhIFxuXG4gICAgICAgICAgICB2YXIgc3VtID0gMFxuICAgICAgICAgICAgICAgIC8vY2hlY2sgZmlyc3Qgcm93XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHN1bSA9IHN1bSArIGFyclswXVtqXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN1bSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBjYW5kaWRhdGUpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vY2hlY2sgc2Vjb25kIHJvd1xuICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbMV1bal1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHN1bSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgdGhpcmQgcm93XG4gICAgICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IHN1bSArIGFyclsyXVtqXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBjYW5kaWRhdGUpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIGZpcnN0IGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbaV1bMF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHNlY29uZCBjb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyW2ldWzFdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIldpbm5lciBpcyBcIiArIGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2NoZWNrIHRoaXJkIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbaV1bMl1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9ub3cgY2hlY2sgdGhlIGxlZnQgZGlhZ29uYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gaikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyW2ldW2pdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25vdyBjaGVjayB0aGUgcmlnaHQgZGlhZ29uYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcnIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICsgaiA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyW2ldW2pdXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBjYW5kaWRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgICRzY29wZS5wbGF5ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIG9uXCIpXG4gICAgICAgICAgICBpZiAoJHNjb3BlLlZhbHVlc1t4XVt5XSA9PSAnJykge1xuICAgICAgICAgICAgICAgIGlmICgkc2NvcGUudHVybiA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5WYWx1ZXNbeF1beV0gPSAnWCdcbiAgICAgICAgICAgICAgICAgICAgeFZhbHVlc1t4XVt5XSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCdtb3ZlJywge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcjogJ1gnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS53aW5uZXIoeFZhbHVlcywgJ1gnKTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnR1cm4gPSAhJHNjb3BlLnR1cm47XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLlZhbHVlc1t4XVt5XSA9ICcwJ1xuICAgICAgICAgICAgICAgICAgICB5VmFsdWVzW3hdW3ldID0gMTtcbiAgICAgICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ21vdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiAnMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLndpbm5lcih5VmFsdWVzLCAnMCcpO1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUudHVybiA9ICEkc2NvcGUudHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGFrZW5cIilcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignaG9tZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRsb2NhdGlvbikge1xuXG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbiBjaGF0XCIpO1xuICAgICAgICAgICAgJHNjb3BlLmdhbWVpZCA9IE1hdGgucm91bmQoKE1hdGgucmFuZG9tKCkgKiAxMDAwMDAwKSk7XG4gICAgICAgIH1cblxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcblxuXG5cblxuICAgIH0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignbWFzdGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJHJvb3RTY29wZSwgJHJvdXRlKSB7XG5cbiAgICAgICBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnbG9nZ2VkX3VzZXInKSl7XG4gICAgICAgIFx0JHJvb3RTY29wZS5jdXJyZW50VXNlciA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZWRfdXNlcicpXG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLiRvbignbG9naW4nLCBmdW5jdGlvbihfLCB1c2VyKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2dlZCBJblwiKTsgICAgICAgICAgICBcbiAgICAgICAgICAgICRyb290U2NvcGUuY3VycmVudFVzZXIgPSB1c2VyLm5hbWVcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdsb2dnZWRfdXNlcicsICRyb290U2NvcGUuY3VycmVudFVzZXIpXG4gICAgICAgIH0pXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdyZWdpc3RlckN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG4gICAgICAgICRzY29wZS5zZXR1cCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJHNjb3BlLm1vZGVsID0ge307XG4gICAgICAgIH1cbiAgICAgICAgJHNjb3BlLnNldHVwKCk7XG4gICAgICAgICRzY29wZS5zYXZlVXNlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJpbnNpZGUgdGhlIGZ1bmNcIilcbiAgICAgICAgICAgICRodHRwLnBvc3QoJy9hcGkvdXNlcnMnLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICRzY29wZS5tb2RlbC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBwaG9uZTogJHNjb3BlLm1vZGVsLnBob25lLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogJHNjb3BlLm1vZGVsLmVtYWlsXG5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICAkKFwiI3RoYW5rc1wiKS5zaG93KCkuZGVsYXkoNTAwMCkuZmFkZU91dCgpXG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5zZXR1cCgpO1xuICAgICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH1cblxuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiaGVyZSBpbiBsYW5kaW5nXCIpXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb25maWcoZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciwgJGxvY2F0aW9uUHJvdmlkZXIpIHtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICB2aWV3czogeyAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAnY29udGVudCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcvaG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2hvbWVDdHJsJ1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnaG9tZS5nYW1lJywge1xuICAgICAgICAgICAgdXJsOiAnZ2FtZS86aWQnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAnY29udGVudEAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2dhbWUuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdnYW1lQ3RybCdcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG5cblxuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSlcblxuXG4gICAgfSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
