"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import { cn } from "@/lib/utils"
import { Clock, Globe, Languages, Moon, Sun, ChevronDown, Check } from "lucide-react"

// Translations
const translations: Record<string, Record<string, string>> = {
  en: {
    morning: "Morning",
    afternoon: "Afternoon",
    evening: "Evening",
    night: "Night",
    searchTimezone: "Search timezone...",
    noResults: "No timezone found.",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    format: "Format",
    language: "Language",
    // Cities
    "New York": "New York",
    "Los Angeles": "Los Angeles",
    "Chicago": "Chicago",
    "Denver": "Denver",
    "São Paulo": "São Paulo",
    "Mexico City": "Mexico City",
    "Toronto": "Toronto",
    "Vancouver": "Vancouver",
    "Buenos Aires": "Buenos Aires",
    "London": "London",
    "Paris": "Paris",
    "Berlin": "Berlin",
    "Madrid": "Madrid",
    "Rome": "Rome",
    "Amsterdam": "Amsterdam",
    "Moscow": "Moscow",
    "Lisbon": "Lisbon",
    "Shanghai": "Shanghai",
    "Tokyo": "Tokyo",
    "Seoul": "Seoul",
    "Hong Kong": "Hong Kong",
    "Singapore": "Singapore",
    "Dubai": "Dubai",
    "Mumbai": "Mumbai",
    "Bangkok": "Bangkok",
    "Jakarta": "Jakarta",
    "Sydney": "Sydney",
    "Melbourne": "Melbourne",
    "Auckland": "Auckland",
    "Cairo": "Cairo",
    "Johannesburg": "Johannesburg",
    // Countries
    "United States": "United States",
    "Brazil": "Brazil",
    "Mexico": "Mexico",
    "Canada": "Canada",
    "Argentina": "Argentina",
    "United Kingdom": "United Kingdom",
    "France": "France",
    "Germany": "Germany",
    "Spain": "Spain",
    "Italy": "Italy",
    "Netherlands": "Netherlands",
    "Russia": "Russia",
    "Portugal": "Portugal",
    "China": "China",
    "Japan": "Japan",
    "South Korea": "South Korea",
    "Hong Kong": "Hong Kong",
    "Singapore": "Singapore",
    "UAE": "UAE",
    "India": "India",
    "Thailand": "Thailand",
    "Indonesia": "Indonesia",
    "Australia": "Australia",
    "New Zealand": "New Zealand",
    "Egypt": "Egypt",
    "South Africa": "South Africa",
  },
  pt: {
    morning: "Manhã",
    afternoon: "Tarde",
    evening: "Noite",
    night: "Madrugada",
    searchTimezone: "Pesquisar fuso horário...",
    noResults: "Nenhum fuso horário encontrado.",
    theme: "Tema",
    light: "Claro",
    dark: "Escuro",
    format: "Formato",
    language: "Idioma",
    // Cities
    "New York": "Nova York",
    "Los Angeles": "Los Angeles",
    "Chicago": "Chicago",
    "Denver": "Denver",
    "São Paulo": "São Paulo",
    "Mexico City": "Cidade do México",
    "Toronto": "Toronto",
    "Vancouver": "Vancouver",
    "Buenos Aires": "Buenos Aires",
    "London": "Londres",
    "Paris": "Paris",
    "Berlin": "Berlim",
    "Madrid": "Madrid",
    "Rome": "Roma",
    "Amsterdam": "Amsterdã",
    "Moscow": "Moscou",
    "Lisbon": "Lisboa",
    "Shanghai": "Xangai",
    "Tokyo": "Tóquio",
    "Seoul": "Seul",
    "Hong Kong": "Hong Kong",
    "Singapore": "Singapura",
    "Dubai": "Dubai",
    "Mumbai": "Mumbai",
    "Bangkok": "Banguecoque",
    "Jakarta": "Jacarta",
    "Sydney": "Sydney",
    "Melbourne": "Melbourne",
    "Auckland": "Auckland",
    "Cairo": "Cairo",
    "Johannesburg": "Johannesburgo",
    // Countries
    "United States": "Estados Unidos",
    "Brazil": "Brasil",
    "Mexico": "México",
    "Canada": "Canadá",
    "Argentina": "Argentina",
    "United Kingdom": "Reino Unido",
    "France": "França",
    "Germany": "Alemanha",
    "Spain": "Espanha",
    "Italy": "Itália",
    "Netherlands": "Holanda",
    "Russia": "Rússia",
    "Portugal": "Portugal",
    "China": "China",
    "Japan": "Japão",
    "South Korea": "Coreia do Sul",
    "Hong Kong": "Hong Kong",
    "Singapore": "Singapura",
    "UAE": "EAU",
    "India": "Índia",
    "Thailand": "Tailândia",
    "Indonesia": "Indonésia",
    "Australia": "Austrália",
    "New Zealand": "Nova Zelândia",
    "Egypt": "Egito",
    "South Africa": "África do Sul",
  },
  es: {
    morning: "Mañana",
    afternoon: "Tarde",
    evening: "Noche",
    night: "Madrugada",
    searchTimezone: "Buscar zona horaria...",
    noResults: "No se encontró zona horaria.",
    theme: "Tema",
    light: "Claro",
    dark: "Oscuro",
    format: "Formato",
    language: "Idioma",
    // Cities
    "New York": "Nueva York",
    "Los Angeles": "Los Ángeles",
    "Chicago": "Chicago",
    "Denver": "Denver",
    "São Paulo": "São Paulo",
    "Mexico City": "Ciudad de México",
    "Toronto": "Toronto",
    "Vancouver": "Vancouver",
    "Buenos Aires": "Buenos Aires",
    "London": "Londres",
    "Paris": "París",
    "Berlin": "Berlín",
    "Madrid": "Madrid",
    "Rome": "Roma",
    "Amsterdam": "Ámsterdam",
    "Moscow": "Moscú",
    "Lisbon": "Lisboa",
    "Shanghai": "Shanghái",
    "Tokyo": "Tokio",
    "Seoul": "Seúl",
    "Hong Kong": "Hong Kong",
    "Singapore": "Singapur",
    "Dubai": "Dubái",
    "Mumbai": "Bombay",
    "Bangkok": "Bangkok",
    "Jakarta": "Yakarta",
    "Sydney": "Sídney",
    "Melbourne": "Melbourne",
    "Auckland": "Auckland",
    "Cairo": "El Cairo",
    "Johannesburg": "Johannesburgo",
    // Countries
    "United States": "Estados Unidos",
    "Brazil": "Brasil",
    "Mexico": "México",
    "Canada": "Canadá",
    "Argentina": "Argentina",
    "United Kingdom": "Reino Unido",
    "France": "Francia",
    "Germany": "Alemania",
    "Spain": "España",
    "Italy": "Italia",
    "Netherlands": "Países Bajos",
    "Russia": "Rusia",
    "Portugal": "Portugal",
    "China": "China",
    "Japan": "Japón",
    "South Korea": "Corea del Sur",
    "Hong Kong": "Hong Kong",
    "Singapore": "Singapur",
    "UAE": "EAU",
    "India": "India",
    "Thailand": "Tailandia",
    "Indonesia": "Indonesia",
    "Australia": "Australia",
    "New Zealand": "Nueva Zelanda",
    "Egypt": "Egipto",
    "South Africa": "Sudáfrica",
  },
  fr: {
    morning: "Matin",
    afternoon: "Après-midi",
    evening: "Soir",
    night: "Nuit",
    searchTimezone: "Rechercher un fuseau horaire...",
    noResults: "Aucun fuseau horaire trouvé.",
    theme: "Thème",
    light: "Clair",
    dark: "Sombre",
    format: "Format",
    language: "Langue",
    // Cities
    "New York": "New York",
    "Los Angeles": "Los Angeles",
    "Chicago": "Chicago",
    "Denver": "Denver",
    "São Paulo": "São Paulo",
    "Mexico City": "Mexico City",
    "Toronto": "Toronto",
    "Vancouver": "Vancouver",
    "Buenos Aires": "Buenos Aires",
    "London": "Londres",
    "Paris": "Paris",
    "Berlin": "Berlin",
    "Madrid": "Madrid",
    "Rome": "Rome",
    "Amsterdam": "Amsterdam",
    "Moscow": "Moscou",
    "Lisbon": "Lisbonne",
    "Shanghai": "Shanghai",
    "Tokyo": "Tokyo",
    "Seoul": "Séoul",
    "Hong Kong": "Hong Kong",
    "Singapore": "Singapour",
    "Dubai": "Dubaï",
    "Mumbai": "Mumbai",
    "Bangkok": "Bangkok",
    "Jakarta": "Jakarta",
    "Sydney": "Sydney",
    "Melbourne": "Melbourne",
    "Auckland": "Auckland",
    "Cairo": "Le Caire",
    "Johannesburg": "Johannesburg",
    // Countries
    "United States": "États-Unis",
    "Brazil": "Brésil",
    "Mexico": "Mexique",
    "Canada": "Canada",
    "Argentina": "Argentine",
    "United Kingdom": "Royaume-Uni",
    "France": "France",
    "Germany": "Allemagne",
    "Spain": "Espagne",
    "Italy": "Italie",
    "Netherlands": "Pays-Bas",
    "Russia": "Russie",
    "Portugal": "Portugal",
    "China": "Chine",
    "Japan": "Japon",
    "South Korea": "Corée du Sud",
    "Hong Kong": "Hong Kong",
    "Singapore": "Singapour",
    "UAE": "EAU",
    "India": "Inde",
    "Thailand": "Thaïlande",
    "Indonesia": "Indonésie",
    "Australia": "Australie",
    "New Zealand": "Nouvelle-Zélande",
    "Egypt": "Égypte",
    "South Africa": "Afrique du Sud",
  },
  ja: {
    morning: "朝",
    afternoon: "午後",
    evening: "夕方",
    night: "夜",
    searchTimezone: "タイムゾーンを検索...",
    noResults: "タイムゾーンが見つかりません。",
    theme: "テーマ",
    light: "ライト",
    dark: "ダーク",
    format: "形式",
    language: "言語",
    // Cities
    "New York": "ニューヨーク",
    "Los Angeles": "ロサンゼルス",
    "Chicago": "シカゴ",
    "Denver": "デンバー",
    "São Paulo": "サンパウロ",
    "Mexico City": "メキシコシティ",
    "Toronto": "トロント",
    "Vancouver": "バンクーバー",
    "Buenos Aires": "ブエノスアイレス",
    "London": "ロンドン",
    "Paris": "パリ",
    "Berlin": "ベルリン",
    "Madrid": "マドリード",
    "Rome": "ローマ",
    "Amsterdam": "アムステルダム",
    "Moscow": "モスクワ",
    "Lisbon": "リスボン",
    "Shanghai": "上海",
    "Tokyo": "東京",
    "Seoul": "ソウル",
    "Hong Kong": "香港",
    "Singapore": "シンガポール",
    "Dubai": "ドバイ",
    "Mumbai": "ムンバイ",
    "Bangkok": "バンコク",
    "Jakarta": "ジャカルタ",
    "Sydney": "シドニー",
    "Melbourne": "メルボルン",
    "Auckland": "オークランド",
    "Cairo": "カイロ",
    "Johannesburg": "ヨハネスブルグ",
    // Countries
    "United States": "アメリカ",
    "Brazil": "ブラジル",
    "Mexico": "メキシコ",
    "Canada": "カナダ",
    "Argentina": "アルゼンチン",
    "United Kingdom": "イギリス",
    "France": "フランス",
    "Germany": "ドイツ",
    "Spain": "スペイン",
    "Italy": "イタリア",
    "Netherlands": "オランダ",
    "Russia": "ロシア",
    "Portugal": "ポルトガル",
    "China": "中国",
    "Japan": "日本",
    "South Korea": "韓国",
    "Hong Kong": "香港",
    "Singapore": "シンガポール",
    "UAE": "UAE",
    "India": "インド",
    "Thailand": "タイ",
    "Indonesia": "インドネシア",
    "Australia": "オーストラリア",
    "New Zealand": "ニュージーランド",
    "Egypt": "エジプト",
    "South Africa": "南アフリカ",
  },
}

