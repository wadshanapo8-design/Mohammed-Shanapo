/**
 * Data structures, configuration, items list, and pure helper functions for KET KAK Restaurant
 */

export interface MenuItemSize {
  name: string;
  price: string;
}

export interface MenuItem {
  id: string;
  categoryId: 'broast' | 'grill' | 'pizza' | 'juices';
  categoryTitle: string;
  name: string;
  englishName: string;
  image: string;
  basePrice: string;
  priceDisplay: string;
  sizes?: MenuItemSize[];
  badge?: string;
  description: string;
  details: string[];
}

export interface MenuSectionItem {
  id: string;
  title: string;
  englishTitle: string;
  image: string;
  badge: string;
  tagline: string;
  description: string;
  highlights: string[];
}

/**
 * Authentic generated visual assets for individual food & beverage items
 */
export const ITEM_ASSETS = {
  broastChicken: '/src/assets/images/broast_chicken_1794238769622.jpg',
  grilledChicken: '/src/assets/images/grilled_chicken_1794238769497.jpg',
  shishTawook: '/src/assets/images/shish_tawook_1794238771171.jpg',
  pizzaSupreme: '/src/assets/images/pizza_supreme_1794238769398.jpg',
  pizzaSpecialty: '/src/assets/images/pizza_specialty_1794238771808.jpg',
  calzonePie: '/src/assets/images/calzone_pie_1794238771704.jpg',
  strawberryShake: '/src/assets/images/strawberry_shake_1794238773038.jpg',
  mojitoJuices: '/src/assets/images/mojito_juices_1794238773240.jpg',
};

export const MENU_SECTIONS: MenuSectionItem[] = [
  {
    id: 'broast-grill',
    title: 'قسم البروست والمشاوي',
    englishTitle: 'Broast & Grills',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-08_at_5.57.52_PM__2__e4eb0995.jpeg',
    badge: 'الأكثر طلباً',
    tagline: 'قرمشة مميزة ومشاوي متبلة وشهية',
    description: 'تشكيلة البروست الذهبي المقرمش بمختلف القطع، إلى جانب المشاوي الكاملة والنصف والشيش طاووق والكرسبي.',
    highlights: [
      'بروست قطع متعددة (2، 4، 6، 8، 12 قطعة)',
      'مشوي دجاج كامل ونصف مشوي بالتتبيلة المميزة',
      'كرسبي وشيش طاووق 3 أسياخ محضر بعناية'
    ]
  },
  {
    id: 'pizza',
    title: 'قسم البيتزا والكلزوني',
    englishTitle: 'Pizza & Calzone',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-08_at_5.57.52_PM__1__d5afdf0b.jpeg',
    badge: 'طازجة من الفرن',
    tagline: 'عجينة مخبوزة بعناية مع أشهى الإضافات',
    description: 'قائمة بيتزا كت كاك المتنوعة بخمسة أحجام (صغير، وسط، كبير، جامبو، عائلي) بالإضافة لفطيرة الكلزوني.',
    highlights: [
      'بيتزا كت كاك، هوت دوق، فراخ، ومشكلة',
      'مارغريتا، أجبان، وخضار',
      'مخصوص صصوص الرانش، مخصوص السيرارتشا الحار، وفطيرة كلزوني'
    ]
  },
  {
    id: 'juices',
    title: 'قسم العصائر والمشروبات',
    englishTitle: 'Fresh Juices & Mojitos',
    image: '/assets/aistudio/WhatsApp_Image_2026-11-08_at_5.57.52_PM_03161b5c.jpeg',
    badge: 'انتعاش طبيعي',
    tagline: 'عصائر ومشروبات باردة ومنعشة',
    description: 'تشكيلة واسعة من العصائر والموهيتو بنكهات التوت والبطيخ والمانجو، بالإضافة إلى الكوكتيلات والسموزي والمشروبات الباردة.',
    highlights: [
      'فراولة بالحليب، فراولة بالأوريو، وليمون نعناع',
      'مانجو، عسل، موز، أناناس، وتفاح',
      'موهيتو بنكهات متعددة (توت، بطيخ، مانجو، عنب، مكس)، سموزي، ورد بول'
    ]
  }
];

