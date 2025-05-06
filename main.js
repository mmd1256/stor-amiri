// ==================== متغیرهای سراسری ====================
// انتخاب‌گرهای عناصر DOM
const mobileMenuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const closeMenu = document.getElementById('close-menu');
const cartToggle = document.getElementById('cart-toggle');
const cartDrawer = document.getElementById('cart-drawer');
const closeCart = document.getElementById('close-cart');
const continueShoppingBtn = document.getElementById('continue-shopping');
const searchToggle = document.getElementById('search-toggle');
const searchOverlay = document.getElementById('search-overlay');
const closeSearch = document.getElementById('close-search');
const clearSearch = document.getElementById('clear-search');
const searchInput = document.getElementById('search-input');
const voiceSearch = document.getElementById('voice-search');
const profileToggle = document.getElementById('profile-toggle');
const profilePanel = document.getElementById('profile-panel');
const closeProfile = document.getElementById('close-profile');
const switchToRegister = document.getElementById('switch-to-register');
const switchToLogin = document.getElementById('switch-to-login');
const loginForm = document.querySelector('.login-form');
const registerForm = document.querySelector('.register-form');
const modalBackdrop = document.getElementById('modal-backdrop');
const scrollToTopBtn = document.getElementById('scroll-to-top');
const chatToggle = document.getElementById('chat-toggle');
const chatPopup = document.getElementById('chat-popup');
const closeChat = document.getElementById('close-chat');

// ==================== تابع‌های کمکی ====================
/**
 * باز کردن و بستن مودال‌ها با افکت
 */
function toggleModal(modal, isOpen) {
    if (isOpen) {
        modal.classList.add('active');
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        modal.classList.remove('active');
        // چک می‌کنیم آیا مودال دیگری هنوز باز است
        const activeModals = document.querySelectorAll('.mobile-menu.active, .cart-drawer.active, .search-overlay.active, .profile-panel.active, .chat-popup.active');
        if (activeModals.length === 0) {
            modalBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

/**
 * بررسی اینکه آیا المنت در حال نمایش هست
 */
function isElementVisible(element) {
    return element.classList.contains('active');
}

/**
 * بستن همه مودال‌ها
 */
function closeAllModals() {
    toggleModal(mobileMenu, false);
    toggleModal(cartDrawer, false);
    toggleModal(searchOverlay, false);
    toggleModal(profilePanel, false);
    toggleModal(chatPopup, false);
    modalBackdrop.classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== رویدادهای DOMContentLoaded ====================
document.addEventListener('DOMContentLoaded', function() {
    // ==================== منوی موبایل ====================
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            toggleModal(mobileMenu, true);
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', function() {
            toggleModal(mobileMenu, false);
        });
    }

    // ==================== سبد خرید ====================
    if (cartToggle) {
        cartToggle.addEventListener('click', function() {
            toggleModal(cartDrawer, true);
        });
    }

    if (closeCart) {
        closeCart.addEventListener('click', function() {
            toggleModal(cartDrawer, false);
        });
    }

    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function() {
            toggleModal(cartDrawer, false);
        });
    }

    // ==================== جستجو ====================
    if (searchToggle) {
        searchToggle.addEventListener('click', function() {
            toggleModal(searchOverlay, true);
            searchInput.focus();
        });
    }

    if (closeSearch) {
        closeSearch.addEventListener('click', function() {
            toggleModal(searchOverlay, false);
        });
    }

    if (clearSearch) {
        clearSearch.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
        });
    }

    if (voiceSearch) {
        voiceSearch.addEventListener('click', function() {
            // پیاده‌سازی ضبط صدا در صورتی که API آن در مرورگر پشتیبانی شود
            if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                const recognition = new SpeechRecognition();
                recognition.lang = 'fa-IR';
                recognition.onresult = function(event) {
                    const speechResult = event.results[0][0].transcript;
                    searchInput.value = speechResult;
                    // بعد از شناسایی گفتار، می‌توان فرم جستجو را ارسال کرد
                    // searchForm.submit();
                };
                recognition.start();
                voiceSearch.classList.add('recording');
                
                recognition.onend = function() {
                    voiceSearch.classList.remove('recording');
                };
            } else {
                alert('مرورگر شما از ضبط صدا پشتیبانی نمی‌کند.');
            }
        });
    }

    // ==================== حساب کاربری ====================

    if (profileToggle) {
        profileToggle.addEventListener('click', function() {
            toggleModal(profilePanel, true);
        });
    }

    if (closeProfile) {
        closeProfile.addEventListener('click', function() {
            toggleModal(profilePanel, false);
        });
    }

    if (switchToRegister) {
        switchToRegister.addEventListener('click', function(e) {
            e.preventDefault();
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        });
    }

    // تغییر حالت نمایش پسورد
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i class="ri-eye-off-line"></i>';
            } else {
                input.type = 'password';
                this.innerHTML = '<i class="ri-eye-line"></i>';
            }
        });
    });
    // کد ساده و مستقیم برای ثبت‌نام و ورود
document.addEventListener('DOMContentLoaded', function() {
    
    // ==== تغییر بین فرم‌های ورود و ثبت‌نام ====
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    
    if (switchToRegister) {
        switchToRegister.onclick = function(e) {
            e.preventDefault();
            loginForm.classList.remove('active');
            registerForm.classList.add('active');
        };
    }
    
    if (switchToLogin) {
        switchToLogin.onclick = function(e) {
            e.preventDefault();
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
        };
    }
    
    // ==== نمایش/مخفی کردن رمز عبور ====
    const toggleBtns = document.querySelectorAll('.toggle-password');
    for (let i = 0; i < toggleBtns.length; i++) {
        toggleBtns[i].onclick = function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.className = 'ri-eye-off-line';
            } else {
                input.type = 'password';
                icon.className = 'ri-eye-line';
            }
        };
    }
    
    // ==== ثبت‌نام ====
    const registerFormElement = document.querySelector('.register-form form');
    if (registerFormElement) {
        registerFormElement.onsubmit = function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name').value;
            const phone = document.getElementById('register-phone').value;
            const password = document.getElementById('register-password').value;
            const terms = document.getElementById('terms-agree').checked;
            
            if (!name || !phone || !password) {
                alert('لطفاً تمام فیلدها را پر کنید');
                return;
            }
            
            if (!terms) {
                alert('لطفاً قوانین و مقررات را بپذیرید');
                return;
            }
            
            // ذخیره کاربر جدید
            let users = [];
            if (localStorage.getItem('users')) {
                users = JSON.parse(localStorage.getItem('users'));
            }
            
            // بررسی تکراری بودن شماره تلفن
            for (let i = 0; i < users.length; i++) {
                if (users[i].phone === phone) {
                    alert('این شماره قبلاً ثبت شده است');
                    return;
                }
            }
            
            // افزودن کاربر جدید
            users.push({
                name: name,
                phone: phone,
                password: password
            });
            
            localStorage.setItem('users', JSON.stringify(users));
            alert('ثبت‌نام با موفقیت انجام شد');
            
            // انتقال به فرم ورود
            registerForm.classList.remove('active');
            loginForm.classList.add('active');
            
            // پر کردن شماره تلفن در فرم ورود
            document.getElementById('login-phone').value = phone;
        };
    }
    
    // ==== ورود ====
    const loginFormElement = document.querySelector('.login-form form');
    if (loginFormElement) {
        loginFormElement.onsubmit = function(e) {
            e.preventDefault();
            
            const phone = document.getElementById('login-phone').value;
            const password = document.getElementById('login-password').value;
            
            if (!phone || !password) {
                alert('لطفاً تمام فیلدها را پر کنید');
                return;
            }
            
            // بررسی اطلاعات ورود
            let users = [];
            if (localStorage.getItem('users')) {
                users = JSON.parse(localStorage.getItem('users'));
            }
            
            let userFound = false;
            for (let i = 0; i < users.length; i++) {
                if (users[i].phone === phone && users[i].password === password) {
                    userFound = true;
                    localStorage.setItem('currentUser', JSON.stringify({
                        name: users[i].name,
                        phone: users[i].phone
                    }));
                    
                    // ورود موفق
                    alert('ورود موفقیت‌آمیز');
                    
                    // بستن پنل (در صورت نیاز)
                    document.getElementById('profile-panel').style.display = 'none';
                    break;
                }
            }
            
            if (!userFound) {
                alert('شماره تلفن یا رمز عبور اشتباه است');
            }
        };
    }
    
    // ==== بستن پنل حساب کاربری ====
    const closeProfileBtn = document.getElementById('close-profile');
    if (closeProfileBtn) {
        closeProfileBtn.onclick = function() {
            document.getElementById('profile-panel').style.display = 'none';
        };
    }
    
    // ==== نمایش پنل حساب کاربری ====
    // اضافه کردن یک دکمه به صفحه برای نمایش پنل
    const showProfileBtn = document.createElement('button');
    showProfileBtn.textContent = 'حساب کاربری';
    showProfileBtn.style.position = 'fixed';
    showProfileBtn.style.top = '10px';
    showProfileBtn.style.right = '10px';
    showProfileBtn.style.zIndex = '9999';
    showProfileBtn.style.padding = '8px 15px';
    showProfileBtn.style.background = '#3498db';
    showProfileBtn.style.color = 'white';
    showProfileBtn.style.border = 'none';
    showProfileBtn.style.borderRadius = '4px';
    showProfileBtn.style.cursor = 'pointer';
    
    showProfileBtn.onclick = function() {
        document.getElementById('profile-panel').style.display = 'block';
    };
    
    document.body.appendChild(showProfileBtn);
    
    // نمایش نام کاربر در دکمه در صورت ورود قبلی
    if (localStorage.getItem('currentUser')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        showProfileBtn.textContent = currentUser.name;
    }
});
    // ==================== پس‌زمینه مودال ====================
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeAllModals);
    }

    // ==================== دکمه اسکرول به بالا ====================
    if (scrollToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        });

        scrollToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

// سیستم چت آنلاین
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
});

