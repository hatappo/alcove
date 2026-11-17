// English message keys with Japanese translations.
/** @type {Record<string, string>} */
const messages = {
  "Invalid page settings.": "画面の設定が正しくありません。",
  "Alcove settings": "Alcove 設定",
  "Reorder page": "画面を並び替え",
  "Drag to reorder, or use the Up and Down arrow keys.": "ドラッグ、または上下キーで並び替えます。",
  "Page order updated. Save to apply.": "画面の順序を変更しました。保存すると反映されます。",
  "Chrome internal pages cannot be displayed in a side panel. Open them in a browser tab.": "Chrome内部ページはサイドパネル内に表示できません。通常のブラウザタブで開いてください。",
  "Remove": "削除",
  "You can save up to 20 pages.": "画面は20件まで登録できます。",
  "URLs can include {nonce}, which is replaced with a new random value whenever you open or reload a page.": "URL内に {nonce} を含めると、画面を開く・再読み込みするたびに新しいランダムな値に置き換わります。",
  "Extension ID": "拡張ID",
  "Close settings": "設定を閉じる",
  "No pages yet.": "画面が登録されていません。",
  "Open settings": "設定を開く",
  "Pages": "画面",
  "Add page": "画面を追加",
  "Remove page": "画面を削除",
  "Page name": "画面名",
  "Page URL": "画面のURL",
  "Switch page": "画面を切り替え",
  "Could not open the page.": "ページを開けませんでした。",
  "Enter an HTTPS URL without a username or password.": "ユーザー名やパスワードを含まないHTTPSのURLを入力してください。",
  "Could not read the saved settings. Reload the panel to try again.": "設定を読み込めませんでした。パネルを再読み込みしてお試しください。",
  "Could not save the connection. Try again.": "接続先を保存できませんでした。もう一度お試しください。",
  "Click to hide content": "クリックで暗転",
  "Double-click to show content": "ダブルクリックで表示を戻す",
  "Press Enter or Space once to hide content, twice to show it.": "Enter または Space を1回押すと暗転、2回押すと表示を戻します。",
  "Could not save visibility. Content remains hidden. Double-click to try again.": "暗転状態を保存できませんでした。内容は非表示のままです。ダブルクリックで再試行してください。",
  "Could not restore visibility. Content remains hidden. Double-click to show it.": "暗転状態を読み込めませんでした。内容は非表示のままです。ダブルクリックで表示を戻せます。",
  "Side panel controls": "サイドパネルの操作",
  "Open tab": "タブで開く",
  "Reload": "再読み込み",
  "Save and connect": "保存して接続",
  "Cancel": "キャンセル",
  "Settings": "設定",
  "Saved": "保存しました",
  "Automatic (browser)": "自動（ブラウザの言語）",
  "Language": "表示言語",
  "Could not save the language. Please try again.": "言語を保存できませんでした。もう一度お試しください。"
};
/** @param {unknown} language @returns {'ja' | 'en'} */
const normalize = (language) => language === 'ja' ? 'ja' : 'en';
/** @param {string} key @param {string} [language] @param {Record<string, string | number>} [values] */
function t(key, language = 'en', values = {}) {
  const text = normalize(language) === 'ja' ? messages[key] ?? key : key;
  return text.replace(/\{(\w+)\}/g, (match, name) => String(values[name] ?? match));
}
/** @param {unknown} value @returns {'auto' | 'ja' | 'en'} */
const preference = (value) => value === 'ja' || value === 'en' ? value : 'auto';
/** Respect saved choices, then the browser's ordered language preferences.
 * @param {unknown} value @param {readonly string[]} [languages] @returns {'ja' | 'en'} */
function resolve(value, languages = []) {
  const selected = preference(value);
  if (selected !== 'auto') return selected;
  for (const language of languages) {
    if (/^ja(?:-|$)/i.test(language)) return 'ja';
    if (/^en(?:-|$)/i.test(language)) return 'en';
  }
  return 'en';
}

export const i18n = { normalize, preference, resolve, t };
