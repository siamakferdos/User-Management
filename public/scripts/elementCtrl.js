(function () {
    angular.module('umconsole')
        .controller("elementCtrl", function ($scope, $http, $state) {
            // $scope.programs = []
        
            $scope.selectedProgram = {};

            $http.get('/api/elements').success(function (data) {
                $scope.programs = data.programs;
                $scope.elements = data.elements;
                $scope.elementTypes = [];
            })

            var elementTree = null;
            
            //Create listening for program dropdown change 
            $scope.$watch('selectedProgram', function (newVal, oldVal) {
                $scope.elementTypes = [];
                $scope.elementModel = {};
                $scope.child = {};


                $http.post('/api/elements/getElements', { "ProgramId": newVal }).success(function (data) {
                    $scope.ProgramId = newVal;
                    elementTree = buildElementTree("myTree", data, $("#tree"), newVal);

                    //On tree selecting the related partial should be load
                    elementTree.on("select", function (elementId, elementTypeId, parentId) {
                        $scope.isEditMode = false;
                        $scope.ParentId = parentId;
                        $scope.ElementTypeId = elementTypeId;
                        $scope.ElementId = elementId;

                        $scope.$on('elementData', function (event, data12) {
                            //$scope.elementModel = {};
                            console.log(event);
                            console.log(data12);
                        });
                        
                        //On tree selecting the related element types should reload
                        $http.post('/api/elements/getElementTypes', { "ElementTypeId": elementTypeId }).success(function (dd) {
                            $scope.elementTypes = dd;
                        })    
                        // by tree selecting the related partial should be load
                        var getElementParams = {
                            "elementId": elementId,
                            "programId": newVal,
                            "elementTypeId": elementTypeId
                        }
                        $state.go("elements.loadElementPartial"
                            , getElementParams
                            ).then(function () {
                                $http.post("api/elements/getElementData", getElementParams).success(function (elementData) {
                                    $scope.elementModel = elementData[0];
                                    $scope.isEditMode = true;
                                })
                                // $http.post("api/elements/getElementData", getElementParams).success(function (elementData) {
                                //     $scope.elementModel = elementData[0];
                                //     $scope.isEditMode = true;                            
                                // })
                            })
                        
                        
                        
                        
                        
                        
                        
                        // $http.post('/api/elements/getElementTypesPartial',
                        //     {
                        //         "ElementId": elementId,
                        //         "ProgramId": newVal,
                        //         "ElementTypeId": elementTypeId
                        //     })
                        //     .success(function (d2) {
                        //         $("#ddd").html(d2);
                        //         $scope.isEditMode = true;
                        //     })
                    });
                })
            })
            
             $scope.emptyModel = function(){
                $scope.elementModel = {};
            }

            $scope.saveElement = function (elementTypeId) {
                var elementData = $scope.elementModel;

                //                 switch (elementTypeId) {
                //                     case 3:
                //                         elementData = {
                //                             ClassName: $scope.elementModel.ClassName,
                //                             EnglishName: $scope.elementModel.EnglishName,
                //                             FarsiName: $scope.elementModel.FarsiName
                //                         };
                //                         break;
                //                     case 4:
                //                         elementData = {
                //                             ServerName: $scope.elementModel.ServerName,
                //                             Name: $scope.elementModel.Name,
                //                             IsRemote: $scope.elementModel.IsRemote,
                //                             AuthenticateMode: $scope.elementModel.AuthenticateMode,
                //                             Login: $scope.elementModel.Login,
                //                             Password: $scope.elementModel.Password,
                //                             Status: $scope.elementModel.Status
                //                         };
                //                         break;
                //                     case 5:
                //                         elementData = { Name: $scope.elementModel.Name };
                //                         break;
                //                     case 6:
                //                     case 7:
                //                     case 9:
                //                         elementData = {
                //                             EnglishName: $("input[name='englishName']").val(),// $scope.elementModel.EnglishName,  
                //                             FarsiName: $("input[name='farsiName']").val() //$scope.elementModel.FarsiName
                //                         };
                //                         break;
                //                     case 8:
                //                         elementData = {
                //                             Name: $scope.elementModel.Name,
                //                             Order: $scope.elementModel.Order
                //                         };
                //                         break;
                // 
                // 
                //                 }
                // elementData.ElementTypeId = $scope.ElementTypeId;
                if ($scope.isEditMode)
                    elementData.ElementId = $scope.ElementId;
                else
                    elementData.parentId = $scope.ElementId;
                // elementData.ProgramId = $scope.ProgramId;
                // if($scope.ParentId)
                //     elementData.ParentId = $scope.ParentId;
                

                //elementData.programId = $scope.ProgramId;

                if ($scope.isEditMode)
                    $http.post('/api/elements/editElement', elementData)
                    .success(function(d){})
                else {
                    elementData.elementTypeId = elementTypeId;
                    elementData.programId = $scope.ProgramId;
                    $http.post('/api/elements/addElement', elementData)
                    .success(function(d){})
                }
            }
            
            $scope.changeEditMode = function (status) {
                $scope.isEditMode = status;
            }
            //             $scope.addNewElement = function (elementTypeId) {
            //                 $scope.isEditMode = false;
            //                 $scope.ElementTypeId = elementTypeId;
            //                 $http.post('/api/elements/getElementTypesPartial', { "ElementTypeId": elementTypeId, "ElementId": -1 }).success(function (d2) {
            //                     $("#ddd").html(d2);
            // 
            //                     $("button[name='btnSaveElement']").off("click").on("click", function () {
            //                         var elementData;
            //                         switch (elementTypeId) {
            //                             case 3:
            //                                 elementData = {
            //                                     ClassName: $scope.elementModel.ClassName,
            //                                     EnglishName: $scope.elementModel.EnglishName,
            //                                     FarsiName: $scope.elementModel.FarsiName
            //                                 };
            //                                 break;
            //                             case 4:
            //                                 elementData = {
            //                                     ServerName: $scope.elementModel.ServerName,
            //                                     Name: $scope.elementModel.Name,
            //                                     IsRemote: $scope.elementModel.IsRemote,
            //                                     AuthenticateMode: $scope.elementModel.AuthenticateMode,
            //                                     Login: $scope.elementModel.Login,
            //                                     Password: $scope.elementModel.Password,
            //                                     Status: $scope.elementModel.Status
            //                                 };
            //                                 break;
            //                             case 5:
            //                                 elementData = { Name: $scope.elementModel.Name };
            //                                 break;
            //                             case 6:
            //                             case 7:
            //                             case 9:
            //                                 elementData = {
            //                                     EnglishName: $("input[name='englishName']").val(),// $scope.elementModel.EnglishName,  
            //                                     FarsiName: $("input[name='farsiName']").val() //$scope.elementModel.FarsiName
            //                                 };
            //                                 break;
            //                             case 8:
            //                                 elementData = {
            //                                     Name: $scope.elementModel.Name,
            //                                     Order: $scope.elementModel.Order
            //                                 };
            //                                 break;
            // 
            // 
            //                         }
            //                         // elementData.ElementTypeId = $scope.ElementTypeId;
            //                         if ($scope.isEditMode)
            //                             elementData.ElementId = $scope.ElementId;
            //                         // elementData.ProgramId = $scope.ProgramId;
            //                         // if($scope.ParentId)
            //                         //     elementData.ParentId = $scope.ParentId;
            //                                                 
            //                         if ($scope.isEditMode)
            //                             $http.post('/api/elements/editElement', elementData)
            //                         else
            //                             $http.post('/api/elements/addElement', elementData)
            //                     });
            //                 });
            //             }
        })
        .controller('elementPartialCtrl', function ($scope) {            
            // $scope.parentCtrl = elementCtrl;
            $scope.elementModel = {};
            // $scope.parentCtrl.elementModel = $scope.elementModel;
            $scope.$emit('elementData', {a:12, b:5, c:4});
            //$scope.isEditMode = false;
            //$scope.$parent.elementModel = {};
        })

})();



