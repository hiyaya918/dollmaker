import emailjs from 'emailjs-com';

// 初始化 EmailJS
export const initEmailService = () => {
  const userId = process.env.REACT_APP_EMAILJS_USER_ID;
  if (userId) {
    emailjs.init(userId);
  } else {
    console.error('EmailJS User ID 未设置。请在.env文件中设置REACT_APP_EMAILJS_USER_ID');
  }
};

// 发送表单数据到管理员邮箱
export const sendFormToAdmin = async (formData) => {
  try {
    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    
    if (!serviceId || !templateId) {
      throw new Error('EmailJS 配置缺失。请检查.env文件中的REACT_APP_EMAILJS_SERVICE_ID和REACT_APP_EMAILJS_TEMPLATE_ID');
    }
    
    // 准备要发送的数据
    const templateParams = {
      to_email: process.env.REACT_APP_ADMIN_EMAIL,
      from_name: formData.name || '用户',
      from_email: formData.email,
      style: formData.style,
      scene: formData.scene,
      image: formData.image, // Base64编码的图片
      notes: formData.notes || '无',
      submission_date: new Date().toLocaleString('zh-CN')
    };
    
    // 发送邮件
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );
    
    return {
      success: true,
      message: '请求已成功发送！',
      response
    };
  } catch (error) {
    console.error('发送邮件时出错:', error);
    return {
      success: false,
      message: `发送失败: ${error.message}`,
      error
    };
  }
};

// 验证电子邮箱格式
export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}; 