// src/components/SidebarNavigation.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Box, Button, useTheme, alpha, IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import { HashLink as Link } from 'react-router-hash-link';
import useScrollPosition from '../hooks/useScrollPosition';
import { ThemeModeContext } from '../App';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';

const createSafeId = (title) => {
  if (!title) return '';
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]+/g, '').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
};

export const TOP_NAVIGATION_BAR_HEIGHT = 60; // Pure number
const TOP_NAV_BAR_HEIGHT_STRING = `${TOP_NAVIGATION_BAR_HEIGHT}px`;
const ACTIVATION_BUFFER_PX = 32; 
const ACTIVATION_LINE_Y = TOP_NAVIGATION_BAR_HEIGHT + ACTIVATION_BUFFER_PX;

function SidebarNavigation({ sectionTitles }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Breakpoint for mobile menu
  const { toggleThemeMode } = useContext(ThemeModeContext);

  const [activeSectionId, setActiveSectionId] = useState('');
  const navLinkItemRefs = useRef({}); // For desktop scrollable items
  const scrollContainerRef = useRef(null); // For desktop scrollable container
  const scrollPosition = useScrollPosition();
  const [isManuallyNavigating, setIsManuallyNavigating] = useState(false);
  const manualNavTimeoutRef = useRef(null);

  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };
  
  const runScrollSpy = () => {
    if (!sectionTitles || sectionTitles.length === 0) {
      if (activeSectionId !== '') setActiveSectionId('');
      return;
    }

    let newActiveCandidateId = '';
    for (let i = sectionTitles.length - 1; i >= 0; i--) {
      const title = sectionTitles[i];
      const id = createSafeId(title);
      const element = document.getElementById(id);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= ACTIVATION_LINE_Y) {
          newActiveCandidateId = id;
          break;
        }
      }
    }

    if (!newActiveCandidateId && sectionTitles.length > 0) {
        const firstSectionElement = document.getElementById(createSafeId(sectionTitles[0]));
        if (firstSectionElement) {
            const firstRect = firstSectionElement.getBoundingClientRect();
            if (firstRect.top < window.innerHeight * 0.75 || scrollPosition < ACTIVATION_LINE_Y * 0.5) {
                 newActiveCandidateId = createSafeId(sectionTitles[0]);
            }
        } else {
            newActiveCandidateId = createSafeId(sectionTitles[0]);
        }
    }
    
    const totalPageHeight = document.documentElement.scrollHeight;
    const viewportHeight = window.innerHeight;
    const currentScrollBottom = scrollPosition + viewportHeight;

    if (currentScrollBottom >= totalPageHeight - 20 && sectionTitles.length > 0) {
        newActiveCandidateId = createSafeId(sectionTitles[sectionTitles.length - 1]);
    }

    if (newActiveCandidateId && newActiveCandidateId !== activeSectionId) {
      setActiveSectionId(newActiveCandidateId);
    }
  };
  
  useEffect(() => {
    const initialCheckTimeout = setTimeout(() => {
        runScrollSpy();
    }, 100);
    return () => clearTimeout(initialCheckTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionTitles]);


  useEffect(() => {
    if (isManuallyNavigating) {
      return;
    }
    runScrollSpy();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition, sectionTitles, isManuallyNavigating, activeSectionId]); 


  useEffect(() => {
    if (!isMobile && activeSectionId && navLinkItemRefs.current[activeSectionId] && scrollContainerRef.current) {
      navLinkItemRefs.current[activeSectionId].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeSectionId, isMobile]);

  useEffect(() => {
    return () => {
      if (manualNavTimeoutRef.current) {
        clearTimeout(manualNavTimeoutRef.current);
      }
    };
  }, []);

  const handleNavLinkClick = (targetId) => {
    setIsManuallyNavigating(true);
    setActiveSectionId(targetId); 

    const element = document.getElementById(targetId);
    if (element) {
      const scrollTargetOffset = TOP_NAVIGATION_BAR_HEIGHT + parseInt(theme.spacing(1), 10); 
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const yToScroll = elementPosition - scrollTargetOffset;
      
      window.scrollTo({ top: yToScroll, behavior: 'smooth' });
    }

    if (manualNavTimeoutRef.current) {
      clearTimeout(manualNavTimeoutRef.current);
    }
    manualNavTimeoutRef.current = setTimeout(() => {
      setIsManuallyNavigating(false);
      runScrollSpy(); 
    }, 800);
  };

  const topBarSx = {
    position: 'sticky', top: 0, 
    left: 0, right: 0,
    width: '100%', 
    height: TOP_NAV_BAR_HEIGHT_STRING,
    backgroundColor: alpha(theme.palette.background.paper, 0.92),
    backdropFilter: 'blur(10px)', boxShadow: theme.shadows[3],
    zIndex: theme.zIndex.appBar, 
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: 'flex', 
    alignItems: 'center',
    boxSizing: 'border-box', 
    px: { xs: 1, sm: 1.5, md: 2 },
    justifyContent: isMobile ? 'flex-start' : 'center', 
  };

  const desktopScrollWrapperSx = {
    width: '100%', maxWidth: 'lg', height: '100%',
    overflowX: 'auto', overflowY: 'hidden',
    display: 'flex', alignItems: 'center',
    boxSizing: 'border-box', scrollbarWidth: 'none',
    '&::-webkit-scrollbar': { display: 'none' },
    msOverflowStyle: 'none',
  };

  const desktopNavItemStyle = (isActive) => ({
    flexShrink: 0, padding: theme.spacing(0.75, 2), margin: theme.spacing(0, 0.75),
    borderRadius: theme.shape.borderRadius * 0.75,
    color: isActive ? theme.palette.primary.main : theme.palette.text.secondary,
    backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.12) : 'transparent',
    fontSize: '0.875rem',
    fontWeight: isActive ? theme.typography.fontWeightBold : theme.typography.fontWeightMedium,
    textTransform: 'capitalize',
    transition: theme.transitions.create(['color', 'background-color', 'font-weight', 'transform'], {
      duration: theme.transitions.duration.short,
    }),
    whiteSpace: 'nowrap', border: '1px solid transparent',
    '&:hover': {
      color: theme.palette.primary.dark,
      backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.15) : theme.palette.action.hover,
      transform: isActive ? 'scale(1.02)' : 'scale(1.03)',
    },
  });

  const mobileMenuItemStyle = (isActive) => ({
    color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
    backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
    fontWeight: isActive ? theme.typography.fontWeightMedium : theme.typography.fontWeightRegular,
    width: '100%',
    justifyContent: 'flex-start',
    py: 1.25, // Adjusted padding for touch targets
    px: 2,
    borderRadius: theme.shape.borderRadius * 0.5,
    my: 0.5, // Margin between items
    '&:hover': {
      backgroundColor: isActive ? alpha(theme.palette.primary.main, 0.15) : theme.palette.action.hover,
    }
  });

  const themeToggleSx = {
    position: 'absolute', 
    right: { xs: theme.spacing(1), sm: theme.spacing(1.5), md: theme.spacing(2) },
    top: '50%',
    transform: 'translateY(-50%)',
    color: theme.palette.text.secondary,
    padding: theme.spacing(1),
    transition: theme.transitions.create(['color', 'background-color'], {
      duration: theme.transitions.duration.short,
    }),
    '&:hover': {
      color: theme.palette.text.primary,
      backgroundColor: theme.palette.action.hover,
    }
  };

  if (!sectionTitles || sectionTitles.length === 0) {
    return null;
  }

  return (
    <Box sx={topBarSx} component="nav" aria-label="Page Sections Navigation">
      {isMobile ? (
        <>
          <IconButton
            aria-label="open navigation menu"
            aria-controls="mobile-navigation-menu"
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit" // Takes color from parent, or use 'primary'
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="mobile-navigation-menu"
            anchorEl={mobileMenuAnchorEl}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            MenuListProps={{ 
              'aria-labelledby': 'mobile-menu-button',
              sx: { py: theme.spacing(0.5), px: theme.spacing(1) } // Padding for the list inside Paper
            }}
            PaperProps={{
              elevation: 4, 
              sx: {
                minWidth: 'min(75vw, 300px)', 
                maxWidth: '90vw',
                maxHeight: `calc(100vh - ${TOP_NAV_BAR_HEIGHT_STRING} - ${theme.spacing(4)})`, // Ensure it fits
                overflowY: 'auto', 
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: theme.shape.borderRadius,
                marginTop: theme.spacing(1), 
              }
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
          >
            {sectionTitles.map((title) => {
              if (!title) return null;
              const targetId = createSafeId(title);
              const isActive = targetId === activeSectionId;
              return (
                <MenuItem
                  key={targetId}
                  selected={isActive} // This prop helps with accessibility and styling
                  onClick={() => {
                    handleNavLinkClick(targetId); // Handles scroll and active state update
                    handleMobileMenuClose();    // Explicitly closes menu
                  }}
                  sx={mobileMenuItemStyle(isActive)}
                >
                  {title}
                </MenuItem>
              );
            })}
          </Menu>
        </>
      ) : (
        <Box ref={scrollContainerRef} sx={desktopScrollWrapperSx}>
          {sectionTitles.map((title) => {
            if (!title) return null;
            const targetId = createSafeId(title);
            const isActive = targetId === activeSectionId;
            return (
              <Button
                key={targetId}
                ref={(el) => (navLinkItemRefs.current[targetId] = el)}
                component={Link}
                to={`#${targetId}`} 
                onClick={() => handleNavLinkClick(targetId)}
                sx={desktopNavItemStyle(isActive)}
                variant="text"
                aria-current={isActive ? 'page' : undefined}
              >
                {title}
              </Button>
            );
          })}
        </Box>
      )}
      <IconButton
        onClick={toggleThemeMode}
        sx={themeToggleSx}
        aria-label="toggle theme mode"
      >
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Box>
  );
}

export default SidebarNavigation;