const config = {
  style: `
<style>
article {
    margin: 0 auto;
    max-width: 750px;
}
</style>
`,
};

const htmlBefore = (title, style = config.style) => `
<html>
<head>
<title>${title}</title>
${style}
</head>
<body>
<article>
`;

const htmlAfter = `
</article>
</body>
</html>
`;

module.exports = {
  style: config.style,
  htmlBefore,
  htmlAfter,
};
