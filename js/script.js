// script.js


document.addEventListener("DOMContentLoaded", function () {
    // ---------- Constants & storage keys ----------
    const STORAGE_KEYS = {
        WHEEL_ITEMS: "wheelItems",
        SETTINGS: "wheelSettings",
        VOLUME: "siteVolume",
    };
    window.addEventListener('DOMContentLoaded', () => {
        const savedThemeKey = localStorage.getItem("selectedWheelTheme");
        const defaultThemeKey = "color-01";
        const finalThemeKey = savedThemeKey || defaultThemeKey;

        const selectedTheme = wheelThemes[finalThemeKey];
        if (selectedTheme) {
            currentWheelColors = selectedTheme;

            // حذف selected از همه عکس‌ها و افزودن به عکس فعال
            document.querySelectorAll(".color-option").forEach(option => {
                option.addEventListener("click", () => {
                    const selected = option.getAttribute("data-key");
                    localStorage.setItem(STORAGE_KEYS.WHEEL_COLOR, selected);  // ← ذخیره در localStorage
                    updateWheelColors(selected);                                // ← اعمال رنگ
                    buildWheel();                                               // ← بازسازی چرخ
                });
            });

        }
    });
    // ✅ لیست چالش‌ها
    const PREDEFINED_CHALLENGES = [
        "بدون استفاده از هیچ اسپل بازی کن.",
        "بدون استفاده از هیچ کارت لجندری بازی کن.",
        "بدون استفاده از هیچ کارت وین‌ کاندیشن بازی کن.",
        "بدون استفاده از هیچ کارت Common بازی کن.",
        "بدون استفاده از هیچ کارت Rare بازی کن.",
        "بدون استفاده از هیچ کارت Epic بازی کن.",
        "بدون استفاده از هیچ کارت Hero بازی کن.",
        "فقط از کارت‌های Common استفاده کن.",
        "فقط از کارت‌های Rare استفاده کن.",
        "فقط از کارت‌های Epic استفاده کن.",
        "فقط از کارت‌های لجندری استفاده کن.",
        "فقط از کارت‌های Hero استفاده کن.",
        "نایت و والکری و باهم در دکت قرار بده",
        "هربار وین کاندیشینر استفاده کردی باید بلافاصله اون رو میرور کنی",
        "میانگین اکسیر زیر 2.5 باشه",
        "میانگین اکسیر زیر 3 باشه",
        "میانگین اکسیر زیر 4 باشه",
        "میانگین اکسیر زیر 5 باشه",
        "میانگین اکسیر دک بالای 5 باشه",
        "میانگین اکسیر دک بالای 6 باشه",
        "کارت‌ها را فقط از یک آرنا انتخاب کن.",
        "فقط کارت‌های ارزون (2 اکسیر یا کمتر) استفاده کن.",
        "فقط کارت‌های گرون (5 اکسیر یا بیشتر) استفاده کن.",
        "تمام کارت‌های دکت از یک نوع انتخاب کن (مثلا همه بیلدینگ یا همه اسپل).",
        "فقط کارت‌های زمینی استفاده کن.",
        "فقط کارت‌های هوایی استفاده کن.",
        "فقط کارت های چند نفره استفاده کن مثل خفاش یا اسکلت آرمی",
        "فقط با اسپل ریج میتونی دمیج بدی",
        "فقط از کارت های range استفاده کن.",
        "فقط کارت های تانک استفاده کن.",
        "در بازی فقط 3 بار از وین کاندیشینرت استفاده کن.",
        "هیچ بیلدینگی در دک قرار نده.",
        "با انگشت کوچیکت بازی کن.",
        "با یک چشم بسته بازی کن.",
        "با یکی از بیننده‌ها یا دوستان کلن بازی کن.",
        "به یکی داخل چت لینک دوستی بده و باهاش بازی کن.",
        "برو تو لایو یه نفر دیگه و بنویس هایاح",
        "یکی از ادمینا باید دک بعدیتو پیشنهاد بده",
        "با هر دونیت هنگام بازی تا 10 ثانیه چشمتو ببند.",
        "هر بار یکی لایو و لایک کرد، تا 10 ثانیه کارت نریز.",
        "تا 45 ثانیه اول بازی هیچ کارتی ننداز.",
        "تا قبل از اکسیر 2 برابر فقط دفاع کن (حمله نکن).",
        "قبل از استفاده از هر کارت تا 10 بشمار.",
        "هر بار که 3 کارت استفاده کردی، یک ایموت بده.",
        "فقط وقتی اکسیرت به 8 رسید کارت بریز.",
        "یک دقیقه اول بازی فقط ایموت بده و حمله نکن (دفاع مجازه).",
        "فقط 60 ثانیه اول بازی حمله کن، بقیه زمان دفاع کن.",
        "هربار که حریف کارت تانک انداخت بازی و ببند و دوباره باز کن.",
        "در بازی فقط از 6 کارت دکت میتونی استفاده کنی.",
        "هیچ‌وقت مستقیم روی تاور حریف اسپل ننداز (مثل راکت روی تاور).",
        "بدون کارت بیلدینگ بتل بزن",
        "بدون وین کاندیشن بتل بزن",
        "بدون کارت اسپل بتل بزن",
        "با دک حریف قبلی بتل بزن",
        "با دک رندوم در تیوی رویال آرنا 1 بتل بزن",
        "با دک رندوم در تیوی رویال آرنا 2 بتل بزن",
        "با دک رندوم در تیوی رویال آرنا 3 بتل بزن",
        "با دک رندوم در تیوی رویال آرنا 4 بتل بزن",
        "با دک رندوم در تیوی رویال آرنا 5 بتل بزن",
        "با دک رندوم در تیوی رویال آرنا 6 بتل بزن",
        "با دک رندوم در تیوی رویال آرنا 7 بتل بزن",
        "اول بازی کینگ تاور حریفو فعال کن",
        "دکمه ساخت دک و تو بازی بزن و با اون دک بتل بزن",
        "بدون اولوشن بتل بزن",
        "به یکی از فرندهات درخواست بتل بده",
        "بازی که شروع شد گوشیو بذار حالت هواپیما (بعدش میتونی درستش کنی)",
        "به هیچ وجه کارت اول حریف و دفاع نکن و بذار برسه به تاورت",
        "بزار یکی از تاور هاتو بگیره ازت",
        "در مرج تاکتیک بتل بزن و هیچ کارتیو 3 ستاره نکن"
    ];
    const baseColors = [
        "#f44336", "#e91e63", "#9c27b0", "#673ab7",
        "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4",
        "#009688", "#4caf50", "#8bc34a", "#cddc39",
        "#ffeb3b", "#ffc107", "#ff9800", "#ff5722"
    ];

    const wheelThemes = {
        "color-01": baseColors,
        "color-02": ["#fe4a0d", "#e4960a"],
        "color-03": ["#2a008a", "#941885"],
        "color-04": ["#ad0004", "#e4960a"],
        "color-05": ["#131c01", "#018f19"],
        "color-06": ["#01328e", "#1161ee"],
        "color-07": ["#040003", "#9f061e"],
        "color-08": ["#040003", "#9a751d"]
    };
    let previousSliceIndex = -1;


        const allContainer = document.querySelector(".all"); // محض اطمینان
        const backgroundContainer = document.querySelector(".background"); // محض اطمینان
        const items = document.querySelectorAll(".wheel-settings__panel-items");
        const themePrefix = "bg__theme-";
        const defaultTheme = `${themePrefix}01`;

        // کلاس پیش‌فرض
        if (!allContainer.classList.contains(defaultTheme)) {
            allContainer.classList.add(defaultTheme);
        }

        // حذف کلاس‌های قبلی
        function removeOldThemeClass() {
            [...allContainer.classList].forEach(cls => {
                if (cls.startsWith(themePrefix)) {
                    allContainer.classList.remove(cls);
                }
            });
        }

        // اضافه کردن لیسنر به هر آیتم
        items.forEach((item) => {
            item.addEventListener("click", function () {
                const key = item.getAttribute("data-key"); // مثل bg-05
                console.log("Clicked item:", key);

                const themeNumber = key.split("-")[1]; // فقط عدد
                const newClass = `${themePrefix}${themeNumber}`;
                console.log("New class to add:", newClass);

                removeOldThemeClass();
                allContainer.classList.add(newClass);

                console.log("Body classes now:", allContainer.classList);
            });
        });


// بستن wheel-settings با کلیک خارج از خودش
    document.addEventListener("click", function(e) {
        const wheelSettings = document.querySelector(".wheel-settings");
        if (!wheelSettings) return;

        // اگر wheelSettings باز است و کلیک روی خودش یا فرزندهایش نبوده
        if (wheelSettings.classList.contains("active") && !wheelSettings.contains(e.target)) {
            closeWheelSettings();
        }
    });
    function updateWheelColors(key) {
        const selected = wheelThemes[key];
        if (!selected) return;
        currentWheelColors = selected;
    }

    function loadSavedWheelColor() {
        const savedColor = localStorage.getItem(STORAGE_KEYS.WHEEL_COLOR);
        if (savedColor) {
            updateWheelColors(savedColor); // ← رنگ رو روی گردونه اعمال کن
            const selectedOption = document.querySelector(`.color-option[data-key="${savedColor}"]`);
            if (selectedOption) selectedOption.classList.add("selected"); // ← کلاس ظاهری فعال کن
        }
    }


    // ---------- Persistence helpers ----------
    function saveWheelItems() {
        const items = Array.from(document.querySelectorAll(".edit-wheel-items__wheel-item")).map(item => {
            const rate = item.querySelector(".edit-wheel-items__item-rate")?.value || "1";
            const text = item.querySelector(".edit-wheel-items__input")?.value || "";
            const disabled = !!item.dataset.removedDuplicate;
            return { rate, text, disabled };
        });
        localStorage.setItem(STORAGE_KEYS.WHEEL_ITEMS, JSON.stringify(items));
        buildWheel(); // همزمان بازسازی گردونه
    }


    function loadWheelItems() {
        const container = document.querySelector(".wheel-items-list"); // تغییر مهم!
        if (!container) return;

        const stored = localStorage.getItem(STORAGE_KEYS.WHEEL_ITEMS);
        let items = [];

        try {
            items = stored ? JSON.parse(stored) : [];
        } catch {
            items = [];
        }

        container.innerHTML = ""; // پاک کردن آیتم‌های قبلی

        if (items.length) {
            // اگر آیتم‌هایی در حافظه هست
            items.forEach(obj => {
                const newItem = createWheelItem(obj.rate, obj.text);
                if (obj.disabled) markItemAsRemoved(newItem);
                container.appendChild(newItem);
            });
        } else {
            // اگر آیتمی نبود، ۵ تا تصادفی اضافه کن
            const usedIndices = new Set();

            function getRandomChallenge() {
                if (usedIndices.size >= PREDEFINED_CHALLENGES.length) usedIndices.clear();
                let index;
                do {
                    index = Math.floor(Math.random() * PREDEFINED_CHALLENGES.length);
                } while (usedIndices.has(index));
                usedIndices.add(index);
                return PREDEFINED_CHALLENGES[index];
            }

            for (let i = 0; i < 5; i++) {
                const item = createWheelItem("1", getRandomChallenge());
                container.appendChild(item);
            }

            saveWheelItems(); // خودش buildWheel رو هم صدا میزنه ✅
        }

        // اطمینان از فعال‌سازی هندلرها
        attachInitialWheelItemHandlers();
        buildWheel(); // دوباره بساز تا مطمئن باشی
    }




    function saveSettings() {
        const selects = {};
        document.querySelectorAll(".custom-select").forEach(sel => {
            const key = [...sel.classList].filter(c => c !== "custom-select")[0] || sel.getAttribute("data-key") || "select";
            const display = sel.querySelector(".select-display");
            selects[key] = display?.textContent || "";
        });

        const switches = {};
        document.querySelectorAll("input[type=checkbox]").forEach(input => {
            let key = input.closest("label")?.className || input.closest(".settings__section")?.className || "checkbox";
            switches[key] = input.checked;
        });

        // ذخیره‌ی انتخاب‌های decision-sound
        const decisionSoundSelection = {};
        document.querySelectorAll(".decision-sound .select-options .option").forEach(o => {
            const key = o.dataset.key || o.textContent.trim();
            const cb = o.querySelector("input[type=checkbox]");
            if (cb) {
                decisionSoundSelection[key] = cb.checked;
            }
        });

        localStorage.setItem(
            STORAGE_KEYS.SETTINGS,
            JSON.stringify({ selects, switches, decisionSoundSelection })
        );
    }

    let lastParsedSettings = null;
    function loadSettings() {
        const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        if (!stored) return;
        let parsed = null;
        try {
            parsed = JSON.parse(stored);
        } catch {
            parsed = null;
            return;
        }

        lastParsedSettings = parsed; // نگه دار برای بعد
        // بررسی تنظیمات انتخاب صدای تصمیم
        const selectElement = document.querySelector(".decision-sound .select-display");
        if (!parsed?.selects?.["decision-sound"]) {
            // اگر انتخابی ذخیره نشده بود، "پیشفرض" رو ذخیره کن و نمایش بده
            if (selectElement) {
                selectElement.textContent = "پیشفرض";
            }
            localStorage.setItem("decisionSound", "پیشفرض");
            const def = document.querySelector('.decision-sound .option[data-key="پیشفرض"] input');
            if (def) def.checked = true;
            currentDecisionSoundKey = "پیشفرض";
        } else {
            // در غیر این‌صورت، همون صدای انتخاب‌شده رو در UI تیک بزن
            const key = parsed.selects["decision-sound"];
            const el = document.querySelector(`.decision-sound .option[data-key="${key}"] input`);
            if (el) el.checked = true;
            currentDecisionSoundKey = key;
        }

        if (parsed.selects) {
            document.querySelectorAll(".custom-select").forEach(sel => {
                const key = [...sel.classList].filter(c => c !== "custom-select")[0] || sel.getAttribute("data-key") || "select";
                const display = sel.querySelector(".select-display");
                if (key in parsed.selects && display) {
                    display.textContent = parsed.selects[key];
                }
            });
        }
        if (parsed.switches) {
            document.querySelectorAll("input[type=checkbox]").forEach(input => {
                let key = input.closest("label")?.className || input.closest(".settings__section")?.className || "checkbox";
                if (key in parsed.switches) {
                    input.checked = parsed.switches[key];
                }
            });
        }
        // **توجه**: ری‌استور کردن decisionSoundSelection را این‌جا انجام نده
    }


    function saveVolume() {
        const volumeSlider = document.getElementById('siteVolumeSlider');
        if (volumeSlider) {
            localStorage.setItem(STORAGE_KEYS.VOLUME, volumeSlider.value);
        }
    }

    function loadVolume() {
        const volumeSlider = document.getElementById('siteVolumeSlider');
        const sliderTooltip = document.getElementById('sliderTooltip');
        if (!volumeSlider || !sliderTooltip) return;
        const stored = localStorage.getItem(STORAGE_KEYS.VOLUME);
        if (stored !== null) {
            volumeSlider.value = stored;
        }
        updateSlider(); // به‌روزرسانی نمایشی
    }
// ---------- Click sound helpers ----------
    function getClickSoundSelection() {
        const display = document.querySelector(".mouse-click-sound .select-display");
        return display?.textContent.trim() || "";
    }

    // ---------- Spin sound helpers ----------
    let spinAudio = null;

    function getSpinSoundSelection() {
        const display = document.querySelector(".spin-sound .select-display");
        return display?.textContent.trim() || "";
    }

    function pickRandomSpinFile() {
        const num = Math.floor(Math.random() * 6) + 1; // 1..6
        return String(num).padStart(2, '0');
    }

    function playSpinSoundStart() {
        if (isSiteMuted) return; // اضافه شد
        const selection = getSpinSoundSelection();
        let src = "";

        if (selection === "همه") {
            const file = pickRandomSpinFile();
            src = `sfx/spinning/${file}.mp3`;
        } else {
            const m = selection.match(/صدای \s*(\d+)/);
            if (m && m[1]) {
                const num = String(parseInt(m[1], 10)).padStart(2, '0');
                src = `sfx/spinning/${num}.mp3`;
            } else {
                return; // چیزی معتبر انتخاب نشده
            }
        }

        // اگر قبلاً در حال پخش بود، قطعش کن
        if (spinAudio) {
            spinAudio.pause();
            spinAudio = null;
        }

        spinAudio = new Audio(src);
        spinAudio.loop = true;
        spinAudio.volume = getVolumeLevel();
        spinAudio.play().catch(() => { /* ignore play errors */ });
    }




    function getVolumeLevel() {
        const volumeSlider = document.getElementById('siteVolumeSlider');
        if (!volumeSlider) return 1;
        const v = parseFloat(volumeSlider.value);
        if (isNaN(v)) return 1;
        return Math.min(Math.max(v / 100, 0), 1);
    }

    function pickRandomEmoteFile() {
        const num = Math.floor(Math.random() * 72) + 1; // 1..72
        return String(num).padStart(2, '0');
    }

    function isMuteClickSound() {
        return !!document.querySelector(".mute-click-sound input[type=checkbox]")?.checked;
    }

    function isMuteDecisionSound() {
        return !!document.querySelector(".mute-decision-sound input[type=checkbox]")?.checked;
    }

    function playClickSound() {
        if (isSiteMuted) return; // اضافه شد
        if (isMuteClickSound()) return; // اگر میوت فعال بود نزن
        const selection = getClickSoundSelection();
        let src = "";


        if (/^صدای کلیک\s*\d+/.test(selection)) {
            const m = selection.match(/صدای کلیک\s*(\d+)/);
            let num = "01";
            if (m && m[1]) {
                num = String(parseInt(m[1], 10)).padStart(2, '0');
            }
            // مسیر با توجه به ساختار: sfx/click/01.mp3
            src = `sfx/click/${num}.mp3`;
        } else if (selection === "ایموت های بازی") {
            const emoteNum = pickRandomEmoteFile();
            src = `sfx/click/cr/${emoteNum}.ogg`;
        } else {
            return; // هیچ صدایی برای انتخاب فعلی نیست
        }

        const volume = getVolumeLevel();
        const audio = new Audio(src);
        audio.volume = volume;
        audio.play().catch((err) => {
            // برای دیباگ اگر خواستی فعالش کن:
            // console.warn("پخش صدا نبود:", src, err);
        });
    }

// پخش صدا روی هر کلیک به‌جز وقتی داخل selector کلیک می‌شه
    document.addEventListener("click", (e) => {
        if (e.target.closest(".mouse-click-sound")) return;
        playClickSound();
    });

    // ---------- Wheel item creation with remove icon ----------
    function createWheelItem(rate = "1", text = "") {
        const wrapper = document.createElement("div");
        wrapper.classList.add("edit-wheel-items__wheel-item");

        const rateInput = document.createElement("input");
        rateInput.type = "number";
        rateInput.className = "edit-wheel-items__item-rate";
        rateInput.value = rate;
        rateInput.min = "0.1";
        rateInput.addEventListener("input", () => {
            saveWheelItems();
        });

        const textInput = document.createElement("input");
        textInput.type = "text";
        textInput.className = "edit-wheel-items__input";
        textInput.placeholder = "چالش جدید را وارد کنید";
        textInput.value = text;

        // ✅ گوش دادن به paste مستقل
        textInput.addEventListener("paste", (e) => {
            const paste = (e.clipboardData || window.clipboardData).getData("text");
            const lines = paste.split(/\r?\n/).map(line => line.trim()).filter(Boolean);

            if (lines.length > 1) {
                e.preventDefault(); // از paste پیش‌فرض جلوگیری کن

                const container = document.querySelector(".edit-wheel-items");
                const header = document.querySelectorAll(".edit-wheel-items__header")[1];

                const existingValues = Array.from(document.querySelectorAll(".edit-wheel-items__input"))
                    .map(input => input.value.trim());

                let addedCount = 0;

                lines.forEach((line) => {
                    if (line === "aslehkari") return; // مورد خاص

                    if (!existingValues.includes(line)) {
                        const newItem = createWheelItem("1", line);
                        if (header) header.insertAdjacentElement("beforebegin", newItem);
                        else container.appendChild(newItem);
                        addedCount++;
                    }
                });

                if (addedCount > 0) {
                    saveWheelItems();
                    showSimpleNotification(`${addedCount} گزینه جدید اضافه شد`);
                } else {
                    showSimpleNotification("همه گزینه‌ها قبلاً وجود داشتند");
                }
            }
        });


        // ✅ عادی‌ترین input
        textInput.addEventListener("input", () => {
            const value = textInput.value.trim();

            if (value === "aslehkari") {
                textInput.value = "";
                const canvas = document.getElementById("canvas");
                if (canvas) canvas.classList.remove("display-none-class");

                document.querySelector(".header")?.classList.add("display-none-class");
                document.querySelector(".main")?.classList.add("display-none-class");
                document.querySelector(".footer")?.classList.add("display-none-class");
                return;
            }

            saveWheelItems();
        });

        const removeImg = document.createElement("img");
        removeImg.src = "img/interface/wheel-items/remove-item.png";
        removeImg.alt = "remove-item";
        removeImg.width = 24;
        removeImg.height = 24;
        removeImg.classList.add("clickable");
        removeImg.addEventListener("click", () => {
            wrapper.remove();
            saveWheelItems();
        });

        wrapper.appendChild(rateInput);
        wrapper.appendChild(textInput);
        wrapper.appendChild(removeImg);

        function setupRestoreOnClick() {
            [textInput, rateInput].forEach(inp => {
                inp.addEventListener("click", (e) => {
                    if (wrapper.dataset.removedDuplicate) {
                        restoreRemovedItem(wrapper);
                        saveWheelItems();
                    }
                });
            });
        }
        setupRestoreOnClick();

        return wrapper;
    }



    // ---------- Attach handlers to existing items on load ----------
    function attachInitialWheelItemHandlers() {
        document.querySelectorAll(".edit-wheel-items__wheel-item").forEach(item => {
            let existing = item.querySelector('img[alt="remove-item"]');
            if (!existing) {
                const removeImg = document.createElement("img");
                removeImg.src = "img/interface/wheel-items/remove-item.png";
                removeImg.alt = "remove-item";
                removeImg.width = 24;
                removeImg.height = 24;
                removeImg.classList.add("clickable");
                removeImg.addEventListener("click", () => {
                    item.remove();
                    saveWheelItems();
                });
                item.appendChild(removeImg);
            } else {
                existing.classList.add("clickable");
                existing.addEventListener("click", () => {
                    item.remove();
                    saveWheelItems();
                });
            }

            const rateInput = item.querySelector(".edit-wheel-items__item-rate");
            const textInput = item.querySelector(".edit-wheel-items__input");
            if (rateInput) rateInput.addEventListener("input", saveWheelItems);
            if (textInput) textInput.addEventListener("input", saveWheelItems);
        });
    }

    // ---------- Add item button ----------
    const addItemBtn = document.querySelector(".edit-wheel-items__add-item");
    if (addItemBtn) {
        addItemBtn.addEventListener("click", () => {
            const newItem = createWheelItem("1", "");
            const bottomHeader = document.querySelectorAll(".edit-wheel-items__header")[1];
            if (bottomHeader) bottomHeader.insertAdjacentElement("beforebegin", newItem);
            else document.querySelector(".edit-wheel-items")?.appendChild(newItem);
            saveWheelItems();
        });
    }

    // ---------- Reset wheel items header ----------
    const topResetIcon = document.querySelector(".edit-wheel-items__header img[alt='reset']");
    if (topResetIcon) {
        topResetIcon.classList.add("clickable");
        topResetIcon.addEventListener("click", () => {
            const items = Array.from(document.querySelectorAll(".edit-wheel-items__wheel-item"));

            if (items.length > 5) {
                items.slice(5).forEach(it => it.remove());
            }

            const usedIndices = new Set();

            function getRandomChallenge() {
                if (usedIndices.size >= PREDEFINED_CHALLENGES.length) {
                    usedIndices.clear(); // اگر همه استفاده شدن، ریست کن
                }
                let index;
                do {
                    index = Math.floor(Math.random() * PREDEFINED_CHALLENGES.length);
                } while (usedIndices.has(index));
                usedIndices.add(index);
                return PREDEFINED_CHALLENGES[index];
            }

            Array.from(document.querySelectorAll(".edit-wheel-items__wheel-item")).slice(0, 5).forEach(it => {
                const rateInput = it.querySelector(".edit-wheel-items__item-rate");
                const textInput = it.querySelector(".edit-wheel-items__input");
                if (rateInput) rateInput.value = "1";
                if (textInput) textInput.value = getRandomChallenge();
            });

            saveWheelItems();
        });
    }


    // ---------- Custom select persistence ----------
    const allCustomSelects = document.querySelectorAll(".custom-select");
    allCustomSelects.forEach((select) => {
        const display = select.querySelector(".select-display");
        const options = select.querySelector(".select-options");

        select.addEventListener("click", function (e) {
            e.stopPropagation();
            allCustomSelects.forEach((el) => {
                if (el !== select) el.classList.remove("open");
            });
            select.classList.toggle("open");
        });

        options.querySelectorAll(".option").forEach((option) => {
            option.addEventListener("click", function (e) {
                e.stopPropagation();
                display.textContent = this.textContent;
                select.classList.remove("open");
                saveSettings();
            });
        });
    });
    document.addEventListener("click", function (e) {
        allCustomSelects.forEach((select) => {
            // اگر این select مربوط به decision-sound هست و کلیک داخل خودش بوده، نندازش پایین
            if (select.classList.contains("decision-sound") && e.target.closest(".decision-sound")) {
                return;
            }
            select.classList.remove("open");
        });
    });
    // باز/بسته کردن decision-sound به‌صورت مستقل (تا انتخاب چندتایی بسته نشه)
        const decisionSoundSelect = document.querySelector(".decision-sound");
        if (decisionSoundSelect) {
            const display = decisionSoundSelect.querySelector(".select-display");
            display.addEventListener("click", (e) => {
                e.stopPropagation();
                decisionSoundSelect.classList.toggle("open");
            });
        }


    // ---------- Volume slider ----------
    const volumeSlider = document.getElementById('siteVolumeSlider');
    const sliderTooltip = document.getElementById('sliderTooltip');

    if (volumeSlider) {
        volumeSlider.addEventListener('input', () => {
            updateSlider();
            saveVolume();

            // همزمان ولوم همه‌ی صداهای در حال پخش رو هم به‌روزرسانی کن
            if (spinAudio) spinAudio.volume = getVolumeLevel();
            if (decisionAudio) decisionAudio.volume = getVolumeLevel();
            // اگر صدای کلیک موقت داری هم می‌تونی اضافه کنی:
            // if (clickAudio) clickAudio.volume = getVolumeLevel();
        });
    }

    function updateSlider() {
        if (!volumeSlider || !sliderTooltip) return;
        const value = volumeSlider.value;
        sliderTooltip.textContent = value;
        const percent = value / volumeSlider.max;
        const thumbOffset = percent * volumeSlider.offsetWidth;
        sliderTooltip.style.left = `${thumbOffset}px`;
        volumeSlider.style.background = `linear-gradient(to right, #6c5ce7 ${value}%, #ccc ${value}%)`;
    }

    if (volumeSlider && sliderTooltip) {
        volumeSlider.addEventListener('input', () => {
            updateSlider();
            sliderTooltip.style.opacity = 1;
            sliderTooltip.style.top = '-35px';
            saveVolume();
        });

        volumeSlider.addEventListener('mouseenter', () => {
            sliderTooltip.style.opacity = 1;
            updateSlider();
        });

        volumeSlider.addEventListener('mouseleave', () => {
            sliderTooltip.style.opacity = 0;
        });
    }

    // ---------- Switch persistence ----------
    document.querySelectorAll('input[type=checkbox]').forEach(cb => {
        cb.addEventListener("change", () => {
            saveSettings();
        });
    });

    const recoveryBtn = document.getElementById("recovery-items-option");
    if (recoveryBtn) {
        recoveryBtn.addEventListener("click", () => {
            const removedItems = Array.from(document.querySelectorAll(".edit-wheel-items__wheel-item"))
                .filter(item => item.dataset.removedDuplicate);
            if (!removedItems.length) {
                Swal.fire({
                    title: 'همه گزینه ها فعال هستند',
                    html: `<div style="font-family: YekanBakh, sans-serif; font-size: 18px;">.هیچ گزینه غیر فعالی وجود ندارد</div>`,
                    icon: 'info',
                    confirmButtonText: 'باشه',
                    background: '#121117',
                    color: '#ffffff',
                    confirmButtonColor: '#6D49FF',
                    showClass: {
                        popup: 'animate__animated animate__zoomInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOut',
                    },
                    customClass: {
                        popup: 'sweet-popup',
                        confirmButton: 'sweet-confirm-btn'
                    }
                });
                return;
            }

            removedItems.forEach(item => {
                restoreRemovedItem(item);
            });
            saveWheelItems();

            Swal.fire({
                title: 'بازیابی گزینه ها انجام شد',
                html: `<div style="font-family: YekanBakh, sans-serif; font-size: 18px;">.تمام گزینه های غیرفعال‌شده گردونه دوباره فعال شدند</div>`,
                icon: 'success',
                confirmButtonText: 'باشه',
                background: '#121117',
                color: '#ffffff',
                confirmButtonColor: '#6D49FF',
                showClass: {
                    popup: 'animate__animated animate__zoomInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOut',
                },
                customClass: {
                    popup: 'sweet-popup',
                    confirmButton: 'sweet-confirm-btn'
                }
            });
        });
    }


    // ---------- Wheel items input listener for rebuild ----------
    document.body.addEventListener("input", (e) => {
        if (e.target.matches(".edit-wheel-items__input") || e.target.matches(".edit-wheel-items__item-rate")) {
            buildWheel();
        }
    });

    // ---------- Load on startup ----------


    // ---------- Spinning wheel logic ----------
    const wheelSvg = document.getElementById("spinningWheel");
    const slicesGroup = document.getElementById("slices");
    const spinButton = document.getElementById("spinButton");
    let isSpinning = false;
    let currentAngle = 0;


    let currentWheelColors;

// موقع لود، تنظیم کن:
    const savedColorKey = localStorage.getItem(STORAGE_KEYS.WHEEL_COLOR);
    if (savedColorKey && wheelThemes[savedColorKey]) {
        currentWheelColors = wheelThemes[savedColorKey];
    } else {
        currentWheelColors = wheelThemes["color-01"]; // fallback
    }

    loadSettings();
    loadVolume();
    loadWheelItems();
    attachInitialWheelItemHandlers();
    document.querySelectorAll('.color-option').forEach(el => {
        el.addEventListener('click', () => {
            const key = el.dataset.key;
            const newTheme = wheelThemes[key];
            if (newTheme) {
                currentWheelColors = newTheme;
                localStorage.setItem("selectedWheelTheme", key); // ذخیره در لوکال‌استوریج
                buildWheel();
                // مدیریت کلاس انتخاب‌شده
                document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
                el.classList.add('selected');
            }
        });
    });


    function getWheelItemsFromDOM() {
        const items = Array.from(document.querySelectorAll(".edit-wheel-items__wheel-item"))
            .filter(item => !item.dataset.removedDuplicate)
            .map(item => {
                const rateStr = item.querySelector(".edit-wheel-items__item-rate")?.value || "1";
                const rate = parseFloat(rateStr) || 1;
                const text = item.querySelector(".edit-wheel-items__input")?.value.trim() || "بدون عنوان";
                return { rate: Math.max(rate, 0.1), text };
            })
            .filter(i => i.text.length > 0);
        return items;
    }


    function polarToCartesian(r, angleDeg) {
        const angleRad = (angleDeg) * Math.PI / 180; // صفر از راست، ساعتگرد
        return {
            x: Math.cos(angleRad) * r,
            y: Math.sin(angleRad) * r
        };
    }
    document.addEventListener("DOMContentLoaded", () => {
        loadSavedWheelColor(); // این تابع رنگ ذخیره‌شده رو اعمال می‌کنه
        loadWheelItems(); // بعدش آیتم‌ها لود می‌شن
        buildWheel();     // بعدش گردونه ساخته میشه با رنگ درست
    });

    function buildWheel() {
        const items = getWheelItemsFromDOM();
        slicesGroup.innerHTML = "";
        if (!items.length) {
            items.push({ rate: 1, text: "هیچ‌چیز" });
        }


        const totalWeight = items.reduce((sum, it) => sum + it.rate, 0);
        let startAngle = 0;

        items.forEach((item, idx) => {
            const sliceAngle = (item.rate / totalWeight) * 360;
            const midAngle = startAngle + sliceAngle / 2;

            const radius = 220;
            const largeArc = sliceAngle > 180 ? 1 : 0;
            const from = polarToCartesian(radius, startAngle);
            const to = polarToCartesian(radius, startAngle + sliceAngle);

            const pathData = [
                `M 0 0`,
                `L ${from.x} ${from.y}`,
                `A ${radius} ${radius} 0 ${largeArc} 1 ${to.x} ${to.y}`,
                "Z"
            ].join(" ");

            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", pathData);
            path.setAttribute("fill", currentWheelColors[idx % currentWheelColors.length]);
            path.setAttribute("stroke", "#fff");
            path.setAttribute("stroke-width", "2");
            path.dataset.midAngle = midAngle;

            const textEl = document.createElementNS("http://www.w3.org/2000/svg", "text");
            const textRadius = radius * 0.6;
            const textPos = polarToCartesian(textRadius, midAngle);
            textEl.setAttribute("x", textPos.x + 55);
            textEl.setAttribute("y", textPos.y + 5);
            textEl.setAttribute("text-anchor", "end");
            textEl.setAttribute("font-size", "12");
            textEl.setAttribute("fill", "#fff");
            textEl.setAttribute("font-weight", "500");
            textEl.setAttribute("font-family", "YekanBakh, sans-serif");
            let displayText = item.text;
            if (displayText.length > 21) {
                displayText =  '... ' + displayText.substring(0, 17);
            }
            textEl.textContent = displayText;
            textEl.setAttribute("direction", "ltr");

            // همه متن‌ها رو به سمت مرکز راست کنیم (بدون چرخش ۱۸۰)
            textEl.setAttribute("transform", `rotate(${midAngle} ${textPos.x} ${textPos.y})`);

            const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
            group.appendChild(path);
            group.appendChild(textEl);
            slicesGroup.appendChild(group);

            startAngle += sliceAngle;

        });

    }


    function pickWeightedIndex(items) {
        const total = items.reduce((s, i) => s + i.rate, 0);
        const r = Math.random() * total;
        let acc = 0;
        for (let i = 0; i < items.length; i++) {
            acc += items[i].rate;
            if (r <= acc) return i;
        }
        return items.length - 1;
    }

    // helper برای چک کردن فعال بودن حذف تکراری
    function isRemoveDuplicateEnabled() {
        return !!document.getElementById('remove-duplicate-option')?.checked;
    }
    function markItemAsRemoved(wrapper) {
        const textInput = wrapper.querySelector(".edit-wheel-items__input");
        const rateInput = wrapper.querySelector(".edit-wheel-items__item-rate");
        if (textInput) {
            textInput.readOnly = true;
        }
        if (rateInput) {
            rateInput.readOnly = true;
        }
        wrapper.classList.add("disabled-duplicate");
        wrapper.dataset.removedDuplicate = "true";
    }

    function restoreRemovedItem(wrapper) {
        const textInput = wrapper.querySelector(".edit-wheel-items__input");
        const rateInput = wrapper.querySelector(".edit-wheel-items__item-rate");
        if (textInput) {
            textInput.readOnly = false;
        }
        if (rateInput) {
            rateInput.readOnly = false;
        }
        wrapper.classList.remove("disabled-duplicate");
        delete wrapper.dataset.removedDuplicate;
    }

    const SPIN_SOUND_FADE_DURATION = 2500; // میلی‌ثانیه قبل از پایان که فید شروع می‌شه
// ---------- Decision/result sound helpers (multi-select) ----------
    const DECISION_SOUND_MAP = {
        "پیشفرض": { folder: "defult", count: 19 },
        "عمو آرمان": { folder: "arman", count: 17 },
        "کاروشی": { folder: "karoshi", count: 7 },
        "علی ادوکس": { folder: "adox", count: 9 },
        "علی کیلر": { folder: "killer", count: 11 },
        "میلاد فانتوم": { folder: "fantom", count: 10 },
        "ممد بالونی": { folder: "ballooni", count: 10 },
        "ممد شدو": { folder: "shadow", count: 10 }
    };

    let decisionAudio = null;

    function getSelectedDecisionKeys() {
        const container = document.querySelector(".decision-sound");
        const options = Array.from(container.querySelectorAll(".select-options .option"));
        // اگر "همه" تیک خورده یا هیچ‌کس انتخاب نشده، برگردون همه کلیدها
        const allOption = options.find(o => o.dataset.key === "همه");
        const allChecked = allOption?.querySelector("input")?.checked;
        if (allChecked || options.every(o => o.querySelector("input") && !o.querySelector("input").checked)) {
            return Object.keys(DECISION_SOUND_MAP);
        }
        // غیر از "همه"، کلیدهایی که تیک خوردن
        return options
            .filter(o => o.dataset.key !== "همه" && o.querySelector("input")?.checked)
            .map(o => o.dataset.key)
            .filter(k => k in DECISION_SOUND_MAP);
    }

    function updateDecisionDisplay() {
        const display = document.querySelector(".decision-sound .select-display");
        const keys = getSelectedDecisionKeys();
        if (keys.length === Object.keys(DECISION_SOUND_MAP).length) {
            display.textContent = "پیشفرض";
        } else if (keys.length === 1) {
            display.textContent = keys[0];
        } else {
            display.textContent = `${keys.length} انتخاب`;
        }
    }

    function pickRandomDecisionSoundFileFromKeys(keys) {
        if (!keys || !keys.length) return null;
        // از بین کلیدهای انتخاب‌شده یه دسته انتخاب کن
        const key = keys[Math.floor(Math.random() * keys.length)];
        const info = DECISION_SOUND_MAP[key];
        if (!info) return null;
        const num = Math.floor(Math.random() * info.count) + 1;
        const padded = String(num).padStart(2, "0");
        return `sfx/result/${info.folder}/${padded}.ogg`;
    }

    function playDecisionSound() {
        if (isSiteMuted) return; // اضافه شد
        if (isMuteDecisionSound()) return; // اگر میوت نتیجه فعال بود نزن

        const keys = getSelectedDecisionKeys();
        const src = pickRandomDecisionSoundFileFromKeys(keys);
        if (!src) return;
        if (decisionAudio) {
            decisionAudio.pause();
            decisionAudio = null;
        }
        decisionAudio = new Audio(src);
        decisionAudio.volume = getVolumeLevel();
        decisionAudio.play().catch(() => { });
    }

    document.querySelector(".mute-click-sound input[type=checkbox]")?.addEventListener("change", () => {
        saveSettings(); // وضعیت جدید ذخیره بشه
    });

    document.querySelector(".mute-decision-sound input[type=checkbox]")?.addEventListener("change", () => {
        saveSettings();
    });

// setup listener برای تعامل با dropdown چندتایی
    (function setupDecisionMultiSelect() {
        const container = document.querySelector(".decision-sound");
        if (!container) return;
        const display = container.querySelector(".select-display");
        const options = Array.from(container.querySelectorAll(".select-options .option"));

        // کلیک روی گزینه‌ها: تگ زدن/آن‌تگ زدن
        options.forEach(opt => {
            const checkbox = opt.querySelector("input[type=checkbox]");
            opt.addEventListener("click", function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation(); // مهم: مانع اجرای لیسنر عمومی روی همین .option می‌شه

                if (!checkbox) return;

                if (opt.dataset.key === "همه") {
                    // وقتی "همه" زده شد، همه رو تیک بزن یا پاک کن
                    const allChecked = checkbox.checked;
                    options.forEach(o => {
                        const cb = o.querySelector("input[type=checkbox]");
                        if (!cb) return;
                        if (o.dataset.key === "همه") {
                            cb.checked = !allChecked;
                        } else {
                            cb.checked = !allChecked;
                        }
                    });
                } else {
                    checkbox.checked = !checkbox.checked;
                    // اگر یکی غیر از "همه" زدیم، "همه" رو آن‌تیک کن
                    const allOpt = options.find(o => o.dataset.key === "همه");
                    if (allOpt) {
                        const allCb = allOpt.querySelector("input[type=checkbox]");
                        if (allCb) allCb.checked = false;
                    }
                }

                updateDecisionDisplay();
                saveSettings();
            });
        });


        // اگر کلیک خارج از dropdown بود ببند (اگه از منطق باز/بستن قبلی استفاده می‌کنی)
        document.addEventListener("click", () => {
            options.forEach(o => o.closest(".custom-select")?.classList.remove("open"));
        });

        // مقدار اولیه نمایش
        updateDecisionDisplay();
    })();
// ری‌استور کردن انتخاب‌های decision-sound پس از این‌که multi-select و updateDecisionDisplay آماده شدند
    if (lastParsedSettings?.decisionSoundSelection) {
        const container = document.querySelector(".decision-sound");
        if (container) {
            const options = Array.from(container.querySelectorAll(".select-options .option"));
            options.forEach(o => {
                const key = o.dataset.key?.trim() || o.textContent.trim();
                const cb = o.querySelector("input[type=checkbox]");
                if (cb && key in lastParsedSettings.decisionSoundSelection) {
                    cb.checked = !!lastParsedSettings.decisionSoundSelection[key];
                }
            });
            const allOpt = options.find(o => o.dataset.key === "همه");
            if (allOpt) {
                const allCb = allOpt.querySelector("input[type=checkbox]");
                if (allCb && allCb.checked) {
                    options.forEach(o => {
                        const cb = o.querySelector("input[type=checkbox]");
                        if (cb) cb.checked = true;
                    });
                } else {
                    const anyNonAll = options.some(o => o.dataset.key !== "همه" && o.querySelector("input[type=checkbox]")?.checked);
                    if (anyNonAll && allOpt) {
                        const cb = allOpt.querySelector("input[type=checkbox]");
                        if (cb) cb.checked = false;
                    }
                }
            }
            updateDecisionDisplay();
        }
    }

    let isSiteMuted = false;

    function setSiteMuted(muted){
        isSiteMuted=muted;
        if(spinAudio) spinAudio.muted=muted;
        if(decisionAudio) decisionAudio.muted=muted;
    }

    const volumeCheckbox = document.querySelector('.header__volume input[type="checkbox"]');
    const savedMute = localStorage.getItem('siteMuted') === 'true';
    volumeCheckbox.checked = savedMute;
    setSiteMuted(savedMute);

    volumeCheckbox.addEventListener('change', function() {
        const muted = volumeCheckbox.checked;
        setSiteMuted(muted);
        localStorage.setItem('siteMuted', muted);
    });

    function spinWheel() {
        if (isSpinning) return;
        isSpinning = true;
        buildWheel();

        // شروع صدای چرخش
        playSpinSoundStart();

        let items = getWheelItemsFromDOM();
        if (!items.length) {
            isSpinning = false;
            return;
        }

        const selectedIndex = pickWeightedIndex(items);
        const totalWeight = items.reduce((s, i) => s + i.rate, 0);
        let angleSum = 0;
        let selectedAngle = 0;

        for (let i = 0; i <= selectedIndex; i++) {
            const sliceAngle = (items[i].rate / totalWeight) * 360;
            if (i === selectedIndex) {
                selectedAngle = angleSum + sliceAngle / 2;
            }
            angleSum += sliceAngle;
        }

        const spinSpeed = document.getElementById("Wheel-Spin-Speed").textContent.trim();
        let duration, minTurns, maxTurns;

        if (spinSpeed === "سریع") {
            duration = 5000;
            minTurns = 3;
            maxTurns = 4;
        } else if (spinSpeed === "کند") {
            duration = 12000;
            minTurns = 5;
            maxTurns = 7;
        } else { // متوسط
            duration = 8000;
            minTurns = 4;
            maxTurns = 5;
        }

        const extraTurns = Math.random() * (maxTurns - minTurns) + minTurns;
        const randomNoise = (Math.random() - 0.5) * 20;
        const finalRotation = extraTurns * 360 + (360 + randomNoise - selectedAngle);

        const startTime = performance.now();
        const startAngle = currentAngle;

        let spinFadeStarted = false;

        function easeOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function frame(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const delta = finalRotation * eased;
            const newAngle = startAngle + delta;

            currentAngle = newAngle;

            slicesGroup.setAttribute('transform', `translate(250,250) rotate(${newAngle})`);
            const currentAbsoluteAngle = ((newAngle % 360) + 360) % 360;
            const pointerAngle = (360 - currentAbsoluteAngle) % 360;

            const currentSliceIndex = getSelectedSliceIndex(pointerAngle, items);

            if (currentSliceIndex !== previousSliceIndex) {
                previousSliceIndex = currentSliceIndex;
                const pointer = document.querySelector(".wheel-arrow");
                if (pointer) {
                    pointer.classList.remove("tick");
                    void pointer.offsetWidth;
                    pointer.classList.add("tick");
                }
            }

            // فید پیش از اتمام: اگر به کمتر از SPIN_SOUND_FADE_DURATION مونده بود، شروع کن
            const timeLeft = Math.max(duration - elapsed, 0);
            if (!spinFadeStarted && timeLeft <= SPIN_SOUND_FADE_DURATION) {
                spinFadeStarted = true;
            }
            if (spinAudio) {
                if (spinFadeStarted) {
                    const ratio = Math.max(Math.min(timeLeft / SPIN_SOUND_FADE_DURATION, 1), 0);
                    spinAudio.volume = getVolumeLevel() * ratio;
                } else {
                    spinAudio.volume = getVolumeLevel();
                }
            }

            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                isSpinning = false;

                // قطع کامل صدا
                if (spinAudio) {
                    spinAudio.pause();
                    spinAudio = null;
                }

                const finalAbsoluteAngle = ((newAngle % 360) + 360) % 360;
                const pointerAngleEnd = (360 - finalAbsoluteAngle) % 360;
                const resultIndex = getSelectedSliceIndex(pointerAngleEnd, items);
                const resultText = items[resultIndex].text;

                // پخش صدای نتیجه
                playDecisionSound();

                // نمایش نتیجه
                Swal.fire({
                    title: 'نتیجه گردونه 🎲',
                    html: `<div style="font-family: YekanBakh, sans-serif; font-size: 18px; direction: rtl">${resultText}</div>`,
                    icon: 'success',
                    confirmButtonText: 'باشه',
                    background: '#121117',
                    color: '#ffffff',
                    confirmButtonColor: '#6D49FF',
                    showClass: {
                        popup: 'animate__animated animate__zoomInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOut',
                    },
                    customClass: {
                        popup: 'sweet-popup',
                        confirmButton: 'sweet-confirm-btn'
                    }
                });

                document.getElementById("lastSelectedText").textContent = resultText;

                if (isRemoveDuplicateEnabled()) {
                    const wheelItemEls = Array.from(document.querySelectorAll(".edit-wheel-items__wheel-item"));
                    const mapped = wheelItemEls.map(el => {
                        const rateStr = el.querySelector(".edit-wheel-items__item-rate")?.value || "1";
                        const rate = parseFloat(rateStr) || 1;
                        const text = el.querySelector(".edit-wheel-items__input")?.value.trim() || "";
                        return { el, rate: Math.max(rate, 0.1), text };
                    }).filter(i => i.text.length > 0);
                    if (mapped[resultIndex]) {
                        markItemAsRemoved(mapped[resultIndex].el);
                        saveWheelItems();
                    }
                }
            }
        }

        requestAnimationFrame(frame);
    }





    function getSelectedSliceIndex(pointerAngle, items) {
        const totalWeight = items.reduce((sum, it) => sum + it.rate, 0);
        let start = 0;
        for (let i = 0; i < items.length; i++) {
            const sliceAngle = (items[i].rate / totalWeight) * 360;
            const end = start + sliceAngle;
            if (pointerAngle >= start && pointerAngle < end) {
                return i;
            }
            start = end;
        }
        return 0; // fallback
    }




    // بازسازی اولیه
    buildWheel();

    // هر وقت آیتم‌ها تغییر کرد دوباره بساز
    const wheelItemsContainer = document.querySelector(".edit-wheel-items");
    if (wheelItemsContainer) {
        const mutationObserver = new MutationObserver(() => buildWheel());
        mutationObserver.observe(wheelItemsContainer, { childList: true, subtree: true });
    }

    // اتصال دکمه
    if (spinButton) {
        spinButton.addEventListener("click", spinWheel);
    }

    // ---------- Starfield canvas animation (اگر قبلاً بود نگه دار) ----------
    const c = document.getElementById("c");
    if (c) {
        let ctx = c.getContext("2d"),
            h = c.height = window.innerHeight,
            w = c.width = window.innerWidth,
            random = (n) => Math.random() * n,
            stars = new Array(1000).fill().map(() => {
                return {
                    r: random(w),
                    s: random(0.002),
                    a: random(Math.PI * 2)
                };
            });

        function loop() {
            ctx.fillStyle = "rgba(10,5,46,0.1)";
            ctx.fillRect(0, 0, w, h);
            stars.forEach(e => {
                e.a += e.s;
                ctx.save();
                ctx.beginPath();
                ctx.translate(w / 2, h / 2);
                ctx.rotate(e.a);
                ctx.arc(e.r, e.r, 1, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fillStyle = "white";
                ctx.fill();
                ctx.restore();
            });
            requestAnimationFrame(loop);
        }

        loop();

        window.addEventListener("resize", () => {
            w = c.width = window.innerWidth;
            h = c.height = window.innerHeight;
        });
    }

    // ---------- Footer auto scroll ----------
    const footer = document.querySelector(".footer");
    if (footer) {
        footer.addEventListener("mouseenter", () => {
            const start = window.scrollY;
            const end = document.documentElement.scrollHeight;
            const duration = 600;
            let startTime = null;

            function scrollStep(timestamp) {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percent = Math.min(progress / duration, 1);
                const current = start + (end - start) * percent;
                window.scrollTo(0, current);
                if (percent < 1) {
                    requestAnimationFrame(scrollStep);
                }
            }

            requestAnimationFrame(scrollStep);
        });
    }

    // ---------- Settings panel open/close ----------

    const openBtn = document.querySelector(".header__setting");
    const settingsPanel = document.querySelector(".settings");
    const wheelSettingsPanel = document.querySelector(".wheel-settings");
    const openWheelSettingsBtn = document.getElementById("open-wheel-settings");

    // تابع باز کردن هر پنل
    function openPanel(panel) {
        panel.style.display = "block";
        setTimeout(() => panel.classList.add("active"), 10);
    }

    // تابع بستن هر پنل
    function closePanel(panel) {
        panel.classList.remove("active");
        setTimeout(() => panel.style.display = "none", 300);
    }

    // باز کردن پنل تنظیمات اصلی
    if (openBtn && settingsPanel) {
        openBtn.addEventListener("click", () => openPanel(settingsPanel));
    }

    // بستن پنل تنظیمات اصلی با کلیک روی آیکن بستن
    if (settingsPanel) {
        settingsPanel.addEventListener("click", (e) => {
            if (e.target.closest(".settings__close")) {
                closePanel(settingsPanel);
            }
        });
    }

    // باز کردن پنل تنظیمات ظاهری با کلیک روی کل div
    const mainContainer = document.querySelector(".main");

// باز کردن پنل تنظیمات ظاهری

    const closeWheelSettingsBtn = document.querySelector(".wheel-settings__close");

// تابع باز کردن پنل با انیمیشن
    function openWheelSettings() {
        closePanel(settingsPanel); // اگر پنل اصلی بازه ببندش اول
        setTimeout(() => {
            wheelSettingsPanel.style.display = "block";
            // تا کمی بعد کلاس active رو اضافه کن
            setTimeout(() => {
                wheelSettingsPanel.classList.add("active");
                mainContainer.classList.add("shrinked");
                backgroundContainer.classList.add("shifted");

            }, 20);
        }, 200);
    }

// تابع بستن پنل با انیمیشن
    function closeWheelSettings() {
        wheelSettingsPanel.classList.remove("active");
        mainContainer.classList.remove("shrinked");
        backgroundContainer.classList.remove("shifted");
        // وقتی انیمیشن تموم شد، display:none بذاریم
        setTimeout(() => {
            wheelSettingsPanel.style.display = "none";
        }, 500); // باید با مدت transition هماهنگ باشه
    }

    if (openWheelSettingsBtn) {
        openWheelSettingsBtn.addEventListener("click", openWheelSettings);
    }

    if (closeWheelSettingsBtn) {
        closeWheelSettingsBtn.addEventListener("click", closeWheelSettings);
    }
    const STORAGE_KEY_BG = "selectedBackgroundTheme";

// بارگذاری تم ذخیره‌شده در شروع
    const savedTheme = localStorage.getItem(STORAGE_KEY_BG);
    if (savedTheme && savedTheme.startsWith(themePrefix)) {
        removeOldThemeClass();
        allContainer.classList.add(savedTheme);
        // ست کردن حالت انتخاب‌شده بصری
        highlightSelectedImage(savedTheme.replace(themePrefix, ""));
    } else {
        highlightSelectedImage("01"); // پیش‌فرض
    }

// تابع بوردر بنفش برای آیتم انتخابی
    function highlightSelectedImage(themeNumber) {
        items.forEach(img => {
            img.classList.remove("selected-bg");
            const key = img.getAttribute("data-key");
            if (key === `bg-${themeNumber}`) {
                img.classList.add("selected-bg");
            }
        });
    }

// هندل کلیک با ذخیره
    items.forEach((item) => {
        item.addEventListener("click", function () {
            const key = item.getAttribute("data-key"); // مثل bg-05
            const themeNumber = key.replace("bg-", "");
            const newClass = `${themePrefix}${themeNumber}`;

            removeOldThemeClass();
            allContainer.classList.add(newClass);
            localStorage.setItem(STORAGE_KEY_BG, newClass);

            highlightSelectedImage(themeNumber);
        });
    });

    // ---------------------- Cursor Theme Selector ----------------------
    const cursorItems = document.querySelectorAll(".cursor-option");
    const cursorPrefix = "cursor__theme-";
    const CURSOR_STORAGE_KEY = "selectedCursorTheme";

// حذف کلاس قبلی
    function removeOldCursorClass() {
        [...document.body.classList].forEach(cls => {
            if (cls.startsWith(cursorPrefix)) {
                document.body.classList.remove(cls);
            }
        });
    }

// نمایش انتخاب‌شده
    function highlightSelectedCursor(cursorNumber) {
        cursorItems.forEach(img => {
            const key = img.getAttribute("data-key");
            img.classList.toggle("selected-cursor", key === `cursor-${cursorNumber}`);
        });
    }

// بارگذاری تم ذخیره‌شده
    const savedCursor = localStorage.getItem(CURSOR_STORAGE_KEY);
    if (savedCursor && savedCursor.startsWith(cursorPrefix)) {
        removeOldCursorClass();
        document.body.classList.add(savedCursor);
        highlightSelectedCursor(savedCursor.replace(cursorPrefix, ""));
    } else {
        document.body.classList.add(`${cursorPrefix}01`);
        highlightSelectedCursor("01");
    }

// اتصال کلیک
    cursorItems.forEach((item) => {
        item.addEventListener("click", () => {
            const key = item.getAttribute("data-key");
            const cursorNumber = key.replace("cursor-", "");
            const newClass = `${cursorPrefix}${cursorNumber}`;

            removeOldCursorClass();
            document.body.classList.add(newClass);
            localStorage.setItem(CURSOR_STORAGE_KEY, newClass);
            highlightSelectedCursor(cursorNumber);
        });
    });

    const overlayEl = document.querySelector('.wheel-overlay');
    const bgOptions = document.querySelectorAll('.wheel-bg-option');
    const STORAGE_KEY = 'selectedWheelOverlayTheme';

    function applyOverlayTheme(key) {
        // حذف همه کلاس‌های قبلی theme
        overlayEl.classList.forEach(cls => {
            if (cls.startsWith('wheel-overlay__theme-')) {
                overlayEl.classList.remove(cls);
            }
        });

        // افزودن کلاس جدید
        overlayEl.classList.add(`wheel-overlay__theme-${key}`);

        // ذخیره در localStorage
        localStorage.setItem(STORAGE_KEY, key);
    }

    function updateSelectedVisual(selectedKey) {
        bgOptions.forEach(option => {
            option.classList.toggle('selected', option.dataset.key === `wheel-bg-${selectedKey}`);
        });
    }

// هندل کلیک روی هر عکس
    bgOptions.forEach(option => {
        option.addEventListener('click', () => {
            const key = option.dataset.key.replace('wheel-bg-', '');
            const defaultKey = '01';
            applyOverlayTheme(key);
            updateSelectedVisual(key);
        });
    });

// هنگام بارگذاری صفحه، بازیابی تم ذخیره‌شده
    window.addEventListener('DOMContentLoaded', () => {
        const savedKey = localStorage.getItem(STORAGE_KEY);
        if (savedKey) {
            applyOverlayTheme(savedKey);
            updateSelectedVisual(savedKey);
        } else {
            // ✅ تم پیش‌فرض: عکس اول (wheel-bg-01)
            const defaultKey = '01';
            applyOverlayTheme(defaultKey);
            updateSelectedVisual(defaultKey);
        }
    });

    const spinButtonEl = document.querySelector('.wheel-spin-button');
    const buttonOptions = document.querySelectorAll('.wheel-button-option');
    const BUTTON_THEME_STORAGE_KEY = 'selectedWheelButtonTheme';

// اعمال تم دکمه
    function applyButtonTheme(key) {
        // حذف همه کلاس‌های قبلی مشابه
        spinButtonEl.classList.forEach(cls => {
            if (cls.startsWith('wheel-button__theme-')) {
                spinButtonEl.classList.remove(cls);
            }
        });

        // افزودن کلاس جدید
        spinButtonEl.classList.add(`wheel-button__theme-${key}`);

        // ذخیره در localStorage
        localStorage.setItem(BUTTON_THEME_STORAGE_KEY, key);
    }

// مدیریت کلاس selected برای عکس‌ها
    function updateButtonSelectedVisual(selectedKey) {
        buttonOptions.forEach(option => {
            option.classList.toggle('selected', option.dataset.key === `wheel-button-${selectedKey}`);
        });
    }

// کلیک روی عکس‌ها
    buttonOptions.forEach(option => {
        option.addEventListener('click', () => {
            const key = option.dataset.key.replace('wheel-button-', '');
            applyButtonTheme(key);
            updateButtonSelectedVisual(key);
        });
    });

// بارگذاری اولیه صفحه
    window.addEventListener('DOMContentLoaded', () => {
        const savedKey = localStorage.getItem(BUTTON_THEME_STORAGE_KEY);
        const defaultKey = '01';
        const finalKey = savedKey || defaultKey;

        applyButtonTheme(finalKey);
        updateButtonSelectedVisual(finalKey);
    });


    const arrowEl = document.querySelector('.wheel-arrow');
    const pointerOptions = document.querySelectorAll('.wheel-pointer-option');
    const POINTER_THEME_STORAGE_KEY = 'selectedWheelPointerTheme';

// اعمال تم پیکان (pointer)
    function applyPointerTheme(key) {
        // حذف کلاس‌های قبلی مشابه
        arrowEl.classList.forEach(cls => {
            if (cls.startsWith('wheel-arrow__theme-')) {
                arrowEl.classList.remove(cls);
            }
        });

        // افزودن کلاس جدید
        arrowEl.classList.add(`wheel-arrow__theme-${key}`);

        // ذخیره در localStorage
        localStorage.setItem(POINTER_THEME_STORAGE_KEY, key);
    }

// اعمال حالت انتخاب‌شده به عکس
    function updatePointerSelectedVisual(selectedKey) {
        pointerOptions.forEach(option => {
            option.classList.toggle('selected', option.dataset.key === `wheel-pointer-${selectedKey}`);
        });
    }

// مدیریت کلیک
    pointerOptions.forEach(option => {
        option.addEventListener('click', () => {
            const key = option.dataset.key.replace('wheel-pointer-', '');
            applyPointerTheme(key);
            updatePointerSelectedVisual(key);
        });
    });

// بارگذاری اولیه صفحه
    window.addEventListener('DOMContentLoaded', () => {
        const savedKey = localStorage.getItem(POINTER_THEME_STORAGE_KEY);
        const defaultKey = '01';
        const finalKey = savedKey || defaultKey;

        applyPointerTheme(finalKey);
        updatePointerSelectedVisual(finalKey);
    });


    const resetSettingsBtn = document.querySelector(".settings__reset-settings");
    if (resetSettingsBtn) {
        resetSettingsBtn.addEventListener("click", () => {
            Swal.fire({
                title: 'آیا مطمئنی؟',
                html: '<div style="font-family:YekanBakh, sans-serif; font-size:18px;">با این کار تمام تنظیمات، به حالت پیشفرض برمی‌گردند</div>',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'ریست کن',
                cancelButtonText: 'لغو',
                background: '#121117',
                color: '#ffffff',
                confirmButtonColor: '#e74c3c',
                cancelButtonColor: '#6D49FF',
                customClass: {
                    popup: 'sweet-popup',
                    confirmButton: 'sweet-confirm-btn2',
                    cancelButton: 'sweet-cancel-btn2'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // ----- پاک‌سازی ذخیره‌ها -----
                    const keysToRemove = [
                        "wheelSettings",
                        "siteVolume",
                        "selectedWheelTheme",
                        "selectedBackgroundTheme",
                        "selectedCursorTheme",
                        "selectedWheelOverlayTheme",
                        "selectedWheelButtonTheme",
                        "selectedWheelPointerTheme",
                        "siteMuted"
                    ];
                    keysToRemove.forEach(key => localStorage.removeItem(key));

                    // ----- ریست سلکت‌ها به مقدار پیش‌فرض -----
                    const defaultSelects = {
                        "spin-time": "متوسط",
                        "mouse-click-sound": "صدای کلیک 5",
                        "spin-sound": "صدای 4",
                    };

                    document.querySelectorAll(".custom-select").forEach(sel => {
                        const display = sel.querySelector(".select-display");
                        if (!display) return;

                        if (sel.classList.contains("spin-time")) {
                            display.textContent = defaultSelects["spin-time"];
                        } else if (sel.classList.contains("mouse-click-sound")) {
                            display.textContent = defaultSelects["mouse-click-sound"];
                        } else if (sel.classList.contains("spin-sound")) {
                            display.textContent = defaultSelects["spin-sound"];
                        }
                    });

                    // ----- ریست چک‌باکس‌ها به false -----
                    document.querySelectorAll("input[type=checkbox]").forEach(cb => {
                        cb.checked = false;
                        cb.dispatchEvent(new Event("change"));
                    });

                    // ----- decision-sound فقط پیشفرض تیک خورده باشه -----
                    const decisionOptions = document.querySelectorAll(".decision-sound .option");
                    decisionOptions.forEach(opt => {
                        const input = opt.querySelector("input[type=checkbox]");
                        if (!input) return;
                        input.checked = opt.dataset.key === "پیشفرض";
                    });

                    if (typeof updateDecisionDisplay === "function") updateDecisionDisplay();

                    // ----- ریست ولوم -----
                    const volumeSlider = document.getElementById("siteVolumeSlider");
                    const sliderTooltip = document.getElementById("sliderTooltip");
                    if (volumeSlider) {
                        volumeSlider.value = 20;
                        volumeSlider.dispatchEvent(new Event("input"));
                    }
                    if (sliderTooltip) sliderTooltip.textContent = "20";
                    localStorage.setItem("siteVolume", "20");

                    // ----- ریست ظاهر -----
                    if (typeof removeOldThemeClass === "function") removeOldThemeClass();
                    if (typeof removeOldCursorClass === "function") removeOldCursorClass();

                    const allContainer = document.querySelector(".all");
                    if (allContainer) {
                        allContainer.classList.add("bg__theme-01");
                        allContainer.classList.add("cursor__theme-01");
                    }

                    const overlayEl = document.querySelector(".wheel-overlay");
                    if (overlayEl) overlayEl.className = "wheel-overlay wheel-overlay__theme-01";

                    const spinButtonEl = document.querySelector(".wheel-spin-button");
                    if (spinButtonEl) spinButtonEl.className = "wheel-spin-button wheel-button__theme-01";

                    const arrowEl = document.querySelector(".wheel-arrow");
                    if (arrowEl) arrowEl.className = "wheel-arrow wheel-arrow__theme-01";

                    // 🔸 ریست رنگ پس‌زمینه ساده
                    const defaultColorKey = "01";
                    localStorage.setItem(BG_COLOR_STORAGE_KEY, defaultColorKey);
                    if (typeof applyBackgroundColorTheme === "function") applyBackgroundColorTheme(defaultColorKey);
                    if (typeof updateSelectedBgColorVisual === "function") updateSelectedBgColorVisual(defaultColorKey);

                    // 🔸 ریست رنگ گردونه
                    const defaultWheelThemeKey = "color-01";
                    localStorage.setItem("selectedWheelTheme", defaultWheelThemeKey);
                    currentWheelColors = wheelThemes[defaultWheelThemeKey];
                    buildWheel();
                    document.querySelectorAll(".color-option").forEach(option => {
                        option.addEventListener("click", () => {
                            document.querySelectorAll(".color-option").forEach(o => o.classList.remove("selected"));
                            option.classList.add("selected");

                            const selectedKey = option.dataset.key;
                            localStorage.setItem("selectedWheelColor", selectedKey); // ✅ ذخیره انتخاب رنگ

                            currentWheelColors = getWheelColors(selectedKey);
                            buildWheel();
                        });
                    });


                    if (typeof highlightSelectedImage === "function") highlightSelectedImage("01");
                    if (typeof highlightSelectedCursor === "function") highlightSelectedCursor("01");
                    if (typeof updateSelectedVisual === "function") updateSelectedVisual("01");
                    if (typeof updateButtonSelectedVisual === "function") updateButtonSelectedVisual("01");
                    if (typeof updatePointerSelectedVisual === "function") updatePointerSelectedVisual("01");

                    if (typeof buildWheel === "function") buildWheel();

                    // ✅ پیغام موفقیت
                    Swal.fire({
                        title: "انجام شد!",
                        text: "تنظیمات با موفقیت ریست شدند.",
                        icon: "success",
                        confirmButtonText: "باشه",
                        background: '#121117',
                        color: '#ffffff',
                        confirmButtonColor: '#6D49FF',
                        customClass: {
                            popup: 'sweet-popup',
                            confirmButton: 'sweet-confirm-btn'
                        }
                    });
                }
            });
        });
    }


    const resetWheelSettingsBtn = document.querySelector(".wheel-settings__reset-wheel-settings");
    if (resetWheelSettingsBtn) {
        resetWheelSettingsBtn.addEventListener("click", () => {
            Swal.fire({
                title: "ریست تنظیمات ظاهری",
                html: '<div style="font-family:YekanBakh,sans-serif;font-size:18px;">آیا مطمئنی تنظیمات ظاهری به حالت اولیه برگرده؟</div>',
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "ریست کن",
                cancelButtonText: "لغو",
                background: "#121117",
                color: "#ffffff",
                confirmButtonColor: "#e74c3c",
                cancelButtonColor: "#6D49FF",
                customClass: {
                    popup: "sweet-popup",
                    confirmButton: "sweet-confirm-btn",
                    cancelButton: "sweet-cancel-btn2"
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    // 🔸 ریست تم پس‌زمینه
                    const defaultBGKey = "bg-01";
                    localStorage.setItem("selectedBackgroundTheme", `bg__theme-01`);
                    removeOldThemeClass();
                    const allContainer = document.querySelector(".all");
                    if (allContainer) {
                        allContainer.classList.add("bg__theme-01");
                    }

                    highlightSelectedImage("01");

                    // 🔸 ریست تم کرسر
                    const defaultCursorKey = "cursor-01";
                    localStorage.setItem("selectedCursorTheme", "cursor__theme-01");
                    removeOldCursorClass();
                    document.querySelector(".all").classList.add("cursor__theme-01");
                    highlightSelectedCursor("01");

                    // 🔸 ریست رنگ گردونه
                    const defaultWheelThemeKey = "color-01";
                    localStorage.setItem("selectedWheelTheme", defaultWheelThemeKey);
                    currentWheelColors = wheelThemes[defaultWheelThemeKey];
                    buildWheel();
                    document.querySelectorAll(".color-option").forEach(option => {
                        option.addEventListener("click", () => {
                            document.querySelectorAll(".color-option").forEach(o => o.classList.remove("selected"));
                            option.classList.add("selected");

                            const selectedKey = option.dataset.key;
                            localStorage.setItem("selectedWheelColor", selectedKey); // ✅ ذخیره انتخاب رنگ

                            currentWheelColors = getWheelColors(selectedKey);
                            buildWheel();
                        });
                    });


                    // 🔸 ریست رنگ پس‌زمینه ساده
                    const defaultColorKey = "01";
                    localStorage.setItem(BG_COLOR_STORAGE_KEY, defaultColorKey);
                    if (typeof applyBackgroundColorTheme === "function") applyBackgroundColorTheme(defaultColorKey);
                    if (typeof updateSelectedBgColorVisual === "function") updateSelectedBgColorVisual(defaultColorKey);

                    // 🔸 ریست بک‌گراند گردونه
                    const overlayEl = document.querySelector(".wheel-overlay");
                    if (overlayEl) {
                        overlayEl.classList.forEach(cls => {
                            if (cls.startsWith("wheel-overlay__theme-")) {
                                overlayEl.classList.remove(cls);
                            }
                        });
                        overlayEl.classList.add("wheel-overlay__theme-01");
                        localStorage.setItem("selectedWheelOverlayTheme", "01");
                        updateSelectedVisual("01");
                    }

                    // 🔸 ریست دکمه گردونه
                    const spinButtonEl = document.querySelector(".wheel-spin-button");
                    if (spinButtonEl) {
                        spinButtonEl.classList.forEach(cls => {
                            if (cls.startsWith("wheel-button__theme-")) {
                                spinButtonEl.classList.remove(cls);
                            }
                        });
                        spinButtonEl.classList.add("wheel-button__theme-01");
                        localStorage.setItem("selectedWheelButtonTheme", "01");
                        updateButtonSelectedVisual("01");
                    }

                    // 🔸 ریست پیکان گردونه
                    const arrowEl = document.querySelector(".wheel-arrow");
                    if (arrowEl) {
                        arrowEl.classList.forEach(cls => {
                            if (cls.startsWith("wheel-arrow__theme-")) {
                                arrowEl.classList.remove(cls);
                            }
                        });
                        arrowEl.classList.add("wheel-arrow__theme-01");
                        localStorage.setItem("selectedWheelPointerTheme", "01");
                        updatePointerSelectedVisual("01");
                    }

                    Swal.fire({
                        title: "ریست شد!",
                        text: "تنظیمات ظاهری با موفقیت به حالت اولیه بازگشت.",
                        icon: "success",
                        confirmButtonText: "باشه",
                        background: "#121117",
                        color: "#ffffff",
                        confirmButtonColor: "#6D49FF",
                        customClass: {
                            popup: "sweet-popup",
                            confirmButton: "sweet-confirm-btn"
                        }
                    });
                }
            });
        });
    }



// ✅ نوتیفیکیشن ساده بالای صفحه
    function showSimpleNotification(message) {
        const notif = document.createElement("div");

        notif.innerHTML = `
        <div class="notif-content">
            <img src="img/interface/notification.gif" alt="✔️" class="notif-icon" />
            <span class="notif-text">${fixMixedTextDirection(message)}</span>
        </div>
    `;

        Object.assign(notif.style, {
            textAlign: "center",
            position: "fixed",
            top: "15px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#ffffff",
            color: "#333",
            padding: "12px 15px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            fontFamily: "YekanBakh, sans-serif",
            fontSize: "16px",
            fontWeight: 700,
            zIndex: 9999,
            opacity: "0",
            transition: "opacity 0.4s ease, transform 0.4s ease",
            direction: "rtl",
            width: "100%",
            maxWidth: "300px",
            boxSizing: "border-box",
            pointerEvents: "none",
        });

        const style = document.createElement("style");
        style.textContent = `
        .notif-content {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            direction: rtl;
        }
        .notif-icon {
            width: 24px;
            height: 24px;
            animation: rotateNotif 1s infinite ease-in-out;
        }
        @keyframes rotateNotif {
            0% { transform: rotate(0deg); }
            50% { transform: rotate(10deg); }
            100% { transform: rotate(0deg); }
        }
        .ltr-part {
            direction: ltr;
            display: inline-block;
        }
    `;
        document.head.appendChild(style);

        document.querySelector("body").appendChild(notif);

        requestAnimationFrame(() => {
            notif.style.opacity = "1";
            notif.style.transform = "translateX(-50%) translateY(0)";
        });

        setTimeout(() => {
            notif.style.opacity = "0";
            notif.style.transform = "translateX(-50%) translateY(-10px)";
            setTimeout(() => notif.remove(), 500);
        }, 3000);
    }

    function fixMixedTextDirection(message) {
        return message.replace(/(\d+)/g, '<span class="ltr-part">$1</span>');
    }





    const autoFillBtn = document.querySelector(".auto-fill");
    if (autoFillBtn) {
        autoFillBtn.addEventListener("click", () => {
            const container = document.querySelector(".edit-wheel-items");
            const existingValues = Array.from(document.querySelectorAll(".edit-wheel-items__input"))
                .map(input => input.value.trim());

            const available = PREDEFINED_CHALLENGES.filter(item => !existingValues.includes(item));
            const bottomHeader = document.querySelectorAll(".edit-wheel-items__header")[1];

            if (available.length === 0) {
                showSimpleNotification("گزینه‌ها تموم شد");
                return;
            }

            // تعداد انتخاب‌ها: یا ۵ تا، یا کمتر
            const numberToAdd = Math.min(5, available.length);
            const selected = [];

            while (selected.length < numberToAdd) {
                const randIndex = Math.floor(Math.random() * available.length);
                selected.push(available.splice(randIndex, 1)[0]);
            }

            selected.forEach(text => {
                const newItem = createWheelItem("1", text);
                if (bottomHeader) {
                    bottomHeader.insertAdjacentElement("beforebegin", newItem);
                } else {
                    container.insertBefore(newItem, addItemBtn);
                }
            });

            saveWheelItems();

            showSimpleNotification(`${selected.length} گزینه تصادفی اضافه شد`);
        });
    }

    const bgColorOptions = document.querySelectorAll(".bg-color-option");
    const backgroundEl = document.querySelector(".background");
    const BG_COLOR_STORAGE_KEY = "selectedBackgroundColorTheme";

// اعمال کلاس رنگ
    function applyBackgroundColorTheme(key) {
        // حذف کلاس‌های قبلی مشابه
        backgroundEl.classList.forEach(cls => {
            if (cls.startsWith("bg__color-")) {
                backgroundEl.classList.remove(cls);
            }
        });

        // افزودن کلاس جدید
        backgroundEl.classList.add(`bg__color-${key}`);

        // ذخیره در localStorage
        localStorage.setItem(BG_COLOR_STORAGE_KEY, key);
    }

// مشخص کردن تصویر انتخاب شده
    function updateSelectedBgColorVisual(selectedKey) {
        bgColorOptions.forEach(option => {
            const key = option.dataset.key.replace("bg-color-", "");
            option.classList.toggle("selected", key === selectedKey);
        });
    }

// مدیریت کلیک روی گزینه‌ها
    bgColorOptions.forEach(option => {
        option.addEventListener("click", () => {
            const key = option.dataset.key.replace("bg-color-", "");
            applyBackgroundColorTheme(key);
            updateSelectedBgColorVisual(key);
        });
    });

// بارگذاری اولیه صفحه
    window.addEventListener("DOMContentLoaded", () => {
        const savedKey = localStorage.getItem(BG_COLOR_STORAGE_KEY);
        const defaultKey = "01"; // ✅ عکس اول به صورت پیش‌فرض

        const finalKey = savedKey || defaultKey;

        applyBackgroundColorTheme(finalKey);
        updateSelectedBgColorVisual(finalKey);
    });

    const copyItemsBtn = document.getElementById("copy-items");

    if (copyItemsBtn) {
        copyItemsBtn.addEventListener("click", async () => {
            const items = Array.from(document.querySelectorAll(".edit-wheel-items__input"));
            const values = items.map(input => input.value.trim()).filter(Boolean);

            if (values.length === 0) {
                showSimpleNotification("هیچ گزینه‌ای برای کپی وجود ندارد");
                return;
            }

            const textToCopy = values.join("\n");

            try {
                await navigator.clipboard.writeText(textToCopy);
                showSimpleNotification(`${values.length} گزینه در کلیپ‌بورد ذخیره شد`);
            } catch (err) {
                console.error("کپی در کلیپ‌بورد انجام نشد:", err);
                showSimpleNotification("خطا در کپی کردن گزینه‌ها");
            }
        });
    }


        loadSavedWheelColor();    // ← این خط رو اضافه کن

});
