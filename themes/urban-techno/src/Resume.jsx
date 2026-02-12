import styled from "styled-components";
import { marked } from "marked";
import {
  DateRange,
  Badge,
  BadgeList,
  Link,
  safeUrl,
} from "@jsonresume/core";
import Waves from "./components/Waves.jsx";

const Layout = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  background: rgba(255, 255, 255, 0.9);
  font-family:
    "Roboto Condensed",
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  color: #111;
  line-height: 1.4;
  font-size: 13px;

  @media print {
    max-width: none;
    margin: 0 !important;
    padding: 0 !important;
    border: none;
    background: #000 !important;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;

    @page {
      margin: 0;
      size: auto;
    }
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const WorkEntry = styled.div`
  margin-bottom: 24px;
  break-inside: avoid;

  &:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const WorkHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 4px;
  }
`;

const WorkTitleSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const WorkTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CompanyLogo = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 4px;
  object-fit: contain;
  background: white;
  padding: 2px;
  border: 1px solid #ddd;
  margin-top: 2px;

  @media screen and (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 2px solid #111;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    border-bottom: none;
  }
`;

const NameSection = styled.div`
  padding: 24px;
  border-right: 2px solid #111;
  background: #111;
  color: white;
  display: flex;
  align-items: center;
  gap: 20px;

  @media screen and (max-width: 768px) {
    border-right: none;
    border-bottom: 2px solid #111;
    padding: 20px;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    gap: 12px;
  }
`;

const Name = styled.h1`
  font-size: 36px;
  font-weight: 900;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  line-height: 0.9;

  @media screen and (max-width: 768px) {
    font-size: 28px;
  }
`;

const Tagline = styled.div`
  font-size: 11px;
  margin: 8px 0 0 0;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;

  @media screen and (max-width: 768px) {
    margin: 4px 0 0 0;
  }
`;

const ContactSection = styled.div`
  padding: 24px;
  background: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 24px;
  align-items: center;

  @media screen and (max-width: 768px) {
    padding: 16px;
    grid-template-columns: 1fr;
    gap: 8px;
    border-bottom: 2px solid #111;
  }
`;

const ContactItem = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 8px;
  align-items: center;

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }

  svg {
    opacity: 0.6;
    justify-self: center;
    width: 14px;
    height: 14px;
  }

  a {
    color: #111;
    text-decoration: none;
    border-bottom: 1px solid #eee;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
      border-bottom-color: #111;
    }
  }
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(232, 232, 232, 0.9) 280px,
    rgba(232, 232, 232, 0.9) 280px,
    transparent 280px
  );
  min-height: 100%;

  @media print {
    background: linear-gradient(
      to right,
      #e8e8e8 280px,
      #e8e8e8 280px,
      white 280px
    ) !important;
    border-color: #000 !important;
    min-height: auto !important;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    background: #e8e8e8;
  }
`;

const Sidebar = styled.aside`
  background: transparent;
`;

const MainContent = styled.main`
  background: white;
  min-width: 0;
  border-left: 2px solid #111;

  @media screen and (max-width: 768px) {
    border-left: none;
    border-top: 2px solid #111;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
  display: block;

  @media screen and (max-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const SidebarSection = styled.div`
  border-bottom: 1px solid #999;

  &:last-child {
    border-bottom: none;
  }
`;

const SidebarSectionTitle = styled.h2`
  background: #111;
  color: white;
  font-size: 13px;
  font-weight: 900;
  margin: 0;
  padding: 10px 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SidebarContent = styled.div`
  padding: 16px;

  @media screen and (max-width: 768px) {
    padding: 12px;
  }
`;

const SkillItem = styled.div`
  margin-bottom: 12px;
  break-inside: avoid;

  &:last-child {
    margin-bottom: 0;
  }

  h4 {
    font-size: 9px;
    font-weight: 900;
    margin: 0 0 6px 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const StyledBadgeList = styled(BadgeList)`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const StyledBadge = styled(Badge)`
  font-size: 10px;
  padding: 3px 6px;
  background: white;
  border: 1px solid #111;
  color: #111;
  font-weight: 700;
  border-radius: 0;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  white-space: nowrap;
`;

const MainSection = styled.div`
  border-bottom: 2px solid #111;

  &:last-child {
    border-bottom: none;
  }
`;

const MainSectionTitle = styled.h2`
  background: #111;
  color: white;
  font-size: 13px;
  font-weight: 900;
  margin: 0;
  padding: 10px 20px;
  text-transform: uppercase;
  letter-spacing: 1.2px;

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
  }
`;

const WorkTitle = styled.h3`
  font-size: 14px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  color: #111;
  flex: 1;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const WorkCompany = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #111;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
`;

const ContentColumn = styled.div`
  min-width: 0;
`;

const WorkDescription = styled.div`
  font-size: 12px;
  line-height: 1.5;
  color: #333;

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }

  p {
    margin: 8px 0;
  }

  p:first-child {
    margin-top: 0;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const HighlightsList = styled.ul`
  margin: 8px 0 0 0;
  padding-left: 20px;
  list-style: none;

  li {
    margin-bottom: 4px;
    font-size: 11px;
    line-height: 1.4;
    color: #333;
    position: relative;
    padding-left: 12px;

    @media screen and (max-width: 768px) {
      font-size: 11px;
    }

    &::before {
      content: "■";
      position: absolute;
      left: 0;
      color: #111;
      font-size: 8px;
      top: 2px;
    }
  }
`;

const SimpleList = styled.div`
  font-size: 11px;
  line-height: 1.8;

  div {
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ExportButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: #111;
  color: white;
  border: 4px solid #fff;
  padding: 12px 24px;
  font-family: inherit;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 9999;
  transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  font-size: 14px;

  svg {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #fff;
    color: #111;
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
    
    svg {
      transform: translateY(2px);
    }
  }

  &:active {
    transform: translateY(-2px);
  }

  @media print {
    display: none;
  }

  @media screen and (max-width: 768px) {
    bottom: 24px;
    right: 24px;
    padding: 10px 18px;
    font-size: 12px;
    border-width: 3px;
  }
`;

const BookButton = styled.a`
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 8px;
  align-items: center;
  background: #111;
  color: white;
  padding: 6px 12px 6px 0; /* 0 left padding so the first grid column (icon) starts at the edge */
  text-decoration: none;
  font-size: 11px;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.2s ease;
  border: 1px solid #111;
  width: fit-content;

  .btn-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24px;
    
    svg {
      margin-right: 0; /* Clear previous margin */
    }
  }

  svg {
    width: 14px;
    height: 14px;
    transition: transform 0.2s ease;
  }

  &:hover {
    background: white;
    color: #111;
    
    svg {
      transform: scale(1.1);
    }
  }

  @media print {
    border-color: #111;
    background: #111 !important;
    color: white !important;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
    padding: 4px 12px;
    font-size: 9px;
    
    svg {
      stroke: white;
    }
  }

  @media screen and (max-width: 768px) {
    margin: 4px auto 0 auto;
    font-size: 10px;
    padding: 6px 12px;
  }
`;

const parseMarkdown = (text) => {
  if (!text) return "";
  return marked.parse(text, { breaks: true, gfm: true });
};

const formatProfileUrl = (url, network) => {
  const net = network.toLowerCase();
  if (net === "linkedin") {
    return url.replace(/https?:\/\/(www\.)?linkedin\.com/, "");
  }
  if (net === "github") {
    return url.replace(/https?:\/\/(www\.)?github\.com/, "");
  }
  if (net === "calendly") {
    return url.replace(/https?:\/\/(www\.)?calendly\.com/, "");
  }
  return url;
};

function Resume({ resume }) {
  const {
    basics = {},
    work = [],
    education = [],
    skills = [],
    projects = [],
    volunteer = [],
    awards = [],
    publications = [],
    languages = [],
    interests = [],
    references = [],
  } = resume;

  const calendlyProfile = basics.profiles?.find(p => p.network.toLowerCase() === 'calendly');
  const otherProfiles = basics.profiles?.filter(p => p.network.toLowerCase() !== 'calendly') || [];

  const icons = {
    email: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    phone: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    location: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    web: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    linkedin: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    github: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.011-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.362.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    )
  };

  return (
    <Layout>
      <Waves />
      <Header>
        <NameSection>
          {basics.image && (
            <ProfileImage src={basics.image} alt={basics.name} />
          )}
          <div>
            {basics.name && <Name>{basics.name}</Name>}
            {basics.label && <Tagline>{basics.label}</Tagline>}
          </div>
        </NameSection>
        <ContactSection>
          {basics.email && (
            <ContactItem>
              {icons.email}
              <a href={`mailto:${basics.email}`}>{basics.email}</a>
            </ContactItem>
          )}
          {otherProfiles.find(p => p.network.toLowerCase() === 'linkedin') && (
            <ContactItem>
              {icons.linkedin}
              <a href={safeUrl(otherProfiles.find(p => p.network.toLowerCase() === 'linkedin').url)}>
                {formatProfileUrl(otherProfiles.find(p => p.network.toLowerCase() === 'linkedin').url, 'linkedin')}
              </a>
            </ContactItem>
          )}
          {basics.location?.city && (
            <ContactItem>
              {icons.location}
              <span>{basics.location.city}, {basics.location.region}</span>
            </ContactItem>
          )}
          {otherProfiles.find(p => p.network.toLowerCase() === 'github') && (
            <ContactItem>
              {icons.github}
              <a href={safeUrl(otherProfiles.find(p => p.network.toLowerCase() === 'github').url)}>
                {formatProfileUrl(otherProfiles.find(p => p.network.toLowerCase() === 'github').url, 'github')}
              </a>
            </ContactItem>
          )}
          {basics.url && (
            <ContactItem>
              {icons.web}
              <a href={safeUrl(basics.url)}>{basics.url.replace(/^https?:\/\//, '')}</a>
            </ContactItem>
          )}
          {calendlyProfile && (
            <BookButton href={safeUrl(calendlyProfile.url)} target="_blank" rel="noopener noreferrer">
              <div className="btn-icon">
                <svg 
                  width="14" 
                  height="14" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <span>Book a Time</span>
            </BookButton>
          )}
        </ContactSection>
      </Header>

      <MainGrid>
        <Sidebar>
          {basics.summary && (
            <SidebarSection>
              <SidebarSectionTitle>Summary</SidebarSectionTitle>
              <SidebarContent>
                <WorkDescription
                  dangerouslySetInnerHTML={{
                    __html: parseMarkdown(basics.summary),
                  }}
                />
              </SidebarContent>
            </SidebarSection>
          )}

          {skills.length > 0 && (
            <SidebarSection>
              <SidebarSectionTitle>Skills</SidebarSectionTitle>
              <SidebarContent>
                {skills.map((skill, index) => (
                  <SkillItem key={index}>
                    <h4>{skill.name}</h4>
                    <StyledBadgeList>
                      {skill.keywords?.map((keyword, i) => (
                        <StyledBadge key={i}>{keyword}</StyledBadge>
                      ))}
                    </StyledBadgeList>
                  </SkillItem>
                ))}
              </SidebarContent>
            </SidebarSection>
          )}

          {education.length > 0 && (
            <SidebarSection>
              <SidebarSectionTitle>Education</SidebarSectionTitle>
              <SidebarContent>
                {education.map((edu, index) => (
                  <div key={index} style={{ marginBottom: "16px" }}>
                    <WorkTitle style={{ fontSize: "12px" }}>
                      {edu.institution}
                    </WorkTitle>
                    <WorkCompany
                      style={{ fontSize: "10px", marginBottom: "4px" }}
                    >
                      {edu.studyType}
                      {edu.area && ` in ${edu.area}`}
                    </WorkCompany>
                    <DateRange
                      startDate={edu.startDate}
                      endDate={edu.endDate}
                      style={{ fontSize: "9px", opacity: 0.8 }}
                    />
                  </div>
                ))}
              </SidebarContent>
            </SidebarSection>
          )}

          {languages.length > 0 && (
            <SidebarSection>
              <SidebarSectionTitle>Languages</SidebarSectionTitle>
              <SidebarContent>
                <SimpleList>
                  {languages.map((lang, index) => (
                    <div key={index}>
                      <strong>{lang.language}</strong>
                      {lang.fluency && ` — ${lang.fluency}`}
                    </div>
                  ))}
                </SimpleList>
              </SidebarContent>
            </SidebarSection>
          )}

          {interests.length > 0 && (
            <SidebarSection>
              <SidebarSectionTitle>Interests</SidebarSectionTitle>
              <SidebarContent>
                <SimpleList>
                  {interests.map((interest, index) => (
                    <div key={index}>{interest.name}</div>
                  ))}
                </SimpleList>
              </SidebarContent>
            </SidebarSection>
          )}
        </Sidebar>

        <MainContent>
          {work.length > 0 && (
            <MainSection>
              <MainSectionTitle>Experience</MainSectionTitle>
              <SidebarContent>
                {work.map((item, index) => (
                  <WorkEntry key={index}>
                    <WorkHeader>
                      <WorkTitleSection>
                        {item.url && (
                          <CompanyLogo
                            src={`https://img.logo.dev/${new URL(item.url).hostname}?token=pk_CyyuO4QUShuOoZ1sHLG6Ow`}
                            alt={item.name}
                            onError={(e) => (e.target.style.display = "none")}
                          />
                        )}
                        <WorkTextGroup>
                          <WorkTitle>{item.position}</WorkTitle>
                          <WorkCompany>{item.name}</WorkCompany>
                        </WorkTextGroup>
                      </WorkTitleSection>
                      <DateRange
                        startDate={item.startDate}
                        endDate={item.endDate}
                      />
                    </WorkHeader>
                    <ContentColumn>
                      {item.summary && (
                        <WorkDescription
                          dangerouslySetInnerHTML={{
                            __html: parseMarkdown(item.summary),
                          }}
                        />
                      )}
                      {item.highlights && item.highlights.length > 0 && (
                        <HighlightsList>
                          {item.highlights.map((highlight, hIndex) => (
                            <li
                              key={hIndex}
                              dangerouslySetInnerHTML={{
                                __html: parseMarkdown(highlight),
                              }}
                            />
                          ))}
                        </HighlightsList>
                      )}
                    </ContentColumn>
                  </WorkEntry>
                ))}
              </SidebarContent>
            </MainSection>
          )}

          {projects.length > 0 && (
            <MainSection>
              <MainSectionTitle>Projects</MainSectionTitle>
              {projects.map((project, index) => (
                <WorkGrid key={index}>
                  <DateColumn>
                    <DateRange
                      startDate={project.startDate}
                      endDate={project.endDate}
                    />
                  </DateColumn>
                  <ContentColumn>
                    <WorkTitle>
                      {project.url ? (
                        <Link href={safeUrl(project.url)}>{project.name}</Link>
                      ) : (
                        project.name
                      )}
                    </WorkTitle>
                    {project.description && (
                      <WorkDescription>{project.description}</WorkDescription>
                    )}
                    {project.highlights && project.highlights.length > 0 && (
                      <WorkHighlights>
                        {project.highlights.map((highlight, i) => (
                          <li key={i}>{highlight}</li>
                        ))}
                      </WorkHighlights>
                    )}
                  </ContentColumn>
                </WorkGrid>
              ))}
            </MainSection>
          )}
        </MainContent>
      </MainGrid>
      <ExportButton id="export-pdf-btn">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Export PDF
      </ExportButton>
    </Layout>
  );
}

export default Resume;
