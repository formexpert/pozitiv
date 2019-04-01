angular.module('df.admin')
    .controller('DoctorListCtrl',
    ['$scope', '$http', 'dfLoading', '$window', 'dfNotice',
        function ($scope, $http, dfLoading, $window, dfNotice) {
            $scope.doctors = [];

            $scope.init = function () {
                $scope.doctors = $window._doctors;
            }

            $scope.delete = function (id) {
                if (!confirm('Вы действительно хотите удалить?')) {
                    return false;
                }
                dfLoading.loading();
                $http.post('[[link:admin_doctor_data?action=delete]]', {id: id})
                    .success(function (response) {
                        dfLoading.ready();
                        if (response.error) {
                            dfNotice.error(response.error);
                            return;
                        }
                        if (response.ok) {
                            $.each($scope.doctors, function (index, doctor) {
                                if (doctor.id == id) {
                                    $scope.doctors.splice(index, 1);
                                    return false;
                                }
                            });
                            dfNotice.ok(response.ok);
                            return;
                        }
                    });
            };

        }])
    .controller('DoctorEditCtrl',
    ['$scope', '$http', 'dfLoading', '$window', 'dfNotice', 'dfImage',
        function ($scope, $http, dfLoading, $window, dfNotice, dfImage) {
            $scope.doctor = {};
            $scope.image = null;

            $scope.init = function () {
                $scope.ckeditor = CKEDITOR.replace('text');

                $scope.doctor = $window._doctor;
                $scope.image = $window._image;
            }

            $scope.save = function () {
                $scope.doctor.text = $scope.ckeditor.getData();
                dfLoading.loading();
                $http.post('[[link:admin_doctor_data?action=save]]', {doctor: $scope.doctor})
                    .success(function (response) {
                        dfLoading.ready();
                        if (response.errors) {
                            dfNotice.errors(response.errors);
                            return;
                        }
                        if (response.ok) {
                            var href = '[[link:admin_doctor?action=edit]]?id=' + response.id;
                            window.location.href = href;
                        }
                    });
            }

            $scope.onFileSelect = function ($files, id) {
                for (var i = 0; i < $files.length; i++) {
                    var file = $files[i];
                    dfLoading.loading();
                    dfImage.set(file, id,
                        '\\Dent\\Core\\Entity\\Doctor',
                        function (data, status, headers, config) {
                            dfLoading.ready();
                            if (data.error) {
                                dfNotice.error(data.error);
                            }
                            else {
                                $scope.image = data;
                            }
                        });
                }
            };


        }])
;