export const INDIVIDUAL_MENU_ITEMS: MenuItem[] = [
  // --- قسم البروست والمشاوي ---
  {
    id: 'broast-2',
    categoryId: 'broast',
    categoryTitle: 'قسم البروست',
    name: 'طلب بروست 2 قطعة',
    englishName: 'Broast 2 Pieces',
    image: ITEM_ASSETS.broastChicken,
    basePrice: '12.000',
    priceDisplay: '12.000',
    badge: 'وجبة سريعة',
    description: 'قطعتان من دجاج البروست المقرمش الذهبي المحضر بتتبيلة كت كاك الخاصة الساخنة.',
    details: ['قطعتان دجاج بروست مقرمش', 'بطاطس مقلية ساخنة', 'خبز طازج وثومية كت كاك']
  },
  {
    id: 'broast-4',
    categoryId: 'broast',
    categoryTitle: 'قسم البروست',
    name: 'طلب بروست 4 قطعة',
    englishName: 'Broast 4 Pieces',
    image: ITEM_ASSETS.broastChicken,
    basePrice: '25.000',
    priceDisplay: '25.000',
    badge: 'الأكثر طلباً',
    description: 'أربع قطع بروست مقرمشة ومشبعة مع البطاطس والصوصات المميزة.',
    details: ['4 قطع بروست ذهبي مقرمش', 'بطاطس مقلية مقرمشة', 'خبز وثومية']
  },
  {
    id: 'broast-6',
    categoryId: 'broast',
    categoryTitle: 'قسم البروست',
    name: 'طلب بروست 6 قطعة',
    englishName: 'Broast 6 Pieces',
    image: ITEM_ASSETS.broastChicken,
    basePrice: '37.000',
    priceDisplay: '37.000',
    badge: 'وجبة ثنائية',
    description: 'ست قطع بروست مقرمش ساخن تكفي شخصين مع كامل المرفقات.',
    details: ['6 قطع دجاج بروست مقرمش', 'حجم مضاعف من البطاطس', 'خبز وصوصات']
  },
  {
    id: 'broast-8',
    categoryId: 'broast',
    categoryTitle: 'قسم البروست',
    name: 'طلب بروست 8 قطعة',
    englishName: 'Broast 8 Pieces',
    image: ITEM_ASSETS.broastChicken,
    basePrice: '58.000',
    priceDisplay: '58.000',
    badge: 'حجم عائلي',
    description: 'ثماني قطع بروست عائلية شهية مقرمشة من الخارج وطرية من الداخل.',
    details: ['8 قطع بروست مشكلة', 'بطاطس عائلية', 'خبز وصوصات كت كاك']
  },
  {
    id: 'broast-12',
    categoryId: 'broast',
    categoryTitle: 'قسم البروست',
    name: 'طلب بروست 12 قطعة',
    englishName: 'Broast 12 Pieces',
    image: ITEM_ASSETS.broastChicken,
    basePrice: '72.000',
    priceDisplay: '72.000',
    badge: 'توفير عائلي ضخم',
    description: 'اثنتا عشرة قطعة بروست وفيرة ولذيذة للمجموعات والعائلات.',
    details: ['12 قطعة دجاج بروست مقرمش', 'سرفيس بطاطس كبير', 'خبز وصوصات متنوعة']
  },
  {
    id: 'grill-full',
    categoryId: 'grill',
    categoryTitle: 'قسم المشاوي',
    name: 'طلب مشوي كامل',
    englishName: 'Full Grilled Chicken',
    image: ITEM_ASSETS.grilledChicken,
    basePrice: '54.000',
    priceDisplay: '54.000',
    badge: 'مشوي على الفحم',
    description: 'دجاجة كاملة متبلة ومحمرة على الفحم برائحة وطعم لا يقاوم.',
    details: ['دجاجة كاملة مشوية على الفحم', 'سرفيس خبز وسلطات', 'تتبيلة كت كاك الخاصة']
  },
  {
    id: 'grill-half',
    categoryId: 'grill',
    categoryTitle: 'قسم المشاوي',
    name: 'طلب مشوي نص',
    englishName: 'Half Grilled Chicken',
    image: ITEM_ASSETS.grilledChicken,
    basePrice: '27.000',
    priceDisplay: '27.000',
    badge: 'مشوي فحم',
    description: 'نصف دجاجة طازجة مشوية على الجمر مع الخبز والصلصة.',
    details: ['نصف دجاجة مشوية', 'خبز طازج ومقبلات', 'تتبيلة شهية']
  },
  {
    id: 'grill-crispy',
    categoryId: 'grill',
    categoryTitle: 'قسم المشاوي',
    name: 'كرسبي',
    englishName: 'Crispy Tenders',
    image: ITEM_ASSETS.shishTawook,
    basePrice: 'حسب الاختيار',
    priceDisplay: 'حسب الطلب',
    badge: 'قرمشة خاصة',
    description: 'أصابع دجاج كرسبي مقرمشة متبلة ومقلية لدرجة الكمال مع صوصات التغميس.',
    details: ['أصابع دجاج كرسبي مقرمشة', 'بطاطس مقلية ذهبية', 'صوصات التغميس الخاصة']
  },
  {
    id: 'grill-tawook',
    categoryId: 'grill',
    categoryTitle: 'قسم المشاوي',
    name: 'شيش طاووق 3 سيخ',
    englishName: 'Shish Tawook (3 Skewers)',
    image: ITEM_ASSETS.shishTawook,
    basePrice: 'حسب الاختيار',
    priceDisplay: 'حسب الطلب',
    badge: 'مشاوي فحم',
    description: 'ثلاثة أسياخ من قطع صدور الدجاج المتبلة والمشوية على الفحم مع الخضار.',
    details: ['3 أسياخ شيش طاووق متبلة', 'فلفل وبصل مشوي', 'خبز وثومية وبطاطس']
  },

  // --- قسم البيتزا والكلزوني ---
  {
    id: 'pizza-ketkak',
    categoryId: 'pizza',
    categoryTitle: 'قسم البيتزا',
    name: 'بيتزا كت كاك',
    englishName: 'Ket Kak Pizza Special',
    image: ITEM_ASSETS.pizzaSupreme,
    basePrice: '20.000',
    priceDisplay: 'تبدأ من 20.000',
    sizes: [
      { name: 'صغير', price: '20.000' },
      { name: 'وسط', price: '25.000' },
      { name: 'كبير', price: '30.000' },
      { name: 'جامبو', price: '40.000' },
      { name: 'عائلي', price: '70.000' }
    ],
    badge: 'توقيع المطعم',
    description: 'بيتزا كت كاك المميزة بمكونات حصرية وصلصة فاخرة وأجبان ذائبة.',
    details: ['عجينة إيطالية مخبوزة بالحجر', 'أجبان مشكلة ومكونات غنية', 'متوفرة بـ 5 أحجام']
  },
  {
    id: 'pizza-hotdog',
    categoryId: 'pizza',
    categoryTitle: 'قسم البيتزا',
    name: 'بيتزا هوت دوق',
    englishName: 'Hot Dog Pizza',
    image: ITEM_ASSETS.pizzaSupreme,
    basePrice: '17.000',
    priceDisplay: 'تبدأ من 17.000',
    sizes: [
      { name: 'صغير', price: '17.000' },
      { name: 'وسط', price: '25.000' },
      { name: 'كبير', price: '30.000' },
      { name: 'جامبو', price: '39.000' },
      { name: 'عائلي', price: '60.000' }
    ],
    description: 'شرائح الهوت دوق الشهية مع صلصة الطماطم الغنية وجبنة الموزاريلا.',
    details: ['شرائح هوت دوق ممتازة', 'صلصة طماطم وأوريغانو', 'أجبان ذائبة']
  },
  {
    id: 'pizza-chicken',
    categoryId: 'pizza',
    categoryTitle: 'قسم البيتزا',
    name: 'بيتزا فراخ',
    englishName: 'Chicken Pizza',
    image: ITEM_ASSETS.pizzaSupreme,
    basePrice: '20.000',
    priceDisplay: 'تبدأ من 20.000',
    sizes: [
      { name: 'صغير', price: '20.000' },
      { name: 'وسط', price: '25.000' },
      { name: 'كبير', price: '30.000' },
      { name: 'جامبو', price: '40.000' },
      { name: 'عائلي', price: '70.000' }
    ],
    badge: 'الأكثر طلباً',
    description: 'قطع دجاج متبلة ومطهوة بعناية مع الزيتون والفلفل والجبنة الذائبة.',
    details: ['قطع دجاج متبلة', 'جبنة موزاريلا فاخرة', 'متوفرة بجميع الأحجام']
  },
  {
    id: 'pizza-mix',
    categoryId: 'pizza',
    categoryTitle: 'قسم البيتزا',
    name: 'بيتزا مشكلة',
    englishName: 'Combination Mixed Pizza',
    image: ITEM_ASSETS.pizzaSupreme,
    basePrice: '20.000',
    priceDisplay: 'تبدأ من 20.000',
    sizes: [
      { name: 'صغير', price: '20.000' },
      { name: 'وسط', price: '25.000' },
      { name: 'كبير', price: '30.000' },
      { name: 'جامبو', price: '40.000' },
      { name: 'عائلي', price: '70.000' }
    ],
    description: 'مزيج فاخر من المكونات المتنوعة اللذيذة لمحبي المذاق الغني.',
    details: ['خلطة مكونات مشكلة', 'طبقة وفيرة من الجبن', 'صلصة بيتزا إيطالية']
  },
  {
    id: 'pizza-mortadella',
    categoryId: 'pizza',
    categoryTitle: 'قسم البيتزا',
    name: 'بيتزا مارتديلا',
    englishName: 'Mortadella Pizza',
    image: ITEM_ASSETS.pizzaSupreme,
    basePrice: '20.000',
    priceDisplay: 'تبدأ من 20.000',
    sizes: [
      { name: 'صغير', price: '20.000' },
      { name: 'وسط', price: '25.000' },
      { name: 'كبير', price: '30.000' },
      { name: 'جامبو', price: '35.000' },
      { name: 'عائلي', price: '70.000' }
    ],
    description: 'شرائح المارتديلا الشهية مع صوص الطماطم والجبن الموزاريلا الغني.',
    details: ['شرائح مارتديلا مختارة', 'موزاريلا طبيعية', 'أحجام متعددة']
  },
  {
    id: 'pizza-veggie',
    categoryId: 'pizza',
    categoryTitle: 'قسم البيتزا',
    name: 'بيتزا خضار',
    englishName: 'Vegetable Pizza',
    image: ITEM_ASSETS.pizzaSupreme,
    basePrice: '15.000',
    priceDisplay: 'تبدأ من 15.000',
    sizes: [
      { name: 'صغير', price: '15.000' },
      { name: 'وسط', price: '20.000' },
      { name: 'كبير', price: '25.000' },
      { name: 'جامبو', price: '30.000' },
      { name: 'عائلي', price: '50.000' }
    ],
    description: 'فلفل رومي، زيتون أسود، طماطم، وفطر مع الجبنة المذابة.',
    details: ['خضار طازجة ومقرمشة', 'صلصة خفيفة وموزاريلا', 'صحية ولذيذة']
  },
  {
    id: 'pizza-margherita',
    categoryId: 'pizza',
    categoryTitle: 'قسم البيتزا',
    name: 'بيتزا مارغريتا',
    englishName: 'Margherita Pizza',
    image: ITEM_ASSETS.pizzaSupreme,
    basePrice: '15.000',
    priceDisplay: 'تبدأ من 15.000',
    sizes: [
      { name: 'صغير', price: '15.000' },
      { name: 'وسط', price: '20.000' },
      { name: 'كبير', price: '25.000' },
      { name: 'جامبو', price: '30.000' },
      { name: 'عائلي', price: '50.000' }
    ],
    badge: 'كلاسيك إيطالي',
    description: 'البيتزا الإيطالية الأصيلة بصلصة الطماطم الطبيعية وجبنة الموزاريلا.',
    details: ['عجينة رقيقة ومقرمشة', 'جبنة موزاريلا ذائبة', 'صلصة طماطم وأعشاب']
  },
  {
    id: 'pizza-cheese',
    categoryId: 'pizza',
    categoryTitle: 'قسم البيتزا',
    name: 'بيتزا أجبان',
    englishName: 'Four Cheeses Pizza',
    image: ITEM_ASSETS.pizzaSupreme,
    basePrice: '15.000',
    priceDisplay: 'تبدأ من 15.000',
    sizes: [
      { name: 'صغير', price: '15.000' },
      { name: 'وسط', price: '20.000' },
      { name: 'كبير', price: '25.000' },
      { name: 'جامبو', price: '30.000' },
      { name: 'عائلي', price: '50.000' }
    ],
    description: 'تشكيلة متناغمة من الأجبان الغنية التي تذوب في الفم مع كل قضمة.',
    details: ['مزيج أجبان غني ووفير', 'عجينة مخبوزة بعناية', 'خمسة أحجام']
  },
  {
    id: 'pizza-ranch',
    categoryId: 'pizza',
    categoryTitle: 'قسم البيتزا',
    name: 'مخصوص صوص الرانش',
    englishName: 'Ranch Sauce Specialty Pizza',
    image: ITEM_ASSETS.pizzaSpecialty,
    basePrice: '27.000',
    priceDisplay: 'تبدأ من 27.000',
    sizes: [
      { name: 'صغير', price: '27.000' },
      { name: 'وسط', price: '28.000' },
      { name: 'كبير', price: '36.000' },
      { name: 'جامبو', price: '42.000' },
      { name: 'عائلي', price: '80.000' }
    ],
    badge: 'صلصة خاصة',
    description: 'بيتزا مميزة بصوص الرانش الغني بالنكهات الحصرية اللذيذة.',
    details: ['صوص رانش كريمي خاص', 'إضافات دجاج وجبن موزاريلا', 'مذاق فريد ومميز']
  },
  {
    id: 'pizza-sriracha',
    categoryId: 'pizza',
    categoryTitle: 'قسم البيتزا',
    name: 'مخصوص صوص السيرارتشا الحار',
    englishName: 'Spicy Sriracha Specialty Pizza',
    image: ITEM_ASSETS.pizzaSpecialty,
    basePrice: '27.000',
    priceDisplay: 'تبدأ من 27.000',
    sizes: [
      { name: 'صغير', price: '27.000' },
      { name: 'وسط', price: '28.000' },
      { name: 'كبير', price: '36.000' },
      { name: 'جامبو', price: '42.000' },
      { name: 'عائلي', price: '85.000' }
    ],
    badge: 'حار سبايسي 🌶️',
    description: 'لعشاق الإثارة والطعم الحار مع صوص السيرارتشا الغني بالنكهة.',
    details: ['صوص سيرارتشا حار مميز', 'أجبان وفلفل حار', 'خمسة أحجام تلائم الجميع']
  },
  {
    id: 'calzone-pie',
    categoryId: 'pizza',
    categoryTitle: 'قسم البيتزا',
    name: 'فطيرة كلزوني',
    englishName: 'Calzone Pie',
    image: ITEM_ASSETS.calzonePie,
    basePrice: '10.000',
    priceDisplay: '10.000',
    badge: 'فطيرة إيطالية',
    description: 'فطيرة كلزوني إيطالية مغلقة ومحشوة بمزيج الجبن والحشوة الساخنة الذائبة.',
    details: ['عجينة كلزوني مطوية ومحشوة', 'جبن موزاريلا وصلصة غنية', 'سعر اقتصادي مميز']
  },

  // --- قسم العصائر والمشروبات ---
  {
    id: 'juice-strawberry-milk',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'فراولة بالحليب',
    englishName: 'Strawberry with Milk',
    image: ITEM_ASSETS.strawberryShake,
    basePrice: '7.000',
    priceDisplay: 'صغير 7.000 | كبير 10.000',
    sizes: [
      { name: 'صغير', price: '7.000' },
      { name: 'كبير', price: '10.000' }
    ],
    badge: 'انتعاش ناعم',
    description: 'مزيج طبيعي وناعم من الفراولة الطازجة مع الحليب المثلج.',
    details: ['فراولة طازجة 100%', 'حليب كامل الدسم مثلج', 'حجمان: صغير وكبير']
  },
  {
    id: 'juice-strawberry-oreo',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'فراولة بالأوريو',
    englishName: 'Strawberry Oreo Shake',
    image: ITEM_ASSETS.strawberryShake,
    basePrice: '10.000',
    priceDisplay: 'صغير 10.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '10.000' },
      { name: 'كبير', price: '12.000' }
    ],
    badge: 'كوكتيل مميز',
    description: 'مزيج رائع يجمع نكهة الفراولة الطبيعية مع قطع بسكويت الأوريو اللذيذة.',
    details: ['فراولة طازجة مع قطع أوريو', 'حليب ومثلجات', 'مذاق غني وممتع']
  },
  {
    id: 'juice-strawberry-lemon-mint',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'فراولة - ليمون - نعناع',
    englishName: 'Strawberry Lemon Mint',
    image: ITEM_ASSETS.strawberryShake,
    basePrice: '8.000',
    priceDisplay: 'صغير 8.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '8.000' },
      { name: 'كبير', price: '12.000' }
    ],
    badge: 'منعش جداً',
    description: 'توليفة انتعاش صيفية لا تقاوم تجمع حلاوة الفراولة وحموضة الليمون وانتعاش النعناع.',
    details: ['فراولة مع ليمون طازج', 'أوراق نعناع خضراء', 'يقدم بارداً ومثلجاً']
  },
  {
    id: 'juice-mango',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'عصير مانجو',
    englishName: 'Fresh Mango Juice',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '7.000',
    priceDisplay: 'صغير 7.000 | كبير 10.000',
    sizes: [
      { name: 'صغير', price: '7.000' },
      { name: 'كبير', price: '10.000' }
    ],
    badge: 'طبيعي 100%',
    description: 'عصير مانجو طبيعي بقوام كثيف وطعم غني وحلو.',
    details: ['لب مانجو طازج', 'بدون ملونات صناعية', 'حجم صغير وكبير']
  },
  {
    id: 'juice-mango-honey',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'مانجو + عسل',
    englishName: 'Mango with Honey',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '8.000',
    priceDisplay: 'صغير 8.000 | كبير 10.000',
    sizes: [
      { name: 'صغير', price: '8.000' },
      { name: 'كبير', price: '10.000' }
    ],
    description: 'عصير مانجو طبيعي محلى بالعسل الطبيعي لمذاق صحي ومغذي.',
    details: ['مانجو طبيعي مع عسل نحل', 'قوام غني وطاقة طبيعية', 'حجمان']
  },
  {
    id: 'juice-mango-banana',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'مانجو + موز',
    englishName: 'Mango Banana Smoothie',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '7.000',
    priceDisplay: 'صغير 7.000 | كبير 10.000',
    sizes: [
      { name: 'صغير', price: '7.000' },
      { name: 'كبير', price: '10.000' }
    ],
    description: 'سموزي كريمي لذيذ يجمع حلاوة الموز مع كثافة المانجو الطازج.',
    details: ['موز طازج ومانجو', 'قوام كريمي مشبع', 'صغير وكبير']
  },
  {
    id: 'juice-pineapple',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'عصير أناناس',
    englishName: 'Pineapple Juice',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '10.000',
    priceDisplay: 'صغير 10.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '10.000' },
      { name: 'كبير', price: '12.000' }
    ],
    description: 'عصير أناناس استوائي طبيعي منعش وخفيف على المعدة.',
    details: ['أناناس طبيعي معصور', 'انتعاش استوائي رائع', 'حجمان']
  },
  {
    id: 'juice-apple',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'عصير تفاح',
    englishName: 'Fresh Apple Juice',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '7.000',
    priceDisplay: 'صغير 7.000 | كبير 10.000',
    sizes: [
      { name: 'صغير', price: '7.000' },
      { name: 'كبير', price: '10.000' }
    ],
    description: 'عصير تفاح نقي وطبيعي 100% غني بالانتعاش.',
    details: ['تفاح معصور طازج', 'خفيف ومنعش', 'صغير وكبير']
  },
  {
    id: 'juice-apple-grape',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'تفاح + عنب',
    englishName: 'Apple & Grape Juice',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '10.000',
    priceDisplay: 'صغير 10.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '10.000' },
      { name: 'كبير', price: '12.000' }
    ],
    description: 'كوكتيل فاكهة يجمع نكهة التفاح الصافية مع حلاوة العنب الطبيعية.',
    details: ['تفاح طبيعي مع عنب', 'مزيج فاخر ومنعش', 'حجمان']
  },
  {
    id: 'juice-orange',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'عصير برتقال',
    englishName: 'Fresh Orange Juice',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '7.000',
    priceDisplay: 'صغير 7.000 | كبير 10.000',
    sizes: [
      { name: 'صغير', price: '7.000' },
      { name: 'كبير', price: '10.000' }
    ],
    badge: 'طبيعي ومفيد',
    description: 'برتقال معصور طازج غني بفيتامين C يمنحك النشاط والحيوية.',
    details: ['برتقال طازج معصور فور الطلب', 'بدون إضافات', 'حجم صغير وكبير']
  },
  {
    id: 'juice-grapefruit',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'عصير قريب فروت',
    englishName: 'Grapefruit Juice',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '8.000',
    priceDisplay: 'صغير 8.000 | كبير 10.000',
    sizes: [
      { name: 'صغير', price: '8.000' },
      { name: 'كبير', price: '10.000' }
    ],
    description: 'عصير جريب فروت منعش وحيوي بطعمه الحامض الحلو المميز.',
    details: ['جريب فروت طازج', 'منعش ومفيد', 'حجمان']
  },
  {
    id: 'juice-mixed',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'عصير مشكل',
    englishName: 'Mixed Fruit Cocktail',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '10.000',
    priceDisplay: 'صغير 10.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '10.000' },
      { name: 'كبير', price: '12.000' }
    ],
    badge: 'مكس فواكه',
    description: 'كوكتيل فواكه طبيعية مشكلة بتناغم شهي وغني بالفيتامينات.',
    details: ['مزيج فواكه طازجة', 'قوام كثيف ولذيذ', 'صغير وكبير']
  },
  {
    id: 'juice-nos-darba',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'عصير نص ضربة',
    englishName: 'Nos Darba Special Juice',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '12.000',
    priceDisplay: 'صغير 12.000 | كبير 15.000',
    sizes: [
      { name: 'صغير', price: '12.000' },
      { name: 'كبير', price: '15.000' }
    ],
    badge: 'خلطة شهيرة',
    description: 'عصير نص ضربة الشهير بخلطة فواكه وقطع غنية ومميزة.',
    details: ['خلطة الفواكه الكثيفة الشهيرة', 'قطع فواكه طبيعية', 'حجمان']
  },
  {
    id: 'juice-hummer',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'عصير همر',
    englishName: 'Hummer Cocktail',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '14.000',
    priceDisplay: 'صغير 14.000 | كبير 16.000',
    sizes: [
      { name: 'صغير', price: '14.000' },
      { name: 'كبير', price: '16.000' }
    ],
    badge: 'الأقوى طاقة',
    description: 'كوكتيل همر القوي والغني بالمكونات الطبيعية المنعشة والمشبعة.',
    details: ['مزيج فاخر من المكونات المغذية', 'حجمان مميزان', 'طاقة وانتعاش']
  },
  {
    id: 'mojito-berry',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر والموهيتو',
    name: 'موهيتو توت',
    englishName: 'Berry Mojito',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '10.000',
    priceDisplay: 'صغير 10.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '10.000' },
      { name: 'كبير', price: '12.000' }
    ],
    badge: 'موهيتو منعش',
    description: 'موهيتو مثلج بنكهة التوت البري المنعشة مع النعناع والليمون الفوار.',
    details: ['توت، نعناع، وليمون', 'مشروب فوار مثلج', 'صغير وكبير']
  },
  {
    id: 'mojito-apple',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر والموهيتو',
    name: 'موهيتو تفاح',
    englishName: 'Apple Mojito',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '10.000',
    priceDisplay: 'صغير 10.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '10.000' },
      { name: 'كبير', price: '12.000' }
    ],
    description: 'موهيتو التفاح الأخضر الفوار والمنعش مع قطع الليمون والنعناع.',
    details: ['نكهة تفاح مثلجة مع النعناع', 'انتعاش فوار', 'حجمان']
  },
  {
    id: 'mojito-watermelon',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر والموهيتو',
    name: 'موهيتو بطيخ',
    englishName: 'Watermelon Mojito',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '10.000',
    priceDisplay: 'صغير 10.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '10.000' },
      { name: 'كبير', price: '12.000' }
    ],
    badge: 'أكثر طلباً',
    description: 'نكهة البطيخ الصيفية الباردة مع لمسات النعناع والليمون الفوارة.',
    details: ['بطيخ أحمر ونعناع', 'مشروب صيفي بامتياز', 'صغير وكبير']
  },
  {
    id: 'mojito-mango',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر والموهيتو',
    name: 'موهيتو مانجو',
    englishName: 'Mango Mojito',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '10.000',
    priceDisplay: 'صغير 10.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '10.000' },
      { name: 'كبير', price: '12.000' }
    ],
    description: 'موهيتو بنكهة المانجو الاستوائية مع انتعاش الصودا والنعناع.',
    details: ['مانجو استوائي ونعناع وليمون', 'فوار ومثلج', 'حجمان']
  },
  {
    id: 'mojito-grape',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر والموهيتو',
    name: 'موهيتو عنب',
    englishName: 'Grape Mojito',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '10.000',
    priceDisplay: 'صغير 10.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '10.000' },
      { name: 'كبير', price: '12.000' }
    ],
    description: 'موهيتو العنب المنعش والمثلج مع لمسات النعناع والليمون.',
    details: ['عنب ونعناع وليمون', 'مشروب منعش', 'صغير وكبير']
  },
  {
    id: 'mojito-mix',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر والموهيتو',
    name: 'موهيتو مكس',
    englishName: 'Mixed Mojito Blend',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '12.000',
    priceDisplay: 'صغير 12.000 | كبير 14.000',
    sizes: [
      { name: 'صغير', price: '12.000' },
      { name: 'كبير', price: '14.000' }
    ],
    badge: 'مكس موهيتو',
    description: 'توليفة خاصة من نكهات الموهيتو المتنوعة لأقصى درجات الانتعاش.',
    details: ['مزيج نكهات موهيتو خاصة', 'مشروب فوار ومثلج', 'حجمان']
  },
  {
    id: 'drink-redbull',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر والمشروبات',
    name: 'رد بول',
    englishName: 'Red Bull Drinks',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '12.000',
    priceDisplay: 'صغير 12.000 | كبير 14.000',
    sizes: [
      { name: 'صغير', price: '12.000' },
      { name: 'كبير', price: '14.000' }
    ],
    badge: 'طاقة وانتعاش',
    description: 'مشروب طاقة مثلج بنكهات مضافة حسب رغبتكم.',
    details: ['مشروب طاقة مثلج', 'خيارات نكهات إضافية', 'صغير وكبير']
  },
  {
    id: 'smoothie-berry',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'إسموزي توت',
    englishName: 'Berry Smoothie',
    image: ITEM_ASSETS.strawberryShake,
    basePrice: '10.000',
    priceDisplay: 'صغير 10.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '10.000' },
      { name: 'كبير', price: '12.000' }
    ],
    description: 'سموزي التوت المجروش والبارد بقوام مثلج رائع.',
    details: ['توت مثلج ومجروش', 'قوام سموزي منعش', 'صغير وكبير']
  },
  {
    id: 'juice-guava',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'عصير جوافة عادي',
    englishName: 'Natural Guava Juice',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '7.000',
    priceDisplay: 'صغير 7.000 | كبير 10.000',
    sizes: [
      { name: 'صغير', price: '7.000' },
      { name: 'كبير', price: '10.000' }
    ],
    description: 'عصير جوافة طبيعي كثيف القوام ورائع المذاق.',
    details: ['جوافة طبيعية 100%', 'قوام ناعم وغني', 'حجمان']
  },
  {
    id: 'juice-grape',
    categoryId: 'juices',
    categoryTitle: 'قسم العصائر',
    name: 'عصير عنب',
    englishName: 'Natural Grape Juice',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '10.000',
    priceDisplay: 'صغير 10.000 | كبير 12.000',
    sizes: [
      { name: 'صغير', price: '10.000' },
      { name: 'كبير', price: '12.000' }
    ],
    description: 'عصير عنب طبيعي حلو المذاق وغني بالحيوية.',
    details: ['عنب طبيعي معصور', 'طازج ومثلج', 'صغير وكبير']
  },
  {
    id: 'drink-water',
    categoryId: 'juices',
    categoryTitle: 'قسم المشروبات',
    name: 'موية صحة',
    englishName: 'Mineral Water',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '1.500',
    priceDisplay: 'صغير 1.500 | كبير 2.500',
    sizes: [
      { name: 'صغير', price: '1.500' },
      { name: 'كبير', price: '2.500' }
    ],
    description: 'مياه شرب نقية ومعبأة بحجمين صغير وكبير.',
    details: ['مياه صحية نقية', 'حجم صغير: 1.500', 'حجم كبير: 2.500']
  },
  {
    id: 'drink-soda',
    categoryId: 'juices',
    categoryTitle: 'قسم المشروبات',
    name: 'بارد (مشروبات غازية)',
    englishName: 'Cold Soft Drinks',
    image: ITEM_ASSETS.mojitoJuices,
    basePrice: '2.500',
    priceDisplay: 'صغير 2.500 | كبير 3.000',
    sizes: [
      { name: 'صغير', price: '2.500' },
      { name: 'كبير', price: '3.000' }
    ],
    description: 'مشروبات غازية باردة ومتنوعة تكتمل بها وجبتك الشهية.',
    details: ['مشروبات غازية متنوعة ومثلجة', 'حجم صغير: 2.500', 'حجم كبير: 3.000']
  }
];

