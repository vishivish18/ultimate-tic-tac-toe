angular.module('app', [
    'ngRoute', 'ui.router'
])

angular.module('app')
    .controller('gameCtrl', function($scope, $http) {
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

                                }
                            }
                        }

                    }

                }

            }
        }


        $scope.play = function(x, y) {
            console.log("game on")


            for (var i = 0; i < xValues.length; i++) {
                for (var j = 0; j < xValues.length; j++) {
                    console.log(xValues[i][j])
                }
            }
            if ($scope.turn == 1) {
                $scope.Values[x][y] = 'X'
                xValues[x][y] = 1;
                $scope.winner(xValues, 'X');
                $scope.turn = !$scope.turn;
            } else {
                $scope.Values[x][y] = '0'
                yValues[x][y] = 1;
                $scope.winner(yValues, '0');
                $scope.turn = !$scope.turn;
            }

        }


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
            .state('app', {
                url: '/',
                views: {
                    'content': {
                        templateUrl: '/game.html',
                        controller: 'gameCtrl'

                    }
                }
            })

        .state('admin', {
            url: '/admin',
            views: {                
                'content': {
                    templateUrl: '/admin.html',
                    controller: 'adminCtrl'

                }
            }
        })



        $locationProvider.html5Mode(true)


    });

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImNvbnRyb2xsZXJzL2dhbWVDdHJsLmpzIiwiY29udHJvbGxlcnMvbWFzdGVyQ3RybC5qcyIsImNvbnRyb2xsZXJzL3JlZ2lzdGVyQ3RybC5qcyIsImNvbnRyb2xsZXJzL3JvdXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyLm1vZHVsZSgnYXBwJywgW1xuICAgICduZ1JvdXRlJywgJ3VpLnJvdXRlcidcbl0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbiAgICAuY29udHJvbGxlcignZ2FtZUN0cmwnLCBmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG4gICAgICAgICRzY29wZS50dXJuID0gMVxuXG5cbiAgICAgICAgJHNjb3BlLlZhbHVlcyA9IFtcbiAgICAgICAgICAgIFsnJywgJycsICcnXSxcbiAgICAgICAgICAgIFsnJywgJycsICcnXSxcbiAgICAgICAgICAgIFsnJywgJycsICcnXVxuICAgICAgICBdXG5cblxuICAgICAgICB2YXIgeFZhbHVlcyA9IFtcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXSxcbiAgICAgICAgICAgIFswLCAwLCAwXVxuICAgICAgICBdXG5cbiAgICAgICAgdmFyIHlWYWx1ZXMgPSBbXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF0sXG4gICAgICAgICAgICBbMCwgMCwgMF1cbiAgICAgICAgXVxuXG5cbiAgICAgICAgJHNjb3BlLndpbm5lciA9IGZ1bmN0aW9uKGFyciwgY2FuZGlkYXRlKSB7XG5cbiAgICAgICAgICAgIC8vSGVyZSBJIGFtIGJhc2ljYWxseSBkb2luZyB0aGUgc2FtZSB0aGluZyBhZ2FpbiBhbmQgaXQgY2FuIGJlIGRvbmUgbW9yZSBlbGVnYW50bHkgdXNpbmcgcmVjdXJzaW9uXG4gICAgICAgICAgICAvL1dpbGwgbWFrZSBpdCBtb3JlIGNvbmNpc2UgYW5kIG9wdGltaXplZCBsYXRlci4gXG5cbiAgICAgICAgICAgIHZhciBzdW0gPSAwXG4gICAgICAgICAgICAgICAgLy9jaGVjayBmaXJzdCByb3dcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyWzBdW2pdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICBhbGVydChcIldpbm5lciBpcyBcIiArIGNhbmRpZGF0ZSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9jaGVjayBzZWNvbmQgcm93XG4gICAgICAgICAgICAgICAgc3VtID0gMFxuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYXJyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1bSA9IHN1bSArIGFyclsxXVtqXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3VtID09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBjYW5kaWRhdGUpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9jaGVjayB0aGlyZCByb3dcbiAgICAgICAgICAgICAgICAgICAgc3VtID0gMFxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFyci5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyWzJdW2pdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1bSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIldpbm5lciBpcyBcIiArIGNhbmRpZGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgZmlyc3QgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IHN1bSArIGFycltpXVswXVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1bSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBjYW5kaWRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgc2Vjb25kIGNvbHVtblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJbaV1bMV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN1bSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiV2lubmVyIGlzIFwiICsgY2FuZGlkYXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY2hlY2sgdGhpcmQgY29sdW1uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSA9IHN1bSArIGFycltpXVsyXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdW0gPT0gMykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJXaW5uZXIgaXMgXCIgKyBjYW5kaWRhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL25vdyBjaGVjayB0aGUgbGVmdCBkaWFnb25hbFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgICRzY29wZS5wbGF5ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJnYW1lIG9uXCIpXG5cblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB4VmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB4VmFsdWVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHhWYWx1ZXNbaV1bal0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCRzY29wZS50dXJuID09IDEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuVmFsdWVzW3hdW3ldID0gJ1gnXG4gICAgICAgICAgICAgICAgeFZhbHVlc1t4XVt5XSA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLndpbm5lcih4VmFsdWVzLCAnWCcpO1xuICAgICAgICAgICAgICAgICRzY29wZS50dXJuID0gISRzY29wZS50dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuVmFsdWVzW3hdW3ldID0gJzAnXG4gICAgICAgICAgICAgICAgeVZhbHVlc1t4XVt5XSA9IDE7XG4gICAgICAgICAgICAgICAgJHNjb3BlLndpbm5lcih5VmFsdWVzLCAnMCcpO1xuICAgICAgICAgICAgICAgICRzY29wZS50dXJuID0gISRzY29wZS50dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH1cblxuXG4gICAgfSlcbiIsImFuZ3VsYXIubW9kdWxlKCdhcHAnKVxuICAgIC5jb250cm9sbGVyKCdtYXN0ZXJDdHJsJywgZnVuY3Rpb24oJHNjb3BlLCAkcm9vdFNjb3BlLCAkcm91dGUpIHtcblxuICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdsb2dnZWRfdXNlcicpKXtcbiAgICAgICAgXHQkcm9vdFNjb3BlLmN1cnJlbnRVc2VyID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2xvZ2dlZF91c2VyJylcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuJG9uKCdsb2dpbicsIGZ1bmN0aW9uKF8sIHVzZXIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTG9nZ2VkIEluXCIpOyAgICAgICAgICAgIFxuICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJyZW50VXNlciA9IHVzZXIubmFtZVxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xvZ2dlZF91c2VyJywgJHJvb3RTY29wZS5jdXJyZW50VXNlcilcbiAgICAgICAgfSlcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbnRyb2xsZXIoJ3JlZ2lzdGVyQ3RybCcsIGZ1bmN0aW9uKCRzY29wZSwgJGh0dHApIHtcbiAgICAgICAgJHNjb3BlLnNldHVwID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkc2NvcGUubW9kZWwgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICAkc2NvcGUuc2V0dXAoKTtcbiAgICAgICAgJHNjb3BlLnNhdmVVc2VyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImluc2lkZSB0aGUgZnVuY1wiKVxuICAgICAgICAgICAgJGh0dHAucG9zdCgnL2FwaS91c2VycycsIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLm1vZGVsLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiAkc2NvcGUubW9kZWwucGhvbmUsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiAkc2NvcGUubW9kZWwuZW1haWxcblxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgICQoXCIjdGhhbmtzXCIpLnNob3coKS5kZWxheSg1MDAwKS5mYWRlT3V0KClcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnNldHVwKCk7XG4gICAgICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfVxuXG5cbiAgICAgICAgY29uc29sZS5sb2coXCJoZXJlIGluIGxhbmRpbmdcIilcbiAgICB9KVxuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4gICAgLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlcikge1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhcHAnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJy9nYW1lLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ2dhbWVDdHJsJ1xuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIC5zdGF0ZSgnYWRtaW4nLCB7XG4gICAgICAgICAgICB1cmw6ICcvYWRtaW4nLFxuICAgICAgICAgICAgdmlld3M6IHsgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJ2NvbnRlbnQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL2FkbWluLmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnYWRtaW5DdHJsJ1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG5cblxuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUodHJ1ZSlcblxuXG4gICAgfSk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
