// const fs = require("fs").promises;
import * as fs from "fs/promises";
import path from "path";
{
  async function main(): Promise<void> {
    const salesDir = path.join(__dirname, "stores")
    const salesTotalsDir = path.join(__dirname, "salesTotals")

    // 我们不能创建已经存在的目录，用try...catch包起来
    try{
      await fs.mkdir(salesTotalsDir);
    }catch{
      console.log(`${salesTotalsDir} already exists`)
    }

    const salesFiles = await findSalesFiles(salesDir);

    const reportPath = path.join(salesTotalsDir, "report.json")

    try{
      // 删除文件或符号链接，显然我们不能删除不存在的文件
      await fs.unlink(reportPath)
    }catch{
      console.log(`Failed to remove ${reportPath}`)
    }
    // 异步地写入文件，如果文件已存在则替换该文件
    await fs.writeFile(reportPath, "")
    console.log(`Sales report written to ${salesTotalsDir}`)
  }
  main();

  async function findSalesFiles(folderName: string): Promise<string[]> {
    let salesFile: string[] = [];

    const items = await fs.readdir(folderName, { withFileTypes: true });
    for (const item of items) {
      if (item.isDirectory()) {
        salesFile = salesFile.concat(
          await findSalesFiles(path.join(folderName, item.name))
        );
      } else {
        // 如果文件后缀是我们要找的目标文件
        if (path.extname(item.name)===".json") {
          salesFile.push(path.join(folderName, item.name));
        }
      }
    }
    return salesFile;
  }
}
