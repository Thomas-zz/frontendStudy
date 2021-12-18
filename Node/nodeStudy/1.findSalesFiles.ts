{
  const fs = require("fs").promises;

  async function main(): Promise<void> {
    let result = await findSalesFiles("stores");
    console.log(result);
  }
  
  main();
  
  async function findSalesFiles(folderName: string): Promise<string[]> {
    let salesFile:string[] = [];
  
    const items = await fs.readdir(folderName, { withFileTypes: true });
  
    for (const item of items) {
      if (item.isDirectory()) {
        salesFile = salesFile.concat(
          await findSalesFiles(`${folderName}/${item.name}`)
        );
      } else {
        // 如果是我们要找的目标文件
        if (item.name === "findFile.json") {
          salesFile.push(`${folderName}/${item.name}`);
        }
      }
    }
    return salesFile;
  }
}