function initializeChat() {
    // عناصر DOM مربوط به چت
    const chatToggle = document.getElementById('chat-toggle');
    const chatPopup = document.getElementById('chat-popup');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
    const chatBody = document.getElementById('chat-body');
    const clearChat = document.getElementById('clear-chat');
    const voiceChatBtn = document.getElementById('voice-chat-btn');
    const chatBadge = document.getElementById('chat-badge');
    const typingIndicator = document.getElementById('typing-indicator');
    const sendEmoji = document.getElementById('send-emoji');
    const emojiPanel = document.getElementById('emoji-panel');
    const emojiContainer = document.getElementById('emoji-container');
    const modalBackdrop = document.getElementById('modal-backdrop');
    
    // باز و بسته کردن پنل چت
    if (chatToggle) {
        chatToggle.addEventListener('click', function() {
            chatPopup.classList.add('active');
            if (modalBackdrop) modalBackdrop.classList.add('active');
            chatBadge.style.display = 'none';
            // اسکرول به آخرین پیام
            chatBody.scrollTop = chatBody.scrollHeight;
            // نمایش اینکه پشتیبان در حال تایپ است
            simulateTyping();
        });
    }
    
    // بستن چت
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatPopup.classList.remove('active');
            if (modalBackdrop) modalBackdrop.classList.remove('active');
            if (emojiPanel) emojiPanel.classList.remove('active');
        });
    }
    
    // کلیک روی پس‌زمینه مودال برای بستن چت
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', function() {
            chatPopup.classList.remove('active');
            modalBackdrop.classList.remove('active');
            if (emojiPanel) emojiPanel.classList.remove('active');
        });
    }
    
    // نشان دادن پنل ایموجی
    if (sendEmoji && emojiPanel) {
        sendEmoji.addEventListener('click', function() {
            emojiPanel.classList.toggle('active');
        });
    }
    
    // افزودن ایموجی به متن پیام
    const emojis = document.querySelectorAll('.emoji');
    emojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            const emojiChar = this.getAttribute('data-emoji');
            chatInput.value += emojiChar;
            chatInput.focus();
        });
    });
    
    // پاک کردن تاریخچه چت
    if (clearChat) {
        clearChat.addEventListener('click', function() {
            // پاک کردن همه پیام‌ها به جز پیام‌های سیستم و پشتیبان
            const userMessages = chatBody.querySelectorAll('.chat-message.user');
            userMessages.forEach(msg => msg.remove());
            
            // نمایش پیام سیستمی
            addSystemMessage('تاریخچه چت پاک شد.');
        });
    }
    
    // ارسال پیام با کلیک روی دکمه ارسال
    if (sendMessage) {
        sendMessage.addEventListener('click', function() {
            sendUserMessage();
        });
    }
    
    // ارسال پیام با کلید Enter
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendUserMessage();
            }
        });
    }
    
    // شبیه‌سازی حالت در حال تایپ
    function simulateTyping() {
        if (typingIndicator) {
            typingIndicator.style.display = 'inline-block';
            setTimeout(() => {
                typingIndicator.style.display = 'none';
                // ارسال پیام اتوماتیک پشتیبان بعد از مدتی
                if (chatBody.querySelectorAll('.chat-message').length <= 2) {
                    addSupportMessage('چطور می‌توانم به شما کمک کنم؟ برای خرید کفش یا اطلاعات بیشتر در خدمت شما هستم.');
                }
            }, 2000);
        }
    }
    
    // افزودن پیام کاربر
    function sendUserMessage() {
        const messageText = chatInput.value.trim();
        if (messageText) {
            // افزودن پیام به چت
            addUserMessage(messageText);
            
            // پاک کردن فیلد پیام
            chatInput.value = '';
            
            // شبیه‌سازی پاسخ پشتیبان
            simulateTyping();
            
            // ارسال پاسخ اتوماتیک بعد از مدتی
            setTimeout(() => {
                respondToUserMessage(messageText);
            }, 3000);
        }
    }
    
    // پاسخ اتوماتیک به پیام کاربر
    function respondToUserMessage(message) {
        // پاسخ‌های پیش‌فرض ساده
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('سلام') || lowerMessage.includes('درود')) {
            addSupportMessage('سلام! خوش آمدید. چطور می‌توانم کمک‌تان کنم؟');
        } 
        else if (lowerMessage.includes('قیمت') || lowerMessage.includes('چند')) {
            addSupportMessage('قیمت محصولات ما متفاوت است. می‌توانید در صفحه محصولات همه قیمت‌ها را مشاهده کنید. آیا محصول خاصی مد نظرتان است؟');
        }
        else if (lowerMessage.includes('ارسال') || lowerMessage.includes('پست')) {
            addSupportMessage('ارسال محصولات به سراسر کشور انجام می‌شود و برای سفارش‌های بالای 500 هزار تومان رایگان است.');
        }
        else if (lowerMessage.includes('گارانتی') || lowerMessage.includes('ضمانت')) {
            addSupportMessage('تمام محصولات ما دارای ضمانت اصالت و گارانتی تعویض 7 روزه هستند.');
        }
        else if (lowerMessage.includes('تماس') || lowerMessage.includes('شماره')) {
            addSupportMessage('شما می‌توانید با شماره 09900859556 تماس بگیرید یا از طریق همین چت با ما در ارتباط باشید.');
        }
        else {
            addSupportMessage('ممنون از پیام شما. کارشناسان ما در اسرع وقت به سوال شما پاسخ خواهند داد. آیا سوال دیگری دارید؟');
        }
    }
    
    // افزودن پیام کاربر به چت
    function addUserMessage(text) {
        const messageHtml = `
            <div class="chat-message user">
                <div class="message-content">
                    <div class="message-text">${text}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
        
        chatBody.insertAdjacentHTML('beforeend', messageHtml);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // افزودن پیام پشتیبان به چت
    function addSupportMessage(text) {
        const messageHtml = `
            <div class="chat-message support">
                <div class="chat-avatar">
                    <img src="images/support-avatar.webp" alt="پشتیبان">
                </div>
                <div class="message-content">
                    <div class="message-text">${text}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
        
        chatBody.insertAdjacentHTML('beforeend', messageHtml);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // افزودن پیام سیستمی به چت
    function addSystemMessage(text) {
        const messageHtml = `
            <div class="chat-message system">
                <div class="message-content">
                    <div class="message-text">${text}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
        
        chatBody.insertAdjacentHTML('beforeend', messageHtml);
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // دریافت زمان فعلی
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        // اضافه کردن صفر برای زمان‌های یک رقمی
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        
        return `${hours}:${minutes}`;
    }
    
    // شبیه‌سازی دکمه ضبط صدا
    if (voiceChatBtn) {
        voiceChatBtn.addEventListener('click', function() {
            addSystemMessage('امکان ضبط صدا در حال حاضر فعال نیست.');
        });
    }
    
    // دسته‌بندی‌های ایموجی
    const emojiCategories = document.querySelectorAll('.emoji-category');
    if (emojiCategories.length > 0) {
        emojiCategories.forEach(category => {
            category.addEventListener('click', function() {
                // حذف کلاس active از همه دکمه‌ها
                emojiCategories.forEach(cat => cat.classList.remove('active'));
                // اضافه کردن کلاس active به دکمه کلیک شده
                this.classList.add('active');
                
                // نمایش ایموجی‌های مربوطه (در یک پیاده‌سازی واقعی این بخش پیچیده‌تر خواهد بود)
                const category = this.getAttribute('data-category');
                addSystemMessage(`دسته‌بندی «${category}» انتخاب شد.`);
            });
        });
    }
}

    // ==================== اسلایدر هیرو ====================
    const heroSlides = document.querySelectorAll('.hero-slide');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const prevSlideBtn = document.querySelector('.prev-slide');
    const nextSlideBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // تنظیم اسلایدر و شروع اتوپلی
    function initSlider() {
        if (heroSlides.length === 0) return;
        
        showSlide(currentSlide);
        startSlideInterval();
        
        // دکمه‌های اسلایدر
        if (prevSlideBtn) {
            prevSlideBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
                resetSlideInterval();
            });
        }
        
        if (nextSlideBtn) {
            nextSlideBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
                resetSlideInterval();
            });
        }
        
        // کلیک روی دات‌ها
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetSlideInterval();
            });
        });
    }

    // نمایش اسلاید مشخص
    function showSlide(index) {
        if (heroSlides.length === 0) return;
        
        // اصلاح ایندکس در صورت خارج از محدوده بودن
        if (index < 0) {
            index = heroSlides.length - 1;
        } else if (index >= heroSlides.length) {
            index = 0;
        }
        
        // حذف کلاس active از همه اسلایدها و دات‌ها
        heroSlides.forEach(slide => slide.classList.remove('active'));
        sliderDots.forEach(dot => dot.classList.remove('active'));
        
        // افزودن کلاس active به اسلاید و دات جاری
        heroSlides[index].classList.add('active');
        if (sliderDots[index]) {
            sliderDots[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    // شروع اتوپلی اسلایدر
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000); // هر 5 ثانیه
    }

    // ریست کردن تایمر اتوپلی
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }

    // شروع اسلایدر
    initSlider();

    // ==================== تایمر شمارنده معکوس ====================
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    // تنظیم زمان پایان (در این مثال، 3 روز آینده)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3);

    function updateCountdown() {
        const currentTime = new Date();
        const diff = endDate - currentTime;
        
        if (diff <= 0) {
            // تایمر به پایان رسیده است
            clearInterval(timerInterval);
            
            if (daysElement) daysElement.textContent = '00';
            if (hoursElement) hoursElement.textContent = '00';
            if (minutesElement) minutesElement.textContent = '00';
            if (secondsElement) secondsElement.textContent = '00';
            
            return;
        }
        
        // محاسبه زمان باقی‌مانده
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        // به‌روزرسانی المنت‌های DOM
        if (daysElement) daysElement.textContent = days < 10 ? `0${days}` : days;
        if (hoursElement) hoursElement.textContent = hours < 10 ? `0${hours}` : hours;
        if (minutesElement) minutesElement.textContent = minutes < 10 ? `0${minutes}` : minutes;
        if (secondsElement) secondsElement.textContent = seconds < 10 ? `0${seconds}` : seconds;
    }

    // اولین اجرای تابع به‌روزرسانی
    if (daysElement || hoursElement || minutesElement || secondsElement) {
        updateCountdown();
        // بروزرسانی هر ثانیه
        const timerInterval = setInterval(updateCountdown, 1000);
    }

    // ==================== سبد خرید - کنترل‌های تعداد ====================
    const quantityBtns = document.querySelectorAll('.quantity-btn');
    
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                if (value < parseInt(input.max)) {
                    input.value = value + 1;
                }
            } else if (this.classList.contains('minus')) {
                if (value > parseInt(input.min)) {
                    input.value = value - 1;
                }
            }
            
            // به‌روزرسانی جمع سبد خرید
            updateCartTotal();
        });
    });

    // حذف محصول از سبد خرید
    const removeItemBtns = document.querySelectorAll('.remove-item');
    
    removeItemBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            
            // انیمیشن حذف
            cartItem.style.opacity = '0';
            cartItem.style.height = cartItem.offsetHeight + 'px';
            cartItem.style.transition = 'opacity 0.3s ease, height 0.5s ease 0.3s, margin 0.5s ease 0.3s, padding 0.5s ease 0.3s';
            
            setTimeout(() => {
                cartItem.style.height = '0';
                cartItem.style.marginTop = '0';
                cartItem.style.marginBottom = '0';
                cartItem.style.paddingTop = '0';
                cartItem.style.paddingBottom = '0';
                
                setTimeout(() => {
                    cartItem.remove();
                    updateCartTotal();
                    
                    // اگر سبد خالی است، نمایش پیام خالی بودن
                    const cartItems = document.querySelectorAll('.cart-item');
                    if (cartItems.length === 0) {
                        const cartItemsContainer = document.querySelector('.cart-items');
                        cartItemsContainer.innerHTML = '<div class="empty-cart">سبد خرید شما خالی است</div>';
                        
                        // غیرفعال کردن دکمه تکمیل سفارش
                        const checkoutBtn = document.querySelector('.checkout-btn');
                        if (checkoutBtn) {
                            checkoutBtn.disabled = true;
                        }
                    }
                }, 500);
            }, 300);
        });
    });

    // افزودن پیشنهادات به سبد خرید
    const addSuggestionBtns = document.querySelectorAll('.add-suggestion');
    
    addSuggestionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const suggestionItem = this.closest('.suggestion-item');
            const productName = suggestionItem.querySelector('h5').textContent;
            const productPrice = suggestionItem.querySelector('.suggestion-price').textContent;
            const productImage = suggestionItem.querySelector('img').src;
            
            // افزودن به سبد خرید
            const cartItemsContainer = document.querySelector('.cart-items');
            const emptyCart = cartItemsContainer.querySelector('.empty-cart');
            
            if (emptyCart) {
                emptyCart.remove();
            }
            
            const newCartItem = `
                <div class="cart-item" style="opacity: 0; transform: translateY(20px);">
                    <div class="cart-item-image">
                        <img src="${productImage}" alt="${productName}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${productName}</h4>
                        <div class="cart-item-meta">
                            <span class="cart-item-size">سایز: N/A</span>
                            <span class="cart-item-color">رنگ: پیش‌فرض</span>
                        </div>
                        <div class="cart-item-price">
                            <span class="cart-item-current-price">${productPrice}</span>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" value="1" min="1" max="10" class="quantity-input">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="remove-item">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.insertAdjacentHTML('beforeend', newCartItem);
            
            // انیمیشن نمایش محصول جدید
            setTimeout(() => {
                const newItem = cartItemsContainer.lastElementChild;
                newItem.style.opacity = '1';
                newItem.style.transform = 'translateY(0)';
                newItem.style.transition = 'opacity 0.3s ease, transform 0.5s ease';
                
                // اضافه کردن رویدادها به دکمه‌های محصول جدید
                const newItemQuantityBtns = newItem.querySelectorAll('.quantity-btn');
                newItemQuantityBtns.forEach(qBtn => {
                    qBtn.addEventListener('click', function() {
                        const input = this.parentElement.querySelector('.quantity-input');
                        let value = parseInt(input.value);
                        
                        if (this.classList.contains('plus')) {
                            if (value < parseInt(input.max)) {
                                input.value = value + 1;
                            }
                        } else if (this.classList.contains('minus')) {
                            if (value > parseInt(input.min)) {
                                input.value = value - 1;
                            }
                        }
                        
                        updateCartTotal();
                    });
                });
                
                const newItemRemoveBtn = newItem.querySelector('.remove-item');
                newItemRemoveBtn.addEventListener('click', function() {
                    const cartItem = this.closest('.cart-item');
                    
                    cartItem.style.opacity = '0';
                    cartItem.style.height = cartItem.offsetHeight + 'px';
                    cartItem.style.transition = 'opacity 0.3s ease, height 0.5s ease 0.3s, margin 0.5s ease 0.3s, padding 0.5s ease 0.3s';
                    
                    setTimeout(() => {
                        cartItem.style.height = '0';
                        cartItem.style.marginTop = '0';
                        cartItem.style.marginBottom = '0';
                        cartItem.style.paddingTop = '0';
                        cartItem.style.paddingBottom = '0';
                        
                        setTimeout(() => {
                            cartItem.remove();
                            updateCartTotal();
                            
                            const cartItems = document.querySelectorAll('.cart-item');
                            if (cartItems.length === 0) {
                                cartItemsContainer.innerHTML = '<div class="empty-cart">سبد خرید شما خالی است</div>';
                                
                                const checkoutBtn = document.querySelector('.checkout-btn');
                                if (checkoutBtn) {
                                    checkoutBtn.disabled = true;
                                }
                            }
                        }, 500);
                    }, 300);
                });
                
                // به‌روزرسانی جمع سبد خرید
                updateCartTotal();
                
                // فعال کردن دکمه تکمیل سفارش
                const checkoutBtn = document.querySelector('.checkout-btn');
                if (checkoutBtn) {
                    checkoutBtn.disabled = false;
                }
            }, 10);
            
            // نمایش پیام تأیید
            const toast = document.createElement('div');
            toast.className = 'toast success';
            toast.innerHTML = `
                <div class="toast-icon">
                    <i class="ri-check-line"></i>
                </div>
                <div class="toast-content">
                    <p>${productName} به سبد خرید اضافه شد</p>
                </div>
                <button class="toast-close">
                    <i class="ri-close-line"></i>
                </button>
            `;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
                
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        toast.remove();
                    }, 300);
                }, 3000);
            }, 100);
            
            // اضافه کردن رویداد بستن toast
            const toastClose = toast.querySelector('.toast-close');
            if (toastClose) {
                toastClose.addEventListener('click', () => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        toast.remove();
                    }, 300);
                });
            }
        });
    });

    // به‌روزرسانی جمع سبد خرید
    function updateCartTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalPrice = 0;
        let totalDiscount = 0;
        
        cartItems.forEach(item => {
            const quantityInput = item.querySelector('.quantity-input');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            
            const currentPriceElement = item.querySelector('.cart-item-current-price');
            let currentPrice = 0;
            
            if (currentPriceElement) {
                // حذف تومان و کاراکترهای غیر عددی
                currentPrice = currentPriceElement.textContent.replace(/[^\d]/g, '');
                currentPrice = parseInt(currentPrice);
            }
            
            const oldPriceElement = item.querySelector('.cart-item-old-price');
            let oldPrice = 0;
            
            if (oldPriceElement) {
                oldPrice = oldPriceElement.textContent.replace(/[^\d]/g, '');
                oldPrice = parseInt(oldPrice);
                
                // محاسبه تخفیف
                if (oldPrice > currentPrice) {
                    totalDiscount += (oldPrice - currentPrice) * quantity;
                }
            }
            
            totalPrice += currentPrice * quantity;
        });
        
        // به‌روزرسانی اطلاعات در DOM
        const totalPriceElements = document.querySelectorAll('.summary-row:first-child span:last-child');
        const discountElements = document.querySelectorAll('.discount-value');
        const finalPriceElements = document.querySelectorAll('.summary-row.total span:last-child');
        
        totalPriceElements.forEach(element => {
            element.textContent = formatPrice(totalPrice + totalDiscount) + ' تومان';
        });
        
        discountElements.forEach(element => {
            element.textContent = formatPrice(totalDiscount) + ' تومان';
        });
        
        finalPriceElements.forEach(element => {
            element.textContent = formatPrice(totalPrice) + ' تومان';
        });
    }

    // فرمت کردن قیمت
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    // اجرای اولیه به‌روزرسانی جمع سبد خرید
    updateCartTotal();

    // ==================== افکت نمایش برای عناصر با اسکرول ====================
    // اضافه کردن کلاس fade-in به عناصر در هنگام مشاهده
    const fadeElements = document.querySelectorAll('.feature-card, .category-card, .product-card, .blog-card, .special-offer-card, .info-card');
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });

    // ==================== مدیریت حالت استیکی هدر ====================
    let lastScrollPosition = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const currentScrollPosition = window.pageYOffset;
        
        if (currentScrollPosition > 100) {
            header.classList.add('sticky-header');
            
            if (currentScrollPosition > lastScrollPosition) {
                // اسکرول به پایین
                header.classList.add('header-hidden');
            } else {
                // اسکرول به بالا
                header.classList.remove('header-hidden');
            }
        } else {
            header.classList.remove('sticky-header');
            header.classList.remove('header-hidden');
        }
        
        lastScrollPosition = currentScrollPosition;
    });
});
// ==================== مدیریت سبد خرید ====================