// Timezone data with display names
const timezones = [
  { value: "America/New_York", city: "New York", country: "United States", code: "US" },
  { value: "America/Los_Angeles", city: "Los Angeles", country: "United States", code: "US" },
  { value: "America/Chicago", city: "Chicago", country: "United States", code: "US" },
  { value: "America/Denver", city: "Denver", country: "United States", code: "US" },
  { value: "America/Sao_Paulo", city: "São Paulo", country: "Brazil", code: "BR" },
  { value: "America/Mexico_City", city: "Mexico City", country: "Mexico", code: "MX" },
  { value: "America/Toronto", city: "Toronto", country: "Canada", code: "CA" },
  { value: "America/Vancouver", city: "Vancouver", country: "Canada", code: "CA" },
  { value: "America/Buenos_Aires", city: "Buenos Aires", country: "Argentina", code: "AR" },
  { value: "Europe/London", city: "London", country: "United Kingdom", code: "GB" },
  { value: "Europe/Paris", city: "Paris", country: "France", code: "FR" },
  { value: "Europe/Berlin", city: "Berlin", country: "Germany", code: "DE" },
  { value: "Europe/Madrid", city: "Madrid", country: "Spain", code: "ES" },
  { value: "Europe/Rome", city: "Rome", country: "Italy", code: "IT" },
  { value: "Europe/Amsterdam", city: "Amsterdam", country: "Netherlands", code: "NL" },
  { value: "Europe/Moscow", city: "Moscow", country: "Russia", code: "RU" },
  { value: "Europe/Lisbon", city: "Lisbon", country: "Portugal", code: "PT" },
  { value: "Asia/Shanghai", city: "Shanghai", country: "China", code: "CN" },
  { value: "Asia/Tokyo", city: "Tokyo", country: "Japan", code: "JP" },
  { value: "Asia/Seoul", city: "Seoul", country: "South Korea", code: "KR" },
  { value: "Asia/Hong_Kong", city: "Hong Kong", country: "Hong Kong", code: "HK" },
  { value: "Asia/Singapore", city: "Singapore", country: "Singapore", code: "SG" },
  { value: "Asia/Dubai", city: "Dubai", country: "UAE", code: "AE" },
  { value: "Asia/Mumbai", city: "Mumbai", country: "India", code: "IN" },
  { value: "Asia/Bangkok", city: "Bangkok", country: "Thailand", code: "TH" },
  { value: "Asia/Jakarta", city: "Jakarta", country: "Indonesia", code: "ID" },
  { value: "Australia/Sydney", city: "Sydney", country: "Australia", code: "AU" },
  { value: "Australia/Melbourne", city: "Melbourne", country: "Australia", code: "AU" },
  { value: "Pacific/Auckland", city: "Auckland", country: "New Zealand", code: "NZ" },
  { value: "Africa/Cairo", city: "Cairo", country: "Egypt", code: "EG" },
  { value: "Africa/Johannesburg", city: "Johannesburg", country: "South Africa", code: "ZA" },
]

