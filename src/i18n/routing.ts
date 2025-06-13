import {defineRouting} from 'next-intl/routing'
import {createNavigation} from 'next-intl/navigation'
 
export const routing = defineRouting({
  locales: ['en', 'vi', 'zh', 'ko'],
  defaultLocale: 'vi',
})

export const {Link, useRouter, usePathname, redirect}  = createNavigation(routing)