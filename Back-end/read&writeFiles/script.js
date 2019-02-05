const clc = require('cli-color')
const fs = require('fs')
const Promise = require("bluebird")

let users = []
const dir = './LEADS/'


const getUsers = () =>
  fs.readdir(dir,(err,files) => {
    files.forEach( file =>
       readFile(dir + file)
          .then( data => {

            let usersData = data.split('\n').map(user => user.split(','))

            usersData.forEach(user => {
              let exist = false
              for(let fbUser of users) if(fbUser.id === user[0]) exist = true    
              if(!exist) users.push({'id':user[0],'name':user[1].substring(1, user[1].length-1),'email':user[2]})})

              fs.writeFile('./newFile.txt',JSON.stringify(users), (err) => {                   
              }) 
          })) 
  })


getUsers()


function readFile(filePath, enc = 'utf-8') {

  return new Promise((resolve, reject) => {

    fs.readFile(filePath, enc, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    })

  })

}
