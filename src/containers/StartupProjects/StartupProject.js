import React, {useContext, useState} from "react";
import "./StartupProjects.scss";
import {bigProjects} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function StartupProject() {
  function openUrlInNewTab(url) {
    if (!url) return;
    var win = window.open(url, "_blank");
    win.focus();
  }

  const {isDark} = useContext(StyleContext);
  const [expanded, setExpanded] = useState({});
  const toggleExpand = i =>
    setExpanded(prev => ({...prev, [i]: !prev[i]}));

  if (!bigProjects.display) return null;

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main" id="projects">
        <div>
          <h1 className="skills-heading">{bigProjects.title}</h1>
          <p className={isDark ? "dark-mode project-subtitle" : "subTitle project-subtitle"}>
            {bigProjects.subtitle}
          </p>

          <div className="projects-container">
            {bigProjects.projects.map((project, i) => (
              <div
                key={i}
                className={
                  isDark
                    ? "dark-mode project-card project-card-dark"
                    : "project-card project-card-light"
                }
              >
                {/* Background dice */}
                {project.animatedImage && (
                  <div className="project-bg-dice">
                    <project.animatedImage />
                  </div>
                )}

                {/* Two-column inner layout */}
                <div className="project-card-inner">
                  {/* Left: content */}
                  <div className="project-detail">
                    <h5 className={isDark ? "dark-mode card-title" : "card-title"}>
                      {project.projectName}
                    </h5>
                    <p className={isDark ? "dark-mode card-subtitle" : "card-subtitle"}>
                      {project.projectDesc}
                    </p>

                    {project.techStack && (
                      <div className="project-tech-stack">
                        <div className="tech-stack-featured">
                          {project.techStack.featured.map((item, ii) => (
                            <span
                              key={ii}
                              className={isDark ? "dark-mode tech-stack-badge" : "tech-stack-badge"}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        {project.techStack.full && (
                          <>
                            <button
                              className={isDark ? "dark-mode tech-arch-toggle" : "tech-arch-toggle"}
                              onClick={() => toggleExpand(i)}
                            >
                              {expanded[i] ? "Hide Architecture ↑" : "View Architecture ↓"}
                            </button>
                            {expanded[i] && (
                              <div className="tech-stack-full">
                                {project.techStack.full.map((group, gi) => (
                                  <div key={gi} className="tech-stack-group">
                                    <span
                                      className={
                                        isDark
                                          ? "dark-mode tech-stack-category"
                                          : "tech-stack-category"
                                      }
                                    >
                                      {group.category}
                                    </span>
                                    <div className="tech-stack-items">
                                      {group.items.map((item, ii) => (
                                        <span
                                          key={ii}
                                          className={
                                            isDark
                                              ? "dark-mode tech-stack-badge"
                                              : "tech-stack-badge"
                                          }
                                        >
                                          {item}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    )}

                    {project.footerLink && (
                      <div className="project-card-footer">
                        {project.footerLink.map((link, i) => (
                          <span
                            key={i}
                            className={isDark ? "dark-mode project-tag" : "project-tag"}
                            onClick={() => openUrlInNewTab(link.url)}
                          >
                            {link.icon && (
                              <i
                                className={link.icon}
                                style={{marginRight: "6px", fontSize: "0.7rem"}}
                              />
                            )}
                            {link.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: screenshot */}
                  {project.screenshot && (
                    <div className="project-screenshot-wrap">
                      <img
                        src={project.screenshot}
                        alt={project.projectName + " screenshot"}
                        className={`project-screenshot${expanded[i] ? " screenshot-expanded" : ""}`}
                        onClick={() => openUrlInNewTab(project.screenshotLink)}
                        style={project.screenshotLink ? {cursor: "pointer"} : {}}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fade>
  );
}
