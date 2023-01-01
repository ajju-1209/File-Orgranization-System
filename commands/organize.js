let fs=require('fs');
let path=require('path');

function organizeFn(dirPath){

  let destPath;
  if(dirPath == undefined)
  {
    destPath=process.cwd();
    //1.input ->directory path given 
    // console.log("kindly enter the path");
    return;
  } 
  else{
    let doesExist=fs.existsSync(dirPath);
    if(doesExist){
      //2. create->oraganized_files ->directory
      destPath=path.join(dirPath,"organized_files");
      if(fs.existsSync(destPath)==false)
      {
        //create directory named organized_files
        fs.mkdirSync(destPath);
      }
    }else{
      console.log("Please enter correct path");
      return;
    }

  }
  organizeHelper(dirPath,destPath);
  
  console.log("organize command implemented for ",dirPath);
}

function organizeHelper(src,dest){

  //3.identify categories of all files present in that directory ->
  let childNames=fs.readdirSync(src);
 
  for(let i=0;i<childNames.length;i++)
  {
    let childAddress=path.join(src,childNames[i]);
    let isFile=fs.lstatSync(childAddress).isFile();
    if(isFile){
      
      let category=getCategory(childNames[i]);
      console.log(childNames[i],"belongs to -->",category);

      //4 copy/cut files to that organised directory inside of any of category folder
      sendFiles(childAddress,dest,category);
    }
  }   
}

function sendFiles(srcFilePath,dest,category){

  //just creating path name not actual file
  let categoryPath=path.join(dest,category);

  //if this path does'nt exists then create directory  
  if(fs.existsSync(categoryPath)==false){
    fs.mkdirSync(categoryPath);
  }

  let fileName=path.basename(srcFilePath);
  let destFilePath=path.join(categoryPath,fileName);

  //First create a empty file and then copy the content
  fs.copyFileSync(srcFilePath,destFilePath);

  //deleting the original file
  fs.unlinkSync(srcFilePath);

  console.log(fileName," copied to ",category);
}

module.exports={
  organizeKey:organizeFn
}