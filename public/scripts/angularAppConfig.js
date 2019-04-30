(function () {
    angular.module('umconsole', ['ui.router'])
        .directive('compileData', function ($compile) {
            return {
                scope: true,
                link: function (scope, element, attrs) {

                    var elmnt;

                    attrs.$observe('template', function (myTemplate) {
                        if (angular.isDefined(myTemplate)) {
                            // compile the provided template against the current scope
                            elmnt = $compile(myTemplate)(scope);

                            element.html(""); // dummy "clear"

                            element.append(elmnt);
                        }
                    });
                }
            };
        })
        .config(function ($stateProvider, $locationProvider) {
            $stateProvider
                .state('home', {
                    url: '/',
                    views: {
                        main: {
                            templateUrl: 'templates/home'
                        }
                    }
                })
            // .state('definations', {
            // 	url: '/definations',
            // 	views: {
            // 		main: {
            // 			templateUrl: 'templates/definations'
            // 		}
            // 	}
            // })
                .state('users', {
                    url: '/users',
                    views: {
                        main: {
                            templateUrl: 'templates/definations/users',
                            controller: 'userCtrl'
                        }
                    }
                })
                .state('userInProgram', {
                    url: '/userInProgram',
                    views: {
                        main: {
                            templateUrl: 'templates/definations/userInProgram',
                            controller: 'userInProgramCtrl'
                        }
                    }
                })

                .state("elements", {
                    url: '/elements', //just display on address bar
                    views: {
                        main: {
                            templateUrl: 'templates/definations/elements', //link to app.js --> template --> then forwarded to required path 
                            controller: 'elementCtrl'
                        }
                    }
                })
                .state("elements.loadElementPartial", {
                    url: '/:elementTypeId',
                    // params: {elementTypeId : 3},
                    views: {
                        'loadElementPartial@elements': {
                            templateUrl: 
                            function (params) {
                                return 'api/elements/loadElementPartial?elementTypeId=' + params.elementTypeId;
                            }
                            ,
                            controller: 'elementPartialCtrl'
                        }
                    }
                })
                // .state("elements.addElement", {
                //     url: '/:elementTypeId',
                //     // params: {elementTypeId : 3},
                //     views: {
                //         'add@elements': {
                //             templateUrl: //'templates/definations/addElement'
                //             function (params) {
                //                 if (params && params.elementTypeId)
                //                     return 'api/elements/definations/addElement?elementTypeId=' + params.elementTypeId;
                //                 return 'api/elements/definations/addElement?elementTypeId=7';
                //             }
                //             ,
                //             controller: 'elementCtrl'
                //         }
                //     }
                // })
                // .state('elements.editElement', {
                //     url: '/:elementTypeId/:elementId/:programId',
                //     // params: {elementTypeId : 3},
                //     views: {
                //         'add@elements': {
                //             templateUrl:
                //             function (params) {
                //                 if (params && params.elementTypeId)
                //                     return 'api/elements/editElement?elementTypeId=' + params.elementTypeId + '&elementId=' + params.elementId + '&programId=' + params.programId;
                //                 return 'api/elements/editElement?elementTypeId=7';
                //             }
                //             ,
                //             controller: function ($scope) {
                //                 $scope.Family = "fff";
                //             }
                //         }
                //     }
                // })
            $locationProvider.html5Mode(true);
        })
})();