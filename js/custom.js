(function($) {
    "use strict";
	
	/* ..............................................
	Loader 
    ................................................. */
	
	$(window).on('load', function() { 
		$('.preloader').fadeOut(); 
		$('#preloader').delay(550).fadeOut('slow'); 
		$('body').delay(450).css({'overflow':'visible'});
	});
	
	/* ..............................................
    Fixed Menu
    ................................................. */
    
	$(window).on('scroll', function () {
		if ($(window).scrollTop() > 50) {
			$('.top-header').addClass('fixed-menu');
		} else {
			$('.top-header').removeClass('fixed-menu');
		}
	});
	
	/* ..............................................
    Gallery
    ................................................. */
	
	$('#slides').superslides({
		inherit_width_from: '.cover-slides',
		inherit_height_from: '.cover-slides',
		play: 5000,
		animation: 'fade',
	});
	
	$( ".cover-slides ul li" ).append( "<div class='overlay-background'></div>" );
	
	/* ..............................................
    Map Full
    ................................................. */
	
	$(document).ready(function(){ 
		$(window).on('scroll', function () {
			if ($(this).scrollTop() > 100) { 
				$('#back-to-top').fadeIn(); 
			} else { 
				$('#back-to-top').fadeOut(); 
			} 
		}); 
		$('#back-to-top').click(function(){ 
			$("html, body").animate({ scrollTop: 0 }, 600); 
			return false; 
		}); 
	});
	
	/* ..............................................
    Special Menu
    ................................................. */
	
	var Container = $('.container');
	Container.imagesLoaded(function () {
		var portfolio = $('.special-menu');
		portfolio.on('click', 'button', function () {
			$(this).addClass('active').siblings().removeClass('active');
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({
				filter: filterValue
			});
		});
		var $grid = $('.special-list').isotope({
			itemSelector: '.special-grid'
		});
	});
	
	/* ..............................................
    BaguetteBox
    ................................................. */
	
	baguetteBox.run('.tz-gallery', {
		animation: 'fadeIn',
		noScrollbars: true
	});
	
	
	
	/* ..............................................
    Datepicker
    ................................................. */
	
	$('.datepicker').pickadate();
	
	$('.time').pickatime();
	
	
	// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburgerToggle = document.querySelector('.navbar-toggler');
    const sideMenu = document.getElementById('side-menu');
    const closeBtn = document.querySelector('.side-menu .close-btn');
    const overlay = document.querySelector('.side-menu-overlay');
    const navLinks = document.querySelectorAll('.side-menu .nav-link');
    
    // Toggle side menu when hamburger is clicked
    hamburgerToggle.addEventListener('click', function() {
        toggleSideMenu();
    });
    
    // Close side menu when close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeSideMenu();
        });
    }
    
    // Close side menu when overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeSideMenu();
        });
    }
    
    // Close side menu when a nav link is clicked (for mobile)
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            closeSideMenu();
        });
    });
    
    // Close side menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1400) {
            closeSideMenu();
        }
    });
    
    // Toggle side menu function
    function toggleSideMenu() {
        if (sideMenu) {
            sideMenu.classList.toggle('open');
            hamburgerToggle.classList.toggle('open');
            if (overlay) {
                overlay.classList.toggle('active');
            }
            
            // Prevent body scrolling when menu is open
            if (sideMenu.classList.contains('open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        }
    }
    
    // Close side menu function
    function closeSideMenu() {
        if (sideMenu) {
            sideMenu.classList.remove('open');
            hamburgerToggle.classList.remove('open');
            if (overlay) {
                overlay.classList.remove('active');
            }
            document.body.style.overflow = '';
        }
    }
});
// Add this to your custom.js file or create a new side-menu.js file

$(document).ready(function() {
	// Create side menu elements
	var sideMenu = $('<div class="side-menu"></div>');
	var overlay = $('<div class="side-menu-overlay"></div>');
	var closeButton = $('<button class="side-menu-close" aria-label="Close menu"></button>');
	
	// Clone the navbar nav to the side menu
	var navClone = $('.navbar-nav').clone();
	
	// Add close button to side menu
	sideMenu.append(closeButton);
	sideMenu.append(navClone);
	
	// Insert side menu and overlay into the body
	$('body').append(sideMenu);
	$('body').append(overlay);
	
	// Toggle side menu on hamburger click with improved animation
	$('.navbar-toggler').on('click', function(e) {
	  e.preventDefault();
	  var expanded = $(this).attr('aria-expanded') === 'true';
	  $(this).attr('aria-expanded', !expanded);
	  
	  if (!expanded) {
		// Open menu with proper timing
		overlay.addClass('active');
		setTimeout(function() {
		  sideMenu.addClass('open');
		  $('body').css('overflow', 'hidden'); // Prevent scrolling when menu is open
		}, 50);
	  } else {
		// Close menu with proper timing
		closeMenu();
	  }
	});
	
	// Close menu when clicking the X button
	closeButton.on('click', function(e) {
	  e.preventDefault();
	  closeMenu();
	});
	
	// Close menu when clicking overlay
	overlay.on('click', function() {
	  closeMenu();
	});
	
	// Close menu when clicking a nav link
	sideMenu.find('.nav-link').on('click', function() {
	  closeMenu();
	});
	
	// Close menu function to ensure consistent closing behavior
	function closeMenu() {
	  sideMenu.removeClass('open');
	  $('.navbar-toggler').attr('aria-expanded', 'false');
	  
	  // Delayed removal of overlay for smooth transition
	  setTimeout(function() {
		overlay.removeClass('active');
		$('body').css('overflow', '');
	  }, 300);
	}
	
	// Prevent default behavior for links with '#' href
	$('a[href="#"]').on('click', function(e) {
	  e.preventDefault();
	});
  
	// Handle window resize events appropriately
	var resizeTimer;
	$(window).on('resize', function() {
	  clearTimeout(resizeTimer);
	  resizeTimer = setTimeout(function() {
		if ($(window).width() > 1400) {
		  sideMenu.removeClass('open');
		  overlay.removeClass('active');
		  $('.navbar-toggler').attr('aria-expanded', 'false');
		  $('body').css('overflow', '');
		}
	  }, 250);
	});
	
	// Handle orientation change on mobile devices
	$(window).on('orientationchange', function() {
	  // Brief timeout to let the orientation change complete
	  setTimeout(function() {
		// Adjust side menu height for new orientation
		var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		sideMenu.css('height', viewportHeight + 'px');
	  }, 200);
	});
	
	// Set initial menu height based on viewport
	var initialViewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	sideMenu.css('height', initialViewportHeight + 'px');
  });




  
  document.addEventListener('DOMContentLoaded', function() {
    // Get the video element
    var video = document.getElementById('header-video');
    
    // Force play when page loads (helps with some mobile browsers)
    setTimeout(function() {
        video.play().catch(function(error) {
            console.log("Autoplay was prevented: ", error);
            
            // Create a play button overlay if autoplay fails
            if (!document.getElementById('video-play-button')) {
                var playButton = document.createElement('div');
                playButton.id = 'video-play-button';
                playButton.innerHTML = '<button>Click to Play Video</button>';
                playButton.style.position = 'absolute';
                playButton.style.zIndex = '5';
                playButton.style.top = '50%';
                playButton.style.left = '50%';
                playButton.style.transform = 'translate(-50%, -50%)';
                playButton.style.background = 'rgba(0,0,0,0.7)';
                playButton.style.padding = '15px 25px';
                playButton.style.borderRadius = '30px';
                playButton.style.border = 'none';
                playButton.style.cursor = 'pointer';
                
                playButton.querySelector('button').style.color = '#fff';
                playButton.querySelector('button').style.fontSize = '16px';
                playButton.querySelector('button').style.background = 'transparent';
                playButton.querySelector('button').style.border = 'none';
                
                // Add play button to the video container
                document.querySelector('.video-header').appendChild(playButton);
                
                // Add click event to play the video
                playButton.addEventListener('click', function() {
                    video.play();
                    playButton.style.display = 'none';
                });
            }
        });
    }, 1000);
    
    // Check for browser-specific issues
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        // For iOS, make sure playsinline is set
        video.setAttribute('playsinline', '');
        video.setAttribute('webkit-playsinline', ''); // For older iOS versions
    }
    
    // Handle orientation change & page visibility changes
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            video.play().catch(function(e) {
                console.log("Couldn't resume playback: ", e);
            });
        }
    });
    
    window.addEventListener('orientationchange', function() {
        setTimeout(function() {
            video.play().catch(function(e) {
                console.log("Couldn't resume playback after orientation change: ", e);
            });
        }, 300);
    });
    
    // Add event listener to detect when video is played
    video.addEventListener('play', function() {
        console.log('Video is playing');
    });
    
    // Add event listener to detect if video fails to play
    video.addEventListener('error', function(e) {
        console.error('Video error: ', e);
    });
});

