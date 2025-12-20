import { Hono } from 'hono';
import type { Env } from '../types';

const auth = new Hono<{ Bindings: Env }>();

// 비밀번호 해싱 (간단한 SHA-256)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 토큰 생성
function generateToken(): string {
  return crypto.randomUUID();
}

// 회원가입
auth.post('/register', async (c) => {
  const { env } = c;
  const { email, name, phone, password } = await c.req.json();

  // 필수 항목 체크
  if (!email || !name || !phone || !password) {
    return c.json({ error: '이름, 이메일, 휴대폰, 비밀번호는 필수 입력 항목입니다.' }, 400);
  }

  // 이메일 중복 체크
  const existingUser = await env.DB.prepare(
    'SELECT user_id FROM users WHERE email = ?'
  ).bind(email).first();

  if (existingUser) {
    return c.json({ error: '이미 등록된 이메일입니다.' }, 400);
  }

  // 비밀번호 해싱
  const passwordHash = await hashPassword(password);
  const userId = crypto.randomUUID();

  // 회원 등록 (기본: 무료 회원)
  await env.DB.prepare(`
    INSERT INTO users (user_id, email, name, phone, password_hash, membership_type)
    VALUES (?, ?, ?, ?, ?, 'free')
  `).bind(userId, email, name, phone, passwordHash).run();

  return c.json({ 
    success: true, 
    message: '회원가입이 완료되었습니다.',
    user: { user_id: userId, email, name, membership_type: 'free' }
  });
});

// 로그인
auth.post('/login', async (c) => {
  const { env } = c;
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: '이메일과 비밀번호를 입력해주세요.' }, 400);
  }

  // 비밀번호 해싱
  const passwordHash = await hashPassword(password);

  // 사용자 조회
  const user = await env.DB.prepare(`
    SELECT user_id, email, name, phone, membership_type, is_active
    FROM users 
    WHERE email = ? AND password_hash = ? AND is_active = 1
  `).bind(email, passwordHash).first();

  if (!user) {
    return c.json({ error: '이메일 또는 비밀번호가 일치하지 않습니다.' }, 401);
  }

  // 세션 토큰 생성
  const token = generateToken();
  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30일

  await env.DB.prepare(`
    INSERT INTO user_sessions (session_id, user_id, token, expires_at)
    VALUES (?, ?, ?, ?)
  `).bind(sessionId, user.user_id, token, expiresAt.toISOString()).run();

  // 마지막 로그인 시간 업데이트
  await env.DB.prepare(`
    UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE user_id = ?
  `).bind(user.user_id).run();

  return c.json({
    success: true,
    message: '로그인 성공',
    token,
    user: {
      user_id: user.user_id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      membership_type: user.membership_type
    }
  });
});

// 로그아웃
auth.post('/logout', async (c) => {
  const { env } = c;
  const token = c.req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return c.json({ error: '토큰이 없습니다.' }, 401);
  }

  // 세션 삭제
  await env.DB.prepare('DELETE FROM user_sessions WHERE token = ?').bind(token).run();

  return c.json({ success: true, message: '로그아웃되었습니다.' });
});

// 사용자 정보 조회
auth.get('/me', async (c) => {
  const { env } = c;
  const token = c.req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return c.json({ error: '토큰이 없습니다.' }, 401);
  }

  // 세션 및 사용자 정보 조회
  const result = await env.DB.prepare(`
    SELECT u.user_id, u.email, u.name, u.phone, u.membership_type, u.created_at
    FROM users u
    JOIN user_sessions s ON u.user_id = s.user_id
    WHERE s.token = ? AND s.expires_at > datetime('now') AND u.is_active = 1
  `).bind(token).first();

  if (!result) {
    return c.json({ error: '유효하지 않은 토큰입니다.' }, 401);
  }

  return c.json({ success: true, user: result });
});

export { auth };
