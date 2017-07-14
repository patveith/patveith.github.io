var Terminal = {};

Terminal = {
  cmdCount: 0,
  name: "patrick@veith:~$ ",
  newLine: "\npatrick@veith:~$ ",
  termId: "term-input",
  initialize: function () {
    terminalElement = document.getElementById(Terminal.termId);
    terminalElement.value = Terminal.name;
  },
  Input: {
    enterCode: 13,
    readInput: function(event){
      //TODO needs to prevent backspace from deleting prompt
      //TODO terminal history
      if (event.keyCode === Terminal.Input.enterCode) {
        terminalElement = document.getElementById(Terminal.termId);
        inputCmd = terminalElement.value;
        Terminal.Input.interpretInput(inputCmd);
        Terminal.cmdCount++;
        terminalElement.value = terminalElement.value + Terminal.newLine;
        //Prevents line break from occuring
        if(event.preventDefault){
          event.preventDefault();
        }
        //Scrolls down as commands are entered
        terminalElement.scrollTop = terminalElement.scrollHeight;
      }
    },
    interpretInput: function(line){
      var cmd = line.split(Terminal.newLine)[Terminal.cmdCount];
      if(Terminal.cmdCount == 0){
        cmd = line.split(Terminal.newLine)[Terminal.cmdCount].split(" ")[1]
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
          //alert("TEST" + cmd + "TEST");
      }
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
      terminalElement = document.getElementById(Terminal.termId);
      terminalElement.value = terminalElement.value + "\n" + Terminal.Commands.list.join("");
    },
    clearCommand: function(){
      terminalElement = document.getElementById(Terminal.termId);
      terminalElement.value = "";
      Terminal.cmdCount = 0;
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