// Create a poster image if it doesn't load quickly
setTimeout(function() {
    var video = document.getElementById('header-video');
    if (video && video.readyState < 3) { // HAVE_FUTURE_DATA = 3
        video.setAttribute('poster', 'images/poster-fallback.png'); // Replace with your fallback image
    }
}, 500);

// Mobile Navigation Functionality
$(document).ready(function() {
	// Toggle side menu when hamburger is clicked
	$('.navbar-toggler').on('click', function() {
	  $('.side-menu').addClass('open');
	  $('.side-menu-overlay').addClass('active');
	  $('body').addClass('menu-open');
	});
	
	// Close side menu when X button or overlay is clicked
	$('.side-menu .close-btn, .side-menu-overlay').on('click', function() {
	  $('.side-menu').removeClass('open');
	  $('.side-menu-overlay').removeClass('active');
	  $('body').removeClass('menu-open');
	});
	
	// Close side menu when clicking a menu item (improves mobile UX)
	$('.side-menu .nav-link').on('click', function() {
	  // Only close if it's a direct page link (not a dropdown toggle)
	  if (!$(this).hasClass('dropdown-toggle')) {
		$('.side-menu').removeClass('open');
		$('.side-menu-overlay').removeClass('active');
		$('body').removeClass('menu-open');
	  }
	});
	
	// Handle window resize - close mobile menu if screen size changes to desktop
	$(window).on('resize', function() {
	  if ($(window).width() > 1400) {
		$('.side-menu').removeClass('open');
		$('.side-menu-overlay').removeClass('active');
		$('body').removeClass('menu-open');
	  }
	});
	
	// Add body class for iOS detection
	if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
	  $('body').addClass('ios-device');
	}
  });


  // Side Menu JavaScript
