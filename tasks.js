var listtask = ['[ ] excersice','[✓] sleep'];
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
  let helpCommands = 'hello     ---> print hello \n';
  helpCommands += 'list         ---> print all tasks \n';
  helpCommands += 'add x        ---> add a task to the list tasks \n';
  helpCommands += 'remove / remove x  remove will remove last element of tasks list / remove x will remove a certen index of array list \n';
  helpCommands += ' hello X     ---> print hello X \n';
  helpCommands += 'quit / exit  ---> exit the program \n';
  helpCommands += 'help         ---> to show all commands can be used';
  console.log(helpCommands);
}

/**
 * print all tasks 
 *
 * @returns {void}
 */

function list(){
  for (let index = 0; index < listtask.length; index++){
    console.log(index + "- " + listtask[index]);
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
  if(task !=1 && task != 2 && task){
    console.log("out of range!" );
    return;
  }

  if(task == 1){
    listtask.shift();
  }else if(task == 2){
    listtask.splice(1,1)
  }else{
    listtask.pop();
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

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Mostafa Onaizan")
