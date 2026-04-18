gsap.registerPlugin(Observer);

let slides = document.querySelectorAll(".slide"),
    currentIndex = -1,
    isAnimating = false;

function gotoSection(index, direction) {
    // Boundary check
    if (index < 0 || index >= slides.length || isAnimating) return;
    
    isAnimating = true;
    let fromSlide = slides[currentIndex];
    let toSlide = slides[index];
    let dFactor = direction === -1 ? -1 : 1;

    let tl = gsap.timeline({
        onComplete: () => {
            isAnimating = false;
            currentIndex = index;
            document.getElementById("current-num").innerText = index + 1;
        }
    });

    // 1. Animate Out
    if (fromSlide) {
        tl.to(fromSlide, { 
            opacity: 0, 
            scale: 0.9, 
            xPercent: -20 * dFactor, 
            duration: 0.8, 
            ease: "power2.inOut" 
        });
        tl.set(fromSlide, { visibility: "hidden" });
    }

    // 2. Animate In
    tl.fromTo(toSlide, 
        { 
            visibility: "visible", 
            opacity: 0, 
            scale: 1.1, 
            xPercent: 100 * dFactor 
        },
        { 
            opacity: 1, 
            scale: 1, 
            xPercent: 0, 
            duration: 1.2, 
            ease: "expo.out" 
        }, 
        "-=0.6"
    );

    // 3. Content Stagger (Inside the card)
    tl.fromTo(toSlide.querySelectorAll(".glass-card > *"),
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        "-=0.8"
    );
}

// Create Scroll Observer
Observer.create({
    target: window,
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    onUp: () => gotoSection(currentIndex - 1, -1),
    onDown: () => gotoSection(currentIndex + 1, 1),
    tolerance: 10,
    preventDefault: true
});

// Initial load
gotoSection(0, 1);
