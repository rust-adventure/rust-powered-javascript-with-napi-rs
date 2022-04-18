import test from "ava";

import { sum, compile } from "../index.js";

test("sum from native", (t) => {
  t.is(sum(1, 2), 3);
});

test("compile with undefined options", (t) => {
  const markdown_input =
    "Hello world, this is a ~~complicated~~ *very simple* example.";

  const expected_html =
    "<p>Hello world, this is a ~~complicated~~ <em>very simple</em> example.</p>\n";
  t.is(compile(markdown_input), expected_html);
});

test("compile with strikethrough", (t) => {
  const markdown_input =
    "Hello world, this is a ~~complicated~~ *very simple* example.";

  const expected_html =
    "<p>Hello world, this is a <del>complicated</del> <em>very simple</em> example.</p>\n";
  t.is(compile(markdown_input, { strikethrough: true }), expected_html);
});

test("compile with tables", (t) => {
  const markdown_input = `| First Header  | Second Header |
| ------------- | ------------- |
| Content Cell  | Content Cell  |
| Content Cell  | Content Cell  |`;

  const expected_html = `<table><thead><tr><th>First Header</th><th>Second Header</th></tr></thead><tbody>
<tr><td>Content Cell</td><td>Content Cell</td></tr>
<tr><td>Content Cell</td><td>Content Cell</td></tr>
</tbody></table>
`;
  t.is(compile(markdown_input, { tables: true }), expected_html);
});

test("compile with footnotes", (t) => {
  const markdown_input = `An example[^example] of the thing.

[example]: https://example.org`;

  const expected_html = `<p>An example<sup class="footnote-reference"><a href="#example">1</a></sup> of the thing.</p>\n`;
  t.is(compile(markdown_input, { footnotes: true }), expected_html);
});

test("compile with tasklists", (t) => {
  const markdown_input = `- [ ] one
- [x] two
- [ ] three`;

  const expected_html = `<ul>
<li><input disabled="" type="checkbox"/>
one</li>
<li><input disabled="" type="checkbox" checked=""/>
two</li>
<li><input disabled="" type="checkbox"/>
three</li>
</ul>
`;
  t.is(compile(markdown_input, { tasklists: true }), expected_html);
});

test("compile with smart punctuation", (t) => {
  const markdown_input = `a quote "from someone", allegedly.`;

  const expected_html = `<p>a quote “from someone”, allegedly.</p>\n`;
  t.is(compile(markdown_input, { smartPunctuation: true }), expected_html);
});

test("compile with heading attributes", (t) => {
  const markdown_input = `# text { #id .class1 .class2 }`;

  const expected_html = `<h1 id="id" class="class1 class2">text</h1>\n`;
  t.is(compile(markdown_input, { headingAttributes: true }), expected_html);
});
