// OPP
// NodeJS Http

const http = require("http");
const fs = require("fs/promises");
const path = require("path");

    const server  =  http.createServer(async (request, response) => {
      let url =  request.url;
      let method = request.method;
      
    console.log(url);
    console.log(method);

    let user = {
        name: this.name,
        phone: this.phone,
    }
     let dataUsers =  fs.readFile(path.join(__dirname,"home.json"), "utf-8");
     dataUsers =  JSON.parse(dataUsers);
      let users = users.dataUsers;
     users.push(user);

      fs.writeFile(path.join(__dirname,"home.json"),JSON.stringify({users: users}));


    if (url === "/") {
        response.writeHead(200, {
            "Content-Type":"text/html; charset=utf-8",
        })
        let html = await fs.readFile(path.join(__dirname,"index.html"), "utf-8");


        response.write(html);
        response.end();
    } else if (url === "/sign") {
       if (method === "GET") {
        response.writeHead(200, {
            "Content-Type":"text/html",
        });
      

        

         let about = await fs.readFile(path.join(__dirname,"about.html"),"utf-8");

        
        response.write(about);
        response.end();
    } else if(method === "POST"){
        let body = []

        request.on("data", (data) => {
            body.push(data) 
         });

         request.on("end", ()=> {
            body = body.map((data) => Buffer.from(data).toString());
            body = body[0].split("&");
            let requestBody = {
            }; 

            body.forEach(e => { 
               let key = e.split("=")[0];
               let value = e.split("=")[1];
                requestBody[`${key}`] = value;
            });
            response.end(`${JSON.stringify(requestBody)}`)
            
                
            
        
            fs.writeFile(path.join(__dirname,"home.json"),JSON.stringify({users:requestBody}));
             
         });

     
       }
      
       }

});

server.listen(8080);