// آرایه برای نگه‌داری محصولات سبد خرید
let cartItems = [];

// المنت‌های DOM مرتبط با سبد خرید
const cartItemsContainer = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const cartDiscountElement = document.getElementById('cart-discount');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// رویداد افزودن به سبد برای همه دکمه‌های "افزودن به سبد"
document.addEventListener('DOMContentLoaded', function() {
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    // هم در صفحه محصولات و هم در صفحه اصلی 
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // دریافت اطلاعات محصول از data attributes
            const productId = this.getAttribute('data-product-id');
            const productName = this.getAttribute('data-product-name');
            const productPrice = parseInt(this.getAttribute('data-product-price'));
            const productOldPrice = this.getAttribute('data-product-oldprice') ? parseInt(this.getAttribute('data-product-oldprice')) : null;
            const productImage = this.getAttribute('data-product-image');
            
            // اضافه کردن محصول به سبد خرید
            addToCart(productId, productName, productPrice, productOldPrice, productImage);
            
            // نمایش سبد خرید
            toggleModal(cartDrawer, true);
            
            // نمایش پیام تأیید
            showToast(`${productName} به سبد خرید اضافه شد`, 'success');
        });
    });
    
    // بازیابی سبد خرید از localStorage اگر از قبل وجود داشته باشد
    loadCartFromLocalStorage();
});

/**
 * اضافه کردن محصول به سبد خرید
 */
function addToCart(id, name, price, oldPrice, image) {
    // بررسی اینکه آیا محصول قبلاً در سبد هست
    const existingItemIndex = cartItems.findIndex(item => item.id === id);
    
    if (existingItemIndex !== -1) {
        // اگر محصول قبلاً در سبد بوده، فقط تعداد را افزایش می‌دهیم
        cartItems[existingItemIndex].quantity += 1;
    } else {
        // ایجاد یک آیتم جدید برای سبد خرید
        const newItem = {
            id: id,
            name: name,
            price: price,
            oldPrice: oldPrice,
            image: image,
            quantity: 1
        };
        
        cartItems.push(newItem);
    }
    
    // به‌روزرسانی نمایش سبد خرید
    updateCartDisplay();
    
    // ذخیره‌سازی سبد خرید در localStorage
    saveCartToLocalStorage();
}

/**
 * حذف محصول از سبد خرید
 */
function removeFromCart(id) {
    cartItems = cartItems.filter(item => item.id !== id);
    
    // به‌روزرسانی نمایش سبد خرید
    updateCartDisplay();
    
    // ذخیره‌سازی سبد خرید در localStorage
    saveCartToLocalStorage();
}

/**
 * تغییر تعداد محصول در سبد خرید
 */
function updateItemQuantity(id, newQuantity) {
    const itemIndex = cartItems.findIndex(item => item.id === id);
    
    if (itemIndex !== -1) {
        // بررسی محدوده مجاز تعداد
        if (newQuantity < 1) {
            newQuantity = 1;
        } else if (newQuantity > 10) {
            newQuantity = 10;
        }
        
        cartItems[itemIndex].quantity = newQuantity;
        
        // به‌روزرسانی نمایش سبد خرید
        updateCartDisplay();
        
        // ذخیره‌سازی سبد خرید در localStorage
        saveCartToLocalStorage();
    }
}

/**
 * به‌روزرسانی نمایش سبد خرید در DOM
 */
function updateCartDisplay() {
    // اگر سبد خرید خالی است
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart" id="empty-cart">سبد خرید شما خالی است</div>';
        checkoutBtn.disabled = true;
        updateCartBadge(0);
        updateCartTotals(0, 0);
        return;
    }
    
    // مخفی کردن پیام "سبد خرید خالی است"
    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }
    
    // خالی کردن کانتینر محصولات سبد
    cartItemsContainer.innerHTML = '';
    
    // افزودن هر محصول به نمایش سبد خرید
    let totalItems = 0;
    
    cartItems.forEach(item => {
        const cartItemHTML = `
            <div class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <div class="cart-item-meta">
                        <span class="cart-item-size">سایز: 42</span>
                        <span class="cart-item-color">رنگ: مشکی</span>
                    </div>
                    <div class="cart-item-price">
                        <span class="cart-item-current-price">${formatPrice(item.price)} تومان</span>
                        ${item.oldPrice ? `<span class="cart-item-old-price">${formatPrice(item.oldPrice)} تومان</span>` : ''}
                    </div>
                </div>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-product-id="${item.id}">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="10" class="quantity-input" data-product-id="${item.id}">
                        <button class="quantity-btn plus" data-product-id="${item.id}">+</button>
                    </div>
                    <button class="remove-item" data-product-id="${item.id}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </div>
            </div>
        `;
        
        cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
        totalItems += item.quantity;
    });
    
    // فعال کردن دکمه تکمیل سفارش
    checkoutBtn.disabled = false;
    
    // به‌روزرسانی تعداد آیتم‌ها در بج منو
    updateCartBadge(totalItems);
    
    // به‌روزرسانی محاسبات قیمت
    calculateTotals();
    
    // اضافه کردن رویدادها به دکمه‌های سبد خرید
    attachCartItemEvents();
}

/**
 * اضافه کردن رویدادها به دکمه‌های محصول در سبد خرید
 */
function attachCartItemEvents() {
    // دکمه‌های کم و زیاد کردن تعداد
    document.querySelectorAll('.quantity-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            
            if (this.classList.contains('plus')) {
                if (value < 10) {
                    value += 1;
                }
            } else if (this.classList.contains('minus')) {
                if (value > 1) {
                    value -= 1;
                }
            }
            
            input.value = value;
            updateItemQuantity(productId, value);
        });
    });
    
    // تغییر تعداد با ورودی مستقیم
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = this.getAttribute('data-product-id');
            let value = parseInt(this.value);
            
            if (isNaN(value) || value < 1) {
                value = 1;
                this.value = 1;
            } else if (value > 10) {
                value = 10;
                this.value = 10;
            }
            
            updateItemQuantity(productId, value);
        });
    });
    
    // دکمه‌های حذف محصول
    document.querySelectorAll('.remove-item').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const cartItem = this.closest('.cart-item');
            
            // انیمیشن حذف
            cartItem.style.opacity = '0';
            cartItem.style.height = cartItem.offsetHeight + 'px';
            cartItem.style.transition = 'opacity 0.3s ease, height 0.5s ease 0.3s, margin 0.5s ease 0.3s, padding 0.5s ease 0.3s';
            
            setTimeout(() => {
                cartItem.style.height = '0';
                cartItem.style.marginTop = '0';
                cartItem.style.marginBottom = '0';
                cartItem.style.paddingTop = '0';
                cartItem.style.paddingBottom = '0';
                
                setTimeout(() => {
                    // حذف از آرایه سبد خرید
                    removeFromCart(productId);
                }, 500);
            }, 300);
        });
    });
}

/**
 * محاسبه مجموع قیمت‌ها
 */
function calculateTotals() {
    let subtotal = 0;
    let discount = 0;
    
    cartItems.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        if (item.oldPrice) {
            const itemDiscount = (item.oldPrice - item.price) * item.quantity;
            discount += itemDiscount;
        }
    });
    
    updateCartTotals(subtotal, discount);
}

/**
 * به‌روزرسانی نمایش مجموع قیمت‌ها
 */
function updateCartTotals(subtotal, discount) {
    const total = subtotal;
    
    if (cartSubtotalElement) {
        cartSubtotalElement.textContent = `${formatPrice(subtotal + discount)} تومان`;
    }
    
    if (cartDiscountElement) {
        cartDiscountElement.textContent = `${formatPrice(discount)} تومان`;
    }
    
    if (cartTotalElement) {
        cartTotalElement.textContent = `${formatPrice(total)} تومان`;
    }
}

/**
 * به‌روزرسانی تعداد آیتم‌ها در بج منو
 */
function updateCartBadge(count) {
    const badge = document.querySelector('.cart-toggle .badge');
    if (badge) {
        badge.textContent = count;
        
        if (count === 0) {
            badge.style.display = 'none';
        } else {
            badge.style.display = 'flex';
        }
    }
}

/**
 * فرمت کردن قیمت با جداکننده هزارگان
 */
function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * ذخیره سبد خرید در localStorage
 */
function saveCartToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

/**
 * بازیابی سبد خرید از localStorage
 */
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cartItems');
    
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

/**
 * نمایش پیام toast
 */
