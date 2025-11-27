const firstName = "Karen".toUpperCase();
const lastName = "Richards".toUpperCase();

const elemFirstNameID = "first-name-id";
const elemLastNameID = "last-name-id";

function displayUserNames() {
    const firstNameElement = document.getElementById('first-name-id');
    const lastNameElement = document.getElementById('last-name-id');

    if (firstNameElement) {
        firstNameElement.textContent = firstName;
    } 

    else {
        console.error("ID 'first-name-id' not found.");
    }
    
    if (lastNameElement) {
        lastNameElement.textContent = lastName;
    } else {
        console.error("ID 'last-name-id' not found.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayUserNames();
});

//-------------------------------------------------------------------------------------------


// Дані
const allSkillsData = [
    { name: "Adobe Photoshop", value: 70 },
    { name: "Adobe Illustrator", value: 85 },
    { name: "Adobe InDesign", value: 85 }, 
    
    { name: "Microsoft Word", value: 75 },
    { name: "Microsoft PowerPoint", value: 60 },
    { name: "HTML / CSS", value: 95 }
];

const CONTAINER_ID = "skills-container";

function renderThreeColumnStructure(data, containerId) {
    const container = document.getElementById(containerId);

    if (!container) {
        console.error(`ID "${containerId}" not found.`);
        return;
    }

    // A. Очищення контейнера
    container.innerHTML = '';

    // B. Функція-помічник для генерації одного <ul>
    const generateList = (listData) => {
        let html = '<ul>';
        listData.forEach(skill => {
            html += `
                <li>${skill.name}</li>
                <progress class="skill-bar" value="${skill.value}" max="100"></progress>
            `;
        });
        html += '</ul>';
        return html;
    };
    
    // C. Розділення масиву на дві частини (по 3 навички)
    const totalItems = data.length;
    const half = Math.ceil(totalItems / 2); // 6 / 2 = 3

    const firstContentColumn = data.slice(0, half);
    const secondContentColumn = data.slice(half);

    // D. Генерація фінальної розмітки (три <ul>)
    
    // 1. Порожня колонка (як відступ)
    let finalHtml = '<ul></ul>'; 
    
    // 2. Перша колонка з контентом
    finalHtml += generateList(firstContentColumn); 
    
    // 3. Друга колонка з контентом
    finalHtml += generateList(secondContentColumn); 

    // E. Вставлення розмітки
    container.innerHTML = finalHtml;
}

document.addEventListener('DOMContentLoaded', () => {
    renderThreeColumnStructure(allSkillsData, CONTAINER_ID);
});
//-------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.toggle-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const header = button.closest('.job-header');
            
            if (header) {
                const contentBody = header.nextElementSibling;
                
                if (contentBody && contentBody.classList.contains('timeline-content-body')) {
                    contentBody.classList.toggle('hidden');                    
                    button.classList.toggle('rotated');
                }
            }
        });
    });
});