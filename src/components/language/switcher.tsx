'use client'

import { useState, useEffect, useRef } from 'react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { DownOutlined, CheckOutlined, GlobalOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isClient, setIsClient] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const { mytheme } = useSelector((state: RootState) => state.theme)
  const isDark = mytheme === 'dark'

  const languages = [
    { code: 'vi', name: 'Vietnamese', shortName: 'VI' },
    { code: 'en', name: 'English', shortName: 'EN' },
    { code: 'zh', name: 'Chinese', shortName: 'ZH' },
    { code: 'ko', name: 'Korean', shortName: 'KO' },
  ]

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0]

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLocale = (newLocale) => {
    const currentPathname = pathname.replace(`/${locale}`, '') || '/'
    router.push(`/${newLocale}${currentPathname}`)
    setIsOpen(false)
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 cursor-pointer py-2 text-sm font-medium rounded-lg transition-all duration-200 min-w-[100px] justify-between border ${
          isDark 
            ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-800/50 border-gray-600 bg-gray-800/30' 
            : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50 border-gray-200 bg-white'
        }`}
      >
        <div className="flex items-center gap-2">
          <GlobalOutlined className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
          <span>{currentLanguage.shortName}</span>
        </div>
        <DownOutlined 
          className={`text-xs transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          } ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
        />
      </button>

      {isOpen && (
        <div className={`absolute top-full right-0 mt-2 rounded-lg shadow-lg py-2 min-w-[160px] z-50 border ${
          isDark 
            ? 'bg-gray-800 border-gray-700' 
            : 'bg-white border-gray-200'
        }`}>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLocale(lang.code)}
              className={`w-full flex items-center justify-between cursor-pointer px-4 py-2.5 text-sm transition-colors duration-150 ${
                locale === lang.code 
                  ? isDark
                    ? 'bg-yellow-500/20 text-yellow-300 font-medium'
                    : 'bg-blue-50 text-blue-700 font-medium'
                  : isDark
                    ? 'text-gray-300 hover:text-gray-100 hover:bg-gray-700/50'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-3">
                <GlobalOutlined className={`text-base ${
                  isDark ? 'text-gray-500' : 'text-gray-400'
                }`} />
                <span className="text-left">{lang.name}</span>
              </div>
              {locale === lang.code && (
                <CheckOutlined className={`text-sm ${
                  isDark ? 'text-yellow-400' : 'text-blue-500'
                }`} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}