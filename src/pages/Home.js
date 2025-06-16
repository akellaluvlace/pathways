import React, { useState } from 'react';
import {
    Container, Grid, CardContent, Typography, Box, List, ListItem, ListItemIcon, ListItemText, alpha, useTheme, Paper, Link, Tooltip
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import pathwaysAboutImage from '../assets/images/pathways_about.jpg';

// Material Icons
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SecurityIcon from '@mui/icons-material/Security';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import SchoolIconMaterial from '@mui/icons-material/School';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HealingIcon from '@mui/icons-material/Healing';
import GroupsIcon from '@mui/icons-material/Groups';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import ContactsIcon from '@mui/icons-material/Contacts';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// --- FONT AWESOME SETUP (FOR TREE-SHAKING) ---
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Deep-import each icon individually for tree-shaking
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons/faHeartbeat';
import { faHandsHelping } from '@fortawesome/free-solid-svg-icons/faHandsHelping';
import { faBrain } from '@fortawesome/free-solid-svg-icons/faBrain';
import { faPalette } from '@fortawesome/free-solid-svg-icons/faPalette';
import { faCalculator } from '@fortawesome/free-solid-svg-icons/faCalculator';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons/faBookOpen';
import { faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons/faChalkboardTeacher';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons/faGraduationCap';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons/faBriefcase';
import { faMountain } from '@fortawesome/free-solid-svg-icons/faMountain';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt';
import { faFlag } from '@fortawesome/free-solid-svg-icons/faFlag';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons/faDumbbell';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons/faQuestionCircle';
import { faSpa } from '@fortawesome/free-solid-svg-icons/faSpa';
import { faSchool } from '@fortawesome/free-solid-svg-icons/faSchool';

// Data Imports from JSON files managed by Decap CMS
import homeData from '../data/home.json';
import servicesData from '../data/services.json';
import testimonialsData from '../data/testimonials.json';
import sponsorsData from '../data/sponsors.json';

// Image asset imports
import logoImage from '../assets/images/copypathways.png';
import logoHoverImage from '../assets/images/copypathways222.PNG';


// --- FONT AWESOME INITIALIZATION ---
// Add all used icons to the library *after* they have been imported.
library.add(
    faUsers, faHeartbeat, faHandsHelping, faBrain, faPalette, faCalculator,
    faBookOpen, faChalkboardTeacher, faGraduationCap, faBriefcase, faMountain,
    faPencilAlt, faFlag, faMusic, faDumbbell, faQuestionCircle, faSpa, faSchool
);
// --- END FONT AWESOME SETUP ---


const createSafeId = (title) => {
  if (!title) return '';
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]+/g, '').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
};

export const sectionTitlesForNav = [
    "About Us", "Our Mission", "Our Core Services", "Classes & Services",
    "Who We Welcome", "Referral Process", "Contact Us", "Testimonials",
];

const allDisplayTitles = {
    "About Us": "About Us", "Our Mission": "Our Mission",
    "Our Core Services": "Our Core Services", "Classes & Services": "Sample of Classes and Services Available",
    "Who We Welcome": "Who We Welcome", "Referral Process": "Referral Process (For Individuals in Prison)",
    "Contact Us": "Contact Us", "Testimonials": "What People Say About Pathways",
    "Our Sponsors": "Sponsored By"
};

// Map string names from JSON to the icon object itself
const faIconMap = {
    faUsers, faHeartbeat, faHandsHelping, faBrain, faPalette, faCalculator, 
    faBookOpen, faChalkboardTeacher, faGraduationCap, faBriefcase, faMountain, 
    faPencilAlt, faFlag, faMusic, faDumbbell, faQuestionCircle, faSpa, faSchool
};

// --- DATA PROCESSING (No Hooks Needed) ---
const supportServices = servicesData.entries
    .filter(s => s.category === 'Support Service')
    .map(s => ({ ...s, icon: faIconMap[s.icon] ?? faQuestionCircle }));

const educationalCourses = servicesData.entries
    .filter(s => s.category === 'Educational Course')
    .map(s => ({ ...s, icon: faIconMap[s.icon] ?? faQuestionCircle }));

const qqiModules = servicesData.entries.filter(s => s.category === 'QQI Module');

