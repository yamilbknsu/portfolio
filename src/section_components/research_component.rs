use dioxus::prelude::*;
use serde::Deserialize;
use serde_json;


#[derive(Deserialize, Clone, PartialEq)]
enum ResearchTag{
    Published,
    Accepted,
    UnderReview
}

impl ResearchTag {
    fn render(&self) -> Element {
        use ResearchTag as R;

        let text = match self{
            R::Published => String::from("Published"),
            R::Accepted => String::from("Accepted"),
            R::UnderReview => String::from("Under Review"),
        };

        let color: String = match self {
            R::Published => String::from("rgb(10, 221, 70) "),
            R::Accepted => String::from("rgb(10, 175, 221) "),
            R::UnderReview => String::from("rgb(221, 168, 10) "),
        };

        rsx!{
            div { class: "research-tag",
                svg { class: "research-tag-decoration",
                    circle { r: 3, fill: color}
                }
                p { {text} }
            }
        }
    }
}


#[derive(Deserialize, Clone, PartialEq)]
struct ResearchElementData{
    title: String,
    journal: String,
    authors: Vec<String>,
    year: String,
    tags: Vec<ResearchTag>,
    doi: Option<String>
}

#[component]
fn ResearchElement(data: ResearchElementData) -> Element{
    let authors_str = data.authors.join(", ");

    rsx!{
        div{class: "research-element",
            // div { class: "research-element-decoration",
            //     svg { class: "research-decoration",
            //         line { x1: "7", y1: "5", x2: "7", y2: "35", stroke_width: 1, stroke: "gray"}
            //         circle { r: 5, fill: "rgb(37, 228, 249) ", stroke: "black", stroke_width: 2}
            //         line { x1: "7", y1: "55", x2: "7", y2: "80", stroke_width: 1, stroke: "gray"}
            //     }
            // }
            div { class: "research-contents",
                p { class: "element-title research-title", "{data.title}"}
                div { class: "research-details",
                    p { class: "research-authors", "{authors_str}"}
                    div{ class: "research-journal-doi",
                        p { class: "research-journal", "{data.journal} • {data.year}" }
                        if let Some(doi) = data.doi{
                            p { "•" }
                            a { class: "research-doi", href: "{doi}", "DOI" }
                        }
                    }
                    div { class: "research-element-tags",
                        for tag in data.tags{
                            { tag.render() }
                        }
                    }
                }
            }
        }
    }
}


#[component]
pub fn ResearchSection() -> Element {
    static CSS: Asset = asset!("/assets/section_components/research_section.css");
    let RESEARCH_SOURCE = include_str!("../../assets/research.json");
    let research_elements: Vec<ResearchElementData> = serde_json::from_str(RESEARCH_SOURCE).expect("");

    rsx! {
        document::Stylesheet { href: CSS }
        h2 {
            class: "section-title",
            "Publications"
        }
        for element in research_elements{
            ResearchElement { data: element }
        }
    }
}