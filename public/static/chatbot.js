// 챗봇 로직
(function() {
  let currentLang = 'ko';
  let chatMessages = [];

  // DOM 요소
  const chatbotIcon = document.getElementById('chatbotIcon');
  const chatbotWindow = document.getElementById('chatbotWindow');
  const closeChatbot = document.getElementById('closeChatbot');
  const chatMessagesEl = document.getElementById('chatMessages');
  const userInput = document.getElementById('userInput');
  const sendBtn = document.getElementById('sendBtn');
  const quickReplies = document.getElementById('quickReplies');
  const typingIndicator = document.getElementById('typingIndicator');
  
  // 언어 버튼들
  const langBtns = document.querySelectorAll('.lang-btn');
  
  // 챗봇 열기/닫기
  chatbotIcon.addEventListener('click', () => {
    chatbotWindow.classList.remove('hidden');
    chatbotIcon.style.display = 'none';
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
    
    // 언어 버튼 active 상태 변경
    langBtns.forEach(btn => {
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    
    // UI 텍스트 업데이트
    const data = window.chatbotData[lang];
    document.getElementById('chatbotTitle').textContent = data.title;
    document.getElementById('statusText').textContent = data.status;
    document.getElementById('welcomeMessage').innerHTML = data.welcome.replace(/\n/g, '<br>');
    userInput.placeholder = data.placeholder;
    
    // 빠른 답변 업데이트
    updateQuickReplies();
  }
  
  // 빠른 답변 업데이트
  function updateQuickReplies() {
    const data = window.chatbotData[currentLang];
    quickReplies.innerHTML = data.quickReplies.map(text => 
      `<button class="quick-reply-btn" onclick="window.sendQuickReply('${text}')">${text}</button>`
    ).join('');
  }
  
  // 빠른 답변 전송
  window.sendQuickReply = function(text) {
    userInput.value = text;
    sendMessage();
  };
  
  // 메시지 전송
  function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;
    
    // 사용자 메시지 추가
    addMessage(message, 'user');
    userInput.value = '';
    userInput.style.height = 'auto';
    
    // 타이핑 인디케이터 표시
    showTypingIndicator();
    
    // 봇 응답 (1초 후)
    setTimeout(() => {
      hideTypingIndicator();
      const answer = getAutoResponse(message);
      addMessage(answer, 'bot');
    }, 1000);
  }
  
  // 자동 응답 생성
  function getAutoResponse(userMessage) {
    const data = window.chatbotData[currentLang];
    const lowerMessage = userMessage.toLowerCase();
    
    // 키워드 매칭
    for (const qa of data.qa) {
      for (const keyword of qa.keywords) {
        if (lowerMessage.includes(keyword.toLowerCase())) {
          return qa.answer;
        }
      }
    }
    
    // 기본 응답
    return data.defaultResponse;
  }
  
  // 메시지 추가
  function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const now = new Date();
    const timeStr = now.toLocaleTimeString(currentLang, { hour: '2-digit', minute: '2-digit' });
    
    if (type === 'bot') {
      messageDiv.innerHTML = `
        <div class="bot-avatar">
          <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
          <div class="message-text">${text.replace(/\n/g, '<br>')}</div>
          <div class="message-time">${timeStr}</div>
        </div>
      `;
    } else {
      messageDiv.innerHTML = `
        <div class="message-content">
          <div class="message-text">${text}</div>
          <div class="message-time">${timeStr}</div>
        </div>
      `;
    }
    
    chatMessagesEl.appendChild(messageDiv);
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  }
  
  // 타이핑 인디케이터
  function showTypingIndicator() {
    typingIndicator.classList.remove('hidden');
    chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  }
  
  function hideTypingIndicator() {
    typingIndicator.classList.add('hidden');
  }
  
  // 전송 버튼 클릭
  sendBtn.addEventListener('click', sendMessage);
  
  // Enter 키 전송 (Shift+Enter는 줄바꿈)
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
  // 텍스트 영역 자동 높이 조절
  userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 100) + 'px';
  });
  
  // 초기화
  updateQuickReplies();
  
})();
