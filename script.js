// 1.Modal-Funktion für Rezeptanzeige (Vollbild-Popup Fenster Modal /Modal
// Inspiration: MDN Web Docs (https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector)
const modal = document.getElementById('recipe-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const modalImage = document.getElementById('modal-image');
const closeModal = document.querySelector('.close-modal');

// Rezepte und ihre Inhalte
const recipes = {
    misoreis: {
        title: "Gemüse Misoreis",
        content: `
            <strong>Zutaten:</strong> Reis, Miso-Paste, Gemüse (z.B. Karotten, Zucchini, Paprika).<br>
            <strong>Zubereitung:</strong> <br/>
            1. Reis gründlich waschen und nach Packungsanweisung kochen.<br>
            2. Gemüse klein schneiden und in einer Pfanne mit etwas Öl anbraten.<br>
            3. Miso-Paste in etwas warmem Wasser auflösen und zum Gemüse geben.<br>
            4. Gekochten Reis unter das Gemüse mischen und servieren.
        `,
        image: "images/misoreis.jpeg"
    },
    cocossoja: {
        title: "Cocossoja-Curry",
        content: `
            <strong>Zutaten:</strong> Kokosmilch, Kichererbsen, Currypaste.<br>
            <strong>Zubereitung:</strong> <br/>
            1. Currypaste in einer Pfanne anbraten, bis sie duftet.<br>
            2. Kokosmilch hinzufügen und zum Köcheln bringen.<br>
            3. Kichererbsen und Gemüse hinzufügen und alles 10 Minuten köcheln lassen.
        `,
        image: "images/cocoscurry.png" // Bild hinzufügen
    },
    couscous: {
        title: "Soja Couscous",
        content: `
            <strong>Zutaten:</strong> Couscous, Sojagranulat, Gemüsebrühe.<br>
            <strong>Zubereitung:</strong> <br/>
            1. Couscous mit heißer Gemüsebrühe übergießen und 5 Minuten ziehen lassen.<br>
            2. Sojagranulat in Wasser einweichen, ausdrücken und anbraten.<br>
            3. Beides mischen und mit frischen Kräutern servieren.
        `,
        image: "images/couscouslal.png"
    }
};

// Öffne Modal
document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', function () {
        const recipeKey = this.getAttribute('data-recipe'); // Hole den Rezept-Key aus data-recipe
        const recipe = recipes[recipeKey]; // Rezeptdaten aus dem Objekt
        if (recipe) {
            modalTitle.textContent = recipe.title; // Setze den Titel
            modalContent.innerHTML = recipe.content; // Setze die Inhalte als HTML
            modalImage.src = recipe.image; // Setze den Bildpfad
            modalImage.alt = `Bild von ${recipe.title}`; // Setze den Alt-Text für Barrierefreiheit
            modal.style.display = 'flex'; // Zeige das Modal an
        }
    });
});

// Schließe Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none'; // Verstecke das Modal
});

// Schließe Modal bei Klick außerhalb
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'; // Verstecke das Modal
    }
});


//2. Bonus-Rezept-Speicher-Funktion (## Verwendete Technologien
// - [Bootstrap](https://getbootstrap.com/) für das Layout, die Gestaltung und das Modal.)
// JavaScript für das Speichern des Rezepts Localstorage
document.getElementById('saveRecipe').addEventListener('click', function () {
    // Rezeptdaten
    const recipe = {
        title: "Avocado-Toast",
        ingredients: [
            "1 Scheibe Vollkornbrot",
            "1 reife Avocado",
            "1 EL Zitronensaft",
            "1 Prise Salz und Pfeffer",
            "Optional: Chili-Flocken oder frische Kräuter"
        ],
        instructions: "Brot toasten, Avocado mit einer Gabel zerdrücken und mit Zitronensaft, Salz und Pfeffer abschmecken. Auf das Brot streichen und mit den gewünschten Toppings garnieren. Guten Appetit!"
    };

    // Rezept im LocalStorage speichern
    localStorage.setItem('savedRecipe', JSON.stringify(recipe));

    // Benachrichtigung anzeigen
    alert('Rezept wurde gespeichert!');
});

//3. Tabelle Modal (Bootstrap)
// JavaScript für das Modal
// - [Bootstrap](https://getbootstrap.com/) für das Layout, die Gestaltung und das Modal.)
document.addEventListener('DOMContentLoaded', function () {
    const tableRows = document.querySelectorAll('table tbody tr');
    const modalTitle = document.getElementById('modalOfferTitle');
    const modalDescription = document.getElementById('modalOfferDescription');

    tableRows.forEach(row => {
        row.addEventListener('click', function () {
            const name = row.cells[0].textContent;
            const offer = row.cells[1].textContent;
            const description = row.cells[2].textContent;

            // Details ins Modal laden
            modalTitle.textContent = `${name} - ${offer}`;
            modalDescription.textContent = description;
        });
    });
});

//4. Kontaktformular (Funktionalität solltet noch verbessert werden)
// Inspiration: MDN Web Docs (https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation)
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const charCount = document.getElementById('charCount');
    const messageInput = document.getElementById('message');
    const MAX_CHARS = 200;

    // Initial den Zeichenzähler setzen
    updateCharCount();

    // Funktion zum Aktualisieren des Zeichenzählers
    function updateCharCount() {
        const remainingChars = MAX_CHARS - messageInput.value.length;
        charCount.textContent = remainingChars;
    }

    // Zeichenzähler bei jeder Eingabe aktualisieren
    messageInput.addEventListener('input', updateCharCount);

    // Formularvalidierung und Absenden
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        if (form.checkValidity()) {
            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Erfolgsmeldung anzeigen
                    successMessage.style.display = 'block';

                    // Alle Formularfelder leeren
                    form.reset();

                    // Zeichenzähler zurücksetzen
                    updateCharCount();

                    // Validierungsklasse entfernen
                    form.classList.remove('was-validated');

                    // Erfolgsmeldung nach 5 Sekunden ausblenden
                    setTimeout(() => {
                        successMessage.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Server-Fehler');
                }
            } catch (error) {
                alert('Es gab ein Problem beim Senden der Nachricht. Bitte versuchen Sie es später erneut.');
            }
        } else {
            form.classList.add('was-validated');
        }
    });
});

