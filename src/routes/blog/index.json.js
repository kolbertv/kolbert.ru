import posts from './_posts.js';

const contents = JSON.stringify(
  posts.map(post => {
    return {
      title: post.title,
      slug: post.slug,
      test: 'шляпа какаято'
    };
  })
);

export function get(req, res) {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(contents);
}

export function post(req, res) {
  console.log('тест в файле blog/index.json.js');
}
