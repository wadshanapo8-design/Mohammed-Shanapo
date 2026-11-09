import test from 'node:test';
import assert from 'node:assert/strict';
import {
  MENU_SECTIONS,
  INDIVIDUAL_MENU_ITEMS,
  getSectionById,
  calculateZoom,
  validateContactForm,
  validateSubscriberInput,
  calculatePanLimits,
  clampPanPosition,
  SOCIAL_CONFIG,
  filterMenuItems
} from './menuData';

test('MENU_SECTIONS contains all 3 required sections with valid images', () => {
  assert.equal(MENU_SECTIONS.length, 3);
  
  const ids = MENU_SECTIONS.map(s => s.id);
  assert.ok(ids.includes('broast-grill'));
  assert.ok(ids.includes('pizza'));
  assert.ok(ids.includes('juices'));

  for (const section of MENU_SECTIONS) {
    assert.ok(section.image.startsWith('/assets/aistudio/'));
    assert.ok(section.title.length > 0);
  }
});

test('INDIVIDUAL_MENU_ITEMS contains all 46 items with authentic prices and details', () => {
  assert.equal(INDIVIDUAL_MENU_ITEMS.length, 46);

  const broastAndGrill = INDIVIDUAL_MENU_ITEMS.filter(
    (i) => i.categoryId === 'broast' || i.categoryId === 'grill'
  );
  const pizza = INDIVIDUAL_MENU_ITEMS.filter((i) => i.categoryId === 'pizza');
  const juices = INDIVIDUAL_MENU_ITEMS.filter((i) => i.categoryId === 'juices');

  assert.equal(broastAndGrill.length, 9);
  assert.equal(pizza.length, 11);
  assert.equal(juices.length, 26);

  for (const item of INDIVIDUAL_MENU_ITEMS) {
    assert.ok(item.id.length > 0);
    assert.ok(item.name.length > 0);
    assert.ok(item.englishName.length > 0);
    assert.ok(item.basePrice.length > 0);
    assert.ok(item.priceDisplay.length > 0);
    assert.ok(item.image.length > 0);
    assert.ok(item.details.length > 0);
  }

  // Check specific authentic prices
  const broast4 = INDIVIDUAL_MENU_ITEMS.find((i) => i.id === 'broast-4');
  assert.ok(broast4);
  assert.equal(broast4?.basePrice, '25.000');

  const pizzaKetKak = INDIVIDUAL_MENU_ITEMS.find((i) => i.id === 'pizza-ketkak');
  assert.ok(pizzaKetKak);
  assert.equal(pizzaKetKak?.sizes?.length, 5);
  assert.equal(pizzaKetKak?.sizes?.[0].price, '20.000'); // صغير
  assert.equal(pizzaKetKak?.sizes?.[4].price, '70.000'); // عائلي
});

test('filterMenuItems accurately filters items by category and query', () => {
  // All items
  const all = filterMenuItems(INDIVIDUAL_MENU_ITEMS, 'all', '');
  assert.equal(all.length, 46);

  // By category
  const broastGrills = filterMenuItems(INDIVIDUAL_MENU_ITEMS, 'broast-grill', '');
  assert.equal(broastGrills.length, 9);

  const pizzas = filterMenuItems(INDIVIDUAL_MENU_ITEMS, 'pizza', '');
  assert.equal(pizzas.length, 11);

  const juices = filterMenuItems(INDIVIDUAL_MENU_ITEMS, 'juices', '');
  assert.equal(juices.length, 26);

  // By search keyword
  const searchBroast = filterMenuItems(INDIVIDUAL_MENU_ITEMS, 'all', 'بروست');
  assert.equal(searchBroast.length, 5);

  const searchRanch = filterMenuItems(INDIVIDUAL_MENU_ITEMS, 'all', 'رانش');
  assert.equal(searchRanch.length, 1);
  assert.equal(searchRanch[0].id, 'pizza-ranch');

  const searchMojito = filterMenuItems(INDIVIDUAL_MENU_ITEMS, 'all', 'موهيتو');
  assert.ok(searchMojito.length >= 6);

  // Combined filter: pizza category + specific search
  const filteredPizzaRanch = filterMenuItems(INDIVIDUAL_MENU_ITEMS, 'pizza', 'رانش');
  assert.equal(filteredPizzaRanch.length, 1);

  const filteredBroastInJuices = filterMenuItems(INDIVIDUAL_MENU_ITEMS, 'juices', 'بروست');
  assert.equal(filteredBroastInJuices.length, 0);
});

test('getSectionById finds sections correctly', () => {
  const broast = getSectionById('broast-grill');
  assert.ok(broast);
  assert.equal(broast?.id, 'broast-grill');
  assert.ok(broast?.title.includes('البروست'));

  const nonexistent = getSectionById('unknown-section');
  assert.equal(nonexistent, undefined);
});

test('calculateZoom clamps zoom within defined bounds', () => {
  assert.equal(calculateZoom(1, 0.25), 1.25);
  assert.equal(calculateZoom(3.4, 0.5, 1, 3.5), 3.5);
  assert.equal(calculateZoom(1.1, -0.5, 1, 3.5), 1);
});

test('Pan boundaries prevent image from being lost', () => {
  // At zoom 1, limits are 0
  assert.deepEqual(calculatePanLimits(1), { maxX: 0, maxY: 0 });
  assert.deepEqual(clampPanPosition(500, 500, 1), { x: 0, y: 0 });

  // At zoom 2, limits allow panning within bounds
  const limits = calculatePanLimits(2, 1000, 800);
  assert.ok(limits.maxX > 0);
  assert.ok(limits.maxY > 0);

  // Clamping outside bounds works
  const clamped = clampPanPosition(9999, -9999, 2, 1000, 800);
  assert.equal(clamped.x, limits.maxX);
  assert.equal(clamped.y, -limits.maxY);
});

test('validateContactForm checks name and message rules', () => {
  assert.equal(validateContactForm('', 'مرحبا بكم').isValid, false);
  assert.equal(validateContactForm('أحمد', 'نعم').isValid, false);
  assert.equal(validateContactForm('أحمد محمد', 'هل تتوفر خيارات عائلية؟').isValid, true);
  // Length boundaries
  assert.equal(validateContactForm('A'.repeat(80), 'رسالة تجريبية').isValid, false);
});

test('validateSubscriberInput validates email and phone correctly', () => {
  // Valid email
  const emailRes = validateSubscriberInput('test@example.com');
  assert.equal(emailRes.isValid, true);
  assert.equal(emailRes.type, 'email');
  assert.equal(emailRes.normalized, 'test@example.com');

  // Valid phone
  const phoneRes = validateSubscriberInput('+249912345678');
  assert.equal(phoneRes.isValid, true);
  assert.equal(phoneRes.type, 'phone');
  assert.equal(phoneRes.normalized, '+249912345678');

  // Local phone with dashes/spaces
  const localPhone = validateSubscriberInput('09 123-45678');
  assert.equal(localPhone.isValid, true);
  assert.equal(localPhone.normalized, '0912345678');

  // Invalid input
  const invalidRes = validateSubscriberInput('abc');
  assert.equal(invalidRes.isValid, false);
  assert.ok(invalidRes.error);
});

test('SOCIAL_CONFIG contains real web URLs and no dummy hashes', () => {
  assert.ok(SOCIAL_CONFIG.whatsapp.startsWith('https://wa.me/'));
  assert.ok(SOCIAL_CONFIG.instagram.startsWith('https://'));
  assert.ok(SOCIAL_CONFIG.facebook.startsWith('https://'));
  assert.ok(SOCIAL_CONFIG.tiktok.startsWith('https://'));
});
