const url = "./docs/syllabus.pdf";

let pdfDoc;
let pageNum = 1;

const scale = 3.0;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Render Page
const renderPage = num => {
  pdfDoc.getPage(num).then(page => {
    const viewport = page.getViewport({ scale: scale });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderContext = {
      canvasContext: ctx,
      viewport: viewport
    };
    page.render(renderContext);

    document.getElementById("page-num").textContent = num;
  });
};

//Check for PageRendering
const pageRendering = num => {
  renderPage(num);
};

//get Pdf
pdfjsLib
  .getDocument(url)
  .promise.then(pdf => {
    pdfDoc = pdf;
    //display Number of pages
    console.log("getPdf");
    document.getElementById("page-count").textContent = pdfDoc.numPages;
    renderPage(pageNum);
  })
  .catch(err => {
    console.log(err);
    document.querySelector(".top-bar").style.display = "none";
    document.querySelector(".err-text").textContent = err.message;
    document.querySelector(".error").style.display = "block";
  });

//showPrevPage
showPrevPage = () => {
  if (pageNum <= 1) return;
  pageNum--;
  pageRendering(pageNum);
};
//showNextPage
showNextPage = () => {
  if (pageNum >= pdfDoc.numPages) return;
  pageNum++;

  pageRendering(pageNum);
};

document.getElementById("prev-page").addEventListener("click", showPrevPage);
document.getElementById("next-page").addEventListener("click", showNextPage);
