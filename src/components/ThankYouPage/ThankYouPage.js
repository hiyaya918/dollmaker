import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = ({ email }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-dark mb-2">请求已提交成功！</h2>
        <p className="text-gray-600 mb-4">我们已收到您的人偶形象请求，正在处理中...</p>
        
        <div className="bg-light p-4 rounded-lg mb-6">
          <p className="text-gray-700 mb-2">我们将尽快把您的人偶形象发送至：</p>
          <p className="text-primary font-medium">{email}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-dark mb-3">接下来会发生什么？</h3>
          <ol className="text-left text-gray-600 space-y-3">
            <li className="flex items-start">
              <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full mr-2 text-sm">1</span>
              <span>我们的设计师将开始处理您的照片和选择</span>
            </li>
            <li className="flex items-start">
              <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full mr-2 text-sm">2</span>
              <span>根据您选择的风格和场景制作完美的人偶形象</span>
            </li>
            <li className="flex items-start">
              <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 bg-primary text-white rounded-full mr-2 text-sm">3</span>
              <span>完成后，我们会通过电子邮件发送您的人偶形象</span>
            </li>
          </ol>
        </div>
        
        <p className="text-sm text-gray-500 mb-6">处理通常需要1-2个工作日。如果您有任何问题，请通过邮箱 contact@example.com 联系我们。</p>
        
        <Link to="/" className="inline-block bg-secondary hover:bg-secondary/90 text-white font-medium px-6 py-3 rounded-lg transition-colors">
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage; 