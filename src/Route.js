const Login = React.lazy(() => import('./login/login'))
const Register = React.lazy(() => import('./register/register'))
const Forget = React.lazy(() => import('./login/forget'))

const routes = [
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  { path: '/forget', name: 'forget', component: Forget },
]

export default routes