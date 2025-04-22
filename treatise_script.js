document.addEventListener('DOMContentLoaded', () => {
    // Expand/Collapse Functionality
    const allToggles = document.querySelectorAll('.expand-toggle'); // Define allToggles

    if (allToggles.length > 0) {
        allToggles.forEach(toggle => { // Use allToggles
            toggle.addEventListener('click', () => {
                const content = toggle.nextElementSibling;
                // Check if the content element exists and has the expand-content class
                if (content && content.classList.contains('expand-content')) {

                    // Simply toggle the .expanded class on the content div
                    content.classList.toggle('expanded');

                    // Toggle ARIA attribute and button text based on the NEW state
                    const isNowExpanded = content.classList.contains('expanded');
                    toggle.setAttribute('aria-expanded', isNowExpanded);

                    if (isNowExpanded) {
                        // Content is now expanded, change text to [-]
                        if (toggle.textContent.includes('[+]')) {
                            toggle.textContent = toggle.textContent.replace('[+]', '[-]');
                        }
                    } else {
                        // Content is now collapsed, change text to [+]
                        if (toggle.textContent.includes('[-]')) {
                            toggle.textContent = toggle.textContent.replace('[-]', '[+]');
                        }
                    }

                } else {
                    console.error("Could not find the .expand-content element immediately following the toggle button:", toggle);
                }
            });
        });
    } else {
        console.warn("No elements found with the class '.expand-toggle'. Expand/collapse will not work.");
    }

    // --- Other script functionalities remain the same ---

    // Glossary Link Functionality (Placeholder)
    const glossaryLinks = document.querySelectorAll('.glossary-link');
    if (glossaryLinks.length > 0) {
        glossaryLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const term = link.getAttribute('data-term');
                alert(`Glossary link for "${term}" clicked. Implement display logic here.`);
            });
        });
    }

    // Toggle Commentary Placeholder
    const commentaryToggle = document.getElementById('toggle-commentary');
    if (commentaryToggle) {
        commentaryToggle.addEventListener('change', () => {
            if (commentaryToggle.checked) {
                console.log("Show commentary - Implement logic");
                document.body.classList.add('show-commentary');
            } else {
                console.log("Hide commentary - Implement logic");
                document.body.classList.remove('show-commentary');
            }
        });
    }

     // Glossary Button Placeholder
     const glossaryButton = document.getElementById('glossary-button');
     if (glossaryButton) {
         glossaryButton.addEventListener('click', () => {
             alert('Glossary button clicked. Implement glossary display logic here.');
         });
     }

}); // End of DOMContentLoaded