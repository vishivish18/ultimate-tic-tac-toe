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
