module.exports = {
    title: '狸猫小屋',
    description: '欢迎来到狸猫的世界',
    theme: 'reco',
    dest: 'public',
    // themeConfig: {
    //     logo: '/img/icon.svg',
    //     nav: [
    //         { text: '首页', link: '/' },
    //         { 
    //             text: '基础', 
    //             link: "/basis/",
    //         },
    //         {
    //           text: "高级",
    //           link: "/senior/",
    //         },
    //     ],
    //     sidebar: {
    //         // "/basis/": [
    //         //     {
    //         //         text: '基础配置',
    //         //         children: [
    //         //             "/basis/README.md",
    //         //             // "/basis/one.md",
    //         //             // "/basis/two.md",
    //         //             // "/basis/three.md",
    //         //             // "/basis/four.md",
    //         //             // "/basis/five.md",
    //         //         ]
    //         //     }
    //         // ],
    //         "/basis/": [
    //             {
    //               text: "基础配置",
    //               children: [
    //                 "",
    //                 // "/basis/README.md",
    //                 "/basis/one.md",
    //                 "/basis/two.md",
    //                 "/basis/three.md",
    //                 "/basis/four.md",
    //                 "/basis/five.md",
    //               ],
    //             },
    //           ],
    //     }
    // },
    // head: [
    //     ['link', { rel: 'icon', href: '/img/icon.svg' }]
    // ]
    themeConfig: {
      nav: [
        { text: '首页', link: '/', icon: 'reco-home' },
        { text: '文档', 
          icon: 'reco-message',
          // link: '/docs/theme-reco/'
          items: [
            // { text: 'vuepress-reco', link: '/docs/theme-reco/' },
            { text: 'webpack', link: '/basis/' }
          ]
        },
        { text: '时间线', link: '/timeline/', icon: 'reco-date' },
        // { text: 'Contact', 
        //   icon: 'reco-message',
        //   items: [
        //     { text: 'GitHub', link: 'https://github.com/recoluan', icon: 'reco-github' }
        //   ]
        // }
      ],
      sidebar: {
        // '/docs/theme-reco/': [
        //   '',
        //   'theme',
        //   'plugin',
        //   'api'
        // ],
        '/basis/': [
          '',
          'one',
          'two',
          'three',
          'four',
          'five',
        ]
      },  
      type: 'blog',

      logo: '/img/icon.svg',
      // 搜索设置
      search: true,
      searchMaxSuggestions: 10,
      // 自动形成侧边导航
      // sidebar: 'auto',
      // 最后更新时间
      lastUpdated: 'Last Updated',
      // 作者
      author: '狸猫',
      // 作者头像
      authorAvatar: '/img/avatar.jpg',
      // 备案号
      // record: 'xxxx',
      // 项目开始时间
      startYear: '2028'
    },
    head: [
      ['link', { rel: 'icon', href: '/img/favicon.svg' }],
      ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
    ],
}