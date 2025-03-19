document.addEventListener("DOMContentLoaded", function() {
    console.log("Portfolio is ready!");
    
    // Includes
    include("../base/header.html", "header");
    include("../base/footer.html", "footer");
    include("../base/work-in-progress-card.html", "work-card");

    
    // Smooth scrolling effect
    document.querySelectorAll('a.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    document.querySelector("form").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let name = document.getElementById("nameSender").value;
        let email = document.getElementById("exampleInputEmail").value;
        let message = document.getElementById("messageInput").value;

        // Light security check, obfuscation - not having backend to do so - btw it doesn't worth it to stole it
        let user = "alceblockdev";
        let domain = "gmail.com";
        let recipient = user + "@" + domain;
            
        let mailtoLink = `mailto:${recipient}?subject=Messaggio da ${name}&body=${encodeURIComponent(message)}%0A%0ADa: ${name} (${email})`;
        
        window.location.href = mailtoLink;

        // Fast way to clean form after submit pressed
        setTimeout(() => {
            document.querySelector("form").reset();
        }, 500);
    });
});

// Simulate DJango 'include' feature
function include(file, elementId) {
    // Fetch to upload HTML file
    fetch(file)
        .then(response => response.text())  // Get content from file
        .then(data => {
            // Insert content in selected div
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => {
            console.error("Error loading file:", error);
        });
}
