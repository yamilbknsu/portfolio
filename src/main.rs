use dioxus::prelude::*;
use serde::Deserialize;

mod values;
mod section_components;
use section_components::ProjectSection;
use crate::section_components::ResearchSection;

fn main() {
    dioxus::launch(App);
}

#[component]
fn App() -> Element {
    static CSS: Asset = asset!("/assets/main.css");

    rsx! {
        document::Stylesheet { href: CSS }

        div { 
            class: "contents-pane",
            ProjectSection {  }
            ResearchSection {  }
        }
    }
}
