# 图片水印去除工具 Image Watermark Remover

一个专注图片水印清理的开源网页应用。界面经过重新设计，提供“上传 → 涂抹 → 去除水印”的简单流程，支持 LaMa、PowerPaint 等多种模型，既可以在浏览器里交互式操作，也可以在命令行批处理。

> ❗️项目基于 [IOPaint](https://github.com/Sanster/IOPaint) 深度定制，感谢原作者的出色工作。

---

## ✨ 主要功能

- **全新 Web UI**：浮动工具栏、右侧步骤向导，适合非技术用户快速上手。
- **多模型支持**：默认使用 LaMa，亦可切换 PowerPaint、BrushNet 等扩散模型，处理复杂或整幅水印。
- **所见即所得涂抹**：画笔尺寸随时调节，支持撤销 / 重做 / 原图对比 / 结果下载。
- **粘贴即可导入**：支持拖拽、点击上传、粘贴截图，最大 20MB。
- **命令行批处理**：同一套后端 API，可在脚本中成批清理水印。
- **本地部署**：模型与推理由本地完成，素材不上传云端，更方便处理敏感图片。

---

## 🚀 快速开始

### 1. 克隆项目并安装依赖

```bash
git clone https://github.com/orange-cmyk/image-watermark-remover.git
cd image-watermark-remover

# 建议使用 Python 3.10+
python3 -m venv .venv
source .venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt
```

### 2. 构建前端

```bash
cd web_app
npm install
npm run build
cd ..

# 将编译结果复制到后端静态目录
cp -r web_app/dist iopaint/web_app
```

### 3. 启动服务

```bash
python main.py start --model lama --device cpu --port 8080
```

浏览器访问 <http://127.0.0.1:8080> 就能使用新版 UI。首次启动会自动下载所选模型权重（LaMa 约 200 MB）。

---

## 🖱️ 网页使用流程

1. **上传图片**：拖拽 / 点击上传 / 直接粘贴截图。
2. **涂抹水印区域**：按住鼠标左键涂抹，右下角滑杆可以调整画笔尺寸。
3. **点击「去除水印」**：等待模型处理完成后，可查看对比、撤销或下载结果。
4. **重新选择**：如需重新涂抹，点击“重新开始涂抹”即可清空当前 mask。

---

## 🧠 模型切换

- **LaMa**：速度快、资源占用低，适合一般场景。
- **PowerPaint**：基于扩散模型，适合整幅水印或复杂结构，推荐在 GPU 上使用。

切换模型示例：

```bash
python main.py start --model powerpaint --device cpu --port 8080
# 或在具备 CUDA 的机器上：
python main.py start --model powerpaint --device cuda --port 8080
```

更多可用模型可执行 `python main.py list` 查看。

---

## 🛠️ 命令行批处理

```bash
python main.py run --model lama --device cpu \
  --image /path/to/images \
  --mask /path/to/masks \
  --output /path/to/output
```

- `--image`：图片路径或目录。
- `--mask`：与图片同名的掩膜图片；若提供单个 mask 会应用到所有图片。
- `--output`：输出目录或文件。

---

## 🧑‍💻 开发模式

前端热更新：

```bash
cd web_app
npm run dev
# VITE_BACKEND 默认为 http://127.0.0.1:8080，可在 web_app/.env.local 中修改
```

后端代码修改后需要重新启动 `python main.py start ...`。

---

## 📜 License & 致谢

- 本项目在 Apache-2.0 协议下发布。
- 参考与使用的主要上游项目：
  - [IOPaint](https://github.com/Sanster/IOPaint)
  - [LaMa](https://github.com/saic-mdal/lama)
  - [PowerPaint](https://github.com/huggingface/diffusers)

欢迎提交 Issue / PR，一起把去水印体验做得更好。 🎨
