# telegram-web-archive

A **web-based image archive** that uses **Telegram** as storage! This repository contains the project's web app, which allows you to easily retrieve your images, filter and sort them.

---

## ⚙️ Usage

1. Run the telegram bot inside the projects root: 
```bash 
npx tsc bot.ts
node bot.js
```
2. Deploy the image archive to vercel or any other service.
3. Happy archiving!

## 🤖 ZSH

For ease of execution I wrote a ZSH function allowing to run the bot simply writing `runArchive` in your ZSH console. In order to do so, move your archive into the documents folder on mac, or simply costumise the path.

## 🌟 Minimal Styling

The web app has been designed with a minimalist approach, ensuring a clean and user-friendly experience on both **desktop** and **mobile** devices.

### Desktop & Mobile Experience

![Desktop view](https://github.com/Erpix3lt/telegram-image-archive/blob/main/.screens/1.png)

![Desktop view small](https://github.com/Erpix3lt/telegram-image-archive/blob/main/.screens/2.png)

![Desktop view details](https://github.com/Erpix3lt/telegram-image-archive/blob/main/.screens/3.png)

*I do not claim any copyright to the displayed images*

---

## 📀 Available Features

- **Lazy loading** of images for optimized performance.
- **Filter by keywords** to easily find the images you need.
- **Preview images** in a larger view before downloading.
- **Easily download images** with a simple click.

---

## 🚧 Features to be Developed

- **Sorting by A-Z** of artists.
- **Sorting by Date** for better organization.
- **Console integration** for uploading images using `curl`.
- **Delete images via Telegram** for easier management.

---

Feel free to create contribute!
