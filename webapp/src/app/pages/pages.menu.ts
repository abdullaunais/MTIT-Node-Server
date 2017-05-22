export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'showcase',
        data: {
          menu: {
            title: 'Showcase',
            icon: 'ion-android-home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Movies',
            icon: 'ion-bookmark',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['/view'],
            data: {
              menu: {
                title: 'Movie List'         
                
              }
            }
          },
          {
            path: ['/new'],
            data: {
              menu: {
                title: 'New Movie'
              }
            }
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Pages',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: ['/login'],
            data: {
              menu: {
                title: 'Login'
              }
            }
          },
          {
            path: ['/register'],
            data: {
              menu: {
                title: 'Register'
              }
            }
          }
        ]
      },
      // {
      //   path: '',
      //   data: {
      //     menu: {
      //       title: 'general.menu.external_link',
      //       url: 'http://akveo.com',
      //       icon: 'ion-android-exit',
      //       order: 800,
      //       target: '_blank'
      //     }
      //   }
      // }
    ]
  }
];
