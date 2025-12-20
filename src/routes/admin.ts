import { Hono } from 'hono';
import type { Env } from '../types';

const admin = new Hono<{ Bindings: Env }>();

// 관리자 인증 미들웨어 (주소만 알면 접속 가능 - 보안 주의!)
// 실제 프로덕션에서는 IP 화이트리스트 또는 별도 인증 추가 권장

// 회원 목록 조회
admin.get('/users', async (c) => {
  const { env } = c;
  const membershipType = c.req.query('membership_type'); // 'free' or 'premium'
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '50');
  const offset = (page - 1) * limit;

  let query = 'SELECT user_id, email, name, phone, membership_type, created_at, last_login_at, is_active FROM users';
  let countQuery = 'SELECT COUNT(*) as total FROM users';
  const params: any[] = [];

  if (membershipType && (membershipType === 'free' || membershipType === 'premium')) {
    query += ' WHERE membership_type = ?';
    countQuery += ' WHERE membership_type = ?';
    params.push(membershipType);
  }

  query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

  const users = await env.DB.prepare(query)
    .bind(...params, limit, offset)
    .all();

  const countResult = await env.DB.prepare(countQuery)
    .bind(...params)
    .first() as { total: number };

  return c.json({
    success: true,
    users: users.results,
    pagination: {
      page,
      limit,
      total: countResult.total,
      totalPages: Math.ceil(countResult.total / limit)
    }
  });
});

// 회원 상세 조회
admin.get('/users/:userId', async (c) => {
  const { env } = c;
  const userId = c.req.param('userId');

  const user = await env.DB.prepare(`
    SELECT user_id, email, name, phone, membership_type, created_at, updated_at, last_login_at, is_active
    FROM users WHERE user_id = ?
  `).bind(userId).first();

  if (!user) {
    return c.json({ error: '회원을 찾을 수 없습니다.' }, 404);
  }

  return c.json({ success: true, user });
});

// 회원 수정
admin.patch('/users/:userId', async (c) => {
  const { env } = c;
  const userId = c.req.param('userId');
  const { name, phone, membership_type, is_active } = await c.req.json();

  const updates: string[] = [];
  const params: any[] = [];

  if (name) {
    updates.push('name = ?');
    params.push(name);
  }
  if (phone) {
    updates.push('phone = ?');
    params.push(phone);
  }
  if (membership_type && (membership_type === 'free' || membership_type === 'premium')) {
    updates.push('membership_type = ?');
    params.push(membership_type);
  }
  if (typeof is_active === 'number') {
    updates.push('is_active = ?');
    params.push(is_active);
  }

  if (updates.length === 0) {
    return c.json({ error: '수정할 항목이 없습니다.' }, 400);
  }

  updates.push('updated_at = CURRENT_TIMESTAMP');
  params.push(userId);

  await env.DB.prepare(`
    UPDATE users SET ${updates.join(', ')} WHERE user_id = ?
  `).bind(...params).run();

  // 로그 기록
  await env.DB.prepare(`
    INSERT INTO admin_logs (log_id, action, target_type, target_id, details)
    VALUES (?, 'UPDATE', 'user', ?, ?)
  `).bind(crypto.randomUUID(), userId, JSON.stringify({ name, phone, membership_type, is_active })).run();

  return c.json({ success: true, message: '회원 정보가 수정되었습니다.' });
});

// 회원 삭제
admin.delete('/users/:userId', async (c) => {
  const { env } = c;
  const userId = c.req.param('userId');

  await env.DB.prepare('DELETE FROM users WHERE user_id = ?').bind(userId).run();

  // 로그 기록
  await env.DB.prepare(`
    INSERT INTO admin_logs (log_id, action, target_type, target_id)
    VALUES (?, 'DELETE', 'user', ?)
  `).bind(crypto.randomUUID(), userId).run();

  return c.json({ success: true, message: '회원이 삭제되었습니다.' });
});

// 공지사항 목록 조회
admin.get('/notices', async (c) => {
  const { env } = c;
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '20');
  const offset = (page - 1) * limit;

  const notices = await env.DB.prepare(`
    SELECT n.notice_id, n.title, n.content, n.image_url, n.is_published, n.view_count, 
           n.created_at, n.updated_at, u.name as author_name
    FROM notices n
    LEFT JOIN users u ON n.author_id = u.user_id
    ORDER BY n.created_at DESC
    LIMIT ? OFFSET ?
  `).bind(limit, offset).all();

  const countResult = await env.DB.prepare('SELECT COUNT(*) as total FROM notices').first() as { total: number };

  return c.json({
    success: true,
    notices: notices.results,
    pagination: {
      page,
      limit,
      total: countResult.total,
      totalPages: Math.ceil(countResult.total / limit)
    }
  });
});

