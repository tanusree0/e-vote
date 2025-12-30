let isLoginMode = true;

// 1. Toggle between Login and Signup
function toggleAuth() {
    isLoginMode = !isLoginMode;
    const title = document.getElementById('auth-title');
    const signupFields = document.getElementById('signup-fields');
    const mainBtn = document.getElementById('main-btn');
    const toggleText = document.getElementById('toggle-text');

    title.innerText = isLoginMode ? "Voter Login" : "Voter Registration";
    signupFields.style.display = isLoginMode ? "none" : "block";
    mainBtn.innerText = isLoginMode ? "Enter Voting Booth" : "Register as Voter";
    toggleText.innerText = isLoginMode ? "New Voter? Register here." : "Already have an account? Login.";
}

// 2. Handle Login/Signup
async function handleAuth() {
    const aadhaar = document.getElementById('aadhaar').value;
    const password = document.getElementById('pass').value;
    const name = document.getElementById('name')?.value;
    const age = document.getElementById('age')?.value;

    const url = isLoginMode ? '/api/auth/login' : '/api/auth/signup';
    const body = isLoginMode ? { aadhaar, password } : { name, aadhaar, age, password };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        if (response.ok) {
            if (isLoginMode) {
                // Success: Show Voting Booth
                document.getElementById('auth-box').style.display = 'none';
                document.getElementById('booth').style.display = 'block';
                loadCandidates();
            } else {
                alert("Registration Successful! Please Login.");
                toggleAuth();
            }
        } else {
            alert(data.error || "Something went wrong");
        }
    } catch (err) {
        console.error("Auth Error:", err);
    }
}

// 3. Load Candidates from Backend
async function loadCandidates() {
    const listDiv = document.getElementById('candidate-list');
    try {
        const response = await fetch('/api/vote/candidates');
        const candidates = await response.json();

        listDiv.innerHTML = candidates.map(c => `
            <div class="card">
                <div>
                    <strong>${c.name}</strong><br>
                    <small>${c.party}</small>
                </div>
                <button onclick="castVote('${c._id}')">VOTE</button>
            </div>
        `).join('');
    } catch (err) {
        listDiv.innerHTML = "Error loading candidates.";
    }
}

// 4. Cast Vote with Atomic Transaction
async function castVote(candidateId) {
    if (!confirm("Are you sure? This action cannot be undone.")) return;

    try {
        const response = await fetch('/api/vote/cast', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ candidateId })
        });

        const data = await response.json();

        if (response.ok) {
            document.getElementById('booth').style.display = 'none';
            document.getElementById('success-panel').style.display = 'block';
            document.getElementById('ref-id').innerText = data.slip;
        } else {
            alert(data.error);
        }
    } catch (err) {
        alert("Transaction failed. Check connection.");
    }
}