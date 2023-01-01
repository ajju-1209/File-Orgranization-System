#!/usr/bin/env node

//Taking input from command line 
//user input starts from second argument first one is path of the file
let inputArr=process.argv.slice(2);
let fs=require('fs');
let path=require('path');
console.log(inputArr);

let helpObj=require("./commands/help");
let treeObj=require("./commands/tree");
let organizeObj=require("./commands/organize");
//We have to implement following functionalities
//node main.js tree "directoryPath"
//node main.js organize "directoryPath"
//node main.js help

let command=inputArr[0];
// console.log(inputArr[1]);
//type of files we may get
let types={
  media:["mp4","mkv"],
  archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
  documents:['docx','doc','pdf','xlsx','odt','ods','odp','odg','odf','txt','ps','tex'],
  app:['exe','dmg','pkg','deb']
}
 
switch(command)
{
  case "tree":
    treeObj.treeKey(inputArr[1]);
    break;
  case "organize":
    organizeObj.organizeKey(inputArr[1]);
    break;
  case "help":
    helpObj.helpKey();
    break;
  default:
    console.log("Please input Right command");
    break;
}
