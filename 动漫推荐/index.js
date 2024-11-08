document.addEventListener('DOMContentLoaded', function() {
    // 添加fade-in类到需要动画的元素
    const sections = document.querySelectorAll('.now, .popular, .footer');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });

    // 监听滚动事件
    function checkScroll() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) { // 当元素进入视口85%位置时触发
                section.classList.add('active');
            }
        });
    }

    // 初始检查
    checkScroll();
    
    // 监听滚动事件
    window.addEventListener('scroll', checkScroll);
});

// 为图片添加渐入效果
document.querySelectorAll('.theimg').forEach(img => {
    img.classList.add('fade-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.3
    });
    
    observer.observe(img);
});