"use strict";
require('aws-sdk');

const listenPort = 465;
const AWS = require('aws-sdk');
const ses = new AWS.SES();
var senderAddress, rcptAddress, stringData;
const SMTPServer = require("smtp-server").SMTPServer;
//const proxy = require('proxy-agent'); -- TODO


const server = new SMTPServer({

    logger: true,
    secure: false,
    authOptional: true,
 
    onData(stream, session, callback) {
        stringData = "";
        stream.pipe(process.stdout);
        stream.on('data', (text) =>{
            if (typeof text != 'undefined'){
                stringData = stringData + text;
            }
            

        })

        stream.on('end', () => {
    
            // stringData = stringData.replace('\n\r','\n');         

            var params = {
                RawMessage: { Data: stringData },
                Destinations: [ rcptAddress ],
                Source:  senderAddress
            };

         
            let err;
            if (stream.sizeExceeded) {
                err = new Error('Error: message exceeds fixed maximum message size 10 MB');
                err.responseCode = 552;
                return callback(err);
            }

            /* 

            TODO - Proxy support

            console.log(proxyServer);

            AWS.config.update({
                httpOptions: { agent: proxy( process.env.proxyServer ) }
            });
            
            */
            
            ses.sendRawEmail(params, function(err, data) {
                if(err) {
                    console.error(err);
                } 
                else {
                    console.log(data);
                }           
            });

            callback(null, 'Message queued'); // accept the message once the stream is ended
        });
    },
        
    

    onMailFrom(address, session, callback) {
    
        senderAddress = address.address;
        return callback()
    },

    onRcptTo(address, session, callback){

        rcptAddress = (address.address);
        return callback();
    }

    

});

server.listen(listenPort);

