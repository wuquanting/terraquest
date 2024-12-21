import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import styles from '@/styles/Home.module.css';

export default function Home() {
  const gameCategories = [
    { title: '世界运动会', image: '/sucai/earth.png' },
    { title: '非洲运动会', image: '/sucai/map.png.png' },
    { title: '美洲运动会', image: '/sucai/compass_pixian_ai.png' },
    { title: '亚运会', image: '/sucai/balloon.png.png' },
    { title: '澳大利亚和大洋洲运动会', image: '/sucai/forest-bg.png' },
    { title: '欧洲运动会', image: '/sucai/clouds.png.png' },
  ];

  const explorationFeatures = [
    { title: '探索日记', icon: '/sucai/journal-icon.png.png' },
    { title: '背包工具', icon: '/sucai/backpack-icon.png.png' },
    { title: '发现世界', icon: '/sucai/magnifier-icon.png.png' },
    { title: 'AR体验', icon: '/sucai/ar-scene1.jpg.png' },
  ];

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1 className={styles.title}>世界地理游戏</h1>
        
        <div className={styles.gameCards}>
          {gameCategories.map((game, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={game.image}
                  alt={game.title}
                  width={300}
                  height={200}
                  className={styles.cardImage}
                />
              </div>
              <h3 className={styles.cardTitle}>{game.title}</h3>
              <button className={styles.playButton}>开始游戏</button>
            </div>
          ))}
        </div>

        {/* 导览游戏入口按钮 */}
        <div className={styles.gameEntrance}>
          <Link href="/exploration-game" className={styles.entranceButton}>
            <div className={styles.buttonInner}>
              <Image
                src="/sucai/exploration-icon.png.png"
                alt="生命探索"
                width={100}
                height={100}
                className={styles.entranceIcon}
              />
              <span className={styles.entranceText}>进入生命探索之旅</span>
            </div>
          </Link>
        </div>

        {/* 探索功能展示 */}
        <div className={styles.explorationFeatures}>
          {explorationFeatures.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <Image
                src={feature.icon}
                alt={feature.title}
                width={64}
                height={64}
                className={styles.featureIcon}
              />
              <h4>{feature.title}</h4>
            </div>
          ))}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>世界地理游戏为儿童、学生、成人和老年人带来有趣的教育问答游戏。以最轻松的方式提升您的地理知识，帮助您记住世界各地的地理位置。这种趣味性的问答题，无论您是在练习地理知识还是，探索欧洲以及其他地区的地理。若有了一个明确的目的地，还要准备好环球旅行，您都来对地方了。这些免费的教学资源适用于个地理课程和教育工作者。在找学校、中小学、在家上学、家庭作业和课程的必备品。适合所有想探索我们世界的人。享受！</p>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <Link href="/more" className={styles.exploreMore}>
              <div className={styles.exploreMoreContent}>
                <Image
                  src="/sucai/kiki.png.png"
                  alt="探索更多"
                  width={50}
                  height={50}
                  className={styles.exploreIcon}
                />
                <div className={styles.exploreText}>
                  <span className={styles.exploreTitle}>探索更多</span>
                  <span className={styles.exploreDescription}>
                    发现更多精彩地理知识和有趣游戏
                  </span>
                </div>
              </div>
            </Link>
          </div>
          <div className={styles.footerRight}>
            <div className={styles.qrCode}>
              <Image
                src="/sucai/erweima.png.jpg"
                alt="扫码关注"
                width={120}
                height={120}
                className={styles.qrCodeImage}
              />
              <span className={styles.qrCodeText}>扫码关注我们</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 