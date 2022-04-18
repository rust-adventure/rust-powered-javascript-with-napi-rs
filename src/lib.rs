#![deny(clippy::all)]

// #[macro_use]
// extern crate napi_derive;

use napi_derive::napi;
use pulldown_cmark::{html, Options, Parser};

#[napi(object)]
pub struct JSOptions {
  pub tables: Option<bool>,
  pub footnotes: Option<bool>,
  pub strikethrough: Option<bool>,
  pub tasklists: Option<bool>,
  pub smart_punctuation: Option<bool>,
  pub heading_attributes: Option<bool>,
}

#[napi]
fn compile(input: String, opts: Option<JSOptions>) -> String {
  let mut options = Options::empty();
  if let Some(js_options) = opts {
    if let Some(true) = js_options.tables {
      options.insert(Options::ENABLE_TABLES);
    }
    if let Some(true) = js_options.footnotes {
      options.insert(Options::ENABLE_FOOTNOTES);
    }
    if let Some(true) = js_options.strikethrough {
      options.insert(Options::ENABLE_STRIKETHROUGH);
    }
    if let Some(true) = js_options.tasklists {
      options.insert(Options::ENABLE_TASKLISTS);
    }
    if let Some(true) = js_options.smart_punctuation {
      options.insert(Options::ENABLE_SMART_PUNCTUATION);
    }
    if let Some(true) = js_options.heading_attributes {
      options.insert(Options::ENABLE_HEADING_ATTRIBUTES);
    }
  }

  let parser = Parser::new_ext(&input, options);

  // Write to String buffer.
  let mut html_output = String::new();
  html::push_html(&mut html_output, parser);
  html_output
}
