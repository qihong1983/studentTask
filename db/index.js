const mysql = require('mysql');
const moment = require('moment');


var pool = mysql.createPool({
    connectionLimit: 200,
    password: '123456',
    user: 'root',
    database: 'studentManage',
    host: '43.252.230.6',
    port: '3306'
});



let dbObj = {};


dbObj.one = (studentName, type,filename) => {
    pool = mysql.createPool({
        connectionLimit: 200,
        password: '123456',
        user: 'root',
        database: 'studentManage',
        host: '43.252.230.6',
        port: '3306'
    });
    return new Promise((resolve, reject) => {



        // console.log(`SELECT * FROM task where studentname = ${studentName} and type = ${type} and createAt = ${moment().format("YYYYMMDD")}`);
        pool.getConnection((connecterr, conn) => {

            console.log(connecterr, 'connecterrconnecterr');
            conn.query(`SELECT * FROM task where studentname = '${studentName}' and type = ${type} and createAt = '${moment().format("YYYYMMDD")}'`, async (err, results) => {
                if (err) {
                    return reject(err);
                }



               


                return resolve(results);


            });
            pool.releaseConnection(conn);


        });


    })
}


dbObj.insertTask = (studentName, type, filename) => {
    return new Promise((resolve, reject) => {

        // console.log(`SELECT * FROM task where studentname = ${studentName} and type = ${type} and createAt = ${moment().format("YYYYMMDD")}`);

        pool.getConnection((err, conn) => {



            console.log(`INSERT INTO task (type, studentname, url,createAt) VALUES (${type}, '${studentName}', '${filename}','${moment().format("YYYYMMDD")}');`);
            pool.query(`INSERT INTO task (type, studentname, url,createAt) VALUES (${type}, '${studentName}', '${filename}','${moment().format("YYYYMMDD")}');`, (err, results) => {
                pool.releaseConnection(conn);
                
                if (err) {
                    return reject(err);
                }
                return resolve(results);
            });

        });

    })
}


dbObj.updateTask = (studentName, type, filename) => {
    return new Promise(async (resolve, reject) => {

        // console.log(`SELECT * FROM task where studentname = ${studentName} and type = ${type} and createAt = ${moment().format("YYYYMMDD")}`);


        console.log(`UPDATE task SET url = '${filename}' where studentname = '${studentName}' and type = ${type} and createAt = '${moment().format("YYYYMMDD")}`);

        console.log(pool.query, 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb');


        pool.getConnection((err, conn) => {
            pool.query(`UPDATE task SET url = '${filename}' where studentname = '${studentName}' and type = ${type} and createAt = '${moment().format("YYYYMMDD")}'`, (err, results) => {
                pool.releaseConnection(conn);

                console.log(err, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
                if (err) {
                    return reject(err);
                }

                return resolve(results);
            });
        });

    })
}


dbObj.all = (studentName, type, filename) => {

    return new Promise(async (resolve, reject) => {
        console.log(`select student.id, student.studentname, task.url, task.type from student left join task on student.studentname = task.studentname and task.createAt = '${moment().format("YYYYMMDD")}';`);

        pool.getConnection((err, conn) => {
            pool.query(`select student.id, student.studentname, task.url from student left join task on student.studentname = task.studentname and task.createAt = '${moment().format("YYYYMMDD")}';`, (err, results) => {
                pool.releaseConnection(conn);
        
                if (err) {
                    return reject(err);
                }

                return resolve(results);
            });
        });
    })

}

//技术类




dbObj.oneJishu = (studentName, type) => {
    return new Promise((resolve, reject) => {

        // console.log(`SELECT * FROM task where studentname = ${studentName} and type = ${type} and createAt = ${moment().format("YYYYMMDD")}`);

        pool.query(`SELECT * FROM task2 where studentname = '${studentName}' and type = ${type} and createAt = '${moment().format("YYYYMMDD")}'`, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });

    })
}


dbObj.insertTaskJishu = (studentName, type, filename) => {
    return new Promise((resolve, reject) => {

        // console.log(`SELECT * FROM task where studentname = ${studentName} and type = ${type} and createAt = ${moment().format("YYYYMMDD")}`);

        console.log(`INSERT INTO task (type, studentname, url,createAt) VALUES (${type}, '${studentName}', '${filename}','${moment().format("YYYYMMDD")}');`);
        pool.query(`INSERT INTO task2 (type, studentname, url,createAt) VALUES (${type}, '${studentName}', '${filename}','${moment().format("YYYYMMDD")}');`, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });

    })
}






dbObj.updateTaskJishu = (studentName, type, filename) => {
    return new Promise((resolve, reject) => {

        // console.log(`SELECT * FROM task where studentname = ${studentName} and type = ${type} and createAt = ${moment().format("YYYYMMDD")}`);


        console.log(`UPDATE task2 SET url = '${filename}' where studentname = '${studentName}' and type = ${type} and createAt = '${moment().format("YYYYMMDD")}`);
        pool.query(`UPDATE task2 SET url = '${filename}' where studentname = '${studentName}' and type = ${type} and createAt = '${moment().format("YYYYMMDD")}'`, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });

    })
}







dbObj.allJishu = (studentName, type, filename) => {
    return new Promise((resolve, reject) => {
        console.log(`select student.id, student.studentname, task2.url from student left join task2 on student.studentname = task2.studentname and task2.createAt = '${moment().format("YYYYMMDD")}';`);
        pool.query(`select student.id, student.studentname, task2.url from student left join task2 on student.studentname = task2.studentname and task2.createAt = '${moment().format("YYYYMMDD")}';`, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });
    })

}







dbObj.insertStu = (studentName, studentPhone) => {
    return new Promise((resolve, reject) => {

        // console.log(`SELECT * FROM task where studentname = ${studentName} and type = ${type} and createAt = ${moment().format("YYYYMMDD")}`);

        console.log(`INSERT INTO student (studentname, studentphone) VALUES ('${studentName}', '${studentPhone});`);
        pool.query(`INSERT INTO student (studentname, studentphone) VALUES ('${studentName}', '${studentPhone}');`, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });

    })
}


dbObj.selectStu = () => {
    return new Promise((resolve, reject) => {

        // console.log(`SELECT * FROM task where studentname = ${studentName} and type = ${type} and createAt = ${moment().format("YYYYMMDD")}`);

        // console.log(`INSERT INTO student (studentname, studentphone) VALUES ('${studentName}', '${studentPhone});`);
        pool.query(`SELECT * FROM student`, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });

    })
}


dbObj.deleteStu = (id) => {
    return new Promise((resolve, reject) => {

        // console.log(`SELECT * FROM task where studentname = ${studentName} and type = ${type} and createAt = ${moment().format("YYYYMMDD")}`);

        // console.log(`INSERT INTO student (studentname, studentphone) VALUES ('${studentName}', '${studentPhone});`);
        pool.query(`delete from student where id = ${id};`, (err, results) => {
            if (err) {
                return reject(err);
            }

            return resolve(results);
        });

    })
}





module.exports = dbObj;