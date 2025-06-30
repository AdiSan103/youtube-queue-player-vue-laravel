# youtube-queue-player

## 🎥 YouTube Video Queue Feature

**Without Skipping Duration & Supports Continuous Playback**

This project is a web-based **YouTube video queue system** that allows users to add videos to a queue. The videos play sequentially **without skipping their full duration**, and automatically continue to the next one.

---

## 🔧 Key Features

- 🔁 **Continuous Playback**: Automatically plays the next video when the current one ends.
- ⏳ **No Skip Allowed**: Users cannot skip video durations — each video must be played completely.
- ➕ **Add to Queue**: Users can input a YouTube link and the system fetches video metadata (title, duration).
- 🗑️ **Remove from Queue**: Admins can remove videos from the queue if needed.
- 🔒 **Authentication Support (Optional)**: Backend can be secured with user roles and permissions.

---

## 🛠️ Tech Stack

### Backend – Laravel

- Laravel 10
- API Resources & Validation
- Laravel Sanctum (for authentication, optional)
- YouTube API v3 (to fetch video details)
- Queue system (optional for background jobs)

### Frontend – Vue.js

- Vue 3 with Composition API
- Tailwind CSS
- Axios (for API communication)
- Vue Router
- YouTube Iframe Player API

---

## 📁 Project Structure

```
repository_name/
├── backend/ (Laravel)
│   ├── app/
│   ├── routes/
│   └── ...
├── frontend/ (Vue.js)
│   ├── src/components/
│   ├── src/views/
│   └── ...
```

---

## 🚀 How to Run the Project

### Backend (Laravel)

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

### Frontend (Vue.js)

```bash
cd frontend
npm install
npm run dev
```

---

## ⚙️ Technical Notes

- Video playback uses the **YouTube IFrame API**.
- `onStateChange` events detect when a video ends, then trigger the next video in the queue.
- Video queue data is stored and managed through the backend.
- Can be extended for **multi-user** or **multi-room** playback scenarios.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

- Disanjaya
