document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.getElementById("scrollToTop");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) { // Показываем кнопку, если прокручено больше 300px
            scrollToTopButton.classList.add("show");
        } else {
            scrollToTopButton.classList.remove("show");
        }
    });

    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
document.getElementById('applyFilters').addEventListener('click', function() {
    let bankCard = document.createElement('div');
    bankCard.className = 'bank-card show';
    bankCard.innerText = 'Пример банка (тестовый блок)';
    
    let list = document.getElementById('filteredBanksList');
    list.innerHTML = '';
    list.appendChild(bankCard);
});
/* АНИМАЦИЯ ПРИ ВХОДЕ НА САЙТ!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
document.addEventListener("DOMContentLoaded", function() {
    let elements = document.querySelectorAll(".fade-in");
    elements.forEach(el => el.classList.add("show"));
});

/* АНИМАЦИЯ КАРТОЧЕК ТИПО 3D !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
document.querySelectorAll(".bank-card").forEach(card => {
  card.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 45;
    const y = (e.clientY - top - height / 2) / 45;
    card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
});
/* ЗАСТЫВШАЯ ПЛАШКА !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */




/* КНОПОЧКА)))) СКРОЛА ДО ПЛАШКИ СРАВНЕНИЯ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
document.getElementById("scrollToFilter").addEventListener("click", function () {
    const filterSection = document.querySelector(".filter-section"); // Найти блок с фильтрами
    if (filterSection) {
        filterSection.scrollIntoView({ behavior: "smooth" }); // Плавная прокрутка
    }
});

/* FAQ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
document.addEventListener("DOMContentLoaded", function() {
    let questions = document.querySelectorAll(".faq-question");

    if (questions.length === 0) {
        console.error("FAQ questions not found.");
        return;
    }

    questions.forEach(button => {
        button.addEventListener("click", function () {
            let answer = this.nextElementSibling; // Получаем следующий элемент (ответ)

            // Проверяем текущий статус отображения ответа
            if (answer.style.display === "block") {
                answer.style.display = "none"; // Если ответ открыт, скрываем его
            } else {
                answer.style.display = "block"; // Если ответ скрыт, показываем его
            }
        });
    });
});



