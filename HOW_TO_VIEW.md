# 如何查看网站

## 重要提示

由于浏览器的安全限制，**不能直接双击打开 `index.html` 文件**。必须使用本地服务器来查看网站。

## 方法 1: 使用 Python（推荐）

1. 确保已安装 Python 3
2. 双击运行 `START_SERVER.bat`
3. 在浏览器中打开: http://localhost:8000

## 方法 2: 使用 VS Code Live Server

1. 在 VS Code 中打开项目文件夹
2. 安装 "Live Server" 扩展
3. 右键点击 `index.html`，选择 "Open with Live Server"

## 方法 3: 使用其他本地服务器

### Node.js (http-server)
```bash
npx http-server -p 8000
```

### PHP
```bash
php -S localhost:8000
```

## 为什么需要本地服务器？

浏览器出于安全考虑，不允许 JavaScript 通过 `fetch()` 直接加载本地 JSON 文件（CORS 限制）。使用本地服务器可以绕过这个限制。

## 故障排除

如果文章仍然不显示：

1. 打开浏览器开发者工具（F12）
2. 查看 Console 标签页，检查是否有错误信息
3. 查看 Network 标签页，确认 `articles.json` 是否成功加载
4. 确保所有文件都在同一目录下：
   - index.html
   - script.js
   - styles.css
   - articles.json




