export const ROUTER = {
    home: {
        path: '/home',
        component: 'home' // component: is the file name of both view and it's .ts controller.
    },
    aboutus: {
        path: '/about',
        component: 'aboutus'
    },
    all: {
        redirect: 'home' // name of ROUTER
    }
};