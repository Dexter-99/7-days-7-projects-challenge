const url = "./docs/syllabus.pdf";

let pdfDoc;
let pageNum = 1;
let pageIsRendering = true;
let pageNumIsPending = null;

const scale = 3.0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Render Page
const renderPage = num => {
  pageIsRendering = true;
  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderContext).promise.then(() => {
      pageIsRendering = false;
      if (pageNumIsPending !== null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });
    //Output current page
    document.getElementById("page-num").textContent = num;
  });
};

//Check for PageRendering
const queueRendering = num => {
  if (pageIsRendering) {
    pageNumIsPending = num;
  } else {
    renderPage(num);
  }
};

//get Pdf
pdfjsLib.getDocument(url).promise.then(pdf => {
  pdfDoc = pdf;
  //display Number of pages
  document.getElementById("page-count").textContent = pdfDoc.numPages;
  renderPage(pageNum);
});

//showPrevPage
showPrevPage = () => {
  if (pageNum <= 1) return;
  pageNum--;
  console.log(pageNum);
  queueRendering(pageNum);
};
//showNextPage
showNextPage = () => {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;
  console.log(pageNum);
  queueRendering(pageNum);
};

document.getElementById("prev-page").addEventListener("click", showPrevPage);
document.getElementById("next-page").addEventListener("click", showNextPage);
