const http =require('http');
const port=1234;
const server=http.createServer(function(req,res){
    res.setHeader('Constent-type','application/json');
    res.setHeader('Acces-Control-Allow-Origin',"*");
    res.writeHead(200);
    let dataObj={"id":123,"name":"Bob",email:"bob@bon.de"};
    let data=JSON.stringify(dataObj);
    res.end(data);
});

server.listen(port,function(){
    console.log('Listening to Port'+port)
});