// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const header = document.querySelector('header');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    const skillProgressBars = document.querySelectorAll('.progress');
    const contactForm = document.getElementById('contactForm');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Initialize social links - render where needed
    initializeSocialLinks();
    
    // Check for saved theme preference or use device preference
    const getCurrentTheme = () => {
        let theme = localStorage.getItem('theme') || 'light';
        if (!localStorage.getItem('theme')) {
            // Check if device prefers dark mode
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                theme = 'dark';
            }
        }
        return theme;
    };
    
    // Set theme on page load
    document.documentElement.setAttribute('data-theme', getCurrentTheme());
    updateThemeIcon(getCurrentTheme());
    
    // Toggle theme
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        updateThemeIcon(newTheme);
    });
    
    // Update theme icon
    function updateThemeIcon(theme) {
        const moonIcon = themeToggle.querySelector('.fa-moon');
        const sunIcon = themeToggle.querySelector('.fa-sun');
        
        if (theme === 'dark') {
            moonIcon.style.display = 'none';
            sunIcon.style.display = 'block';
        } else {
            moonIcon.style.display = 'block';
            sunIcon.style.display = 'none';
        }
    }
    
    // Handle Navigation and Scrolling
    window.addEventListener('scroll', function() {
        // Add/remove scrolled class to header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animate skill progress bars when in viewport
        animateOnScroll();
    });
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close mobile menu after clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
    
    // Animate elements when they come into viewport
    function animateOnScroll() {
        // Animate skill progress bars
        skillProgressBars.forEach(progressBar => {
            if (isInViewport(progressBar) && !progressBar.classList.contains('animated')) {
                progressBar.classList.add('animated');
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = targetWidth;
                }, 100);
            }
        });
    }
    
    // Initial animation check
    animateOnScroll();
    
    // Handle contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Form submission would typically send data to a server
            // This is a mockup to show successful submission
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                
                window.scrollTo({
                    top: targetPosition - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Project filtering (if implemented)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else if (!card.classList.contains(filterValue)) {
                        card.style.display = 'none';
                    } else {
                        card.style.display = 'block';
                    }
                });
            });
        });
    }
    
    // PDF Preview functionality
    const resumePreviewBtn = document.getElementById('resumePreviewBtn');
    const resumeModal = document.getElementById('resumeModal');
    const closeModal = document.querySelector('.close-modal');
    const pdfViewer = document.getElementById('pdfViewer');
    const prevPageBtn = document.getElementById('prevPage');
    const nextPageBtn = document.getElementById('nextPage');
    const currentPageSpan = document.getElementById('currentPage');
    const totalPagesSpan = document.getElementById('totalPages');
    
    let pdfDoc = null;
    let pageNum = 1;
    let pageRendering = false;
    let pageNumPending = null;
    let scale = 1.25; // Reduced scale to ensure full content is visible
    
    // Open the modal when the preview button is clicked
    if (resumePreviewBtn) {
        resumePreviewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resumeModal.style.display = 'block';
            
            // Add a loading indicator
            pdfViewer.innerHTML = `
                <div class="pdf-loading">
                    <i class="fas fa-spinner"></i>
                    <p>Loading PDF...</p>
                </div>
            `;
            
            // Load the PDF if not already loaded
            if (!pdfDoc) {
                // Try a direct path first
                const pdfPath = 'files/Ahmed_ElSaeed_Resume.pdf';
                console.log('Loading PDF from path:', pdfPath);
                loadPDF(pdfPath);
            }
            
            // Prevent scrolling of the body when modal is open
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close the modal when the close button is clicked
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            resumeModal.style.display = 'none';
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close the modal when clicking outside of it
    window.addEventListener('click', function(e) {
        if (e.target === resumeModal) {
            resumeModal.style.display = 'none';
            // Re-enable scrolling when modal is closed
            document.body.style.overflow = 'auto';
        }
    });
    
    // Load PDF document
    function loadPDF(url) {
        console.log('Attempting to load PDF from:', url);
        
        pdfjsLib.getDocument(url).promise.then(function(pdf) {
            console.log('PDF loaded successfully:', pdf);
            pdfDoc = pdf;
            totalPagesSpan.textContent = pdfDoc.numPages;
            renderPage(pageNum);
            
            // Enable/disable navigation buttons based on the current page
            updateNavButtons();
        }).catch(function(error) {
            console.error('Error loading PDF:', error);
            // Try fallback URL if the first attempt fails
            if (url === 'files/Ahmed_ElSaeed_Resume.pdf') {
                console.log('Trying fallback URL with full path');
                loadPDF(window.location.origin + '/files/Ahmed_ElSaeed_Resume.pdf');
            } else {
                pdfViewer.innerHTML = `
                    <div class="pdf-loading">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Error loading PDF. Please try again or download the resume.</p>
                    </div>
                `;
            }
        });
    }
    
    // Render a specific page
    function renderPage(num) {
        pageRendering = true;
        console.log('Rendering page:', num);
        
        pdfDoc.getPage(num).then(function(page) {
            console.log('Page retrieved successfully:', page);
            // Create a viewport at the desired scale
            const viewport = page.getViewport({ scale: scale });
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Set canvas dimensions to the viewport size
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            // Create a container div for better positioning
            const container = document.createElement('div');
            container.style.width = '100%';
            container.style.display = 'flex';
            container.style.justifyContent = 'center';
            container.appendChild(canvas);
            
            // Clear the viewer and add the container
            pdfViewer.innerHTML = '';
            pdfViewer.appendChild(container);
            
            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            
            console.log('Starting page render with context:', renderContext);
            const renderTask = page.render(renderContext);
            
            // Wait for rendering to finish
            renderTask.promise.then(function() {
                console.log('Page rendered successfully');
                pageRendering = false;
                
                // Check if there's a pending page
                if (pageNumPending !== null) {
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
            }).catch(function(error) {
                console.error('Error rendering PDF page:', error);
                pdfViewer.innerHTML = `
                    <div class="pdf-loading">
                        <i class="fas fa-exclamation-circle"></i>
                        <p>Error rendering PDF. Please try again or download the resume.</p>
                    </div>
                `;
                pageRendering = false;
            });
        }).catch(function(error) {
            console.error('Error getting page:', error);
            pdfViewer.innerHTML = `
                <div class="pdf-loading">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Error loading page ${num}. Please try again or download the resume.</p>
                </div>
            `;
            pageRendering = false;
        });
        
        // Update page counter
        currentPageSpan.textContent = num;
        
        // Update navigation buttons
        updateNavButtons();
    }
    
    // Queue rendering of a page
    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }
    
    // Go to previous page
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (pageNum <= 1) return;
            pageNum--;
            queueRenderPage(pageNum);
        });
    }
    
    // Go to next page
    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            if (pageNum >= pdfDoc.numPages) return;
            pageNum++;
            queueRenderPage(pageNum);
        });
    }
    
    // Enable/disable navigation buttons based on current page
    function updateNavButtons() {
        if (!pdfDoc) return;
        
        if (pageNum <= 1) {
            prevPageBtn.disabled = true;
            prevPageBtn.classList.add('disabled');
        } else {
            prevPageBtn.disabled = false;
            prevPageBtn.classList.remove('disabled');
        }
        
        if (pageNum >= pdfDoc.numPages) {
            nextPageBtn.disabled = true;
            nextPageBtn.classList.add('disabled');
        } else {
            nextPageBtn.disabled = false;
            nextPageBtn.classList.remove('disabled');
        }
    }
    
    // Add keyboard support for PDF navigation
    document.addEventListener('keydown', function(e) {
        // Only respond to keyboard if modal is open
        if (resumeModal.style.display !== 'block') return;
        
        if (e.key === 'ArrowLeft' && pageNum > 1) {
            pageNum--;
            queueRenderPage(pageNum);
            e.preventDefault();
        } else if (e.key === 'ArrowRight' && pdfDoc && pageNum < pdfDoc.numPages) {
            pageNum++;
            queueRenderPage(pageNum);
            e.preventDefault();
        } else if (e.key === 'Escape') {
            resumeModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            e.preventDefault();
        }
    });
    
    // Social Links Template
    function initializeSocialLinks() {
        const socialLinks = [
            { platform: 'github', url: 'https://github.com/Ahmedelsa3eed', icon: 'fab fa-github' },
            { platform: 'linkedin', url: 'https://www.linkedin.com/in/el-saeed/', icon: 'fab fa-linkedin' },
            { platform: 'twitter', url: '#', icon: 'fab fa-twitter' },
            { platform: 'medium', url: '#', icon: 'fab fa-medium' }
        ];
        
        // Find all the social links containers and populate them
        const socialContainers = document.querySelectorAll('.social-links-container');
        
        socialContainers.forEach(container => {
            const socialLinksHTML = socialLinks.map(link => 
                `<a href="${link.url}" target="_blank" class="social-link ${link.platform}"><i class="${link.icon}"></i></a>`
            ).join('');
            
            container.innerHTML = `<div class="social-links">${socialLinksHTML}</div>`;
        });
        
        console.log('Social links initialized');
    }
});

/* Recent Deployments helpers: horizontal wheel scroll + keyboard navigation */
(function(){
    const row = document.querySelector('.deployments-row');
    if(!row) return;

    // Allow mouse wheel to scroll horizontally on narrow viewports
    row.addEventListener('wheel', (e) => {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            row.scrollLeft += e.deltaY;
        }
    }, { passive: false });

    // Keyboard navigation when focused
    row.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            row.scrollBy({ left: 280, behavior: 'smooth' });
            e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
            row.scrollBy({ left: -280, behavior: 'smooth' });
            e.preventDefault();
        }
    });
})();
