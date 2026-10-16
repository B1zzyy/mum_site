/**
 * Everything you might want to change lives in this file.
 * Search for "TODO" to find every placeholder that must be replaced before launch.
 */

export const config = {
  // TODO: replace with her real Calendly link (Calendly → Share → copy link).
  calendlyUrl: 'https://calendly.com/your-calendly-link',
  // TODO: her WhatsApp number in international format, digits only (no +, no spaces).
  whatsappNumber: '447464604194',
  // TODO: her Viber number in international format, with the +.
  viberNumber: '+447464604194',
  // TODO: replace with a real photo of her (put it in /public/img and update the path).
  photo: '/img/mum-placeholder.jpg',

  // Where she teaches from. All times on the site are calculated from this.
  teacherTimeZone: 'Europe/London',
  // Her free hours, in her own (London) time. 24-hour clock.
  schedule: {
    weekday: { from: 8, to: 16 }, // Monday–Friday
    weekend: { from: 8, to: 13 }, // Saturday–Sunday
  },
} as const

export type Lang = 'en' | 'bg'

export type City = { id: string; tz: string; en: string; bg: string }

export const cities: City[] = [
  { id: 'london', tz: 'Europe/London', en: 'London', bg: 'Лондон' },
  { id: 'dublin', tz: 'Europe/Dublin', en: 'Dublin', bg: 'Дъблин' },
  { id: 'madrid', tz: 'Europe/Madrid', en: 'Madrid', bg: 'Мадрид' },
  { id: 'berlin', tz: 'Europe/Berlin', en: 'Berlin', bg: 'Берлин' },
  { id: 'athens', tz: 'Europe/Athens', en: 'Athens', bg: 'Атина' },
  { id: 'dubai', tz: 'Asia/Dubai', en: 'Dubai', bg: 'Дубай' },
  { id: 'newyork', tz: 'America/New_York', en: 'New York', bg: 'Ню Йорк' },
  { id: 'chicago', tz: 'America/Chicago', en: 'Chicago', bg: 'Чикаго' },
  { id: 'toronto', tz: 'America/Toronto', en: 'Toronto', bg: 'Торонто' },
  { id: 'sydney', tz: 'Australia/Sydney', en: 'Sydney', bg: 'Сидни' },
]

/** Hero magnet letters. Clicking one teaches a word. */
export const magnets = [
  { letter: 'А', word: 'ананас', en: 'pineapple' },
  { letter: 'Б', word: 'баба', en: 'grandma' },
  { letter: 'Ж', word: 'жираф', en: 'giraffe' },
  { letter: 'Я', word: 'ябълка', en: 'apple' },
  { letter: 'Щ', word: 'щастие', en: 'happiness' },
  { letter: 'Д', word: 'дом', en: 'home' },
  { letter: 'З', word: 'звезда', en: 'star' },
  { letter: 'Ю', word: 'юнак', en: 'hero' },
  { letter: 'М', word: 'мама', en: 'mum' },
]

export const marqueeWords: [string, string][] = [
  ['Здравей', 'hello'],
  ['Обичам те', 'I love you'],
  ['Баба и дядо', 'grandma & grandpa'],
  ['Браво!', 'well done!'],
  ['Приятел', 'friend'],
  ['Приказка', 'fairy tale'],
  ['Слънце', 'sun'],
  ['Мечта', 'dream'],
  ['Училище', 'school'],
  ['Благодаря', 'thank you'],
]

