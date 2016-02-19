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
