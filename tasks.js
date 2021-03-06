const fs = require("fs"); 
 var listtask = [];  
 var filename;
 //read default file
function readDefaultFile(){
 //catch any error
 try{
// Read database.json file 
fs.readFile("database.json", 'utf8',function(err, data) { 
      
    // Check for errors 
    if (err) throw err; 
   /* no need for it since we follo the list style 
   from the part 5 BECAUSE THE QAUSTION WAS NOT CLEAR HONSLY
    // Converting to string 
   // const tasks = JSON.stringify(data); 
     */ 
    listtask = data.split(',');
    list(); // Print tasks 

}); 
 }catch(err){
   console.log("No tasks file!");

 }
}
function readFile(filename){
  
    fs.readFile(filename,'utf8',(err,data)=>{
      if (err){
        return console.log("No tasks old file! we will create a new one");
      }
      listtask = data.split(',');
      list();
    });
  

}
/*
function createNewFile(filename){

  fs.writeFileSync(filename, listtask.toString(), function (err) {
    listtask = data.split(',');
    if (err) return console.log(err);
    console.log('couldent write to file!');
  });
}*/

/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  if(process.argv[2]){
    filename = process.argv[2];
    readFile(filename);
  }else{
    filename = "database.json";
    readDefaultFile();
  }
  console.log(`Welcome to ${name}'s application!`)
  
  console.log("--------------------")
 
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  text = text.replace( /[\r\n]+/gm, "" ).trim().split(" ");
  if (text[0] === 'quit' || text[0] ==='exit') {
    quit();
  }
  else if(text[0] === 'hello'){
    hello(text[1]);
  } else if(text[0] === 'help'){
    help();
  }else if(text[0] === 'list'){
    list();
  }else if(text[0] === 'add'){
    add(text[1]);
  } else if(text[0 ]=== 'remove'){
    remove(text[1]);
  }else if (text[0] === 'edit'){
    edit(text[1]);
  }else if (text[0] === 'check'){
    check(text[1]);
  }else if (text[0] === 'uncheck'){
    unCheck(text[1]);
  }else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text){
  if(text){
    console.log('hello! ' + text);
  }else{
    console.log('hello!');
  }
}

/**
 * print all commands 
 *
 * @returns {void}
 */
function help(){
  let helpCommands = 'hello             ---> print hello \n';
  helpCommands += 'list                 ---> print all tasks \n';
  helpCommands += 'add x                ---> add a task to the list tasks \n';
  helpCommands += 'check  x/ uncheck x  ---> marck unmarck a task';
  helpCommands += 'remove / remove x    ---> remove will remove last element of tasks list / remove x will remove a certen index of array list \n';
  helpCommands += ' hello X             ---> print hello X \n';
  helpCommands += 'quit / exit          ---> exit the program \n';
  helpCommands += 'help                 ---> to show all commands can be used';
  console.log(helpCommands);
}

/**
 * print all tasks 
 *
 * @returns {void}
 */

function list(){
  for (let index = 0; index < listtask.length; index++){
    console.log(index +1 + "- " + listtask[index]);
  } 
}

/**
 * add task to tasks list 
 *
 * @returns {void}
 */
function add(task){
  if(task){
    listtask.push( "[ ] "+task);
  }else{
    throw Error('cannot add empty task!');
  }
}


/**
 * remmove task from tasks list 
 *
 * @returns {void}
 */
function remove(task){
  if(task < 0 || task > listtask.length){
    console.log("out of range!" );
    return;
  }

  if (task) {
    // fix index
    listtask.splice(task -1 , 1)
  }
  else {
    listtask.splice(listtask.length - 1, 1)
  }
}


/**
 * edit task from tasks list 
 *
 * @returns {void}
 */
function edit(task){
  if(task == "new"){
    listtask[listtask.length-1] = "new text";
  }else if(task == 1){
    listtask[1] = "new text";
  }else{
    throw Error('edit without any args!');
  }
}

// for replace and remove and insert in place
String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

/**
 * mark task as done 
 *
 * @returns {void}
 */

function check(state){
 
  if(state ){
    listtask[state-1] = listtask[state-1].splice(1,1,"✓");
  }else{
    throw Error('No task was given!');
  }
}


/**
 * mark task as not done 
 *
 * @returns {void}
 */

function unCheck(state){
 
  if(state ){
    listtask[state-1] = listtask[state-1].splice(1,1," ");
  }else{
    throw Error('eNo task was given!');
  }
}




/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
 
  fs.writeFileSync(filename, listtask.toString(), function (err) {
  if (err) return console.log(err);
  console.log('couldent write to file!');
  });
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Mostafa Onaizan")
