import React from 'react';
import Navbar from '@/components/Navbar';
import styles from '@/styles/ExplorationGame.module.css';

const ExplorationGame = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1>生命探索游戏</h1>
        <div className={styles.gameContent}>
          {/* 这里放入您的导览游戏内容 */}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>世界地理游戏为儿童、学生、成人和老年人带来有趣的教育问答游戏。以最轻松的方式提升您的地理知识，帮助您记住世界各地的地理位置。这种趣味性的问答题，无论您是在练习地理知识还是，探索欧洲以及其他地区的地理。若有了一个明确的目的地，还要准备好环球旅行，您都来对地方了。这些免费的教学资源适用于个地理课程和教育工作者。在找学校、中小学、在家上学、家庭作业和课程的必备品。适合所有想探索我们世界的人。享受！</p>
      </footer>
    </div>
  );
};

export default ExplorationGame; 