$(document).ready(function() {
	// Toggle side menu when hamburger is clicked
	$('.navbar-toggler').on('click', function(e) {
	  e.preventDefault();
	  e.stopPropagation();
	  var expanded = $(this).attr('aria-expanded') === 'true';
	  $(this).attr('aria-expanded', !expanded);
	  
	  if (!expanded) {
		// Open menu - overlay first, then menu
		$('.side-menu-overlay').addClass('active');
		setTimeout(function() {
		  $('.side-menu').addClass('open');
		  $('body').css('overflow', 'hidden'); // Prevent body scrolling
		}, 50);
	  } else {
		// Close menu
		closeMenu();
	  }
	});
	
	// Close menu when clicking the X button
	$('.side-menu-close').on('click', function() {
	  closeMenu();
	});
	
	// Close menu when clicking overlay
	$('.side-menu-overlay').on('click', function() {
	  closeMenu();
	});
	
	// Close menu function
	function closeMenu() {
	  $('.side-menu').removeClass('open');
	  $('.navbar-toggler').attr('aria-expanded', 'false');
	  
	  // Delayed removal of overlay
	  setTimeout(function() {
		$('.side-menu-overlay').removeClass('active');
		$('body').css('overflow', ''); // Re-enable scrolling
	  }, 300);
	}
	
	// Close menu when clicking a menu item
	$('.side-menu .nav-link').on('click', function() {
	  if (!$(this).hasClass('dropdown-toggle')) {
		closeMenu();
	  }
	});
	
	// Handle window resize
	$(window).on('resize', function() {
	  if ($(window).width() > 1400) {
		closeMenu();
	  }
	});
	
	// Force proper side menu height
	function setSideMenuHeight() {
	  var windowHeight = Math.max(
		document.documentElement.clientHeight, 
		window.innerHeight || 0
	  );
	  $('.side-menu').css('height', windowHeight + 'px');
	}
	
	// Set initial height
	setSideMenuHeight();
	
	// Update height on window resize and orientation change
	$(window).on('resize orientationchange', function() {
	  setSideMenuHeight();
	});
  });



  