const languages = [
  { value: "en", label: "English" },
  { value: "pt", label: "Português" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "ja", label: "日本語" },
]

interface TimezoneWidgetProps {
  defaultTimezone?: string
  defaultLanguage?: string
  defaultTheme?: "light" | "dark"
  default24h?: boolean
}

export function TimezoneWidget({
  defaultTimezone,
  defaultLanguage,
  defaultTheme,
  default24h,
}: TimezoneWidgetProps) {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState(new Date())
  const [timezone, setTimezone] = useState(defaultTimezone || "Asia/Shanghai")
  const [language, setLanguage] = useState(defaultLanguage || "en")
  const [isDark, setIsDark] = useState(defaultTheme === "dark")
  const [is24h, setIs24h] = useState(default24h ?? true)
  const [timezoneOpen, setTimezoneOpen] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  const t = useCallback((key: string) => translations[language]?.[key] || translations.en[key], [language])

  // Load from localStorage on mount
  useEffect(() => {
    const savedTimezone = localStorage.getItem("tz-widget-timezone")
    const savedLanguage = localStorage.getItem("tz-widget-language")
    const savedTheme = localStorage.getItem("tz-widget-theme")
    const saved24h = localStorage.getItem("tz-widget-24h")

    if (!defaultTimezone && savedTimezone) setTimezone(savedTimezone)
    if (!defaultLanguage && savedLanguage) setLanguage(savedLanguage)
    if (!defaultTheme && savedTheme) setIsDark(savedTheme === "dark")
    if (default24h === undefined && saved24h) setIs24h(saved24h === "true")

    // Auto-detect timezone on first load if no preference
    if (!defaultTimezone && !savedTimezone) {
      try {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone
        const found = timezones.find((tz) => tz.value === detected)
        if (found) setTimezone(detected)
      } catch {
        // Keep default
      }
    }

    setMounted(true)
  }, [defaultTimezone, defaultLanguage, defaultTheme, default24h])

  // Save to localStorage when preferences change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("tz-widget-timezone", timezone)
      localStorage.setItem("tz-widget-language", language)
      localStorage.setItem("tz-widget-theme", isDark ? "dark" : "light")
      localStorage.setItem("tz-widget-24h", is24h.toString())
    }
  }, [timezone, language, isDark, is24h, mounted])

  // Update time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const selectedTimezone = timezones.find((tz) => tz.value === timezone) || timezones[0]

  // Get time in selected timezone
  const getTimeInTimezone = useCallback(() => {
    return new Date(time.toLocaleString("en-US", { timeZone: timezone }))
  }, [time, timezone])

  const localTime = getTimeInTimezone()
  const hours = localTime.getHours()
  const minutes = localTime.getMinutes()
  const seconds = localTime.getSeconds()
  const milliseconds = time.getMilliseconds()

  // Get time of day
  const getTimeOfDay = () => {
    if (hours >= 5 && hours < 12) return t("morning")
    if (hours >= 12 && hours < 17) return t("afternoon")
    if (hours >= 17 && hours < 21) return t("evening")
    return t("night")
  }

  // Get time of day icon
  const getTimeOfDayIcon = () => {
    if (hours >= 5 && hours < 17) return <Sun className="h-3 w-3" /> // Morning and Afternoon
    return <Moon className="h-3 w-3" /> // Evening and Night
  }

  // Format time
  const formatTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: !is24h,
      timeZone: timezone,
    }
    return time.toLocaleTimeString(language, options)
  }

  // Format date
  const formatDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone: timezone,
    }
    return time.toLocaleDateString(language, options)
  }

  // Get translated city name
  const getTranslatedCity = (city: string) => {
    return translations[language]?.[city] || city
  }

  // Get translated country name
  const getTranslatedCountry = (country: string) => {
    return translations[language]?.[country] || country
  }

  // Build a flag image URL from flagcdn.com using the ISO country code
  const getFlagUrl = (code: string, width = 40) =>
    `https://flagcdn.com/w${width}/${code.toLowerCase()}.png`

  // Smooth angle calculations for analog clock
  const secondAngle = (seconds + milliseconds / 1000) * 6
  const minuteAngle = (minutes + seconds / 60) * 6
  const hourAngle = ((hours % 12) + minutes / 60) * 30

  if (!mounted) {
    return (
      <Card className="w-full max-w-2xl bg-card border-border/50 shadow-sm rounded-2xl">
        <CardContent className="p-8">
          <div className="h-[320px] animate-pulse bg-muted rounded-lg" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={cn("w-full max-w-2xl", isDark && "dark")}>
      <Card className="w-full bg-card border-border/50 shadow-sm rounded-2xl transition-colors duration-300">
        <CardContent className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <Popover open={timezoneOpen} onOpenChange={setTimezoneOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto p-0 hover:bg-transparent text-left flex flex-col items-start gap-1 group"
                >
                  <span className="text-2xl font-semibold text-foreground flex items-center gap-2">
                    {getTranslatedCity(selectedTimezone.city)}
                    <ChevronDown className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                  <span className="text-sm text-muted-foreground flex items-center justify-center gap-1.5">
                    <img
                      src={getFlagUrl(selectedTimezone.code, 40) || "/placeholder.svg"}
                      alt={`${getTranslatedCountry(selectedTimezone.country)} flag`}
                      width={20}
                      height={15}
                      className="h-[15px] w-5 rounded-[2px] object-cover shadow-sm"
                    />
                    {getTranslatedCountry(selectedTimezone.country)}
                  </span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[280px] p-0" align="start">
                <Command>
                  <CommandInput placeholder={t("searchTimezone")} />
                  <CommandList>
                    <CommandEmpty>{t("noResults")}</CommandEmpty>
                    <CommandGroup>
                      {timezones.map((tz) => (
                        <CommandItem
                          key={tz.value}
                          value={`${tz.city} ${tz.country}`}
                          onSelect={() => {
                            setTimezone(tz.value)
                            setTimezoneOpen(false)
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              timezone === tz.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <img
                            src={getFlagUrl(tz.code, 40) || "/placeholder.svg"}
                            alt={`${tz.country} flag`}
                            width={20}
                            height={15}
                            className="mr-2 h-[15px] w-5 rounded-[2px] object-cover shadow-sm"
                          />
                          <span>{tz.city}</span>
                          <span className="ml-auto text-xs text-muted-foreground">{tz.country}</span>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <Popover open={languageOpen} onOpenChange={setLanguageOpen}>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Languages className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-40 p-1" align="end">
                  {languages.map((lang) => (
                    <Button
                      key={lang.value}
                      variant={language === lang.value ? "secondary" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => {
                        setLanguage(lang.value)
                        setLanguageOpen(false)
                      }}
                    >
                      {lang.label}
                    </Button>
                  ))}
                </PopoverContent>
              </Popover>

              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2"
                onClick={() => setIsDark(!isDark)}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Analog Clock */}
          <div className="flex justify-center mb-6">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Clock face */}
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  className="text-border"
                />
                
                {/* Hour markers */}
                {[...Array(12)].map((_, i) => {
                  const angle = (i * 30 - 90) * (Math.PI / 180)
                  const isMain = i % 3 === 0
                  const innerR = isMain ? 40 : 42
                  const outerR = 46
                  return (
                    <line
                      key={i}
                      x1={50 + innerR * Math.cos(angle)}
                      y1={50 + innerR * Math.sin(angle)}
                      x2={50 + outerR * Math.cos(angle)}
                      y2={50 + outerR * Math.sin(angle)}
                      stroke="currentColor"
                      strokeWidth={isMain ? 2 : 1}
                      className="text-muted-foreground"
                      strokeLinecap="round"
                    />
                  )
                })}

                {/* Hour hand */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="28"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="text-foreground"
                  style={{
                    transform: `rotate(${hourAngle}deg)`,
                    transformOrigin: "50px 50px",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />

                {/* Minute hand */}
                <line
                  x1="50"
                  y1="50"
                  x2="50"
                  y2="18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="text-foreground"
                  style={{
                    transform: `rotate(${minuteAngle}deg)`,
                    transformOrigin: "50px 50px",
                    transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                />

                {/* Second hand */}
                <line
                  x1="50"
                  y1="55"
                  x2="50"
                  y2="15"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  className="text-blue-500"
                  style={{
                    transform: `rotate(${secondAngle}deg)`,
                    transformOrigin: "50px 50px",
                  }}
                />

                {/* Center dot */}
                <circle cx="50" cy="50" r="3" fill="currentColor" className="text-foreground" />
              </svg>
            </div>
          </div>

          {/* Time of Day Badge */}
          <div className="flex justify-center mb-6">
            <Badge variant="secondary" className="flex items-center gap-1.5 font-medium">
              {getTimeOfDayIcon()}
              {getTimeOfDay()}
            </Badge>
          </div>

          {/* Digital Time */}
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-blue-600 dark:text-blue-400 tracking-tight tabular-nums">
              {formatTime()}
            </div>
            <div className="text-base text-muted-foreground mt-2">
              {formatDate()}
            </div>
          </div>

          {/* Time Format Toggle */}
          <div className="flex justify-center">
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <Button
                variant={!is24h ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-3 text-xs font-medium"
                onClick={() => setIs24h(false)}
              >
                12h
              </Button>
              <Button
                variant={is24h ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-3 text-xs font-medium"
                onClick={() => setIs24h(true)}
              >
                24h
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
