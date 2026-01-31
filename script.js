// ==========================================
// 1. DATABASE: Put your real links here
// ==========================================
const database = {
    "Lessons PDF": {
        "Osteology": "files/osteology.pdf", // Example local file
        "Arthrology": "https://drive.google.com/link1", // Example Cloud link
        "General Chemistry": "https://drive.google.com/link2",
        "Organic Chemistry": "https://drive.google.com/link3",
        "Biochemistry": "https://drive.google.com/link4"
    },
    "Summaries": {
        "Myology": "https://drive.google.com/summary1",
        "SSH": "https://drive.google.com/summary2"
    }
    // You can add "Past Exams" and "Lessons Explaining" here too
};

// ==========================================
// 2. CONFIGURATION: Subjects & Chapters
// ==========================================
const subCategories = {
    "Anatomy": ["Osteology", "Arthrology", "Myology", "Angiology", "Neurology"],
    "Chemistry": ["General Chemistry", "Organic Chemistry"]
};

const commonSubjects = ["Anatomy", "Biochemistry", "Cytology", "Chemistry", "Biophysics", "Biostatistics"];
const sem1Extras = ["Histology", "Physiology"];
const sem2Extras = ["Embryology", "SSH"];

// ==========================================
// 3. STATE MANAGEMENT
// ==========================================
let currentSemester = 0;
let currentResourceType = "";

// ==========================================
// 4. CORE FUNCTIONS
// ==========================================

// Switch between screens
function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
        screen.classList.add('hidden');
    });
    // Show the target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('active');
    }
}

// Select Semester 1 or 2
function selectSemester(sem) {
    currentSemester = sem;
    document.getElementById('semester-title').innerText = "Semester " + sem;
    showScreen('screen-resources');
}

// Show the 4 main buttons (PDF, Explaining, etc.)
function showSubjects(resourceType) {
    currentResourceType = resourceType;
    document.getElementById('resource-title').innerText = resourceType;
    
    const grid = document.getElementById('subjects-grid');
    grid.innerHTML = ""; // Clear grid

    // Combine common subjects with semester-specific ones
    let list = [...commonSubjects];
    if (currentSemester === 1) list = list.concat(sem1Extras);
    if (currentSemester === 2) list = list.concat(sem2Extras);

    // Create buttons
    list.forEach(subject => {
        const btn = document.createElement('button');
        btn.className = 'btn-card';
        btn.innerText = subject;
        
        btn.onclick = function() {
            if (subCategories[subject]) {
                renderSubChapters(subject);
            } else {
                handleFinalAction(subject);
            }
        };
        grid.appendChild(btn);
    });

    showScreen('screen-subjects');
}

// Show Osteology, Arthrology etc. when Anatomy is clicked
function renderSubChapters(mainSubject) {
    const grid = document.getElementById('subjects-grid');
    grid.innerHTML = ""; // Clear grid
    document.getElementById('resource-title').innerText = mainSubject + " Chapters";

    subCategories[mainSubject].forEach(chapter => {
        const btn = document.createElement('button');
        btn.className = 'btn-card';
        btn.style.borderColor = "var(--accent-yellow)";
        btn.innerText = chapter;
        
        btn.onclick = function() {
            handleFinalAction(chapter);
        };
        grid.appendChild(btn);
    });

    // Add a specialized back button
    const backBtn = document.createElement('button');
    backBtn.className = 'btn-back';
    backBtn.style.marginTop = "20px";
    backBtn.innerText = "← Back to Subjects";
    backBtn.onclick = () => showSubjects(currentResourceType);
    grid.appendChild(backBtn);
}

// The action when a final button is clicked
function handleFinalAction(itemName) {
    // 1. Check if we have a custom link in our database
    if (database[currentResourceType] && database[currentResourceType][itemName]) {
        window.open(database[currentResourceType][itemName], '_blank');
    } 
    // 2. Otherwise, perform a smart Google Search
    else {
        const searchQuery = `medical ${itemName} ${currentResourceType} first year medicine`;
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, '_blank');
    }
}

// Results Calculator Placeholder
function openCalculator() {
    alert("KnowMed Calculator: Enter your grades to calculate your average. (Module coming soon!)");
}