function showToast(message, type = 'success') {
    // حذف toast قبلی در صورت وجود
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="ri-${type === 'success' ? 'check-line' : 'information-line'}"></i>
        </div>
        <div class="toast-content">
            <p>${message}</p>
        </div>
        <button class="toast-close">
            <i class="ri-close-line"></i>
        </button>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }, 100);
    
    // اضافه کردن رویداد بستن toast
    const toastClose = toast.querySelector('.toast-close');
    if (toastClose) {
        toastClose.addEventListener('click', () => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        });
    }
}

// اسکریپت چت آنلاین با کدنویسی ساده‌تر
document.addEventListener('DOMContentLoaded', function() {
    // انتخاب عناصر اصلی
    const chatToggle = document.getElementById('chat-toggle');
    const chatPopup = document.getElementById('chat-popup');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
    const chatBody = document.getElementById('chat-body');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const chatBadge = document.getElementById('chat-badge');

    // باز کردن چت با کلیک روی دکمه
    if (chatToggle) {
        chatToggle.onclick = function() {
            chatPopup.style.opacity = '1';
            chatPopup.style.visibility = 'visible';
            chatPopup.style.transform = 'translateY(0)';
            if (modalBackdrop) modalBackdrop.classList.add('active');
            if (chatBadge) chatBadge.style.display = 'none';
        };
    }

    // بستن چت
    if (closeChat) {
        closeChat.onclick = function() {
            chatPopup.style.opacity = '0';
            chatPopup.style.visibility = 'hidden';
            chatPopup.style.transform = 'translateY(20px)';
            if (modalBackdrop) modalBackdrop.classList.remove('active');
        };
    }

    // بستن با کلیک روی backdrop
    if (modalBackdrop) {
        modalBackdrop.onclick = function() {
            chatPopup.style.opacity = '0';
            chatPopup.style.visibility = 'hidden';
            chatPopup.style.transform = 'translateY(20px)';
            modalBackdrop.classList.remove('active');
        };
    }

    // ارسال پیام
    if (sendMessage && chatInput) {
        sendMessage.onclick = function() {
            sendUserMessage();
        };
        
        chatInput.onkeypress = function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendUserMessage();
            }
        };
    }

    // تابع ارسال پیام کاربر
    function sendUserMessage() {
        const messageText = chatInput.value.trim();
        if (!messageText) return;
        
        // ایجاد یک عنصر پیام جدید
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = 'chat-message user';
        
        const time = new Date();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        
        userMsgDiv.innerHTML = `
            <div class="message-content">
                <div class="message-text">${messageText}</div>
                <div class="message-time">${hours}:${minutes}</div>
            </div>
        `;
        
        // افزودن به چت
        chatBody.appendChild(userMsgDiv);
        
        // پاک کردن فیلد ورودی
        chatInput.value = '';
        
        // اسکرول به پایین
        chatBody.scrollTop = chatBody.scrollHeight;
        
        // شبیه‌سازی پاسخ بعد از 2 ثانیه
        setTimeout(function() {
            const supportMsgDiv = document.createElement('div');
            supportMsgDiv.className = 'chat-message support';
            
            supportMsgDiv.innerHTML = `
                <div class="chat-avatar">
                    <img src="images/support-avatar.webp" alt="پشتیبان">
                </div>
                <div class="message-content">
                    <div class="message-text">ممنون از پیام شما. کارشناسان ما در اسرع وقت پاسخگوی شما خواهند بود.</div>
                    <div class="message-time">${hours}:${minutes}</div>
                </div>
            `;
            
            chatBody.appendChild(supportMsgDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 2000);
    }
});
// اسکریپت کامل چت آنلاین - تمام دکمه‌ها فعال
document.addEventListener('DOMContentLoaded', function() {
    // === انتخاب تمام عناصر مورد نیاز ===
    // عناصر اصلی
    const chatToggle = document.getElementById('chat-toggle');
    const chatPopup = document.getElementById('chat-popup');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendMessage = document.getElementById('send-message');
    const chatBody = document.getElementById('chat-body');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const chatBadge = document.getElementById('chat-badge');
    
    // دکمه‌های اضافی
    const clearChat = document.getElementById('clear-chat');
    const voiceChatBtn = document.getElementById('voice-chat-btn');
    const attachFile = document.getElementById('attach-file');
    const sendEmoji = document.getElementById('send-emoji');
    const emojiPanel = document.getElementById('emoji-panel');
    const contactPanel = document.getElementById('chat-contact-panel');
    const startChatBtn = document.getElementById('start-chat-btn');
    const closeContactPanel = document.getElementById('close-contact-panel');
    const typingIndicator = document.getElementById('typing-indicator');
    
    // === مدیریت باز و بسته کردن چت ===
    if (chatToggle) {
        chatToggle.addEventListener('click', function() {
            chatPopup.style.opacity = '1';
            chatPopup.style.visibility = 'visible';
            chatPopup.style.transform = 'translateY(0)';
            if (modalBackdrop) modalBackdrop.classList.add('active');
            if (chatBadge) chatBadge.style.display = 'none';
            
            // اولین بار - نمایش پنل اطلاعات تماس
            if (!localStorage.getItem('chat_started') && contactPanel) {
                contactPanel.style.display = 'flex';
            } else {
                scrollToBottom();
                simulateTyping();
            }
        });
    }
    
    // بستن چت
    if (closeChat) {
        closeChat.addEventListener('click', function() {
            chatPopup.style.opacity = '0';
            chatPopup.style.visibility = 'hidden';
            chatPopup.style.transform = 'translateY(20px)';
            if (modalBackdrop) modalBackdrop.classList.remove('active');
            if (emojiPanel) emojiPanel.style.display = 'none';
            if (contactPanel) contactPanel.style.display = 'none';
        });
    }
    
    // بستن با کلیک روی backdrop
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', function() {
            chatPopup.style.opacity = '0';
            chatPopup.style.visibility = 'hidden';
            chatPopup.style.transform = 'translateY(20px)';
            modalBackdrop.classList.remove('active');
            if (emojiPanel) emojiPanel.style.display = 'none';
        });
    }
    
    // === پنل اطلاعات تماس ===
    if (startChatBtn && contactPanel) {
        startChatBtn.addEventListener('click', function() {
            const nameInput = document.getElementById('contact-name');
            const phoneInput = document.getElementById('contact-phone');
            
            if (!nameInput || !nameInput.value.trim() || !phoneInput || !phoneInput.value.trim()) {
                showSystemMessage('لطفاً نام و شماره تماس خود را وارد کنید');
                return;
            }
            
            // ذخیره اطلاعات کاربر
            localStorage.setItem('chat_started', 'true');
            localStorage.setItem('chat_user_name', nameInput.value.trim());
            localStorage.setItem('chat_user_phone', phoneInput.value.trim());
            
            // مخفی کردن پنل و نمایش چت
            contactPanel.style.display = 'none';
            
            // پیام خوش‌آمدگویی شخصی
            showSystemMessage(`${nameInput.value.trim()} عزیز، به پشتیبانی آنلاین فروشگاه امیری خوش آمدید!`);
            simulateTyping();
            setTimeout(() => {
                showSupportMessage(`سلام ${nameInput.value.trim()} عزیز! من علی از تیم پشتیبانی هستم. چطور می‌توانم کمک‌تان کنم؟`);
            }, 2000);
        });
    }
    
    // بستن پنل اطلاعات تماس
    if (closeContactPanel && contactPanel) {
        closeContactPanel.addEventListener('click', function() {
            contactPanel.style.display = 'none';
        });
    }
    
    // === ارسال پیام ===
    if (sendMessage && chatInput) {
        sendMessage.addEventListener('click', function() {
            sendUserMessage();
        });
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendUserMessage();
            }
        });
        
        // ارسال پیام
        function sendUserMessage() {
            const messageText = chatInput.value.trim();
            if (!messageText) return;
            
            showUserMessage(messageText);
            chatInput.value = '';
            
            // پاسخ اتوماتیک
            simulateTyping();
            setTimeout(() => {
                respondToUserMessage(messageText);
            }, 2500);
        }
    }
    
    // === دکمه پاک کردن تاریخچه چت ===
    if (clearChat) {
        clearChat.addEventListener('click', function() {
            // پاک کردن پیام‌های کاربر
            const userMessages = chatBody.querySelectorAll('.chat-message.user');
            userMessages.forEach(message => message.remove());
            
            showSystemMessage('تاریخچه چت پاک شد');
        });
    }
    
    // === دکمه ضبط صدا ===
    if (voiceChatBtn) {
        voiceChatBtn.addEventListener('click', function() {
            showSystemMessage('ضبط صدا در حال حاضر فعال نیست');
            
            // انیمیشن نمایشی
            this.classList.add('recording');
            setTimeout(() => {
                this.classList.remove('recording');
            }, 2000);
        });
    }
    
    // === دکمه ارسال فایل ===
    if (attachFile) {
        attachFile.addEventListener('click', function() {
            // ایجاد یک المنت input مخفی برای انتخاب فایل
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'image/*,.pdf,.doc,.docx';
            fileInput.style.display = 'none';
            document.body.appendChild(fileInput);
            
            fileInput.click();
            
            fileInput.addEventListener('change', function() {
                if (this.files && this.files.length > 0) {
                    const file = this.files[0];
                    if (file.size > 5 * 1024 * 1024) { // محدودیت 5 مگابایت
                        showSystemMessage('حداکثر اندازه فایل 5 مگابایت است');
                        return;
                    }
                    
                    showSystemMessage(`فایل "${file.name}" با موفقیت بارگذاری شد`);
                    
                    // نمایش پیام ارسال فایل در چت
                    showUserMessage(`<div class="file-message">
                        <i class="ri-file-line"></i>
                        <span>${file.name}</span>
                    </div>`);
                    
                    // پاسخ اتوماتیک
                    simulateTyping();
                    setTimeout(() => {
                        showSupportMessage('فایل شما دریافت شد. در اسرع وقت بررسی خواهد شد.');
                    }, 2000);
                }
                document.body.removeChild(fileInput);
            });
        });
    }
    
    // === دکمه ایموجی و پنل ایموجی ===
    if (sendEmoji && emojiPanel) {
        sendEmoji.addEventListener('click', function() {
            emojiPanel.style.display = emojiPanel.style.display === 'block' ? 'none' : 'block';
            if (emojiPanel.style.display === 'block') {
                setTimeout(() => {
                    emojiPanel.style.opacity = '1';
                    emojiPanel.style.transform = 'translateY(0)';
                }, 10);
            } else {
                emojiPanel.style.opacity = '0';
                emojiPanel.style.transform = 'translateY(10px)';
            }
        });
        
        // دکمه‌های دسته‌بندی ایموجی
        const emojiCategories = document.querySelectorAll('.emoji-category');
        if (emojiCategories.length > 0) {
            emojiCategories.forEach(category => {
                category.addEventListener('click', function() {
                    // حذف کلاس active از همه دکمه‌ها
                    emojiCategories.forEach(cat => cat.classList.remove('active'));
                    // اضافه کردن کلاس active به دکمه کلیک شده
                    this.classList.add('active');
                    
                    // در یک پیاده‌سازی واقعی، اینجا ایموجی‌های متناسب با دسته‌بندی نمایش داده می‌شوند
                });
            });
        }
        
        // کلیک روی ایموجی‌ها
        const emojis = document.querySelectorAll('.emoji');
        if (emojis.length > 0) {
            emojis.forEach(emoji => {
                emoji.addEventListener('click', function() {
                    const emojiChar = this.getAttribute('data-emoji');
                    chatInput.value += emojiChar;
                    chatInput.focus();
                });
            });
        }
    }
    
    // === توابع کمکی ===
    // نمایش پیام کاربر
    function showUserMessage(messageText) {
        const messageHtml = `
            <div class="chat-message user">
                <div class="message-content">
                    <div class="message-text">${messageText}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
        
        chatBody.insertAdjacentHTML('beforeend', messageHtml);
        scrollToBottom();
    }
    
    // نمایش پیام پشتیبان
    function showSupportMessage(messageText) {
        const messageHtml = `
            <div class="chat-message support">
                <div class="chat-avatar">
                    <img src="images/support-avatar.webp" alt="پشتیبان">
                </div>
                <div class="message-content">
                    <div class="message-text">${messageText}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
        
        chatBody.insertAdjacentHTML('beforeend', messageHtml);
        scrollToBottom();
    }
    
    // نمایش پیام سیستمی
    function showSystemMessage(messageText) {
        const messageHtml = `
            <div class="chat-message system">
                <div class="message-content">
                    <div class="message-text">${messageText}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                </div>
            </div>
        `;
        
        chatBody.insertAdjacentHTML('beforeend', messageHtml);
        scrollToBottom();
    }
    
    // شبیه‌سازی تایپ کردن پشتیبان
    function simulateTyping() {
        if (typingIndicator) {
            typingIndicator.style.display = 'inline-block';
            setTimeout(() => {
                typingIndicator.style.display = 'none';
            }, 2000);
        }
    }
    
    // دریافت زمان فعلی به فرمت ساعت:دقیقه
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        if (hours < 10) hours = '0' + hours;
        if (minutes < 10) minutes = '0' + minutes;
        
        return `${hours}:${minutes}`;
    }
    
    // اسکرول به پایین چت
    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
    
    // پاسخ اتوماتیک به پیام کاربر
    function respondToUserMessage(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('سلام') || lowerMessage.includes('درود')) {
            showSupportMessage('سلام! خوش آمدید. چطور می‌توانم کمک‌تان کنم؟');
        } 
        else if (lowerMessage.includes('قیمت') || lowerMessage.includes('چند')) {
            showSupportMessage('قیمت محصولات ما متفاوت است. می‌توانید در صفحه محصولات همه قیمت‌ها را مشاهده کنید. آیا محصول خاصی مد نظرتان است؟');
        }
        else if (lowerMessage.includes('ارسال') || lowerMessage.includes('پست')) {
            showSupportMessage('ارسال محصولات به سراسر کشور انجام می‌شود و برای سفارش‌های بالای 500 هزار تومان رایگان است.');
        }
        else if (lowerMessage.includes('گارانتی') || lowerMessage.includes('ضمانت')) {
            showSupportMessage('تمام محصولات ما دارای ضمانت اصالت و گارانتی تعویض 7 روزه هستند.');
        }
        else if (lowerMessage.includes('تماس') || lowerMessage.includes('شماره')) {
            showSupportMessage('شما می‌توانید با شماره 09900859556 تماس بگیرید یا از طریق همین چت با ما در ارتباط باشید.');
        }
        else if (lowerMessage.includes('نایک') || lowerMessage.includes('nike')) {
            showSupportMessage('ما انواع مختلف کفش‌های نایک را با گارانتی اصالت ارائه می‌دهیم. می‌توانید به صفحه محصولات مراجعه کنید یا مدل خاصی که دنبالش هستید را به من بگویید.');
        }
        else if (lowerMessage.includes('آدیداس') || lowerMessage.includes('adidas')) {
            showSupportMessage('کفش‌های آدیداس ما از پرطرفدارترین محصولات فروشگاه هستند. در حال حاضر مدل‌های اولترابوست و استن اسمیت موجود است.');
        }
        else if (lowerMessage.includes('سایز') || lowerMessage.includes('اندازه')) {
            showSupportMessage('سایزهای موجود هر کفش در صفحه محصول ذکر شده است. همچنین می‌توانید از قابلیت واقعیت افزوده ما برای امتحان مجازی کفش استفاده کنید.');
        }
        else {
            showSupportMessage('ممنون از پیام شما. آیا سوال دیگری دارید که بتوانم کمکتان کنم؟');
        }
    }
});
// اسکریپت اسلایدر مدرن و ترند 2025
document.addEventListener('DOMContentLoaded', function() {
    // متغیرهای اصلی اسلایدر
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const paginationDots = document.querySelectorAll('.pagination-dot');
    
    let currentSlideIndex = 0;
    let slideInterval;
    const slideDelay = 7000; // زمان تغییر خودکار اسلاید (7 ثانیه)
    
    // راه‌اندازی اولیه اسلایدر
    function initSlider() {
        // نمایش اسلاید اول
        showSlide(0);
        
        // شروع اسلاید خودکار
        startAutoSlide();
        
        // اضافه کردن ایونت لیسنرها
        prevBtn.addEventListener('click', goToPrevSlide);
        nextBtn.addEventListener('click', goToNextSlide);
        
        // نقاط پیمایش
        paginationDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoSlide();
            });
        });
        
        // توقف اسلاید خودکار با هاور
        document.querySelector('.hero-slider').addEventListener('mouseenter', stopAutoSlide);
        document.querySelector('.hero-slider').addEventListener('mouseleave', startAutoSlide);
        
        // اضافه کردن سوایپ برای موبایل
        setupTouchSwipe();
    }
    
    // نمایش اسلاید
    function showSlide(index) {
        // مخفی کردن همه اسلایدها
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // به‌روزرسانی نقاط پیمایش
        paginationDots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // فعال کردن اسلاید جاری
        slides[index].classList.add('active');
        paginationDots[index].classList.add('active');
        
        // به‌روزرسانی شاخص اسلاید فعلی
        currentSlideIndex = index;
        
        // به‌روزرسانی تایمر تخفیف اگر در اسلاید فروش است
        if (slides[index].classList.contains('sale-slide')) {
            updateSaleTimer();
        }
    }
    
    // رفتن به اسلاید بعدی
    function goToNextSlide() {
        let nextIndex = currentSlideIndex + 1;
        if (nextIndex >= slides.length) {
            nextIndex = 0;
        }
        showSlide(nextIndex);
        resetAutoSlide();
    }
    
    // رفتن به اسلاید قبلی
    function goToPrevSlide() {
        let prevIndex = currentSlideIndex - 1;
        if (prevIndex < 0) {
            prevIndex = slides.length - 1;
        }
        showSlide(prevIndex);
        resetAutoSlide();
    }
    
    // شروع اسلاید خودکار
    function startAutoSlide() {
        stopAutoSlide(); // اطمینان از عدم وجود اینتروال قبلی
        slideInterval = setInterval(goToNextSlide, slideDelay);
    }
    
    // توقف اسلاید خودکار
    function stopAutoSlide() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }
    
    // ریست کردن تایمر اسلاید خودکار
    function resetAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }
    
    // راه‌اندازی سوایپ برای موبایل
    function setupTouchSwipe() {
        const slider = document.querySelector('.hero-slider');
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        slider.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
        
        function handleSwipe() {
            // حداقل 50 پیکسل سوایپ
            if (touchEndX < touchStartX - 50) {
                // سوایپ به چپ (اسلاید بعدی)
                goToNextSlide();
            } else if (touchEndX > touchStartX + 50) {
                // سوایپ به راست (اسلاید قبلی)
                goToPrevSlide();
            }
        }
    }
    
    // به‌روزرسانی تایمر تخفیف ویژه
    function updateSaleTimer() {
        // زمان پایان تخفیف (مثال: 3 روز از الان)
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 3);
        
        // به‌روزرسانی تایمر
        function updateTimer() {
            const now = new Date();
            const diff = endDate - now;
            
            if (diff <= 0) {
                // پایان تخفیف
                document.querySelectorAll('.unit-value').forEach(el => {
                    el.textContent = '00';
                });
                return;
            }
            
            // محاسبه زمان باقی‌مانده
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // به‌روزرسانی نمایش
            const timerElements = document.querySelectorAll('.timer-unit .unit-value');
            if (timerElements.length >= 4) {
                timerElements[0].textContent = days.toString().padStart(2, '0');
                timerElements[1].textContent = hours.toString().padStart(2, '0');
                timerElements[2].textContent = minutes.toString().padStart(2, '0');
                timerElements[3].textContent = seconds.toString().padStart(2, '0');
            }
        }
        
        // اجرای اولیه
        updateTimer();
        
        // به‌روزرسانی هر ثانیه
        const timerInterval = setInterval(updateTimer, 1000);
        
        // پاکسازی اینتروال هنگام تغییر اسلاید
        document.addEventListener('slide-changed', () => {
            clearInterval(timerInterval);
        });
    }
    
    // انیمیشن نمودار ضربان (برای اسلاید هوشمند)
    function setupPulseGraphAnimation() {
        const graphEl = document.querySelector('.pulse-graph');
        if (!graphEl) return;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 40');
        svg.setAttribute('preserveAspectRatio', 'none');
        
        const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
        polyline.setAttribute('points', '0,20 10,20 20,10 30,30 40,20 50,15 60,20 70,5 80,25 90,15 100,20');
        
        svg.appendChild(polyline);
        graphEl.appendChild(svg);
    }
    
    // نمایش آمار موجودی
    function updateStockProgress() {
        const stockProgressEls = document.querySelectorAll('.stock-progress');
        stockProgressEls.forEach(el => {
            const percent = el.getAttribute('data-percent') || '70';
            el.style.width = `${percent}%`;
        });
    }
    
    // فعال‌سازی اثر موج برای کلیک دکمه‌ها
    function enableRippleEffect() {
        const buttons = document.querySelectorAll('.primary-button, .outline-button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
    
    // راه‌اندازی همه قابلیت‌ها
    initSlider();
    setupPulseGraphAnimation();
    updateStockProgress();
    enableRippleEffect();
});
// اسلایدر اصلی
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slider-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slider-control.prev');
    const nextBtn = document.querySelector('.slider-control.next');
    
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000; // زمان تغییر خودکار اسلاید (5 ثانیه)
    
    // تابع نمایش اسلاید
    function showSlide(n) {
        // غیرفعال‌سازی همه اسلایدها و نشانگرها
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // فعال‌سازی اسلاید و نشانگر جاری
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    // تابع اسلاید بعدی
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // تابع اسلاید قبلی
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    // شروع تایمر تغییر خودکار اسلاید
    function startSlideTimer() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    
    // رویدادهای کلیک روی دکمه‌ها
    prevBtn.addEventListener('click', () => {
        prevSlide();
        startSlideTimer(); // ریست تایمر پس از کلیک
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        startSlideTimer(); // ریست تایمر پس از کلیک
    });
    
    // رویداد کلیک روی نشانگرها
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            startSlideTimer(); // ریست تایمر پس از کلیک
        });
    });
    
    // پشتیبانی از سوایپ برای دستگاه‌های لمسی
    let touchStartX = 0;
    let touchEndX = 0;
    
    const sliderContainer = document.querySelector('.slider-container');
    
    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    sliderContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        // حداقل 50 پیکسل باید سوایپ شود
        if (touchEndX < touchStartX - 50) {
            // سوایپ به چپ - اسلاید بعدی
            nextSlide();
            startSlideTimer();
        }
        
        if (touchEndX > touchStartX + 50) {
            // سوایپ به راست - اسلاید قبلی
            prevSlide();
            startSlideTimer();
        }
    }
    
    // توقف تایمر هنگام هاور روی اسلایدر
    sliderContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    // شروع مجدد تایمر هنگام خارج شدن موس از اسلایدر
    sliderContainer.addEventListener('mouseleave', () => {
        startSlideTimer();
    });
    
    // نمایش اسلاید اول و شروع تایمر
    showSlide(0);
    startSlideTimer();
    
    // لود تنبل تصاویر اسلایدهای بعدی
    function lazyLoadSlideImages() {
        const slideImages = document.querySelectorAll('.slide-image');
        slideImages.forEach((img, index) => {
            if (index > 0) {
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                    setTimeout(() => {
                        img.setAttribute('src', dataSrc);
                        img.removeAttribute('data-src');
                    }, 300);
                }
            }
        });
    }
    
    lazyLoadSlideImages();
});

