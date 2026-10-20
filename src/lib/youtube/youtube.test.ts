import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractYouTubeId,
  getYouTubeEmbedUrl,
  getYouTubeThumbnailUrl,
  getVideoDetails,
  DEFAULT_YOUTUBE_ID,
} from './youtube.ts';

test('extractYouTubeId extracts from standard watch URL', () => {
  assert.equal(
    extractYouTubeId('https://www.youtube.com/watch?v=d9z6Cq2HD_4'),
    'd9z6Cq2HD_4'
  );
  assert.equal(
    extractYouTubeId('https://www.youtube.com/watch?v=Oj7by95HGRI&t=10s'),
    'Oj7by95HGRI'
  );
});

test('extractYouTubeId extracts from youtu.be shortlinks', () => {
  assert.equal(extractYouTubeId('https://youtu.be/d9z6Cq2HD_4'), 'd9z6Cq2HD_4');
  assert.equal(extractYouTubeId('https://youtu.be/GcSZ0KZhZVY?si=1234'), 'GcSZ0KZhZVY');
});

test('extractYouTubeId extracts from embed, live, and shorts URLs', () => {
  assert.equal(
    extractYouTubeId('https://www.youtube.com/embed/CYH6QxNDvPQ'),
    'CYH6QxNDvPQ'
  );
  assert.equal(
    extractYouTubeId('https://www.youtube-nocookie.com/embed/y-C10hqjx8s'),
    'y-C10hqjx8s'
  );
  assert.equal(
    extractYouTubeId('https://www.youtube.com/live/1Da1IlWse48'),
    '1Da1IlWse48'
  );
  assert.equal(
    extractYouTubeId('https://www.youtube.com/shorts/kNx5LkHUJh8'),
    'kNx5LkHUJh8'
  );
});

test('extractYouTubeId extracts from iframe html tag', () => {
  const iframeHtml = '<iframe width="560" height="315" src="https://www.youtube.com/embed/50r0StBiAf0" title="YouTube video player" frameborder="0"></iframe>';
  assert.equal(extractYouTubeId(iframeHtml), '50r0StBiAf0');
});

test('extractYouTubeId accepts raw 11-char ID', () => {
  assert.equal(extractYouTubeId('d9z6Cq2HD_4'), 'd9z6Cq2HD_4');
});

test('extractYouTubeId returns null on invalid or empty input', () => {
  assert.equal(extractYouTubeId(''), null);
  assert.equal(extractYouTubeId(null), null);
  assert.equal(extractYouTubeId(undefined), null);
  assert.equal(extractYouTubeId('https://google.com'), null);
});

test('getYouTubeEmbedUrl produces valid embed URLs', () => {
  assert.equal(
    getYouTubeEmbedUrl('d9z6Cq2HD_4'),
    'https://www.youtube.com/embed/d9z6Cq2HD_4?rel=0&modestbranding=1&enablejsapi=1'
  );
  assert.equal(
    getYouTubeEmbedUrl(null),
    `https://www.youtube.com/embed/${DEFAULT_YOUTUBE_ID}?rel=0&modestbranding=1&enablejsapi=1`
  );
});

test('getVideoDetails extracts from WordPress acf object', () => {
  const wpVideo = {
    id: 2280,
    title: { rendered: 'Solenidade' },
    acf: {
      tipo_video: 'embed',
      link_video: 'https://www.youtube.com/watch?v=d9z6Cq2HD_4',
    },
  };
  const details = getVideoDetails(wpVideo);
  assert.equal(details.videoId, 'd9z6Cq2HD_4');
  assert.equal(
    details.embedUrl,
    'https://www.youtube.com/embed/d9z6Cq2HD_4?rel=0&modestbranding=1&enablejsapi=1'
  );
});
