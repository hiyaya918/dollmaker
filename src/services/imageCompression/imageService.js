import Compress from 'compress.js';

const compress = new Compress();

// 压缩图片并返回 base64 字符串
export const compressImage = async (file) => {
  try {
    const results = await compress.compress([file], {
      size: 2, // 目标文件大小（MB）
      quality: 0.75, // 图像质量 (0 到 1)
      maxWidth: 1200, // 最大宽度
      maxHeight: 1200, // 最大高度
      resize: true // 调整大小以符合最大尺寸
    });

    const img = results[0];
    const base64str = img.data;
    const imgExt = img.ext;
    const dataUrl = `data:image/${imgExt};base64,${base64str}`;

    return {
      success: true,
      dataUrl,
      info: {
        originalSize: formatFileSize(file.size),
        compressedSize: formatFileSize(calculateBase64Size(base64str)),
        type: file.type,
        name: file.name
      }
    };
  } catch (error) {
    console.error('压缩图片时出错:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// 计算 base64 字符串的大小（字节）
const calculateBase64Size = (base64String) => {
  const padding = base64String.endsWith('==') ? 2 : base64String.endsWith('=') ? 1 : 0;
  return (base64String.length * 3) / 4 - padding;
};

// 格式化文件大小显示
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 验证图片文件类型和大小
export const validateImage = (file, maxSizeMB = 5) => {
  // 检查文件类型
  if (!file.type.match('image.*')) {
    return {
      valid: false,
      error: '请上传图片文件（JPG、PNG等）'
    };
  }

  // 检查文件大小
  const maxSize = maxSizeMB * 1024 * 1024; // 转换为字节
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `文件太大，请上传小于${maxSizeMB}MB的照片`
    };
  }

  return {
    valid: true
  };
}; 