// Highlight active nav link across all pages
function normalizePath(p) {
    if (!p) return '/';
    // If relative like "menu" -> "/menu"
    if (!p.startsWith('/')) p = '/' + p;
    // Convert any .html to clean path: /about.html -> /about
    p = p.replace(/\/(index)?\.html$/i, '/');
    p = p.replace(/\.html$/i, '');
    // Trim trailing slash (except root)
    if (p.length > 1) p = p.replace(/\/$/, '');
    return p === '' ? '/' : p;
}

// Get the top-level path segment (e.g., "/menu/sandweech" -> "menu")
function getTopSegment(p) {
  var path = normalizePath(p);
  if (path === '/') return '/';
  // Remove leading slash and split
  var seg = path.replace(/^\//, '').split('/')[0];
  return seg.toLowerCase();
}

function applyActiveNavHighlight() {
  try {
    // Get current page - handle both http/https and file:// URLs
    var currentPathname = window.location.pathname;
    var currentHref = window.location.href;
    var currentPageBase = ''; // e.g., "menu", "catering", "about", "specials"
  
  // Extract page identifier from current URL - SIMPLIFIED APPROACH
  // Method 1: Try to get from filename in URL (works for file://)
  var filenameMatch = currentHref.match(/\/([^\/]+\.html)(?:\?|#|$)/i);
  if (filenameMatch) {
    currentPageBase = filenameMatch[1].replace(/\.html$/i, '').toLowerCase();
  }
  
  // Method 2: Try to get from pathname
  if (!currentPageBase) {
    var pathMatch = currentPathname.match(/\/([^\/]+\.html)$/i);
    if (pathMatch) {
      currentPageBase = pathMatch[1].replace(/\.html$/i, '').toLowerCase();
    }
  }
  
  // Method 3: For web URLs, use path segment
  if (!currentPageBase) {
    var currentPath = normalizePath(currentPathname);
    currentPageBase = getTopSegment(currentPath);
    if (currentPageBase === '/') {
      currentPageBase = 'index';
    }
  }
  
  // Debug logging - ALWAYS RUN
  console.log('=== NAV HIGHLIGHT DEBUG ===');
  console.log('Current page base:', currentPageBase);
  console.log('Current href:', currentHref);
  console.log('Current pathname:', currentPathname);
  
  // If we couldn't detect the page, try alternative method
  if (!currentPageBase) {
    // Last resort: extract from window.location
    var lastPart = currentHref.split('/').pop().toLowerCase();
    currentPageBase = lastPart.replace(/\.html.*$/, '').replace(/\?.*$/, '').replace(/#.*$/, '');
    console.log('Fallback detection - currentPageBase:', currentPageBase);
  }
  
  var currentPath = normalizePath(currentPathname);
  var currentTop = getTopSegment(currentPath);

  function mark(containerSelector) {
    var $container = $(containerSelector);
    if (!$container.length) return;
    
    // Clear previous active states on both items and links
    $container.find('.nav-item').removeClass('active');
    $container.find('a.nav-link').removeClass('active');
    
    $container.find('a.nav-link').each(function() {
      var $link = $(this);
      var href = $link.attr('href');
      if (!href) return;
      
      // Skip external links and Order Now button
      if (href.startsWith('http') && !href.includes(window.location.hostname) && !href.startsWith('file://')) return;
      if ($link.closest('.order-now-btn').length) return;
      
      // Handle relative paths
      var linkPath;
      var linkFilename = '';
      
      try {
        if (href.startsWith('http') || href.startsWith('file://')) {
          // For file:// URLs, extract filename
          if (href.startsWith('file://')) {
            var filenameMatch = href.match(/\/([^\/]+\.html)$/);
            if (filenameMatch) {
              linkFilename = filenameMatch[1].toLowerCase();
            }
          }
          var url = new URL(href);
          if (url.origin !== window.location.origin && !href.startsWith('file://')) return;
          linkPath = normalizePath(url.pathname);
        } else {
          // Relative path - resolve it
          var base = window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
          if (href.startsWith('/')) {
            linkPath = normalizePath(href);
          } else {
            linkPath = normalizePath(base + href);
          }
          // Extract filename from relative path
          var filenameMatch = href.match(/([^\/]+\.html)$/);
          if (filenameMatch) {
            linkFilename = filenameMatch[1].toLowerCase();
          }
        }
      } catch(e) {
        // If URL parsing fails, try simple string matching
        if (href.includes('.html')) {
          var match = href.match(/([^\/]+\.html)/);
          if (match) {
            linkFilename = match[1].toLowerCase();
          }
        }
        linkPath = normalizePath(href);
      }
      
      var linkTop = getTopSegment(linkPath);
      
      // Match logic: check if link matches current page - SIMPLIFIED
      var matches = false;
      
      // Normalize both for comparison
      var normalizedHref = href.toLowerCase().replace(/^\/+/, '').replace(/\.html$/, '').replace(/\/$/, '');
      var normalizedCurrent = currentPageBase ? currentPageBase.toLowerCase() : '';
      
      // Debug logging for problematic pages
      if (normalizedCurrent && (normalizedCurrent === 'menu' || normalizedCurrent === 'catering' || normalizedCurrent === 'specials' || normalizedCurrent === 'about')) {
        console.log('Checking link:', href, 'normalizedHref:', normalizedHref, 'normalizedCurrent:', normalizedCurrent, 'linkTop:', linkTop);
      }
      
      // Primary matching: direct comparison of normalized values
      if (normalizedCurrent && normalizedHref && normalizedCurrent === normalizedHref) {
        matches = true;
      }
      // Check if href path segment matches (e.g., "/menu" -> "menu")
      else if (normalizedCurrent && linkTop && normalizedCurrent === linkTop) {
        matches = true;
      }
      // Check if normalizedHref matches currentPageBase (handles "/menu" -> "menu")
      else if (normalizedCurrent && normalizedHref && normalizedCurrent === normalizedHref) {
        matches = true;
      }
      // Additional check: if href is exactly "/" + currentPageBase
      else if (normalizedCurrent && (href.toLowerCase() === '/' + normalizedCurrent || href.toLowerCase() === '/' + normalizedCurrent + '.html')) {
        matches = true;
      }
      // Homepage check
      else if ((normalizedCurrent === 'index' || currentTop === '/') && (linkTop === '/' || href === '/' || href === '/index.html' || href === 'index.html' || normalizedHref === '' || normalizedHref === 'index')) {
        matches = true;
      }
      // Exact path match
      else if (currentPath === linkPath) {
        matches = true;
      }
      // Filename matching fallback
      else if (normalizedCurrent && linkFilename) {
        var linkBase = linkFilename.replace(/\.html$/i, '').toLowerCase();
        if (normalizedCurrent === linkBase) {
          matches = true;
        }
      }
      
      if (matches && normalizedCurrent && (normalizedCurrent === 'menu' || normalizedCurrent === 'catering' || normalizedCurrent === 'specials' || normalizedCurrent === 'about')) {
        console.log('MATCHED! Adding active class to:', href);
      }
      // Additional check: if href ends with or contains the current page base
      else if (normalizedCurrent && (normalizedHref === normalizedCurrent || normalizedHref.endsWith('/' + normalizedCurrent) || normalizedHref.includes(normalizedCurrent))) {
        matches = true;
      }
      
      if (matches) {
        // Add active on both the list item and the link for robustness
        $link.addClass('active');
        $link.closest('.nav-item').addClass('active');
        
        // Force red color via inline style as fallback (highest priority)
        $link.css('color', '#cf1818');
        $link.css('font-weight', '600');
        
        console.log('✓ MATCHED:', href, '→ Active class added with inline styles');
      } else {
        console.log('✗ No match:', href, 'vs current:', normalizedCurrent, '| linkTop:', linkTop);
      }
    });
  }

    // Header navbar
    mark('.navbar-nav');
    // Side menu (may be cloned later)
    mark('.side-menu');
    // Also check for any cloned navs
    mark('.side-menu .navbar-nav');
    
    console.log('Finished applyActiveNavHighlight for page:', currentPageBase);
  } catch(e) {
    console.error('Error in applyActiveNavHighlight:', e);
    console.error('Stack:', e.stack);
  }
}

// Run on DOM ready, after load, and re-run shortly after to catch late clones
// Wrap in try-catch to prevent errors from stopping execution
$(document).ready(function() {
  try {
    console.log('DOM ready - running applyActiveNavHighlight');
    applyActiveNavHighlight();
    setTimeout(function() { try { applyActiveNavHighlight(); } catch(e) { console.error('Error in delayed highlight:', e); } }, 200);
    setTimeout(function() { try { applyActiveNavHighlight(); } catch(e) { console.error('Error in delayed highlight:', e); } }, 800);
    // Additional delay to catch side menu clones that are created in inline scripts
    setTimeout(function() { try { applyActiveNavHighlight(); } catch(e) { console.error('Error in delayed highlight:', e); } }, 1500);
    setTimeout(function() { try { applyActiveNavHighlight(); } catch(e) { console.error('Error in delayed highlight:', e); } }, 2500);
  } catch(e) {
    console.error('Error in applyActiveNavHighlight on DOM ready:', e);
  }
});

$(window).on('load', function() {
  try {
    console.log('Window load - running applyActiveNavHighlight');
    applyActiveNavHighlight();
    setTimeout(function() { try { applyActiveNavHighlight(); } catch(e) { console.error('Error in delayed highlight:', e); } }, 200);
    setTimeout(function() { try { applyActiveNavHighlight(); } catch(e) { console.error('Error in delayed highlight:', e); } }, 1000);
    setTimeout(function() { try { applyActiveNavHighlight(); } catch(e) { console.error('Error in delayed highlight:', e); } }, 2000);
  } catch(e) {
    console.error('Error in applyActiveNavHighlight on window load:', e);
  }
});

// Also run immediately if DOM is already loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  try {
    console.log('DOM already loaded - running applyActiveNavHighlight immediately');
    setTimeout(function() { try { applyActiveNavHighlight(); } catch(e) { console.error('Error in immediate highlight:', e); } }, 100);
  } catch(e) {
    console.error('Error in immediate applyActiveNavHighlight:', e);
  }
}

// Also run when side menu is created (using MutationObserver as fallback)
if (typeof MutationObserver !== 'undefined') {
  var observer = new MutationObserver(function(mutations) {
    var sideMenuExists = $('.side-menu').length > 0;
    if (sideMenuExists) {
      applyActiveNavHighlight();
    }
  });
  
  $(document).ready(function() {
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}


}(jQuery));

// STANDALONE NAVIGATION HIGHLIGHTING - Runs independently of jQuery
// This MUST be outside the jQuery wrapper to run even if jQuery fails
(function() {
  'use strict';
  
  function highlightActiveNavStandalone() {
    try {
      console.log('=== STANDALONE NAV HIGHLIGHT ===');
      var currentHref = window.location.href;
      var currentPageBase = '';
      
      // Extract page name from file:// URL
      if (currentHref.startsWith('file://')) {
        var match = currentHref.match(/\/([^\/]+\.html)(?:\?|#|$)/i);
        if (match) {
          currentPageBase = match[1].replace(/\.html$/i, '').toLowerCase();
        } else {
          // Fallback: get last part of URL
          var parts = currentHref.split('/');
          var lastPart = parts[parts.length - 1];
          if (lastPart) {
            currentPageBase = lastPart.replace(/\.html.*$/i, '').replace(/\?.*$/, '').replace(/#.*$/, '').toLowerCase();
          }
        }
      } else {
        // For web URLs, extract from pathname
        var pathname = window.location.pathname;
        var pathMatch = pathname.match(/\/([^\/]+)(?:\.html)?\/?$/);
        if (pathMatch && pathMatch[1] !== '') {
          currentPageBase = pathMatch[1].toLowerCase();
        } else if (pathname === '/' || pathname === '') {
          currentPageBase = 'index';
        }
      }
      
      console.log('Standalone detection - currentPageBase:', currentPageBase, 'from href:', currentHref);
      
      if (!currentPageBase) {
        console.warn('Could not detect current page base');
        return;
      }
      
      // Find all nav links using vanilla JavaScript
      var navLinks = document.querySelectorAll('.navbar-nav a.nav-link, .side-menu a.nav-link');
      console.log('Found', navLinks.length, 'nav links');
      
      navLinks.forEach(function(link) {
        var href = link.getAttribute('href');
        if (!href || href.includes('onlineorders')) return;
        
        // Normalize href - remove leading slash and .html extension
        var normalizedHref = href.toLowerCase().replace(/^\/+/, '').replace(/\.html$/, '').replace(/\/$/, '');
        
        // Check if it matches current page
        var matches = false;
        if (normalizedHref === currentPageBase) {
          matches = true;
        } else if (href.toLowerCase() === '/' + currentPageBase || href.toLowerCase() === '/' + currentPageBase + '.html') {
          matches = true;
        } else if (href.toLowerCase().endsWith('/' + currentPageBase) || href.toLowerCase().endsWith('/' + currentPageBase + '.html')) {
          matches = true;
        }
        
        if (matches) {
          // Add active class
          link.classList.add('active');
          var navItem = link.closest('.nav-item');
          if (navItem) {
            navItem.classList.add('active');
          }
          
          // Force red color with inline style (highest priority)
          link.style.setProperty('color', '#cf1818', 'important');
          link.style.setProperty('font-weight', '600', 'important');
          
          console.log('✓ Standalone MATCHED:', href, 'for page:', currentPageBase);
        }
      });
    } catch(e) {
      console.error('Error in standalone nav highlight:', e);
      console.error('Stack:', e.stack);
    }
  }
  
  // Run immediately if DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', highlightActiveNavStandalone);
  } else {
    highlightActiveNavStandalone();
  }
  
  // Also run after delays to catch dynamically created menus
  setTimeout(highlightActiveNavStandalone, 100);
  setTimeout(highlightActiveNavStandalone, 500);
  setTimeout(highlightActiveNavStandalone, 1500);
  setTimeout(highlightActiveNavStandalone, 3000);
  
  // Run on window load
  window.addEventListener('load', function() {
    setTimeout(highlightActiveNavStandalone, 100);
    setTimeout(highlightActiveNavStandalone, 1000);
  });
})();
