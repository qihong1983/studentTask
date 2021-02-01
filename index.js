const express = require('express');
const upload =require('express-fileupload');
var bodyParser = require('body-parser');
const app = express ();
const db = require("./db/index");

const moment = require('moment');


const cors=require('cors')
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false,limits: { fileSize: 50 * 1024 * 1024 }}))
app.use(bodyParser.json())




app.use(upload())

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/');
// })

app.use(express.static(__dirname + '/public'));


app.post('/jiaoyu',  (req,res) => {
    
    if (req.files) {
    
        var file = req.files.file;
        var filename = file.name;

        
        const {studentName,type} = req.body;

        
        if (!studentName) {
            res.json({status: false, msg: "用户名错误"});
            return ;
        }
        

        file.mv('./public/uploads/'+filename, async function (err) {
           
            if (err) {
                res.send(err);
            } else {
                

                
                
                    let resultSelect = await db.one(studentName, type);
                
                    // res.json(resultSelect);

                    if (!resultSelect.length) {
                        let insertTask = await db.insertTask(studentName, type, filename);
                        
                    } else {
                        let updateTask = await db.updateTask(studentName, type, filename);
                    
                    }

                
                    
                    let results =  await db.all(studentName, type, filename);

                    let jsonData = {
                        status: true,
                        data:results 
                    }
                    res.json(jsonData);
                
            }
        })
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