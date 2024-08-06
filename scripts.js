let score = parseInt(localStorage.getItem('score')) || 0;
let clickValue = 1;
let upgradeCost = 1;
const hamster = document.getElementById('hamster');
const scoreDisplay = document.getElementById('score');
const upgradeButton = document.getElementById('upgrade');
const referralRanking = document.getElementById('referral-ranking');
const menuModal = document.getElementById('menu-modal');
const nameDisplay = document.getElementById('name-display');
const nameInput = document.getElementById('name-input');
const setNameButton = document.getElementById('set-name-button');
let name = localStorage.getItem('name') || '';

if (name) {
    nameDisplay.textContent = `Имя: ${name}`;
    nameInput.style.display = 'none';
    setNameButton.style.display = 'none';
}

setNameButton.addEventListener('click', () => {
    name = nameInput.value.trim();
    if (name) {
        nameDisplay.textContent = `Имя: ${name}`;
        localStorage.setItem('name', name);
        nameInput.style.display = 'none';
        setNameButton.style.display = 'none';
    }
});

// Update the displayed score
scoreDisplay.textContent = score;

hamster.addEventListener('click', (event) => {
    event.preventDefault();
    score += clickValue;
    scoreDisplay.textContent = score;
    localStorage.setItem('score', score);
});

hamster.addEventListener('dblclick', (event) => {
    event.preventDefault(); // Предотвращаем увеличение очков при двойном клике
});

upgradeButton.addEventListener('click', () => {
    if (score >= upgradeCost) {
        score -= upgradeCost;
        clickValue *= 2;
        upgradeCost *= 10;
        scoreDisplay.textContent = score;
        localStorage.setItem('score', score);
        upgradeButton.textContent = `Upgrade (Cost: ${upgradeCost})`;
    }
});

// Function to update referral rankings
function updateReferralRanking() {
    const rankings = [
        { name: 'User1', referrals: 5 },
        { name: 'User2', referrals: 3 },
        { name: 'User3', referrals: 2 },
        // Add more user rankings as needed
    ];

    referralRanking.innerHTML = '<h3>Referral Rankings</h3>';
    rankings.forEach(rank => {
        const div = document.createElement('div');
        div.classList.add('ranking-item');
        div.innerHTML = `<span>${rank.name}</span><span>${rank.referrals}</span>`;
        referralRanking.appendChild(div);
    });
}

// Initial call to update referral rankings
updateReferralRanking();

// Function to show different sections based on footer button clicked
function showSection(section) {
    if (section === 'menu') {
        menuModal.style.display = 'block';
    } else {
        alert(`You clicked on the ${section} button.`);
       }
   }

   // Function to close the modal
   function closeModal() {
       menuModal.style.display = 'none';
   }

   // Close the modal if the user clicks anywhere outside of the modal content
   window.onclick = function(event) {
       if (event.target === menuModal) {
           closeModal();
       }
   }
