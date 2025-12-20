import type { Context, Next } from 'hono';
import type { Env } from '../types';

// 회원 인증 미들웨어
export async function requireAuth(c: Context<{ Bindings: Env }>, next: Next) {
  const token = c.req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return c.json({ error: '로그인이 필요합니다.' }, 401);
  }

  // 세션 확인
  const session = await c.env.DB.prepare(`
    SELECT s.user_id, u.email, u.name, u.membership_type
    FROM user_sessions s
    JOIN users u ON s.user_id = u.user_id
    WHERE s.token = ? AND s.expires_at > datetime('now') AND u.is_active = 1
  `).bind(token).first();

  if (!session) {
    return c.json({ error: '유효하지 않거나 만료된 토큰입니다.' }, 401);
  }

  // 사용자 정보를 context에 저장
  c.set('user', session);
  await next();
}

// 프리미엄 회원 전용 미들웨어
export async function requirePremium(c: Context<{ Bindings: Env }>, next: Next) {
  const user: any = c.get('user');

  if (!user) {
    return c.json({ error: '로그인이 필요합니다.' }, 401);
  }

  if (user.membership_type !== 'premium') {
    return c.json({ 
      error: '프리미엄 회원 전용 기능입니다.',
      membership_type: user.membership_type,
      upgrade_required: true
    }, 403);
  }

  await next();
}

// 무료 회원 제한 미들웨어 (제목만 볼 수 있음)
export async function limitFreeUser(c: Context<{ Bindings: Env }>, next: Next) {
  const user: any = c.get('user');

  if (!user) {
    return c.json({ error: '로그인이 필요합니다.' }, 401);
  }

  // 무료 회원이면 제한된 데이터만 반환
  if (user.membership_type === 'free') {
    c.set('limitedAccess', true);
  }

  await next();
}
