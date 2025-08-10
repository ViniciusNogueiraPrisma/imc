gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
});

function initializeAnimations() {
    setInitialStates();
    
    bannerAnimations();
    destaquesAnimations();
    parceirosAnimations();
    infosAnimations();
    channelsAnimations();
    footerAnimations();
    listItemsAnimations();
    internalPageAnimations();
    
    setupResponsiveAnimations();
}

function setInitialStates() {
    const homeElements = [
        '.banner-home h2, .banner-home span, .banner-home a',
        '.destaques-home .swiper-slide',
        '.parceiros-home .swiper-slide',
        '.infos-home .main-itens',
        '.channels-home .box',
        '.infos-home .item-event'
    ];
    
    const internalElements = [
        '.internal-banner h1, .internal-banner h2, .internal-banner p',
        '.breadcrumb-section',
        '.content-internal .container > *',
        '.box-content',
        '.card-item',
        '.timeline-item',
        '.table-responsive',
        '.download-item',
        '.contact-form',
        '.info-box'
    ];
    
    const commonElements = [
        'footer .content-footer > *',
        '.section-title',
        '.content-section',
        '.main-content > *'
    ];
    
    [...homeElements, ...internalElements, ...commonElements].forEach(selector => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            gsap.set(elements, { opacity: 0, y: 30 });
        }
    });
    
    const scaleElements = document.querySelectorAll('.parceiros-home .swiper-slide, .card-item, .box-content');
    if (scaleElements.length > 0) {
        gsap.set(scaleElements, { opacity: 0, scale: 0.9 });
    }
    
    const slideElements = document.querySelectorAll('.infos-home .main-itens, .infos-home .item-event, .timeline-item');
    if (slideElements.length > 0) {
        gsap.set(slideElements, { opacity: 0, x: -30 });
    }
}

function bannerAnimations() {
    const homeElements = document.querySelectorAll('.banner-home h2, .banner-home span, .banner-home a');
    const internalElements = document.querySelectorAll('.internal-banner h1, .internal-banner h2, .internal-banner p');
    
    if (homeElements.length > 0) {
        gsap.to(homeElements, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            delay: 0.5
        });
    }
    
    if (internalElements.length > 0) {
        gsap.to(internalElements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out',
            delay: 0.3
        });
    }
}

/**
 * Destaques section animation with stagger effect
 */
function destaquesAnimations() {
    gsap.to('.destaques-home .swiper-slide', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.destaques-home',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

/**
 * Parceiros section animation with scale effect
 */
function parceirosAnimations() {
    gsap.to('.parceiros-home .swiper-slide', {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.parceiros-home',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

/**
 * Infos section animation - slide from left
 */
function infosAnimations() {
    gsap.to('.infos-home .main-itens', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.infos-home',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

/**
 * Channels section animation
 */
function channelsAnimations() {
    gsap.to('.channels-home .box', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.channels-home',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

/**
 * Footer animation with stagger
 */
function footerAnimations() {
    gsap.to('footer .content-footer > *', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

/**
 * List items animation for info section
 */
function listItemsAnimations() {
    gsap.to('.infos-home .item-event', {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: '.infos-home .list-itens',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });
}

function internalPageAnimations() {
    const triggers = [
        { selector: '.breadcrumb-section', trigger: '.breadcrumb-section' },
        { selector: '.content-internal .container > *', trigger: '.content-internal' },
        { selector: '.box-content', trigger: '.box-content' },
        { selector: '.card-item', trigger: '.card-item' },
        { selector: '.timeline-item', trigger: '.timeline-item' },
        { selector: '.table-responsive', trigger: '.table-responsive' },
        { selector: '.download-item', trigger: '.download-item' },
        { selector: '.contact-form', trigger: '.contact-form' },
        { selector: '.info-box', trigger: '.info-box' },
        { selector: '.section-title', trigger: '.section-title' },
        { selector: '.content-section', trigger: '.content-section' },
        { selector: '.main-content > *', trigger: '.main-content' }
    ];
    
    triggers.forEach(({ selector, trigger }) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
            gsap.to(elements, {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            });
        }
    });
}

function setupResponsiveAnimations() {
    const mm = gsap.matchMedia();
    
    mm.add("(max-width: 768px)", () => {
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars) {
                trigger.vars.start = 'top 90%';
                trigger.refresh();
            }
        });
        
        gsap.globalTimeline.timeScale(1.2);
    });
    
    mm.add("(min-width: 769px) and (max-width: 1024px)", () => {
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars) {
                trigger.vars.start = 'top 80%';
                trigger.refresh();
            }
        });
    });
    
    mm.add("(min-width: 1025px)", () => {
        gsap.globalTimeline.timeScale(1);
    });
}

function refreshAnimations() {
    ScrollTrigger.refresh();
}

function disableAnimations() {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    gsap.set('*', { clearProps: 'all' });
}

window.IMCAnimations = {
    refresh: refreshAnimations,
    disable: disableAnimations,
    init: initializeAnimations
};
