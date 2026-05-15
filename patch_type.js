const fs = require('fs');
const file = 'src/app/components/pdf/PdfToImageTool.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace('await page.render(renderContext as unknown as import("pdfjs-dist").RenderParameters).promise;', '// eslint-disable-next-line @typescript-eslint/ban-ts-comment\n        // @ts-ignore\n        await page.render(renderContext).promise;');

fs.writeFileSync(file, content);