// 공지사항 등록
admin.post('/notices', async (c) => {
  const { env } = c;
  const { title, content, image_url, is_published } = await c.req.json();

  if (!title || !content) {
    return c.json({ error: '제목과 내용은 필수 입력 항목입니다.' }, 400);
  }

  const noticeId = crypto.randomUUID();
  const authorId = 'admin'; // 관리자 ID (임시)

  await env.DB.prepare(`
    INSERT INTO notices (notice_id, title, content, image_url, author_id, is_published)
    VALUES (?, ?, ?, ?, ?, ?)
  `).bind(noticeId, title, content, image_url || null, authorId, is_published ? 1 : 0).run();

  // 로그 기록
  await env.DB.prepare(`
    INSERT INTO admin_logs (log_id, action, target_type, target_id, details)
    VALUES (?, 'CREATE', 'notice', ?, ?)
  `).bind(crypto.randomUUID(), noticeId, JSON.stringify({ title })).run();

  return c.json({ success: true, message: '공지사항이 등록되었습니다.', notice_id: noticeId });
});

// 공지사항 수정
admin.patch('/notices/:noticeId', async (c) => {
  const { env } = c;
  const noticeId = c.req.param('noticeId');
  const { title, content, image_url, is_published } = await c.req.json();

  const updates: string[] = [];
  const params: any[] = [];

  if (title) {
    updates.push('title = ?');
    params.push(title);
  }
  if (content) {
    updates.push('content = ?');
    params.push(content);
  }
  if (image_url !== undefined) {
    updates.push('image_url = ?');
    params.push(image_url);
  }
  if (typeof is_published === 'number') {
    updates.push('is_published = ?');
    params.push(is_published);
  }

  if (updates.length === 0) {
    return c.json({ error: '수정할 항목이 없습니다.' }, 400);
  }

  updates.push('updated_at = CURRENT_TIMESTAMP');
  params.push(noticeId);

  await env.DB.prepare(`
    UPDATE notices SET ${updates.join(', ')} WHERE notice_id = ?
  `).bind(...params).run();

  // 로그 기록
  await env.DB.prepare(`
    INSERT INTO admin_logs (log_id, action, target_type, target_id, details)
    VALUES (?, 'UPDATE', 'notice', ?, ?)
  `).bind(crypto.randomUUID(), noticeId, JSON.stringify({ title })).run();

  return c.json({ success: true, message: '공지사항이 수정되었습니다.' });
});

// 공지사항 삭제
admin.delete('/notices/:noticeId', async (c) => {
  const { env } = c;
  const noticeId = c.req.param('noticeId');

  await env.DB.prepare('DELETE FROM notices WHERE notice_id = ?').bind(noticeId).run();

  // 로그 기록
  await env.DB.prepare(`
    INSERT INTO admin_logs (log_id, action, target_type, target_id)
    VALUES (?, 'DELETE', 'notice', ?)
  `).bind(crypto.randomUUID(), noticeId).run();

  return c.json({ success: true, message: '공지사항이 삭제되었습니다.' });
});

// 이미지 업로드 엔드포인트 (Imgur API 사용)
admin.post('/upload', async (c) => {
  try {
    const formData = await c.req.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return c.json({ error: '이미지 파일이 없습니다.' }, 400);
    }

    // 파일 크기 체크 (5MB)
    if (imageFile.size > 5 * 1024 * 1024) {
      return c.json({ error: '이미지 크기는 5MB를 초과할 수 없습니다.' }, 400);
    }

    // 파일 타입 체크
    if (!imageFile.type.startsWith('image/')) {
      return c.json({ error: '이미지 파일만 업로드 가능합니다.' }, 400);
    }

    // ArrayBuffer로 변환
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    // Imgur API로 업로드 (Anonymous upload)
    const imgurResponse = await fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        'Authorization': 'Client-ID 546c25a59c58ad7', // Imgur anonymous client ID
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image: base64Image,
        type: 'base64'
      })
    });

    if (!imgurResponse.ok) {
      throw new Error('Imgur upload failed');
    }

    const imgurData = await imgurResponse.json() as any;
    
    if (imgurData.success && imgurData.data && imgurData.data.link) {
      return c.json({
        success: true,
        image_url: imgurData.data.link,
        message: '이미지 업로드 완료'
      });
    } else {
      throw new Error('Invalid Imgur response');
    }

  } catch (error) {
    console.error('Upload error:', error);
    return c.json({ 
      success: false, 
      error: '이미지 업로드에 실패했습니다. 다시 시도해주세요.' 
    }, 500);
  }
});

// 통계
admin.get('/stats', async (c) => {
  const { env } = c;

  const freeUsers = await env.DB.prepare(
    "SELECT COUNT(*) as count FROM users WHERE membership_type = 'free'"
  ).first() as { count: number };

  const premiumUsers = await env.DB.prepare(
    "SELECT COUNT(*) as count FROM users WHERE membership_type = 'premium'"
  ).first() as { count: number };

  const totalNotices = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM notices'
  ).first() as { count: number };

  const publishedNotices = await env.DB.prepare(
    'SELECT COUNT(*) as count FROM notices WHERE is_published = 1'
  ).first() as { count: number };

  return c.json({
    success: true,
    stats: {
      users: {
        free: freeUsers.count,
        premium: premiumUsers.count,
        total: freeUsers.count + premiumUsers.count
      },
      notices: {
        published: publishedNotices.count,
        total: totalNotices.count
      }
    }
  });
});

export { admin };