const en = {
  meta: {
    title: 'Bulgarian lessons online for children | Mrs Dyakova',
  },
  // TODO: confirm her name and how she'd like to be addressed.
  teacher: { name: 'Mrs Dyakova', short: 'Mrs D.' },
  nav: {
    times: 'Lesson times',
    about: 'About me',
    lessons: 'Lessons',
    reviews: 'Reviews',
    faq: 'FAQ',
    book: 'Free trial lesson',
    menu: 'Menu',
    close: 'Close menu',
    langLabel: 'Language',
  },
  hero: {
    eyebrow: 'Online Bulgarian lessons · ages 4–14',
    titleBefore: 'Bulgarian lessons your child will',
    titleMark: 'look forward to',
    titleAfter: '.',
    lead: 'Warm, patient, one-to-one lessons online for children in the UK and Bulgarian families anywhere in the world. Over 30 years of teaching, and a lot of love in every lesson.',
    cta: 'Book a free trial lesson',
    ctaSecondary: 'See my free times',
    dragHint: 'drag the letters, tap one!',
    dragHintShort: 'tap a letter!',
    photoAlt: 'Mrs Dyakova, Bulgarian teacher',
    photoCaption: 'Mrs Dyakova, your teacher',
    trialBadge: 'Free 30-min trial',
    nextSlot: 'Next free lesson time',
    yourTime: 'your time',
    today: 'Today',
    tomorrow: 'Tomorrow',
    trust: ['30+ years teaching', 'Five stars from every family', 'Zoom · Skype · Meet'],
    letterTip: 'means',
  },
  planner: {
    eyebrow: 'Lesson times',
    titleBefore: 'My morning is',
    titleMark: 'your afternoon',
    lead: 'I teach from London, so wherever you live there is a time that works. Pick your city and see my free hours in your own time.',
    yourLocation: 'Where I am',
    weekdays: 'Mon – Fri',
    weekend: 'Sat – Sun',
    free: 'Free for lessons',
    allYourTime: 'All times are shown in your time zone.',
    now: 'now',
    nextDay: '+1 day',
    prevDay: '−1 day',
    cta: 'Pick a time on my calendar',
    greatFit: 'A comfortable time for school children',
    earlyFit: 'Early or late for you, but weekends may work',
  },
  about: {
    eyebrow: "Hello, I'm Mrs Dyakova",
    titleBefore: 'A teacher',
    titleMark: 'all my life',
    story:
      'For more than thirty years I have taught children to read their first Bulgarian words, write their first letters and fall in love with stories. Every child learns differently, so every lesson is made for one child: yours. My job is not only to teach Bulgarian. It is to make sure your child feels safe, understood and proud every time we meet.',
    signature: 'With love, Mrs D.',
    // TODO: check these numbers with her.
    stats: [
      { value: 30, suffix: '+', label: 'years as a teacher' },
      { value: 500, suffix: '+', label: 'children taught' },
      { value: 5, suffix: '★', label: 'from every family' },
    ],
    booksAlt: 'A colourful stack of children’s books',
  },
  lessons: {
    eyebrow: "What we'll learn",
    titleBefore: 'Lessons shaped around',
    titleMark: 'your child',
    items: [
      {
        title: 'First letters',
        text: 'Reading and writing in Cyrillic from the very first А, Б, В. Playful, patient and perfect for ages 4–8.',
        tag: 'Beginners',
      },
      {
        title: 'Talk with баба and дядо',
        text: 'Confident everyday Bulgarian, so your child can chat with family back home, not just understand them.',
        tag: 'Speaking',
      },
      {
        title: 'Bulgarian school support',
        text: 'Homework, the Bulgarian curriculum and exam preparation for grades 1–7, including the NVO national exams.',
        tag: 'Grades 1–7',
      },
      {
        title: 'Stories, songs & poems',
        text: 'Folk tales, Vazov and Botev: the stories every Bulgarian child grows up with.',
        tag: 'Culture',
      },
      {
        title: 'Grammar without tears',
        text: 'Clear explanations and gentle practice for older children who already speak.',
        tag: 'Ages 9–14',
      },
      {
        title: 'One-to-one, online',
        text: 'One-hour lessons on Zoom, Skype or Google Meet. All you need is a laptop or tablet.',
        tag: '1 hour',
      },
      {
        title: 'Progress you can see',
        text: 'A short note to parents after every lesson: what we did, what went well and what comes next.',
        tag: 'For parents',
      },
    ],
  },
  steps: {
    eyebrow: 'How it works',
    titleBefore: 'Three small steps to',
    titleMark: 'the first lesson',
    items: [
      { title: 'Book a free trial', text: 'Pick any free time in my calendar. It is shown in your own time zone.' },
      { title: 'We meet and play', text: 'A relaxed 30 minutes where I get to know your child and their level.' },
      { title: 'Weekly lessons', text: 'A plan made for your child, a regular time slot, and a note for you after each lesson.' },
    ],
    handNote: 'no pressure, just fun',
  },
  reviews: {
    eyebrow: "Parents' notes",
    titleBefore: 'Words from',
    titleMark: 'happy families',
    devNote: 'Sample reviews: replace them with real ones in src/content.ts before publishing.',
    // TODO: PLACEHOLDER REVIEWS. Replace with genuine quotes (with the parents' permission).
    items: [
      { quote: 'My son went from refusing to speak Bulgarian to calling his grandmother every Sunday. We cannot thank her enough.', name: 'Maria', place: 'London' },
      { quote: 'Patient, kind and so well prepared. My daughter counts down the days until her lesson.', name: 'Elena', place: 'Madrid' },
      { quote: 'She found a way to make grammar fun. I honestly did not think that was possible!', name: 'Georgi', place: 'Chicago' },
      { quote: 'Lessons fit perfectly into our afternoon in Dubai. Professional, organised and so warm.', name: 'Desislava', place: 'Dubai' },
      { quote: 'Our twins now read Bulgarian books at bedtime. Thank you from the bottom of our hearts.', name: 'Ivan & Petya', place: 'Berlin' },
      { quote: 'The best teacher I have ever met, and I have met many.', name: 'Nikolay', place: 'Manchester' },
    ],
  },
  faq: {
    eyebrow: 'FAQ',
    titleBefore: 'Questions',
    titleMark: 'parents ask',
    items: [
      { q: 'What age can my child start?', a: 'From about 4 years old, as soon as they are curious about letters. I teach children up to 14.' },
      { q: 'My child barely speaks Bulgarian. Is that OK?', a: 'Absolutely. Many of my students were born abroad. We start from wherever they are, with lots of games and lots of praise.' },
      { q: 'How long is a lesson and what do we need?', a: 'Our lessons usually last one hour, just enough time to learn something new and have fun together. If I feel a little more time would help your child, we can also have 2-hour lessons, and we will decide that together after the free trial. All you need is a laptop or tablet with a camera and a cosy corner. I will take care of all the materials.' },
      { q: 'How do time zones work?', a: 'My calendar shows every free time in your own time zone, so there is no maths for you. I teach weekdays 8:00–16:00 and weekends 8:00–13:00 UK time.' },
      { q: 'How much do lessons cost?', a: 'The 30-minute trial lesson is free. After that, send me a message and I will explain prices, packages and discounts for siblings.' },
      { q: 'Can we move or cancel a lesson?', a: 'Of course. Just let me know 24 hours before and we will find another time.' },
    ],
  },
  contact: {
    eyebrow: "Let's begin",
    titleBefore: 'Book your',
    titleMark: 'free trial lesson',
    lead: 'Pick a time in my calendar or send me a message. I usually reply the same day.',
    calendarTitle: 'Book online',
    calendarText: 'See all my free times in your time zone and choose one in a few clicks.',
    calendarCta: 'Open my calendar',
    messageTitle: 'Message me',
    messageText: 'Prefer to chat first? Tell me a little about your child or ask me anything, and send it on WhatsApp or Viber.',
    parentName: 'Your name',
    childName: "Child's name",
    childAge: "Child's age",
    level: 'Bulgarian level',
    levels: [
      'Just starting',
      'Understands, but shy to speak',
      'Speaks, wants to read and write',
      'Fluent, needs help with school',
    ],
    location: 'Where you live',
    times: 'Best times for you',
    timesPlaceholder: 'e.g. weekdays after 15:00',
    message: 'Your question',
    submit: 'Send on WhatsApp',
    submitViber: 'Send on Viber',
    viberCopied: 'Message copied. Just paste it into our Viber chat.',
    formNote: 'WhatsApp opens with your message ready to send. For Viber, your message is copied so you can paste it. Nothing is stored on this website.',
    // Labels used in the sent message, written from the parent's side.
    msg: {
      parentName: 'My name',
      childName: "My child's name",
      childAge: "My child's age",
      level: 'Bulgarian level',
      location: 'Where I live',
      times: 'Best times for me',
    },
    waGreeting: "Hello! I'm interested in a free trial lesson, but I'd like to ask a few things first.",
  },
  footer: {
    thanks: 'Thank you for reading all the way down here.',
    tagline: 'Bulgarian lessons online, with love.',
    top: 'Back to top',
  },
}

