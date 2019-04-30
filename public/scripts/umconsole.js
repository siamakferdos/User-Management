(function(){
    angular.module('umconsole')
    .controller('NavCtrl', function ($scope) {

    })

    .controller('headerCtrl', function ($scope) {

    })

    .controller('userCtrl', function ($scope, $http) {
        $scope.users = []
        $scope.isEditing = false

        $http.get('/api/Users').success(function (data) {
            $scope.users = data
        })

        $scope.registerUser = function () {
            var data = {}
            $('#newUserForm input').each(function () {
                data[$(this).attr('name')] = $(this).val()
            })

            if ($scope.isEditing)
                $http.post('/api/Users/Edit', data).success(function (siamak) {
                    if (siamak == 'ok')
                        $('#addUser').modal('hide')
                    // else
                })
            else
                $http.post('/api/Users/Add', data).success(function (siamak) {
                    if (siamak == 'ok')
                        $('#addUser').modal('hide')
                    // else
                })

            $scope.isEditing = false
        }

        $scope.edit = function (user) {
            $scope.isEditing = true
            $('#newUserForm input').each(function () {
                var pname = $(this).attr('name');
                if (pname != 'Sign' && pname != 'Password')
                    $(this).val(user[$(this).attr('name')])
            })
        }

        $scope.delete = function (user) {
            console.log(user)
            $http.post('/api/Users/Delete', user.UserId).success(function (siamak) {
                var index = $scope.users.indexOf(user)
                $scope.users.splice(index, 1)
            })
        }
    })
    
    .controller('userInProgramCtrl', function ($scope) {
        $scope.Programs = [
            {
                ProgramId: 1,
                FarsiName: "مدیریت کاربران و برنامه ها"
            },
            {
                ProgramId: 2,
                FarsiName: "مدیریت آزمایشگاه"
            },
            {
                ProgramId: 3,
                FarsiName: "سیستم نظارت تردد پرسنل بخش ها"
            },
            {
                ProgramId: 4,
                FarsiName: "سیستم بهای تمام شده"
            }
        ];
        $scope.ProgramId = -1;

    })
})();

        
        