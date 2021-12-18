import fs from "fs/promises";
import path from "path";

const dbPath = path.join(__dirname, "../data/db.json");

interface dbType {
  todos: [
    {
      id: number;
      title: string;
    }
  ];
  users: [];
}

// 取得数据库（这里用文件代替）数据
export async function getDb() {
  const data = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(data);
}

// 向文件中写入数据
export async function saveDb(db: dbType) {
  // 第三个参数是配置缩进
  const data = JSON.stringify(db, null, '  ');
  await fs.writeFile(dbPath, data);
}
