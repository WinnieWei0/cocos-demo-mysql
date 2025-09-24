const mysql = require('mysql2/promise');

async function testConnection() {
    console.log('正在测试MySQL连接...\n');
    
    // 测试不同的连接配置
    const configs = [
        { name: '无密码root用户', user: 'root', password: '' },
        { name: '密码为password的root用户', user: 'root', password: 'password' },
        { name: '密码为123456的root用户', user: 'root', password: '123456' },
        { name: '密码为root的root用户', user: 'root', password: 'root' },
        { name: '密码为admin的root用户', user: 'root', password: 'admin' }
    ];
    
    for (const config of configs) {
        try {
            console.log(`测试: ${config.name}...`);
            const connection = await mysql.createConnection({
                host: 'localhost',
                port: 3306,
                user: config.user,
                password: config.password
            });
            
            console.log(`✅ 成功连接! 用户: ${config.user}, 密码: ${config.password || '(无密码)'}`);
            
            // 测试数据库是否存在
            const [databases] = await connection.execute('SHOW DATABASES');
            const dbExists = databases.some(db => db.Database === 'TechDemo4');
            
            if (dbExists) {
                console.log('✅ TechDemo4数据库已存在');
            } else {
                console.log('⚠️  TechDemo4数据库不存在，需要创建');
            }
            
            await connection.end();
            console.log('连接已关闭\n');
            
            // 如果连接成功，更新配置文件
            updateConfigFiles(config.user, config.password);
            return;
            
        } catch (error) {
            console.log(`❌ 连接失败: ${error.message}\n`);
        }
    }
    
    console.log('所有配置都连接失败。请检查：');
    console.log('1. MySQL服务器是否正在运行');
    console.log('2. 端口3306是否可访问');
    console.log('3. 用户权限是否正确');
}

function updateConfigFiles(user, password) {
    const fs = require('fs');
    const path = require('path');
    
    // 更新development.env
    const devEnvPath = path.join(__dirname, 'development.env');
    const devEnvContent = `NODE_ENV=development\nDEMO_DATABASE=mysql://${user}:${password}@localhost:3306/TechDemo4`;
    fs.writeFileSync(devEnvPath, devEnvContent);
    console.log('✅ 已更新 development.env');
    
    // 更新arena.env
    const arenaEnvPath = path.join(__dirname, 'arena.env');
    const arenaEnvContent = `NODE_ENV=production\nDEMO_DATABASE=mysql://${user}:${password}@localhost:3306/TechDemo4`;
    fs.writeFileSync(arenaEnvPath, arenaEnvContent);
    console.log('✅ 已更新 arena.env');
    
    // 更新mikro-orm.config.ts
    const configPath = path.join(__dirname, 'src', 'config', 'mikro-orm.config.ts');
    let configContent = fs.readFileSync(configPath, 'utf8');
    configContent = configContent.replace(/user: '[^']*'/, `user: '${user}'`);
    configContent = configContent.replace(/password: '[^']*'/, `password: '${password}'`);
    fs.writeFileSync(configPath, configContent);
    console.log('✅ 已更新 mikro-orm.config.ts');
}

// 运行测试
testConnection().catch(console.error);
