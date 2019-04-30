var sql = require('mssql')

var config = {
    user: 'Nodejs',
    password: '123',
    server: 'frosh', // You can use 'localhost\\instance' to connect to named instance 
    database: 'UM',
}

function RunSP(spName, params, callback) {
    var dt = new sql.Table();

    dt.columns.add('Type', sql.NVarChar(50), true)
    dt.columns.add('Name', sql.NVarChar(50), false)
    dt.columns.add('Value', sql.NVarChar(3000), false)

    dt.rows.add('', '_SpName', spName)

    if (params)
        Object.getOwnPropertyNames(params).forEach(function (val, idx, array) {
            dt.rows.add('', val, params[val]);
        });

    var connection = new sql.Connection(config, function (err) {
        // ... error checks
 try{
        var request = new sql.Request(connection);
        request.input('params', dt);
        request.execute('RunSP', function (err, recordsets, returnValue) {
            // ... error checks
            var outlet = {}

            var tableMap = recordsets[recordsets.length - 1]

            for (var index = 0; index <= recordsets.length - 2; index++) {
                switch (tableMap[index].TableType) {
                    case "D":
                        outlet[tableMap[index].TableName] = recordsets[index];
                        break;
                    case "E":
                    case "M":
                        outlet['Messages'] = recordsets[index];
                        break;
                    case "S":
                        outlet['Schema'] = recordsets[index];
                        break;
                }

                outlet.Map = tableMap;
            }

            callback(err, outlet)
        });
        }
        catch(ex)
        {
            console.log(ex);
        }
    });

}

module.exports = RunSP 