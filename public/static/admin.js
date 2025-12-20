// DietMed Global - Admin Panel JavaScript

async function loadUsers(membershipType) {
  try {
    const params = membershipType ? `?membership_type=${membershipType}` : '';
    const response = await axios.get(`/api/admin/users${params}`);
    const users = response.data.users;
    
    const content = document.getElementById('adminContent');
    content.innerHTML = `
      <h3 class="text-xl font-bold text-gray-900 mb-4">
        ${membershipType === 'free' ? '무료 회원' : membershipType === 'premium' ? '프리미엄 회원' : '전체 회원'} (${users.length}명)
      </h3>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이름</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">이메일</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">휴대폰</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">회원 유형</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">가입일</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">관리</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            ${users.map(user => `
              <tr>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${user.name}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${user.email}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${user.phone}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs rounded-full ${user.membership_type === 'premium' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'}">
                    ${user.membership_type === 'premium' ? '프리미엄' : '무료'}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600">${new Date(user.created_at).toLocaleDateString('ko-KR')}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                  <button onclick="editUser('${user.user_id}')" class="text-blue-600 hover:text-blue-800">
                    <i class="fas fa-edit"></i> 수정
                  </button>
                  <button onclick="upgradeUser('${user.user_id}', '${user.membership_type}')" class="text-orange-600 hover:text-orange-800">
                    <i class="fas fa-star"></i> ${user.membership_type === 'premium' ? '다운그레이드' : '업그레이드'}
                  </button>
                  <button onclick="deleteUser('${user.user_id}')" class="text-red-600 hover:text-red-800">
                    <i class="fas fa-trash"></i> 삭제
                  </button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  } catch (error) {
    alert('회원 목록을 불러오는데 실패했습니다.');
  }
}

async function upgradeUser(userId, currentType) {
  const newType = currentType === 'premium' ? 'free' : 'premium';
  if (!confirm(`이 회원을 ${newType === 'premium' ? '프리미엄' : '무료'} 회원으로 변경하시겠습니까?`)) return;
  
  try {
    await axios.patch(`/api/admin/users/${userId}`, { membership_type: newType });
    alert('회원 유형이 변경되었습니다.');
    loadUsers();
  } catch (error) {
    alert('회원 유형 변경에 실패했습니다.');
  }
}

async function deleteUser(userId) {
  if (!confirm('정말 이 회원을 삭제하시겠습니까?')) return;
  
  try {
    await axios.delete(`/api/admin/users/${userId}`);
    alert('회원이 삭제되었습니다.');
    loadUsers();
  } catch (error) {
    alert('회원 삭제에 실패했습니다.');
  }
}

function showCreateNotice() {
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <h3 class="text-xl font-bold text-gray-900 mb-4">공지사항 등록</h3>
    <form onsubmit="handleCreateNotice(event)" class="space-y-4" enctype="multipart/form-data">
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">제목</label>
        <input type="text" name="title" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none">
      </div>
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">내용</label>
        <textarea name="content" required rows="10" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"></textarea>
      </div>
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">
          <i class="fas fa-image mr-2 text-orange-600"></i>이미지 URL (선택)
        </label>
        <input type="url" id="image_url_input" name="image_url" placeholder="https://example.com/image.jpg" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none mb-2">
        <div class="text-center my-3 text-gray-500">또는</div>
        <label class="block">
          <div class="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-lg appearance-none cursor-pointer hover:border-orange-400 focus:outline-none">
            <span class="flex items-center space-x-2">
              <i class="fas fa-upload text-orange-600"></i>
              <span class="font-medium text-gray-600">
                PC에서 이미지 업로드
              </span>
            </span>
            <input type="file" name="image_file" id="image_file" accept="image/*" class="hidden" onchange="handleImageUpload(event)">
          </div>
        </label>
        <p class="text-xs text-gray-500 mt-2" id="upload_status">JPG, PNG, GIF 형식 지원 (최대 5MB)</p>
        <div id="image_preview" class="mt-3 hidden">
          <img id="preview_img" src="" alt="미리보기" class="max-w-full h-auto rounded-lg border border-gray-300">
        </div>
      </div>
      <div>
        <label class="flex items-center">
          <input type="checkbox" name="is_published" checked class="mr-2">
          <span class="text-sm text-gray-700">즉시 게시</span>
        </label>
      </div>
      <button type="submit" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
        등록하기
      </button>
    </form>
  `;
}

// 이미지 업로드 처리
let uploadedImageUrl = '';

async function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  // 파일 크기 체크 (5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('이미지 크기는 5MB를 초과할 수 없습니다.');
    event.target.value = '';
    return;
  }

  // 파일 타입 체크
  if (!file.type.startsWith('image/')) {
    alert('이미지 파일만 업로드 가능합니다.');
    event.target.value = '';
    return;
  }

  const uploadStatus = document.getElementById('upload_status');
  uploadStatus.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>업로드 중...';

  try {
    // FormData로 파일 전송
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post('/api/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response.data.success) {
      uploadedImageUrl = response.data.image_url;
      
      // URL 입력란에 자동 입력
      document.getElementById('image_url_input').value = uploadedImageUrl;
      
      // 미리보기 표시
      const preview = document.getElementById('image_preview');
      const previewImg = document.getElementById('preview_img');
      previewImg.src = uploadedImageUrl;
      preview.classList.remove('hidden');
      
      uploadStatus.innerHTML = '<i class="fas fa-check-circle text-green-600 mr-2"></i>업로드 완료!';
    }
  } catch (error) {
    console.error('Upload error:', error);
    uploadStatus.innerHTML = '<i class="fas fa-exclamation-circle text-red-600 mr-2"></i>업로드 실패. 다시 시도해주세요.';
    event.target.value = '';
  }
}

async function handleCreateNotice(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  
  // 업로드된 이미지 URL 우선 사용
  const imageUrl = uploadedImageUrl || formData.get('image_url') || null;
  
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.textContent : '';
  
  try {
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>등록 중...';
    }
    
    const response = await axios.post('/api/admin/notices', {
      title: formData.get('title'),
      content: formData.get('content'),
      image_url: imageUrl,
      is_published: formData.get('is_published') ? 1 : 0
    });
    
    if (response.data.success) {
      alert('공지사항이 등록되었습니다.');
      uploadedImageUrl = ''; // 초기화
      loadNotices();
    } else {
      throw new Error(response.data.error || '등록 실패');
    }
  } catch (error) {
    console.error('Notice creation error:', error);
    const errorMsg = error.response?.data?.error || error.message || '공지사항 등록에 실패했습니다.';
    alert('오류: ' + errorMsg);
    
    // 버튼 복구
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }
}
window.handleCreateNotice = handleCreateNotice;
window.loadNotices = loadNotices;
window.deleteNotice = deleteNotice;

async function loadNotices() {
  try {
    const response = await axios.get('/api/admin/notices');
    const notices = response.data.notices;
    
    const content = document.getElementById('adminContent');
    content.innerHTML = `
      <h3 class="text-xl font-bold text-gray-900 mb-4">공지사항 목록 (${notices.length}개)</h3>
      <div class="space-y-4">
        ${notices.map(notice => `
          <div class="border border-gray-200 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
              <h4 class="text-lg font-bold text-gray-900">${notice.title}</h4>
              <span class="px-2 py-1 text-xs rounded-full ${notice.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                ${notice.is_published ? '게시중' : '비공개'}
              </span>
            </div>
            <p class="text-sm text-gray-600 mb-2">${notice.content.substring(0, 100)}...</p>
            <div class="flex justify-between items-center text-xs text-gray-500">
              <span><i class="fas fa-calendar mr-1"></i>${new Date(notice.created_at).toLocaleDateString('ko-KR')}</span>
              <div class="space-x-2">
                <button onclick="editNotice('${notice.notice_id}')" class="text-blue-600 hover:text-blue-800">
                  <i class="fas fa-edit"></i> 수정
                </button>
                <button onclick="deleteNotice('${notice.notice_id}')" class="text-red-600 hover:text-red-800">
                  <i class="fas fa-trash"></i> 삭제
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (error) {
    alert('공지사항 목록을 불러오는데 실패했습니다.');
  }
}

async function deleteNotice(noticeId) {
  if (!confirm('정말 이 공지사항을 삭제하시겠습니까?')) return;
  
  try {
    await axios.delete(`/api/admin/notices/${noticeId}`);
    alert('공지사항이 삭제되었습니다.');
    loadNotices();
  } catch (error) {
    alert('공지사항 삭제에 실패했습니다.');
  }
}

// 전역 함수로 명시적 노출 (인라인 onclick에서 호출 가능하도록)
window.loadUsers = loadUsers;
window.upgradeUser = upgradeUser;
window.deleteUser = deleteUser;
window.showCreateNotice = showCreateNotice;
window.handleImageUpload = handleImageUpload;
window.handleCreateNotice = handleCreateNotice;
window.loadNotices = loadNotices;
window.deleteNotice = deleteNotice;

// 페이지 로드 시 통계 표시
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await axios.get('/api/admin/stats');
    const stats = response.data.stats;
    
    console.log('Platform Statistics:', stats);
    alert(`플랫폼 통계\n\n무료 회원: ${stats.users.free}명\n프리미엄 회원: ${stats.users.premium}명\n총 회원: ${stats.users.total}명\n\n공지사항: ${stats.notices.published}/${stats.notices.total}개 게시중`);
  } catch (error) {
    console.error('Failed to load stats:', error);
  }
});
