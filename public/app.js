// Outer Stellar Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    loadAllData();
});

// API Helper Functions
async function apiRequest(url, method = 'GET', data = null) {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(url, options);
        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        return null;
    }
}

// Software Development Functions
async function addProject() {
    const name = document.getElementById('project-name').value.trim();
    const description = document.getElementById('project-description').value.trim();
    
    if (!name) {
        alert('Bitte geben Sie einen Projektnamen ein.');
        return;
    }
    
    const result = await apiRequest('/api/projects', 'POST', { name, description });
    if (result) {
        document.getElementById('project-name').value = '';
        document.getElementById('project-description').value = '';
        loadProjects();
    }
}

async function loadProjects() {
    const projects = await apiRequest('/api/projects');
    const container = document.getElementById('projects-container');
    
    if (projects && projects.length > 0) {
        container.innerHTML = projects.map(project => `
            <div class="data-item">
                <h4>🚀 ${project.name}</h4>
                <p>${project.description || 'Keine Beschreibung verfügbar'}</p>
                <div class="meta">Status: ${project.status} | Erstellt: ${new Date(project.created_at).toLocaleDateString('de-DE')}</div>
            </div>
        `).join('');
    } else {
        container.innerHTML = '<p>Keine Projekte vorhanden. Fügen Sie Ihr erstes Projekt hinzu!</p>';
    }
}

// Database/Astronomy Functions
async function addStellarObject() {
    const name = document.getElementById('object-name').value.trim();
    const type = document.getElementById('object-type').value;
    const constellation = document.getElementById('constellation').value.trim();
    const magnitude = parseFloat(document.getElementById('magnitude').value) || null;
    const coordinates = document.getElementById('coordinates').value.trim();
    const notes = document.getElementById('object-notes').value.trim();
    
    if (!name) {
        alert('Bitte geben Sie einen Objektnamen ein.');
        return;
    }
    
    const result = await apiRequest('/api/stellar-objects', 'POST', {
        name, type, constellation, magnitude, coordinates, notes
    });
    
    if (result) {
        document.getElementById('object-name').value = '';
        document.getElementById('object-type').value = '';
        document.getElementById('constellation').value = '';
        document.getElementById('magnitude').value = '';
        document.getElementById('coordinates').value = '';
        document.getElementById('object-notes').value = '';
        loadStellarObjects();
    }
}

async function loadStellarObjects() {
    const objects = await apiRequest('/api/stellar-objects');
    const container = document.getElementById('objects-container');
    
    if (objects && objects.length > 0) {
        container.innerHTML = objects.map(obj => {
            const typeEmoji = getTypeEmoji(obj.type);
            const magnitudeText = obj.magnitude !== null ? `mag ${obj.magnitude}` : 'Helligkeit unbekannt';
            
            return `
                <div class="data-item">
                    <h4>${typeEmoji} ${obj.name}</h4>
                    <p><strong>Typ:</strong> ${obj.type || 'Unbekannt'}</p>
                    ${obj.constellation ? `<p><strong>Sternbild:</strong> ${obj.constellation}</p>` : ''}
                    <p><strong>Helligkeit:</strong> ${magnitudeText}</p>
                    ${obj.coordinates ? `<p><strong>Koordinaten:</strong> ${obj.coordinates}</p>` : ''}
                    ${obj.notes ? `<p><strong>Notizen:</strong> ${obj.notes}</p>` : ''}
                    <div class="meta">Hinzugefügt: ${new Date(obj.created_at).toLocaleDateString('de-DE')}</div>
                </div>
            `;
        }).join('');
    } else {
        container.innerHTML = '<p>Keine astronomischen Objekte vorhanden. Fügen Sie Ihr erstes Objekt hinzu!</p>';
    }
}

function getTypeEmoji(type) {
    const emojis = {
        'star': '⭐',
        'planet': '🪐',
        'galaxy': '🌌',
        'nebula': '☁️',
        'cluster': '✨'
    };
    return emojis[type] || '🌟';
}

// Creativity Functions
async function addCreativeIdea() {
    const title = document.getElementById('idea-title').value.trim();
    const description = document.getElementById('idea-description').value.trim();
    const category = document.getElementById('idea-category').value;
    const inspiration = document.getElementById('idea-inspiration').value.trim();
    
    if (!title) {
        alert('Bitte geben Sie einen Titel für die Idee ein.');
        return;
    }
    
    const result = await apiRequest('/api/creative-ideas', 'POST', {
        title, description, category, inspiration
    });
    
    if (result) {
        document.getElementById('idea-title').value = '';
        document.getElementById('idea-description').value = '';
        document.getElementById('idea-category').value = '';
        document.getElementById('idea-inspiration').value = '';
        loadCreativeIdeas();
    }
}

async function loadCreativeIdeas() {
    const ideas = await apiRequest('/api/creative-ideas');
    const container = document.getElementById('ideas-container');
    
    if (ideas && ideas.length > 0) {
        container.innerHTML = ideas.map(idea => {
            const categoryEmoji = getCategoryEmoji(idea.category);
            
            return `
                <div class="data-item">
                    <h4>${categoryEmoji} ${idea.title}</h4>
                    <p>${idea.description || 'Keine Beschreibung verfügbar'}</p>
                    ${idea.category ? `<p><strong>Kategorie:</strong> ${idea.category}</p>` : ''}
                    ${idea.inspiration ? `<p><strong>Inspiration:</strong> ${idea.inspiration}</p>` : ''}
                    <div class="meta">Erstellt: ${new Date(idea.created_at).toLocaleDateString('de-DE')}</div>
                </div>
            `;
        }).join('');
    } else {
        container.innerHTML = '<p>Keine kreativen Ideen vorhanden. Lassen Sie Ihrer Kreativität freien Lauf!</p>';
    }
}

function getCategoryEmoji(category) {
    const emojis = {
        'visualization': '📊',
        'animation': '🎬',
        'interactive': '🖱️',
        'art': '🎨',
        'story': '📚'
    };
    return emojis[category] || '💡';
}

// Load all data on page load
async function loadAllData() {
    await Promise.all([
        loadProjects(),
        loadStellarObjects(),
        loadCreativeIdeas()
    ]);
}

// Add some sample data on first load
async function initializeSampleData() {
    // Check if we have any data
    const projects = await apiRequest('/api/projects');
    if (!projects || projects.length === 0) {
        // Add sample project
        await apiRequest('/api/projects', 'POST', {
            name: 'Outer Stellar Interface',
            description: 'Benutzeroberfläche für die Verwaltung von Weltraumprojekten'
        });
        
        // Add sample stellar object
        await apiRequest('/api/stellar-objects', 'POST', {
            name: 'Polaris',
            type: 'star',
            constellation: 'Ursa Minor',
            magnitude: 1.97,
            coordinates: 'RA 02h 31m 49s, Dec +89° 15\' 51"',
            notes: 'Der Polarstern - aktueller Nordstern der Erde'
        });
        
        // Add sample creative idea
        await apiRequest('/api/creative-ideas', 'POST', {
            title: 'Interaktive Sternenkarte',
            description: 'Eine dynamische Visualisierung des Nachthimmels mit Zoom- und Filterfunktionen',
            category: 'interactive',
            inspiration: 'Die Schönheit des Nachthimmels für alle zugänglich machen'
        });
        
        // Reload data
        loadAllData();
    }
}

// Initialize sample data after a short delay
setTimeout(initializeSampleData, 1000);