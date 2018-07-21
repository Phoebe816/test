export default [  
  { 
    path:"/pregnant", 
    name:'pregnant',
    component:() => import('@/pages/pregnant/Pregnant'),
    meta:{homePages:true}
  },
  { 
    path:"/job", 
    name:'job',
    component:() => import('@/pages/job/Job'),
    meta:{homePages:true}
  },
  { 
    path:"/shopping", 
    name:'shopping',
    component:() => import('@/pages/shopping/serverRequest'),
    meta:{homePages:true}
  },
  { 
    path:"/tour", 
    name:'tour',
    component:() => import('@/pages/tour/Tour'),
    meta:{homePages:true}
  },
  { 
    path:"/amusement", 
     name:'amusement',
    component:() => import('@/pages/amusement/Amusement'),
    meta:{homePages:true}
  },
  { 
    path:"/gyms", 
     name:'gyms',
    component:() => import('@/pages/gyms/Gyms'),
    meta:{homePages:true}
  }, 
  { 
    path:"/mutualaid", 
     name:'mutualaid',
    component:() => import('@/pages/mutualaid/Mutualaid'),
    meta:{homePages:true}
  },
  { 
    path:"/game", 
     name:'game',
    component:() => import('@/pages/game/Game'),
    meta:{homePages:true} 
    // meta:{ title:'天使网小游戏'}
  },
  
]


