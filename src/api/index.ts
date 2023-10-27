import { login } from './path/login'
import { home } from './path/home'
import { educationalAdministration } from './path/educationalAdministration'
export const api = {
  ...login,
  ...home,
  ...educationalAdministration
}
