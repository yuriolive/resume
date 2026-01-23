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

    @page {
      margin: 0;
      size: auto;
    }
  }

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const WorkEntry = styled.div`
  margin-bottom: 24px;
  break-inside: avoid;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const WorkHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;

  @media (max-width: 768px) {
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
  width: 36px;
  height: 36px;
  border-radius: 4px;
  object-fit: contain;
  background: white;
  padding: 2px;
  border: 1px solid #ddd;
  margin-top: 2px;

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
  }
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-bottom: 2px solid #111;

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
    margin: 4px 0 0 0;
  }
`;

const ContactSection = styled.div`
  padding: 24px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 16px;
    gap: 8px;
    border-bottom: 2px solid #111;
  }
`;

const ContactItem = styled.div`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (max-width: 768px) {
    font-size: 10px;
    text-align: center;
  }

  a {
    color: #111;
    text-decoration: none;
    border-bottom: 1px solid #666;

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
  }

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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

  @media (max-width: 768px) {
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
    font-size: 10px;
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

  @media (max-width: 768px) {
    padding: 8px 16px;
  }
`;

const WorkTitle = styled.h3`
  font-size: 15px;
  font-weight: 900;
  text-transform: uppercase;
  margin: 0;
  color: #111;
  flex: 1;

  @media (max-width: 768px) {
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
  font-size: 13px;
  line-height: 1.5;
  color: #333;

  @media (max-width: 768px) {
    font-size: 12px;
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
    font-size: 12px;
    line-height: 1.4;
    color: #333;
    position: relative;
    padding-left: 12px;

    @media (max-width: 768px) {
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
              EMAIL: <a href={`mailto:${basics.email}`}>{basics.email}</a>
            </ContactItem>
          )}
          {basics.phone && <ContactItem>PHONE: {basics.phone}</ContactItem>}
          {basics.location?.city && basics.location?.region && (
            <ContactItem>
              LOCATION: {basics.location.city}, {basics.location.region}
              {basics.location.country && `, ${basics.location.country}`}
            </ContactItem>
          )}
          {basics.url && (
            <ContactItem>
              WEB: <a href={safeUrl(basics.url)}>{basics.url}</a>
            </ContactItem>
          )}
          {basics.profiles?.map((profile, index) => (
            <ContactItem key={index}>
              {profile.network.toUpperCase()}:{" "}
              <a href={safeUrl(profile.url)}>
                {formatProfileUrl(profile.url, profile.network)}
              </a>
            </ContactItem>
          ))}
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
    </Layout>
  );
}

export default Resume;