// سیستم یکپارچه سبد خرید برای تمامی محصولات سایت
document.addEventListener('DOMContentLoaded', function() {
    // انتخاب تمامی دکمه‌های افزودن به سبد خرید در کل سایت
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn, .quick-add-btn, .product-card-btn, [data-action="add-to-cart"]');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            
            // یافتن نزدیک‌ترین کانتینر محصول
            const productContainer = this.closest('.product-card, .product-item, .trending-product-card, .featured-product, .suggestion-item, .special-offer-product');
            
            if (!productContainer) return;
            
            // استخراج اطلاعات محصول
            let productName, productPrice, productImage, productId;
            
            // استخراج نام محصول
            const nameElement = productContainer.querySelector('.product-title, .product-name, h4, h5, .card-title');
            productName = nameElement ? nameElement.textContent.trim() : 'محصول';
            
            // استخراج قیمت محصول
            const priceElement = productContainer.querySelector('.product-price, .price, .current-price');
            productPrice = priceElement ? priceElement.textContent.trim() : '0 تومان';
            
            // استخراج تصویر محصول
            const imageElement = productContainer.querySelector('img');
            productImage = imageElement ? imageElement.src : 'images/product-placeholder.jpg';
            
            // استخراج شناسه محصول
            productId = productContainer.dataset.productId || Math.random().toString(36).substr(2, 9);
            
            // افزودن محصول به سبد خرید
            addProductToCart(productId, productName, productPrice, productImage);
            
            // نمایش پیام موفقیت
            showToast(`${productName} به سبد خرید اضافه شد`);
        });
    });
    
    // افزودن محصول به سبد خرید
    function addProductToCart(productId, productName, productPrice, productImage) {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (!cartItemsContainer) return;
        
        // حذف پیام سبد خرید خالی اگر وجود دارد
        const emptyCart = cartItemsContainer.querySelector('.empty-cart');
        if (emptyCart) {
            emptyCart.remove();
        }
        
        // بررسی آیا محصول قبلاً در سبد وجود دارد
        const existingItem = document.querySelector(`.cart-item[data-product-id="${productId}"]`);
        
        if (existingItem) {
            // اگر محصول قبلاً در سبد وجود دارد، تعداد آن را افزایش می‌دهیم
            const quantityInput = existingItem.querySelector('.quantity-input');
            if (quantityInput) {
                const currentValue = parseInt(quantityInput.value);
                const maxValue = parseInt(quantityInput.max || 10);
                
                if (currentValue < maxValue) {
                    quantityInput.value = currentValue + 1;
                    
                    // انیمیشن برای نشان دادن افزایش تعداد
                    existingItem.style.animation = 'pulse 0.5s';
                    setTimeout(() => {
                        existingItem.style.animation = '';
                    }, 500);
                }
            }
        } else {
            // ایجاد آیتم جدید در سبد خرید
            const newCartItem = `
                <div class="cart-item" data-product-id="${productId}" style="opacity: 0; transform: translateY(20px);">
                    <div class="cart-item-image">
                        <img src="${productImage}" alt="${productName}">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${productName}</h4>
                        <div class="cart-item-meta">
                            <span class="cart-item-size">سایز: استاندارد</span>
                            <span class="cart-item-color">رنگ: پیش‌فرض</span>
                        </div>
                        <div class="cart-item-price">
                            <span class="cart-item-current-price">${productPrice}</span>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <div class="quantity-control">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" value="1" min="1" max="10" class="quantity-input">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="remove-item">
                            <i class="ri-delete-bin-line"></i>
                        </button>
                    </div>
                </div>
            `;
            
            cartItemsContainer.insertAdjacentHTML('beforeend', newCartItem);
            
            // انیمیشن نمایش محصول جدید
            setTimeout(() => {
                const newItem = cartItemsContainer.lastElementChild;
                newItem.style.opacity = '1';
                newItem.style.transform = 'translateY(0)';
                newItem.style.transition = 'opacity 0.3s ease, transform 0.5s ease';
                
                // اضافه کردن رویدادها به عناصر محصول جدید
                initCartItemEvents(newItem);
            }, 10);
        }
        
        // به‌روزرسانی جمع سبد خرید
        updateCartTotal();
        
        // فعال کردن دکمه تکمیل سفارش
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
        }
    }
    
    // اضافه کردن رویدادها به آیتم‌های سبد خرید
    function initCartItemEvents(cartItem) {
        // رویداد دکمه‌های تغییر تعداد
        const quantityBtns = cartItem.querySelectorAll('.quantity-btn');
        quantityBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.parentElement.querySelector('.quantity-input');
                let value = parseInt(input.value);
                
                if (this.classList.contains('plus')) {
                    if (value < parseInt(input.max || 10)) {
                        input.value = value + 1;
                    }
                } else if (this.classList.contains('minus')) {
                    if (value > parseInt(input.min || 1)) {
                        input.value = value - 1;
                    }
                }
                
                // به‌روزرسانی جمع سبد خرید
                updateCartTotal();
            });
        });
        
        // رویداد دکمه حذف
        const removeBtn = cartItem.querySelector('.remove-item');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                removeCartItem(cartItem);
            });
        }
    }
    
    // حذف محصول از سبد خرید
    function removeCartItem(cartItem) {
        // انیمیشن حذف
        cartItem.style.opacity = '0';
        cartItem.style.height = cartItem.offsetHeight + 'px';
        cartItem.style.transition = 'opacity 0.3s ease, height 0.5s ease 0.3s, margin 0.5s ease 0.3s, padding 0.5s ease 0.3s';
        
        setTimeout(() => {
            cartItem.style.height = '0';
            cartItem.style.marginTop = '0';
            cartItem.style.marginBottom = '0';
            cartItem.style.paddingTop = '0';
            cartItem.style.paddingBottom = '0';
            
            setTimeout(() => {
                cartItem.remove();
                updateCartTotal();
                
                // اگر سبد خالی است، نمایش پیام خالی بودن
                const cartItems = document.querySelectorAll('.cart-item');
                if (cartItems.length === 0) {
                    const cartItemsContainer = document.querySelector('.cart-items');
                    if (cartItemsContainer) {
                        cartItemsContainer.innerHTML = '<div class="empty-cart">سبد خرید شما خالی است</div>';
                        
                        // غیرفعال کردن دکمه تکمیل سفارش
                        const checkoutBtn = document.querySelector('.checkout-btn');
                        if (checkoutBtn) {
                            checkoutBtn.disabled = true;
                        }
                    }
                }
            }, 500);
        }, 300);
    }
    
    // به‌روزرسانی جمع سبد خرید
    function updateCartTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        let totalPrice = 0;
        let totalDiscount = 0;
        
        cartItems.forEach(item => {
            const quantityInput = item.querySelector('.quantity-input');
            const quantity = quantityInput ? parseInt(quantityInput.value) : 1;
            
            const currentPriceElement = item.querySelector('.cart-item-current-price');
            let currentPrice = 0;
            
            if (currentPriceElement) {
                // حذف تومان و کاراکترهای غیر عددی
                currentPrice = currentPriceElement.textContent.replace(/[^\d]/g, '');
                currentPrice = parseInt(currentPrice) || 0;
            }
            
            const oldPriceElement = item.querySelector('.cart-item-old-price');
            let oldPrice = 0;
            
            if (oldPriceElement) {
                oldPrice = oldPriceElement.textContent.replace(/[^\d]/g, '');
                oldPrice = parseInt(oldPrice) || 0;
                
                // محاسبه تخفیف
                if (oldPrice > currentPrice) {
                    totalDiscount += (oldPrice - currentPrice) * quantity;
                }
            }
            
            totalPrice += currentPrice * quantity;
        });
        
        // به‌روزرسانی اطلاعات در DOM
        const totalPriceElements = document.querySelectorAll('.summary-row:first-child span:last-child');
        const discountElements = document.querySelectorAll('.discount-value');
        const finalPriceElements = document.querySelectorAll('.summary-row.total span:last-child');
        
        totalPriceElements.forEach(element => {
            element.textContent = formatPrice(totalPrice + totalDiscount) + ' تومان';
        });
        
        discountElements.forEach(element => {
            element.textContent = formatPrice(totalDiscount) + ' تومان';
        });
        
        finalPriceElements.forEach(element => {
            element.textContent = formatPrice(totalPrice) + ' تومان';
        });
        
        // به‌روزرسانی تعداد محصولات در نمایشگر سبد خرید
        const cartCountElements = document.querySelectorAll('.cart-count');
        const totalItems = Array.from(cartItems).reduce((total, item) => {
            const quantityInput = item.querySelector('.quantity-input');
            return total + (quantityInput ? parseInt(quantityInput.value) : 1);
        }, 0);
        
        cartCountElements.forEach(element => {
            element.textContent = totalItems;
            
            // نمایش یا مخفی کردن نشانگر تعداد
            if (totalItems > 0) {
                element.style.display = 'flex';
            } else {
                element.style.display = 'none';
            }
        });
    }
    
    // نمایش پیام toast
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <div class="toast-icon">
                <i class="ri-${type === 'success' ? 'check' : 'information'}-line"></i>
            </div>
            <div class="toast-content">
                <p>${message}</p>
            </div>
            <button class="toast-close">
                <i class="ri-close-line"></i>
            </button>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, 3000);
        }, 100);
        
        // اضافه کردن رویداد بستن toast
        const toastClose = toast.querySelector('.toast-close');
        if (toastClose) {
            toastClose.addEventListener('click', () => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            });
        }
    }
    
    // فرمت کردن قیمت
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    
    // اضافه کردن رویدادها به آیتم‌های موجود در سبد خرید
    const existingCartItems = document.querySelectorAll('.cart-item');
    existingCartItems.forEach(item => {
        initCartItemEvents(item);
    });
    
    // اجرای اولیه به‌روزرسانی جمع سبد خرید
    updateCartTotal();
});


