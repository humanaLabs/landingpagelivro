"use client";

import { useState } from "react";
import Image from "next/image";
import { useI18n } from "../../../lib/i18n";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { t, locale } = useI18n();

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div key={locale}>
      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 right-4 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col">
          {/* Chat Header */}
          <div className="bg-black text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-white flex items-center justify-center">
                <Image
                  src="/balaodemensagem.png"
                  alt="Chat"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-design-button ">{t('chat.title')}</div>
              </div>
            </div>
            
            <button 
              onClick={toggleChat}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto">
            <div className="space-y-4">
              {/* User Message */}
              <div className="flex justify-end">
                <div className="bg-gray-600 text-white px-4 py-2 rounded-full max-w-xs">
                  <div className="text-design-button ">{t('chat.userMessage')}</div>
                </div>
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center ml-2 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Bot Response */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/fotoeduardo.png"
                    alt="Eduardo Ibrahim"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg max-w-xs">
                  <div className="text-design-button  text-gray-800">{t('chat.botResponse')}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex space-x-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('chat.placeholder')}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-full text-design-button  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <button className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-5 right-4 w-12 h-12 rounded-full shadow-xl flex items-center justify-center z-50 transition-all duration-300 overflow-hidden ${
          isOpen 
            ? 'bg-gray-800' 
            : 'bg-white hover:bg-gray-50 border-2 border-gray-200'
        }`}
      >
        {isOpen ? (
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <Image
            src="/balaodemensagem.png"
            alt="Chat - Balão de Conversa"
            width={28}
            height={28}
            className="object-contain"
          />
        )}
      </button>
    </div>
  );
} 