export const RESTAURANT_INFO = {
  name: 'كت كاك',
  englishName: 'KET KAK',
  subtitle: 'سلسلة مطاعم كت كاك',
  englishSubtitle: 'KET KAK Restaurant Chain',
  logo: '/assets/aistudio/WhatsApp_Image_2026-11-08_at_5.57.52_PM__3__b1bd6a9f.jpeg',
  features: [
    { title: 'تحضير طازج', desc: 'وجبات ساخنة وطازجة تحضر فور طلبها' },
    { title: 'نكهة كت كاك الخاصة', desc: 'مذاق فريد ومقرمش يرضي مختلف الأذواق' },
    { title: 'تنوع في الأصناف', desc: 'تشكيلة تجمع بين البروست والمشاوي والبيتزا والعصائر' },
    { title: 'خيارات متعددة للأحجام', desc: 'خيارات فردية وعائلية تناسب الجميع' }
  ]
};

export const SOCIAL_CONFIG = {
  whatsapp: 'https://wa.me/?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D8%B7%D8%B9%D9%85%20%D9%83%D8%AA%20%D9%83%D8%A7%D9%83%20KET%20KAK',
  instagram: 'https://www.instagram.com/',
  facebook: 'https://www.facebook.com/',
  tiktok: 'https://www.tiktok.com/',
};

