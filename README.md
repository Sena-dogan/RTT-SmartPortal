# 🚀 RTT SmartPortal: AI Destekli Servis Danışmanı Asistanı

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

Bursa Bayi - Servis Danışmanları için özel olarak geliştirilmiş, **Google Gemini AI** gücünü arkasına alan, yeni nesil ve akıllı bir danışman portalı. 

Bu asistan, klasik bir müşteri ve araç listeleme ekranının çok ötesindedir. İçerdiği yapay zeka algoritmaları sayesinde müşteri verilerini analiz eder, riskleri önceden belirler ve karlılığı artıracak aksiyon önerilerinde bulunur.

---

## 🧠 Akıllı Yapay Zeka Özellikleri (AI Features)

Projede aktif olarak yer alan ve servis yöneticilerinin/danışmanlarının yükünü hafifleten başlıca yapay zeka yetenekleri:

### 1. 🚨 Erken Uyarı: Yüksek Terk (Churn) Riski Tahmini
Sistem, müşterinin servise geliş sıklığı, yaşı, son işlem tarihi ve araç segmenti gibi verileri yapay zeka ile işleyerek **Müşteri Kaybı (Churn)** riskini hesaplar.
- Risk düzeyi yüksek olan müşterileri özel olarak etiketler.
- Durumu tersine çevirmek için danışmana özel "Aksiyon Önerisi" (Örn: Ücretsiz Check-up + Motor Yağında İndirim) sunar.

### 2. 📉 Dinamik Fiyatlandırma (Dynamic Pricing)
Klasik "herkese standart indirim" mantığı yerine kişiselleştirilmiş teklifler sunar.
- Müşterinin sadakat durumu ve işlemi kabul ihtimalini yüzdesel olarak hesaplar.
- Sadece teklifin onaylanmasını sağlayacak *optimum indirim oranını* önererek gereksiz indirimlerin (ve kâr kaybının) önüne geçer.

### 3. 🌤️ Operasyonel Öngörü ve Proaktif Kampanyalar (Operational Forecast)
Dış etkenleri (hava durumu, trafik, vb.) geçmiş randevu iptal verileriyle sentezler.
- Örn: "Yarınki yağışlı havanın iptalleri %24 artırabileceğini" tespit eder.
- Çözüm olarak danışmana tek tıkla "Hava Durumu Hatırlatması ve Ücretsiz Vale Hizmeti" kampanyası başlatma opsiyonu sunar.

### 4. 💬 AI Chat Asistanı (Doğal Dil ile Veri Sorgulama)
Danışmanlar karmaşık ekranlar arasında kaybolmak yerine ekranın sağ altındaki "AI Asistanı" ile yazışabilir.
- *"Bugün kimi aramalıyım?"* sorusuna, algoritmanın belirlediği yüksek riskli müşteriler listesiyle cevap verir.
- Veritabanındaki binlerce satır veriyi saniyeler içinde doğal dil formatında özetler ve operasyonu yönlendirir.

---

## 💻 Kurulum (Local Development)

Projeyi bilgisayarınızda yerel ortamda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Ortam Değişkenlerini ayarlayın:  
   - Ana dizinde `.env` (veya `.env.local`) dosyası oluşturun.
   - İçerisine sistemde yer alan Gemini API anahtarını ekleyin:
     ```env
     GEMINI_API_KEY=Sizin_Gemini_API_Anahtariniz
     ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

Uygulamanız standart olarak `http://localhost:3000` veya konsolda belirtilen diğer bir portta çalışacaktır.

---

## 🌍 GitHub Pages Üzerinden Yayınlama (Deployment)

Projenizi **GitHub Pages**'te otomatik derleyip canlıya almak için her şey hazırdır!

1. Sitenizin çalışması için `vite.config.ts` içerisine `base: '/RTT-SmartPortal/'` yapılandırması eklenmiştir.
2. GitHub deponuza (`Sena-dogan/RTT-SmartPortal`) gidin.
3. **Settings > Action > Secrets and variables** altından `GEMINI_API_KEY` adında bir *Repository Secret* oluşturup API Anahtarınızı girin.
4. **Settings > Pages > Build and deployment** altından *Source* kısmını `GitHub Actions` olarak ayarlayın.
5. Kodunuzu `main` dalına push yaptığınız an, `.github/workflows/deploy.yml` tetiklenecek ve otomatik olarak sayfanızı derleyip yayına alacaktır.
