 angular.module('myApp', ['queryParser'])
     .controller('MyController', ['$scope', 'queryParser',
         function($scope, queryParser) {
             // Set up a watch $watch必须是一个ng-model对象
             $scope.$watch('emailBody', function(body) { //previewText是$scope作用域的一个对象
                 if (body) {
                     $scope.query =
                         queryParser.parse(body, {
                             to: $scope.to
                         });
                 }
             });
         }
     ]);

 angular.module('queryParser', [])
     .config(['$interpolateProvider',
         function($interpolateProvider) { // interpolate篡改，自定义模板标签的标志，原来默认是{{ }}现在改为
             $interpolateProvider.startSymbol('__'); //$interpolateProvider.statSymbol().endSymbol();开始和结束的标志符
             $interpolateProvider.endSymbol('__');
         }
     ])
     .factory('queryParser', ['$interpolate',
         function($interpolate) {
             // a service to handle parsing
             return {
                 parse: function(text, context) {
                     var template = $interpolate(text);
                     return template(context);
                 }
             };
         }
     ]);