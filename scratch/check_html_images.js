const http = require('http');

http.get('http://localhost:3000/zh-Hans/docs/rebocap-tutorials/6-set-unboxing', { headers: { 'Accept': 'text/html' } }, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Regular expression to match all <img src="..."> tags
    const regex = /<img[^>]+src="([^"]+)"[^>]*>/gi;
    let match;
    console.log('--- FOUND IMAGES ---');
    while ((match = regex.exec(data)) !== null) {
      console.log('Image Src:', match[1]);
    }
    console.log('--------------------');
  });
}).on('error', (err) => {
  console.error('Error fetching page:', err);
});