/**
 * Filter items by category and search keyword
 */
export function filterMenuItems(
  items: MenuItem[],
  categoryFilter: string,
  searchQuery = ''
): MenuItem[] {
  let result = items;
  if (categoryFilter !== 'all') {
    if (categoryFilter === 'broast-grill') {
      result = result.filter(i => i.categoryId === 'broast' || i.categoryId === 'grill');
    } else {
      result = result.filter(i => i.categoryId === categoryFilter);
    }
  }

  if (searchQuery && searchQuery.trim().length > 0) {
    const q = searchQuery.trim().toLowerCase();
    result = result.filter(
      i =>
        i.name.toLowerCase().includes(q) ||
        i.englishName.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.categoryTitle.toLowerCase().includes(q) ||
        (i.badge && i.badge.toLowerCase().includes(q))
    );
  }

  return result;
}

/**
 * Pure helper to find an individual item by id
 */
export function getMenuItemById(id: string): MenuItem | undefined {
  return INDIVIDUAL_MENU_ITEMS.find(i => i.id === id);
}

/**
 * Pure helper to find a section by id
 */
export function getSectionById(id: string): MenuSectionItem | undefined {
  return MENU_SECTIONS.find(s => s.id === id);
}

/**
 * Pure zoom calculation with boundary clamps
 */
