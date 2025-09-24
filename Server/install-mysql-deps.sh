#!/bin/bash

echo "正在安装MySQL依赖包..."
echo

# 删除旧的MongoDB依赖
echo "移除MongoDB相关依赖..."
npm uninstall @mikro-orm/mongodb

# 安装MySQL依赖
echo "安装MySQL依赖..."
npm install @mikro-orm/mysql

echo
echo "MySQL依赖安装完成！"
echo "请确保MySQL服务器正在运行，并执行 init-mysql.sql 来初始化数据库。"
echo
