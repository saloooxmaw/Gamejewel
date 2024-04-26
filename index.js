document.addEventListener('DOMContentLoaded', function() {
    const totalCells = 25;
    const totalJewels = 21;
    const totalBombs = 4;

    const getRandomIndex = (max) => Math.floor(Math.random() * max);

    const revealJewelOrBomb = () => {
        const randomIndex = getRandomIndex(totalCells);
        const cells = document.getElementsByClassName('cell');
        const randomCell = cells[randomIndex];

        if (randomCell.classList.contains('jewel')) {
            randomCell.innerHTML = '💎';
        } else if (randomCell.classList.contains('bomb')) {
            showMessage('انت خسرت!');
            disableRevealButton();
        }
    };

    const revealButton = document.getElementById('reveal_Jewel');
    revealButton.addEventListener('click', () => revealJewelOrBomb());

    const restartButton = document.getElementById('restart_Game');
    restartButton.addEventListener('click', () => {
        window.location.reload(false); // إعادة تحميل الصفحة بدون تحميل الملفات المخزنة مؤقتًا
    });

    const gameGrid = document.getElementById('gameGrid');

    // إنشاء مصفوفة لتمثيل حالة كل خلية في الشبكة (جوهرة أو قنبلة)
    const cellStates = [];
    for (let i = 0; i < totalCells; i++) {
        if (i < totalJewels) {
            cellStates.push('jewel'); // جوهرة
        } else if (i < totalJewels + totalBombs) {
            cellStates.push('bomb'); // قنبلة
        } else {
            cellStates.push('empty'); // خلية فارغة
        }
    }

    // تخليط قيم الخلايا لتوزيع الجواهر والقنابل عشوائيًا
    for (let i = totalCells - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cellStates[i], cellStates[j]] = [cellStates[j], cellStates[i]];
    }

    // إنشاء خلايا الشبكة وتعيين حالة كل خلية وفقًا للمصفوفة المُختلطة
    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell', cellStates[i]);
        gameGrid.appendChild(cell);
    }

    function showMessage(message) {
        const messageElement = document.getElementById('message');
        messageElement.textContent = message;
        messageElement.style.display = 'block';
        if (message === 'انت خسرت!') {
            revealButton.style.cursor = 'default';
        }
    }

    function disableRevealButton() {
        revealButton.disabled = true;
    }
});
