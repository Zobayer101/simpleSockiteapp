
const express=require('express');
const dotenv=require('dotenv');
const http=require('http');
const path=require('path');
const bodyParser=require('body-parser');
const {Server}=require('socket.io');
const route=require('./server/routes/route');
const app=express();

const expressServer=http.createServer(app)



dotenv.config();
const PORT=process.env.PORT||8800;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.set('view engine','ejs');
app.use('/route',route);

const io=new Server(expressServer);
io.on('connection',(socket)=>{
    console.log("User Connection");
    setTimeout(()=>{
        socket.send('This is a server side message')
    },5000);
    socket.on('disconnect',()=>{
        console.log('User disconetd');
    })
    socket.on('message',(msg)=>{
        console.log(msg)
        if(msg){
            socket.send(msg);
        }
    })
   console.log( socket.id)
})

app.get('/',(req,res)=>{
    res.render('home');
})

app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/img',express.static(path.resolve(__dirname,'assets/img')));
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));

app.use((error,req,res,next)=>{
    if(error){
        res.status(500).json({
            msg:error.message
        });
        console.log(error.message);
    }else{
        console.log(`The server side error !`);
    }
})
expressServer.listen(PORT,()=>{
    console.log(`Server run on http://localhost:${PORT}`);
})