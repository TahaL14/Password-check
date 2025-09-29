// Translations
const translations = {
    fr: {
        title: "Vérifiez la force de votre mot de passe",
        check: "Évaluer",
        score: "Score de robustesse:",
        time: "Temps estimé pour le cracker:",
        suggestions: "Suggestions de mots de passe plus forts:",
        "tips-title": "Conseils pour un mot de passe sécurisé",
        tip1: "Utilisez au moins 12 caractères",
        tip2: "Mélangez lettres majuscules et minuscules",
        tip3: "Incluez des chiffres et des caractères spéciaux",
        tip4: "Évitez les informations personnelles évidentes",
        tip5: "Utilisez un mot de passe unique pour chaque service",
        placeholder: "Entrez votre mot de passe"
    },
    en: {
        title: "Check your password strength",
        check: "Evaluate",
        score: "Strength score:",
        time: "Estimated time to crack:",
        suggestions: "Stronger password suggestions:",
        "tips-title": "Tips for a secure password",
        tip1: "Use at least 12 characters",
        tip2: "Mix uppercase and lowercase letters",
        tip3: "Include numbers and special characters",
        tip4: "Avoid obvious personal information",
        tip5: "Use a unique password for each service",
        placeholder: "Enter your password"
    }
};

// Current language
let currentLang = 'fr';

// Change language function
function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    document.getElementById('passwordInput').placeholder = translations[lang].placeholder;
}

// Toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('passwordInput');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

// Calculate password strength
function calculatePasswordStrength(password) {
    let score = 0;
    const suggestions = [];

    // Length check
    if (password.length < 8) {
        suggestions.push(currentLang === 'fr' ? 
            "Votre mot de passe est trop court" : 
            "Your password is too short");
    } else if (password.length < 12) {
        score += 2;
        suggestions.push(currentLang === 'fr' ? 
            "Essayez d'utiliser plus de 12 caractères" : 
            "Try using more than 12 characters");
    } else {
        score += 3;
    }

    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1;
    else suggestions.push(currentLang === 'fr' ? 
        "Ajoutez des lettres majuscules" : 
        "Add uppercase letters");

    if (/[a-z]/.test(password)) score += 1;
    else suggestions.push(currentLang === 'fr' ? 
        "Ajoutez des lettres minuscules" : 
        "Add lowercase letters");

    if (/[0-9]/.test(password)) score += 1;
    else suggestions.push(currentLang === 'fr' ? 
        "Ajoutez des chiffres" : 
        "Add numbers");

    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    else suggestions.push(currentLang === 'fr' ? 
        "Ajoutez des caractères spéciaux" : 
        "Add special characters");

    // Complexity check
    if (/(.)\1{2,}/.test(password)) {
        score -= 1;
        suggestions.push(currentLang === 'fr' ? 
            "Évitez les répétitions de caractères" : 
            "Avoid character repetitions");
    }

    return { score: Math.min(10, Math.max(0, score)), suggestions };
}

// Calculate crack time
function calculateCrackTime(password) {
    const strength = calculatePasswordStrength(password).score;
    const length = password.length;
    let charset = 0;
    if (/[A-Z]/.test(password)) charset += 26;
    if (/[a-z]/.test(password)) charset += 26;
    if (/[0-9]/.test(password)) charset += 10;
    if (/[^A-Za-z0-9]/.test(password)) charset += 33;

    const combinations = Math.pow(charset, length);
    const attemptsPerSecond = 1000000000; // 1 billion attempts per second
    const seconds = combinations / attemptsPerSecond;

    if (seconds < 1) return currentLang === 'fr' ? "Moins d'une seconde" : "Less than a second";
    if (seconds < 60) return currentLang === 'fr' ? `${Math.round(seconds)} secondes` : `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return currentLang === 'fr' ? `${Math.round(seconds/60)} minutes` : `${Math.round(seconds/60)} minutes`;
    if (seconds < 86400) return currentLang === 'fr' ? `${Math.round(seconds/3600)} heures` : `${Math.round(seconds/3600)} hours`;
    if (seconds < 31536000) return currentLang === 'fr' ? `${Math.round(seconds/86400)} jours` : `${Math.round(seconds/86400)} days`;
    return currentLang === 'fr' ? `${Math.round(seconds/31536000)} années` : `${Math.round(seconds/31536000)} years`;
}

// Generate password suggestions
function generateSuggestions(password) {
    const suggestions = [];
    const base = password.replace(/[^a-zA-Z]/g, '');
    
    if (base.length > 0) {
        suggestions.push(
            base + Math.floor(Math.random() * 1000) + "!",
            base.charAt(0).toUpperCase() + base.slice(1) + "@" + Math.floor(Math.random() * 100),
            base + "#" + Math.floor(Math.random() * 10000)
        );
    }
    
    return suggestions;
}

// Check password function
function checkPassword() {
    const password = document.getElementById('passwordInput').value;
    const results = document.getElementById('results');
    const scoreElement = document.getElementById('score');
    const crackTimeElement = document.getElementById('crackTime');
    const suggestionsList = document.getElementById('suggestionsList');

    if (!password) {
        alert(currentLang === 'fr' ? 
            "Veuillez entrer un mot de passe" : 
            "Please enter a password");
        return;
    }

    const { score } = calculatePasswordStrength(password);
    const crackTime = calculateCrackTime(password);

    // Display results
    results.classList.add('active');
    scoreElement.textContent = score + "/10";
    scoreElement.style.color = score < 4 ? 'var(--danger-color)' : 
                              score < 7 ? 'var(--warning-color)' : 
                              'var(--success-color)';
    
    crackTimeElement.textContent = crackTime;

    // Display suggestions
    suggestionsList.innerHTML = '';
    const generatedSuggestions = generateSuggestions(password);
    if (generatedSuggestions.length > 0) {
        generatedSuggestions.forEach(suggestion => {
            const li = document.createElement('li');
            li.textContent = suggestion;
            suggestionsList.appendChild(li);
        });
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage('fr');
}); 