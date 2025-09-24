-- MySQL数据库初始化脚本
-- 为Cocos MMO项目创建数据库和表结构

-- 创建数据库
CREATE DATABASE IF NOT EXISTS TechDemo4 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 使用数据库
USE TechDemo4;

-- 创建用户表
CREATE TABLE IF NOT EXISTS user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    pending_session_id VARCHAR(255),
    pending_session_timestamp BIGINT,
    active_session_id VARCHAR(255),
    progress VARCHAR(50) DEFAULT '0,0',
    prev_grid VARCHAR(50) DEFAULT '0,0',
    position_x FLOAT,
    position_y FLOAT,
    position_z FLOAT,
    rotation_x FLOAT,
    rotation_y FLOAT,
    rotation_z FLOAT,
    rotation_w FLOAT,
    avatar_skin_color VARCHAR(50),
    avatar_hair_color VARCHAR(50),
    avatar_hair_style VARCHAR(50),
    avatar_face_hair VARCHAR(50),
    avatar_eyebrows VARCHAR(50),
    avatar_eyes VARCHAR(50),
    avatar_mouth VARCHAR(50),
    avatar_facial_hair VARCHAR(50),
    avatar_tattoo VARCHAR(50),
    avatar_eyewear VARCHAR(50),
    avatar_headwear VARCHAR(50),
    avatar_outfit VARCHAR(50),
    avatar_gloves VARCHAR(50),
    avatar_shoes VARCHAR(50),
    avatar_accessories VARCHAR(50),
    coins INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 创建索引以提高查询性能
CREATE INDEX idx_username ON user(username);
CREATE INDEX idx_email ON user(email);
CREATE INDEX idx_active_session_id ON user(active_session_id);
CREATE INDEX idx_pending_session_id ON user(pending_session_id);
