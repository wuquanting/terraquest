document.addEventListener('DOMContentLoaded', () => {
    // 注册GSAP插件
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // 资源加载管理
    class ResourceLoader {
        constructor() {
            this.resources = new Map();
            this.loadingElement = document.createElement('div');
            this.loadingElement.className = 'loading-screen';
            this.loadingElement.innerHTML = `
                <div class="loading-content">
                    <img src="sucai/kiki-loading.gif" alt="Loading">
                    <p>KiKi is preparing amazing content...</p>
                </div>
            `;
            document.body.appendChild(this.loadingElement);
        }

        async loadSound(url) {
            if (this.resources.has(url)) return this.resources.get(url);
            
            try {
                const audio = new Audio(url);
                await audio.load();
                this.resources.set(url, audio);
                return audio;
            } catch (error) {
                console.error('音频加载失败:', error);
                return null;
            }
        }

        async loadImage(url) {
            if (this.resources.has(url)) return this.resources.get(url);

            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    this.resources.set(url, img);
                    resolve(img);
                };
                img.onerror = () => reject(new Error(`图片加载失败: ${url}`));
                img.src = url;
            });
        }

        hideLoading() {
            gsap.to(this.loadingElement, {
                opacity: 0,
                duration: 0.5,
                onComplete: () => this.loadingElement.remove()
            });
        }
    }

    // 音效管理器
    class SoundManager {
        constructor(resourceLoader) {
            this.loader = resourceLoader;
            this.sounds = {};
            this.isMuted = false;
        }

        async init() {
            this.sounds = {
                click: await this.loader.loadSound('assets/sounds/click.mp3'),
                hover: await this.loader.loadSound('assets/sounds/hover.mp3'),
                success: await this.loader.loadSound('assets/sounds/success.mp3'),
                message: await this.loader.loadSound('assets/sounds/message.mp3')
            };
        }

        play(soundName) {
            if (this.isMuted || !this.sounds[soundName]) return;
            
            const sound = this.sounds[soundName].cloneNode();
            sound.volume = 0.5;
            sound.play().catch(err => console.warn('音效播放失败:', err));
        }

        toggleMute() {
            this.isMuted = !this.isMuted;
            return this.isMuted;
        }
    }

    // AR功能管理器
    class ARManager {
        constructor() {
            this.arData = [
                {
                    title: 'Mount Everest',
                    desc: 'World\'s Highest Peak',
                    image: 'images/ar-everest',
                    facts: ['Height: 8,848m', 'Located between China and Nepal', 'Still growing annually']
                },
                {
                    title: 'Great Barrier Reef',
                    desc: 'World\'s Largest Coral Reef System',
                    image: 'images/ar-reef',
                    facts: ['Length: 2,300km', '900 islands', '1,500 fish species']
                },
                {
                    title: 'Amazon Rainforest',
                    desc: 'Earth\'s Lungs',
                    image: 'images/ar-amazon',
                    facts: ['Area: 5.5 million km²', '390 billion trees', 'Produces 20% of Earth\'s oxygen']
                }
            ];
        }

        createARCard(item) {
            const card = document.createElement('div');
            card.className = 'ar-card';
            card.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="ar-card-content">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                    <ul class="facts">
                        ${item.facts.map(fact => `<li>${fact}</li>`).join('')}
                    </ul>
                    <button class="scan-btn">Coming Soon</button>
                </div>
            `;

            // 添加翻转动画
            const scanBtn = card.querySelector('.scan-btn');
            const backBtn = card.querySelector('.back-btn');

            scanBtn.addEventListener('click', () => {
                card.classList.add('flipped');
                soundManager.play('click');
            });

            backBtn.addEventListener('click', () => {
                card.classList.remove('flipped');
                soundManager.play('click');
            });

            return card;
        }
    }

    // 初始化资源
    const resourceLoader = new ResourceLoader();
    const soundManager = new SoundManager(resourceLoader);
    const arManager = new ARManager();

    // 页面初始化
    async function initializePage() {
        try {
            await soundManager.init();
            await initializeAnimations();
            initializeChat();
            initializeAR();
            initializeInteractions();
            resourceLoader.hideLoading();
        } catch (error) {
            console.error('初始化失败:', error);
            alert('页面加载出现问题，请刷新重试');
        }
    }

    // 初始化动画
    async function initializeAnimations() {
        // 顶部动画序列
        const tl = gsap.timeline();
        
        tl.from('.earth', {
            duration: 1.5,
            scale: 0,
            opacity: 0,
            ease: 'back.out(1.7)'
        })
        .from('.achi-character', {
            duration: 1.5,
            y: -200,
            ease: 'bounce.out'
        }, '-=0.5')
        .from('.speech-bubble', {
            duration: 0.5,
            scale: 0,
            opacity: 0,
            ease: 'back.out'
        })
        .from('.main-title', {
            duration: 1,
            y: -100,
            opacity: 0,
            ease: 'power2.out'
        })
        .from('.sub-title', {
            duration: 1,
            y: -50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.5');

        // 滚动动画
        gsap.to('.cloud-button', {
            y: 20,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });

        // 视差滚动效果
        gsap.to('.earth', {
            scrollTrigger: {
                trigger: '#top-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            },
            y: 200,
            rotation: 360
        });
    }

    // 初始化聊天功能
    function initializeChat() {
        const chatSystem = new ChatSystem();
        chatSystem.init();
    }

    // 聊天系统类
    class ChatSystem {
        constructor() {
            this.chatMessages = document.querySelector('.chat-messages');
            this.chatInput = document.querySelector('.chat-input input');
            this.sendBtn = document.querySelector('.send-btn');
            this.initEventListeners();
        }

        initEventListeners() {
            this.sendBtn.addEventListener('click', () => {
                // 直接打开 Coze 对话框
                const cozeBtn = document.querySelector('.coze-web-chat-btn');
                if (cozeBtn) {
                    cozeBtn.click();
                }
            });

            this.chatInput.addEventListener('focus', () => {
                // 输入框获得焦点时也打开 Coze 对话框
                const cozeBtn = document.querySelector('.coze-web-chat-btn');
                if (cozeBtn) {
                    cozeBtn.click();
                }
            });
        }
    }

    // 更新AR数据
    const arData = [
        {
            title: 'Mount Everest',
            desc: 'World\'s Highest Peak',
            image: 'images/ar-everest',
            facts: ['Height: 8,848m', 'Located between China and Nepal', 'Still growing annually']
        },
        {
            title: 'Great Barrier Reef',
            desc: 'World\'s Largest Coral Reef System',
            image: 'images/ar-reef',
            facts: ['Length: 2,300km', '900 islands', '1,500 fish species']
        },
        {
            title: 'Amazon Rainforest',
            desc: 'Earth\'s Lungs',
            image: 'images/ar-amazon',
            facts: ['Area: 5.5 million km²', '390 billion trees', 'Produces 20% of Earth\'s oxygen']
        }
    ];

    // 生成画廊卡片
    function createGallery() {
        const container = document.querySelector('.gallery-container');
        arData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'ar-card';
            card.innerHTML = `
                <div class="ar-card-main">
                    <img src="${item.image}" alt="${item.title}" class="location-image">
                    <div class="ar-card-content">
                        <h3>${item.title}</h3>
                        <p>${item.desc}</p>
                        <ul class="facts">
                            ${item.facts.map(fact => `<li>${fact}</li>`).join('')}
                        </ul>
                        <div class="qr-placeholder">
                            <!-- 二维码将在这里显示 -->
                        </div>
                        <button class="scan-btn">Explore in AR</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    // 初始化画廊
    document.addEventListener('DOMContentLoaded', createGallery);

    // 初始化所有功能
    topAnimations();
    scrollGuide();
    chatSystem();
    arGallery();

    // 添加全局音效
    document.querySelectorAll('button, .social-icon, .ar-card').forEach(elem => {
        elem.addEventListener('mouseenter', () => playSound(hoverSound));
        elem.addEventListener('click', () => playSound(clickSound));
    });

    // 图片加载检查
    const images = {
        earth: 'images/earth',
        snowLeopard: 'images/cartoon-snow-leopard',
        clouds: 'images/clouds.png',
        birds: 'images/birds.png',
        balloon: 'images/balloon.png',
        map: 'images/map.png',
        compass: 'images/compass',
        backpack: 'images/backpack',
        magnifier: 'images/magnifie',
        arEverest: 'images/ar-everest',
        arReef: 'images/ar-reef',
        arAmazon: 'images/ar-amazon',
        forestBg: 'images/forest-bg'
    };

    // 预加载图片
    Object.entries(images).forEach(([key, path]) => {
        const img = new Image();
        img.src = path;
        img.onload = () => console.log(`${key} loaded successfully`);
        img.onerror = () => console.error(`Error loading ${key} from ${path}`);
    });

    // 更新图片检查函数
    function checkImages() {
        const requiredImages = [
            'earth',                    // 移除 .png 扩展名
            'cartoon-snow-leopard',     // 移除 .png 扩展名
            'clouds.png',
            'birds.png',
            'balloon.png',
            'map.png',
            'forest-bg',               // 移除扩展名
            'ar-everest',              // 移除扩展名
            'ar-reef',                 // 移除扩展名
            'ar-amazon',               // 移除扩展名
            'compass',                 // 移除扩展名
            'backpack',                // 移除扩展名
            'magnifie'                 // 修正拼写
        ];

        requiredImages.forEach(imageName => {
            const img = new Image();
            img.src = `sucai/${imageName}`;
            img.onload = () => console.log(`✓ ${imageName} loaded successfully`);
            img.onerror = () => console.error(`✗ Failed to load ${imageName}`);
        });
    }

    // 运行检查
    checkImages();
}); 