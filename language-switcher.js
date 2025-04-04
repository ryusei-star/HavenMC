// 言語切り替えの設定をまとめた関数
function initializeLanguageSwitcher() {
    // 言語設定の初期化
    let currentLang = localStorage.getItem('havenmc-language') || 'ja';
    setLanguage(currentLang);

    // 必要な要素の取得
    const dropdown = document.getElementById('language-dropdown');
    const dropdownBtn = document.getElementById('language-dropdown-btn');
    const currentLangText = document.getElementById('current-language');
    const languageOptions = document.querySelectorAll('.language-option');

    // ドロップダウンの開閉（イベントの伝播を止める）
    dropdownBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });

    // 言語オプションのクリックイベント
    languageOptions.forEach(option => {
        option.addEventListener('click', function () {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('havenmc-language', lang);
            dropdown.classList.remove('active');
        });
    });

    // ページ外クリックでドロップダウンを閉じる
    document.addEventListener('click', function (event) {
        if (!dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });

    // 言語切り替え関数
    function setLanguage(lang) {
        // 言語表示テキストの更新
        if (currentLangText) {
            switch (lang) {
                case 'ja':
                    currentLangText.textContent = '日本語';
                    break;
                case 'en':
                    currentLangText.textContent = 'English';
                    break;
                case 'fr':
                    currentLangText.textContent = 'Français';
                    break;
            }
        }

        // チェックマークの表示/非表示
        languageOptions.forEach(option => {
            const optionLang = option.getAttribute('data-lang');
            const checkIcon = option.querySelector('.check-icon');

            if (optionLang === lang) {
                option.classList.add('active');
                if (checkIcon) checkIcon.style.display = 'block';
            } else {
                option.classList.remove('active');
                if (checkIcon) checkIcon.style.display = 'none';
            }
        });

        // 言語に応じたコンテンツの表示/非表示
        document.querySelectorAll('[data-lang]').forEach(element => {
            if (element.getAttribute('data-lang') === lang) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });
    }
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', initializeLanguageSwitcher);