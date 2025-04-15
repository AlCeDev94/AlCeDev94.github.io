document.addEventListener("DOMContentLoaded", function() {
    console.log("Portfolio is ready!");
    
    // Includes
    include("../header.html", "header");
    include("../footer.html", "footer");
    include("../work-in-progress-card.html", "work-card");

    
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
    
    // emergency fix
    /*document.querySelector("form").addEventListener("submit", function(event) {
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
    });*/
});

// Inspired by DJango 'include' feature
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
// 'Include' version to catch specific HTML elements by their class and assign them by their id
function includeElement(file, elementClass, targetId) {
    console.log("file >> ",file)
    fetch(file)
        .then(response => response.text())  
        .then(data => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(data, "text/html");

            let elementToInclude = doc.querySelector(elementClass);

            if (elementToInclude) {
                // Rimuove eventuali script dal contenuto incluso
                let clonedContent = elementToInclude.cloneNode(true);
                clonedContent.querySelectorAll("script").forEach(script => script.remove());

                document.getElementById(targetId).innerHTML = clonedContent.innerHTML;
            } else {
                console.error("Elemento with class '" + elementClass + "' not found in " + file);
            }
        })
        .catch(error => {
            console.error("Errore nel caricamento del file:", error);
        });
}

/* Function to add class to selected element when scrolling over a target element */
function scrollHighlight(targetId,affectedId,classSelected,whereToUse) { // new - whereToUse to handle DEFAULT when on top - not extremely needed but helps to deal with small sections on top
    /* IF is needed to check that imported ids have already been uploaded, avoiding to use a loop or unprecise setTimeout */
    if (document.getElementById(targetId) && document.getElementById(affectedId)) {
        const targetSection = document.getElementById(targetId);
        const affectedSection = document.getElementById(affectedId);

        
        function checkScroll() {
            const rect = targetSection.getBoundingClientRect();
            const scrollTop = window.scrollY; // new

            if (scrollTop >= 0 && scrollTop <= 4) { // new - select default based on where to use it -- to much hardcoded, to improve
                resetAllButtons(classSelected);
                if (whereToUse === "sidebar"){
                    document.getElementById("left-home-general").classList.add(classSelected);
                    return;
                }
                if (whereToUse === "projects"){
                    document.getElementById("pj1").classList.add(classSelected);
                    return;
                }
                if (whereToUse === "certifications"){
                    document.getElementById("cert1").classList.add(classSelected);
                    return;
                }
            }

            if (rect.top <= window.innerHeight * 0.55 && rect.bottom >= window.innerHeight * 0.55) {
                if (!affectedSection.className.includes(classSelected)) {
                    resetAllButtons(classSelected); // new
                    affectedSection.className += " " + classSelected;
                }
            } else {
                affectedSection.classList.remove(classSelected);
            }
        }
        
        function resetAllButtons(classSelected) { // new - select default based on where to use it -- to much hardcoded, to improve
            if (whereToUse === "sidebar"){
                document.querySelectorAll(".btn-sidebar").forEach(el => {
                    const parentLink = el.closest("a");
                    parentLink.classList.remove(classSelected);
                });
            }
            if (whereToUse === "projects"){
                document.querySelectorAll(".project-cards").forEach(el => {
                    el.classList.remove(classSelected);
                });
            }
            if (whereToUse === "certifications"){
                document.querySelectorAll(".project-cards").forEach(el => {
                    el.classList.remove(classSelected);
                });
            }
        }
    
        window.addEventListener("scroll", checkScroll);

    } else {
        setTimeout(()=>{  scrollHighlight(targetId,affectedId,classSelected,whereToUse)  },100)
    }
}


/* Customize Cursor */
// Creation element to be used for effect
const cursorEffect = document.createElement("div");
document.body.appendChild(cursorEffect);

// Add style to element
Object.assign(cursorEffect.style, {
    position: "fixed",
    //width: "650px",
    //height: "650px",
    width: "45em",
    height: "45em",
    background: "radial-gradient(circle, rgba(33, 65, 207, 0.12) 10%, rgba(44, 57, 89, 0) 80%)",
    borderRadius: "50%",
    pointerEvents: "none",
    transform: "translate(-50%, -50%)",
    transition: "transform 0.1s ease-out",
});

// Follow cursor
document.addEventListener("mousemove", (e) => {
    cursorEffect.style.left = `${e.clientX}px`;
    cursorEffect.style.top = `${e.clientY}px`;
});



/* Testing utilities */
function testCalling(){
    console.log("It has been called")
}

// emergency fix
function listenSubmitEmain() {
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
}

