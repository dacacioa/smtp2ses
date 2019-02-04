# SMTP2SES
SMTP gateway to AWS SES via API

This is a prototype of SMTP to AWS SES Gateway.

Imagin that you have a mail client (a program, platform, etc...) that only support SMTP protocol, but you want to connect to AWS Simple Email Service and your network infraestructure (FW, proxy, whatever) only allow you to connect by HTTP/HTTPS ports. 

SMTP2SES is created to solve this problem. It runs a SMTP daemon that will connect with your AWS SES service throught AWS API.

**This is a functional propototype, a lot of work is needed to have a final product. The use of it is under your own risk**

## How to install

1. Clone this repository
2. Execute npm install
3. Execute the program (*nix example: nohup node smtp2ses.js > app.log 2>&1)
4. Configure your client to use as outbound sever your computer IP port 465
5. Start sending emails

## Requirements

1. Set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY and AWS_REGION environment variables.
2. Configure your SES 

## Todo

- Implement a logger
- Set properties file to define log level, port, log file, etc...
- Implement security (ssl connection)