// مدیریت پنل حساب کاربری
document.addEventListener("DOMContentLoaded", function() {
    // متغیرهای اصلی
    const body = document.body;
    const profileToggle = document.querySelector(".profile-toggle");
    const profilePanel = document.querySelector(".profile-panel");
    const closeProfile = document.querySelector(".close-profile");
    const modalBackdrop = document.querySelector(".modal-backdrop");
    const switchToLogin = document.querySelector("#switch-to-login");
    const switchToRegister = document.querySelector("#switch-to-register");

    // مدیریت پنل حساب کاربری
    if (profileToggle && profilePanel && closeProfile && modalBackdrop) {
        // نمایش پنل کاربری با کلیک روی آیکون
        profileToggle.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            profilePanel.classList.add("active");
            modalBackdrop.classList.add("active");
            body.style.overflow = "hidden";
            document.body.classList.add("no-scroll");
        });
        
        // بستن پنل با کلیک روی دکمه بستن
        closeProfile.addEventListener("click", function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            profilePanel.classList.remove("active");
            modalBackdrop.classList.remove("active");
            body.style.overflow = "";
            document.body.classList.remove("no-scroll");
        });
        
        // تغییر بین فرم‌های ورود و ثبت‌نام
        if (switchToRegister) {
            switchToRegister.addEventListener("click", function(e) {
                e.preventDefault();
                const loginForm = document.querySelector(".login-form");
                const registerForm = document.querySelector(".register-form");
                if (loginForm && registerForm) {
                    loginForm.classList.remove("active");
                    registerForm.classList.add("active");
                }
            });
        }
        
        if (switchToLogin) {
            switchToLogin.addEventListener("click", function(e) {
                e.preventDefault();
                const loginForm = document.querySelector(".login-form");
                const registerForm = document.querySelector(".register-form");
                if (loginForm && registerForm) {
                    registerForm.classList.remove("active");
                    loginForm.classList.add("active");
                }
            });
        }
        
        // کنترل فرم‌های احراز هویت
        setupAuthForms();
    } else {
        console.error("عناصر ضروری پنل کاربری یافت نشد:", {
            profileToggle: !!profileToggle,
            profilePanel: !!profilePanel,
            closeProfile: !!closeProfile,
            modalBackdrop: !!modalBackdrop
        });
    }
    
    // بستن پنل با کلیک روی پس‌زمینه
    if (modalBackdrop) {
        modalBackdrop.addEventListener("click", function() {
            // بستن پنل پروفایل
            if (profilePanel) profilePanel.classList.remove("active");
            
            // حذف پس‌زمینه و فعال‌سازی اسکرول
            modalBackdrop.classList.remove("active");
            body.style.overflow = "";
            document.body.classList.remove("no-scroll");
        });
    }

    // تنظیم تمام رویدادهای کلیک فرم‌های احراز هویت
    function setupAuthForms() {
        const loginForm = document.querySelector(".login-form form");
        const registerForm = document.querySelector(".register-form form");
        const togglePasswordBtns = document.querySelectorAll(".toggle-password");
        
        // مدیریت نمایش/مخفی کردن رمز عبور
        if (togglePasswordBtns.length > 0) {
            togglePasswordBtns.forEach(btn => {
                btn.addEventListener("click", function() {
                    const passwordInput = this.parentElement.querySelector("input");
                    const icon = this.querySelector("i");
                    
                    if (passwordInput.type === "password") {
                        passwordInput.type = "text";
                        icon.classList.remove("ri-eye-line");
                        icon.classList.add("ri-eye-off-line");
                    } else {
                        passwordInput.type = "password";
                        icon.classList.remove("ri-eye-off-line");
                        icon.classList.add("ri-eye-line");
                    }
                });
            });
        }
        
        // مدیریت ارسال فرم ورود
        if (loginForm) {
            loginForm.addEventListener("submit", function(e) {
                e.preventDefault();
                
                const phoneInput = document.getElementById("login-phone");
                const passwordInput = document.getElementById("login-password");
                const rememberMeCheckbox = document.getElementById("remember-me");
                
                if (!phoneInput || !passwordInput) {
                    console.error("فیلدهای فرم ورود یافت نشد");
                    return;
                }
                
                const phone = phoneInput.value.trim();
                const password = passwordInput.value;
                const rememberMe = rememberMeCheckbox ? rememberMeCheckbox.checked : false;
                
                // اعتبارسنجی فرم
                if (!phone) {
                    showNotification("لطفاً شماره موبایل خود را وارد کنید", "error");
                    return;
                }
                
                if (!password) {
                    showNotification("لطفاً رمز عبور خود را وارد کنید", "error");
                    return;
                }
                
                // نمایش لودر
                showPageLoadingAnimation();
                
                // شبیه‌سازی درخواست ورود به سرور
                setTimeout(() => {
                    // ذخیره اطلاعات کاربر در localStorage
                    const userData = {
                        phone: phone,
                        isLoggedIn: true,
                        name: "کاربر تست",
                        lastLogin: new Date().toISOString()
                    };
                    
                    localStorage.setItem("userData", JSON.stringify(userData));
                    
                    // بستن پنل پروفایل
                    profilePanel.classList.remove("active");
                    modalBackdrop.classList.remove("active");
                    body.style.overflow = "";
                    document.body.classList.remove("no-scroll");
                    
                    // نمایش اعلان موفقیت
                    showNotification("ورود با موفقیت انجام شد", "success");
                    
                    // به‌روزرسانی UI برای کاربر وارد شده
                    updateProfileUIForLoggedInUser(userData);
                }, 1200);
            });
        }
        
        // مدیریت ارسال فرم ثبت‌نام
        if (registerForm) {
            registerForm.addEventListener("submit", function(e) {
                e.preventDefault();
                
                const nameInput = document.getElementById("register-name");
                const phoneInput = document.getElementById("register-phone");
                const passwordInput = document.getElementById("register-password");
                const termsAgreeCheckbox = document.getElementById("terms-agree");
                
                if (!nameInput || !phoneInput || !passwordInput || !termsAgreeCheckbox) {
                    console.error("فیلدهای فرم ثبت‌نام یافت نشد");
                    return;
                }
                
                const name = nameInput.value.trim();
                const phone = phoneInput.value.trim();
                const password = passwordInput.value;
                const termsAgreed = termsAgreeCheckbox.checked;
                
                // اعتبارسنجی فرم
                if (!name) {
                    showNotification("لطفاً نام و نام خانوادگی خود را وارد کنید", "error");
                    return;
                }
                
                if (!phone) {
                    showNotification("لطفاً شماره موبایل خود را وارد کنید", "error");
                    return;
                }
                
                if (!password) {
                    showNotification("لطفاً رمز عبور خود را وارد کنید", "error");
                    return;
                }
                
                if (password.length < 8) {
                    showNotification("رمز عبور باید حداقل 8 کاراکتر باشد", "error");
                    return;
                }
                
                if (!termsAgreed) {
                    showNotification("برای ثبت‌نام باید قوانین و مقررات را بپذیرید", "error");
                    return;
                }
                
                // نمایش لودر
                showPageLoadingAnimation();
                
                // شبیه‌سازی درخواست ثبت‌نام به سرور
                setTimeout(() => {
                    // نمایش اعلان موفقیت
                    showNotification("ثبت‌نام با موفقیت انجام شد", "success");
                    
                    // تغییر به فرم ورود
                    const loginForm = document.querySelector(".login-form");
                    const registerForm = document.querySelector(".register-form");
                    
                    if (loginForm && registerForm) {
                        registerForm.classList.remove("active");
                        loginForm.classList.add("active");
                        
                        // پر کردن خودکار فیلد شماره موبایل در فرم ورود
                        const loginPhoneInput = document.getElementById("login-phone");
                        if (loginPhoneInput) {
                            loginPhoneInput.value = phone;
                        }
                    }
                }, 1200);
            });
        }
    }
    
    // به‌روزرسانی UI پروفایل برای کاربر وارد شده
    function updateProfileUIForLoggedInUser(userData) {
        if (!profileToggle) return;
        
        // تغییر آیکون پروفایل
        const profileIcon = profileToggle.querySelector("i");
        if (profileIcon) {
            profileIcon.classList.remove("ri-user-3-line");
            profileIcon.classList.add("ri-user-smile-line");
        }
        
        // ایجاد پنل کاربر برای جایگزینی با فرم ورود
        const userPanelHTML = `
            <div class="user-panel active">
                <div class="user-welcome">
                    <div class="user-avatar">
                        <i class="ri-user-smile-fill"></i>
                    </div>
                    <div class="user-info">
                        <h4>خوش آمدید، ${userData.name}</h4>
                        <p>${maskPhoneNumber(userData.phone)}</p>
                    </div>
                </div>
                <div class="user-menu">
                    <a href="#" class="user-menu-item">
                        <i class="ri-shopping-bag-line"></i>
                        <span>سفارش‌های من</span>
                    </a>
                    <a href="#" class="user-menu-item">
                        <i class="ri-heart-line"></i>
                        <span>علاقه‌مندی‌ها</span>
                    </a>
                    <a href="#" class="user-menu-item">
                        <i class="ri-map-pin-line"></i>
                        <span>آدرس‌های من</span>
                    </a>
                    <a href="#" class="user-menu-item">
                        <i class="ri-user-settings-line"></i>
                        <span>اطلاعات حساب کاربری</span>
                    </a>
                </div>
                <button id="logout-btn" class="logout-btn">
                    <i class="ri-logout-box-line"></i>
                    <span>خروج از حساب کاربری</span>
                </button>
            </div>
        `;
        
        // جایگزینی فرم ورود با پنل کاربر
        const loginForm = document.querySelector(".login-form");
        const registerForm = document.querySelector(".register-form");
        
        if (loginForm && registerForm) {
            loginForm.classList.remove("active");
            registerForm.classList.remove("active");
            
            const profileContent = document.querySelector(".profile-content");
            if (profileContent) {
                // بررسی اگر پنل کاربر قبلاً وجود دارد، آن را حذف کن
                const existingUserPanel = profileContent.querySelector(".user-panel");
                if (existingUserPanel) {
                    existingUserPanel.remove();
                }
                
                // افزودن پنل کاربر جدید
                profileContent.insertAdjacentHTML("beforeend", userPanelHTML);
                
                // اضافه کردن رویداد به دکمه خروج
                const logoutBtn = document.getElementById("logout-btn");
                if (logoutBtn) {
                    logoutBtn.addEventListener("click", function() {
                        // حذف اطلاعات کاربر از localStorage
                        localStorage.removeItem("userData");
                        
                        // حذف پنل کاربر
                        const userPanel = document.querySelector(".user-panel");
                        if (userPanel) {
                            userPanel.remove();
                        }
                        
                        // بازگرداندن فرم ورود
                        loginForm.classList.add("active");
                        
                        // تغییر آیکون پروفایل به حالت اولیه
                        if (profileIcon) {
                            profileIcon.classList.remove("ri-user-smile-line");
                            profileIcon.classList.add("ri-user-3-line");
                        }
                        
                        // بستن پنل پروفایل
                        if (profilePanel) {
                            profilePanel.classList.remove("active");
                        }
                        if (modalBackdrop) {
                            modalBackdrop.classList.remove("active");
                        }
                        body.style.overflow = "";
                        document.body.classList.remove("no-scroll");
                        
                        // نمایش اعلان
                        showNotification("با موفقیت از حساب کاربری خارج شدید", "info");
                    });
                }
            }
        }
    }
    
    // پنهان کردن بخشی از شماره موبایل برای نمایش امن
    function maskPhoneNumber(phone) {
        if (!phone || phone.length < 11) return phone;
        return phone.substring(0, 4) + "***" + phone.substring(7);
    }
    
    // بررسی وضعیت ورود کاربر هنگام بارگذاری صفحه
    function checkUserLoginStatus() {
        const userData = localStorage.getItem("userData");
        if (userData) {
            try {
                const parsedUserData = JSON.parse(userData);
                if (parsedUserData.isLoggedIn) {
                    // به‌روزرسانی UI برای کاربر وارد شده
                    updateProfileUIForLoggedInUser(parsedUserData);
                }
            } catch (e) {
                console.error("خطا در بازیابی اطلاعات کاربر:", e);
                localStorage.removeItem("userData");
            }
        }
    }
    
    // نمایش اعلان
    function showNotification(message, type = "info") {
        // بررسی وجود دیو اعلان‌ها
        let notificationsContainer = document.querySelector(".notifications-container");
        
        // اگر وجود نداشت، آن را ایجاد کن
        if (!notificationsContainer) {
            notificationsContainer = document.createElement("div");
            notificationsContainer.className = "notifications-container";
            document.body.appendChild(notificationsContainer);
        }
        
        // ایجاد اعلان جدید
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        
        // مشخص کردن آیکون براساس نوع اعلان
        let icon = "";
        switch (type) {
            case "success":
                icon = '<i class="ri-check-line"></i>';
                break;
            case "error":
                icon = '<i class="ri-close-circle-line"></i>';
                break;
            case "warning":
                icon = '<i class="ri-alert-line"></i>';
                break;
            case "info":
                icon = '<i class="ri-information-line"></i>';
                break;
        }
        
        // افزودن محتوا به اعلان
        notification.innerHTML = `
            <div class="notification-icon">${icon}</div>
            <div class="notification-content">${message}</div>
            <button class="notification-close"><i class="ri-close-line"></i></button>
        `;
        
        // افزودن اعلان به کانتینر
        notificationsContainer.appendChild(notification);
        
        // نمایش اعلان با انیمیشن
        setTimeout(() => {
            notification.classList.add("show");
        }, 10);
        
        // دکمه بستن اعلان
        const closeBtn = notification.querySelector(".notification-close");
        closeBtn.addEventListener("click", () => {
            notification.classList.remove("show");
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // حذف خودکار اعلان پس از 5 ثانیه
        setTimeout(() => {
            if (notification.parentNode === notificationsContainer) {
                notification.classList.remove("show");
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // نمایش انیمیشن بارگذاری صفحه
    function showPageLoadingAnimation() {
        // بررسی وجود لودر
        let pageLoader = document.querySelector(".page-loader");
        
        // اگر وجود نداشت، آن را ایجاد کن
        if (!pageLoader) {
            pageLoader = document.createElement("div");
            pageLoader.className = "page-loader";
            pageLoader.innerHTML = `
                <div class="loader-content">
                    <div class="loader-spinner"></div>
                    <div class="loader-text">در حال بارگذاری...</div>
                </div>
            `;
            document.body.appendChild(pageLoader);
        }
        
        // نمایش لودر
        pageLoader.classList.add("active");
        
        // مخفی کردن لودر پس از 800 میلی‌ثانیه
        setTimeout(() => {
            pageLoader.classList.remove("active");
        }, 800);
    }
    
    // بررسی وضعیت ورود کاربر در هنگام بارگذاری صفحه
    checkUserLoginStatus();
});
document.addEventListener("DOMContentLoaded", function() {
    // ایجاد پیام خوش‌آمدگویی مدرن 2025
    setTimeout(() => {
        // ایجاد المان اصلی
        const welcomeMessage = document.createElement('div');
        welcomeMessage.className = 'modern-welcome';
        
        // اضافه کردن محتوا
        welcomeMessage.innerHTML = `
            <div class="welcome-container">
                <div class="welcome-header">
                    <div class="welcome-icon">
                        <i class="ri-sparkling-2-fill"></i>
                    </div>
                    <button class="close-welcome">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
                <div class="welcome-content">
                    <h2 class="welcome-title">به فروشگاه <span class="brand-highlight">امیری</span> خوش آمدید</h2>
                    <p class="welcome-subtitle">تجربه خرید هوشمند، مطمئن و متفاوت</p>
                    <div class="welcome-features">
                        <div class="welcome-feature">
                            <div class="feature-icon">
                                <i class="ri-shield-check-line"></i>
                            </div>
                            <div class="feature-text">ضمانت اصالت کالا</div>
                        </div>
                        <div class="welcome-feature">
                            <div class="feature-icon">
                                <i class="ri-truck-line"></i>
                            </div>
                            <div class="feature-text">ارسال سریع</div>
                        </div>
                        <div class="welcome-feature">
                            <div class="feature-icon">
                                <i class="ri-arrow-go-back-line"></i>
                            </div>
                            <div class="feature-text">7 روز بازگشت</div>
                        </div>
                    </div>
                </div>
                <div class="welcome-footer">
                    <button class="start-shopping-btn">
                        <span>شروع خرید</span>
                        <i class="ri-arrow-right-line"></i>
                    </button>
                </div>
                <div class="welcome-decoration">
                    <div class="deco-circle circle1"></div>
                    <div class="deco-circle circle2"></div>
                    <div class="deco-circle circle3"></div>
                </div>
            </div>
        `;
        
        // استایل‌های پیام خوش‌آمدگویی
        const style = document.createElement('style');
        style.textContent = `
            .modern-welcome {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                background-color: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(8px);
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            .welcome-container {
                background: linear-gradient(135deg, #ffffff, #f8faff);
                width: 90%;
                max-width: 500px;
                border-radius: 24px;
                overflow: hidden;
                box-shadow: 0 20px 60px rgba(71, 33, 255, 0.15), 0 0 30px rgba(71, 33, 255, 0.1);
                position: relative;
                transform: translateY(30px);
                transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
                border: 1px solid rgba(255, 255, 255, 0.8);
            }
            
            .welcome-header {
                padding: 20px 20px 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .welcome-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: linear-gradient(135deg, #4721ff, #6c4fff);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 20px;
                box-shadow: 0 4px 15px rgba(71, 33, 255, 0.3);
            }
            
            .close-welcome {
                width: 34px;
                height: 34px;
                border-radius: 50%;
                background-color: #f2f2f7;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: #666;
                font-size: 18px;
                transition: all 0.2s ease;
            }
            
            .close-welcome:hover {
                background-color: #e8e8f0;
                color: #333;
            }
            
            .welcome-content {
                padding: 20px 30px;
                text-align: center;
            }
            
            .welcome-title {
                margin: 0 0 10px;
                font-size: 24px;
                font-weight: 700;
                color: #1a1a1a;
                font-family: 'Vazirmatn', sans-serif;
            }
            
            .brand-highlight {
                background: linear-gradient(135deg, #4721ff, #673ab7);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                position: relative;
            }
            
            .brand-highlight::after {
                content: '';
                position: absolute;
                bottom: 2px;
                left: 0;
                width: 100%;
                height: 4px;
                background: linear-gradient(90deg, #4721ff33, #673ab733);
                border-radius: 2px;
                z-index: -1;
            }
            
            .welcome-subtitle {
                margin: 0 0 25px;
                font-size: 16px;
                color: #666;
                font-family: 'Vazirmatn', sans-serif;
            }
            
            .welcome-features {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
            }
            
            .welcome-feature {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                width: 33%;
            }
            
            .feature-icon {
                width: 45px;
                height: 45px;
                border-radius: 14px;
                background-color: rgba(71, 33, 255, 0.07);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #4721ff;
                font-size: 22px;
                margin-bottom: 5px;
            }
            
            .feature-text {
                font-size: 13px;
                color: #555;
                font-family: 'Vazirmatn', sans-serif;
                font-weight: 500;
            }
            
            .welcome-footer {
                padding: 0 30px 30px;
                text-align: center;
            }
            
            .start-shopping-btn {
                width: 100%;
                padding: 14px 20px;
                border-radius: 12px;
                background: linear-gradient(135deg, #4721ff, #6c4fff);
                border: none;
                color: white;
                font-family: 'Vazirmatn', sans-serif;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                box-shadow: 0 4px 15px rgba(71, 33, 255, 0.3);
                transition: transform 0.2s ease, box-shadow 0.2s ease;
            }
            
            .start-shopping-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(71, 33, 255, 0.4);
            }
            
            .welcome-decoration {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                overflow: hidden;
                pointer-events: none;
                z-index: -1;
            }
            
            .deco-circle {
                position: absolute;
                border-radius: 50%;
                background: linear-gradient(135deg, rgba(71, 33, 255, 0.07), rgba(108, 79, 255, 0.05));
                z-index: -1;
            }
            
            .circle1 {
                width: 200px;
                height: 200px;
                top: -100px;
                right: -70px;
            }
            
            .circle2 {
                width: 150px;
                height: 150px;
                bottom: -50px;
                left: -70px;
            }
            
            .circle3 {
                width: 80px;
                height: 80px;
                top: 40%;
                right: 15%;
                background: linear-gradient(135deg, rgba(71, 33, 255, 0.05), rgba(108, 79, 255, 0.03));
            }
            
            /* انیمیشن ظاهر شدن */
            @keyframes welcome-pulse {
                0% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(71, 33, 255, 0.3);
                }
                70% {
                    transform: scale(1);
                    box-shadow: 0 0 0 15px rgba(71, 33, 255, 0);
                }
                100% {
                    transform: scale(0.95);
                    box-shadow: 0 0 0 0 rgba(71, 33, 255, 0);
                }
            }
            
            .welcome-icon {
                animation: welcome-pulse 2s infinite;
            }
            
            /* تطبیق پذیری برای موبایل */
            @media (max-width: 480px) {
                .welcome-container {
                    width: 95%;
                }
                
                .welcome-content {
                    padding: 15px 20px;
                }
                
                .welcome-title {
                    font-size: 20px;
                }
                
                .welcome-subtitle {
                    font-size: 14px;
                    margin-bottom: 20px;
                }
                
                .feature-icon {
                    width: 38px;
                    height: 38px;
                    font-size: 18px;
                }
                
                .feature-text {
                    font-size: 11px;
                }
            }
        `;
        
        // اضافه کردن به صفحه
        document.head.appendChild(style);
        document.body.appendChild(welcomeMessage);
        
        // انیمیشن ظاهر شدن
        setTimeout(() => {
            welcomeMessage.style.opacity = '1';
            welcomeMessage.querySelector('.welcome-container').style.transform = 'translateY(0)';
        }, 100);
        
        // عملکرد دکمه بستن
        welcomeMessage.querySelector('.close-welcome').addEventListener('click', function() {
            welcomeMessage.style.opacity = '0';
            welcomeMessage.querySelector('.welcome-container').style.transform = 'translateY(30px)';
            setTimeout(() => {
                welcomeMessage.remove();
            }, 500);
        });
        
        // عملکرد دکمه شروع خرید
        welcomeMessage.querySelector('.start-shopping-btn').addEventListener('click', function() {
            welcomeMessage.style.opacity = '0';
            welcomeMessage.querySelector('.welcome-container').style.transform = 'translateY(30px)';
            setTimeout(() => {
                welcomeMessage.remove();
            }, 500);
        });
        
        // بستن با کلیک خارج از باکس
        welcomeMessage.addEventListener('click', function(e) {
            if (e.target === welcomeMessage) {
                welcomeMessage.style.opacity = '0';
                welcomeMessage.querySelector('.welcome-container').style.transform = 'translateY(30px)';
                setTimeout(() => {
                    welcomeMessage.remove();
                }, 500);
            }
        });
    }, 4000); // نمایش پیام پس از 500 میلی‌ثانیه
});
// ایجاد لودینگ اسکلتی مدرن 2025 (فقط اسکلت صفحه)
document.addEventListener("DOMContentLoaded", function() {
    // ایجاد المان لودر اصلی
    const skeletonLoader = document.createElement('div');
    skeletonLoader.className = 'skeleton-loader';
    
    // ساختار HTML لودر اسکلتی
    skeletonLoader.innerHTML = `
        <div class="skeleton-header">
            <div class="skeleton-logo pulse"></div>
            <div class="skeleton-nav">
                <div class="skeleton-nav-item pulse"></div>
                <div class="skeleton-nav-item pulse"></div>
                <div class="skeleton-nav-item pulse"></div>
                <div class="skeleton-nav-item pulse"></div>
            </div>
            <div class="skeleton-actions">
                <div class="skeleton-action pulse"></div>
                <div class="skeleton-action pulse"></div>
                <div class="skeleton-action pulse"></div>
            </div>
        </div>
        
        <div class="skeleton-hero">
            <div class="skeleton-hero-content pulse"></div>
        </div>
        
        <div class="skeleton-features">
            <div class="skeleton-feature pulse"></div>
            <div class="skeleton-feature pulse"></div>
            <div class="skeleton-feature pulse"></div>
            <div class="skeleton-feature pulse"></div>
        </div>
        
        <div class="skeleton-section">
            <div class="skeleton-section-header">
                <div class="skeleton-title pulse"></div>
                <div class="skeleton-subtitle pulse"></div>
            </div>
            <div class="skeleton-products">
                <div class="skeleton-product">
                    <div class="skeleton-product-image shine"></div>
                    <div class="skeleton-product-title pulse"></div>
                    <div class="skeleton-product-price pulse"></div>
                    <div class="skeleton-product-button pulse"></div>
                </div>
                <div class="skeleton-product">
                    <div class="skeleton-product-image shine"></div>
                    <div class="skeleton-product-title pulse"></div>
                    <div class="skeleton-product-price pulse"></div>
                    <div class="skeleton-product-button pulse"></div>
                </div>
                <div class="skeleton-product">
                    <div class="skeleton-product-image shine"></div>
                    <div class="skeleton-product-title pulse"></div>
                    <div class="skeleton-product-price pulse"></div>
                    <div class="skeleton-product-button pulse"></div>
                </div>
                <div class="skeleton-product">
                    <div class="skeleton-product-image shine"></div>
                    <div class="skeleton-product-title pulse"></div>
                    <div class="skeleton-product-price pulse"></div>
                    <div class="skeleton-product-button pulse"></div>
                </div>
            </div>
        </div>
        
        <div class="skeleton-banner">
            <div class="skeleton-banner-content pulse"></div>
        </div>
    `;
    
    // افزودن استایل‌های لودر به صفحه
    const style = document.createElement('style');
    style.textContent = `
        .skeleton-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #ffffff;
            z-index: 9999;
            overflow: auto;
            padding: 20px;
            box-sizing: border-box;
        }
        
        .skeleton-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 0;
            margin-bottom: 20px;
        }
        
        .skeleton-logo {
            width: 120px;
            height: 40px;
            border-radius: 8px;
            background-color: #f0f0f0;
        }
        
        .skeleton-nav {
            display: flex;
            gap: 15px;
        }
        
        .skeleton-nav-item {
            width: 80px;
            height: 20px;
            border-radius: 4px;
            background-color: #f0f0f0;
        }
        
        .skeleton-actions {
            display: flex;
            gap: 15px;
        }
        
        .skeleton-action {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #f0f0f0;
        }
        
        .skeleton-hero {
            width: 100%;
            height: 300px;
            border-radius: 16px;
            background-color: #f0f0f0;
            margin-bottom: 30px;
            overflow: hidden;
            position: relative;
        }
        
        .skeleton-features {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            margin-bottom: 40px;
        }
        
        .skeleton-feature {
            height: 100px;
            border-radius: 12px;
            background-color: #f0f0f0;
        }
        
        .skeleton-section {
            margin-bottom: 40px;
        }
        
        .skeleton-section-header {
            margin-bottom: 20px;
        }
        
        .skeleton-title {
            width: 200px;
            height: 30px;
            border-radius: 6px;
            background-color: #f0f0f0;
            margin-bottom: 10px;
        }
        
        .skeleton-subtitle {
            width: 300px;
            height: 20px;
            border-radius: 4px;
            background-color: #f5f5f5;
        }
        
        .skeleton-products {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
        }
        
        .skeleton-product {
            padding: 15px;
            border-radius: 12px;
            background-color: #fafafa;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
            transition: transform 0.3s ease;
        }
        
        .skeleton-product-image {
            width: 100%;
            height: 180px;
            border-radius: 8px;
            background-color: #f0f0f0;
            margin-bottom: 15px;
            position: relative;
            overflow: hidden;
        }
        
        .skeleton-product-title {
            width: 85%;
            height: 20px;
            border-radius: 4px;
            background-color: #f0f0f0;
            margin-bottom: 10px;
        }
        
        .skeleton-product-price {
            width: 60%;
            height: 24px;
            border-radius: 4px;
            background-color: #f0f0f0;
            margin-bottom: 15px;
        }
        
        .skeleton-product-button {
            width: 100%;
            height: 40px;
            border-radius: 8px;
            background-color: #f0f0f0;
        }
        
        .skeleton-banner {
            width: 100%;
            height: 200px;
            border-radius: 16px;
            background-color: #f0f0f0;
            margin-bottom: 40px;
            overflow: hidden;
            position: relative;
        }
        
        /* انیمیشن‌ها */
        .pulse {
            animation: pulse 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        
        @keyframes pulse {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
            100% {
                opacity: 1;
            }
        }
        
        .shine {
            position: relative;
            overflow: hidden;
        }
        
        .shine::after {
            content: "";
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shine 2s infinite;
        }
        
        @keyframes shine {
            0% {
                left: -100%;
            }
            100% {
                left: 150%;
            }
        }
        
        /* تطبیق پذیری برای موبایل */
        @media (max-width: 768px) {
            .skeleton-features {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .skeleton-products {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .skeleton-hero {
                height: 200px;
            }
        }
        
        @media (max-width: 480px) {
            .skeleton-products {
                grid-template-columns: 1fr;
            }
            
            .skeleton-nav {
                display: none;
            }
            
            .skeleton-action:nth-child(1) {
                display: none;
            }
        }
    `;
    
    // افزودن لودر و استایل‌ها به صفحه
    document.head.appendChild(style);
    document.body.appendChild(skeletonLoader);
    
    // تنظیم مدت زمان نمایش لودر
    setTimeout(() => {
        // افزودن انیمیشن محو شدن
        skeletonLoader.style.transition = 'opacity 0.5s ease';
        skeletonLoader.style.opacity = '0';
        
        // حذف لودر پس از اتمام انیمیشن
        setTimeout(() => {
            skeletonLoader.remove();
        }, 500);
    }, 3000); // نمایش به مدت 3 ثانیه
});