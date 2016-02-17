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
                    $scope.winner(xValues, 'X');
                    $scope.turn = !$scope.turn;
                } else {
                    $scope.Values[x][y] = '0'
                    yValues[x][y] = 1;
                    $scope.winner(yValues, '0');
                    $scope.turn = !$scope.turn;
                }
            } else {
                console.log("taken")
            }




        }


    })
