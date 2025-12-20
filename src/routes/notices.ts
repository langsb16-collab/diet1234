import { Hono } from 'hono';
import type { Env } from '../types';

const notices = new Hono<{ Bindings: Env }>();

// 공지사항 목록 조회 (공개된 것만)
notices.get('/', async (c) => {
  const { env } = c;
  const page = parseInt(c.req.query('page') || '1');
  const limit = parseInt(c.req.query('limit') || '10');
  const offset = (page - 1) * limit;

  const noticeList = await env.DB.prepare(`
    SELECT notice_id, title, content, image_url, view_count, created_at, updated_at
    FROM notices
    WHERE is_published = 1
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `).bind(limit, offset).all();

  const countResult = await env.DB.prepare(
    'SELECT COUNT(*) as total FROM notices WHERE is_published = 1'
  ).first() as { total: number };

  return c.json({
    success: true,
    notices: noticeList.results,
    pagination: {
      page,
      limit,
      total: countResult.total,
      totalPages: Math.ceil(countResult.total / limit)
    }
  });
});

// 공지사항 상세 조회
notices.get('/:noticeId', async (c) => {
  const { env } = c;
  const noticeId = c.req.param('noticeId');

  const notice = await env.DB.prepare(`
    SELECT notice_id, title, content, image_url, view_count, created_at, updated_at
    FROM notices
    WHERE notice_id = ? AND is_published = 1
  `).bind(noticeId).first();

  if (!notice) {
    return c.json({ error: '공지사항을 찾을 수 없습니다.' }, 404);
  }

  // 조회수 증가
  await env.DB.prepare(`
    UPDATE notices SET view_count = view_count + 1 WHERE notice_id = ?
  `).bind(noticeId).run();

  return c.json({ success: true, notice });
});

export { notices };
