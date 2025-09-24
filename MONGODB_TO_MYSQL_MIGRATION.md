# MongoDB到MySQL迁移完成报告

## 迁移概述

已成功将Cocos MMO项目从MongoDB数据库迁移到MySQL数据库。以下是完成的所有更改：

## 主要更改

### 1. 依赖包更新
- **移除**: `@mikro-orm/mongodb`
- **添加**: `@mikro-orm/mysql`

### 2. 数据库配置更改
- **文件**: `Server/src/config/mikro-orm.config.ts`
- **更改**: 数据库类型从 `mongo` 改为 `mysql`
- **添加**: MySQL连接参数（主机、端口、用户、密码等）

### 3. 实体模型更新
- **文件**: `Server/src/entities/BaseEntity.ts`
- **更改**: 主键从MongoDB的ObjectId改为MySQL的自增整数ID
- **移除**: MongoDB特定的导入和字段

- **文件**: `Server/src/entities/UserEntity.ts`
- **更改**: 将复杂对象字段（Position、Rotation、AvatarState）扁平化为单独的数据库字段
- **新增字段**:
  - 位置: `positionX`, `positionY`, `positionZ`
  - 旋转: `rotationX`, `rotationY`, `rotationZ`, `rotationW`
  - 头像: `avatarSkinColor`, `avatarShirtColor`, `avatarPantsColor`, `avatarHatColor`, `avatarHatChoice`

### 4. 业务逻辑更新
- **文件**: `Server/src/rooms/MMORoom.ts`
- **更改**: 更新所有处理用户数据的代码以使用新的扁平化字段结构
- **移除**: 不再需要的Position和Rotation导入

### 5. 环境配置更新
- **文件**: `Server/arena.env` 和 `Server/development.env`
- **更改**: 数据库连接字符串从MongoDB格式改为MySQL格式

### 6. 数据库连接逻辑
- **文件**: `Server/src/config/database.config.ts`
- **更改**: 添加MySQL连接字符串解析逻辑

## 新增文件

1. **`Server/init-mysql.sql`** - MySQL数据库初始化脚本
2. **`Server/MYSQL_SETUP.md`** - MySQL设置指南
3. **`Server/install-mysql-deps.bat`** - Windows依赖安装脚本
4. **`Server/install-mysql-deps.sh`** - Linux/Mac依赖安装脚本

## 设置步骤

### 1. 安装MySQL依赖
```bash
cd Server
# Windows
install-mysql-deps.bat

# Linux/Mac
./install-mysql-deps.sh
```

### 2. 设置MySQL数据库
```bash
# 创建数据库和表
mysql -u root -p < init-mysql.sql
```

### 3. 配置环境变量
确保 `Server/development.env` 和 `Server/arena.env` 中的数据库连接信息正确。

### 4. 启动服务器
```bash
npm start
```

## 注意事项

1. **数据迁移**: 如果项目中有现有数据，需要手动迁移数据到新的MySQL表结构
2. **字段映射**: 复杂对象已扁平化为单独字段，确保客户端代码也相应更新
3. **性能**: MySQL使用关系型结构，查询性能可能与MongoDB不同
4. **备份**: 在部署到生产环境前，请确保备份所有数据

## 验证清单

- [ ] MySQL服务器正在运行
- [ ] 数据库和表已创建
- [ ] 环境变量配置正确
- [ ] 依赖包已安装
- [ ] 服务器启动成功
- [ ] 用户认证功能正常
- [ ] 游戏房间功能正常

## 回滚计划

如果需要回滚到MongoDB：
1. 恢复原始的package.json
2. 恢复原始的配置文件
3. 恢复原始的实体模型
4. 重新安装MongoDB依赖

迁移已完成！请按照上述步骤进行设置和验证。
