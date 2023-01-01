let fs=require('fs');
let path=require('path');

function treeFn(dirPath)
{
  let destPath;
  if(dirPath == undefined)
  {
    treeHelper(process.cwd(),"");
    return;
    //1.input ->directory path given 
    // console.log("kindly enter the path");
  } else{
    let doesExist=fs.existsSync(dirPath);
    if(doesExist){
      treeHelper(dirPath,"");
    }else{

      console.log("hello Please enter correct path");
      return;
    }
  }

  console.log("Tree command implemented for ",dirPath);
}

function treeHelper(dirPath,indent){

  let isFile=fs.lstatSync(dirPath).isFile();
  if(isFile==true){
    //extracting the filename form a file path
    let fileName=path.basename(dirPath);
    console.log(indent + "├──"+fileName);
  }
  else {

    let dirName=path.basename(dirPath);
    console.log(indent + "└──"+dirName);
    let childrens=fs.readdirSync(dirPath);
    for(let i=0;i<childrens.length;i++){
      let childPath=path.join(dirPath,childrens[i]);
      treeHelper(childPath,indent + "\t");
    }
  }
}

module.exports={
  treeKey:treeFn
}