export type Messages = typeof en

const bg: Messages = {
  meta: {
    title: 'Уроци по български онлайн за деца | г-жа Дякова',
  },
  teacher: { name: 'г-жа Дякова', short: 'г-жа Д.' },
  nav: {
    times: 'Часове',
    about: 'За мен',
    lessons: 'Уроци',
    reviews: 'Отзиви',
    faq: 'Въпроси',
    book: 'Безплатен урок',
    menu: 'Меню',
    close: 'Затвори менюто',
    langLabel: 'Език',
  },
  hero: {
    eyebrow: 'Онлайн уроци по български · 4–14 години',
    titleBefore: 'Уроци по български, които детето ви ще',
    titleMark: 'очаква с нетърпение',
    titleAfter: '.',
    lead: 'Топли, търпеливи индивидуални уроци онлайн за деца във Великобритания и български семейства навсякъде по света. Над 30 години опит и много обич във всеки урок.',
    cta: 'Запишете безплатен пробен урок',
    ctaSecondary: 'Вижте свободните часове',
    dragHint: 'местете буквите, докоснете една!',
    dragHintShort: 'докоснете буква!',
    photoAlt: 'г-жа Дякова, учителка по български',
    photoCaption: 'г-жа Дякова, вашата учителка',
    trialBadge: 'Безплатен пробен урок',
    nextSlot: 'Следващ свободен час',
    yourTime: 'по вашето време',
    today: 'Днес',
    tomorrow: 'Утре',
    trust: ['30+ години учител', 'Пет звезди от всяко семейство', 'Zoom · Skype · Meet'],
    letterTip: 'означава',
  },
  planner: {
    eyebrow: 'Часове за уроци',
    titleBefore: 'Моята сутрин е',
    titleMark: 'вашият следобед',
    lead: 'Преподавам от Лондон, така че където и да живеете, има удобен час. Изберете града си и вижте свободните ми часове по вашето време.',
    yourLocation: 'Където съм аз',
    weekdays: 'Пон – Пет',
    weekend: 'Съб – Нед',
    free: 'Свободна за уроци',
    allYourTime: 'Всички часове са по вашето време.',
    now: 'сега',
    nextDay: '+1 ден',
    prevDay: '−1 ден',
    cta: 'Изберете час в календара ми',
    greatFit: 'Удобно време за ученици',
    earlyFit: 'Рано или късно за вас, но уикендите може да са удобни',
  },
  about: {
    eyebrow: 'Здравейте, аз съм г-жа Дякова',
    titleBefore: 'Учителка',
    titleMark: 'цял живот',
    story:
      'Повече от тридесет години уча деца да четат първите си думи на български, да пишат първите си букви и да се влюбват в приказките. Всяко дете учи различно, затова всеки урок е създаден за едно дете – вашето. Моята работа не е само да преподавам български. Тя е детето ви да се чувства спокойно, разбрано и окуражено всеки път, когато се срещнем.',
    signature: 'С обич, г-жа Д.',
    stats: [
      { value: 30, suffix: '+', label: 'години учител' },
      { value: 500, suffix: '+', label: 'деца ученици' },
      { value: 5, suffix: '★', label: 'от всяко семейство' },
    ],
    booksAlt: 'Купчина цветни детски книжки',
  },
  lessons: {
    eyebrow: 'Какво ще учим',
    titleBefore: 'Уроци, съобразени с',
    titleMark: 'вашето дете',
    items: [
      {
        title: 'Първи букви',
        text: 'Четене и писане на кирилица от първите А, Б, В. Игриво, търпеливо и идеално за деца от 4 до 8 години.',
        tag: 'Начинаещи',
      },
      {
        title: 'Да говори с баба и дядо',
        text: 'Уверен разговорен български, за да може детето да разговаря с близките в България, а не само да ги разбира.',
        tag: 'Говорене',
      },
      {
        title: 'Помощ за българското училище',
        text: 'Домашни, учебната програма и подготовка за изпити от 1. до 7. клас, включително НВО.',
        tag: '1.–7. клас',
      },
      {
        title: 'Приказки, песни и стихове',
        text: 'Народни приказки, Вазов и Ботев – историите, с които расте всяко българско дете.',
        tag: 'Култура',
      },
      {
        title: 'Граматика без сълзи',
        text: 'Ясни обяснения и спокойна практика за по-големи деца, които вече говорят.',
        tag: '9–14 години',
      },
      {
        title: 'Индивидуално, онлайн',
        text: 'Едночасови уроци в Zoom, Skype или Google Meet. Нужни са ви само лаптоп или таблет.',
        tag: '1 час',
      },
      {
        title: 'Напредък, който се вижда',
        text: 'Кратка бележка до родителите след всеки урок: какво учихме, какво се получи добре и какво следва.',
        tag: 'За родители',
      },
    ],
  },
  steps: {
    eyebrow: 'Как започваме',
    titleBefore: 'Три малки стъпки до',
    titleMark: 'първия урок',
    items: [
      { title: 'Запишете пробен урок', text: 'Изберете свободен час в календара ми. Той се показва по вашето време.' },
      { title: 'Запознаваме се', text: 'Спокойни 30 минути, в които опознавам детето и нивото му.' },
      { title: 'Уроци всяка седмица', text: 'План, създаден за вашето дете, постоянен час и бележка за вас след всеки урок.' },
    ],
    handNote: 'без напрежение, с усмивка',
  },
  reviews: {
    eyebrow: 'Бележки от родители',
    titleBefore: 'Думи от',
    titleMark: 'щастливи семейства',
    devNote: 'Примерни отзиви: заменете ги с истински в src/content.ts преди публикуване.',
    items: [
      { quote: 'Синът ми не искаше да говори български, а сега се обажда на баба си всяка неделя. Не можем да ѝ благодарим достатъчно.', name: 'Мария', place: 'Лондон' },
      { quote: 'Търпелива, мила и винаги подготвена. Дъщеря ми брои дните до следващия урок.', name: 'Елена', place: 'Мадрид' },
      { quote: 'Намери начин граматиката да е забавна. Честно, не вярвах, че е възможно!', name: 'Георги', place: 'Чикаго' },
      { quote: 'Уроците пасват идеално в следобеда ни в Дубай. Професионално, организирано и много топло.', name: 'Десислава', place: 'Дубай' },
      { quote: 'Близнаците ни вече четат български книжки преди лягане. Благодарим от сърце.', name: 'Иван и Петя', place: 'Берлин' },
      { quote: 'Най-добрата учителка, която съм срещал, а съм срещал много.', name: 'Николай', place: 'Манчестър' },
    ],
  },
  faq: {
    eyebrow: 'Въпроси',
    titleBefore: 'Въпроси от',
    titleMark: 'родители',
    items: [
      { q: 'От каква възраст може да започне детето?', a: 'От около 4 години – веднага щом прояви интерес към буквите. Преподавам на деца до 14 години.' },
      { q: 'Детето ми почти не говори български. Проблем ли е?', a: 'Изобщо не. Много от учениците ми са родени в чужбина. Започваме оттам, където са, с много игри и много похвали.' },
      { q: 'Колко дълъг е урокът и какво ни трябва?', a: 'Обикновено уроците ни са по един час – точно колкото да научим нещо ново и да се позабавляваме. Ако усетя, че на детето ще му е от полза повече време, можем да имаме и уроци по два часа, но това ще решим заедно след безплатния пробен урок. Трябват ви само лаптоп или таблет с камера и едно уютно кътче, а за материалите ще се погрижа аз.' },
      { q: 'Как стои въпросът с часовите зони?', a: 'Календарът ми показва всеки свободен час по вашето време, така че не е нужно да смятате. Преподавам в делнични дни 8:00–16:00 и през уикенда 8:00–13:00 английско време.' },
      { q: 'Колко струват уроците?', a: 'Пробният урок от 30 минути е безплатен. След това ми пишете и ще ви разкажа за цените, пакетите и отстъпките за братя и сестри.' },
      { q: 'Може ли да преместим или отменим урок?', a: 'Разбира се. Просто ме предупредете 24 часа по-рано и ще намерим друг час.' },
    ],
  },
  contact: {
    eyebrow: 'Да започваме',
    titleBefore: 'Запишете',
    titleMark: 'безплатен пробен урок',
    lead: 'Изберете час в календара ми или ми пишете. Обикновено отговарям още същия ден.',
    calendarTitle: 'Запишете се онлайн',
    calendarText: 'Вижте всички мои свободни часове по вашето време и изберете един с няколко клика.',
    calendarCta: 'Отворете календара',
    messageTitle: 'Пишете ми',
    messageText: 'Предпочитате първо да поговорим? Разкажете ми малко за детето или ме попитайте каквото искате и ми го изпратете във WhatsApp или Viber.',
    parentName: 'Вашето име',
    childName: 'Име на детето',
    childAge: 'Възраст на детето',
    level: 'Ниво по български',
    levels: [
      'Тепърва започва',
      'Разбира, но се притеснява да говори',
      'Говори, иска да чете и пише',
      'Свободно, нужна е помощ за училище',
    ],
    location: 'Къде живеете',
    times: 'Удобни часове',
    timesPlaceholder: 'напр. делнични дни след 15:00',
    message: 'Вашият въпрос',
    submit: 'Изпрати по WhatsApp',
    submitViber: 'Изпрати по Viber',
    viberCopied: 'Съобщението е копирано. Просто го поставете в чата ни във Viber.',
    formNote: 'WhatsApp се отваря със съобщението ви, готово за изпращане. За Viber съобщението се копира, за да го поставите. Нищо не се съхранява на този сайт.',
    msg: {
      parentName: 'Моето име',
      childName: 'Името на детето ми',
      childAge: 'Възрастта на детето ми',
      level: 'Ниво по български',
      location: 'Къде живея',
      times: 'Удобни часове за мен',
    },
    waGreeting: 'Здравейте! Интересувам се от безплатен пробен урок, но първо бих искал(а) да попитам няколко неща.',
  },
  footer: {
    thanks: 'Благодаря ви, че прочетохте до края.',
    tagline: 'Уроци по български онлайн, с обич.',
    top: 'Обратно горе',
  },
}

export const messages: Record<Lang, Messages> = { en, bg }
