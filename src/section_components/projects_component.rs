use dioxus::prelude::*;
use serde::Deserialize;
use serde_json;

use crate::values::TechTags;


#[derive(Clone, PartialEq, Deserialize)]
struct ProjectSource {
    title: String,
    codename: String,
    desc: String,
    long_desc: String,
    tech_tags: Option<Vec<TechTags>>
}


#[component]
fn ProjectElement(data: ProjectSource) -> Element{
    rsx!{
        div { 
            class: "project-element project-card",
            div { class: "project-element-image" }
            div { class: "project-element-contents",
                p { class: "project-card-title", "{data.title}" }
                p { class: "project-codename", "{data.codename}" }
                p { class: "project-desc", "{data.desc}" }
            }
         }
    }
}


#[component]
pub fn ProjectSection() -> Element {
    static CSS: Asset = asset!("/assets/section_components/projects_section.css");
    let PROJECTS_SOURCE = include_str!("../../assets/projects.json");
    let project_elements: Vec<ProjectSource> = serde_json::from_str(PROJECTS_SOURCE).expect("");
    
    rsx!{
        document::Stylesheet { href: CSS }

        div {
            id: "project-section",
            h2 {
                class: "section-title",
                "Projects"
            }
            div { id: "project-section-cards-container",
                for element in project_elements{
                    ProjectElement { data: element }
                }
            }
        }
    }
}