import React, { useState, useEffect, useCallback } from "react";
import "./Home.css";

const HomePage: React.FC = () => {
  const LoveMessegeEn = [
    "I Love You.",
    "Every kick and flutter reminds me of the amazing journey we're on together, building our family.",
    "I can't wait to meet our little one and start this beautiful new adventure with you by my side.",
    "My heart is already overflowing with love for both of you.",
    "- ♡",
  ];

  const LoveMessageJa = [
    "「愛してる。",
    "お腹の赤ちゃんのひとつひとつのキックや動きが、私たちが共に歩んでいる、家族を築くという素晴らしい旅を思い出させてくれる。",
    "早く私たちの小さな赤ちゃんに会って、君と隣でこの美しい新しい冒険を始めるのが待ちきれないよ。",
    "私の心はもうすでに、二人への愛で溢れている。」",
  ];

  const [showJapanese, setShowJapanese] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharsCount, setCurrentCharsCount] = useState(0);
  const [animationActive, setAnimationActive] = useState(true); // アニメーションがアクティブかどうかを管理

  const currentMessageLines = showJapanese ? LoveMessageJa : LoveMessegeEn;

  const typingSpeed = 70; // 1文字あたりの表示速度 (ms)
  const lineDelay = 700; // 各行の表示が終わってから次の行が始まるまでの遅延 (ms)

  // 言語が切り替わったときにアニメーションをリセットし、開始する
  useEffect(() => {
    setCurrentLineIndex(0);
    setCurrentCharsCount(0);
    setAnimationActive(true); // アニメーションをアクティブにする

    // 最初の文字を表示開始
    const initialStartTimer = setTimeout(() => {
      if (currentMessageLines[0]) {
        setCurrentCharsCount(1);
      }
    }, 50); // 言語切り替え後、少し待ってから開始

    return () => clearTimeout(initialStartTimer);
  }, [showJapanese, currentMessageLines]);

  // タイプライターアニメーションのロジック
  useEffect(() => {
    if (!animationActive) return; // アニメーションが非アクティブなら何もしない

    const currentLineText = currentMessageLines[currentLineIndex];

    if (!currentLineText) {
      // メッセージが空の場合や、インデックスが範囲外になった場合
      setAnimationActive(false); // アニメーション終了
      return;
    }

    if (currentCharsCount < currentLineText.length) {
      // 現在の行の文字がまだ全て表示されていなければ、次の文字を表示
      const charTimer = setTimeout(() => {
        setCurrentCharsCount((prevCount) => prevCount + 1);
      }, typingSpeed);
      return () => clearTimeout(charTimer);
    } else if (currentLineIndex < currentMessageLines.length - 1) {
      // 現在の行の表示が完了し、まだ次の行がある場合
      const lineTimer = setTimeout(() => {
        setCurrentLineIndex((prevIndex) => prevIndex + 1); // 次の行へ
        setCurrentCharsCount(1); // 次の行の最初の文字から表示開始
      }, lineDelay); // 行間の遅延
      return () => clearTimeout(lineTimer);
    } else {
      // 全ての行の表示が完了した場合
      setAnimationActive(false); // アニメーション終了
    }
  }, [
    currentLineIndex,
    currentCharsCount,
    currentMessageLines,
    typingSpeed,
    lineDelay,
    animationActive,
  ]);

  // メッセージクリックハンドラ
  const handleShowMessege = useCallback(() => {
    if (!animationActive) {
      // アニメーションが完了後にクリックされたら言語を切り替える
      setShowJapanese((prev) => !prev);
    } else {
      // アニメーション中にクリックされたら、全行を即座に表示し、アニメーションを終了する
      setCurrentLineIndex(currentMessageLines.length - 1); // 最終行までジャンプ
      setCurrentCharsCount(
        currentMessageLines[currentMessageLines.length - 1]?.length || 0
      ); // 最終行の全文字を表示
      setAnimationActive(false); // アニメーションを非アクティブにする
    }
  }, [animationActive, currentMessageLines]);

  return (
    <main>
      <div className="love">
        <div
          className={`love-message ${showJapanese ? "japanese-text" : ""}`}
          onClick={handleShowMessege}
          style={{ cursor: "pointer" }}
        >
          {currentMessageLines.map((line, index) => {
            const isCurrentTypingLine = index === currentLineIndex;
            const displayedText =
              isCurrentTypingLine && animationActive
                ? line.substring(0, currentCharsCount) // 現在タイプ中の行は表示された文字数まで
                : line; // それ以外の行（表示済み、またはアニメーション終了後）は全て表示

            return (
              <p
                key={index}
                className={`typewriter-line ${
                  isCurrentTypingLine && animationActive ? "is-typing" : ""
                }`}
              >
                {displayedText}
              </p>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default HomePage;