export function calculateZoom(currentZoom: number, delta: number, min = 1, max = 3.5): number {
  const next = currentZoom + delta;
  const clamped = Math.max(min, Math.min(max, next));
  return Math.round(clamped * 100) / 100;
}

/**
 * Calculate maximum allowable pan offsets so the image never leaves the viewport
 */
export function calculatePanLimits(zoom: number, viewportWidth = 1000, viewportHeight = 800) {
  if (zoom <= 1) {
    return { maxX: 0, maxY: 0 };
  }
  const maxX = Math.round(((zoom - 1) * viewportWidth * 0.45));
  const maxY = Math.round(((zoom - 1) * viewportHeight * 0.45));
  return { maxX: Math.max(50, maxX), maxY: Math.max(50, maxY) };
}

/**
 * Clamps pan coordinates within calculated bounds
 */
export function clampPanPosition(x: number, y: number, zoom: number, viewportWidth = 1000, viewportHeight = 800) {
  const { maxX, maxY } = calculatePanLimits(zoom, viewportWidth, viewportHeight);
  return {
    x: Math.max(-maxX, Math.min(maxX, x)),
    y: Math.max(-maxY, Math.min(maxY, y)),
  };
}

/**
 * Form validator for inquiry submission (used both on client and server)
 */
export function validateContactForm(name: string, message: string): { isValid: boolean; error?: string } {
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return { isValid: false, error: 'يرجى كتابة الاسم بشكل صحيح (حرفين على الأقل)' };
  }
  if (name.trim().length > 70) {
    return { isValid: false, error: 'الاسم طويل جداً (الحد الأقصى 70 حرفاً)' };
  }
  if (!message || typeof message !== 'string' || message.trim().length < 5) {
    return { isValid: false, error: 'يرجى كتابة رسالتك بوضوح (5 أحرف على الأقل)' };
  }
  if (message.trim().length > 1500) {
    return { isValid: false, error: 'الرسالة طويلة جداً (الحد الأقصى 1500 حرف)' };
  }
  return { isValid: true };
}

/**
 * Validator for notification subscribers (Email or Phone number)
 */
export function validateSubscriberInput(input: string): {
  isValid: boolean;
  type?: 'email' | 'phone';
  normalized?: string;
  error?: string;
} {
  if (!input || typeof input !== 'string') {
    return { isValid: false, error: 'يرجى إدخال رقم الهاتف أو البريد الإلكتروني' };
  }

  const trimmed = input.trim();
  if (trimmed.length < 5) {
    return { isValid: false, error: 'البيانات المدخلة قصيرة جداً' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(trimmed)) {
    return {
      isValid: true,
      type: 'email',
      normalized: trimmed.toLowerCase(),
    };
  }

  const cleanedPhone = trimmed.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  if (phoneRegex.test(cleanedPhone)) {
    return {
      isValid: true,
      type: 'phone',
      normalized: cleanedPhone,
    };
  }

  return {
    isValid: false,
    error: 'يرجى إدخال بريد إلكتروني صحيح أو رقم هاتف صحيح (7 أرقام على الأقل)',
  };
}
