import styles from "../css/ScoreCard.module.css";
 // For global noselect class

function ScoreCard({ Score }) {
  return (
    <div className={`${styles.container} noselect`}>
      <div className={styles.canvas}>
        <div className={`${styles.tracker} ${styles['tr-1']}`}></div>
        <div className={`${styles.tracker} ${styles['tr-2']}`}></div>
        <div className={`${styles.tracker} ${styles['tr-3']}`}></div>
        <div className={`${styles.tracker} ${styles['tr-4']}`}></div>
        <div className={`${styles.tracker} ${styles['tr-5']}`}></div>
        <div className={`${styles.tracker} ${styles['tr-6']}`}></div>
        <div className={`${styles.tracker} ${styles['tr-7']}`}></div>
        <div className={`${styles.tracker} ${styles['tr-8']}`}></div>
        <div className={`${styles.tracker} ${styles['tr-9']}`}></div>
        <div id={styles.card}>
          <div className={styles['card-content']}>
            <div className={styles['card-glare']}></div>
            <div className={styles['cyber-lines']}>
              <span></span><span></span><span></span><span></span>
            </div>
            <p id={styles.prompt}>
              Score <br />
              {Math.round(Score)}
            </p>

            <div className={styles.title}>CYBER<br />CARD</div>
            <div className={styles['glowing-elements']}>
              <div className={styles['glow-1']}></div>
              <div className={styles['glow-2']}></div>
              <div className={styles['glow-3']}></div>
            </div>
            <div className={styles.subtitle}>
              <span>INTERACTIVE</span>
              <span className={styles.highlight}>3D EFFECT</span>
            </div>
            <div className={styles['card-particles']}>
              <span></span><span></span><span></span><span></span><span></span><span></span>
            </div>
            <div className={styles['corner-elements']}>
              <span></span><span></span><span></span><span></span>
            </div>
            <div className={styles['scan-line']}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;