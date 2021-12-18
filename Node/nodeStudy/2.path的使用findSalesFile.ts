// const fs = require("fs").promises;
import * as fs from "fs/promises";
import path from "path";
{
  async function main(): Promise<void> {
    // path可以帮我们解析路径，适配不同操作系统（不同操作系统可能/\不同）
    // __dirname:运行目录，在哪个目录运行的
    console.log(await findSalesFiles(path.join(__dirname, "stores")));
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