const serviceCategories = [
    {
        title: "Support Services",
        icon: faHandsHelping,
        data: supportServices,
        itemLayout: { xs: 12, sm: 6, md: 4 }
    },
    {
        title: "Educational Courses",
        icon: faSchool,
        data: educationalCourses,
        itemLayout: { xs: 12, sm: 6, md: 4 }
    },
    {
        title: "QQI Level 5 Major Award in Community Development",
        icon: faGraduationCap,
        description: "To achieve a Major award, you must complete 8 modules. The Level 5's can be also completed as stand alone modules, at your own pace with flexible peer learning promoted within the Pathways Centre.",
        data: qqiModules,
        isSpecialCard: true,
        itemLayout: { xs: 12, sm: 6 }
    }
];

const testimonials = testimonialsData.entries;
const sponsors = sponsorsData.entries;

function Home() {
    const theme = useTheme();
    const [isContactLogoHovered, setIsContactLogoHovered] = useState(false);
  
    const sectionSharedStyle = {
      py: { xs: 5, md: 7 }, 
      px: { xs: 2, sm: 3 },
      overflowX: 'hidden', 
      boxSizing: 'border-box',
    };
  
    const getSectionStyle = (index, specificStyles = {}) => ({
      ...sectionSharedStyle,
      backgroundColor: index % 2 === 0
        ? theme.palette.background.default
        : (theme.palette.mode === 'light' ? theme.palette.grey[100] : alpha(theme.palette.background.paper, 0.5)),
      ...specificStyles, 
    });

    const orderedSectionKeys = [
        "About Us", "Our Mission", "Our Core Services", "Classes & Services",
        "Who We Welcome", "Referral Process", "Contact Us", "Testimonials", "Our Sponsors"
    ];

    const firstSectionStyles = { 
        ...getSectionStyle(0), 
        pt: { xs: theme.spacing(1.5), md: theme.spacing(2.5) }, 
    };

    const ContactDetailItem = ({ label, value, href }) => (
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 0.5 }}>
            <Typography variant="body1" component="span" sx={{ fontWeight: 'bold', color: theme.palette.primary.dark, whiteSpace: 'nowrap' }}>{label}</Typography>
            {href ? (
                <Link href={href} target={href.startsWith('mailto:') || href.startsWith('tel:') ? '_self' : '_blank'} rel="noopener noreferrer" sx={{ color: 'text.primary', textDecorationColor: theme.palette.primary.light, '&:hover': {textDecorationColor: theme.palette.primary.dark}, wordBreak: 'break-word' }}>{value}</Link>
            ) : ( <Typography variant="body1" component="span">{value}</Typography> )}
        </Box>
    );

    const AddressBlock = ({ title, lines, titleIcon }) => (
        <Box sx={{height: '100%'}}> 
            <Typography variant="h6" component="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: theme.palette.primary.dark, mb: 1.5, whiteSpace: 'nowrap' }}>{titleIcon} {title}</Typography>
            {lines.map((line, index) => (<Typography variant="body1" key={index} sx={{ mb: 0.5 }}>{line}</Typography>))}
        </Box>
    );

    const ServiceListItem = ({ text, icon }) => (
        <ListItem sx={{ py: 1, px: 0, width: '100%' }}> 
            <ListItemIcon sx={{ minWidth: 36, color: theme.palette.primary.main, fontSize: '1.2rem' }}>
                <FontAwesomeIcon icon={icon} />
            </ListItemIcon>
            <ListItemText primary={text} primaryTypographyProps={{ variant: 'body1' }} />
        </ListItem>
    );
    
    return (
        <>
            <Box component="div" sx={{ pt: `20px` }}>
                {/* Section 1: About Us */}
                <Box component="section" id={createSafeId(orderedSectionKeys[0])} sx={firstSectionStyles}>
                    <Container maxWidth="md">
                        <Typography variant="h2" component="h2">{allDisplayTitles[orderedSectionKeys[0]]}</Typography>
                        <Typography variant="body1" paragraph sx={{ mb: 3, textAlign: 'justify' }}>
                            {homeData.about_us_content}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'center', borderRadius: theme.shape.borderRadius, overflow: 'hidden', maxWidth: {xs: '100%', sm: '80%', md: '70%'}, margin: '0 auto', mb: 1, boxShadow: theme.shadows[6], transition: theme.transitions.create('box-shadow'), '&:hover': { boxShadow: theme.shadows[10], } }}>
                            <img src={pathwaysAboutImage} alt="Pathways Centre Building" style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
                        </Box>
                    </Container>
                </Box>

                {/* Section 2: Our Mission */}
                <Box component="section" id={createSafeId(orderedSectionKeys[1])} sx={getSectionStyle(1)}>
                    <Container maxWidth="md">
                        <Typography variant="h2" component="h2">{allDisplayTitles[orderedSectionKeys[1]]}</Typography>
                        <List dense={false} sx={{ '& .MuiListItem-root': { py: 0.8 }}}>
                            {homeData.mission_items.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        {index === 0 && <SpaOutlinedIcon sx={{ fontSize: '2rem' }} />}
                                        {index === 1 && <InfoOutlinedIcon sx={{ fontSize: '2rem' }} />}
                                        {index === 2 && <SecurityIcon sx={{ fontSize: '2rem' }} />}
                                        {index === 3 && <SupervisorAccountIcon sx={{ fontSize: '2rem' }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'body1' }} />
                                </ListItem>
                            ))}
                        </List>
                    </Container>
                </Box>

                {/* Section 3: Our Core Services */}
                <Box component="section" id={createSafeId(orderedSectionKeys[2])} sx={getSectionStyle(2)}>
                    <Container maxWidth="md">
                        <Typography variant="h2" component="h2">{allDisplayTitles[orderedSectionKeys[2]]}</Typography>
                        <Box sx={{ my: 4, display: 'flex', justifyContent: 'center', borderRadius: theme.shape.borderRadius, width: '100%', maxWidth: '560px', margin: `${theme.spacing(4)} auto`, overflow: 'hidden', boxShadow: theme.shadows[6], transition: theme.transitions.create('box-shadow'), '&:hover': { boxShadow: theme.shadows[10], } }}>
                            <iframe style={{ display: 'block', width: '100%', aspectRatio: '16/9', border: 'none' }} src={homeData.core_services_video_url} title="YouTube video player - Pathways Centre" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </Box>
                        <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold', mt: 5, mb: 2.5, textAlign: 'center' }}>Our Services Include:</Typography>
                        <List dense={false} sx={{ '& .MuiListItem-root': { py: 0.8 }}}>
                             {homeData.core_services_list.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        {index === 0 && <SupportAgentIcon color="secondary" sx={{ fontSize: '2rem' }} />}
                                        {index === 1 && <SchoolIconMaterial color="secondary" sx={{ fontSize: '2rem' }} />}
                                        {index === 2 && <PsychologyIcon color="secondary" sx={{ fontSize: '2rem' }} />}
                                        {index === 3 && <HealingIcon color="secondary" sx={{ fontSize: '2rem' }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'body1', fontWeight: 'medium' }}/>
                                </ListItem>
                             ))}
                        </List>
                    </Container>
                </Box>

                {/* Section 4: Classes and Services Available */}
                <Box component="section" id={createSafeId(orderedSectionKeys[3])} sx={getSectionStyle(3)}>
                    <Container maxWidth="md">
                        <Typography variant="h2" component="h2">{allDisplayTitles[orderedSectionKeys[3]]}</Typography>
                        <Typography variant="body2" sx={{ textAlign: 'center', mt: 1, fontStyle: 'italic', color: 'text.secondary' }}>
                            These classes are subject to change throughout each academic term.
                        </Typography>
                        <Grid container spacing={4} sx={{ mt: 2 }} alignItems="stretch">
                            {serviceCategories.map(category => (
                                <Grid item xs={12} key={category.title}>
                                    <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, height: '100%' }}>
                                        <Typography variant="h4" component="h3" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5, color: theme.palette.primary.dark }}>
                                            <FontAwesomeIcon icon={category.icon} style={{ fontSize: '1.8rem' }} /> {category.title}
                                        </Typography>
                                        {category.description && (
                                            <Typography variant="body1" paragraph sx={{ mb: 2, fontStyle: 'italic', color: 'text.secondary' }}>
                                                {category.description}
                                            </Typography>
                                        )}
                                        {category.isSpecialCard ? (
                                            <Grid container spacing={{ xs: 1, sm: 2 }}>
                                                {category.data.map((item, index) => (
                                                    <Grid item xs={category.itemLayout.xs} sm={category.itemLayout.sm} md={category.itemLayout.md || category.itemLayout.sm} key={`${category.title}-module-${index}`}>
                                                        <ListItem sx={{ py: 0.5, px: 0 }}>
                                                            <ListItemIcon sx={{ minWidth: 36, color: theme.palette.primary.main }}>
                                                                <CheckCircleOutlineIcon sx={{ fontSize: '1.2rem' }} />
                                                            </ListItemIcon>
                                                            <ListItemText primary={item.text} primaryTypographyProps={{ variant: 'body1' }} />
                                                        </ListItem>
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        ) : (
                                            <Grid container spacing={{ xs: 1, sm: 2 }}>
                                                {category.data.map((item, index) => (
                                                    <Grid item xs={category.itemLayout.xs} sm={category.itemLayout.sm} md={category.itemLayout.md} key={`${category.title}-item-${index}`}>
                                                        <ServiceListItem text={item.text} icon={item.icon} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        )}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Section 5: Who We Welcome */}
                <Box component="section" id={createSafeId(orderedSectionKeys[4])} sx={getSectionStyle(4)}>
                    <Container maxWidth="md">
                        <Typography variant="h2" component="h2">{allDisplayTitles[orderedSectionKeys[4]]}</Typography>
                        <Box sx={{ display: 'flex', flexDirection: {xs: 'column', sm: 'row'}, alignItems: 'center', gap: theme.spacing(2.5), p: 3, borderRadius: theme.shape.borderRadius, background: alpha(theme.palette.primary.main, 0.05), borderLeft: {xs: 'none', sm: `5px solid ${theme.palette.primary.main}`}, borderTop: {xs: `5px solid ${theme.palette.primary.main}`, sm: 'none'}, mt: 2 }}>
                           <GroupsIcon sx={{ fontSize: '3rem', color: 'primary.main' }} />
                           <Typography variant="h6" sx={{ fontWeight: 400, textAlign: {xs: 'center', sm: 'left'} }} dangerouslySetInnerHTML={{ __html: homeData.who_we_welcome_text }} />
                        </Box>
                        <Paper elevation={0} sx={{ mt: 3, p: 2.5, backgroundColor: alpha(theme.palette.background.default, 0.7), border: `1px solid ${alpha(theme.palette.divider, 0.5)}`, borderRadius: theme.shape.borderRadius }}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5, mb: 2}}>
                                <ScheduleIcon color="primary" sx={{ fontSize: '1.8rem' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'medium', color: theme.palette.primary.dark }}>Opening Hours</Typography>
                            </Box>
                            <List dense sx={{pl: 1}}>
                                {homeData.opening_hours.map((item, index) => (
                                     <ListItem key={index} disablePadding sx={{pb: index === homeData.opening_hours.length - 1 ? 0 : 0.5}}><ListItemText primary={item.line} /></ListItem>
                                ))}
                            </List>
                        </Paper>
                        <Paper elevation={0} sx={{ mt: 3, p: 2, display: 'flex', alignItems: 'center', gap: 1.5, backgroundColor: alpha(theme.palette.info.main, 0.08), border: `1px solid ${alpha(theme.palette.info.dark, 0.2)}`, borderRadius: theme.shape.borderRadius }}>
                            <OndemandVideoIcon color="info" sx={{opacity: 0.8}} />
                            <Typography variant="body1" sx={{ color: theme.palette.mode === 'light' ? theme.palette.info.dark : theme.palette.info.light , fontWeight: 500}}>All classes are available online.</Typography>
                        </Paper>
                        <Paper elevation={0} sx={{ mt: 3, p: 2.5, backgroundColor: alpha(theme.palette.background.default, 0.7), border: `1px solid ${alpha(theme.palette.divider, 0.5)}`, borderRadius: theme.shape.borderRadius }}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1.5, mb: 1}}>
                                <LocationOnIcon color="primary" sx={{ fontSize: '1.8rem' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'medium', color: theme.palette.primary.dark }}>Our Location</Typography>
                            </Box>
                            <Typography variant="body1" sx={{pl: 1, mb: 2}}>
                                Click the link below to see our exact location.
                                <br/>
                                <Link href={homeData.google_maps_url} target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.primary.main, textDecoration: 'underline', '&:hover': { textDecorationColor: theme.palette.primary.dark }, wordBreak: 'break-all' }}>
                                    {homeData.google_maps_url}
                                </Link>
                            </Typography>
                            <Box sx={{ borderRadius: theme.shape.borderRadius, overflow: 'hidden', boxShadow: theme.shadows[3], border: `1px solid ${theme.palette.divider}` }}>
                                <iframe src={homeData.google_maps_embed_url} width="100%" height="300" style={{ border:0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Pathways Centre Location Map"></iframe>
                            </Box>
                        </Paper>
                    </Container>
                </Box>

                {/* Section 6: Referral Process */}
                <Box component="section" id={createSafeId(orderedSectionKeys[5])} sx={getSectionStyle(5)}>
                    <Container maxWidth="md">
                        <Typography variant="h2" component="h2">{allDisplayTitles[orderedSectionKeys[5]]}</Typography>
                        <Typography variant="body1" color="text.secondary" paragraph sx={{ fontStyle: 'italic', textAlign: 'center', mt: -1, mb: 3 }}>If you are currently in prison and approaching release, here’s how to connect with The Pathways Centre:</Typography>
                        <List dense={false} sx={{ '& .MuiListItem-root': { py: 1 }}}>
                            {homeData.referral_process_items.map((item, index) => (
                                <ListItem key={index}>
                                    <ListItemIcon>
                                        {index === 0 && <ForwardToInboxIcon color="action" sx={{ fontSize: '2rem' }} />}
                                        {index === 1 && <AssignmentIndIcon color="action" sx={{ fontSize: '2rem' }} />}
                                        {index === 2 && <ConnectWithoutContactIcon color="action" sx={{ fontSize: '2rem' }} />}
                                    </ListItemIcon>
                                    <ListItemText primary={<span dangerouslySetInnerHTML={{ __html: item.text }} />} primaryTypographyProps={{ variant: 'body1' }}/>
                                </ListItem>
                            ))}
                        </List>
                    </Container>
                </Box>

                {/* Section 7: Contact Us */}
                <Box component="section" id={createSafeId(orderedSectionKeys[6])} sx={getSectionStyle(6)}>
                    <Container maxWidth="lg"> 
                        <Typography variant="h2" component="h2">{allDisplayTitles[orderedSectionKeys[6]]}</Typography>
                        <Paper sx={{ p: {xs: 2, sm: 3, md: 4}, mt: 3, borderRadius: theme.shape.borderRadius, backgroundColor: alpha(theme.palette.background.paper, 0.7), border: `1px solid ${theme.palette.divider}`, maxWidth: '950px', width: '100%', mx: 'auto' }}>
                            <Grid container spacing={{xs: 3, md: 4}} justifyContent="center" alignItems="stretch">
                                <Grid item xs={12} sm={6} md={3}>
                                    <Box sx={{display: 'flex', flexDirection:'column', height: '100%'}}>
                                        <Typography variant="h6" component="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 'bold', color: theme.palette.primary.dark, mb: 1.5, whiteSpace: 'nowrap' }}>
                                            <ContactsIcon color="primary" /> 
                                            <Box component="span">Contact Details</Box>
                                        </Typography>
                                        <ContactDetailItem label="T:" value={homeData.contact_phone} href={`tel:${homeData.contact_phone.replace(/[^+\d]/g, '')}`} />
                                        <ContactDetailItem label="E:" value={homeData.contact_email} href={`mailto:${homeData.contact_email}`} />
                                        <ContactDetailItem label="W:" value="pathwayscentre.ie" href="https://pathwayscentre.ie" />
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6} md={3}><AddressBlock titleIcon={<BusinessIcon color="primary" />} title={<span style={{color: theme.palette.primary.dark, fontWeight: 'bold'}}>Lárionad na gCosán</span>} lines={["Aonad 3/4", "Cúirt Parnel", "1 Ascaill Granby", "Baile Átha Cliath 1" ]} /></Grid>
                                <Grid item xs={12} sm={6} md={3}><AddressBlock titleIcon={<BusinessIcon color="primary" />} title={<span style={{color: theme.palette.primary.dark, fontWeight: 'bold'}}>Pathways Centre</span>} lines={["Unit 3/4", "Parnell Court", "Dublin 1", "D01 F2W6"]} /></Grid>
                                <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', height: '100%', textAlign: 'center' }}>
                                    <Box component={RouterLink} to="/" onMouseEnter={() => setIsContactLogoHovered(true)} onMouseLeave={() => setIsContactLogoHovered(false)} sx={{ display: 'inline-block', lineHeight: 0, mb: 2, transition: theme.transitions.create('transform', { duration: theme.transitions.duration.standard, easing: theme.transitions.easing.easeInOut }), '&:hover': { transform: 'scale(1.05)' } }}>
                                        <img src={isContactLogoHovered ? logoHoverImage : logoImage} alt="Pathways Centre Logo" style={{ maxHeight: '70px', width: 'auto', display: 'block' }} />
                                    </Box>
                                    <Box sx={{ width: '100%' }}>
                                        <Typography variant="h6" component="h4" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, fontWeight: 'bold', color: theme.palette.primary.dark, mb: 1, whiteSpace: 'nowrap' }}>
                                            <PersonIcon color="primary" />
                                            <span style={{color: theme.palette.primary.dark, fontWeight: 'bold'}}>Bainisteoir / Manager</span>
                                        </Typography>
                                        <Typography variant="body1">{homeData.manager_name}</Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Container>
                </Box>

                {/* Section 8: Testimonials */}
                <Box component="section" id={createSafeId(orderedSectionKeys[7])} sx={getSectionStyle(7)}>
                    <Container maxWidth="md">
                        <Typography variant="h2" component="h2">{allDisplayTitles[orderedSectionKeys[7]]}</Typography>
                        <Grid container spacing={3} sx={{ mt: 2 }}>
                            {testimonials.map((testimonial, index) => (
                                <Grid item xs={12} sm={6} key={index} sx={{ display: 'flex' }}>
                                    <Paper variant="outlined" sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', p: theme.spacing(2.5) }}>
                                        <CardContent sx={{ flexGrow: 1, p: 0, pb: 1 }}>
                                            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start', mb: 1.5 }}>
                                                <FormatQuoteIcon sx={{ color: 'primary.light', transform: 'scaleX(-1) translateY(-4px)', fontSize: '2.2rem', opacity: 0.8 }} />
                                                <Typography variant="body1" fontStyle="italic" color="text.secondary" sx={{ pt: 0.5, lineHeight: 1.7 }}>{testimonial.quote}</Typography>
                                            </Box>
                                        </CardContent>
                                        <Box sx={{ pr: 1, pb: 0, mt: 'auto', textAlign: 'right' }}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: 'text.primary' }}>— {testimonial.name}</Typography>
                                        </Box>
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Section 9: Sponsors */}
                <Box component="section" id={createSafeId(orderedSectionKeys[8])} sx={getSectionStyle(8, { backgroundColor: theme.palette.common.white, borderTop: `1px solid ${theme.palette.divider}` })}>
                    <Container maxWidth="md">
                        <Typography variant="h2" component="h2" sx={{ mb: 1, color: theme.palette.grey[800] }}>
                            {allDisplayTitles[orderedSectionKeys[8]]}
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', mb: 1, color: theme.palette.text.secondary }}>
                            The Pathways Centre is co-funded by the Government of Ireland and the European Union. {' '}
                            <Link href="https://www.eufunds.ie" target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.primary.main, textDecoration: 'underline', '&:hover': { textDecorationColor: theme.palette.primary.dark } }}>
                                www.eufunds.ie
                            </Link>
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', mb: 0.5, color: theme.palette.text.secondary }}>
                            The Pathways Centre is funded by the City of Dublin Education and Training Board.
                        </Typography>
                        <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: theme.palette.text.secondary }}>
                            Click the link below to access the City of Dublin ETB website.
                            <br />
                            <Link href="https://www.cityofdublinetb.ie" target="_blank" rel="noopener noreferrer" sx={{ color: theme.palette.primary.main, textDecoration: 'underline', '&:hover': { textDecorationColor: theme.palette.primary.dark }, wordBreak: 'break-all' }}>
                                https://www.cityofdublinetb.ie
                            </Link>
                        </Typography>
                        <Grid container spacing={{xs: 3, sm: 4}} justifyContent="center" alignItems="center">
                            {sponsors.map((logo, index) => (
                                <Grid item xs={6} sm={4} md={2.4} key={index} sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}> 
                                   <Tooltip title={logo.tooltipText} arrow>
                                        <Link href={logo.websiteUrl || `https://www.google.com/search?q=${encodeURIComponent(logo.alt)}`} target="_blank" rel="noopener noreferrer" sx={{ display: 'block', lineHeight: 0 }}>
                                            <Box component="img" src={logo.src} alt={logo.alt} sx={{ maxWidth: '100%', maxHeight: {xs: '50px', sm: '60px', md: '70px'}, width: 'auto', objectFit: 'contain', transition: 'transform 0.3s ease-in-out, opacity 0.3s', opacity: 0.9, borderRadius: '8px', '&:hover': { transform: 'scale(1.08)', opacity: 1 } }} />
                                        </Link>
                                    </Tooltip>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </>
    );
}

export default Home;