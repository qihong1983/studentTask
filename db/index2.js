var mysql=require("mysql")
// var settings=require('../settings');
// var pool = mysql.createPool({
//     host: settings.host,
//     user: settings.user,
//     password: settings.password,
//     database: settings.db,
//     port:settings.port
// });


pool = mysql.createPool({
    // connectionLimit: 200,
    password: '123456',
    user: 'root',
    database: 'studentManage',
    host: '43.252.230.6',
    port: '3306'
});
 
module.exports=function (sql) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function(err,conn){
            if(err){
                reject(err);
            }else{
                conn.query(sql,function(err,rows,fields){
                    //释放连接
                    conn.release();
                    //传递Promise回调对象
                    resolve({"err":err,
                            "rows":rows,
                            "fields":fields});
                });
            }
        });
    });
};