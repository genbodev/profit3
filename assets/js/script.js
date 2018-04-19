$( document ).ready(function() {

    var app = {

        init: function () {
            this.initVars();
            this.addListeners();
        },

        initVars: function() {
            this.ce = 10000;
            this.cw = 10000;
            this.cs = 0;
            this.ef = false;
            this.ew = false;
        },

        /**
         * Adds listeners
         */
        addListeners: function () {
            var employeesBtn = $('#employees');
            employeesBtn.on('click', app.employeesFill);
            var wagesBtn = $('#wages');
            wagesBtn.on('click', app.wagesFill);
            var queryBtn = $('#query');
            queryBtn.on('click', app.select);
        },

        /**
         * fill tbl
         * @param e
         */
        employeesFill: function (e) {
            $('#employees').attr('disabled', 'disabled');
            $.when($.ajax({url: 'process/f_employees.php', type: 'POST', data: app.ce})).then(function(data, textStatus, jqXHR){
                data = JSON.parse(data);
                if (data.status === true) {
                    $('#employees-state').text(app.ce  + '/' + 202000);
                    app.ce = app.ce + 10000;
                    if (app.ce <= 202000) {
                        app.employeesFill();
                    } else {
                        $('#employees-state').text('Success');
                        app.ef = true;
                        app.ublockBtn();
                    }
                }
            });
        },

        /**
         * fill tbl
         * @param e
         */
        wagesFill: function (e) {
            $('#wages').attr('disabled', 'disabled');
            $.when($.ajax({url: 'process/f_wages.php', type: 'POST', data: app.cw})).then(function(data, textStatus, jqXHR){
                data = JSON.parse(data);
                if (data.status === true) {
                    $('#wages-state').text(app.cw  + '/' + 101000);
                    app.cw = app.cw + 10000;
                    if (app.cw <= 101000) {
                        app.wagesFill();
                    } else {
                        $('#wages-state').text('Success');
                        app.ew = true;
                        app.ublockBtn();
                    }
                }
            });
        },

        /**
         * select
         * @param e
         */
        select: function (e) {
            $.when($.ajax({url: 'process/query.php', type: 'POST', dataType: 'json', data: 'offset='+app.cs})).then(function(data, textStatus, jqXHR){
                if (data.status === true) {
                    var resultBlock = $('#result');
                    if (data['names'].length > 0) {
                        var names = [];
                        for (var i = 0; i < data['names'].length; i++) {
                            names[names.length] = data['names'][i].name;
                        }
                        resultBlock.html(resultBlock.html() + names.join('<br />') + '<br />');
                        app.cs = app.cs + 10000;
                        app.select();
                    } else {
                        $('#query-state').text('Success');
                    }
                }
            });
        },

        ublockBtn: function() {
            if (this.ef && this.ew) {
                $('#query').removeAttr('disabled');
            }
        }

    };

    app.init();

});