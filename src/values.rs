use dioxus::prelude::*;
use serde::Deserialize;

#[derive(Deserialize, Clone, PartialEq)]
pub enum TechTags{
    GitHub,
    Python,
    Rust,
    GeoSpatial
}

impl TechTags{
    pub fn render(&self) -> Element{
        todo!()
    }
}