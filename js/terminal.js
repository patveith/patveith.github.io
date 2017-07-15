var Terminal = {};

Terminal = {
  cmdCount: 0,
  name: "patrick@veith:~$ ",
  newLine: "\npatrick@veith:~$ ",
  termId: "term-input",
  initialize: function () {
    terminalElement = document.getElementById(Terminal.termId);
    terminalElement.value = Terminal.name;
    //Sends backspace to readInput function
    $("textarea").on('keydown', function (e) {
      if (e.keyCode == 8) {
        Terminal.Input.readInput(e);
      }
    });
  },
  Input: {
    enterCode: 13,
    backspaceCode: 8,
    getTextArea: function(){
      return document.getElementById(Terminal.termId);
    },
    checkIfPrompt: function(event){
      var arr = Terminal.Input.getTextArea().value.split(Terminal.name);
      if(arr[arr.length-1] == ""){
        event.preventDefault();
      }
    },
    readInput: function(event){
      //TODO terminal history
      if (event.keyCode == Terminal.Input.enterCode) {
        var cmd = Terminal.Input.interpretInput(Terminal.Input.getTextArea().value);
        if(cmd == Terminal.Commands.clear){
          terminalElement.value = terminalElement.value + Terminal.name;
        }else{
          terminalElement.value = terminalElement.value + Terminal.newLine;
          Terminal.cmdCount++;
        }
        //Prevents line break from occuring
        event.preventDefault();
        //Scrolls down as commands are entered
        terminalElement.scrollTop = terminalElement.scrollHeight;
      }else if(event.keyCode == Terminal.Input.backspaceCode){
        Terminal.Input.checkIfPrompt(event);
      }
    },
    interpretInput: function(text){
      var arr = text.split(Terminal.newLine);
      var cmd = arr[Terminal.cmdCount];
      if(Terminal.cmdCount == 0){
        cmd = arr[Terminal.cmdCount].split(" ")[1]
      }
      switch (cmd) {
        case Terminal.Commands.help:
          Terminal.Commands.helpCommand();
          alert(cmd);
          break;
        case Terminal.Commands.cd:
          Terminal.Commands.changeDirectoryCommand();
          alert(cmd);
          break;
        case Terminal.Commands.ls:
          Terminal.Commands.listCommand();
          break;
        case Terminal.Commands.education:
          Terminal.Commands.educationScript();
          break;
        case Terminal.Commands.contact:
          Terminal.Commands.contactScript();
          break;
        case Terminal.Commands.clear:
          Terminal.Commands.clearCommand();
          break;
        default:
          Terminal.Commands.notRecognizedCommand(cmd);
      }
      return cmd;
    }
  },
  Commands: {
    help: "help",
    cd: "cd",
    ls: "ls",
    clear: "clear",
    education: "./education.sh",
    contact: "./contact.sh",
    list: ["contact.sh\t", "projects\n", "education.sh\t", "resume.pdf\n", "photos"],
    helpCommand: function(){
      //TODO lots of things related to help
    },
    changeDirectoryCommand: function(){
        //TODO changes ls command list
    },
    listCommand: function(){
      //TODO make words have highlighting, green for files, blue for directories
      var terminalElement = Terminal.Input.getTextArea();
      terminalElement.value = terminalElement.value + "\n" + Terminal.Commands.list.join("");
    },
    clearCommand: function(){
      var terminalElement = Terminal.Input.getTextArea();
      terminalElement.value = "";
      Terminal.cmdCount = 0;
    },
    notRecognizedCommand: function(cmd){
      if(cmd == ""){
        return;
      }
      var terminalElement = Terminal.Input.getTextArea();
      terminalElement.value = terminalElement.value +  "\nbash: " + cmd + ": command not found";
    },
    educationScript: function(){
      //TODO make disappear when another thing appears
      $("#education").toggle();
      //$("#education").show();
    },
    contactScript: function(){
      //TODO make disappear when another thing appears
      $("#contact").toggle();
      //$("#contact").show();
    }
  }
};
