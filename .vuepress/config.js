module.exports = {
    theme: 'reco',
    // base:'/blog_house/',
    title: '狸猫小屋',
    description: '欢迎来到狸猫的世界',
    dest: 'public',
    themeConfig: {
      nav: [
        { text: '首页', link: '/', icon: 'reco-home' },
        { text: '文档', 
          icon: 'reco-message',
          items: [
            { text: 'webpack', link: '/docs/basis/' },
            { text: 'javascript', link: '/docs/javascript/' },
          ]
        },
        { text: '时间线', link: '/timeline/', icon: 'reco-date' },
      ],
      // 自动形成侧边导航
      // sidebar: 'auto',
      // subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
      sidebarDepth: 2,
      sidebar: {
        '/docs/basis/': [
          '',
          'one',
          'two',
          'three',
          'four',
          'five',
          'six',
          'seven',
          'eight',
        ],
        '/docs/javascript/': [
          '',
          'promise/Promise',
        ],
      },  
      type: 'blog',
      logo: '/icon.svg',
      
      // 搜索设置
      search: true,
      searchMaxSuggestions: 10,
      // 最后更新时间
      lastUpdated: 'Last Updated',
      // 作者
      author: '狸猫',
      // 作者头像
      authorAvatar: '/avatar.jpg',
      // 备案号
      // record: 'xxxx',
      // 项目开始时间
      startYear: '2022'
    },
    head: [
      ['link', { rel: 'icon', href: '/favicon.svg' }],
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
    
    markdown: {
      lineNumbers: true
    }
}