const express = require('express');
const upload =require('express-fileupload');
var bodyParser = require('body-parser');
const app = express ();
const db = require("./db/index");

const moment = require('moment');

var query=require('./db/index2');


const cors=require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false,limits: { fileSize: 50 * 1024 * 1024 * 1024 }}))
app.use(bodyParser.json({limit: '50mb'}))




app.use(upload())

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/');
// })

app.use(express.static(__dirname + '/public'));


app.post('/jiaoyu',  async (req,res) => {
    
    if (req.files) {
    
        var file = req.files.file;
        var filename = file.name;

        
        const {studentName,type} = req.body;

        
        if (!studentName) {
            res.json({status: false, msg: "用户名错误"});
            return ;
        }
        

        await file.mv('./public/uploads/'+filename, async function (err) {
           
            console.log(err, 'erroerroerror');


            if (err) {
                console.log(11111111111111111111111111111111111111111111111111111111111111111111111111111111);
                res.send(err);
            } else {
                

                
                
            }
        });


        query(`SELECT * FROM task where studentname = '${studentName}' and type = ${type} and createAt = '${moment().format("YYYYMMDD")}'`).
        then(function (data) {

            console.log(data,1111111111111111111111111);
            // res.json(!data.rows.length);
            if (data.err) {
                res.json({
                    status: false
                })
            } else {
                if (!data.rows.length) {
                    query(`INSERT INTO task (type, studentname, url,createAt) VALUES (${type}, '${studentName}', '${filename}','${moment().format("YYYYMMDD")}');`).then((insertData)=> {
                        if (insertData.err) {
                            res.json({
                                status: false
                            })
                        }
                    })
                } else {
                    query(`UPDATE task SET url = '${filename}' where studentname = '${studentName}' and type = ${type} and createAt = '${moment().format("YYYYMMDD")}'`).then((data)=> {
                        console.log(data,222222222222222222222222222222);
                        
                        if (data.err) {
                            res.json({
                                status:false
                            })
                        } else {
                            return ;
                        }
                    });
                }
            }
            // if(data.rows[0]!=undefined)
            // {
            //     res.json({message:'该厂家信息已经录入！'});
            //     return;
            // }
        }).then((data)=> {
          

            query(`select student.id, student.studentname, task.url, task.type from student left join task on student.studentname = task.studentname and task.createAt = '${moment().format("YYYYMMDD")}';`).then((data)=> {
                if (data.err) {
                    res.json({
                        status:false
                    })
                } else {
                    let jsonData = {
                        "status": true,
                        "data":data.rows 
                    }

                    // console.log(jsonData, '22222222222222222222222222222222222222222222222222222222');
                    res.json(jsonData);
                }
                
                console.log(data, 444444444444444444444444444444444444444);
            })
           
        }).then((data)=> {

            console.log(data, 3333333333333333);
        })


        // console.log(2222222222222222222222222222222222222222222222222222222);
        // let resultSelect = await db.one(studentName, type, filename);

        // console.log(resultSelect, '<--------------');

        // let jsonData = {
        //     status: true,
        //     data:resultSelect 
        // }
        // await res.json(jsonData);









        // // res.json(resultSelect);


        // console.log(333333333333333333333333333333333333333333333333333333);

        // if (!resultSelect.length) {

        // console.log(44444444444444444444444444444444444444444444444444444444);

        //     let insertTask = await db.insertTask(studentName, type, filename);
        // console.log(555555555555555555555555555555555555555555555);
            
        // } else {
        //     console.log(6666666666666666666666666666666666666666666666666666666);


        //     let updateTask = await db.updateTask(studentName, type, filename);
        //     console.log(777777777777777777777777777777777777777777777777);
        // }

        // console.log(888888888888888888888888888888888888888888888888);

    
        
        // let results =  await db.all(studentName, type, filename);

        // console.log(99999999999999999999999999999999999999999999999999999999999999999);


        // let jsonData = {
        //     status: true,
        //     data:results 
        // }

        // console.log(jsonData, '22222222222222222222222222222222222222222222222222222222');
        // res.json(jsonData);
    }
});





// 技术类的
app.post('/jishu',  (req,res) => {
    
    if (req.files) {
    
        var file = req.files.file;
        var filename = file.name;

        
        const {studentName,type} = req.body;

        
        if (!studentName) {
            res.json({status: false, msg: "用户名错误"});
            return ;
        }
        

        file.mv('./public/uploadsjishu/'+filename, async function (err) {
           
            if (err) {
                res.send(err);
            } else {
                

                
                
                    let resultSelect = await db.oneJishu(studentName, type);
                
                    // res.json(resultSelect);

                    if (!resultSelect.length) {
                        let insertTask = await db.insertTaskJishu(studentName, type, filename);
                        
                    } else {
                        let updateTask = await db.updateTaskJishu(studentName, type, filename);
                    }

                
                    let results =  await db.allJishu(studentName, type, filename);

                    let jsonData = {
                        status: true,
                        data:results 
                    }

                    res.json(jsonData);
            }
        })
    }
});


//教育初始化

app.post('/jiaoyuinit',  async (req,res) => {
    
  
                
                    
                    let results =  await db.all('', 0, '');

                    let jsonData = {
                        status: true,
                        data:results 
                    }
                    res.json(jsonData);
                
    
});


//教育初始化

app.post('/jishuinit',  async (req,res) => {              
    let results =  await db.allJishu('', 1, '');

    // let results =  await db.allJishu(studentName, type, filename);


    let jsonData = {
        status: true,
        data:results 
    }
    res.json(jsonData);
});



app.post('/insertStu',  async (req,res) => {   




    const {studentname,studentphone} = req.body;

    try {

        let results =  await db.insertStu(studentname,studentphone);

        // let results =  await db.allJishu(studentName, type, filename);
    console.log(111);
    
        let jsonData = {
            status: true
        }
        res.json(jsonData);

    } catch(e) {

        res.status(200).json({
            status: false
        });
    }
    
});



app.post('/selectStu',  async (req,res) => {   




    // const {studentname,studentphone} = req.body;

    try {

        let results =  await db.selectStu();

        // let results =  await db.allJishu(studentName, type, filename);
    
    
        let jsonData = {
            status: true,
            data:results 
        }
        res.json(jsonData);

    } catch(e) {
console.log(e);
        res.status(200).json({
            status: false
        });
    }
    
});


app.post('/deleteStu',  async (req,res) => {   




    const {id} = req.body;

    try {

        let results =  await db.deleteStu(id);

        // let results =  await db.allJishu(studentName, type, filename);
    
    
        let jsonData = {
            status: true,
            data:results 
        }
        res.json(jsonData);

    } catch(e) {
console.log(e);
        res.status(200).json({
            status: false
        });
    }
    
});



app.listen(8000, ()=> {
    console.log('启动http服务:8000端口');
});