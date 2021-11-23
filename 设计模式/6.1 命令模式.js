// 宏命令，一组命令的集合，可以一次执行一批命令

// 首先创建好各种Command（命令对象）
let closeDoorCommand = {
  execute: function () {
    console.log("关门");
  },
};

let openLightCommand = {
  execute: function () {
    console.log("开灯");
  },
};

let openPcCommand = {
  execute: function () {
    console.log("开电脑");
  },
};

// 定义宏命令MacroCommand
let MacroCommand = function () {
  return {
    commandsList: [],
    // 把子命令添加进宏命令对象
    add: function (command) {
      this.commandsList.push(command);
    },
    // 迭代这一组子命令对象，并且依次执行它们的 execute 方法
    execute: function () {
      this.commandsList.forEach((command) => {
        command.execute();
      });
    },
  };
};

let macroCommand = MacroCommand();
// 添加命令
macroCommand.add(closeDoorCommand);
macroCommand.add(openLightCommand);
macroCommand.add(openPcCommand);

// 一次执行
macroCommand.execute();
