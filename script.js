document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('blog-posts');
  const searchInput = document.getElementById('search-input');
  const categoryFilter = document.getElementById('category-filter');

  let allPosts = [];

  // 加载文章数据
  fetch('posts.json')
    .then(response => {
      if (!response.ok) throw new Error('无法加载文章数据');
      return response.json();
    })
    .then(posts => {
      allPosts = posts;
      renderPosts(allPosts); // 初始渲染所有文章
    })
    .catch(error => {
      container.innerHTML = `<p style="color:red;">加载失败: ${error.message}</p>`;
    });

  // 渲染文章的函数
  function renderPosts(posts) {
    container.innerHTML = '';
    if (posts.length === 0) {
      container.innerHTML = '<p>没有找到匹配的文章。</p>';
      return;
    }

   // 在 renderPosts 函数中，修改 article 的创建方式
   posts.forEach((post, index) => {
     const article = document.createElement('article');
   
     // 创建一个可点击的容器
     const link = document.createElement('a');
     link.href = `post.html?id=${index}`;
     link.style.textDecoration = 'none';
     link.style.color = 'inherit';
   
     const title = document.createElement('h2');
     title.textContent = post.title;
   
     const date = document.createElement('p');
     date.className = 'date';
     date.textContent = post.date;
   
     const content = document.createElement('p');
     content.textContent = post.content;
   
     // 将内容添加到链接
     link.appendChild(title);
     link.appendChild(date);
     link.appendChild(content);
   
     // 将链接添加到 article
     article.appendChild(link);
   
     // 如果有分类，也加上标签
     if (post.category) {
       const category = document.createElement('span');
       category.className = 'category-tag';
       category.textContent = post.category;
       category.style.display = 'inline-block';
       category.style.backgroundColor = '#4a6fa5';
       category.style.color = 'white';
       category.style.padding = '0.2rem 0.6rem';
       category.style.borderRadius = '12px';
       category.style.fontSize = '0.8rem';
       category.style.marginTop = '0.5rem';
       article.appendChild(category);
     }
   
     container.appendChild(article);
   });
  }

  // 搜索和筛选函数
  function filterPosts() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filtered = allPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm);
      const matchesCategory = !selectedCategory || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    renderPosts(filtered);
  }

  // 监听输入和选择变化
  searchInput.addEventListener('input', filterPosts);
  categoryFilter.addEventListener('change', filterPosts);
});