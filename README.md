# 柏林


- [测试/线上地址](http://www.mdguanjia.com/FHT_BOP/index.html)      
- 暂时测试/线上环境通过hosts文件配置，具体域名联系Bolin

## 开发
```bash
	# 克隆项目
	git clone https://github.com/BolinWang/FT_EEOP.git

	# 安装依赖
	npm install
	   
	# 建议不要用cnpm安装 会有各种诡异的bug 可以通过如下操作解决 npm 下载速度慢的问题
	npm install --registry=https://registry.npm.taobao.org

	# 启动服务
	npm run dev
```
浏览器访问 http://localhost:9528

## 发布
```bash
	# 构建测试环境
	npm run build:sit

	# 构建生成环境
	npm run build:prod
```


更多信息请联系Bolin


## License

MIT