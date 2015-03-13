  var app = angular.module('app', ['ngResource']);

  app.controller('BotigaCtrl', function($scope, ProductFactory) {
    var product = {
      codi: "",
      nom: "",
      seccio: "",
      preu: ""
    }

    $scope.products = [];
    var codi = function (){return $scope.products.length + "a"}
    var actualitzar = function() {
      $scope.products = ProductFactory.query(function(entries) {
        $scope.products = entries;
      });
    }
    $scope.product = Object.create(product);

    $scope.Selectedproduct;

    actualitzar();

    $scope.addProduct = function() {
      $scope.product.codi = codi();
      ProductFactory.save($scope.product, function() {
        console.log("s'ha guardat");
        actualitzar();
        $scope.netejarCamps();
      }, function(error) {
        console.log("Error" + error);
      })
    }
    $scope.updateProduct = function() {
      ProductFactory.update($scope.Selectedproduct, function() {
          console.log('updated')
          $scope.$scope.Selectedproduct = Object.create(llibre);
          actualitzar();
        })
    }
    $scope.removeProduct = function() {
      ProductFactory.delete({
        id: $scope.Selectedproduct.codi
      }, function(){
        $scope.netejarCamps2();
        actualitzar();
      })
    }
    $scope.editaar = function(){$scope.product = $scope.Selectedproduct;}

    $scope.netejarCamps = function() {
      $scope.product = Object.create(product);
    }
    $scope.netejarCamps2 = function() {
      $scope.Selectedproduct = Object.create(product);
    }
    $scope.ProducteSeleccionat = function(inx) {
      $scope.Selectedproduct = $scope.products[inx];
    }
  });

  app.factory('ProductFactory', function($resource) {
    return $resource("/api/productes/:id", null, {
      'update': {
        method: 'PUT'
      }
    });
  });
