const http = require("http");
const https = require("https");

const PORT = 3000;
const HOSTNAME = "127.0.0.1";
data = "";
http.createServer((req, res) => {
    
    if(req.method === "GET") {
        if(req.url === "/getTimeStories") {
            
            https.get("https://time.com", (resp) => {
                
                 
                resp.on('data', (chunk) => {
                    data += chunk;
                })

                resp.on('end', () => {
                var resData=getData(data);
                res.write(JSON.stringify(resData))
                res.end();
                });

            })
        }
    } else {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write("Hello there!");
        res.end();
    }

}).listen(PORT, HOSTNAME, () => {
    console.log(`Listening on port ${HOSTNAME}:${PORT}`);
})


function getData(data){
    var objArray=[];
    const url = "https://time.com";
     
    var sectionIndex=data.indexOf('homepage-module latest');
    var HrefIndex=data.indexOf('a href=',sectionIndex)+7;
    var h2Data=data.indexOf('>',HrefIndex);
    var Endh2Data=data.indexOf('</a>',h2Data)
    for(var i=0;i<5;i++){
        //console.log(data.substring(HrefIndex,h2Data));
        var link=url+data.substring(HrefIndex,h2Data);

        //console.log(data.substring(h2Data+1,Endh2Data));
        var title=data.substring(h2Data+1,Endh2Data)

        HrefIndex=data.indexOf('a href=',Endh2Data)+7;
        h2Data=data.indexOf('>',HrefIndex);
        Endh2Data=data.indexOf('</a>',h2Data)

                objArray.push({
                    "title": title,
                   "link": link
                })

    }
    console.log(objArray);
    return objArray;
    }
