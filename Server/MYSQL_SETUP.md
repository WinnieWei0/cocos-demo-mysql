# MySQL数据库设置指南

## 前提条件

1. 安装MySQL服务器 (推荐版本 8.0+)
2. 确保MySQL服务正在运行

## 数据库设置步骤

### 1. 安装MySQL依赖

```bash
cd Server
npm install
```

### 2. 创建数据库和表

运行以下命令来初始化数据库：

```bash
mysql -u root -p < init-mysql.sql
```

或者手动在MySQL客户端中执行 `init-mysql.sql` 文件中的SQL语句。

### 3. 配置环境变量

确保你的环境变量文件包含正确的MySQL连接信息：

**development.env:**
```
NODE_ENV=development
DEMO_DATABASE=mysql://root:123456@localhost:3306/TechDemo4
```

**arena.env:**
```
NODE_ENV=production
DEMO_DATABASE=mysql://root:123456@localhost:3306/TechDemo4
```

### 4. 修改连接参数

根据你的MySQL设置，修改以下参数：
- `root`: 数据库用户名
- `password`: 数据库密码
- `localhost`: 数据库主机地址
- `3306`: 数据库端口
- `TechDemo4`: 数据库名称

### 5. 启动服务器

```bash
npm start
```

## 主要变更

1. **数据库类型**: 从MongoDB改为MySQL
2. **主键类型**: 从ObjectId改为自增整数ID
3. **依赖包**: 从`@mikro-orm/mongodb`改为`@mikro-orm/mysql`
4. **连接配置**: 使用MySQL连接字符串格式

## 注意事项

- 确保MySQL服务器正在运行
- 检查防火墙设置，确保端口3306可访问
- 如果使用不同的MySQL用户，请相应修改连接字符串
- 建议在生产环境中使用更安全的数据库用户和密码
