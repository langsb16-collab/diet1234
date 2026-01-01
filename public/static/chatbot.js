// 챗봇 로직 - FAQ 리스트 방식
document.addEventListener('DOMContentLoaded', function() {
  let currentLang = 'ko';

  const chatbotIcon = document.getElementById('chatbotIcon');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const closeChatbot = document.getElementById('closeChatbot');
  const chatMessagesEl = document.getElementById('chatMessages');
  const langBtns = document.querySelectorAll('.lang-btn');
  
  if (!chatbotIcon || !chatbotWindow) {
    console.error('Chatbot elements not found');
    return;
  }
  
  // 챗봇 열기/닫기
  chatbotIcon.addEventListener('click', () => {
    chatbotWindow.classList.remove('hidden');
    chatbotIcon.style.display = 'none';
    showFAQList();
  });
  
  closeChatbot.addEventListener('click', () => {
    chatbotWindow.classList.add('hidden');
    chatbotIcon.style.display = 'flex';
  });
  
  // 언어 변경
  langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      changeChatbotLanguage(lang);
    });
  });
  
  function changeChatbotLanguage(lang) {
    currentLang = lang;
    
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    const data = window.chatbotData[lang];
    document.getElementById('chatbotTitle').textContent = data.title;
    document.getElementById('statusText').textContent = data.status;
    
    showFAQList();
  }
  
  function showFAQList() {
    const data = window.chatbotData[currentLang];
    
    chatMessagesEl.innerHTML = `
      <div class="message bot-message">
        <div class="bot-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
          <div class="message-text">
            ${data.welcome.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
      <div style="padding: 16px;">
        <div style="font-weight: 600; font-size: 16px; color: #1C1C1E; margin-bottom: 12px;">
          <i class="fas fa-list-ul" style="color: #FF6B35; margin-right: 8px;"></i>
          ${data.faqTitle || 'FAQ'}
        </div>
        ${data.qa.slice(0, 9).map((item, index) => `
          <div class="faq-item" onclick="window.showFAQAnswer(${index})" style="background: white; padding: 14px 16px; margin-bottom: 8px; border-radius: 12px; cursor: pointer; border: 1px solid #E5E5EA; transition: all 0.2s;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="flex: 1;">
                <div style="font-size: 14px; font-weight: 600; color: #1C1C1E; margin-bottom: 4px;">
                  ${item.question || item.keywords[0]}
                </div>
                <div style="font-size: 12px; color: #6E6E73;">
                  ${item.preview || item.answer.substring(0, 50) + '...'}
                </div>
              </div>
              <i class="fas fa-chevron-right" style="color: #FF6B35; font-size: 12px;"></i>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    
    chatMessagesEl.scrollTop = 0;
  }
  
  window.showFAQAnswer = function(index) {
    const data = window.chatbotData[currentLang];
    const item = data.qa[index];
    
    chatMessagesEl.innerHTML = `
      <div style="padding: 16px;">
        <button onclick="window.showFAQList()" style="background: transparent; border: none; color: #FF6B35; font-size: 14px; font-weight: 600; cursor: pointer; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
          <i class="fas fa-arrow-left"></i>
          ${data.backText || '목록으로'}
        </button>
        
        <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #E5E5EA;">
          <div style="font-size: 16px; font-weight: 600; color: #1C1C1E; margin-bottom: 16px; display: flex; align-items: center; gap: 8px;">
            <i class="fas fa-question-circle" style="color: #FF6B35;"></i>
            ${item.question || item.keywords[0]}
          </div>
          
          <div style="font-size: 14px; line-height: 1.6; color: #1C1C1E;">
            ${item.answer.replace(/\n/g, '<br>')}
          </div>
        </div>
      </div>
    `;
    
    chatMessagesEl.scrollTop = 0;
  };
  
  window.showFAQList = showFAQList;
  
  showFAQList();
});
